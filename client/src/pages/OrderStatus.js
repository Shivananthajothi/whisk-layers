import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function OrderStatus(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get(`/orders/${id}`, { headers: { 'x-auth-token': token }}).then(r => setOrder(r.data)).catch(console.error);
  }, [id]);

  if (!order) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <h3>Items</h3>
      <ul>
        {order.items.map((it, idx) => <li key={idx}>{it.name} x {it.qty}</li>)}
      </ul>
    </div>
  );
}
