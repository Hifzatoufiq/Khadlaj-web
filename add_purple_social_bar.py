with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Target the footer copyright div and insert the purple social bar right above it
old_target = """      <div style={{background:"#fff",borderTop:"1px solid #E8E4DC",padding:"20px 5%",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:9,color:"#888",letterSpacing:1.5,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>"""

new_target = """      {/* Purple Social Bar */}
      <div style={{background:"#4C396B", padding:"18px 5%", display:"flex", justifyContent:"center", alignItems:"center", gap:14, borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        {[
          { name: "facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", fill: "none" },
          { name: "twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", fill: "currentColor" },
          { name: "instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A5 5 0 0122.5 12v0a5 5 0 01-5 5h-11a5 5 0 01-5-5v0a5 5 0 015-5z", fill: "none" },
          { name: "linkedin", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z", fill: "currentColor" },
          { name: "youtube", path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z", fill: "currentColor", hasDot: true }
        ].map(social => (
          <a key={social.name} href="#" style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#000",
            color: "#fff",
            textDecoration: "none",
            transition: "transform 0.2s, background 0.2s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#000";
            e.currentTarget.style.color = "#fff";
          }}
          >
            {social.hasDot && (
              <span style={{
                position: "absolute",
                top: 0,
                right: "9px",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#FF3B30",
                zIndex: 10
              }}/>
            )}
            <svg width="15" height="15" viewBox="0 0 24 24" fill={social.fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={social.path}/>
            </svg>
          </a>
        ))}
      </div>

      <div style={{background:"#fff",borderTop:"1px solid #E8E4DC",padding:"20px 5%",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:9,color:"#888",letterSpacing:1.5,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>"""

if old_target in content:
    content = content.replace(old_target, new_target)
    print("Successfully added the purple social bar!")
else:
    print("Could not find the target div in footer.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
