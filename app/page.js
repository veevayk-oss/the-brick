"use client";
import { useState } from "react";

const MENU = [
  { name: "Chilli Chicken", price: 320, category: "Starters" },
  { name: "Paneer Chilli", price: 300, category: "Starters" },
  { name: "Chicken Fried Rice", price: 260, category: "Rice" },
  { name: "Veg Chowmein", price: 220, category: "Noodles" },
  { name: "Beer", price: 300, category: "Bar" },
];

export default function Page() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [active, setActive] = useState("All");

  // customer details
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [phone2,setPhone2]=useState("");

  // address
  const [street,setStreet]=useState("");
  const [landmark,setLandmark]=useState("");
  const [city,setCity]=useState("");
  const [zip,setZip]=useState("");

  // reservation
  const [occasion,setOccasion]=useState("");
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [pax,setPax]=useState("");
  const [notes,setNotes]=useState("");

  const categories = ["All", ...new Set(MENU.map(i => i.category))];

  const filtered = MENU.filter(
    i => active==="All" || i.category===active
  );

  const addItem = (item) => {
    setCart(prev=>{
      const f=prev.find(i=>i.name===item.name);
      if(f){
        return prev.map(i=>i.name===item.name?{...i,qty:i.qty+1}:i);
      }
      return [...prev,{...item,qty:1}];
    });
  };

  const removeItem = (item) => {
    setCart(prev =>
      prev.map(i =>
        i.name===item.name?{...i,qty:i.qty-1}:i
      ).filter(i=>i.qty>0)
    );
  };

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  // ORDER
  const orderWhatsApp = () => {
    const items = cart.map(
      (i,idx)=>`${idx+1}. ${i.name} x${i.qty} - ₹${i.price*i.qty}`
    ).join("%0A");

    const address = `${street}, ${landmark}, ${city} - ${zip}`;

    const msg = `ORDER - THE BRICK%0A${items}%0ATotal: ₹${total}%0AName:${name}%0APhone:${phone}%0AAlt Phone:${phone2}%0AAddress:${address}%0APayment: Cash on Delivery`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  // RESERVATION
  const reserveWhatsApp = () => {
    const items = cart.length
      ? "%0APreorder:%0A" + cart.map(i=>`${i.name} x${i.qty}`).join("%0A")
      : "";

    const msg = `RESERVATION - THE BRICK%0AName:${name}%0APhone:${phone}%0AOccasion:${occasion}%0ADate:${date}%0ATime:${time}%0APAX:${pax}%0ANotes:${notes}${items}`;

    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{background:"#0b0b0b",color:"white",padding:"20px"}}>

      {/* HOME */}
      {view==="home" && (
        <div style={{textAlign:"center"}}>
          <h1>THE BRICK</h1>
          <p>Bhanjyang Road, Namchi | 11 AM – 10 PM</p>

          <button onClick={()=>setView("order")} style={btn}>Order Online</button>
          <button onClick={()=>setView("reserve")} style={btn}>Reserve Table</button>
        </div>
      )}

      {/* ORDER */}
      {view==="order" && (
        <>
          <button onClick={()=>setView("home")}>⬅ Back</button>

          <h3>Customer Details</h3>
          <input placeholder="Name" onChange={e=>setName(e.target.value)} style={input}/>
          <input placeholder="Phone (Required)" onChange={e=>setPhone(e.target.value)} style={input}/>
          <input placeholder="Alt Phone (Optional)" onChange={e=>setPhone2(e.target.value)} style={input}/>

          <h3>Delivery Address</h3>
          <input placeholder="Street" onChange={e=>setStreet(e.target.value)} style={input}/>
          <input placeholder="Landmark" onChange={e=>setLandmark(e.target.value)} style={input}/>
          <input placeholder="City" onChange={e=>setCity(e.target.value)} style={input}/>
          <input placeholder="ZIP Code" onChange={e=>setZip(e.target.value)} style={input}/>

          <h3>Menu</h3>
          {categories.map(c=>(
            <button key={c} onClick={()=>setActive(c)}>{c}</button>
          ))}

          {filtered.map((item,i)=>(
            <div key={i} style={row}>
              {item.name}
              <div>
                <button onClick={()=>removeItem(item)}>-</button>
                <button onClick={()=>addItem(item)}>+</button>
                ₹{item.price}
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
          <p>Payment Mode: Cash on Delivery</p>

          <button onClick={orderWhatsApp} style={orderBtn}>
            Order on WhatsApp
          </button>
        </>
      )}

      {/* RESERVE */}
      {view==="reserve" && (
        <>
          <button onClick={()=>setView("home")}>⬅ Back</button>

          <input placeholder="Name" onChange={e=>setName(e.target.value)} style={input}/>
          <input placeholder="Phone" onChange={e=>setPhone(e.target.value)} style={input}/>
          <input placeholder="Occasion" onChange={e=>setOccasion(e.target.value)} style={input}/>
          <input type="date" onChange={e=>setDate(e.target.value)} style={input}/>
          <input type="time" onChange={e=>setTime(e.target.value)} style={input}/>
          <input placeholder="PAX" onChange={e=>setPax(e.target.value)} style={input}/>
          <input placeholder="Special Request" onChange={e=>setNotes(e.target.value)} style={input}/>

          <button onClick={()=>setView("order")} style={btn}>
            Pre-order Food
          </button>

          <button onClick={reserveWhatsApp} style={orderBtn}>
            Confirm Reservation
          </button>
        </>
      )}

    </div>
  );
}

const btn={padding:"15px",margin:"10px",background:"gold",border:"none"};
const input={display:"block",margin:"8px 0",padding:"10px",width:"100%"};
const row={display:"flex",justifyContent:"space-between",padding:"10px",borderBottom:"1px solid #222"};
const orderBtn={background:"#25D366",padding:"12px",border:"none",color:"white",width:"100%"};
