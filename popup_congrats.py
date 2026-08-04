import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_jsx = r'''              \) : \(
                <div className="glow-up" style=\{\{textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center"\}\}>
                  <div style=\{\{width:22,height:1,background:"#D4AF37",marginBottom:16\}\}/>
                  <h3 className="disp mobile-text" style=\{\{fontSize:28,fontWeight:400,color:"#D4AF37",marginBottom:12,lineHeight:1\.15\}\}>Congratulations!</h3>
                  <p style=\{\{fontSize:11,color:"rgba\(249,244,235,0\.7\)",lineHeight:1\.6,fontFamily:"'Montserrat',sans-serif",marginBottom:30\}\}>Your 10% discount has been unlocked\. Apply this code at checkout\.</p>
                  
                  <div style=\{\{border:"1px solid rgba\(212,175,55,0\.4\)", padding:"14px 28px", background:"rgba\(212,175,55,0\.05\)", borderRadius:4, marginBottom: 24, boxShadow:"inset 0 0 20px rgba\(0,0,0,0\.5\)"\}\}>
                     <p style=\{\{fontSize: 26, fontWeight:700, color:"#F9F4EB", letterSpacing: 5, margin:0, textShadow:"0 2px 10px rgba\(255,255,255,0\.1\)"\}\}>KHADLAJ10</p>
                  </div>

                  <button
                    onClick=\{\(\)=>\{
                      navigator\.clipboard\.writeText\("KHADLAJ10"\);
                      setPopupDone\(true\);
                      setShowPopup\(false\);
                    \}\}
                    style=\{\{width:"100%",background:"#D4AF37",color:"#1A0B22",border:"none",padding:"16px",fontSize:10,letterSpacing:2\.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700,transition:"all \.3s",borderRadius:2\}\}
                    onMouseEnter=\{e=>\{e\.currentTarget\.style\.background="#F9F4EB"; e\.currentTarget\.style\.boxShadow="0 4px 15px rgba\(212,175,55,0\.4\)";\}\}
                    onMouseLeave=\{e=>\{e\.currentTarget\.style\.background="#D4AF37"; e\.currentTarget\.style\.boxShadow="none";\}\}
                  >Copy Code & Shop Now</button>
                </div>
              \)'''

new_jsx = '''              ) : (
                <div className="glow-up" style={{textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <div style={{width:22,height:1,background:"#D4AF37",marginBottom:12}}/>
                  <p style={{fontSize:9,letterSpacing:4,color:"#D4AF37",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:10, fontWeight:600}}>Reward Claimed</p>
                  <h3 className="disp mobile-text" style={{fontSize:26,fontWeight:400,color:"#F9F4EB",marginBottom:12,lineHeight:1.15}}>VIP Privilege Unlocked</h3>
                  <p style={{fontSize:11,color:"rgba(249,244,235,0.7)",lineHeight:1.6,fontFamily:"'Montserrat',sans-serif",marginBottom:30}}>Your exclusive 10% discount is ready. Apply this code at checkout.</p>
                  
                  <div style={{
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
                  >Copy Code & Shop Now</button>
                </div>
              )'''

content = re.sub(old_jsx, new_jsx, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Congratulations state design successfully.")
