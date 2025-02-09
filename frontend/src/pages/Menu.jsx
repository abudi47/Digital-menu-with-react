import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import SearchField from "../components/SearchField";
import RatedMenuCard from "../components/RatedMenuCard";
import Categories from "../components/Categories";
import MenuCard from "../components/MenuCard";
import axios from "../api/axios";

export default function Menu() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    const [page, setPage] = useState(SearchParams.get("page") || 1);
    const limit = SearchParams.get("limit") || 3;
    const [category, setCategory] = useState("");
    const [menu, setMenu] = useState({
        menus: [],
        length: 0,
    });
    const categories = Array(6).fill(<Categories />);
    const ratedMenuCards = Array(4).fill(<RatedMenuCard />);

    const handleScroll = (e) => {
        const isBottom =
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 5; // Allow small margin

        if (isBottom && page < Math.ceil(menu?.length / limit)) {
            console.log("bottom");
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        document.title = "Melody | Menu";
        // console.log(`/menu?category=${category}&page=${page}&limit=${limit}`);
        axios
            .get(`/menu?page=${page}&limit=${limit}&query=${""}`)
            .then((response) => {
                setMenu((prev) => {
                    return {
                        menus: [...prev.menus, ...response.data?.data?.menus],
                        length: response.data.data.length,
                    };
                });
                console.log("updated", response.data);
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
    }, [page]);

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
                {categories.map((category, index) => (
                    <div key={index}>{category}</div>
                ))}
            </div>

            {/* Menus */}
            <div
                className="overflow-hidden overflow-y-scroll px-1 borderx border-red-500x"
                onScroll={handleScroll}
            >
                {/* Highly rated dishes */}
                <div className="flex flex-row gap-4 overflow-x-scroll px-1 py-3">
                    {ratedMenuCards.map((card, index) => (
                        <div key={index}>{card}</div>
                    ))}
                </div>

                <h3 className="text-3xl font-semibold text-gray-800 my-2 py-1 px-2">
                    Other Menu
                </h3>
                <div className="flex flex-col gap-4 px-2">
                    {menu.menus.map((menu, index) => {
                        return <MenuCard key={menu.id} menu={menu} />;
                    })}
                </div>
            </div>

            <Link
                to="cart"
                className="absolute !w-16 !h-16 bottom-4 right-4 rounded-full bg-primary border-4 border-white flex items-center justify-center shadow-lg"
            >
                <div className="relative w-full h-full">
                    <div className="absolute -top-2 -right-2 flex justify-center items-center p-2 bg-red-500 rounded-full w-7 h-7 text-white font-semibold border-4 border-white">
                        <span>3</span>
                    </div>
                    <RoomServiceOutlinedIcon className="text-white !w-12 !h-12 pl-[0.6rem] pt-1" />
                </div>
            </Link>
        </div>
    );
}
