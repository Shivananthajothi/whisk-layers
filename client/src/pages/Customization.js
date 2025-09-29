import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

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
    // include customization note in quantity or pass as field per backend contract
    await api.post('/cart/add', { productId: product._id, quantity: qty, customization: note });
    nav('/cart');
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Customize: {product.name}</h3>
        <img src={product.image} alt={product.name} style={{width:280, borderRadius:12}} />
        <textarea placeholder="Special instructions (e.g. message on cake)" value={note} onChange={e=>setNote(e.target.value)} className="form-input" />
        <div style={{marginTop:12, display:'flex', gap:10, alignItems:'center'}}>
          <label>Qty:</label>
          <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} style={{width:80,padding:8}} />
          <button className="btn" onClick={add}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
