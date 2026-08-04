import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_canvas = r'''    // Hyper-Realistic Silver Foil Background
    const baseGradient = ctx\.createLinearGradient\(0, 0, width, height\);
    baseGradient\.addColorStop\(0, "#D3D7DF"\);
    baseGradient\.addColorStop\(0\.2, "#B9BEC8"\);
    baseGradient\.addColorStop\(0\.4, "#E2E6ED"\);
    baseGradient\.addColorStop\(0\.5, "#939BA8"\);
    baseGradient\.addColorStop\(0\.6, "#E2E6ED"\);
    baseGradient\.addColorStop\(0\.8, "#B9BEC8"\);
    baseGradient\.addColorStop\(1, "#D3D7DF"\);
    ctx\.fillStyle = baseGradient;
    ctx\.fillRect\(0, 0, width, height\);

    // Subtle brushed metal effect \(horizontal lines\)
    ctx\.lineWidth = 0\.5;
    for\(let y = 0; y < height; y \+= 4\) \{
      ctx\.strokeStyle = `rgba\(255,255,255,\$\{Math\.random\(\)\*0\.3\}\)`;
      ctx\.beginPath\(\);
      ctx\.moveTo\(0, y\);
      ctx\.lineTo\(width, y\);
      ctx\.stroke\(\);
      
      ctx\.strokeStyle = `rgba\(0,0,0,\$\{Math\.random\(\)\*0\.05\}\)`;
      ctx\.beginPath\(\);
      ctx\.moveTo\(0, y\+2\);
      ctx\.lineTo\(width, y\+2\);
      ctx\.stroke\(\);
    \}

    // Overprint security pattern \(classic scratch card look\)
    ctx\.fillStyle = "rgba\(100, 105, 120, 0\.15\)";
    ctx\.font = "bold 8px sans-serif";
    ctx\.textAlign = "center";
    ctx\.textBaseline = "middle";
    for\(let y = 8; y < height; y \+= 16\) \{
      for\(let x = \(y % 32 === 0 \? 8 : 24\); x < width; x \+= 32\) \{
         ctx\.fillText\("VIP", x, y\);
      \}
    \}

    // Bold Professional Text
    ctx\.font = "800 20px 'Montserrat', sans-serif";
    ctx\.letterSpacing = "4px"; 
    
    // Drop shadow for text depth
    ctx\.fillStyle = "rgba\(255,255,255,0\.7\)";
    ctx\.fillText\("SCRATCH HERE", width/2 \+ 1, height/2 \+ 2\);
    
    // Main text \(Dark Charcoal ink\)
    ctx\.fillStyle = "#1A1A1A";
    ctx\.fillText\("SCRATCH HERE", width/2, height/2\);
    
    ctx\.letterSpacing = "0px";'''

new_canvas = '''    // Premium Luxury Gold Foil Background
    const baseGradient = ctx.createLinearGradient(0, 0, width, height);
    baseGradient.addColorStop(0, "#C59B27");
    baseGradient.addColorStop(0.3, "#F3E5AB");
    baseGradient.addColorStop(0.5, "#D4AF37");
    baseGradient.addColorStop(0.7, "#FFF");
    baseGradient.addColorStop(1, "#A67C00");
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle metallic wave/sheen
    const sheen = ctx.createLinearGradient(0, height, width, 0);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.45, "rgba(255,255,255,0)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0.6)");
    sheen.addColorStop(0.55, "rgba(255,255,255,0)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    // Elegant inner border
    ctx.strokeStyle = "rgba(166, 124, 0, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, width - 12, height - 12);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.strokeRect(7, 7, width - 14, height - 14);

    // Subtle repeating minimal pattern (dots instead of loud diamonds)
    ctx.fillStyle = "rgba(166, 124, 0, 0.15)";
    for(let y = 10; y < height - 10; y += 8) {
      for(let x = 10; x < width - 10; x += 8) {
         ctx.beginPath();
         ctx.arc(x, y, 0.5, 0, 2*Math.PI);
         ctx.fill();
      }
    }

    // Professional Serif Text
    ctx.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "2px"; 
    
    // Very subtle elegant drop shadow for text depth
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("SCRATCH TO REVEAL", width/2, height/2 + 1);
    
    // Main text
    ctx.fillStyle = "#251737";
    ctx.fillText("SCRATCH TO REVEAL", width/2, height/2);
    
    ctx.letterSpacing = "0px";'''

content = re.sub(old_canvas, new_canvas, content)

old_revealed = r'''                  <div style=\{\{
                      position: "relative",
                      padding: "24px 40px",
                      background: "#FAF8F4", 
                      borderRadius: 4,
                      marginBottom: 32,
                      border: "1px solid #E8E4DC",
                      boxShadow: "inset 0 4px 12px rgba\(0,0,0,0\.15\), 0 10px 30px rgba\(0,0,0,0\.3\)",
                      overflow: "hidden"
                  \}\}>
                     <div style=\{\{position:"absolute", inset:0, opacity:0\.04, background:"url\('data:image/svg\+xml;utf8,<svg width=\\\"40\\\" height=\\\"40\\\" xmlns=\\\"http://www\.w3\.org/2000/svg\\\"><text x=\\\"0\\\" y=\\\"20\\\" font-family=\\\"sans-serif\\\" font-size=\\\"8\\\" font-weight=\\\"bold\\\" fill=\\\"%23000\\\" transform=\\\"rotate\(-45 20 20\)\\\">KHADLAJ</text></svg>'\) repeat"\}\} />

                     <p style=\{\{
                         fontSize: 34, 
                         fontWeight: 900, 
                         margin: 0, 
                         fontFamily: "'Montserrat', sans-serif",
                         background: "linear-gradient\(to right, #B8922A, #D4AF37, #F3E5AB, #D4AF37\)", 
                         WebkitBackgroundClip: "text", 
                         WebkitTextFillColor: "transparent",
                         letterSpacing: 10, 
                         filter: "drop-shadow\(0px 1px 1px rgba\(255,255,255,1\)\) drop-shadow\(0px -1px 1px rgba\(0,0,0,0\.3\)\)",
                         position: "relative",
                         zIndex: 2
                     \}\}>KHADLAJ10</p>
                  </div>

                  <button
                    onClick=\{\(\)=>\{
                      navigator\.clipboard\.writeText\("KHADLAJ10"\);
                      setPopupDone\(true\);
                      setShowPopup\(false\);
                    \}\}
                    style=\{\{
                       width:"100%",
                       background:"linear-gradient\(to right, #C59B27, #F3E5AB, #D4AF37\)",
                       color:"#1A0B22",
                       border:"none",
                       borderTop: "1px solid rgba\(255,255,255,0\.6\)",
                       padding:"18px",
                       fontSize:11,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all \.4s ease",
                       borderRadius: 4,
                       boxShadow: "0 6px 20px rgba\(0,0,0,0\.4\), inset 0 -4px 10px rgba\(0,0,0,0\.1\)"
                    \}\}
                    onMouseEnter=\{e=>\{e\.currentTarget\.style\.transform="translateY\(-2px\)"; e\.currentTarget\.style\.boxShadow="0 10px 25px rgba\(0,0,0,0\.5\), inset 0 -4px 10px rgba\(0,0,0,0\.1\)";\}\}
                    onMouseLeave=\{e=>\{e\.currentTarget\.style\.transform="translateY\(0\)"; e\.currentTarget\.style\.boxShadow="0 6px 20px rgba\(0,0,0,0\.4\), inset 0 -4px 10px rgba\(0,0,0,0\.1\)";\}\}
                  >Copy Code & Shop Now</button>'''

new_revealed = '''                  <div style={{
                      border:"2px solid #D4AF37", 
                      padding:"18px 36px", 
                      background:"linear-gradient(135deg, #111, #1a0822)", 
                      borderRadius: 8, 
                      marginBottom: 30, 
                      boxShadow:"0 10px 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.1)",
                      position: "relative",
                      overflow: "hidden"
                  }}>
                     <div style={{position:"absolute", inset:0, opacity:0.1, background:"url('data:image/svg+xml;utf8,<svg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www.w3.org/2000/svg\\"><circle cx=\\"2\\" cy=\\"2\\" r=\\"1\\" fill=\\"%23D4AF37\\"/></svg>') repeat"}} />
                     <p style={{
                         fontSize: 32, 
                         fontWeight:900, 
                         margin:0, 
                         background: "linear-gradient(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37)", 
                         WebkitBackgroundClip: "text", 
                         WebkitTextFillColor: "transparent",
                         letterSpacing: 8, 
                         filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.4))",
                         position: "relative",
                         zIndex: 2
                     }}>KHADLAJ10</p>
                  </div>

                  <button
                    onClick={()=>{
                      navigator.clipboard.writeText("KHADLAJ10");
                      setPopupDone(true);
                      setShowPopup(false);
                    }}
                    style={{
                       width:"100%",
                       background:"linear-gradient(to right, #D4AF37, #F3E5AB, #D4AF37)",
                       color:"#1A0B22",
                       border:"none",
                       padding:"18px",
                       fontSize:11,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all .4s ease",
                       borderRadius: 4,
                       boxShadow: "0 8px 25px rgba(212,175,55,0.3)"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(212,175,55,0.5)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 25px rgba(212,175,55,0.3)";}}
                  >Copy Code & Shop Now</button>'''

content = re.sub(old_revealed, new_revealed, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Restored older scratch card and revealed state successfully.")
