import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

new_section = """
      {/* ── MASTER PERFUMERY EDITORIAL ── */}
      <section style={{position:"relative",overflow:"hidden",zIndex:0,background:"#fff",padding:"0",borderTop:"1px solid #E8E4DC"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",minHeight:"600px"}} className="hero-split">
          {/* Left Text Column */}
          <div style={{padding:"100px 10% 100px 8%",display:"flex",flexDirection:"column",justifyContent:"center", background:"#fff", zIndex:2}}>
            <p style={{color:"#888", fontSize:10, letterSpacing:4, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:16, fontWeight:600}}>Our Heritage</p>
            <h2 className="disp" style={{fontSize:"clamp(36px,4.5vw,54px)",fontWeight:300,lineHeight:1.1,marginBottom:28,color:"#111",letterSpacing:-1}}>
              The Art of Arabic &amp;<br/><em style={{color:"#B8922A",fontStyle:"italic"}}>French Perfumery</em>
            </h2>
            <p style={{color:"#555",lineHeight:1.8,fontSize:14,marginBottom:40,maxWidth:460,fontFamily:"'Montserrat',sans-serif"}}>
              Founded by Mohamed Iqbal Abdul Sattar — each creation blends the ancient soul of Arabian oud with the precision of French fragrance tradition. Discover a legacy crafted in every drop.
            </p>
            <div>
              <button style={{background:"transparent", color:"#111", border:"1px solid #111", padding:"14px 36px", fontSize:10, letterSpacing:2.5, textTransform:"uppercase", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", transition:"all .4s ease", width:"max-content"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#111";e.currentTarget.style.color="#111";}}
                onClick={()=>setPage("story")}
              >Meet the Perfumers</button>
            </div>
          </div>
          {/* Right Image Column */}
          <div style={{position:"relative",overflow:"hidden",minHeight:"450px", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{position:"absolute", inset:0, background:"linear-gradient(to right, #fff 0%, transparent 15%)", zIndex:1}}></div>
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
          </div>
        </div>
      </section>
"""

pattern = re.compile(r'\{\/\* ── MASTER PERFUMERY EDITORIAL ── \*\/\}.*?(?=\{\/\* ── WHY KHADLAJ — Trust strip ── \*\/\})', re.DOTALL)
content = pattern.sub(new_section, content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
