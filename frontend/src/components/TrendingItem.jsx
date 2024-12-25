import { useState } from "react";

export default function TrendingItem(probs) {
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (count > 0) setCount((c) => c - 1);
  };

  const increment = () => {
    if (count < 5) setCount((c) => c + 1);
  };

  return (
    <div className="relative flex shadow-lg bg-white rounded-md w-[100%] flex-row gap-2 my-4 pb-4">
      <div className="border-gray-300 w-20 h-20 p-2 overflow-hidden rounded-md">
        <img
          src={probs.recipe.image}
          alt={probs.recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <span>
          <h3 className="text-lg font-semibold text-gray-700 whitespace-nowrap">
            {probs.recipe.name}
          </h3>
          <h3 className="text-sm text-gray-600 whitespace-nowrap">
            {probs.recipe.name}
          </h3>
        </span>

        <h3 className="text-lg font-semibold whitespace-nowrap text-primary">
          ${probs.recipe.price}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500">
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        <button
          onClick={decrement}
          className="rounded-full bg-green-800 text-white p-2 w-8 h-8 flex items-center justify-center"
        >
          -
        </button>
        <span className="text-lg font-semibold">{count}</span>
        <button
          onClick={increment}
          className="rounded-full bg-red-800 text-white p-2 w-8 h-8 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
