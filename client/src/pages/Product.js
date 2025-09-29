import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function imageUrl(img) {
  if (!img) return "/images/cake1.jpg";
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return `/images/${img}`;
}

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  },[id]);

  if (!product) return <div className="container">Loading...</div>;

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return nav('/login');
    await api.post('/cart/add', { productId: product._id, quantity: 1 });
    nav('/cart');
  };

  return (
    <div className="container">
      <div className="product-detail">
        <div className="left card">
          <img src={imageUrl(product.image)} alt={product.name} style={{width:'100%', borderRadius:8}} />
        </div>
        <div className="right card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p style={{fontWeight:700}}>₹{product.price}</p>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={()=>nav(`/customize/${product._id}`)}>Customize</button>
            <button className="btn btn-secondary" style={{marginLeft:8}} onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
