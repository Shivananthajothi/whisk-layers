import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess(){
  const q = new URLSearchParams(useLocation().search);
  const id = q.get('orderId');
  const nav = useNavigate();

  return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <h2>Payment Successful 🎉</h2>
        <p>Your order id: <b>{id}</b></p>
        <button className="btn" onClick={()=>nav('/home')}>Continue Shopping</button>
      </div>
    </div>
  );
}
