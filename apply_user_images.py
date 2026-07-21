import re
import urllib.request
import json

# Fetch original Khadlaj data to grab Nafais Sharq if it was completely deleted.
# Actually, I can just build the Nafais Sharq block from Khadlaj CDN data.
url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1) as response:
    data1 = json.loads(response.read().decode())
all_prods = data1['products']

nafais = None
for p in all_prods:
    if 'NAFAIS SHARQ GIFT SET' in p['title'].upper():
        nafais = p
        break

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Map product names to their exact perfect images
mapping = {
    "KHADLAJ ISLAND GIFT SET FOR HIM & HER": "./assets/images/gifsets/island_nobox.png",
    "KHADLAJ CLOUD CANDY GIFT SET": "./assets/images/gifsets/cloud_candy_nobox.png",
    "CREAM VELVET GIFT SET": "./assets/images/gifsets/cream_velvet_nobox.png",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": "./assets/images/gifsets/gourmand_nobox.png"
}

# 1. Update the existing 4
for title, new_img in mapping.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)
    
    # Also update detailImages
    pattern_detail = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "detailImages": )\[.*?\]'
    code = re.sub(pattern_detail, r'\g<1>["' + new_img + r'"]', code, count=1, flags=re.IGNORECASE|re.DOTALL)

# 2. Inject Nafais Sharq if it's missing (it was deleted by my earlier script)
if 'NAFAIS SHARQ GIFT SET' not in code:
    nafais_block = f"""  {{
    "id": "{nafais['id']}",
    "name": "KHADLAJ PERFUMES NAFAIS SHARQ GIFT SET FOR WOMEN",
    "price": {float(nafais['variants'][0]['price']) if nafais['variants'] else 50},
    "size": "Gift Set",
    "badge": "{'Sold Out' if not nafais['variants'] or not nafais['variants'][0]['available'] else ''}",
    "col": "Gift Sets",
    "gender": "Her",
    "topNotes": [],
    "midNotes": [],
    "baseNotes": [],
    "img": "./assets/images/gifsets/nafais_sharq_nobox.png",
    "detailImages": ["./assets/images/gifsets/nafais_sharq_nobox.png"]
  }},
"""
    # Insert at the beginning of the PRODUCTS array
    code = code.replace('const PRODUCTS = [\n', 'const PRODUCTS = [\n' + nafais_block)
else:
    # It might be in the code under a slightly different name? If so, update it.
    pass

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated existing 4 gift sets with user images and injected Nafais Sharq.")
