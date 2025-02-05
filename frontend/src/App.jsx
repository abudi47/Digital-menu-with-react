import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import MenuPage from "./pages/staff/Menu";
import Table from "./pages/staff/Table";

function App() {
    return (
        <>
            <div className="overflow-hidden">
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="" Component={Report} />
                        <Route path="new-order" Component={NewOrder} />
                        <Route path="order-history" Component={OrderHistory} />
                        <Route path="staff-member" Component={StaffMember} />
                        <Route path="report" Component={Report} />
                        <Route path="menu" Component={MenuPage} />
                        <Route path="table" Component={Table} />
                    </Route>
                </Routes>

                {/* client side pages  */}
                {/* <SplashScreen /> */}
                {/* <Menu /> */}
                {/* <Cart /> */}
                <PaymentMethod />

                {/* <Order /> */}
                {/* <Trending /> */}
                {/* <MenuDetail /> */}
            </div>
        </>
    );
}

export default App;
