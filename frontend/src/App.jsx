import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
// staff pages
import NewOrder from "./pages/staff/NewOrder";
import OrderHistory from "./pages/staff/OrderHistory";
import StaffMember from "./pages/staff/StaffMember";
import Report from "./pages/staff/Report";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="overflow-hidden">
                <Routes>
                    {/* <Route path="/login" element={< Login />} /> */}

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="new-order" Component={NewOrder} />
                        <Route path="order-history" Component={OrderHistory} />
                        <Route path="staff-member" Component={StaffMember} />
                        <Route path="report" Component={Report} />
                    </Route>
                </Routes>

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
