import { Link } from "react-router-dom";

export default function Order() {
  const products = [
    { name: "Product1", price: 100 },
    { name: "Product2", price: 100 },
    { name: "Product3", price: 100 },
    { name: "Product4", price: 100 },
  ];

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="h-screen w-screen relative">
      <div className="bg-white relative pt-6">
        <div className="absolute w-full px-2 z-[4] text-white">
          <h1 className="font-semibold text-2xl text-right">Order</h1>
          <h2 className="font-semibold text-3xl pt-4">Check Out List</h2>
        </div>

        <div className="absolute w-full p-24 bg-primary rounded-b-[20%] top-[0] z-[1]" />

        <div className="absolute z-30 w-full py-6 top-24">
          {/* Product List */}
          <div className="shadow-md bg-white w-[96%] p-4 rounded-lg mx-auto">
            {products.map((product, index) => (
              <div key={index} className="flex flex-rows justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p>${product.price}</p>
              </div>
            ))}

            <hr className="mt-2" />
            <div className="flex flex-row justify-between pt-4">
              <h2 className="text-2xl font-semibold text-gray-800">Total</h2>
              <h2 className="text-2xl font-semibold text-gray-800">
                ${totalPrice}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Order Button */}
      <Link to="../payment-method" className="absolute bottom-4 w-full px-4">
        <button className="w-full bg-primary text-white py-3 rounded-lg text-xl font-semibold">
          Order Now
        </button>
      </Link>
    </div>
  );
}
