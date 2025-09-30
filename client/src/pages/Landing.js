import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-left">
          <h1 style={{fontSize:34,color:'#8b1533'}}>Delightful Crafted Creations</h1>
          <p style={{color:'#6b6b6b',marginTop:10}}>Choose handcrafted cakes and sweets from local bakers. Customize & order easily.</p>
          <div style={{marginTop:18}}>
            <button className="btn" onClick={()=>nav('/home')}>Shop Now</button>
            <button className="btn" style={{marginLeft:12,background:'#ff6f8e'}} onClick={()=>nav('/register')}>Sign Up</button>
          </div>
        </div>
        <div className="hero-right">
          <img src="/images/cake1.jpg" alt="hero" style={{width:'100%',maxWidth:420,borderRadius:12}} />
        </div>
      </div>
    </div>
  );
}
