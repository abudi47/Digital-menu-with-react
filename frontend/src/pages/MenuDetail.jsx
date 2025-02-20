import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

export default function MenuDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.newOrder);
    const location = useLocation();
    const menu = location.state?.menu;
    const [quantity, setQuantity] = useState(1);

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function addToCart() {
        const newMenu = {
            menu: menu,
            quantity: quantity,
        };

        const isExist = cart.filter((item) => {
            return item.menu?.id === menu.id;
        });

        if (isExist.length == 0) {
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    menu: newMenu,
                },
            });
            dispatch({
                type: "SHOW_ALERT",
                payload: {
                    message: "New item added to cart",
                    type: "success",
                    dismiss: 5000,
                },
            });
            navigate("../");

            console.log("New item added");
        } else {
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    menu: newMenu,
                },
            });

            dispatch({
                type: "SHOW_ALERT",
                payload: {
                    message: "Item quantity updated",
                    type: "success",
                    dismiss: 5000,
                },
            });
            navigate("../");
        }
        

    }

    return (
        <div className="flex h-screen w-screen relative">
            <div className="flex flex-col w-full mx-2 borderx border-red-500x mt-4">
                <div className="w-full max-h-34 min-h-32 rounded-lg overflow-hidden">
                    <img
                        src={menu.imageUrl + "_400"}
                        alt="menu_image"
                        className="w-full object-cover"
                    />
                </div>

                <div className="flex justify-between">
                    <h1 className="text-gray-700 text-3xl font-semibold px-2 mt-4">
                        {menu.name}
                    </h1>
                    <div className="flex gap-2 px-2 mt-4 items-center">
                        <span className="text-gray-500">price</span>
                        <span className="text-gray-600 text-2xl font-semibold">
                            ${menu.price}
                        </span>
                    </div>
                </div>

                <div className="flex gap-0.5 px-2 py-2 text-yellow-500">
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                    <StarOutlinedIcon />
                </div>

                <hr className="mt-2 py-1" />

                <p className="text-gray-600 text-base px-2 pt-2">
                    {menu.description}
                </p>

                <hr className="mt-2 py-1 opacity-35" />

                <div className="flex justify-between text-gray-600 px-2 overflow-hidden">
                    <h4 className="font-semibold text-xl">Quantity:</h4>

                    <div className="">
                        <div className="flex border items-center">
                            <span
                                className="max-w-8 min-w-8 text-center"
                                onClick={decrementQuantity}
                            >
                                <RemoveOutlinedIcon className="" />
                            </span>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="max-w-10 text-lg border text-center font-semibold"
                            />
                            <span
                                className="max-w-8 min-w-8 text-center"
                                onClick={incrementQuantity}
                            >
                                <AddOutlinedIcon className="" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 w-full px-4" onClick={addToCart}>
                <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                    Add Food
                </button>
            </div>
        </div>
    );
}
