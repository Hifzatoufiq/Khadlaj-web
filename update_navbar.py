import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

desktop_nav_old = r'\{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>'
desktop_nav_new = r'''{[
              {label: "Best Sellers", pg: "collections", filter: "Best Sellers"},
              {label: "Master Perfumery", pg: "collections", filter: "Master Perfumery", badge: "VIP"},
              {label: "Eaux De Parfum", pg: "collections", filter: "EAU DE PARFUM"},
              {label: "Precious Oils", pg: "collections", filter: "Atyaab"},
              {label: "Home & Ambience", pg: "home"},
              {label: "La Fede", pg: "lafede"},
              {label: "Gifting", pg: "gifts"},
              {label: "Heritage", pg: "story"},
              {label: "Concierge", pg: "contact"}
            ].map(({label, pg, filter, badge}) => {
              const isActive = page===pg && !["Best Sellers","Master Perfumery","EAU DE PARFUM","Atyaab"].includes(filter);
              return (
                <span key={label} onClick={() => {
                  if(filter) {
                    setCollectionCategory(filter);
                    setPage("collections");
                  } else {
                    setPage(pg);
                  }
                  window.scrollTo(0,0);
                }} className={`nav-link ${isActive ? 'active' : ''}`} style={{position:"relative"}}>
                  {label}
                  {badge && <span style={{position:"absolute", top:"-10px", right:"-18px", background:"#B8922A", color:"#fff", fontSize:"7px", padding:"2px 5px", borderRadius:"2px", letterSpacing:"1px", animation:"pulse 2s infinite"}}>{badge}</span>}
                </span>
              );
            })}'''

mobile_nav_old = r'\{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>'
mobile_nav_new = r'''{[
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
                style={{position:"relative", display:"inline-block"}}
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
              >
                {label}
                {badge && <span style={{marginLeft: 8, background:"#B8922A", color:"#fff", fontSize:"8px", padding:"2px 6px", borderRadius:"2px", letterSpacing:"1px", verticalAlign:"middle"}}>{badge}</span>}
              </div>
            ))}'''

# We need to replace the exact blocks. 
# For desktop, it's lines 7217-7232. I will use regex to find the map block and replace it.

content = re.sub(
    r'\{\[\["Best Sellers".*?\}\)\}',
    desktop_nav_new,
    content,
    count=1,
    flags=re.DOTALL
)

# For mobile, it's lines 7246-7264
content = re.sub(
    r'\{\[\["Best Sellers".*?\}\)\}',
    mobile_nav_new,
    content,
    count=1,
    flags=re.DOTALL
)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar updated.")
