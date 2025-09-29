import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function imageUrl(img) {
  if (!img) return "/images/bakery1.jpg";
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return `/images/${img}`;
}

export default function BakerySelect(){
  const [bakeries, setBakeries] = useState([]);
  const nav = useNavigate();

  useEffect(()=> {
    let mounted = true;
    api.get("/bakeries")
      .then(res => { if (mounted) setBakeries(res.data || []); })
      .catch(err => console.error(err));
    return ()=> mounted = false;
  }, []);

  return (
    <div className="container">
      <h2>Choose a Bakery</h2>
      <div className="bakery-grid">
        {bakeries.map(b => (
          <div key={b._id} className="product-card" onClick={()=>nav('/home')}>
            <img src={imageUrl(b.image)} alt={b.name} />
            <div className="meta">
              <h3>{b.name}</h3>
              <p className="small">{b.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
