import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telebirr, chapa, cbe, abyssinia } from "../assets";
import axios from "../api/axios";

export default function PaymentMethod() {
    const dispatch = useDispatch();
    const paymentMethods = [
        { name: "Chapa", id: "chapa", image: chapa, isActive: true },
        { name: "TeleBirr", id: "telebirr", image: telebirr, isActive: false },
        { name: "CBE", id: "cbe", image: cbe, isActive: false },
        {
            name: "Abyssinia",
            id: "abyssinia",
            image: abyssinia,
            isActive: false,
        },
    ];
    const [selected, setSelected] = useState("chapa");
    const cart = useSelector((state) => state.newOrder)?.map((item) => {
        return { menu: item.menu.id, quantity: item.quantity };
    });

    const currentTable = useSelector((state) => state.table);

    const handleCheckOut = async () => {
        // console.log(cart);
        axios
            .post("/order/create", {
                paymentOption: selected,
                menus: cart,
                tableId: currentTable?.tableId,
            })
            .then((res) => {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: res.data?.message || null,
                        type: "success",
                        dismiss: 5000,
                    },
                });

                setTimeout(() => {
                    dispatch({ type: "SET_ORDER_HISTORY" });
                    dispatch({ type: "CLEAR_CART" });
                    window.location.href = res.data?.data?.checkout_url;
                }, 2000);
            })
            .catch((err) => {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: err?.response?.data?.error || null,
                        type: "error",
                        dismiss: 5000,
                    },
                });
            });
    };

    useEffect(() => {
        // fetch all payment methods
        axios
            .get("/payment/options")
            .then((res) => {
                // console.log(res.data.data);
            })
            .catch((err) => {
                console.log("display network error here.");
            });
    }, []);

    return (
        <div className="h-screen w-screen grid grid-rows-[1fr_6rem] overflow-hidden">
            <div className="h-full w-full relative overflow-x-hidden">
                <div className="bg-white relative pt-6 z-0">
                    <div className="absolute w-full p-24 bg-primary rounded-b-[20%] top-[0] z-[1]" />
                    <div className="absolute w-full px-2 z-[4] text-white">
                        <h1 className="font-semibold text-2xl text-right">.</h1>
                        <h2 className="font-semibold text-3xl pt-4">
                            Payment Method
                        </h2>
                    </div>

                    <div className="absolute z-30 w-full py-6 top-24">
                        <div className="flex flex-wrap gap-4 flex-row justify-between shadow-md bg-white w-[94%] p-4 rounded-lg mx-auto max-h-[70vh] overflow-y-scroll">
                            {paymentMethods.map((method, index) => (
                                <div
                                    key={method.id}
                                    className={`max-w-28 border rounded-lg overflow-hidden shadow-lg ${
                                        selected === method.id &&
                                        "border-8 border-green-500/40"
                                    }`}
                                    onClick={() => {
                                        if (method.isActive) {
                                            setSelected(method.id);
                                        } else {
                                            dispatch({
                                                type: "SHOW_ALERT",
                                                payload: {
                                                    message:
                                                        "This payment method is not currently active",
                                                    type: "warning",
                                                    dismiss: 3000,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    <img
                                        src={method.image}
                                        alt={method.name}
                                        className="object-cover w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                {/* Order Button */}
                <div
                    className="absolute bottom-4 w-full px-4 z-10"
                    onClick={handleCheckOut}
                >
                    <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
