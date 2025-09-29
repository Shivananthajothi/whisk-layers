import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'' });
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post('/auth/register', form);
      const token = res.data.token || res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name: form.name, email: form.email }));
      nav('/home');
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:520, margin:'0 auto'}}>
        <h2>Register</h2>
        <input className="form-input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="form-input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="form-input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input className="form-input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn" onClick={submit}>Register</button>
      </div>
    </div>
  );
}
