import { spaghetti } from "../assets";
import { useState } from "react";

export default function MenuDetail() {
  const [cart, setCart] = useState(1);
  const [cartItems , setCartItems] = useState([]);

  function incrementCart() {
    setCart(cart + 1);
  }

  function decrementCart() {
    if (cart > 1) {
      setCart(cart - 1);
    }
  }

  function addToCart () {
    const newItem = {
      id: 1,
      name: "greg del",
      quantity: cart,
    
    };
  

  setCartItems([...cartItems, newItem]);
  console.log(cartItems)
  }
  return (
    <div className="flex  w-full justify-center py-11 ">
    <div className="rounded-2xl w-[90%] overflow-hidden shadow-xl shadow-primary">
        <img className="w-full" src={spaghetti} />
        <div className=" p-4 text-xl">
            <h1 className="font-extrabold text-gray-800 mb-5" >Georgian Delicious</h1>
            <p className="text-gray-700">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sed
            </p>
            <ul className="list-disc list-inside px-12 text-gray-700">
                    <li>Flour</li>
                    <li>Eggs</li>
                    <li>Butter</li>
                    <li>Sugar</li>
                    <li>Salt</li>
                    <li>Milk</li>
            </ul>
        


        </div>

        <div className="flex flex-row justify-center ">
            <div className="flex flex-row items-center ">
                <button onClick={decrementCart} className="bg-red-400 px-5 rounded-lg text-black text-3xl  ">-</button>
                <span className="py-4 px-6 rounded-lg">{cart}</span>
                <button onClick={incrementCart} className="bg-green-400  px-5 rounded-lg text-primary text-3xl  ">+</button>

            </div>



        </div>
        <button onClick={addToCart} className="flex flex-row  bg-primary py-3 justify-center  mb-2 text-white font-semibold w-full rounded-xl ">Add to cart</button>



        <div>

        </div>

    </div>
    

  </div>
  );
}