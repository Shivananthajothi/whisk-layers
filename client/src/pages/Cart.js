import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [cart, setCart] = useState({ items: [] });
  const nav = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return nav('/login');
    const res = await api.get('/cart', { headers: { 'x-auth-token': token }});
    setCart(res.data);
  };

  useEffect(()=> { fetchCart(); }, []);

  const total = (cart.items || []).reduce((s, it) => s + (it.price * it.qty), 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="card">
        {(!cart.items || cart.items.length === 0) ? <p>Your cart is empty</p> : (
          <>
            {cart.items.map((it, idx) => (
              <div key={idx} className="cart-item">
                <div>
                  <b>{it.name}</b>
                  <p style={{color:'#666'}}>{it.customization}</p>
                </div>
                <div>
                  <p>Qty: {it.qty}</p>
                  <p>₹{it.price}</p>
                </div>
              </div>
            ))}
            <h3>Total: ₹{total}</h3>
            <button className="btn" onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
