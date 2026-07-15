import urllib.request
import json
import re

url = "https://khadlaj-perfumes.com/products.json?limit=36"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

products = data.get('products', [])[32:36] # Get the next 4 products

new_products_js = []
for idx, p in enumerate(products):
    name = p['title'].replace('100 ML EDP SPRAY', '').replace('FOR WOMEN', '').replace('100 ML EDP', '').replace('SPRAY', '').strip().title()
    price = float(p['variants'][0]['price']) if p['variants'] else 100
    img = p['images'][0]['src'] if p['images'] else ''
    badge = 'Best Seller' # Forced to be Best Seller
    gender = 'Her' if 'WOMEN' in p['title'].upper() else 'Unisex'
    
    prod_str = f'  {{ id: 800{idx}, name: "{name}", col: "Perfume Spray", price: {price}, size: "100ml EDP", badge: "{badge}", gender: "{gender}", notes: ["Cedarwood", "Jasmine", "Amber"], img: "{img}" }},'
    new_products_js.append(prod_str)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    jsx_code = f.read()

# Insert after existing products
match = re.search(r'(const PRODUCTS = \[[\s\S]*?)(\n\];)', jsx_code)
if match:
    inserted_code = match.group(1) + '\n' + '\n'.join(new_products_js) + match.group(2)
    jsx_code = jsx_code[:match.start()] + inserted_code + jsx_code[match.end():]
    
    with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(jsx_code)
    print(f"Added {len(new_products_js)} Best Seller products successfully!")
else:
    print("Could not find PRODUCTS array.")
