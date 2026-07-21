import urllib.request
import json
import re

url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1) as response:
    data1 = json.loads(response.read().decode())

url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2) as response:
    data2 = json.loads(response.read().decode())

all_prods = data1['products'] + data2['products']

# The exactly 4 target products
targets = [
    "ISLAND GIFT SET FOR HIM & HER",
    "KHADLAJ CLOUD CANDY GIFT SET",
    "CREAM VELVET GIFT SET",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET"
]

images_map = {
    "ISLAND GIFT SET FOR HIM & HER": "Island2.jpg",
    "KHADLAJ CLOUD CANDY GIFT SET": "CloudCandy3.jpg",
    "CREAM VELVET GIFT SET": "CreamVelvet-2.jpg",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": "TheGourmandCollection-2"
}

detail_images_map = {
    "ISLAND GIFT SET FOR HIM & HER": ["https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643"],
    "KHADLAJ CLOUD CANDY GIFT SET": ["https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755"],
    "CREAM VELVET GIFT SET": ["https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg?v=1779352384"],
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": ["https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-2_52a94bd5-b24f-4e19-a2c3-4011791f16dc.jpg?v=1776147258"]
}

# Find their data
found = []
for p in all_prods:
    t = p['title'].upper()
    for target in targets:
        if target in t:
            # find main img
            main_img = p['images'][0]['src']
            for img in p['images']:
                if images_map[target] in img['src']:
                    main_img = img['src']
            
            # format as our object
            obj = {
                "id": str(p['id']),
                "name": p['title'],
                "price": float(p['variants'][0]['price']) if p['variants'] else 50,
                "size": "Gift Set",
                "badge": "Sold Out" if not p['variants'] or not p['variants'][0]['available'] else "",
                "col": "Gift Sets",
                "gender": "Unisex",
                "topNotes": [],
                "midNotes": [],
                "baseNotes": [],
                "img": main_img,
                "detailImages": detail_images_map[target]
            }
            if target == "CREAM VELVET GIFT SET": obj['name'] = "CREAM VELVET GIFT SET"
            elif target == "KHADLAJ CLOUD CANDY GIFT SET": obj['name'] = "KHADLAJ CLOUD CANDY GIFT SET"
            elif "ISLAND" in target: obj['name'] = "KHADLAJ ISLAND GIFT SET FOR HIM & HER"
            
            found.append(obj)
            break

# Now read codebase
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace ANY product block that has "size": "Gift Set" with empty string.
# A block is roughly { ... "size": "Gift Set", ... },
import re

# We will use regex to find blocks with "size": "Gift Set" and remove them
# But regex with nested braces is hard.
# So instead, let's parse line by line
lines = code.split('\n')
out_lines = []
i = 0
in_products_array = False
while i < len(lines):
    line = lines[i]
    if line.startswith('const PRODUCTS = ['):
        in_products_array = True
        out_lines.append(line)
        # inject our found gift sets right here!
        for obj in found:
            out_lines.append("  {")
            out_lines.append(f'    "id": "{obj["id"]}",')
            out_lines.append(f'    "name": "{obj["name"]}",')
            out_lines.append(f'    "price": {obj["price"]},')
            out_lines.append(f'    "size": "Gift Set",')
            out_lines.append(f'    "badge": "{obj["badge"]}",')
            out_lines.append(f'    "col": "Gift Sets",')
            out_lines.append(f'    "gender": "Unisex",')
            out_lines.append(f'    "topNotes": [],')
            out_lines.append(f'    "midNotes": [],')
            out_lines.append(f'    "baseNotes": [],')
            out_lines.append(f'    "img": "{obj["img"]}",')
            out_lines.append(f'    "detailImages": {json.dumps(obj["detailImages"])}')
            out_lines.append("  },")
        i += 1
        continue
    
    if in_products_array and line.strip() == '{':
        # buffer the block
        block = [line]
        depth = 1
        i += 1
        while i < len(lines) and depth > 0:
            block.append(lines[i])
            if '{' in lines[i]: depth += lines[i].count('{')
            if '}' in lines[i]: depth -= lines[i].count('}')
            i += 1
        # block is complete. Is it a gift set?
        block_str = "\n".join(block)
        if '"size": "Gift Set"' in block_str or "DISCOVERY" in block_str or "GIFT SET" in block_str or "3 PCS" in block_str or "3 PIECES" in block_str or "4 PCS" in block_str:
            # skip it! (do not add to out_lines)
            continue
        else:
            out_lines.extend(block)
            continue
            
    out_lines.append(line)
    i += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write("\n".join(out_lines))

print(f"Injected {len(found)} gift sets perfectly!")
