import { useState } from "react";
import { telebirr, chapa, cbe, abyssinia } from "../assets";

export default function PaymentMethod() {
    const [selected, setSelected] = useState(null);

    const paymentMethods = [
        { name: "TeleBirr", id: "telebirr", image: telebirr },
        { name: "CBE", id: "cbe", image: cbe },
        { name: "Chapa", id: "chapa", image: chapa },
        { name: "Abyssinia", id: "abyssinia", image: abyssinia },
    ];

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
                                    onClick={() => setSelected(method.id)}
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
                <div className="absolute bottom-4 w-full px-4 z-10">
                    <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
