import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

new_popup = """
      {/* ── Newsletter Popup ── */}
      {showPopup && !popupDone && (
        <div
          style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",backdropFilter:"blur(5px)",WebkitBackdropFilter:"blur(5px)"}}
          onClick={()=>setShowPopup(false)}
        >
          <div
            className="popup-in"
            onClick={e=>e.stopPropagation()}
            style={{
              background:"#fff",maxWidth:640,width:"100%",
              display:"flex",
              overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.4)",
              position:"relative", borderRadius:2
            }}
          >
            <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.8)",border:"none",width:32,height:32,borderRadius:"50%",fontSize:20,cursor:"pointer",color:"#000",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>×</button>
            {/* Left image */}
            <div style={{flex:1, position:"relative",minHeight:420,overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", background:"#FAFAFA"}}>
              <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            {/* Right form */}
            <div style={{flex:1.2, padding:"48px 36px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{width:24,height:1,background:"#B8922A",marginBottom:20}}/>
              <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16, fontWeight:600}}>Welcome</p>
              <h3 className="disp" style={{fontSize:30,fontWeight:300,color:"#111",marginBottom:12,lineHeight:1.15}}>Join the Khadlaj Circle</h3>
              <p style={{fontSize:12,color:"#777",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginBottom:28}}>Subscribe to receive <strong style={{color:"#111",fontWeight:600}}>10% off</strong> your first order and exclusive access to new launches.</p>
              
              <div style={{position:"relative", marginBottom:20}}>
                <input type="email" placeholder="Your email address" value={popupEmail} onChange={e=>setPopupEmail(e.target.value)}
                  style={{width:"100%",border:"1px solid #E8E4DC",padding:"14px 16px",fontSize:11,outline:"none",fontFamily:"'Montserrat',sans-serif",background:"#FAFAFA", letterSpacing:1, transition:"border-color 0.3s"}}
                  onFocus={e=>e.currentTarget.style.borderColor="#111"}
                  onBlur={e=>e.currentTarget.style.borderColor="#E8E4DC"}
                />
              </div>
              
              <button
                onClick={()=>{setPopupDone(true);setShowPopup(false);}}
                style={{width:"100%",background:"#111",color:"#fff",border:"none",padding:"16px",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,transition:"background .3s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#111"}
              >Unlock 10% Off</button>
              
              <button onClick={()=>setShowPopup(false)} style={{background:"none", border:"none", fontSize:9, letterSpacing:2, color:"#aaa", textTransform:"uppercase", textAlign:"center", marginTop:16, cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderBottom:"1px solid transparent", transition:"all 0.3s", paddingBottom:2}}
                onMouseEnter={e=>{e.currentTarget.style.color="#111"; e.currentTarget.style.borderBottomColor="#111";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#aaa"; e.currentTarget.style.borderBottomColor="transparent";}}
              >No thanks</button>
            </div>
          </div>
        </div>
      )}
"""

pattern = re.compile(r'\{\/\* ── Newsletter Popup ── \*\/\}.*?(?=\{\/\* ── Newsletter Popup ── \*\/\})?', re.DOTALL)
# Actually, the file has no other tag after the popup block. It's at the end of the return statement before the closing div.
# So I should use the exact string replacement to be safe.

old_popup = """      {/* ── Newsletter Popup ── */}
      {showPopup && !popupDone && (
        <div
          style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}
          onClick={()=>setShowPopup(false)}
        >
          <div
            className="popup-in"
            onClick={e=>e.stopPropagation()}
            style={{
              background:"#fff",maxWidth:520,width:"100%",
              display:"grid",gridTemplateColumns:"1fr 1fr",
              overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.3)",
              position:"relative",
            }}
          >
            <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:14,right:14,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#000",zIndex:1,lineHeight:1,fontWeight:300}}>×</button>
            {/* Left image */}
            <div style={{position:"relative",minHeight:340,overflow:"hidden"}}>
              <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:24}}>
                <p className="shimmer-text" style={{fontSize:30,fontFamily:"'Cinzel',serif",fontWeight:300,lineHeight:1.1}}>10% Off<br/>First Order</p>
              </div>
            </div>
            {/* Right form */}
            <div style={{padding:"40px 28px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{width:28,height:1,background:"#B8922A",marginBottom:16}}/>
              <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Welcome</p>
              <h3 className="disp" style={{fontSize:24,fontWeight:300,color:"#000",marginBottom:10,lineHeight:1.15,letterSpacing:-.5}}>Join the Khadlaj Circle</h3>
              <p style={{fontSize:12,color:"#888",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginBottom:24}}>Subscribe &amp; get <strong style={{color:"#000"}}>10% off</strong> your first order plus early access to new launches.</p>
              <input type="email" placeholder="Your email address" value={popupEmail} onChange={e=>setPopupEmail(e.target.value)}
                style={{width:"100%",border:"none",borderBottom:"1px solid #000",padding:"10px 0",fontSize:13,outline:"none",fontFamily:"'Montserrat',sans-serif",marginBottom:16,background:"transparent"}}/>
              <button
                onClick={()=>{setPopupDone(true);setShowPopup(false);}}
                style={{width:"100%",background:"#000",color:"#fff",border:"none",padding:"14px",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#000"}
              >Claim 10% Off</button>
              <p onClick={()=>setShowPopup(false)} style={{fontSize:11,color:"#bbb",textAlign:"center",marginTop:12,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",textDecoration:"underline"}}>No thanks</p>
            </div>
          </div>
        </div>
      )}"""

content = content.replace(old_popup, new_popup.strip())

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
