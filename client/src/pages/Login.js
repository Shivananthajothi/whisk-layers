import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token || res.data; // some servers return token directly
      localStorage.setItem('token', token);
      // save email to localStorage to show on Profile if backend doesn't provide user info
      localStorage.setItem('user', JSON.stringify({ email: form.email }));
      nav('/home');
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:520, margin:'0 auto'}}>
        <h2>Login</h2>
        <input className="form-input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="form-input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
