import chik from "../assets/food/chicken.jpg";
import CartItem from "../components/CartItem";

export default function Cart() {
  const foods = [
    { name: "Roasted Chicken", image: chik, price: "1500" },
    { name: "Pasta", image: chik, price: "90" },
    { name: "Rice", image: chik, price: "150" },
    { name: "Chicken Wings", image: chik, price: "1500" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
    { name: "Tibs", image: chik, price: "2000" },
  ];
  return (
    <div className="h-screen w-screen grid grid-rows-[1fr_6rem] overflow-hidden">
      <div className="h-full w-full relative overflow-x-hidden">
        <div className="bg-white relative pt-6 z-0">
          <div className="absolute w-full p-24 bg-primary rounded-b-[20%] top-[0] z-[1]" />
          <div className="absolute w-full px-2 z-[4] text-white">
            <h1 className="font-semibold text-2xl text-right">.</h1>
            <h2 className="font-semibold text-3xl pt-4">Your Recipes</h2>
          </div>

          <div className="absolute z-30 w-full py-6 top-24">
            <div className="shadow-md bg-white w-[94%] p-4 rounded-lg mx-auto max-h-[70vh] overflow-y-scroll">
              {foods.map((recipe, index) => (
                <CartItem key={index} recipe={recipe} />
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
