import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import SplashScreen from "./pages/SplashScreen";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import { Trending } from "./pages/Trending";
import Cart from "./pages/Cart";
import MenuDetail from "./pages/MenuDetail";
import PaymentMethod from "./pages/PaymentMethod";

import Login from "./pages/staff/Login";
import DashboardLayout from "./pages/staff/DashboardLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="overflow-hidden">
        {/* <Login /> */}
        <DashboardLayout />



        {/* client side pages  */}
        {/* <SplashScreen /> */}
        {/* <Menu /> */}
        {/* <Cart /> */}
        {/* <PaymentMethod /> */}


        {/* <Order /> */}
        {/* <Trending /> */}
        {/* <MenuDetail /> */}
      </div>
    </>
  );
}

export default App;
