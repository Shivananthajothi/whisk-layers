import React, { useState, useEffect } from "react";
import api from "../api";

export default function Profile(){
  const [user, setUser] = useState({});
  useEffect(()=> {
    // attempt to fetch /api/auth/me if backend provides, else use localStorage
    const token = localStorage.getItem('token');
    if (!token) return;
    // try to call /api/auth/me
    api.get('/auth/me').then(r => setUser(r.data)).catch(()=>{
      const stored = JSON.parse(localStorage.getItem('user') || "{}");
      setUser(stored);
    });
  }, []);
  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="card" style={{display:'flex',gap:16,alignItems:'center'}}>
        <img src="/images/profile.png" alt="avatar" style={{width:96,height:96,borderRadius:12,objectFit:'cover'}} />
        <div>
          <p><b>{user.name || 'Your name'}</b></p>
          <p>{user.email || 'your@email.com'}</p>
        </div>
      </div>
    </div>
  );
}
