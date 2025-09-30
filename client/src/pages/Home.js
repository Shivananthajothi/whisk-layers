import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home(){
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  const loc = useLocation();
  const q = new URLSearchParams(loc.search);
  const bakeryId = q.get("bakery");

  useEffect(()=> {
    const fetch = async () => {
      try {
        const url = bakeryId ? `/products/bakery/${bakeryId}` : "/products";
        const res = await API.get(url);
        setProducts(res.data);
      } catch (err) { console.error(err); }
    };
    fetch();
  }, [bakeryId]);

  return (
    <div className="container">
      <h2>Our Cakes</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="product-card" onClick={()=>nav(`/product/${p._id}`)}>
            <img src={p.image.startsWith("/") ? p.image : `/images/${p.image}`} alt={p.name} />
            <div className="meta">
              <h3>{p.name}</h3>
              <p style={{color:'#6b6b6b'}}>{p.description}</p>
              <p style={{fontWeight:700,marginTop:8}}>₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
