import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";

export default function BakeryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const fallbackProducts = useRef([
    { _id: "p1", name: "Chocolate Dream Cake", description: "Delicious chocolate dream cake", price: 400, image: "/images/cake1.jpg", customizable: true },
    { _id: "p2", name: "Strawberry Delight", description: "Delicious strawberry delight", price: 450, image: "/images/cake2.jpg", customizable: true },
    { _id: "p3", name: "Vanilla Classic", description: "Delicious vanilla classic", price: 500, image: "/images/cake3.jpg", customizable: true },
    { _id: "p4", name: "Red Velvet Supreme", description: "Delicious red velvet cake", price: 550, image: "/images/cake4.jpg", customizable: true },
    { _id: "p5", name: "Blueberry Cheesecake", description: "Delicious blueberry cheesecake", price: 600, image: "/images/cake5.jpg", customizable: true },
    { _id: "p6", name: "Lemon Drizzle", description: "Delicious lemon drizzle", price: 650, image: "/images/cake6.jpg", customizable: true },
    { _id: "p7", name: "Black Forest", description: "Delicious black forest", price: 700, image: "/images/cake7.jpg", customizable: true },
    { _id: "p8", name: "Nutty Brownie", description: "Delicious nutty brownie", price: 750, image: "/images/cake8.jpg", customizable: true },
    { _id: "p9", name: "Opera Cake", description: "Delicious opera cake", price: 800, image: "/images/cake3.jpg", customizable: true }
  ]);

  const [products, setProducts] = useState([]);
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const bRes = await API.get("/bakeries");
        const foundBakery = (bRes.data || []).find(b => b._id === id);
        if (isMounted) setBakery(foundBakery || null);

        const res = await API.get(`/products/bakery/${id}`);
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            setProducts(res.data.slice(0, 9));
          } else {
            setProducts(fallbackProducts.current.slice(0, 9));
          }
        }
      } catch (err) {
        setProducts(fallbackProducts.current.slice(0, 9));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
      setProducts([]);
    };
  }, [id]);

  const handleOrder = async (product, customization = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order!");
      navigate("/login");
      return;
    }

    try {
      // Add to cart
      await API.post("/cart/add", { productId: product._id, quantity: 1, customization });
      await fetchCart();

      // Place order
      const orderData = { productId: product._id, quantity: 1, customization };
      const response = await API.post("/orders", orderData);

      // Redirect to payment/order status
      navigate(`/order-status/${response.data._id}`);
    } catch (err) {
      alert("Error placing order: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="page">
      {bakery && (
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ color: "#8b1533", textAlign: "center", marginBottom: 0 }}>{bakery.name}</h1>
          <p style={{ color: "#6b6b6b", textAlign: "center", marginBottom: 32 }}>{bakery.location}</p>
        </div>
      )}

      <h2 style={{ marginBottom: 16 }}>Popular Cakes & Treats</h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading products...</div>
      ) : (
        <div className="product-grid" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          {products.map(product => (
            <div key={product._id} className="card" style={{ minWidth: 260, maxWidth: 320, boxShadow: "0 4px 18px rgba(139,21,51,0.07)", border: "1.5px solid #f1e6e9", borderRadius: 10 }}>
              <img src={product.image} alt={product.name} style={{ height: 220, width: "100%", objectFit: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
              <div className="card-body" style={{ padding: 16 }}>
                <div className="card-title">{product.name}</div>
                <div style={{ color: "#6b6b6b", marginBottom: 12, fontSize: 14 }}>{product.description}</div>
                <div style={{ fontWeight: 600, fontSize: 18, color: "#8b1533", marginBottom: 12 }}>₹{product.price}</div>

                {product.customizable ? (
                  <button className="btn" style={{ width: "100%", padding: 8, fontSize: 14 }} onClick={() => navigate(`/customize/${product._id}`)}>
                    Customize & Order
                  </button>
                ) : (
                  <button className="btn" style={{ width: "100%", padding: 8, fontSize: 14 }} onClick={() => handleOrder(product)}>
                    Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
