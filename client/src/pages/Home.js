import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function imageUrl(img) {
  if (!img) return "/images/cake1.jpg";
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return `/images/${img}`;
}

export default function Home(){
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(()=> {
    let mounted = true;
    api.get("/products")
      .then(res => { if (mounted) setProducts(res.data || []); })
      .catch(err => console.error(err));
    return ()=> mounted = false;
  }, []);

  return (
    <div className="container">
      <h2>Our Cakes</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="product-card" onClick={()=>nav(`/product/${p._id}`)}>
            <img src={imageUrl(p.image)} alt={p.name} />
            <div className="meta">
              <h3>{p.name}</h3>
              <p className="small">{p.description}</p>
              <p style={{fontWeight:700, marginTop:8}}>₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
