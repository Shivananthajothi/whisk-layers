// client/src/pages/BakerySelect.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function BakerySelect() {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get("/bakeries")
      .then((res) => {
        if (mounted) {
          setBakeries(res.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading bakeries:", err);
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="container"><p>Loading bakeries…</p></div>;

  return (
    <div className="container">
      <h2>Choose a Bakery</h2>
      <div className="product-grid bakery-grid">
        {bakeries.map((b) => (
          <div
            key={b._id}
            className="product-card card bakery-card"
            onClick={() => nav(`/home?bakery=${b._id}`)}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:5000${b.image}`}
              alt={b.name}
              loading="lazy"
            />
            <h3>{b.name}</h3>
            <p className="muted">{b.location}</p>
            <p className="muted small">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
