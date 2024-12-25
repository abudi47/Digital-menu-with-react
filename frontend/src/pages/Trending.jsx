import chik from "../assets/food/chicken.jpg";
import TrendingItem from "../components/TrendingItem";

export const Trending = () => {
  const foods = [
    { id: 1, name: "Roasted Chicken", image: chik, price: "1500"  },
    { id: 2, name: "Pasta", image: chik, price: "90" },
    { id: 3, name: "Rice", image: chik, price: "150" },
    { id: 4, name: "Chicken Wings", image: chik, price: "1500" },
    { id: 5, name: "Tibs", image: chik, price: "2000" },
    { id: 6, name: "Tibs Special", image: chik, price: "2200" },
    { id: 7, name: "Tibs Delight", image: chik, price: "2500" },
  ];

  return (
    <div className="h-screen w-screen grid grid-rows-[1fr_6rem] overflow-hidden">
      
      <div className="h-full w-full relative overflow-x-hidden bg-gray-50">
        <div className="relative pt-6 z-0">
          <div className="absolute z-30 w-full py-6 top-24">
            <div className="w-[94%] p-4 grid gap-6 rounded-lg mx-auto max-h-[70vh]  bg-gray-00">
              {foods.map((recipe) => (
                <TrendingItem key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <div className="relative">
        <div className="absolute bottom-4 w-full px-4 z-10">
          <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};
