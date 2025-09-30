import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function OrderTracker(){
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();

  useEffect(()=> {
    API.get("/orders").then(r => setOrders(r.data)).catch(err => {
      console.error(err);
      if (err.response?.status === 401) nav('/login');
    });
  }, [nav]);

  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders</p> : (
        orders.map(o=>(
          <div key={o._id} className="card" style={{marginBottom:12}}>
            <p>Order #{o._id}</p>
            <p>Status: {o.status}</p>
            <p>Total: ₹{o.total}</p>
            <button className="btn" onClick={()=>nav(`/order/${o._id}`)} style={{marginTop:8}}>Track</button>
          </div>
        ))
      )}
    </div>
  );
}
