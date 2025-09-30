import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash(){
  const nav = useNavigate();
  useEffect(()=> {
    setTimeout(()=> nav("/landing"), 900);
  }, [nav]);
  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fbf7f5'}}>
      <img src="/images/logo.png" alt="logo" style={{width:240,borderRadius:14,boxShadow:'0 12px 30px rgba(0,0,0,0.12)'}} />
    </div>
  );
}
