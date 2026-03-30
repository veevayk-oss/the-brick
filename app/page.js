"use client";
import { useState } from "react";

/* ================= FULL MENU ================= */
const MENU = {
  "Starters (Veg)": [
    { name: "Paneer Chilli", price: 260 },
    { name: "Cheese Balls", price: 290 },
    { name: "French Fries", price: 180 },
    { name: "Crispy Honey Potato", price: 200 },
  ],

  "Starters (Non-Veg)": [
    { name: "Chicken Lollipop", price: 280 },
    { name: "Chicken Wings", price: 280 },
    { name: "Chicken 65", price: 270 },
    { name: "Fish Fingers", price: 290 },
  ],

  "Himalayan Specials": [
    { name: "Sadeko Wai Wai", price: 130 },
    { name: "Pork Sekwa", price: 300 },
    { name: "Buff Sukuti", price: 350 },
  ],

  "Noodles & Chowmein": [
    { name: "Hakka Noodles Veg", price: 160 },
    { name: "Hakka Noodles Chicken", price: 200 },
    { name: "Chowmein Veg", price: 170 },
    { name: "Chowmein Chicken", price: 200 },
    { name: "Thukpa Veg", price: 180 },
    { name: "Thukpa Chicken", price: 220 },
  ],

  "Fried Rice": [
    { name: "Fried Rice Veg", price: 160 },
    { name: "Fried Rice Chicken", price: 200 },
    { name: "Schezwan Fried Rice Chicken", price: 210 },
  ],

  "Main Course": [
    { name: "Butter Chicken", price: 270 },
    { name: "Chicken Curry", price: 250 },
    { name: "Paneer Butter Masala", price: 280 },
    { name: "Kadhai Paneer", price: 280 },
  ],

  "Desserts": [
    { name: "Hot Gulab Jamun with Ice Cream", price: 250 },
    { name: "Chocolate Ice Cream", price: 200 },
  ],

  "Beverages": [
    { name: "Cold Coffee", price: 180 },
    { name: "Virgin Mojito", price: 180 },
    { name: "Lemon Iced Tea", price: 130 },
  ],

  "Cocktails": [
    { name: "Margarita", price: 399 },
    { name: "Mojito", price: 299 },
    { name: "Long Island Iced Tea", price: 449 },
  ]
};

export default function Page() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart(prev=>{
      const f = prev.find(i=>i.name===item.name);
      if(f){
        return prev.map(i=>i.name===item.name?{...i,qty:i.qty+1}:i);
      }
      return [...prev,{...item,qty:1}];
    });
  };

  const removeItem = (item) => {
    setCart(prev =>
      prev.map(i=>i.name===item.name?{...i,qty:i.qty-1}:i)
      .filter(i=>i.qty>0)
    );
  };

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const orderWhatsApp = () => {
    const items = cart.map(i=>`${i.name} x${i.qty}`).join("%0A");
    const msg = `Order from THE BRICK:%0A${items}%0ATotal ₹${total}`;
    window.open(`https://wa.me/917032042334?text=${msg}`);
  };

  return (
    <div style={{background:"#0b0b0b",color:"white",padding:"20px"}}>

      {/* HOME */}
      {view==="home" && (
        <div>

          {/* HERO */}
          <div style={hero}>
            <div style={heroBox}>
              <h1 style={{fontSize:"50px"}}>THE BRICK</h1>

              <p>
                Premium multi-cuisine restaurant with a Himalayan twist.
                Live music • Cocktails • Celebrations
              </p>

              <button onClick={()=>setView("order")} style={btn}>
                Order Online
              </button>

              <button onClick={()=>setView("reserve")} style={btn}>
                Reserve Table
              </button>
            </div>
          </div>

          {/* FEATURES */}
          <div style={{textAlign:"center",marginTop:"30px"}}>
            <h2>Why Choose Us</h2>

            <div style={flex}>
              <div style={glass}>🍷 Fine Cocktails</div>
              <div style={glass}>🎶 Live Music</div>
              <div style={glass}>🎤 Karaoke</div>
              <div style={glass}>🎂 Celebrations</div>
            </div>
          </div>

        </div>
      )}

      {/* ORDER PAGE */}
      {view==="order" && (
        <>
          <button onClick={()=>setView("home")}>⬅ Back</button>

          <h2>Menu</h2>

          {Object.keys(MENU).map((cat,idx)=>(
            <div key={idx} style={{marginBottom:"20px"}}>

              <h3 style={{borderBottom:"1px solid gold"}}>{cat}</h3>

              {MENU[cat].map((item,i)=>(
                <div key={i} style={row}>
                  {item.name}

                  <div>
                    <button onClick={()=>removeItem(item)}>-</button>
                    <button onClick={()=>addItem(item)}>+</button>
                    ₹{item.price}
                  </div>
                </div>
              ))}

            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button onClick={orderWhatsApp} style={orderBtn}>
            Order on WhatsApp
          </button>
        </>
      )}

      {/* RESERVE */}
      {view==="reserve" && (
        <>
          <button onClick={()=>setView("home")}>⬅ Back</button>

          <input placeholder="Name" style={input}/>
          <input placeholder="Phone" style={input}/>
          <input type="date" style={input}/>
          <input type="time" style={input}/>
          <input placeholder="PAX" style={input}/>
          <input placeholder="Special Request" style={input}/>

          <button style={orderBtn}>Confirm Reservation</button>
        </>
      )}

    </div>
  );
}

/* ===== STYLES ===== */

const hero = {
  height:"80vh",
  backgroundImage:"url(https://source.unsplash.com/1600x900/?restaurant)",
  backgroundSize:"cover",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const heroBox = {
  background:"rgba(0,0,0,0.6)",
  padding:"30px",
  borderRadius:"20px"
};

const btn = {
  padding:"12px 20px",
  margin:"10px",
  background:"gold",
  border:"none",
  borderRadius:"20px"
};

const flex = {
  display:"flex",
  gap:"15px",
  justifyContent:"center",
  flexWrap:"wrap"
};

const glass = {
  padding:"15px",
  background:"rgba(255,255,255,0.05)",
  borderRadius:"10px"
};

const row = {
  display:"flex",
  justifyContent:"space-between",
  padding:"8px",
  borderBottom:"1px solid #222"
};

const input = {
  display:"block",
  margin:"5px 0",
  padding:"8px",
  width:"100%"
};

const orderBtn = {
  padding:"15px",
  background:"#25D366",
  border:"none",
  width:"100%",
  marginTop:"10px"
};
