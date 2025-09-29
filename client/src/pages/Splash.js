import React from "react";
import { useNavigate } from "react-router-dom";

export default function Splash(){
  const nav = useNavigate();
  React.useEffect(()=> {
    const t = setTimeout(()=> nav('/landing'), 1300);
    return ()=> clearTimeout(t);
  }, [nav]);

  return (
    <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f6f0ef'}}>
      <div style={{textAlign:'center'}}>
        <img src="/images/splash.png" alt="splash" style={{width:320, borderRadius:18}} />
        <h2 style={{marginTop:20}}>Whisk Layers</h2>
      </div>
    </div>
  );
}
