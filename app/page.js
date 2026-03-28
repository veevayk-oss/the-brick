
"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const MENU = [
  { name: "American Chop Suey Veg", price: 250, category: "Chowmein & Rice", type: "Veg" },
  { name: "American Chop Suey Egg", price: 280, category: "Chowmein & Rice", type: "Non-Veg" },
  { name: "American Chop Suey Chicken", price: 300, category: "Chowmein & Rice", type: "Non-Veg" },
  { name: "Chinese Chop Suey Veg", price: 250, category: "Chowmein & Rice", type: "Veg" },
  { name: "Chinese Chop Suey Egg", price: 280, category: "Chowmein & Rice", type: "Non-Veg" },

  { name: "Veg Fried Rice", price: 220, category: "Rice", type: "Veg" },
  { name: "Egg Fried Rice", price: 240, category: "Rice", type: "Non-Veg" },
  { name: "Chicken Fried Rice", price: 260, category: "Rice", type: "Non-Veg" },

  { name: "Veg Chowmein", price: 220, category: "Noodles", type: "Veg" },
  { name: "Egg Chowmein", price: 240, category: "Noodles", type: "Non-Veg" },
  { name: "Chicken Chowmein", price: 260, category: "Noodles", type: "Non-Veg" },

  { name: "Beer", price: 300, category: "Bar", type: "Non-Veg" },
  { name: "Red Wine", price: 600, category: "Bar", type: "Non-Veg" },
];

const categories = ["All", "Chowmein & Rice", "Rice", "Noodles", "Bar"];

export default function Page() {
  const [cart, setCart] = useState([]);
  const [active, setActive] = useState("All");

  const filtered = useMemo(() =>
    MENU.filter(i => active === "All" || i.category === active),
  [active]);

  const total = cart.reduce((a, b) => a + b.price, 0);

  const placeOrder = () => {
    const text = cart.map((i, idx) => `${idx+1}. ${i.name} - ₹${i.price}`).join("%0A");
    window.open(`https://wa.me/917032042334?text=Order:%0A${text}%0ATotal: ₹${total}`);
  };

  return (
    <div style={{ background:"#050505", color:"white", fontFamily:"system-ui" }}>

      {/* HERO */}
      <div style={{
        height:"70vh",
        background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.95)), url('https://images.unsplash.com/photo-1555992336-03a23c1fcb4a') center/cover",
        display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"
      }}>
        <h1 style={{ fontSize:"70px" }}>THE BRICK</h1>
        <p>Luxury Dining • Wine • Music • Celebration</p>
      </div>

      {/* EXPERIENCE */}
      <div style={{ display:"flex", justifyContent:"space-around", padding:"20px", flexWrap:"wrap" }}>
        <div>🍷 Bar</div>
        <div>🎤 Karaoke</div>
        <div>🎶 Live Music</div>
        <div>🎂 Events</div>
      </div>

      {/* CATEGORY */}
      <div style={{ textAlign:"center", padding:"20px" }}>
        {categories.map(c => (
          <button key={c} onClick={()=>setActive(c)} style={{
            margin:"5px", padding:"10px 20px",
            background: active===c?"gold":"transparent",
            color: active===c?"black":"white",
            borderRadius:"20px"
          }}>{c}</button>
        ))}
      </div>

      {/* MENU */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
        gap:"20px", padding:"30px"
      }}>
        {filtered.map((item,i)=>(
          <motion.div key={i} whileHover={{scale:1.05}} style={{
            background:"#111", borderRadius:"12px", overflow:"hidden"
          }}>
            <img src={`https://source.unsplash.com/400x300/?food,${item.name}`} 
                 style={{ width:"100%", height:"180px", objectFit:"cover" }} />
            <div style={{ padding:"15px" }}>
              <h3>{item.name}</h3>
              <p style={{ color:item.type==="Veg"?"#4caf50":"#ff4d4d" }}>{item.type}</p>
              <p>₹{item.price}</p>
              <button onClick={()=>setCart([...cart,item])}
                style={{ background:"gold", border:"none", padding:"8px 12px" }}>
                Add
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GALLERY */}
      <section style={{ padding:"40px" }}>
        <h2 style={{ textAlign:"center" }}>Gallery</h2>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
          gap:"10px"
        }}>
          {["restaurant","food","bar","party","music"].map((q,i)=>(
            <img key={i}
              src={`https://source.unsplash.com/300x300/?${q}`}
              style={{ width:"100%", height:"150px", objectFit:"cover", borderRadius:"8px" }}
            />
          ))}
        </div>
      </section>

      {/* FLOATING BUTTON */}
      <button onClick={placeOrder} style={{
        position:"fixed",
        bottom:"20px",
        left:"20px",
        background:"#25D366",
        color:"white",
        padding:"15px",
        borderRadius:"50px",
        border:"none"
      }}>
        Order Now
      </button>

      {/* CART */}
      <div style={{
        position:"fixed",
        bottom:"20px",
        right:"20px",
        background:"#111",
        padding:"15px",
        borderRadius:"10px"
      }}>
        <p>{cart.length} items</p>
        <p>₹{total}</p>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign:"center", padding:"40px" }}>
        <p>Bhanjyang Road, Namchi, South Sikkim</p>
        <p>11:00 AM – 10:00 PM</p>
      </div>

    </div>
  );
}
