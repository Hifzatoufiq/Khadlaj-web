import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop navbar array and logic
desktop_old = r'''            \{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              const isActive = \(pg === "collections"\) \? 
                \(label === "Best Sellers" && collectionCategory === "Best Sellers"\) \|\|
                \(label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM"\) \|\|
                \(label === "Perfume Oil" && collectionCategory === "Atyaab"\) :
                \(page === pg\);'''

desktop_new = '''            {[["Home","home"],["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Contact","contact"]].map(([label,pg])=>{
              const isActive = (pg === "collections") ? 
                (label === "Best Sellers" && collectionCategory === "Best Sellers") ||
                (label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM") ||
                (label === "Perfume Oil" && collectionCategory === "Atyaab") :
                (pg === "home" ? (label === "Home" && page === "home") : page === pg);'''

content = re.sub(desktop_old, desktop_new, content)

# Fix mobile navbar array and logic
mobile_old = r'''            \{\[\["Best Sellers","collections"\],\["Perfume Spray","collections"\],\["Perfume Oil","collections"\],\["Home & Ambience","home"\],\["La Fede","lafede"\],\["Gifts","gifts"\],\["Our legacy","story"\],\["Sign Up","signup"\],\["Contact","contact"\]\]\.map\(\(\[label,pg\]\)=>\{
              const isActive = \(pg === "collections"\) \? 
                \(label === "Best Sellers" && collectionCategory === "Best Sellers"\) \|\|
                \(label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM"\) \|\|
                \(label === "Perfume Oil" && collectionCategory === "Atyaab"\) :
                \(page === pg\);'''

mobile_new = '''            {[["Home","home"],["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gifts","gifts"],["Our legacy","story"],["Sign Up","signup"],["Contact","contact"]].map(([label,pg])=>{
              const isActive = (pg === "collections") ? 
                (label === "Best Sellers" && collectionCategory === "Best Sellers") ||
                (label === "Perfume Spray" && collectionCategory === "EAU DE PARFUM") ||
                (label === "Perfume Oil" && collectionCategory === "Atyaab") :
                (pg === "home" ? (label === "Home" && page === "home") : page === pg);'''

content = re.sub(mobile_old, mobile_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added Home link and fixed active logic successfully.")
