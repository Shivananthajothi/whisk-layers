import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Customization(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  useEffect(()=> { API.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(console.error); }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  const add = async () => {
    const token = localStorage.getItem("token");
    if (!token) return nav("/login");
    await API.post("/cart/add", { productId: id, quantity: qty, customization: note });
    nav("/cart");
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:720}}>
        <h3>Customize: {product.name}</h3>
        <img src={product.image.startsWith("/") ? product.image : `/images/${product.image}`} alt={product.name} style={{width:320,borderRadius:12}} />
        <textarea className="form-input" placeholder="Custom message" value={note} onChange={e=>setNote(e.target.value)} />
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <label>Qty</label>
          <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} style={{width:80}} />
          <button className="btn" onClick={add}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
