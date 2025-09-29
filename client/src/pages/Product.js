import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(console.error);
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="left card">
          <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{width:'100%', borderRadius:10}} />
        </div>
        <div className="right card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Flavour: {product.flavour}</p>
          <p style={{fontWeight:700}}>₹{product.price}</p>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={()=>nav(`/customize/${product._id}`)}>Customize</button>
            <button className="btn btn-secondary" style={{marginLeft:8}} onClick={async()=>{
              const token = localStorage.getItem('token');
              if (!token) return nav('/login');
              // default add qty=1
              await api.post('/cart/add', { productId: product._id, qty: 1, customization: "" }, { headers: { 'x-auth-token': token }});
              nav('/cart');
            }}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
