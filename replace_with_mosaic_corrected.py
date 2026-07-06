with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Replaces the actual clean right image column with the 2x2 Ingredient Mosaic
old_right_column = """          {/* Right Image Column */}
          <div style={{position:"relative",overflow:"hidden",minHeight:"450px", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <img 
              src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549" 
              alt="Khadlaj Master Perfumery"
              style={{
                width:"100%",
                height:"100%",
                objectFit:"contain",
                objectPosition:"center center",
                transition:"transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                padding:"20px"
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
          </div>"""

new_right_column = """          {/* Right Column: 2x2 Ingredient Mosaic */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:12, padding:"30px", background:"#050505", minHeight:"450px"}}>
            {[
              { title: "Pure Oud", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=500&auto=format&fit=crop", desc: "The deep, smoky and animalic soul of luxury Arabic oud." },
              { title: "Damask Rose", img: "https://images.unsplash.com/photo-1552689786-8344347c6a0c?q=80&w=500&auto=format&fit=crop", desc: "Delicate, fresh, and highly aromatic petals from French perfume valleys." },
              { title: "Warm Amber", img: "https://images.unsplash.com/photo-1505236271233-2f5d9d372b64?q=80&w=500&auto=format&fit=crop", desc: "Rich, golden, and resinous warmth that locks in the fragrance." },
              { title: "White Musk", img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=500&auto=format&fit=crop", desc: "Clean, sensual, and powdery soft base note for a lasting signature trail." }
            ].map((ing, i) => (
              <div key={i} style={{position:"relative", overflow:"hidden", borderRadius:8, cursor:"pointer", height:"100%"}}
                   onMouseEnter={e => {
                     e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
                     e.currentTarget.querySelector('.ing-overlay').style.opacity = "1";
                     e.currentTarget.querySelector('.ing-label').style.opacity = "0";
                   }}
                   onMouseLeave={e => {
                     e.currentTarget.querySelector('img').style.transform = "scale(1)";
                     e.currentTarget.querySelector('.ing-overlay').style.opacity = "0";
                     e.currentTarget.querySelector('.ing-label').style.opacity = "1";
                   }}>
                <img src={ing.img} alt={ing.title} style={{width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"}} />
                {/* Always visible label */}
                <div className="ing-label" style={{position:"absolute", bottom:12, left:12, zIndex:2, background:"rgba(0,0,0,0.75)", padding:"4px 12px", borderRadius:30, backdropFilter:"blur(4px)", transition:"opacity 0.3s ease"}}>
                  <p style={{fontSize:9, letterSpacing:1.5, color:"#fff", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", margin:0, fontWeight:600}}>{ing.title}</p>
                </div>
                {/* Hover details overlay */}
                <div className="ing-overlay" style={{position:"absolute", inset:0, background:"rgba(184,146,42,0.94)", display:"flex", flexDirection:"column", justifyContent:"center", padding:20, opacity:0, transition:"opacity 0.4s ease", zIndex:3, textAlign:"center"}}>
                  <p style={{fontSize:11, fontWeight:700, color:"#fff", textTransform:"uppercase", letterSpacing:1, fontFamily:"'Montserrat',sans-serif", marginBottom:6}}>{ing.title}</p>
                  <p style={{fontSize:9, color:"rgba(255,255,255,0.9)", fontFamily:"'Montserrat',sans-serif", lineHeight:1.4, margin:0}}>{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>"""

if old_right_column in content:
    content = content.replace(old_right_column, new_right_column)
    print("Successfully replaced with 2x2 Ingredient Mosaic!")
else:
    print("Could not find the target right column.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
