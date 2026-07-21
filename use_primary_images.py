import json
import urllib.request
import re

def fetch_all():
    products = []
    for page in [1, 2]:
        url = f"https://khadlaj-perfumes.com/products.json?limit=250&page={page}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            products.extend(data['products'])
    return products

print("Fetching products...")
products_data = fetch_all()
print(f"Fetched {len(products_data)} products.")

title_to_img = {}
for p in products_data:
    if p['images']:
        title_to_img[p['title'].strip()] = p['images'][0]['src'] # Always use the primary white background image

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updated = 0
for title, img_url in title_to_img.items():
    escaped_title = re.escape(title)
    
    # We find the block for this product and replace its img
    pattern = r'(    "name": "' + escaped_title + r'",[^{}]*?    "img": )"[^"]*"'
    
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated images for {updated} products to primary white background image.")
