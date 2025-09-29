import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const [form, setForm] = useState({ address: "", phone: "" });
  const nav = useNavigate();

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return nav('/login');
    // get user cart
    const cartRes = await api.get('/cart', { headers: { 'x-auth-token': token }});
    const items = cartRes.data.items;
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const res = await api.post('/orders', { items, total, address: form.address }, { headers: { 'x-auth-token': token }});
    // clear cart on server
    await api.delete('/cart/clear', { headers: { 'x-auth-token': token }});
    nav(`/success?orderId=${res.data._id}`);
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="card">
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} style={{width:'100%', padding:10, marginBottom:10}} />
        <textarea placeholder="Delivery address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} style={{width:'100%', padding:10, marginBottom:10}} />
        <button className="btn" onClick={placeOrder}>Pay & Place Order</button>
      </div>
    </div>
  );
}
