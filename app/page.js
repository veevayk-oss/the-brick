"use client";
import { useState, useMemo } from "react";

const MENU = [
  // SAMPLE (I converted from your Excel — you can expand later)
  { name: "Veg Fried Rice", price: 220 },
  { name: "Egg Fried Rice", price: 240 },
  { name: "Chicken Fried Rice", price: 260 },
  { name: "Veg Chowmein", price: 220 },
  { name: "Chicken Chowmein", price: 260 },
  { name: "Chilli Chicken", price: 320 },
  { name: "Paneer Chilli", price: 300 },
  { name: "Beer", price: 300 },
  { name: "Red Wine", price: 600 },
];

export default function Page() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const filtered = useMemo(() =>
    MENU.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const addItem = (item) => {
    setCart(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) {
        return prev.map(i =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // 📲 WHATSAPP ORDER
  const placeOrder = () => {
    if (!phone) return alert("Enter phone number");

    const items = cart.map(
      (i, idx) => `${idx + 1}. ${i.name} x${i.qty} - ₹${i.price * i.qty}`
    ).join("%0A");

    const msg = `Hello THE BRICK%0AOrder:%0A${items}%0ATotal: ₹${total}%0AName: ${name}%0APhone: ${phone}%0ANotes: ${notes}`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  // 🎂 RESERVATION
  const reserve = () => {
    if (!phone) return alert("Enter phone number");

    const msg = `Reservation at THE BRICK%0AName: ${name}%0APhone: ${phone}%0ASpecial Request: ${notes}`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{ background:"#0b0b0b", color:"white", minHeight:"100vh", padding:"20px" }}>

      <h1>THE BRICK</h1>
      <h2>Online Takeout & Delivery</h2>

      {/* FORM */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"20px" }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={input}/>
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={input}/>
        <input placeholder="Special Request (cake, decoration, pre-order)" value={notes} onChange={e=>setNotes(e.target.value)} style={input}/>
      </div>

      <button onClick={reserve} style={reserveBtn}>Reserve Table 🎂</button>

      {/* MAIN */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px", marginTop:"20px" }}>

        {/* MENU */}
        <div style={panel}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <h3>Menu</h3>
            <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={input}/>
          </div>

          {filtered.map((item,i)=>(
            <div key={i} style={menuItem}>
              <span>{item.name}</span>
              <div>
                ₹{item.price}
                <button onClick={()=>addItem(item)} style={addBtn}>Add</button>
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        <div style={panel}>
          <h3>Your Cart</h3>

          {cart.map((item,i)=>(
            <div key={i}>
              {item.name} x{item.qty} - ₹{item.price * item.qty}
            </div>
          ))}

          <hr/>

          <b>Total: ₹{total}</b>

          <button onClick={placeOrder} style={orderBtn}>
            Order on WhatsApp 📲
          </button>
        </div>

      </div>

    </div>
  );
}

// STYLES
const input = {
  padding:"10px",
  background:"#111",
  border:"1px solid #333",
  color:"white"
};

const panel = {
  background:"#111",
  padding:"20px",
  borderRadius:"10px"
};

const menuItem = {
  display:"flex",
  justifyContent:"space-between",
  padding:"10px 0",
  borderBottom:"1px solid #222"
};

const addBtn = {
  marginLeft:"10px",
  background:"gold",
  border:"none",
  padding:"5px 10px"
};

const orderBtn = {
  width:"100%",
  marginTop:"20px",
  padding:"15px",
  background:"#25D366",
  border:"none",
  color:"white"
};

const reserveBtn = {
  background:"gold",
  padding:"10px 20px",
  border:"none",
  marginBottom:"10px"
};
