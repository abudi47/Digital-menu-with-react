import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchField from "../../components/SearchField";

export default function Menu() {
    const [expandedRow, setExpandedRow] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (menu) => {
        setExpandedRow(expandedRow === menu.id ? null : menu.id);
        setActiveMenu(activeMenu == menu ? null : menu);
    };

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
            imageUrl: [
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
                "https://kids.kiddle.co/images/thumb/6/6e/Naporitan_by_yamauchi.jpg/300px-Naporitan_by_yamauchi.jpg",
            ],
            isAvailable: true,
        },
        {
            id: 2,
            name: "Grilled Chicken Salad",
            description:
                "Fresh greens with grilled chicken, cherry tomatoes, and dressing.",
            price: 9.99,
            category: "Salads",
            imageUrl: [
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
                "https://kids.kiddle.co/images/thumb/6/6e/Naporitan_by_yamauchi.jpg/300px-Naporitan_by_yamauchi.jpg",
            ],
            isAvailable: true,
        },
        {
            id: 3,
            name: "Cheeseburger",
            description:
                "Juicy beef patty with cheddar cheese, lettuce, and tomato.",
            price: 8.99,
            category: "Burgers",
            imageUrl: [
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
                "https://kids.kiddle.co/images/thumb/6/6e/Naporitan_by_yamauchi.jpg/300px-Naporitan_by_yamauchi.jpg",
            ],
            isAvailable: false,
        },
        {
            id: 4,
            name: "Chocolate Cake",
            description: "Rich and moist chocolate cake topped with ganache.",
            price: 6.99,
            category: "Desserts",
            imageUrl: [
                "https://www.recipetineats.com/tachyon/2014/06/Pasta1.jpg",
                "https://kids.kiddle.co/images/thumb/6/6e/Naporitan_by_yamauchi.jpg/300px-Naporitan_by_yamauchi.jpg",
            ],
            isAvailable: true,
        },
    ];

    // expanded
    const [currentImage, setCurrentImage] = useState(0);

    const handleNextImage = (menu) => {
        setCurrentImage((prev) => (prev + 1) % menu.imageUrl.length);
    };

    const handlePrevImage = (menu) => {
        setCurrentImage(
            (prev) => (prev - 1 + menu.imageUrl.length) % menu.imageUrl.length
        );
    };
    // ==============

    return (
        <div>
            {/* Table Header */}
            <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h3>Menu</h3>

                    <SearchField />
                </div>
                <div className="flex flex-row justify-end">
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300">
                        <AddOutlinedIcon />
                        <span className="ml-2">Add Menu</span>
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
                            <th className="p-3">Description</th>
                            <th className="p-3">Price</th>
                            <th className="p-3 text-center">Category</th>
                            <th className="p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700 text-nowrap">
                        {menuItems.map((menu, index) => (
                            <React.Fragment key={menu.id}>
                                <tr key={index} className="border-t">
                                    <td className="p-3">{menu.id}</td>
                                    <td
                                        className="p-3"
                                        onClick={() => toggleMenu(menu)}
                                    >
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

                                {/* Dropdown Row (Pushes Other Rows) */}
                                {expandedRow === menu.id && (
                                    <tr className="bg-gray-50/80 hover:bg-gray-100 transition duration-300">
                                        <td colSpan="6" className="py-6 px-8">
                                            <div className="flex flex-col md:flex-row gap-6 items-centerx">
                                                {/* Image section */}
                                                <div className="flex flex-col gap-3 w-64 md:w-56">
                                                    <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg border">
                                                        <img
                                                            src={
                                                                menu.imageUrl[
                                                                    currentImage
                                                                ]
                                                            }
                                                            alt="menu_image"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {/* Image Navigation Buttons */}
                                                        <div className="absolute inset-0 flex justify-between items-center px-2">
                                                            <button
                                                                onClick={() =>
                                                                    handlePrevImage(
                                                                        activeMenu
                                                                    )
                                                                }
                                                                className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                                                            >
                                                                <ChevronLeftOutlinedIcon className="!w-6 !h-6" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleNextImage(
                                                                        activeMenu
                                                                    )
                                                                }
                                                                className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                                                            >
                                                                <ChevronRightOutlinedIcon className="!w-6 !h-6" />
                                                            </button>
                                                        </div>
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
                                                            Name
                                                        </label>
                                                        <input
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type menu name here..."
                                                            value={
                                                                activeMenu.name
                                                            }
                                                            onChange={(e) =>
                                                                setActiveMenu(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            name: e
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
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type menu price here..."
                                                            value={
                                                                activeMenu.price
                                                            }
                                                            onChange={(e) =>
                                                                setActiveMenu(
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
                                                        <input
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type menu category here..."
                                                            value={
                                                                activeMenu.category
                                                            }
                                                            onChange={(e) =>
                                                                setActiveMenu(
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
                                                        />
                                                    </div>
                                                </div>

                                                {/* Description & Submit Button */}
                                                <div className="flex flex-col flex-1 justify-between">
                                                    <div className="w-full max-w-sm min-w-[200px]">
                                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                                                            placeholder="Type menu description here..."
                                                            value={
                                                                activeMenu.description
                                                            }
                                                            onChange={(e) =>
                                                                setActiveMenu(
                                                                    (prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            description:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        };
                                                                    }
                                                                )
                                                            }
                                                            rows="3"
                                                        />
                                                    </div>

                                                    <div className="flex flex-row justify-between">
                                                        <button className="px-6 py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                                                            Save Changes
                                                        </button>
                                                        <button className="px-6 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                                            Remove Menu
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
