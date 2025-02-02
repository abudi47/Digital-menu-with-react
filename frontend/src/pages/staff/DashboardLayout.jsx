import React from "react";
import { Outlet, Link } from "react-router-dom";
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
import Button from "../../components/Button";
import { userAvatar } from "../../assets";

export default function DashboardLayout() {
    return (
        <div className="grid grid-cols-[0.25fr_1fr] gap-8 bg-blue-50">
            {/* side menu */}
            <div className="flex flex-col h-screen bg-white shadow-md shadow-slate-200">
                <div className="flex flex-row items-center gap-2 w-full justify-center my-6">
                    <DashboardOutlinedIcon className="text-gray-700" />
                    <Link to="/dashboard" className="text-2xl font-semibold text-gray-700">
                        Dashboard
                    </Link>
                </div>

                <div className="flex flex-1 flex-col gap-1 mt-4 overflow-x-hidden">
                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <QueryStatsOutlinedIcon className="" />
                            <p className="">Report Status</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <Link to="new-order" className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <SubscriptionsOutlinedIcon className="" />
                            <p className="">New Orders</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </Link>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <HistoryOutlinedIcon className="" />
                            <p className="">Order History</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <RestaurantMenuOutlinedIcon className="" />
                            <p className="">Menu</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <TableBarOutlinedIcon className="" />
                            <p className="">Table</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </div>

                    <Link to="staff-member" className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
                        <div className="flex flex-row gap-4">
                            <PeopleAltOutlinedIcon className="" />
                            <p className="">Staff Members</p>
                        </div>

                        <ArrowForwardIosOutlinedIcon className="!w-3 !h-3" />
                    </Link>

                    <div className="flex flex-row justify-between items-center text-gray-500 px-6 hover:bg-primary py-4 rounded-l-lg hover:text-white cursor-pointer">
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

                    {/* main content */}
                    <div className="flexx justify-between items-center rounded-xl bg-white text-gray-700 py-4 px-8 shadow-md shadow-slate-200">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
