import React from "react";
import { useNavigate } from "react-router-dom";

export default function Splash(){
  const nav = useNavigate();
  React.useEffect(()=> {
    const t = setTimeout(()=> nav('/landing'), 900);
    return ()=> clearTimeout(t);
  },[nav]);

  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fbf7f5'}}>
      <div style={{textAlign:'center'}}>
        <img src="/images/logo.png" alt="splash" style={{width:260,borderRadius:16,boxShadow:'0 12px 30px rgba(0,0,0,0.12)'}} />
      </div>
    </div>
  );
}
