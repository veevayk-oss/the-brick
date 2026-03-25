
"use client";
import { useState } from "react";

const menu = [
  { name: "Chilli Chicken", price: 320 },
  { name: "Paneer Chilli", price: 300 },
  { name: "Chicken Fried Rice", price: 260 },
];

export default function Page() {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((a, b) => a + b.price, 0);

  const placeOrder = () => {
    const text = cart.map((i, idx) => `${idx+1}. ${i.name} - ₹${i.price}`).join("%0A");
    const msg = `Hello THE BRICK,%0A%0AOrder:%0A${text}%0A%0ATotal: ₹${total}`;
    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{background:"black", color:"white", minHeight:"100vh", padding:"20px"}}>
      <h1 style={{fontSize:"40px"}}>THE BRICK</h1>
      <p>Luxury wine & dine • karaoke • live music</p>

      <h2>Menu</h2>
      {menu.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
          <button onClick={() => setCart([...cart, item])}>Add</button>
        </div>
      ))}

      <h2>Cart</h2>
      <p>Total: ₹{total}</p>
      {cart.length > 0 && <button onClick={placeOrder}>Order on WhatsApp</button>}

      <h2>Visit Us</h2>
      <p>Bhanjyang Road, Namchi, South Sikkim</p>
      <p>11:00 AM – 10:00 PM</p>
    </div>
  );
}
