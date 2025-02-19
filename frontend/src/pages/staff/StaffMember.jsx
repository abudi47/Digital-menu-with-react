import React, { useState } from "react";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SearchField from "../../components/SearchField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import  ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useSearchParams } from "react-router-dom";

import axios from "../../api/axios";
import { axiosPrivate } from "../../api/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function StaffMember() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    
    const [page, setPage] = useState(parseInt(SearchParams.get("page")) || 1);    
    const limit = SearchParams.get("limit") || 5;
    console.log(page)

    const [overlayForm, setOverlayForm] = useState(false);
    const [btables, setBtables] = useState([]); // Store fetched tables
    const [activeTable, setActiveTable] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0); // Store total number of records

        


    const [newStaff, setNewStaff] = useState({
        firstName: "",
        lastName: "",

            email: "",
            phone:"",
            password:"",

            role:"",
            imageUrl:"",
            status:"",
    
    
            
        });
    
        // Fetch tables from the backend
        const fetchTables = async () => {
            try {
                const res = await axiosPrivate.get(`/user?page=${page}&limit=${limit}`);
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
        }, [page, limit]); // Refetch data when page or limit changes
        
        const handleInputChange = (e) => {
            setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
        };
        
        const handleNewStaff = async (e) => {
            e.preventDefault();
            try {
                await axiosPrivate.post("/auth/register", newStaff, {
                    headers: { "Content-Type": "application/json" },
                });
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: "Staff added successfully",
                        type: "success",
                        dismiss: 9000,
                    },
                });
                setOverlayForm(false);
                fetchTables(); // Refresh table list
                setNewStaff({ firstName: "", lastName: "", email: "", phone: "", password: "", role: "", imageUrl: "" });
            } catch (err) {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: err?.response?.data?.error || "Failed to add staff",
                        type: "warning",
                        dismiss: 9000,
                    },
                });
            }
        };
   
    
    
  
    console.log(btables)

    const toggleMenu = (table) => {
        if (expandedRow === table.id) {
            setExpandedRow(null); // Collapse the row if it's already expanded
            setActiveMenu(null); // Clear the active menu
        } else {
            setExpandedRow(table.id); // Expand the row
            setActiveMenu(table); // Set the active menu to the selected table
        }
    };
    const [currentImage, setCurrentImage] = useState(0);
    
        const handleNextImage = (menu) => {
            setCurrentImage((prev) => (prev + 1) % menu.imageUrl.length);
        };
    
        const handlePrevImage = (menu) => {
            setCurrentImage(
                (prev) => (prev - 1 + menu.imageUrl.length) % menu.imageUrl.length
            );
        };
    return (
        <div>
            {/* Table Header */}
            <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h3>Staff Members</h3>

                    <SearchField />
                </div>

                <div className="flex flex-row justify-end">
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300"
                        onClick={() => setOverlayForm(true)}
                    >
                        <PersonAddAltOutlinedIcon />
                        <span className="ml-2">Addd New Staff</span>
                    </button>
                </div>
               
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Table Head */}
                    <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700 text-nowrap">
                            {btables.map((table, index) => (
                                <React.Fragment key={table.id}>
                                    <tr className="border-t">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3" onClick={() => toggleMenu(table)}>
                                            <p title={table.firstName}>{table.firstName} {table.lastName}</p>
                                        </td>
                                        <td className="p-3">{`${table.email}`}</td>
                                        <td className="p-3">{table.role}</td>
                                        
                                        {/* Dropdown Row (Pushes Other Rows) */}
                                    {expandedRow === table.id && (
                                        <tr className="bg-gray-50/80 hover:bg-gray-100 transition duration-300">
                                            <td
                                                colSpan="6"
                                                className="py-6 px-8"
                                            >
                                                <div className="flex flex-col md:flex-row gap-6 items-centerx">
                                                    {/* Image section */}
                                                    <div className="flex flex-col gap-3 w-64 md:w-56">
                                                        <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg border">
                                                            <img
                                                                src={
                                                                    table
                                                                        .imageUrl[
                                                                        currentImage
                                                                    ]
                                                                }
                                                                alt="menu_image"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {/* Image Navigation Buttons */}
                                                            <div className="absolute inset-0 flex justify-between items-center px-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handlePrevImage(
                                                                            activeMenu
                                                                        )
                                                                    }
                                                                    className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                                                                >
                                                                    <ChevronLeftOutlinedIcon className="!w-6 !h-6" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleNextImage(
                                                                            activeMenu
                                                                        )
                                                                    }
                                                                    className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                                                                >
                                                                    <ChevronRightOutlinedIcon className="!w-6 !h-6" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* Image Controls */}
                                                        <div className="flex justify-between px-3">
                                                            <AddPhotoAlternateOutlinedIcon className="cursor-pointer text-green-600 hover:text-green-800 transition duration-300" />
                                                            <DeleteOutlineOutlinedIcon className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300" />
                                                        </div>
                                                    </div>

                                                    {/* Menu Details */}
                                                    <div className="flex flex-col flex-1 gap-4">
                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="Firstname"
                                                                value={
                                                                    activeMenu.firstName
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                firstName: e
                                                                                    .target
                                                                                    .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full max-w-sm min-w-[200px]" >
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                Last Name
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="lastName"
                                                                value={
                                                                    activeMenu.lastName
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                lastName: e
                                                                                    .target
                                                                                    .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                Email
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="Email"
                                                                value={
                                                                    activeMenu.email
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                email:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Description & Submit Button */}
                                                    <div className="flex flex-col flex-1 justify-between">
                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                Phone
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="Phone number"
                                                                value={
                                                                    activeMenu.phone
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                phone:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                                
                                                            />
                                                        </div>

                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                password
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="password"
                                                                type="password"
                                                                value={
                                                                    activeMenu.password
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                password:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                Role
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="role"
                                                                value={
                                                                    activeMenu.role
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                role:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="w-full max-w-sm min-w-[200px]">
                                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                                ImageUrl
                                                            </label>
                                                            <input
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                                placeholder="image"
                                                                value={
                                                                    activeMenu.imageUrl
                                                                }
                                                                onChange={(e) =>
                                                                    setActiveMenu(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                imageUrl:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            };
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="flex flex-row justify-between">
                                                            <button className="px-6 py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                                                                Save Changes
                                                            </button>
                                                            <button className="px-6 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                                                Remove Menu
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                        {/* <td className="p-3 text-center">
                                            <DeleteOutlineOutlinedIcon
                                                className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300"
                                                onClick={() => deleteTable(table.id)}
                                            />
                                        </td> */}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                </table>
            </div>

            {/* Overlay form */}
            
            {overlayForm && 
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                        <button className="p-2" onClick={() => setOverlayForm(false)}>
                                <CloseOutlinedIcon className="hover:text-primary" />
                            </button>
                        </div>
                            <h2 className="text-2xl font-semibold mb-4">Add Staff</h2>
                            <form className="flex flex-col gap-4" onSubmit={handleNewStaff}>
                            <input type="text" name="firstName" placeholder="firstName" className="p-2 border rounded-lg" value={newStaff.firstName} onChange={handleInputChange} required />
                            <input type="text" name="lastName" placeholder="lastName" className="p-2 border rounded-lg" value={newStaff.lastName} onChange={handleInputChange} required />

                            <input type="email" name="email" placeholder="Email" className="p-2 border rounded-lg" value={newStaff.email} onChange={handleInputChange} required/>
                            <input type="text" name="phone" placeholder="Phone Number" className="p-2 border rounded-lg" value={newStaff.phone} onChange={handleInputChange} required />
                            <input type="password" name="password" placeholder="password" className="p-2 border rounded-lg" value={newStaff.password} onChange={handleInputChange} required />

                            <input type="text" name="role" placeholder="role" className="p-2 border rounded-lg" value={newStaff.role} onChange={handleInputChange} required/>
                            <input type="text" name="imageUrl" placeholder="imageUrl" className="p-2 border rounded-lg" value={newStaff.imageUrl} onChange={handleInputChange} required/>


                            <select name="role" className="p-2 border rounded-lg" value={newStaff.role} onChange={handleInputChange} required>
                                <option value="">Select Category</option>

                                <option value="admin">Admin</option>
                                <option value="casher">Casher</option>
                                <option value="barista">Barista</option>
                                <option value="foodRunner">foodRunner</option>

                            </select>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Add Staff</button>
                        </form>

                        </div>
                </div>
            }



            {/* Pagination */}
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
        </div>
    );
}