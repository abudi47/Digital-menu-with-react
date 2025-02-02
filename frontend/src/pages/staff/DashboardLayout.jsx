import React from "react";

export default function DashboardLayout() {
    return (
        <div className="grid grid-cols-[0.2fr_1fr]">
            <div className="border h-screen">
                <i className="fa-google text-green-500 text-3xl" /><h1>Dashboard</h1>
            </div>

            <div className="border h-screen overflow-y-scroll">

            </div>
        </div>
    );
}
