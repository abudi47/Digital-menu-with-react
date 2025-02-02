import React from "react";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

export default function BasicStatistics() {
    return (
        <div className="flex justify-between items-center rounded-xl bg-white text-gray-700 py-4 px-8 shadow-md shadow-slate-200">
            <div className="flex flex-row gap-4 items-center">
                <div className="flex justify-center items-center min-h-20 min-w-20 rounded-full border">
                    <RoomServiceOutlinedIcon className="!w-12 !h-12" />
                </div>
                <div className="flex flex-col justify-between">
                    <p className="text-gray-400 text-sm">Daily services</p>
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
                    <p className="text-gray-400 text-sm">Daily Profit</p>
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
                    <p className="text-gray-400 text-sm">Monthly Profit</p>
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
    );
}
