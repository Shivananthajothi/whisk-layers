import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  const load = async () => {
    try {
      const res = await API.get("/cart");
      setItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) nav("/login");
    }
  };

  useEffect(()=> { load(); }, []);

  const total = items.reduce((s,it)=> s + (it.price || 0) * (it.qty || 1), 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="card">
        {items.length === 0 ? (
          <div style={{textAlign:'center',padding:40}}>
            <img src="/images/empty-cart.png" alt="empty" style={{width:180}}/>
            <p style={{color:'#6b6b6b'}}>Your cart is empty</p>
          </div>
        ) : (
          <>
            {items.map((it, idx)=> (
              <div key={idx} className="cart-item">
                <div>
                  <b>{it.name}</b>
                  <div style={{color:'#6b6b6b'}}>{it.customization}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div>Qty: {it.qty}</div>
                  <div>₹{it.price}</div>
                </div>
              </div>
            ))}
            <h3 style={{textAlign:'right'}}>Total: ₹{total}</h3>
            <div style={{textAlign:'right'}}>
              <button className="btn" onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
