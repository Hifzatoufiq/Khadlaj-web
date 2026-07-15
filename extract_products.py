import json
import re

with open(r'C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\.system_generated\steps\3696\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('{')
end = content.rfind('}') + 1
data = json.loads(content[start:end])
products = data.get('products', [])

new_products_js = []
for idx, p in enumerate(products):
    name = p['title'].replace('100 ML EDP SPRAY', '').replace('FOR WOMEN', '').replace('100 ML EDP', '').strip().title()
    price = float(p['variants'][0]['price']) if p['variants'] else 100
    img = p['images'][0]['src'] if p['images'] else ''
    badge = 'New' if idx % 2 == 0 else 'Best Seller'
    gender = 'Her' if 'WOMEN' in p['title'] else 'Unisex'
    
    prod_str = f'  {{ id: 100{idx}, name: "{name}", col: "Perfume Spray", price: {price}, size: "100ml EDP", badge: "{badge}", gender: "{gender}", notes: ["Bergamot", "Musk", "Oud"], img: "{img}" }},'
    new_products_js.append(prod_str)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    jsx_code = f.read()

# Insert after existing products
# find end of PRODUCTS array
match = re.search(r'(const PRODUCTS = \[[\s\S]*?)(\n\];)', jsx_code)
if match:
    inserted_code = match.group(1) + '\n' + '\n'.join(new_products_js) + match.group(2)
    jsx_code = jsx_code[:match.start()] + inserted_code + jsx_code[match.end():]
    
    with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(jsx_code)
    print(f"Added {len(new_products_js)} products successfully!")
else:
    print("Could not find PRODUCTS array.")
