with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# 1. Append the hotspot CSS to the end of GLOBAL_CSS
old_css_end = "  input,textarea{font-family:'Montserrat',sans-serif};\n"
# Wait, let's check if the semicolon is there. In line 249 of view_file:
# 249:   input,textarea{font-family:'Montserrat',sans-serif;}
# 250: 
# Wait, let's find the closing backtick of GLOBAL_CSS
# Let's search for the backtick of GLOBAL_CSS

old_css_marker = "  input,textarea{font-family:'Montserrat',sans-serif;}\n`;"
new_css_marker = """  input,textarea{font-family:'Montserrat',sans-serif;}

  /* Scent Hotspots styling */
  @keyframes hotspot-pulse {
    0% { transform: scale(0.65); opacity: 1; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  .hotspot-dot {
    position: relative;
    width: 10px;
    height: 10px;
    background: #B8922A;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(184, 146, 42, 0.8);
    display: inline-block;
  }
  .hotspot-pulse-ring {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 20px;
    height: 20px;
    border: 2px solid #B8922A;
    border-radius: 50%;
    animation: hotspot-pulse 1.8s infinite ease-out;
  }
  .hotspot-container {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hotspot-tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid #E8E4DC;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.16);
    width: max-content;
    max-width: 220px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    text-align: center;
    backdrop-filter: blur(8px);
  }
  .hotspot-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.98) transparent transparent transparent;
  }
  .hotspot-container:hover .hotspot-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;"""

content = content.replace(old_css_marker, new_css_marker)

# 2. Update the left column paragraph with the gold divider line style
old_paragraph = """            <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:14,marginBottom:40,maxWidth:460,fontFamily:"'Montserrat',sans-serif"}}>
              Founded by Mohamed Iqbal Abdul Sattar — each creation blends the ancient soul of Arabian oud with the precision of French fragrance tradition. Discover a legacy crafted in every drop.
            </p>"""

new_paragraph = """            <div style={{display:"flex", gap:20, alignItems:"stretch", marginBottom:40, maxWidth:480}}>
              <div style={{width:2, background:"linear-gradient(to bottom, #B8922A, transparent)", flexShrink:0}}/>
              <p style={{color:"rgba(255,255,255,0.75)",lineHeight:1.85,fontSize:14,fontFamily:"'Montserrat',sans-serif", margin:0}}>
                Founded by Mohamed Iqbal Abdul Sattar in 1997, Khadlaj Perfumes is built on the pursuit of scent perfection. Each creation blends the ancient soul of Arabian oud with the precision of French fragrance tradition. Discover a legacy crafted in every drop.
              </p>
            </div>"""

content = content.replace(old_paragraph, new_paragraph)

# 3. Add Hotspots elements inside the Right Image Column container
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
            />
          </div>"""

new_right_column = """          {/* Right Image Column */}
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
            />
            
            {/* Hotspots */}
            <div className="hotspot-container" style={{top:"25%", left:"49.5%"}}>
              <span className="hotspot-pulse-ring"></span>
              <span className="hotspot-dot"></span>
              <div className="hotspot-tooltip">
                <p style={{fontSize:8, color:"#B8922A", textTransform:"uppercase", letterSpacing:1.5, fontWeight:700, marginBottom:4, fontFamily:"'Montserrat',sans-serif"}}>Top Note</p>
                <p style={{fontSize:12, fontWeight:700, color:"#000", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase"}}>Bergamot &amp; Saffron</p>
                <p style={{fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", marginTop:3}}>Zesty and exotically spiced entrance.</p>
              </div>
            </div>

            <div className="hotspot-container" style={{top:"49%", left:"51.5%"}}>
              <span className="hotspot-pulse-ring"></span>
              <span className="hotspot-dot"></span>
              <div className="hotspot-tooltip">
                <p style={{fontSize:8, color:"#B8922A", textTransform:"uppercase", letterSpacing:1.5, fontWeight:700, marginBottom:4, fontFamily:"'Montserrat',sans-serif"}}>Heart Note</p>
                <p style={{fontSize:12, fontWeight:700, color:"#000", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase"}}>Geranium &amp; Rose</p>
                <p style={{fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", marginTop:3}}>Rich, blooming, elegant floral core.</p>
              </div>
            </div>

            <div className="hotspot-container" style={{top:"72%", left:"50%"}}>
              <span className="hotspot-pulse-ring"></span>
              <span className="hotspot-dot"></span>
              <div className="hotspot-tooltip">
                <p style={{fontSize:8, color:"#B8922A", textTransform:"uppercase", letterSpacing:1.5, fontWeight:700, marginBottom:4, fontFamily:"'Montserrat',sans-serif"}}>Base Note</p>
                <p style={{fontSize:12, fontWeight:700, color:"#000", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase"}}>Oud, Amber &amp; Musk</p>
                <p style={{fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", marginTop:3}}>Deep, warm, sensual lingering trail.</p>
              </div>
            </div>
          </div>"""

content = content.replace(old_right_column, new_right_column)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully applied creative improvements!")
