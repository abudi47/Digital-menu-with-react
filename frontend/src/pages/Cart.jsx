import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useEffect } from "react";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.newOrder);
    const table = useSelector((state) => state.table);

    console.log("table state", table);
    
    useEffect(() => {
        if (table?.isAvailable === false) {
            navigate("../../menu")
        }
    }, [])


    return (
        <div className="h-screen w-screen grid grid-rows-[1fr_6rem] overflow-hidden">
            <div className="h-full w-full relative overflow-x-hidden">
                <div className="bg-white relative pt-6 z-0">
                    <div className="absolute w-full p-24 bg-primary rounded-b-[20%] top-[0] z-[1]" />
                    <div className="absolute w-full px-2 z-[4] text-white">
                        <h1 className="font-semibold text-2xl text-right">.</h1>
                        <h2 className="font-semibold text-3xl pt-4">
                            Your Recipes
                        </h2>
                    </div>

                    <div className="absolute z-30 w-full py-6 top-24">
                        <div className="shadow-md bg-white w-[94%] p-4 rounded-lg mx-auto max-h-[70vh] overflow-y-scroll">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500">
                                    <h1 className="text-2xl font-semibold">
                                        Cart is Empty
                                    </h1>
                                    <p className="text-lg">
                                        Please add some foods to your cart
                                    </p>

                                    <Link to="../" className="text-primary font-semibold">
                                      Back to Menu
                                    </Link>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <CartItem key={index} item={item} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                {/* Order Button */}
                <Link
                    to="../order"
                    className="absolute bottom-4 w-full px-4 z-10"
                >
                    <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                        Check Out
                    </button>
                </Link>
            </div>
        </div>
    );
}
