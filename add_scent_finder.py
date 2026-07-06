with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# 1. Add states and product map at the top of HomePage
old_homepage_start = """function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("All");"""

new_homepage_start = """function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("All");
  const [quizStep, setQuizStep] = useState(1);
  const [quizMood, setQuizMood] = useState("");
  const [quizOccasion, setQuizOccasion] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  const quizProducts = {
    "Rich & Exotic": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 204) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 20) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 200) || PRODUCTS[0]
    },
    "Fresh & Energizing": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 301) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 13) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 15) || PRODUCTS[0]
    },
    "Clean & Sophisticated": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 208) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 14) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 303) || PRODUCTS[0]
    }
  };"""

content = content.replace(old_homepage_start, new_homepage_start)

# 2. Insert the Scent Finder Quiz section right before Testimonials
old_testimonials = """      {/* ── TESTIMONIALS ── */}"""

new_quiz_section = """      {/* ── SCENT FINDER QUIZ ── */}
      <section style={{background:"#080808", padding:"96px 5%", color:"#fff", borderTop:"1px solid rgba(255,255,255,0.08)", position:"relative", zIndex:1}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:64, alignItems:"center"}} className="hero-split">
          
          {/* Left info column */}
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:16}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Olfactive Profiler</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,3.8vw,52px)",fontWeight:300,color:"#fff",lineHeight:1.05,letterSpacing:-1,marginBottom:24}}>
              Khadlaj <em style={{fontStyle:"italic",color:"#B8922A"}}>Scent Finder</em>
            </h2>
            <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:14,maxWidth:440,fontFamily:"'Montserrat',sans-serif",marginBottom:32}}>
              Fragrance is a deeply personal language. Answer a few questions and our custom olfactive profiler will match you with a signature scent from our master perfume lines.
            </p>
            <div style={{display:"flex", alignItems:"center", gap:14}}>
              <span style={{fontSize:22, color:"#B8922A"}}>✦</span>
              <span style={{fontSize:11, letterSpacing:1.5, fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", color:"rgba(255,255,255,0.6)"}}>Respect the Quality, Provide the Best</span>
            </div>
          </div>

          {/* Right quiz container */}
          <div style={{background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"40px 32px", minHeight:380, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative"}}>
            
            {quizStep === 1 && (
              <div style={{animation:"fadeUp .4s ease both"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:700, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Step 1 of 2</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:24}}>Choose Your Olfactive Vibe</h3>
                <div style={{display:"flex", flexDirection:"column", gap:12}}>
                  {[
                    { v: "Rich & Exotic", desc: "Bold Oud, precious Amber, and warm spices." },
                    { v: "Fresh & Energizing", desc: "Vibrant Citrus, crisp Marine, and delicate florals." },
                    { v: "Clean & Sophisticated", desc: "Sensual Musk, creamy Sandalwood, and soft iris." }
                  ].map(item => (
                    <button key={item.v}
                      onClick={() => { setQuizMood(item.v); setQuizStep(2); }}
                      style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#fff", padding:"14px 20px", borderRadius:8, textAlign:"left", cursor:"pointer", transition:"all 0.25s ease"}}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,146,42,0.1)"; e.currentTarget.style.borderColor = "#B8922A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <p style={{fontSize:12, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:0}}>{item.v}</p>
                      <p style={{fontSize:9, color:"rgba(255,255,255,0.5)", margin:"4px 0 0", fontFamily:"'Montserrat',sans-serif"}}>{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div style={{animation:"fadeUp .4s ease both"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:700, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Step 2 of 2</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:24}}>When will you wear this?</h3>
                <div style={{display:"flex", flexDirection:"column", gap:12}}>
                  {[
                    { k: "Royal Evenings", label: "Royal Evenings", desc: "Special events, formal dinners, and night statements." },
                    { k: "Daily Wear & Office", label: "Daily Wear & Office", desc: "Sophisticated signature scent for day-to-day use." },
                    { k: "Romantic Date Nights", label: "Romantic Date Nights", desc: "Warm, intimate, and captivating close encounters." }
                  ].map(item => (
                    <button key={item.k}
                      onClick={() => {
                        const finalProduct = quizProducts[quizMood][item.label];
                        setQuizOccasion(item.label);
                        setQuizResult(finalProduct);
                        setQuizStep(3);
                      }}
                      style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#fff", padding:"14px 20px", borderRadius:8, textAlign:"left", cursor:"pointer", transition:"all 0.25s ease"}}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,146,42,0.1)"; e.currentTarget.style.borderColor = "#B8922A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <p style={{fontSize:12, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:0}}>{item.label}</p>
                      <p style={{fontSize:9, color:"rgba(255,255,255,0.5)", margin:"4px 0 0", fontFamily:"'Montserrat',sans-serif"}}>{item.desc}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setQuizStep(1)} style={{background:"none", border:"none", color:"rgba(255,255,255,0.5)", fontSize:9, textTransform:"uppercase", letterSpacing:1.5, marginTop:20, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Montserrat',sans-serif", padding:0}}>
                  &larr; Back
                </button>
              </div>
            )}

            {quizStep === 3 && quizResult && (
              <div style={{animation:"fadeUp .4s ease both", textAlign:"center"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:700, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Your Scent Match</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:20}}>The Perfect Fit</h3>
                
                {/* Result Box */}
                <div style={{display:"flex", alignItems:"center", gap:20, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", padding:20, borderRadius:8, marginBottom:24, textAlign:"left"}}>
                  <div style={{width:80, height:80, background:"#fff", borderRadius:6, padding:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <img src={quizResult.img} alt={quizResult.name} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
                  </div>
                  <div>
                    <p style={{fontSize:8, color:"#B8922A", letterSpacing:2, textTransform:"uppercase", margin:0, fontWeight:700, fontFamily:"'Montserrat',sans-serif"}}>{quizResult.col}</p>
                    <h4 style={{fontSize:15, fontWeight:700, color:"#fff", textTransform:"uppercase", margin:"4px 0 6px", fontFamily:"'Montserrat',sans-serif"}}>{quizResult.name}</h4>
                    <p style={{fontSize:11, color:"rgba(255,255,255,0.6)", margin:0, fontFamily:"'Montserrat',sans-serif"}}>{quizResult.size}</p>
                  </div>
                </div>

                <div style={{display:"flex", gap:12}}>
                  <button onClick={() => { setViewProduct(quizResult); setPage("product"); }}
                    style={{flex:1, background:"#B8922A", border:"1px solid #B8922A", color:"#fff", padding:"14px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontWeight:700, borderRadius:4, transition:"all .25s ease"}}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#B8922A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#B8922A"; }}
                  >
                    Discover Perfume
                  </button>
                  <button onClick={() => setQuizStep(1)}
                    style={{background:"transparent", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"14px 20px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:4, transition:"all .25s ease"}}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}"""

content = content.replace(old_testimonials, new_quiz_section)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Scent Finder section successfully added!")
