import React from "react";
import SearchField from "../../components/SearchField";

export default function Menu() {
    const truncateText = (text, limit = 20) =>
        text.length > limit ? text.substring(0, limit) + "..." : text;

    const menuItems = [
        {
            id: 1,
            name: "Margherita Pizza",
            description:
                "Classic pizza with fresh tomatoes, mozzarella, and basil.",
            price: 12.99,
            category: "Pizza",
            imageUrl: "https://via.placeholder.com/100",
            isAvailable: true,
        },
        {
            id: 2,
            name: "Grilled Chicken Salad",
            description:
                "Fresh greens with grilled chicken, cherry tomatoes, and dressing.",
            price: 9.99,
            category: "Salads",
            imageUrl: "https://via.placeholder.com/100",
            isAvailable: true,
        },
        {
            id: 3,
            name: "Cheeseburger",
            description:
                "Juicy beef patty with cheddar cheese, lettuce, and tomato.",
            price: 8.99,
            category: "Burgers",
            imageUrl: "https://via.placeholder.com/100",
            isAvailable: false,
        },
        {
            id: 4,
            name: "Chocolate Cake",
            description: "Rich and moist chocolate cake topped with ganache.",
            price: 6.99,
            category: "Desserts",
            imageUrl: "https://via.placeholder.com/100",
            isAvailable: true,
        },
    ];
    return (
        <div>
            {/* Table Header */}
            <div className="p-4 mb-4 font-bold flex flex-row justify-between items-center">
                <h3>Menu</h3>

                <div className="flex flex-row">
                    <SearchField  />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Table Head */}
                    <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Price</th>
                            <th className="p-3 text-center">Category</th>
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700 text-nowrap">
                        {menuItems.map((menu, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{menu.id}</td>
                                <td className="p-3">
                                    <p title={menu.name}>
                                        {truncateText(menu.name)}
                                    </p>
                                </td>
                                <td className="p-3">
                                    <p title={menu.description}>
                                        {truncateText(menu.description)}
                                    </p>
                                </td>
                                <td className="p-3">{`Br ${menu.price}`}</td>
                                <td className="p-3">{menu.category}</td>
                                <td className="p-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                          menu.isAvailable === true
                              ? "bg-green-100 text-green-700"
                              : menu.status === false
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                                    >
                                        {String(menu.isAvailable)}
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
