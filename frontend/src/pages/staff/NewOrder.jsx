import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchField from "../../components/SearchField";
import { truncateText } from "../../utils";
import { axiosPrivate } from "../../api/axios";
import socket from "../../api/socket";

export default function NewOrder() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    const [page, setPage] = useState(SearchParams.get("page") || 1);
    const limit = SearchParams.get("limit") || 10;

    const [data, setData] = useState([]);

    const dateFormatter = (time) => {
        const date = new Date(time)
        return date.toLocaleString()
    }

    useEffect(() => {
        console.log("=========: Socket useEffect");
        socket.on("newOrder", (data) => {
            setData((prev) => ({
                orders: [data?.order, ...(prev.orders || [])],
                length: prev.length,
            }));
            console.log("New Order Received: ", data.order);
        });

        return () => {
            socket.off("newOrder");
        };
    }, []);

    useEffect(() => {
        axiosPrivate
            .get(`/order?page=${page}&limit=${limit}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [page, limit]);

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleMenu = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
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
                            <th className="p-3 text-center">Payment Status</th>
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {data?.orders?.map((order, index) => (
                            <React.Fragment key={order.id}>
                                {/* Main Row */}
                                <tr key={order.id} className="border-t">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">
                                        {order?.table?.number || "Unknown"}
                                    </td>
                                    <td className="p-3">
                                        {/* {order.orderTime.toLocaleTimeString()} */}
                                        { dateFormatter(order.payment.updatedAt) }
                                    </td>
                                    <td className="p-3 text-left">
                                        <button
                                            onClick={() => toggleMenu(order.id)}
                                            className="text-blue-600 underline"
                                        >
                                            {truncateText(
                                                order?.orderItems
                                                    ?.map(
                                                        (item) => item.menu.name
                                                    )
                                                    .join(", "),
                                                20
                                            )}
                                            {/* Show the
                                            menu list
                                            {/* Show only the first menu item */}
                                        </button>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                            order?.payment?.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                                        >
                                            {order?.payment?.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                            order.status === "served"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending"
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
                                        <td colSpan="7" className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {order?.orderItems?.map(
                                                    (menu, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 text-gray-700 rounded-md text-sm"
                                                        >
                                                            {menu.menu.name} x{" "}
                                                            {menu.quantity}
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
                <button
                    onClick={() => {
                        setPage((p) => {
                            if (p > 1) {
                                return p - 1;
                            } else {
                                return 1;
                            }
                        });
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Previous
                </button>
                <span className="text-gray-600 text-sm">
                    Page {page} of {Math.ceil(data?.length / limit)}
                </span>
                <button
                    onClick={() => {
                        setPage((p) => {
                            if (p < Math.ceil(data?.length / limit)) {
                                return p + 1;
                            }
                            return p;
                        });
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
