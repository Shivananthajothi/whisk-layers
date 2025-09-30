import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/profile.png',
  iconUrl: '/images/profile.png',
  shadowUrl: null
});

export default function OrderStatus(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [positionIndex, setPositionIndex] = useState(0);
  const routeRef = useRef([]);

  useEffect(()=> {
    API.get(`/orders/${id}`).then(r => {
      setOrder(r.data);
      // simple simulated route (array of coords)
      routeRef.current = [
        [12.9716,77.5946],
        [12.9726,77.5940],
        [12.9736,77.5930],
        [12.9746,77.5920]
      ];
      // animate marker
      let i = 0;
      const t = setInterval(()=> {
        i++;
        if (i >= routeRef.current.length) {
          clearInterval(t);
        } else {
          setPositionIndex(i);
        }
      }, 2000);
      return ()=> clearInterval(t);
    }).catch(console.error);
  }, [id]);

  if (!order) return <div className="container">Loading...</div>;

  const pos = routeRef.current[positionIndex] || routeRef.current[0];

  return (
    <div className="container">
      <h2>Order #{order._id}</h2>
      <p>Status: {order.status}</p>
      <h3>Items</h3>
      <ul>{order.items.map((it,i)=><li key={i}>{it.name} x {it.qty}</li>)}</ul>

      <div style={{height:400, marginTop:12}}>
        <MapContainer center={pos} zoom={15} style={{height:'100%', width:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pos}>
            <Popup>Delivery is here</Popup>
          </Marker>
          <Polyline positions={routeRef.current} color="#FF6F61" />
        </MapContainer>
      </div>
    </div>
  );
}
