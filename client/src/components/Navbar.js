import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you stored user data
    navigate("/login");
  };

  return (
    <header className="navbar container">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <Link to="/home"><img src="/images/logo.png" alt="logo" className="logo" /></Link>
        <div style={{marginLeft:6}}>
          <div style={{fontWeight:700, color:'#8b1533'}}>Whisk Layers</div>
          <div style={{fontSize:12, color:'#6b6b6b'}}>Delicious Bakes</div>
        </div>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/bakeries">Bakeries</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {!token ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout} style={{background:'transparent', border:'none', cursor:'pointer', color:'#222', fontWeight:600}}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
