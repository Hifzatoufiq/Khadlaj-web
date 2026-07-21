import json
import urllib.request
import re
from PIL import Image
from io import BytesIO
import numpy as np

# List of 10 products
products_to_fix = [
    "KHADLAJ NAFAIS MAGRIB",
    "OUD PURE OUD JUMEIRAH",
    "KHADLAJ SARAYA",
    "KHADLAJ IHTHIRAAM",
    "KHADLAJ QARAR",
    "KHADLAJ ONYX SILVER",
    "NUHA BON BON",
    "KHADLAJ MANSION",
    "LA FEDE EDGE INTENSE",
    "LA FEDE EDGE ORIGINAL"
]

# Fetch all products from Shopify
data = []
for page in range(1, 5):
    url = f'https://khadlaj-perfumes.com/products.json?limit=250&page={page}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        page_data = json.loads(response.read().decode())['products']
        if not page_data:
            break
        data.extend(page_data)
    except Exception as e:
        pass

def get_best_bottle_image(product_name):
    # more lenient matching
    shopify_prod = None
    for p in data:
        # e.g., LA FEDE EDGE ORIGINAL vs Edge Original
        t = p['title'].upper().replace('KHADLAJ PERFUMES ', '').replace('KHADLAJ ', '')
        n = product_name.upper().replace('KHADLAJ PERFUMES ', '').replace('KHADLAJ ', '')
        if t in n or n in t:
            shopify_prod = p
            break
            
    if not shopify_prod:
        return None
    
    best_img = None
    min_aspect = 100.0
    
    for img in shopify_prod['images']:
        src = img['src']
        try:
            req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            pil_img = Image.open(BytesIO(response.read())).convert('RGB')
            arr = np.array(pil_img)
            diff = np.max(255 - arr, axis=2)
            mask = diff > 15
            
            row_sums = np.sum(mask, axis=1)
            col_sums = np.sum(mask, axis=0)
            
            non_zero_rows = np.where(row_sums > 5)[0]
            non_zero_cols = np.where(col_sums > 5)[0]
            
            if len(non_zero_rows) > 0 and len(non_zero_cols) > 0:
                h = non_zero_rows[-1] - non_zero_rows[0]
                w = non_zero_cols[-1] - non_zero_cols[0]
                aspect = w / h if h > 0 else 100.0
                
                if aspect < min_aspect:
                    min_aspect = aspect
                    best_img = src
        except Exception as e:
            pass
            
    return best_img

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove ALL New badges first to reset
code = re.sub(r'"badge":\s*"New",', '"badge": "",', code)

count = 0
for name in products_to_fix:
    best_img = get_best_bottle_image(name)
    if best_img:
        pattern = r'(\{\s*"id":[^\{]*?"name":\s*"' + re.escape(name) + r'".*?"badge":\s*")[^"]+(",.*?"img":\s*")[^"]+("\s*\})'
        def repl(m):
            return m.group(1) + 'New' + m.group(2) + best_img + m.group(3)
            
        new_code, num_subs = re.subn(pattern, repl, code, flags=re.DOTALL)
        if num_subs > 0:
            code = new_code
            count += 1
            print(f"Updated {name}")
        else:
            print(f"Regex failed for {name}")

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Successfully updated {count} products with bottle-only images and New badge.")
