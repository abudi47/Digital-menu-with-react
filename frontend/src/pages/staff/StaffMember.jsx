import React from "react";

export default function StaffMember() {
    return (
        <div>
            {/* Table Header */}
            <div className="p-4 font-bold">Staff Members</div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Table Head */}
                    <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-center">Status</th>
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
                                <td className="p-3">{user.email}</td>
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
                <span className="text-gray-600 text-sm">Page 1 of 5</span>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-400">
                    Next
                </button>
            </div>
        </div>
    );
}
