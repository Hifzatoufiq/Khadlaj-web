import json
import urllib.request
import re

url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1) as response:
    data = json.loads(response.read().decode())

url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2) as response:
    data['products'].extend(json.loads(response.read().decode())['products'])

gift_sets_map = {}
for p in data['products']:
    t = p['title'].upper()
    if "GIFT SET" in t or "3 PCS" in t or "3 PIECES" in t or "DISCOVERY" in t or "4 PCS" in t or "MUKHALAT PERFUME OILS" in t:
        if len(p['images']) > 0:
            # Use the very first image (which ALWAYS shows the full box!)
            gift_sets_map[p['title']] = p['images'][0]['src']

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updated = 0
for title, new_img in gift_sets_map.items():
    clean_title = title
    if "CREAM" in title: clean_title = "CREAM VELVET GIFT SET"
    elif "NAFAIS" in title: clean_title = "NAFAIS SHARQ GIFT SET"
    elif "ISLAND" in title: clean_title = "ISLAND GIFT SET FOR HIM & HER"
    elif "HUROOF" in title: clean_title = "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET"
    elif "GRAND" in title: clean_title = "GRAND COLLECTION 3 PIECES GIFT SET"
    
    pattern = r'(    "name": "' + re.escape(clean_title) + r'",[^{}]*?    "img": )"[^"]*"'
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1
        print("Restored FULL BOX for Gift Set:", clean_title)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated {updated} gift sets to display their full box.")
