import { Link } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import SearchField from "../components/SearchField";
import RatedMenuCard from "../components/RatedMenuCard";
import Categories from "../components/Categories";
import MenuCard from "../components/MenuCard";

export default function Menu() {
    const categories = Array(6).fill(<Categories />);
    const ratedMenuCards = Array(4).fill(<RatedMenuCard />);
    const menuCards = Array(4).fill(<MenuCard />);

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

            {/* Highly rated dishes */}
            <div className="overflow-hidden overflow-y-scroll px-1">
                <div className="flex flex-row gap-4 overflow-x-scroll px-1 py-3">
                    {ratedMenuCards.map((card, index) => (
                        <div key={index}>{card}</div>
                    ))}
                </div>
                <h3 className="text-3xl font-semibold text-gray-800 my-2 py-1 px-2">
                    Other Menu
                </h3>
                <div className="flex flex-col gap-4 px-2">
                    {menuCards.map((card, index) => (
                        <div key={index}>{card}</div>
                    ))}
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
