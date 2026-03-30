"use client";
import { useState, useMemo } from "react";

const MENU = [
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
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("");
  const [celebration, setCelebration] = useState("");

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

  const removeItem = (item) => {
    setCart(prev =>
      prev
        .map(i =>
          i.name === item.name ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // WhatsApp Order
  const placeOrder = () => {
    const items = cart.map(
      (i, idx) => `${idx+1}. ${i.name} x${i.qty} - ₹${i.price*i.qty}`
    ).join("%0A");

    const msg = `ORDER - THE BRICK%0A${items}%0ATotal: ₹${total}%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0ANotes: ${notes}`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  // Reservation
  const reserve = () => {
    const msg = `RESERVATION - THE BRICK%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ATime: ${time}%0APAX: ${pax}%0ACelebration: ${celebration}%0ASpecial: ${notes}`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{ background:"#0b0b0b", color:"white", padding:"20px" }}>

      <h1 style={{ textAlign:"center" }}>THE BRICK</h1>

      {/* FORM */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
        <input placeholder="Name" onChange={e=>setName(e.target.value)} style={input}/>
        <input placeholder="Phone" onChange={e=>setPhone(e.target.value)} style={input}/>
        <input placeholder="Address" onChange={e=>setAddress(e.target.value)} style={input}/>
      </div>

      {/* RESERVATION */}
      <h3>Reservation</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
        <input type="date" onChange={e=>setDate(e.target.value)} style={input}/>
        <input type="time" onChange={e=>setTime(e.target.value)} style={input}/>
        <input placeholder="PAX" onChange={e=>setPax(e.target.value)} style={input}/>
        <input placeholder="Celebration Type" onChange={e=>setCelebration(e.target.value)} style={input}/>
      </div>

      <input placeholder="Special Request (cake, decoration, preorder)" onChange={e=>setNotes(e.target.value)} style={{...input, width:"100%", marginTop:"10px"}}/>

      <button onClick={reserve} style={reserveBtn}>Reserve Table 🎂</button>

      {/* MAIN */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px", marginTop:"20px" }}>

        {/* MENU */}
        <div style={{...panel, maxHeight:"500px", overflowY:"scroll"}}>
          <input placeholder="Search..." onChange={e=>setSearch(e.target.value)} style={input}/>

          {filtered.map((item,i)=>(
            <div key={i} style={menuItem}>
              <img src={`https://source.unsplash.com/100x80/?food,${item.name}`} />
              <span>{item.name}</span>
              <div>
                <button onClick={()=>removeItem(item)}>-</button>
                <button onClick={()=>addItem(item)}>+</button>
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        <div style={panel}>
          <h3>Cart</h3>
          {cart.map((i,idx)=>(
            <div key={idx}>{i.name} x{i.qty}</div>
          ))}
          <h3>₹{total}</h3>
          <button onClick={placeOrder} style={orderBtn}>Order WhatsApp</button>
        </div>

      </div>
    </div>
  );
}

// styles
const input = { padding:"10px", background:"#111", color:"white", border:"1px solid #333" };
const panel = { background:"#111", padding:"15px", borderRadius:"10px" };
const menuItem = { display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #222" };
const orderBtn = { background:"#25D366", padding:"10px", border:"none", color:"white", width:"100%" };
const reserveBtn = { background:"gold", padding:"10px", border:"none", marginTop:"10px" };
