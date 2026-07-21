import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Desktop old (VIP)
desktop_old = r'''            \{\[
              \{label: "Best Sellers", pg: "collections", filter: "Best Sellers"\},
              \{label: "Master Perfumery", pg: "collections", filter: "Master Perfumery"\},
              \{label: "Eaux De Parfum", pg: "collections", filter: "EAU DE PARFUM"\},
              \{label: "Precious Oils", pg: "collections", filter: "Atyaab"\},
              \{label: "Home & Ambience", pg: "home"\},
              \{label: "La Fede", pg: "lafede"\},
              \{label: "Gifting", pg: "gifts"\},
              \{label: "Heritage", pg: "story"\},
              \{label: "Concierge", pg: "contact"\}
            \]\.map\(\(\{label, pg, filter, badge\}\) => \{
              const isActive = page===pg && !\["Best Sellers","Master Perfumery","EAU DE PARFUM","Atyaab"\]\.includes\(filter\);
              return \(
                <span key=\{label\} onClick=\{\(\) => \{
                  if\(filter\) \{
                    setCollectionCategory\(filter\);
                    setPage\("collections"\);
                  \} else \{
                    setPage\(pg\);
                  \}
                  window\.scrollTo\(0,0\);
                \}\} className=\{`nav-link \$\{isActive \? 'active' : ''\}`\} style=\{\{position:"relative"\}\}>
                  \{label\}
                  \{badge && <span style=\{\{position:"absolute", top:"-10px", right:"-18px", background:"#B8922A", color:"#fff", fontSize:"7px", padding:"2px 5px", borderRadius:"2px", letterSpacing:"1px", animation:"pulse 2s infinite"\}\}>\{badge\}</span>\}
                </span>
              \);
            \}\)\}'''

# Desktop new (Original)
desktop_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Contact","contact"]].map(([label,pg])=>{
              const isActive = page===pg && !["Best Sellers","Perfume Spray","Perfume Oil","Home & Ambience"].includes(label);
              return (
                <span key={label} onClick={() => {
                  if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                    setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Atyaab" : label);
                  } else if (pg === "collections") {
                    setCollectionCategory("Khadlaj");
                  }
                  setPage(pg);
                  window.scrollTo(0,0);
                }} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {label}
                </span>
              );
            })}'''

content = re.sub(desktop_old, desktop_new, content)

# Mobile old (VIP)
mobile_old = r'''            \{\[
              \{label: "Best Sellers", pg: "collections", filter: "Best Sellers"\},
              \{label: "Master Perfumery", pg: "collections", filter: "Master Perfumery"\},
              \{label: "Eaux De Parfum", pg: "collections", filter: "EAU DE PARFUM"\},
              \{label: "Precious Oils", pg: "collections", filter: "Atyaab"\},
              \{label: "Home & Ambience", pg: "home"\},
              \{label: "Gifting", pg: "gifts"\},
              \{label: "La Fede", pg: "lafede"\},
              \{label: "Heritage", pg: "story"\},
              \{label: "VIP Circle", pg: "signup"\},
              \{label: "Concierge", pg: "contact"\}
            \]\.map\(\(\{label, pg, filter, badge\}\) => \(
              <div
                key=\{label\}
                className="mob-nav-link"
                onClick=\{\(\)=>\{
                  if\(filter\) \{
                    setCollectionCategory\(filter\);
                    setPage\("collections"\);
                  \} else \{
                    setPage\(pg\);
                  \}
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
                <div>
                  \{label\}
                  \{badge && <span style=\{\{marginLeft: 8, background:"#B8922A", color:"#fff", fontSize:"8px", padding:"2px 6px", borderRadius:"2px", letterSpacing:"1px", verticalAlign:"middle"\}\}>\{badge\}</span>\}
                </div>
                <span style=\{\{color:"#B8922A",fontSize:12\}\}>→</span>
              </div>
            \)\)\}'''

mobile_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>(
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
            ))}'''

content = re.sub(mobile_old, mobile_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar successfully reverted.")
