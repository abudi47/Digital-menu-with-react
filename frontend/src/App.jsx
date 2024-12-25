import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import SplashScreen from "./pages/SplashScreen";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Cart from "./pages/Cart";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="overflow-hidden">
        {/* <SplashScreen /> */}
        <Menu />
        {/* <Cart /> */}
        {/* <Order /> */}
      </div>
    </>
  );
}

export default App;
