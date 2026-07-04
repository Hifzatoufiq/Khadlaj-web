import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the image container in ProductCard to be foolproof perfectly aligned
old_img_container = """      <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <img
          src={p.img} alt={p.name} loading="lazy"
          style={{
            width:"95%", height:"95%", objectFit:"contain",
            mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)",
            transition:"transform .8s cubic-bezier(0.25, 1, 0.25, 1)",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          padding:"15px", display:"flex", justifyContent:"center",
          transition:"all .4s cubic-bezier(0.25, 1, 0.25, 1)",
          transform: hov ? "translateY(0)" : "translateY(20px)",
          opacity: hov ? 1 : 0, zIndex:10
        }}>
          <button style={{
            width:"100%", background:"#111", color:"#fff", border:"none", 
            padding:"12px", fontSize:10, letterSpacing:2, fontWeight:500, 
            cursor:"pointer", textTransform:"uppercase",
            fontFamily:"'Montserrat',sans-serif", transition:"background .3s"
          }}
          onMouseEnter={(e)=>e.target.style.background="#444"}
          onMouseLeave={(e)=>e.target.style.background="#111"}
          >
            Quick View
          </button>
        </div>
      </div>"""

new_img_container = """      <div style={{ position:"relative", width:"100%", aspectRatio:"1/1", overflow:"hidden", background:"transparent" }}>
        <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", padding:"12px"}}>
          <img
            src={p.img} alt={p.name} loading="lazy"
            style={{
              width:"100%", height:"100%", objectFit:"contain",
              mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)",
              transition:"transform .8s cubic-bezier(0.25, 1, 0.25, 1)",
              transform: hov ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          padding:"15px", display:"flex", justifyContent:"center",
          transition:"all .4s cubic-bezier(0.25, 1, 0.25, 1)",
          transform: hov ? "translateY(0)" : "translateY(20px)",
          opacity: hov ? 1 : 0, zIndex:10
        }}>
          <button style={{
            width:"100%", background:"#111", color:"#fff", border:"none", 
            padding:"12px", fontSize:10, letterSpacing:2, fontWeight:500, 
            cursor:"pointer", textTransform:"uppercase",
            fontFamily:"'Montserrat',sans-serif", transition:"background .3s"
          }}
          onMouseEnter={(e)=>e.target.style.background="#444"}
          onMouseLeave={(e)=>e.target.style.background="#111"}
          >
            Quick View
          </button>
        </div>
      </div>"""

content = content.replace(old_img_container, new_img_container)

# Also, update the product card container to use height: "100%" so they stretch equally in grids
old_card_root = """    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>setPage("product")}
      style={{
        display:"flex",
        flexDirection:"column",
        background:"#fff",
        position:"relative",
        cursor:"pointer",
        border: "none",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >"""

new_card_root = """    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>setPage("product")}
      style={{
        display:"flex",
        flexDirection:"column",
        background:"#fff",
        position:"relative",
        cursor:"pointer",
        border: "none",
        height:"100%",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >"""
    
content = content.replace(old_card_root, new_card_root)

# And fix any grid containers that use `alignItems: "start"` to NOT use it, so they stretch by default
content = content.replace('alignItems:"start"', '')

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
