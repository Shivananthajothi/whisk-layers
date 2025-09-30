import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function BakerySelect(){
  const [bakeries, setBakeries] = useState([]);
  const nav = useNavigate();
  useEffect(()=> {
    API.get("/bakeries").then(r=>setBakeries(r.data)).catch(console.error);
  }, []);
  return (
    <div className="container">
      <h2>Choose a Bakery</h2>
      <div className="bakery-grid">
        {bakeries.map(b => (
          <div key={b._id} className="product-card" onClick={()=>nav(`/home?bakery=${b._id}`)}>
            <img src={b.image.startsWith("/") ? b.image : `/images/${b.image}`} alt={b.name} style={{height:240,objectFit:'cover'}} />
            <div className="meta">
              <h3>{b.name}</h3>
              <p style={{color:'#6b6b6b'}}>{b.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
