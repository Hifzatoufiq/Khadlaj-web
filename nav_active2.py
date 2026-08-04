import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop active state
desktop_old = r'''            \{\[\["Home","home"\],\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              const isActive = \(pg === "collections"\) \? 
                \(label === "Best Sellers" && collectionCategory === "Best Sellers"\) \|\|
                \(label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM"\) \|\|
                \(label === "Perfume Oil" && collectionCategory === "Atyaab"\) :
                \(pg === "home" \? \(label === "Home" && page === "home"\) : page === pg\);'''

desktop_new = '''            {[["Home","home"],["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Contact","contact"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections") {
                  if (label === "Best Sellers") isActive = (collectionCategory === "Best Sellers");
                  else if (label === "Perfume Spray") isActive = (collectionCategory === "EAU DE PARFUM");
                  else if (label === "Perfume Oil") isActive = (collectionCategory === "Atyaab");
                } else if (pg === "home") {
                  isActive = (label === "Home");
                } else {
                  isActive = true;
                }
              }'''

content = re.sub(desktop_old, desktop_new, content)

# Fix mobile active state
mobile_old = r'''            \{\[\["Home","home"\],\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              const isActive = \(pg === "collections"\) \? 
                \(label === "Best Sellers" && collectionCategory === "Best Sellers"\) \|\|
                \(label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM"\) \|\|
                \(label === "Perfume Oil" && collectionCategory === "Atyaab"\) :
                \(pg === "home" \? \(label === "Home" && page === "home"\) : page === pg\);'''

mobile_new = '''            {[["Home","home"],["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections") {
                  if (label === "Best Sellers") isActive = (collectionCategory === "Best Sellers");
                  else if (label === "Perfume Spray") isActive = (collectionCategory === "EAU DE PARFUM");
                  else if (label === "Perfume Oil") isActive = (collectionCategory === "Atyaab");
                } else if (pg === "home") {
                  isActive = (label === "Home");
                } else {
                  isActive = true;
                }
              }'''

content = re.sub(mobile_old, mobile_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated active navigation states logic successfully.")
