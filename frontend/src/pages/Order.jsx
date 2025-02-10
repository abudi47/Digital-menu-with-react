import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Order() {
    const cart = useSelector((state) => state.newOrder);

    const totalPrice = cart.reduce((sum, item) => sum + item.menu.price, 0);

    const products = [
        { name: "Product1", price: 100 },
        { name: "Product2", price: 100 },
        { name: "Product3", price: 100 },
        { name: "Product4", price: 100 },
    ];

    return (
        <div className="h-screen w-screen relative">
            <div className="bg-white relative pt-6">
                <div className="absolute w-full px-2 z-[4] text-white">
                    <h1 className="font-semibold text-2xl text-right">Order</h1>
                    <h2 className="font-semibold text-3xl pt-4">
                        Check Out List
                    </h2>
                </div>

                <div className="absolute w-full p-24 bg-primary rounded-b-[20%] top-[0] z-[1]" />

                <div className="absolute z-30 w-full py-6 top-24">
                    {/* Product List */}
                    <div className="shadow-md bg-white w-[96%] p-4 rounded-lg mx-auto">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-500">
                                <h1 className="text-2xl font-semibold">
                                    Cart is Empty
                                </h1>
                                <p className="text-lg">
                                    Please add some foods to your cart
                                </p>
                                <Link
                                    to="../"
                                    className="text-primary font-semibold"
                                >
                                    Back to Menu
                                </Link>
                            </div>
                        ) : (
                            cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-rows justify-between"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 pb-2">
                                        {item.menu.name}
                                    </h2>
                                    <p>${item.menu.price}</p>
                                </div>
                            ))
                        )}

                        <hr className="mt-2" />
                        <div className="flex flex-row justify-between pt-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Total
                            </h2>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                ${totalPrice}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Order Button */}
            <Link
                to="../payment-method"
                className="absolute bottom-4 w-full px-4"
            >
                <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                    Order Now
                </button>
            </Link>
        </div>
    );
}
