import { useState } from "react";
import { Link } from "react-router-dom";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { spaghetti } from "../assets";

export default function MenuDetail() {
    const [quantity, setQuantity] = useState(1)
    const [cartItems, setCartItems] = useState([]);

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function addToCart() {
        const newItem = {
            id: 1,
            name: "greg del",
            quantity: cart,
        };

        setCartItems([...cartItems, newItem]);
        console.log(cartItems);
    }
    return (
        <div className="flex h-screen w-screen relative">
            <div className="flex flex-col w-full mx-2 borderx border-red-500x mt-4">
                <div className="w-full max-h-34 min-h-32 rounded-lg overflow-hidden">
                    <img src={spaghetti} alt="menu_image" className="w-full object-cover" />
                </div>

                <div className="flex justify-between">
                    <h1 className="text-gray-700 text-3xl font-semibold px-2 mt-4">
                        Spaghetti
                    </h1>
                    <div className="flex gap-2 px-2 mt-4 items-center">
                        <span className="text-gray-500">price</span>
                        <span className="text-gray-600 text-2xl font-semibold">
                            $120
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

                <p className="text-gray-600 text-base px-2 pt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia totam quod suscipit deserunt molestias delectus magni aut eos dolor nostrum corporis eum doloremque explicabo, commodi accusamus vero, labore dicta ipsam.</p>

                <hr className="mt-2 py-1 opacity-35" />

                <div className="flex justify-between text-gray-600 px-2 overflow-hidden">
                  <h4 className="font-semibold text-xl">Quantity:</h4>
                  
                  <div className="">
                      <div className="flex border items-center">
                        <span className="max-w-8 min-w-8 text-center" onClick={decrementQuantity}><RemoveOutlinedIcon className="" /></span>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="max-w-10 text-lg border text-center font-semibold" />
                        <span className="max-w-8 min-w-8 text-center" onClick={incrementQuantity} ><AddOutlinedIcon className="" /></span>
                      </div>
                  </div>
                </div>

            </div>
            <Link
                to="../payment-method"
                className="absolute bottom-4 w-full px-4"
            >
                <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                    Add Food
                </button>
            </Link>
        </div>
    );
}
