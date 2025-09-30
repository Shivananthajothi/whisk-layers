// client/src/pages/BakeryProducts.js
import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function BakeryProducts(){
  const { id } = useParams(); // bakery id
  const [products, setProducts] = useState([]);
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(()=> {
    let mounted = true;
    const load = async () => {
      try {
        const resB = await API.get(`/bakeries`); // we'll find bakery locally - backend might provide single bakery route in some apps
        const found = (resB.data || []).find(b => b._id === id);
        if (mounted) setBakery(found || null);
      } catch (err) {
        console.error(err);
      }
      try {
        const res = await API.get(`/products/bakery/${id}`);
        if (mounted) setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  const imgUrl = (img) => {
    if (!img) return "/images/cake1.jpg";
    if (img.startsWith("/")) return img;
    return `/images/${img}`;
  };

  return (
    <main style={{ minHeight: "calc(100vh - 72px)", padding: "28px 16px", background: "#fbf7f5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ color: "#8b1533" }}>{bakery ? bakery.name : "Bakery"}</h1>
        <p style={{ color: "#6b6b6b" }}>{bakery?.location}</p>

        {loading ? (
          <div style={{ padding: 30, color: "#6b6b6b" }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: 30, color: "#6b6b6b" }}>No products in this bakery</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18 }}>
            {products.map(p => (
              <div key={p._id} className="card" style={{ cursor: "pointer" }} onClick={() => nav(`/product/${p._id}`)}>
                <img src={imgUrl(p.image)} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 10 }} />
                <div style={{ paddingTop: 8 }}>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  <p style={{ marginTop: 6, color: "#6b6b6b" }}>{p.description || "Freshly baked"}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <div style={{ fontWeight: 700 }}>₹{p.price}</div>
                    <button className="btn">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
