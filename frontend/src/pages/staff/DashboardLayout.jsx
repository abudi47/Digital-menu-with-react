import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import Button from "../../components/Button";
import { userAvatar } from "../../assets";

export default function DashboardLayout() {
    return (
        <div className="grid grid-cols-[0.25fr_1fr] gap-8 bg-blue-50">
            {/* side menu */}
            <div className="flex flex-col h-screen bg-white shadow-md shadow-slate-200">
                <div className="flex flex-row items-center gap-2 w-full justify-center my-6">
                    <DashboardOutlinedIcon className="text-gray-700" />
                    <h1 className="text-2xl font-semibold text-gray-700">
                        Dashboard
                    </h1>
                </div>

                <div className="flex flex-1 flex-col gap-1 mt-4 overflow-x-hidden">
                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <QueryStatsOutlinedIcon className="" />
                            <p className="">Report Status</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <SubscriptionsOutlinedIcon className="" />
                            <p className="">New Orders</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <HistoryOutlinedIcon className="" />
                            <p className="">Order History</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <RestaurantMenuOutlinedIcon className="" />
                            <p className="">Menu</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <TableBarOutlinedIcon className="" />
                            <p className="">Table</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <PeopleAltOutlinedIcon className="" />
                            <p className="">Staff Members</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-r-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <SettingsOutlinedIcon className="" />
                            <p className="">Settings</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>
                </div>

                <div className="flex justify-center px-6 mb-6">
                    <Button
                        text="LOGOUT"
                        type="button"
                        containerStyle="w-full"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="h-screen overflow-y-scroll">
                <div className="flex flex-col gap-6 mt-8 mr-8">
                    {/* content header */}
                    <div className="flex justify-between items-center rounded-xl bg-white py-4 px-4 shadow-md shadow-slate-200">
                        <ListOutlinedIcon className="!w-8 !h-8 text-gray-500 cursor-pointer hover:text-primary" />

                        <div className="flex text-gray-500 gap-2 cursor-pointer hover:text-primary">
                            <div className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden border">
                                <img
                                    src={userAvatar}
                                    alt="user_avatar"
                                    className="object-cover w-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-nowrap">Hiwot Yossef</p>
                                <p className="text-nowrap text-sm text-left text-gray-400">
                                    Admin
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* basic statistics */}
                    <div className="flex justify-between items-center rounded-xl bg-white text-gray-700 py-4 px-8 shadow-md shadow-slate-200">
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex justify-center items-center min-h-20 min-w-20 rounded-full border">
                                <RoomServiceOutlinedIcon className="!w-12 !h-12" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-gray-400 text-sm">
                                    Daily services
                                </p>
                                <p className="text-2xl font-semibold">275</p>
                                <p>
                                    <span className="text-green-500 text-sm">
                                        <ArrowUpwardOutlinedIcon />
                                        25%{" "}
                                    </span>
                                    this day
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex justify-center items-center w-20 h-20 rounded-full border">
                                <MonetizationOnOutlinedIcon className="!w-12 !h-12" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-gray-400 text-sm">
                                    Daily Profit
                                </p>
                                <p className="text-2xl font-semibold">23,000</p>
                                <p>
                                    <span className="text-red-500 text-sm">
                                        <ArrowDownwardOutlinedIcon />
                                        25%{" "}
                                    </span>
                                    this day
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex justify-center items-center w-20 h-20 rounded-full border">
                                <MonetizationOnOutlinedIcon className="!w-12 !h-12" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-gray-400 text-sm">
                                    Monthly Profit
                                </p>
                                <p className="text-2xl font-semibold">275</p>
                                <p>
                                    <span className="text-green-500 text-sm">
                                        <ArrowUpwardOutlinedIcon />
                                        2%{" "}
                                    </span>
                                    this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* main content */}
                    <div className="flexx justify-between items-center rounded-xl bg-white text-gray-700 py-4 px-8 shadow-md shadow-slate-200">
                        {/* Table Header */}
                        <div className="p-4 font-bold">
                            Staff Members
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
                                        <th className="p-3 text-center">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="text-gray-700">
                                    {[
                                        {
                                            id: 1,
                                            name: "John Doe",
                                            email: "john@example.com",
                                            role: "Admin",
                                            status: "Active",
                                        },
                                        {
                                            id: 2,
                                            name: "Jane Smith",
                                            email: "jane@example.com",
                                            role: "Editor",
                                            status: "Pending",
                                        },
                                        {
                                            id: 3,
                                            name: "Sam Wilson",
                                            email: "sam@example.com",
                                            role: "User",
                                            status: "Inactive",
                                        },
                                    ].map((user, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="p-3">{user.id}</td>
                                            <td className="p-3">{user.name}</td>
                                            <td className="p-3">
                                                {user.email}
                                            </td>
                                            <td className="p-3">{user.role}</td>
                                            <td className="p-3 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                          user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center p-4">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400">
                                Previous
                            </button>
                            <span className="text-gray-600 text-sm">
                                Page 1 of 5
                            </span>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
