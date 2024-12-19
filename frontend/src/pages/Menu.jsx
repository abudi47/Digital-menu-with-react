import React from "react";

export default function Menu() {
  return (
    <div className="h-screen w-screen grid grid-rows-[9rem_1fr_1fr] bg-primary">
      {/* Header */}
      <div className="bg-brown pt-6 px-2 rounded-b-lg">
        <div className="flex justify-between pb-2">
          <h1 className="font-semibold text-3xl text-primary text-nowrap">
            Melody
          </h1>
          <h2 className="font-semibold text-2xl text-primary text-nowrap">Menu</h2>
        </div>

        <div className="w-full bg-white rounded-md">
            <input type="text" placeholder="Search..." className="p-2 rounded-md" />
        </div>
      </div>
      <div className="border"></div>
      <div className="border"></div>
    </div>
  );
}
