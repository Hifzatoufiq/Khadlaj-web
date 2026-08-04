import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop active state
desktop_old = r'''            \{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              const isActive = page===pg && !\["Best Sellers","Perfume Spray","Perfume Oil","Home & Ambience"\]\.includes\(label\);'''

desktop_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Contact","contact"]].map(([label,pg])=>{
              const isActive = (pg === "collections") ? 
                (label === "Best Sellers" && collectionCategory === "Best Sellers") ||
                (label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM") ||
                (label === "Perfume Oil" && collectionCategory === "Atyaab") :
                (page === pg);'''

content = re.sub(desktop_old, desktop_new, content)

# Fix mobile active state
mobile_old = r'''            \{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\(
              <div
                key=\{label\}
                className="mob-nav-link"
                onClick=\{\(\)=>\{
                  if\(label === "Best Sellers" \|\| label === "Perfume Spray" \|\| label === "Perfume Oil" \|\| label === "Master Perfumery"\) \{
                    setCollectionCategory\(label === "Perfume Spray" \? "EAU DE PARFUM" : label === "Perfume Oil" \? "Atyaab" : label\);
                  \} else if \(pg === "collections"\) \{
                    setCollectionCategory\("Khadlaj"\);
                  \}
                  setPage\(pg\);
                  setMobileMenuOpen\(false\);
                  window\.scrollTo\(0,0\);
                \}\}
                style=\{\{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2\.5,
                  textTransform:"uppercase",
                  color:"#251737",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                \}\}
              >
                \{label\}
                <span style=\{\{color:"#B8922A",fontSize:12\}\}>→</span>
              </div>
            \)\)\}'''

mobile_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>{
              const isActive = (pg === "collections") ? 
                (label === "Best Sellers" && collectionCategory === "Best Sellers") ||
                (label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM") ||
                (label === "Perfume Oil" && collectionCategory === "Atyaab") :
                (page === pg);
              return (
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
                  color: isActive ? "#B8922A" : "#251737",
                  fontWeight: isActive ? 700 : 500,
                  cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                {label}
                <span style={{color:isActive ? "#B8922A" : "rgba(37,23,55,0.4)",fontSize:12}}>→</span>
              </div>
            )})}'''

content = re.sub(mobile_old, mobile_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated active navigation states successfully.")
