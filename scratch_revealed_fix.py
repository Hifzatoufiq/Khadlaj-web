import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_jsx = r'''                  <div style=\{\{
                      border:"2px solid #D4AF37", 
                      padding:"18px 36px", 
                      background:"linear-gradient\(135deg, #111, #1a0822\)", 
                      borderRadius: 8, 
                      marginBottom: 30, 
                      boxShadow:"0 10px 30px rgba\(212,175,55,0\.2\), inset 0 0 20px rgba\(212,175,55,0\.1\)",
                      position: "relative",
                      overflow: "hidden"
                  \}\}>
                     <div style=\{\{position:"absolute", inset:0, opacity:0\.1, background:"url\('data:image/svg\+xml;utf8,<svg width=\\\"20\\\" height=\\\"20\\\" xmlns=\\\"http://www\.w3\.org/2000/svg\\\"><circle cx=\\\"2\\\" cy=\\\"2\\\" r=\\\"1\\\" fill=\\\"%23D4AF37\\\"/></svg>'\) repeat"\}\} />
                     <p style=\{\{
                         fontSize: 32, 
                         fontWeight:900, 
                         margin:0, 
                         background: "linear-gradient\(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37\)", 
                         WebkitBackgroundClip: "text", 
                         WebkitTextFillColor: "transparent",
                         letterSpacing: 8, 
                         filter: "drop-shadow\(0 2px 10px rgba\(212,175,55,0\.4\)\)",
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
                       background:"linear-gradient\(to right, #D4AF37, #F3E5AB, #D4AF37\)",
                       color:"#1A0B22",
                       border:"none",
                       padding:"18px",
                       fontSize:11,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all \.4s ease",
                       borderRadius: 4,
                       boxShadow: "0 8px 25px rgba\(212,175,55,0\.3\)"
                    \}\}
                    onMouseEnter=\{e=>\{e\.currentTarget\.style\.transform="translateY\(-3px\)"; e\.currentTarget\.style\.boxShadow="0 12px 30px rgba\(212,175,55,0\.5\)";\}\}
                    onMouseLeave=\{e=>\{e\.currentTarget\.style\.transform="translateY\(0\)"; e\.currentTarget\.style\.boxShadow="0 8px 25px rgba\(212,175,55,0\.3\)";\}\}
                  >Copy Code & Shop Now</button>'''

new_jsx = '''                  <div style={{
                      position: "relative",
                      padding: "24px 40px",
                      background: "#FAF8F4", 
                      borderRadius: 4,
                      marginBottom: 32,
                      border: "1px solid #E8E4DC",
                      boxShadow: "inset 0 4px 12px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.3)",
                      overflow: "hidden"
                  }}>
                     <div style={{position:"absolute", inset:0, opacity:0.04, background:"url('data:image/svg+xml;utf8,<svg width=\\"40\\" height=\\"40\\" xmlns=\\"http://www.w3.org/2000/svg\\"><text x=\\"0\\" y=\\"20\\" font-family=\\"sans-serif\\" font-size=\\"8\\" font-weight=\\"bold\\" fill=\\"%23000\\" transform=\\"rotate(-45 20 20)\\">KHADLAJ</text></svg>') repeat"}} />

                     <p style={{
                         fontSize: 34, 
                         fontWeight: 900, 
                         margin: 0, 
                         fontFamily: "'Montserrat', sans-serif",
                         background: "linear-gradient(to right, #B8922A, #D4AF37, #F3E5AB, #D4AF37)", 
                         WebkitBackgroundClip: "text", 
                         WebkitTextFillColor: "transparent",
                         letterSpacing: 10, 
                         filter: "drop-shadow(0px 1px 1px rgba(255,255,255,1)) drop-shadow(0px -1px 1px rgba(0,0,0,0.3))",
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
                       background:"linear-gradient(to right, #C59B27, #F3E5AB, #D4AF37)",
                       color:"#1A0B22",
                       border:"none",
                       borderTop: "1px solid rgba(255,255,255,0.6)",
                       padding:"18px",
                       fontSize:11,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all .4s ease",
                       borderRadius: 4,
                       boxShadow: "0 6px 20px rgba(0,0,0,0.4), inset 0 -4px 10px rgba(0,0,0,0.1)"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.5), inset 0 -4px 10px rgba(0,0,0,0.1)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.4), inset 0 -4px 10px rgba(0,0,0,0.1)";}}
                  >Copy Code & Shop Now</button>'''

content = re.sub(old_jsx, new_jsx, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated revealed state realistic styling successfully.")
