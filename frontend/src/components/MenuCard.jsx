import { capitalize, truncateText } from "../utils/index";

export default function MenuCard({ menu }) {
    return (
        <div className="min-h-48 min-w-48 max-h-48 shadow-md rounded-lg overflow-hidden">
            <div className="h-[6rem] overflow-hidden">
                <img
                    src={menu?.imageUrl[0]}
                    alt="injera"
                    className="h-full w-full object-cover"
                />
            </div>
            <h1 className="text-gray-700 text-xl font-semibold px-2 mt-1 text-nowrap">
                {capitalize(menu?.name)}
            </h1>
            <h1 className="text-gray-500 px-2 text-nowrap">
                {truncateText(menu?.description, 10)}
            </h1>
            <div className="flex justify-between px-2 py-2">
                <h3>rating</h3>
                <h3>${menu.price}</h3>
            </div>
        </div>
    );
}
