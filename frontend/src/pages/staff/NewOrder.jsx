import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchField from "../../components/SearchField";

export default function NewOrder() {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleMenu = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const orders = [
        {
            id: 1,
            name: "John Doe",
            table: "2",
            orderTime: new Date(),
            menus: ["Egg", "Toast", "Juice"],
            status: "Pending",
        },
        {
            id: 2,
            name: "Jane Smith",
            table: "12",
            orderTime: new Date(),
            menus: ["Pasta", "Salad"],
            status: "Pending",
        },
        {
            id: 3,
            name: "Sam Wilson",
            table: "4",
            orderTime: new Date(),
            menus: ["Burger", "Fries", "Soda"],
            status: "Served",
        },
    ];
    return (
        <div>
            {/* Table Header */}
            <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h3>New Orders</h3>

                    <SearchField />
                </div>
                <div className="flex flex-row justify-end">
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300">
                        <AddOutlinedIcon />
                        <span className="ml-2">Create Order</span>
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
                            <th className="p-3">Table</th>
                            <th className="p-3">Order Time</th>
                            <th className="p-3 text-center">Menus</th>
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                {/* Main Row */}
                                <tr key={order.id} className="border-t">
                                    <td className="p-3">{order.id}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">{order.table}</td>
                                    <td className="p-3">
                                        {order.orderTime.toLocaleTimeString()}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => toggleMenu(order.id)}
                                            className="text-blue-600 underline"
                                        >
                                            {order.menus[0]} ▾{" "}
                                            {/* Show only the first menu item */}
                                        </button>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                            order.status === "Served"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>

                                {/* Dropdown Row (Pushes Other Rows) */}
                                {expandedRow === order.id && (
                                    <tr className="bg-gray-100">
                                        <td colSpan="6" className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {order.menus.map(
                                                    (menu, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                                                        >
                                                            {menu}
                                                        </span>
                                                    )
                                                )}
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
