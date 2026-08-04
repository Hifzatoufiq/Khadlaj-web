import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add keyframes
if '@keyframes spin' not in content:
    content = content.replace('</style>', '''  @keyframes spin { 100% { transform: rotate(360deg); } }
</style>''')

old_revealed = r'''                  <div style=\{\{
                      border:"2px solid #D4AF37", 
                      padding:"18px 36px", 
                      background:"linear-gradient\(135deg, #111, #1a0822\)", 
                      borderRadius: 8, 
                      marginBottom: 30, 
                      boxShadow:"0 10px 30px rgba\(212,175,55,0\.2\), inset 0 0 20px rgba\(212,175,55,0\.1\)",
                      position: "relative",
                      overflow: "hidden"
                  \}\}>
                     <div style=\{\{position:"absolute", inset:0, opacity:0\.1, background:"url\('data:image/svg\+xml;utf8,<svg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www\.w3\.org/2000/svg\\"><circle cx=\\"2\\" cy=\\"2\\" r=\\"1\\" fill=\\"%23D4AF37\\"/></svg>'\) repeat"\}\} />
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

new_revealed = '''                  <div style={{
                      position: "relative",
                      padding:"3px", 
                      background:"linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #A67C00 100%)", 
                      borderRadius: 16, 
                      marginBottom: 35, 
                      boxShadow:"0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.25)",
                      transform: "scale(1.05)"
                  }}>
                    <div style={{
                        background: "linear-gradient(135deg, #1A0B22 0%, #0d0412 100%)",
                        borderRadius: 14,
                        padding: "24px 45px",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                       <div style={{position:"absolute", inset:0, opacity:0.1, backgroundImage:"radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize:"12px 12px"}} />
                       <div style={{position:"absolute", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"conic-gradient(from 90deg at 50% 50%, rgba(212,175,55,0) 0%, rgba(212,175,55,0.1) 50%, rgba(212,175,55,0) 100%)", animation:"spin 10s linear infinite"}} />
                       
                       <p style={{fontSize: 9, letterSpacing: 5, color:"#F3E5AB", textTransform:"uppercase", marginBottom: 6, zIndex:2, position:"relative", opacity: 0.8}}>Discount Code</p>
                       <p style={{
                           fontSize: 38, 
                           fontWeight:900, 
                           margin:0, 
                           background: "linear-gradient(to bottom, #FFF 0%, #F3E5AB 50%, #D4AF37 100%)", 
                           WebkitBackgroundClip: "text", 
                           WebkitTextFillColor: "transparent",
                           letterSpacing: 10, 
                           filter: "drop-shadow(0 4px 15px rgba(212,175,55,0.5))",
                           position: "relative",
                           zIndex: 2,
                           fontFamily: "'Cinzel', serif"
                       }}>KHADLAJ10</p>
                    </div>
                  </div>

                  <button
                    onClick={()=>{
                      navigator.clipboard.writeText("KHADLAJ10");
                      setPopupDone(true);
                      setShowPopup(false);
                    }}
                    style={{
                       width:"100%",
                       background:"linear-gradient(90deg, #A67C00 0%, #F3E5AB 50%, #A67C00 100%)",
                       backgroundSize: "200% auto",
                       color:"#1A0B22",
                       border:"none",
                       padding:"18px",
                       fontSize:12,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all 0.5s ease",
                       borderRadius: 6,
                       boxShadow: "0 10px 30px rgba(212,175,55,0.4)"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundPosition="right center"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(212,175,55,0.6)";}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundPosition="left center"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(212,175,55,0.4)";}}
                  >Copy Code & Shop Now</button>'''

content = re.sub(old_revealed, new_revealed, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated revealed state design.")
