import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-content">
          <h1 style={{fontSize:34, marginBottom:12}}>Delightful Crafted Creations</h1>
          <p style={{color:'#666', lineHeight:1.5}}>Choose from handcrafted cakes and sweets made by local bakers. Customize and order in few clicks.</p>
          <div style={{marginTop:20}}>
            <button className="btn" onClick={()=>nav('/home')}>Shop Now</button>
            <button className="btn btn-secondary" style={{marginLeft:12}} onClick={()=>nav('/register')}>Sign Up</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/splash.png" alt="hero" />
        </div>
      </div>
    </div>
  );
}
