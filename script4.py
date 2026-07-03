import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

new_section = """
      {/* ── PROMO SPLIT CARDS ── */}
      <section style={{padding:"40px 5% 80px", background:"#fff"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:24}}>
          
          {/* Card 1: Build Your Own Bundle */}
          <div style={{position:"relative", display:"flex", background:"#F7F6F2", overflow:"hidden", cursor:"pointer", minHeight:"340px", borderRadius:2}} 
            onClick={() => setPage("collections")}
            onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform="scale(1)"}
          >
            {/* Text Side */}
            <div style={{flex:"1", display:"flex", flexDirection:"column", justifyContent:"center", padding:"12% 8%", zIndex:2}}>
              <p style={{color:"#888", fontSize:10, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:8, fontWeight:600}}>Build Your</p>
              <h2 className="disp" style={{color:"#111", fontSize:"clamp(26px, 3.5vw, 42px)", lineHeight:1.1, marginBottom:24, fontWeight:400}}>Own Bundle</h2>
              <button style={{background:"#1c1c1c", color:"#fff", border:"none", padding:"12px 30px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderRadius:40, transition:"all .3s", width:"max-content"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#1c1c1c"}
              >Create Now</button>
            </div>
            {/* Image Side */}
            <div style={{flex:"1.2", position:"relative"}}>
               <div style={{position:"absolute", inset:0, background:"linear-gradient(to right, #F7F6F2 0%, transparent 40%)", zIndex:1}}></div>
               <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383" alt="Build Your Own Bundle" 
                style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"right center", transition:"transform 0.8s ease"}} />
            </div>
          </div>

          {/* Card 2: Handpicked Gift Sets */}
          <div style={{position:"relative", display:"flex", flexDirection:"row-reverse", background:"#F7F6F2", overflow:"hidden", cursor:"pointer", minHeight:"340px", borderRadius:2}}
            onClick={() => { setPage("collections"); }}
            onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform="scale(1)"}
          >
            {/* Text Side */}
            <div style={{flex:"1", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", textAlign:"right", padding:"12% 8%", zIndex:2}}>
              <p style={{color:"#888", fontSize:10, letterSpacing:3, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:8, fontWeight:600}}>Handpicked</p>
              <h2 className="disp" style={{color:"#111", fontSize:"clamp(26px, 3.5vw, 42px)", lineHeight:1.1, marginBottom:24, fontWeight:400}}>Gift Sets</h2>
              <button style={{background:"#1c1c1c", color:"#fff", border:"none", padding:"12px 30px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderRadius:40, transition:"all .3s", width:"max-content"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#1c1c1c"}
              >Shop Now</button>
            </div>
            {/* Image Side */}
            <div style={{flex:"1.2", position:"relative"}}>
               <div style={{position:"absolute", inset:0, background:"linear-gradient(to left, #F7F6F2 0%, transparent 40%)", zIndex:1}}></div>
               <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739" alt="Handpicked Gift Sets" 
                style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"left center", transition:"transform 0.8s ease"}} />
            </div>
          </div>

        </div>
      </section>
"""

pattern = re.compile(r'\{\/\* ── PROMO SPLIT CARDS ── \*\/\}.*?(?=\{\/\* ── TIKTOK REELS ── \*\/\})', re.DOTALL)
content = pattern.sub(new_section, content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
