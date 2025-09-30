import React, { useEffect, useState } from "react";
import API from "../api";

export default function Profile(){
  const [user, setUser] = useState({});
  useEffect(()=> {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(u);
  }, []);
  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="card" style={{display:'flex',gap:16,alignItems:'center'}}>
        <img src="/images/profile.png" alt="profile" style={{width:96,height:96,borderRadius:12,objectFit:'cover'}} />
        <div>
          <p><b>{user.name || "Your name"}</b></p>
          <p>{user.email || "your@email.com"}</p>
        </div>
      </div>
    </div>
  );
}
