"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const MENU = [
  { name: "Chilli Chicken", price: 320, category: "Starters", type: "Non-Veg" },
  { name: "Paneer Chilli", price: 300, category: "Starters", type: "Veg" },
  { name: "Chicken Lollipop", price: 360, category: "Starters", type: "Non-Veg" },
  { name: "Veg Fried Rice", price: 220, category: "Main Course", type: "Veg" },
  { name: "Chicken Fried Rice", price: 260, category: "Main Course", type: "Non-Veg" },
  { name: "Hakka Noodles Veg", price: 240, category: "Main Course", type: "Veg" },
  { name: "Hakka Noodles Chicken", price: 280, category: "Main Course", type: "Non-Veg" },
  { name: "Beer", price: 300, category: "Bar", type: "Non-Veg" },
  { name: "Red Wine", price: 600, category: "Bar", type: "Non-Veg" },
];

const categories = ["All", "Starters", "Main Course", "Bar"];

export default function Page() {
  const [cart, setCart] = useState([]);
  const [active, setActive] = useState("All");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [event, setEvent] = useState("");

  const filtered = useMemo(() => 
    MENU.filter(i => active === "All" || i.category === active), 
  [active]);

  const total = cart.reduce((a, b) => a + b.price, 0);

  const placeOrder = () => {
    const text = cart.map((i, idx) => `${idx + 1}. ${i.name} - ₹${i.price}`).join("%0A");
    const msg = `Hello THE BRICK,%0A%0AI would like to place an order:%0A%0A${text}%0A%0ATotal: ₹${total}%0AName: ${name}%0AAddress: ${address}%0AEvent: ${event}`;
    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: "sans-serif" }}>

      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "60px" }}>THE BRICK</h1>
        <p>Wine • Dine • Music • Celebrate</p>
      </section>

      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>Celebrate With Us</h2>
        <select onChange={(e) => setEvent(e.target.value)}>
          <option value="">Select Occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Party</option>
        </select>
      </section>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>

      <section style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
        {filtered.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} style={{ background: "#111", padding: "15px" }}>
            <h3>{item.name}</h3>
            <p style={{ color: item.type === "Veg" ? "green" : "red" }}>{item.type}</p>
            <p>₹{item.price}</p>
            <button onClick={() => setCart([...cart, item])}>Add</button>
          </motion.div>
        ))}
      </section>

      <section style={{ padding: "20px" }}>
        <h3>Your Details</h3>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </section>

      <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#111", padding: "15px" }}>
        <p>{cart.length} items</p>
        <p>₹{total}</p>
        {cart.length > 0 && <button onClick={placeOrder}>Order</button>}
      </div>

      <footer style={{ textAlign: "center", padding: "40px" }}>
        <p>Bhanjyang Road, Namchi</p>
        <p>11AM – 10PM</p>
      </footer>

    </div>
  );
}
