import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Define the new promo cards section
new_section = """
      {/* ── PROMO SPLIT CARDS ── */}
      <section style={{padding:"20px 5% 80px", background:"#fff"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}} className="grid-2">
          
          {/* Card 1: Build Your Own Bundle */}
          <div style={{position:"relative", overflow:"hidden", aspectRatio:"16/9", background:"#EBE6E0", cursor:"pointer"}} 
            onClick={() => setPage("collections")}
            onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform="scale(1)"}
          >
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383" alt="Build Your Own Bundle" 
              style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s ease"}} />
            <div style={{position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 80%)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", padding:"8%"}}>
              <p style={{color:"#fff", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:8, fontWeight:600}}>Build Your</p>
              <h2 className="disp" style={{color:"#fff", fontSize:"clamp(28px, 4vw, 46px)", lineHeight:1.1, marginBottom:24, fontWeight:300}}>Own Bundle</h2>
              <button style={{background:"#1c1c1c", color:"#fff", border:"none", padding:"14px 32px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderRadius:40, transition:"all .3s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#1c1c1c"}
              >Create Now</button>
            </div>
          </div>

          {/* Card 2: Handpicked Gift Sets */}
          <div style={{position:"relative", overflow:"hidden", aspectRatio:"16/9", background:"#EBE6E0", cursor:"pointer"}}
            onClick={() => { setPage("collections"); }}
            onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform="scale(1)"}
          >
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739" alt="Handpicked Gift Sets" 
              style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s ease"}} />
            <div style={{position:"absolute", inset:0, background:"linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", padding:"8%", textAlign:"right"}}>
              <p style={{color:"#fff", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:8, fontWeight:600}}>Handpicked</p>
              <h2 className="disp" style={{color:"#fff", fontSize:"clamp(28px, 4vw, 46px)", lineHeight:1.1, marginBottom:24, fontWeight:300}}>Gift Sets</h2>
              <button style={{background:"#1c1c1c", color:"#fff", border:"none", padding:"14px 32px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderRadius:40, transition:"all .3s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#1c1c1c"}
              >Shop Now</button>
            </div>
          </div>

        </div>
      </section>
"""

# Find where to insert it. Let's insert it right after the New Arrivals section ends.
# The New Arrivals section ends with:
#           ))}
#         </div>
#       </section>
#       {/* ── TIKTOK REELS ── */}

target = """          ))}
        </div>
      </section>

      {/* ── TIKTOK REELS ── */}"""

replacement = """          ))}
        </div>
      </section>
""" + new_section + """
      {/* ── TIKTOK REELS ── */}"""

if target in content:
    content = content.replace(target, replacement)
else:
    print("Could not find the insertion point!")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
