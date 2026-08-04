import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop active state and remove Home
desktop_old = r'''            \{\[\["Home","home"\],\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              let isActive = false;
              if \(page === pg\) \{
                if \(pg === "collections"\) \{
                  if \(label === "Best Sellers"\) isActive = \(collectionCategory === "Best Sellers"\);
                  else if \(label === "Perfume Spray"\) isActive = \(collectionCategory === "EAU DE PARFUM"\);
                  else if \(label === "Perfume Oil"\) isActive = \(collectionCategory === "Atyaab"\);
                \} else if \(pg === "home"\) \{
                  isActive = \(label === "Home"\);
                \} else \{
                  isActive = true;
                \}
              \}'''

desktop_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Contact","contact"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections" || pg === "home") {
                  isActive = false;
                } else {
                  isActive = true;
                }
              }'''

content = re.sub(desktop_old, desktop_new, content)

# Fix mobile active state and remove Home
mobile_old = r'''            \{\[\["Home","home"\],\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              let isActive = false;
              if \(page === pg\) \{
                if \(pg === "collections"\) \{
                  if \(label === "Best Sellers"\) isActive = \(collectionCategory === "Best Sellers"\);
                  else if \(label === "Perfume Spray"\) isActive = \(collectionCategory === "EAU DE PARFUM"\);
                  else if \(label === "Perfume Oil"\) isActive = \(collectionCategory === "Atyaab"\);
                \} else if \(pg === "home"\) \{
                  isActive = \(label === "Home"\);
                \} else \{
                  isActive = true;
                \}
              \}'''

mobile_new = '''            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections" || pg === "home") {
                  isActive = false;
                } else {
                  isActive = true;
                }
              }'''

content = re.sub(mobile_old, mobile_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed Home link and disabled highlighting for collections successfully.")
