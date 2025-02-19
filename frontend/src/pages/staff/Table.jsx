import React, { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchField from "../../components/SearchField";
import { axiosPrivate } from "../../api/axios";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { useSearchParams } from "react-router-dom";


export default function Table() {
    const dispatch = useDispatch();
    const [btables, setBtables] = useState([]); // Store fetched tables
    const [SearchParams] = useSearchParams();
    
    const [page, setPage] = useState(parseInt(SearchParams.get("page")) || 1);    
    const limit = SearchParams.get("limit") || 5;
    console.log(page)
        const [totalRecords, setTotalRecords] = useState(0); // Store total number of records
    
    const [newTable, setNewTable] = useState({
        number: "",
        category: "",
        price: "",
        imageUrl:"",
        isAvailable:true,


        
    });

    const [expandedRow, setExpandedRow] = useState(null);
    const [overlayForm, setOverlayForm] = useState(false);
    const [activeTable, setActiveTable] = useState(null);

    const toggleAvailability = async (table) => {
        if (!table || !table.id) {
            console.error("❌ Error: Table ID is undefined", table);
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/table/${table.id}/availability`,
                { isAvailable: !table.isAvailable }
            );
    
            if (response.data.success) {
                setTables((prevTables) =>
                    prevTables.map((t) =>
                        t.id === table.id ? { ...t, isAvailable: !t.isAvailable } : t
                    )
                );
            }
        } catch (error) {
            console.error("❌ Error updating table:", error.response?.data || error.message);
        }
    };
    
    
    
    
    

    // Fetch tables from the backend
    const fetchTables = async () => {
        try {
                        const res = await axiosPrivate.get(`/table?page=${page}&limit=${limit}`);
                        setBtables(res.data.data || []); // Update table data
                        setTotalRecords(res.data.total || 0); // Update total records
                    } catch (err) {
                        console.error("Error fetching tables:", err.response ? err.response.data : err.message);
                        setBtables([]);
                        setTotalRecords(0);
                    }
                };
                
                useEffect(() => {
                    fetchTables();
                }, [page, limit]);

    const handleInputChange = (e) => {
        setNewTable({ ...newTable, [e.target.name]: e.target.value });
    };

    const handleNewTable = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.post("/table", newTable, {
                headers: { "Content-Type": "application/json" },
            });
            dispatch({
                type: "SHOW_ALERT",
                payload: {
                    message: "Table added successfully",
                    type: "success",
                    dismiss: 9000,
                },
            });
            setOverlayForm(false);
            fetchTables(); // Refresh table list
            setNewTable({ number: "", category: "", price: "", imageUrl: "asdas", isAvailable: true });
        } catch (err) {
            dispatch({
                type: "SHOW_ALERT",
                payload: {
                    message: err?.response?.data?.error || "Failed to add table",
                    type: "warning",
                    dismiss: 9000,
                },
            });
        }
    };

    const deleteTable = async (id) => {
        try {
            await axiosPrivate.delete(`/table/${id}`);
            dispatch({
                type: "SHOW_ALERT",
                payload: { message: "Table deleted", type: "success", dismiss: 9000 },
            });
            fetchTables();
        } catch (err) {
            dispatch({
                type: "SHOW_ALERT",
                payload: {
                    message: "Failed to delete table",
                    type: "warning",
                    dismiss: 9000,
                },
            });
        }
    };

    const toggleMenu = (menu) => {
        setExpandedRow(expandedRow === menu.id ? null : menu.id);
        setActiveMenu(activeMenu == menu ? null : menu);
    };
    return (
        <>
            <div>
                {/* Table Header */}
                <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <h3>Tables</h3>
                        <SearchField />
                    </div>
                    <div className="flex flex-row justify-end">
                        <button
                            className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300"
                            onClick={() => setOverlayForm(true)}
                        >
                            <AddOutlinedIcon />
                            <span className="ml-2">Add Table</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Head */}
                        <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Number</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Image</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-gray-700 text-nowrap">
                            {btables.map((table, index) => (
                                <React.Fragment key={table.id}>
                                    <tr className="border-t">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3" onClick={() => toggleMenu(table)}>
                                            <p title={table.number}>{table.number}</p>
                                        </td>
                                        <td className="p-3">{table.category}</td>
                                        <td className="p-3">{`Br ${table.price}`}</td>
                                        <td className="p-3">
                                            {table.imageUrl ? (
                                                <img src={table.imageUrl} alt="Table" className="h-12 w-12 rounded-md" />
                                            ) : (
                                                <AddPhotoAlternateOutlinedIcon className="text-gray-400" />
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                                <button onClick={() => toggleAvailability(table)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition duration-300
                                                        ${table.isAvailable ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                                                >
                                                    {console.log(table.id)}
                                                    {table.isAvailable ? "Available" : "Not Available"}
                                                </button>
                                            </td>

                                        <td className="p-3 text-center">
                                            <DeleteOutlineOutlinedIcon
                                                className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300"
                                                onClick={() => deleteTable(table.id)}
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Overlay Form */}
            {overlayForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <button className="p-2" onClick={() => setOverlayForm(false)}>
                                <CloseOutlinedIcon className="hover:text-primary" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">Add Table</h2>

                        <form className="flex flex-col gap-4" onSubmit={handleNewTable}>
                            <input type="number" name="number" placeholder="Table number" className="p-2 border rounded-lg" value={newTable.number} onChange={handleInputChange} required />
                            <input type="number" name="price" placeholder="Price" className="p-2 border rounded-lg" value={newTable.price} onChange={handleInputChange} required />
                            <input type="text" name="imageUrl" placeholder="Image URL" className="p-2 border rounded-lg" value={newTable.imageUrl} onChange={handleInputChange} />
                            <select name="category" className="p-2 border rounded-lg" value={newTable.category} onChange={handleInputChange} required>
                                <option value="">Select Category</option>
                                <option value="normal">Normal</option>
                                <option value="vip">VIP</option>
                                <option value="couple">Couple</option>
                            </select>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Add Table</button>
                        </form>
                    </div>
                </div>
            )}

    <div className="flex justify-between items-center p-4">
        <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400"
        >
            Previous
        </button>
        <span className="text-gray-600 text-sm">
            Page {page} of {Math.ceil(totalRecords / limit)}
        </span>
        <button
            onClick={() => setPage((p) => (p < Math.ceil(totalRecords / limit) ? p + 1 : p))}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400"
        >
            Next
        </button>
    </div>
        </>
    );
}