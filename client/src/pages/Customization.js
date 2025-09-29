import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Customization(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  useEffect(()=> {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(console.error);
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  const add = async () => {
    const token = localStorage.getItem('token');
    if (!token) return nav('/login');

    await api.post('/cart/add', { productId: product._id, qty: qty, customization: note }, { headers: { 'x-auth-token': token }});
    nav('/cart');
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Customize: {product.name}</h3>
        <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{width:260, borderRadius:12}} />
        <textarea placeholder="Write a message or instructions" value={note} onChange={e=>setNote(e.target.value)} style={{width:'100%',marginTop:12,padding:10}} />
        <div style={{marginTop:12, display:'flex',gap:10, alignItems:'center'}}>
          <label>Qty:</label>
          <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} style={{width:80,padding:8}} />
          <button className="btn" onClick={add}>Add Customized Item</button>
        </div>
      </div>
    </div>
  );
}
