import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

new_section = """
      {/* ── PROMO SPLIT CARDS ── */}
      <section style={{padding:"60px 5% 100px", background:"#fff"}}>
        
        <SectionHeader eyebrow="The Perfect Gift" title="Curated Experiences" sub="Discover exclusive bundles and handpicked selections designed for you." />

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:32}}>
          
          {/* Card 1: Build Your Own Bundle */}
          <div style={{position:"relative", display:"flex", background:"#F0EBE6", overflow:"hidden", cursor:"pointer", minHeight:"360px", borderRadius:4, border:"1px solid #EBE4DD"}} 
            onClick={() => setPage("collections")}
            onMouseEnter={e=>{
              e.currentTarget.querySelector('img').style.transform="scale(1.05)";
              e.currentTarget.querySelector('button').style.background="#B8922A";
              e.currentTarget.querySelector('button').style.borderColor="#B8922A";
              e.currentTarget.querySelector('button').style.color="#fff";
            }}
            onMouseLeave={e=>{
              e.currentTarget.querySelector('img').style.transform="scale(1)";
              e.currentTarget.querySelector('button').style.background="transparent";
              e.currentTarget.querySelector('button').style.borderColor="#111";
              e.currentTarget.querySelector('button').style.color="#111";
            }}
          >
            {/* Text Side */}
            <div style={{flex:"1", display:"flex", flexDirection:"column", justifyContent:"center", padding:"12% 8%", zIndex:2}}>
              <p style={{color:"#888", fontSize:9, letterSpacing:4, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:12, fontWeight:600}}>Build Your</p>
              <h2 className="disp" style={{color:"#111", fontSize:"clamp(28px, 4vw, 46px)", lineHeight:1.1, marginBottom:28, fontWeight:300}}>Own Bundle</h2>
              <button style={{background:"transparent", color:"#111", border:"1px solid #111", padding:"12px 32px", fontSize:10, letterSpacing:2.5, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", transition:"all .4s ease", width:"max-content"}}
              >Create Now</button>
            </div>
            {/* Image Side */}
            <div style={{flex:"1.3", position:"relative", overflow:"hidden"}}>
               <div style={{position:"absolute", inset:0, background:"linear-gradient(to right, #F0EBE6 0%, transparent 50%)", zIndex:1}}></div>
               <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383" alt="Build Your Own Bundle" 
                style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"80% center", transition:"transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"}} />
            </div>
          </div>

          {/* Card 2: Handpicked Gift Sets */}
          <div style={{position:"relative", display:"flex", flexDirection:"row-reverse", background:"#F0EBE6", overflow:"hidden", cursor:"pointer", minHeight:"360px", borderRadius:4, border:"1px solid #EBE4DD"}}
            onClick={() => { setPage("collections"); }}
            onMouseEnter={e=>{
              e.currentTarget.querySelector('img').style.transform="scale(1.05)";
              e.currentTarget.querySelector('button').style.background="#B8922A";
              e.currentTarget.querySelector('button').style.borderColor="#B8922A";
              e.currentTarget.querySelector('button').style.color="#fff";
            }}
            onMouseLeave={e=>{
              e.currentTarget.querySelector('img').style.transform="scale(1)";
              e.currentTarget.querySelector('button').style.background="transparent";
              e.currentTarget.querySelector('button').style.borderColor="#111";
              e.currentTarget.querySelector('button').style.color="#111";
            }}
          >
            {/* Text Side */}
            <div style={{flex:"1", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-end", textAlign:"right", padding:"12% 8%", zIndex:2}}>
              <p style={{color:"#888", fontSize:9, letterSpacing:4, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:12, fontWeight:600}}>Handpicked</p>
              <h2 className="disp" style={{color:"#111", fontSize:"clamp(28px, 4vw, 46px)", lineHeight:1.1, marginBottom:28, fontWeight:300}}>Gift Sets</h2>
              <button style={{background:"transparent", color:"#111", border:"1px solid #111", padding:"12px 32px", fontSize:10, letterSpacing:2.5, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", transition:"all .4s ease", width:"max-content"}}
              >Shop Now</button>
            </div>
            {/* Image Side */}
            <div style={{flex:"1.3", position:"relative", overflow:"hidden"}}>
               <div style={{position:"absolute", inset:0, background:"linear-gradient(to left, #F0EBE6 0%, transparent 50%)", zIndex:1}}></div>
               <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739" alt="Handpicked Gift Sets" 
                style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"20% center", transition:"transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"}} />
            </div>
          </div>

        </div>
      </section>
"""

pattern = re.compile(r'\{\/\* ── PROMO SPLIT CARDS ── \*\/\}.*?(?=\{\/\* ── TIKTOK REELS ── \*\/\})', re.DOTALL)
content = pattern.sub(new_section, content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
