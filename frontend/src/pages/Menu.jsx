import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import SearchField from "../components/SearchField";
import RatedMenuCard from "../components/RatedMenuCard";
import Categories from "../components/Categories";
import MenuCard from "../components/MenuCard";
import { capitalize } from "../utils/index";
import axios from "../api/axios";

export default function Menu() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    const [page, setPage] = useState(SearchParams.get("page") || 1);
    const limit = SearchParams.get("limit") || 3;

    const cart = useSelector((state) => state.newOrder);

    const [activeCategory, setActiveCategory] = useState("");
    const [prevCategory, setPrevCategory] = useState("");

    const ratedMenuCards = Array(4).fill(<RatedMenuCard />);
    const [categories, setCategories] = useState(null);
    const [menu, setMenu] = useState({
        menus: [],
        length: 0,
    });

    const handleScroll = (e) => {
        const isBottom =
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 5; // Allow small margin

        if (isBottom && page < Math.ceil(menu?.length / limit)) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        document.title = "Melody | Menu";

        axios
            .get("/menu/categories")
            .then((res) => {
                setCategories(res.data.data?.categories);
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
    }, []);

    useEffect(() => {
        console.log(`/menu?category=${activeCategory}&page=${page}&limit=${limit}`);

        if (activeCategory !== prevCategory) {
            setPrevCategory(activeCategory); // Update previous category
            setPage(1); // Reset page
        }
        axios
            .get(
                `/menu?category=${activeCategory}&page=${page}&limit=${limit}&query=${""}`
            )
            .then((response) => {
                console.log(response.data.data);
                
                setMenu((prev) => {
                    if (activeCategory !== prevCategory) {
                        return {
                            menus: response.data?.data?.menus, // Set new data
                            length: response.data.data.length,
                        };
                    } else {
                        return {
                            menus: [
                                ...prev.menus,
                                ...response.data?.data?.menus,
                            ],
                            length: response.data.data.length,
                        };
                    }
                });
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
    }, [page, limit, activeCategory]);

    return (
        <div className="h-screen w-screen grid grid-rows-[9rem_4rem_1fr] gap-2 relative">
            {/* Header */}
            <div className="bg-primary pt-6 px-2 rounded-b-lg">
                <div className="flex justify-between pb-4 text-white">
                    <h1 className="font-semibold text-3xl">Melody</h1>
                    <h2 className="font-semibold text-2xl">Menu</h2>
                </div>

                <div className="w-full bg-white rounded-md">
                    <SearchField />
                </div>
            </div>
            {/* Categories */}
            <div className="flex gap-2 overflow-x-scroll mx-1">
                <Categories
                    category={{ name: ".  All .", value: "" }}
                    setCategory={setActiveCategory}
                    isActive={activeCategory == ""}
                />
                {categories?.map((category, index) => (
                    <Categories
                        key={index}
                        category={category}
                        setCategory={setActiveCategory}
                        isActive={activeCategory == category.value}
                    />
                ))}
            </div>

            {/* Menus */}
            <div
                className="overflow-hidden overflow-y-scroll px-1"
                onScroll={handleScroll}
            >
                {/* Highly rated dishes */}
                <div className="flex flex-row gap-4 overflow-x-scroll px-1 py-3">
                    {ratedMenuCards.map((card, index) => (
                        <div key={index}>{card}</div>
                    ))}
                </div>

                <h3 className="text-3xl font-semibold text-gray-800 my-2 py-1 px-2">
                    {activeCategory !== ""
                        ? capitalize(activeCategory)?.replace("_", " ")
                        : "All"}{" "}
                    Menu
                </h3>
                <div className="flex flex-col gap-4 px-2">
                    {menu.menus.map((menu, index) => {
                        return <MenuCard key={index} menu={menu} />;
                    })}
                </div>
            </div>

            <Link
                to="cart"
                className="absolute !w-16 !h-16 bottom-4 right-4 rounded-full bg-primary border-4 border-white flex items-center justify-center shadow-lg"
            >
                <div className="relative w-full h-full">
                    <div
                        className={`absolute -top-2 -right-2 flex justify-center items-center p-2 rounded-full w-7 h-7 text-white font-semibold border-4 border-white ${
                            cart.length <= 0 ? "bg-red-500" : "bg-green-500"
                        }`}
                    >
                        <span>{cart.length}</span>
                    </div>
                    <RoomServiceOutlinedIcon className="text-white !w-12 !h-12 pl-[0.6rem] pt-1" />
                </div>
            </Link>
        </div>
    );
}
