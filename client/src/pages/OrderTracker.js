import React, { useEffect, useState } from "react";
import api from "../api";

export default function OrderTracker(){
  const [orders, setOrders] = useState([]);
  useEffect(()=> {
    api.get('/orders').then(r => setOrders(r.data)).catch(err => console.error(err));
  }, []);
  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders yet</p> : orders.map(o => (
        <div key={o._id} className="card" style={{marginBottom:12}}>
          <p>Order #{o._id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.total}</p>
        </div>
      ))}
    </div>
  );
}
