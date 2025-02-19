import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { truncateText, capitalize } from "../../utils/index";
import { axiosPrivate } from "../../api/axios";
import SearchField from "../../components/SearchField";

export default function Menu() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    const [page, setPage] = useState(SearchParams.get("page") || 1);
    const limit = SearchParams.get("limit") || 3;

    const [expandedRow, setExpandedRow] = useState(null);
    const [overlayForm, setOverlayForm] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const [menuItems, setMenuItems] = useState(null);
    const [newMenu, setNewMenu] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        menu_image: "",
        isAvailable: true,
    });

    const changeHandler = (e) => {
        if (e.target.name === "menu_image") {
            setNewMenu((prev) => {
                return { ...prev, [e.target.name]: e.target.files[0] };
            });
        } else {
            setNewMenu((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };

    const toggleMenu = (menu) => {
        setExpandedRow(expandedRow === menu.id ? null : menu.id);
        setActiveMenu(activeMenu == menu ? null : menu);
    };

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
    // ===================

    const handleNewMenu = async (e) => {
        e.preventDefault();
        axiosPrivate
            .post("/menu", newMenu, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: res?.data?.message || null,
                        type: "success",
                        dismiss: 9000,
                    },
                });
                setOverlayForm(false);
            })
            .catch((err) => {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: err?.response?.data?.error || null,
                        type: "warning",
                        dismiss: 9000,
                    },
                });
            });
    };

    useEffect(() => {
        axiosPrivate.get(`/menu?page=${page}&limit=${limit}`).then((res) => {
            setMenuItems(res.data?.data);
        });
    }, [page]);
    return (
        <>
            <div>
                {/* Table Header */}
                <div className="p-4 mb-4 font-bold flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <h3>Menu</h3>

                        <SearchField />
                    </div>
                    <div className="flex flex-row justify-end">
                        <button
                            className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-600 transition duration-300"
                            onClick={() => setOverlayForm(true)}
                        >
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
                            {menuItems?.menus?.map((menu, index) => (
                                <React.Fragment key={menu.id}>
                                    <tr key={menu.id} className="border-t">
                                        <td className="p-3">{index + 1}</td>
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
                                        <td className="p-3 text-center">
                                            {menu.category}
                                        </td>
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
                                            <td
                                                colSpan="6"
                                                className="py-6 px-8"
                                            >
                                                <div className="flex flex-col md:flex-row gap-6 items-centerx">
                                                    {/* Image section */}
                                                    <div className="flex flex-col gap-3 w-64 md:w-56">
                                                        <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg border">
                                                            <img
                                                                src={
                                                                    menu
                                                                        .imageUrl[
                                                                        currentImage
                                                                    ]+"_400"
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
                                                                        (
                                                                            prev
                                                                        ) => {
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
                                                                        (
                                                                            prev
                                                                        ) => {
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
                                                                        (
                                                                            prev
                                                                        ) => {
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
                                                                        (
                                                                            prev
                                                                        ) => {
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
                        Page {page} of {Math.ceil(menuItems?.length / limit)}
                    </span>
                    <button
                        onClick={() => {
                            setPage((p) => {
                                if (p < Math.ceil(menuItems?.length / limit)) {
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

            {/* screen overlay box */}
            <div
                className={`${
                    overlayForm ? "fixed" : "hidden"
                } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <button
                                className="p-2"
                                onClick={() => setOverlayForm(false)}
                            >
                                <CloseOutlinedIcon className="hover:text-primary" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">
                            Add Menu
                        </h2>
                    </div>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleNewMenu}
                    >
                        <input
                            name="name"
                            value={newMenu.name}
                            onChange={changeHandler}
                            type="text"
                            placeholder="Menu Name"
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            name="price"
                            value={newMenu.price}
                            onChange={changeHandler}
                            type="number"
                            placeholder="Price"
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                            name="category"
                            value={newMenu.category}
                            onChange={changeHandler}
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select Category</option>
                            <option value="starter">Starter</option>
                            <option value="soft_drink">Soft Drink</option>
                            <option value="unknown">Unknown</option>
                        </select>
                        <textarea
                            name="description"
                            value={newMenu.description}
                            onChange={changeHandler}
                            placeholder="Description"
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                        <input
                            name="menu_image"
                            onChange={changeHandler}
                            type="file"
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div>
                            <input
                                name="isAvailable"
                                value={newMenu.isAvailable}
                                onChange={changeHandler}
                                type="checkbox"
                                className=""
                            />{" "}
                            isAvailable
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-600 transition duration-300">
                                Add Menu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
