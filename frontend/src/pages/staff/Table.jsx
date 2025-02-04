import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchField from "../../components/SearchField";

export default function Table() {
    const [expandedRow, setExpandedRow] = useState(null);
    const [activeTable, setActiveTable] = useState(null);

    const toggleMenu = (menu) => {
        setExpandedRow(expandedRow === menu.id ? null : menu.id);
        setActiveTable(activeTable == menu ? null : menu);
    };

    const tables = [
        {
            id: 1,
            number: "21",
            category: "normal",
            price: "5",
            imageUrl:
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
            isAvailable: true,
        },
        {
            id: 2,
            number: "12",
            category: "normal",
            price: "0",
            imageUrl:
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
            isAvailable: true,
        },
        {
            id: 3,
            number: "7",
            category: "normal",
            price: "15",
            imageUrl:
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
            isAvailable: false,
        },
        {
            id: 4,
            number: "11",
            category: "normal",
            price: "20",
            imageUrl:
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
            isAvailable: true,
        },
    ];

    return (
        <div>
            {/* Table Header */}
            <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h3>Tables</h3>

                    <SearchField />
                </div>
                <div className="flex flex-row justify-end">
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300">
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
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700 text-nowrap">
                        {tables.map((table, index) => (
                            <React.Fragment key={table.id}>
                                <tr key={index} className="border-t">
                                    <td className="p-3">{table.id}</td>
                                    <td
                                        className="p-3"
                                        onClick={() => toggleMenu(table)}
                                    >
                                        <p title={table.number}>
                                            {table.number}
                                        </p>
                                    </td>
                                    <td className="p-3">
                                        <p>{table.category}</p>
                                    </td>
                                    <td className="p-3">{`Br ${table.price}`}</td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                          table.isAvailable === true
                              ? "bg-green-100 text-green-700"
                              : table.status === false
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                                        >
                                            {String(table.isAvailable)}
                                        </span>
                                    </td>
                                </tr>

                                {/* Dropdown Row (Pushes Other Rows) */}
                                {expandedRow === table.id && (
                                    <tr className="bg-gray-50/80 hover:bg-gray-100 transition duration-300">
                                        <td colSpan="6" className="py-6 px-8">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Image section */}
                                                <div className="flex flex-col gap-3 w-64 md:w-56">
                                                    <div className="w-full h-56 rounded-lg overflow-hidden shadow-lg border">
                                                        <img
                                                            src={table.imageUrl}
                                                            alt="table_image"
                                                            className="w-full h-full object-cover"
                                                        />
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
                                                            Number
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type table number here..."
                                                            value={
                                                                activeTable.number
                                                            }
                                                            onChange={(e) =>
                                                                setActiveTable(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            number: e
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
                                                            Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type table price here..."
                                                            value={
                                                                activeTable.price
                                                            }
                                                            onChange={(e) =>
                                                                setActiveTable(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            price: e
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
                                                            Category
                                                        </label>
                                                        {/* <input
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Select table category here..."
                                                            value={
                                                                activeTable.category
                                                            }
                                                            onChange={(e) =>
                                                                setActiveTable(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            category:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        };
                                                                    }
                                                                )
                                                            }
                                                        /> */}

                                                        <select
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Select table category here..."
                                                            value={activeTable.category}
                                                            onChange={(e) =>
                                                                setActiveTable(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            category:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        };
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <option value="normal">normal</option>
                                                            <option value="vip">vip</option>
                                                            <option value="couple">couple</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Description & Submit Button */}
                                                <div className="flex flex-col flex-1 justify-between">
                                                    <div></div>

                                                    <div className="flex flex-row justify-between">
                                                        <button className="px-6 py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                                                            Save Changes
                                                        </button>
                                                        <button className="px-6 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                                            Remove Table
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400">
                    Previous
                </button>
                <span className="text-gray-600 text-sm">Page 1 of 5</span>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400">
                    Next
                </button>
            </div>
        </div>
    );
}
