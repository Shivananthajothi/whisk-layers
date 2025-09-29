import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form, setForm] = useState({ email: "", password: ""});
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/home');
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:520, margin:'0 auto'}}>
        <h2>Login</h2>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{width:'100%',padding:10,marginBottom:10}} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} style={{width:'100%',padding:10,marginBottom:10}} />
        <button className="btn" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
