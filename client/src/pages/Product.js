import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const nav = useNavigate();

  useEffect(()=> {
    API.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(console.error);
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return nav("/login");
      await API.post("/cart/add", { productId: product._id, quantity: qty, customization: note });
      nav("/cart");
    } catch (err) { console.error(err); alert("Add to cart failed"); }
  };

  return (
    <div className="container">
      <div className="product-detail">
        <div className="left card">
          <img src={product.image.startsWith("/") ? product.image : `/images/${product.image}`} alt={product.name} style={{width:'100%',borderRadius:8}}/>
        </div>
        <div className="right card">
          <h2>{product.name}</h2>
          <p style={{color:'#6b6b6b'}}>{product.description}</p>
          <p style={{fontWeight:700,marginTop:8}}>₹{product.price}</p>
          <div style={{marginTop:12}}>
            <label>Qty</label>
            <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} style={{width:80,marginLeft:8}} />
            <textarea className="form-input" placeholder="Customization or message" value={note} onChange={e=>setNote(e.target.value)} />
            <div>
              <button className="btn" onClick={()=>nav(`/customize/${product._id}`)}>Customize</button>
              <button className="btn" style={{marginLeft:8, background:'#ff6f8e'}} onClick={addToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
