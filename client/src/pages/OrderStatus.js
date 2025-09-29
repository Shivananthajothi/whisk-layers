import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function OrderStatus(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(()=> {
    api.get(`/orders/${id}`).then(r => setOrder(r.data)).catch(err => console.error(err));
  }, [id]);

  if (!order) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <h3>Items</h3>
      <ul>
        {order.items.map((it, i) => <li key={i}>{it.name || it.productId} x {it.qty || it.quantity}</li>)}
      </ul>
    </div>
  );
}
