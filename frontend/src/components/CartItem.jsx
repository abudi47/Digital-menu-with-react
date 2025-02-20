import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { truncateText } from "../utils";

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.newOrder);
    const handleRemove = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                menu: item.menu,
            },
        });

        dispatch({
            type: "SHOW_ALERT",
            payload: {
                message: "Item removed from cart",
                type: "info",
                dismiss: 5000,
            },
        });
    };

    return (
        <div className="flex flex-row gap-2 my-4 border-b-2 border-gray-300 pb-4">
            <div className="w-20 h-20 min-w-20 overflow-hidden rounded-md">
                <img
                    src={item.menu.imageUrl + "_200"}
                    alt={item.menu.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-between">
                <span>
                    <h3 className="text-lg font-semibold text-gray-700 text-nowrap">
                        {truncateText(item.menu.name, 15)}
                    </h3>
                    <h3 className="text-sm text-gray-600 text-nowrap">
                        {truncateText(item.menu.name, 30)}
                    </h3>
                </span>
                <h3 className="text-lg font-semibold text-nowrap text-primary">
                    ${item.menu.price}
                </h3>
            </div>

            <div className="flex flex-col flex-1 justify-between items-end">
                <CloseOutlinedIcon
                    className="text-red-500 text-right"
                    onClick={handleRemove}
                />

                <div>
                    <span className="text-gray-600">Quantity: {" "}</span>
                    <span className="text-gray-700 font-semibold">
                        {item.quantity}
                    </span>
                </div>
            </div>
        </div>
    );
}
