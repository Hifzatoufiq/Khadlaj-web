import json
import urllib.request
import re

def get_bottle_img(images):
    if not images: return "https://via.placeholder.com/400"
    urls = [img['src'] for img in images]
    
    # 1. "still"
    for u in urls:
        if 'still' in u.lower(): return u
        
    # 2. "-2", "-3", "_2", "_3", "02", "03"
    for u in urls:
        if re.search(r'[-_](2|3)\.', u) or re.search(r'(02|03)\.', u):
            return u
            
    # 3. Fallback to index 1 (second image is often the bottle)
    if len(urls) > 1: return urls[1]
    
    # 4. Fallback to index 0
    return urls[0]

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
    title_to_img[p['title'].strip()] = get_bottle_img(p['images'])

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updated = 0
for title, img_url in title_to_img.items():
    escaped_title = re.escape(title)
    
    # We find the block for this product and replace its img
    # Pattern: "name": "TITLE", ... "img": "OLD_URL"
    pattern = r'(    "name": "' + escaped_title + r'",[^{}]*?    "img": )"[^"]*"'
    
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated images for {updated} products.")
