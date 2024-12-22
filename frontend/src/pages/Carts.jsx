import chik from "../assets/food/chicken.jpg";

export const Carts = () => {
  const foods = [
    { name: "Roasted Chicken", image: chik, price: "$1500" },
    { name: "Pasta", image: chik, price: "$90" },
    { name: "Rice", image: chik, price: "$150" },
    { name: "Chicken Wings", image: chik, price: "$1500" },
    { name: "Tibs", image: chik, price: "$2000" },
    { name: "Tibs", image: chik, price: "$2000" },
    { name: "Tibs", image: chik, price: "$2000" },
    { name: "Tibs", image: chik, price: "$2000" },
  ];

  return (
    <div>
      <div className="bg-primary min-h-screen flex items-center justify-center py-5">
        <div className="">
          <button className=" flex  bg-green-400"> Back</button>
        </div>

        <div className="mt-20 lg:w-full  lg:max-w-4xl  bg-white rounded-xl shadow-sm p-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Recipes
          </h2>
          <div className="grid bg-grey-100 grid-cols-1 md:grid-cols-2 gap-6">
            {foods.map((food, index) => (
              <div
                key={index}
                className="flex items-center  rounded-lg p-4 shadow-sm hover:shadow-lg transition"
              >
                <img
                  className="w-16 h-16 rounded-1/2 object-cover border-2 "
                  src={food.image}
                  alt={food.name}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    A delightful dish for all!
                  </p>
                  <h3 className="text-md font-semibold">{food.price}</h3>
                </div>
              </div>
            ))}
          </div>
          <button className="m-10 text-md text-gray-100 mx-auto px-24 py-3 rounded-lg bg-brown lg:flex lg:itms-center hover:bg-red-500 hover:text-gray-900">
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};
