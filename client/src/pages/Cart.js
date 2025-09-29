import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function normalizeCartPayload(data){
  // backend may return { items: [...] } or { products: [...] }
  if (!data) return { items: [] };
  if (Array.isArray(data.items)) return { items: data.items };
  if (Array.isArray(data.products)) {
    // map { productId, quantity } into richer items if product data not included
    return { items: data.products.map(p => ({ productId: p.productId, qty: p.quantity, name: p.name, price: p.price })) };
  }
  // fallback
  return { items: data.items || [] };
}

export default function Cart(){
  const [cart, setCart] = useState({ items: [] });
  const nav = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(normalizeCartPayload(res.data));
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) nav('/login');
    }
  };

  useEffect(()=> { fetchCart(); }, []);

  const total = (cart.items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || it.quantity || 1), 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="card">
        {(!cart.items || cart.items.length === 0) ? (
          <div style={{textAlign:'center', padding:40}}>
            <img src="/images/empty-cart.png" alt="empty" style={{width:180}}/>
            <p className="small">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cart.items.map((it, idx) => (
              <div key={idx} className="cart-item">
                <div>
                  <b>{it.name || it.title || 'Product'}</b>
                  <div className="small">{it.customization}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div>Qty: {it.qty || it.quantity || 1}</div>
                  <div>₹{it.price || 0}</div>
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
