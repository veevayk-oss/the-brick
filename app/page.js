"use client";
import { useState, useMemo } from "react";

const MENU = [
  { name: "Chilli Chicken", price: 320, type: "Non-Veg" },
  { name: "Paneer Chilli", price: 300, type: "Veg" },
  { name: "Chicken Fried Rice", price: 260, type: "Non-Veg" },
  { name: "Veg Fried Rice", price: 220, type: "Veg" },
  { name: "Hakka Noodles", price: 240, type: "Veg" },
  { name: "Beer", price: 300, type: "Bar" },
];

export default function Page() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    MENU.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div style={{ background:"#0a0a0a", color:"white", minHeight:"100vh", padding:"20px" }}>

      {/* HEADER */}
      <h1 style={{ fontSize:"40px", marginBottom:"10px" }}>THE BRICK</h1>
      <h2 style={{ color:"#aaa", marginBottom:"30px" }}>
        Online Takeout & Delivery
      </h2>

      {/* CUSTOMER FORM */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"10px",
        marginBottom:"20px"
      }}>
        <input placeholder="Customer name" style={inputStyle}/>
        <input placeholder="Phone number" style={inputStyle}/>
        <input placeholder="Delivery address" style={inputStyle}/>
        <input placeholder="Notes" style={inputStyle}/>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr",
        gap:"20px"
      }}>

        {/* MENU PANEL */}
        <div style={panelStyle}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <h3>Menu</h3>
            <input
              placeholder="Search..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginTop:"20px" }}>
            {filtered.map((item,i)=>(
              <div key={i} style={menuItem}>
                <div>
                  <p>{item.name}</p>
                  <small style={{ color:"#888" }}>{item.type}</small>
                </div>
                <div>
                  ₹{item.price}
                  <button
                    onClick={()=>setCart([...cart,item])}
                    style={addBtn}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CART PANEL */}
        <div style={panelStyle}>
          <h3>Your cart</h3>

          {cart.map((item,i)=>(
            <div key={i} style={{ marginBottom:"10px" }}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <hr style={{ margin:"20px 0", borderColor:"#333" }} />

          <h3>Total: ₹{total}</h3>

          <button style={orderBtn}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

// STYLES
const inputStyle = {
  padding:"10px",
  background:"#111",
  border:"1px solid #333",
  borderRadius:"8px",
  color:"white"
};

const panelStyle = {
  background:"#111",
  padding:"20px",
  borderRadius:"12px"
};

const menuItem = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"10px 0",
  borderBottom:"1px solid #222"
};

const addBtn = {
  marginLeft:"10px",
  background:"gold",
  border:"none",
  padding:"5px 10px",
  borderRadius:"6px"
};

const orderBtn = {
  width:"100%",
  padding:"15px",
  marginTop:"20px",
  background:"gold",
  border:"none",
  borderRadius:"10px",
  fontWeight:"bold"
};
