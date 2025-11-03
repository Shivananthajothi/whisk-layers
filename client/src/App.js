// client/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BakeryList from "./pages/BakeryList";
import BakeryProducts from "./pages/BakeryProducts";
import Product from "./pages/Product";
import Customization from "./pages/Customization";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderTracker from "./pages/OrderTracker";
import OrderStatus from "./pages/OrderStatus";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Splash from "./pages/Splash";
import Landing from "./pages/Landing";

import "./styles/global.css";
import "./App.css";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Splash as the initial screen */}
        <Route path="/" element={<Splash />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/home" element={<Home />} />
        <Route path="/bakeries" element={<BakeryList />} />
        <Route path="/bakery/:id" element={<BakeryProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/customize/:id" element={<Customization />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/orders" element={<OrderTracker />} />
  <Route path="/order/:id" element={<OrderStatus />} />
  <Route path="/order-status/:id" element={<OrderStatus />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
