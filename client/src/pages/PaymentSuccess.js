import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess(){
  const q = new URLSearchParams(useLocation().search);
  const id = q.get("orderId");
  const nav = useNavigate();
  return (
    <main className="page container">
      <div className="card" style={{textAlign:'center',maxWidth:700,margin:'40px auto'}}>
        <img src="/images/success.png" alt="success" style={{width:120}}/>
        <h2>Payment Successful</h2>
        <p>Your order id: <strong>{id}</strong></p>
        <div style={{marginTop:16}}>
          <button className="btn" onClick={()=>nav(`/order/${id}`)}>Track Order</button>
          <button className="btn" style={{marginLeft:8,background:'#ff6f8e'}} onClick={()=>nav('/home')}>Continue Shopping</button>
        </div>
      </div>
    </main>
  );
}
