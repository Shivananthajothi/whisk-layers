import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <header className="topbar">
      <div className="logo">
        <img src="/images/logo.png" className="logo-small" alt="logo" />
        <div>
          <div style={{fontWeight:700}}>Whisk Layers</div>
          <div style={{fontSize:12,color:'#666'}}>Delightful Bakes</div>
        </div>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/bakeries">Bakeries</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          {token ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
