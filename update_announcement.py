import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace announcement bar
announcement_old = r'<div style=\{\{background:"#251737",color:"#fff",textAlign:"center",padding:"14px 16px",fontSize:"12px",letterSpacing:"4px",fontFamily:"\'DM Sans\',sans-serif",textTransform:"uppercase",fontWeight:500\}\}>\s*USE "KHADLAJ25" FOR FLAT 25% DISCOUNT\s*</div>'

announcement_new = r'''<div style={{
          background: "linear-gradient(90deg, #100a18, #251737, #100a18)",
          color: "#E8E4DC",
          textAlign: "center",
          padding: "10px 16px",
          fontSize: "10.5px",
          letterSpacing: "4px",
          fontFamily: "'Montserrat', sans-serif",
          textTransform: "uppercase",
          fontWeight: 500,
          borderBottom: "1px solid rgba(184, 146, 42, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}>
          <span style={{color: "#B8922A", fontSize: "14px"}}>✦</span>
          <span>COMPLIMENTARY SHIPPING ON ORDERS OVER 300 AED | USE <strong style={{color:"#B8922A", fontWeight:600}}>"KHADLAJ25"</strong> FOR 25% OFF</span>
          <span style={{color: "#B8922A", fontSize: "14px"}}>✦</span>
        </div>'''

content = re.sub(announcement_old, announcement_new, content)

# Remove VIP badge from desktop and mobile nav
content = content.replace('{label: "Master Perfumery", pg: "collections", filter: "Master Perfumery", badge: "VIP"}', '{label: "Master Perfumery", pg: "collections", filter: "Master Perfumery"}')

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Changes applied!")
