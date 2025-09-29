import React, { useEffect, useState } from "react";
import api from "../api";

export default function OrderTracker(){
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get('/orders', { headers: { 'x-auth-token': token }}).then(r => setOrders(r.data)).catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>My Orders</h2>
      <div>
        {orders.length === 0 ? <p>No orders yet</p> : orders.map(o => (
          <div key={o._id} className="card" style={{marginBottom:12}}>
            <p>Order #{o._id}</p>
            <p>Status: {o.status}</p>
            <p>Total: ₹{o.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
