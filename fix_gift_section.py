import re
import urllib.request
import json

url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1) as response:
    data1 = json.loads(response.read().decode())

url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2) as response:
    data2 = json.loads(response.read().decode())

products = data1['products'] + data2['products']

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Define the exact 4 products we want to keep as Gifts
keep_gifts = {
    "KHADLAJ ISLAND GIFT SET FOR HIM & HER": "",
    "KHADLAJ CLOUD CANDY GIFT SET": "",
    "CREAM VELVET GIFT SET": "",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": ""
}

# We want the image without the box.
# Island: Island2.jpg is the pure items without box. Island1 is the box.
# Cloud Candy: CloudCandy3.jpg is the pure items. CloudCandy1 is the box.
# Cream Velvet: CreamVelvet-2.jpg is the pure items. CreamVelvet-1 is the box.
# Gourmand: TheGourmandCollection-2.jpg is the pure items. TheGourmandCollection-1 is the box.

pure_images = {}
for p in products:
    t = p['title'].upper()
    for keep in keep_gifts:
        if keep in t:
            # manually pick the pure image
            for img in p['images']:
                src = img['src']
                if 'Island2' in src: pure_images["ISLAND GIFT SET FOR HIM & HER"] = src
                if 'CloudCandy3' in src: pure_images["CLOUD CANDY GIFT SET"] = src
                if 'CreamVelvet-2' in src: pure_images["CREAM VELVET GIFT SET"] = src
                if 'TheGourmandCollection-2' in src: pure_images["THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET"] = src

# We will regex replace the image for these 4
for short_title, img_src in pure_images.items():
    pattern = r'(    "name": "' + re.escape(short_title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + img_src + r'"', code, count=1, flags=re.IGNORECASE)

# Now, we want to REMOVE ALL OTHER GIFT SETS from the codebase!
# Let's find all products that have "GIFT SET", "DISCOVERY", "3 PCS", "4 PCS", "3 PIECES"
# And if they are NOT in keep_gifts, delete them!
# A product block looks like:
#   {
#     "id": ...
#     "name": ...
#     ...
#   },
import ast

def find_blocks(s):
    blocks = []
    # simple matching of { ... } at top level of array
    start = 0
    while True:
        idx = s.find('{\n    "id":', start)
        if idx == -1: break
        # find matching bracket
        depth = 1
        i = idx + 1
        while i < len(s) and depth > 0:
            if s[i] == '{': depth += 1
            elif s[i] == '}': depth -= 1
            i += 1
        end = i
        # include the trailing comma if it exists
        if end < len(s) and s[end] == ',':
            end += 1
        elif end+1 < len(s) and s[end:end+2] == ',\n':
            end += 2
        
        blocks.append((idx, end, s[idx:end]))
        start = end
    return blocks

blocks = find_blocks(code)
to_remove = []

for idx, end, block_text in blocks:
    # check name
    name_match = re.search(r'"name": "(.*?)"', block_text)
    if name_match:
        name = name_match.group(1).upper()
        
        # is it a gift set?
        is_gift = "GIFT SET" in name or "DISCOVERY" in name or "3 PCS" in name or "4 PCS" in name or "3 PIECES" in name or "MUKHALAT PERFUME OILS" in name
        
        if is_gift:
            # should we keep it?
            keep = False
            for k in keep_gifts:
                if k in name:
                    keep = True
                    break
            
            if not keep:
                to_remove.append((idx, end, block_text))

# remove from code from bottom to top
to_remove.sort(key=lambda x: x[0], reverse=True)
for idx, end, block_text in to_remove:
    code = code[:idx] + code[end:]

# Also make sure the kept ones have size="Gift Set"
for short_title in pure_images.keys():
    pattern = r'(    "name": "' + re.escape(short_title) + r'",[^{}]*?    "size": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"Gift Set"', code, count=1, flags=re.IGNORECASE)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Removed {len(to_remove)} unwanted gift sets. Updated the 4 allowed gift sets to use their pure images.")
