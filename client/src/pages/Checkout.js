import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Checkout(){
  const [form, setForm] = useState({ address: "", phone: "" });
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const cartRes = await api.get('/cart'); // expect items in response
      const items = (cartRes.data.items || cartRes.data.products || []);
      // convert to order shape expected by backend
      const orderItems = items.map(it => ({
        productId: it.productId || it.productId?._id || it._id,
        qty: it.qty || it.quantity || 1
      }));
      const total = orderItems.reduce((s, it) => s + (it.price || 0) * it.qty, 0);
      const res = await api.post('/orders', { items: orderItems, total, address: form.address });
      // clear cart on server
      await api.delete('/cart/clear');
      navigate(`/success?orderId=${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Checkout failed");
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="card" style={{maxWidth:600}}>
        <input className="form-input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <textarea className="form-input" placeholder="Delivery address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <div style={{textAlign:'right'}}>
          <button className="btn" onClick={placeOrder}>Pay & Place Order</button>
        </div>
      </div>
    </div>
  );
}
