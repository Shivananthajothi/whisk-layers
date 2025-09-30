import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess(){
  const q = new URLSearchParams(useLocation().search);
  const id = q.get("orderId");
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <img src="/images/success.png" alt="success" style={{width:160}}/>
        <h2>Payment Success 🎉</h2>
        <p>Your order id: <b>{id}</b></p>
        <button className="btn" onClick={()=>nav('/orders')}>Track Order</button>
      </div>
    </div>
  );
}
