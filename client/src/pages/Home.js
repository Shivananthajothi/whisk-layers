import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home(){
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    api.get("/products").then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>Popular Cakes</h2>
      <div className="product-grid">
        {products.map(p => (
          <div className="product-card card" key={p._id}>
            <img src={`http://localhost:5000${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p style={{fontWeight:700}}>₹{p.price}</p>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <Link className="btn" to={`/product/${p._id}`}>View</Link>
              <Link className="btn btn-secondary" to={`/customize/${p._id}`}>Customize</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
