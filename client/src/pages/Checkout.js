import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(()=> {
    API.get("/cart").then(r => setItems(r.data.items || [])).catch(console.error);
  }, []);

  const total = items.reduce((s,it)=> s + (it.price || 0) * (it.qty || 1), 0);

  const payNow = async () => {
    try {
      // Dummy payment: create order in backend which marks as Paid
      const res = await API.post("/orders", { address });
      nav(`/success?orderId=${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="card" style={{maxWidth:720}}>
        <textarea className="form-input" placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} />
        <h3>Total: ₹{total}</h3>
        <div style={{textAlign:'right'}}>
          <button className="btn" onClick={payNow}>Pay & Place Order</button>
        </div>
      </div>
    </div>
  );
}
