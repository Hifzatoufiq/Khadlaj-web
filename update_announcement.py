with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

old_announcement = """      {/* ── Announcement bar ── */}
      <div style={{background:"#000",color:"#fff",textAlign:"center",padding:"10px 16px",fontSize:"9px",letterSpacing:"3px",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",fontWeight:500}}>
        <span style={{color:"#B8922A",marginRight:6}}>★</span>
        FREE SHIPPING ON ORDERS OVER AED 300
        <span style={{color:"#B8922A",marginLeft:6}}>★</span>
      </div>"""

new_announcement = """      {/* ── Announcement bar ── */}
      <div style={{background:"#000",color:"#fff",textAlign:"center",padding:"10px 16px",fontSize:"9px",letterSpacing:"3px",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",fontWeight:500}}>
        USE "KHADLAJ25" FOR FLAT 25% DISCOUNT
      </div>"""

if old_announcement in content:
    content = content.replace(old_announcement, new_announcement)
    print("Successfully replaced the announcement bar text!")
else:
    print("Could not find the target announcement bar HTML.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
