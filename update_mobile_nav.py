import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

mobile_nav_old = r'\{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\(\s*<div\s*key=\{label\}\s*className="mob-nav-link"\s*onClick=\{[^}]*\}\s*style=\{[^}]*\}\s*>\s*\{label\}\s*<span style=\{\{color:"#B8922A",fontSize:12\}\}>→</span>\s*</div>\s*\)\)\} '
# Wait, this regex is getting complicated and error prone. Let me just replace the exact string I saw in the file.

target = """            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>(
              <div
                key={label}
                className="mob-nav-link"
                onClick={()=>{
                  if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                    setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Atyaab" : label);
                  } else if (pg === "collections") {
                    setCollectionCategory("Khadlaj");
                  }
                  setPage(pg);
                  setMobileMenuOpen(false);
                  window.scrollTo(0,0);
                }}
                style={{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2.5,
                  textTransform:"uppercase",
                  color:"#251737",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                {label}
                <span style={{color:"#B8922A",fontSize:12}}>→</span>
              </div>
            ))}"""

replacement = """            {[
              {label: "Best Sellers", pg: "collections", filter: "Best Sellers"},
              {label: "Master Perfumery", pg: "collections", filter: "Master Perfumery", badge: "VIP"},
              {label: "Eaux De Parfum", pg: "collections", filter: "EAU DE PARFUM"},
              {label: "Precious Oils", pg: "collections", filter: "Atyaab"},
              {label: "Home & Ambience", pg: "home"},
              {label: "Gifting", pg: "gifts"},
              {label: "La Fede", pg: "lafede"},
              {label: "Heritage", pg: "story"},
              {label: "VIP Circle", pg: "signup"},
              {label: "Concierge", pg: "contact"}
            ].map(({label, pg, filter, badge}) => (
              <div
                key={label}
                className="mob-nav-link"
                onClick={()=>{
                  if(filter) {
                    setCollectionCategory(filter);
                    setPage("collections");
                  } else {
                    setPage(pg);
                  }
                  setMobileMenuOpen(false);
                  window.scrollTo(0,0);
                }}
                style={{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2.5,
                  textTransform:"uppercase",
                  color:"#251737",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                <div>
                  {label}
                  {badge && <span style={{marginLeft: 8, background:"#B8922A", color:"#fff", fontSize:"8px", padding:"2px 6px", borderRadius:"2px", letterSpacing:"1px", verticalAlign:"middle"}}>{badge}</span>}
                </div>
                <span style={{color:"#B8922A",fontSize:12}}>→</span>
              </div>
            ))}"""

if target in content:
    content = content.replace(target, replacement)
    with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Mobile navbar updated successfully.")
else:
    print("Could not find target block for mobile navbar.")
