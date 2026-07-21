import re
import urllib.request
from PIL import Image
from io import BytesIO
import numpy as np
import random

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

products = re.findall(r'\{\s*"id":.*?"name":\s*"([^"]+)".*?"img":\s*"([^"]+)"', code, re.DOTALL)

# Let's shuffle so we get different ones
random.seed(42)
random.shuffle(products)

found = []
print("Scanning for premium looking unboxed perfumes...")

# List of premium keywords
premium_keywords = ['GOLD', 'SILVER', 'OUD', 'ROYAL', 'SULTAN', 'LUXE', 'INTENSE', 'BLACK', 'WHITE', 'ROSE']

for name, img_url in products:
    if len(found) >= 8:
        break
    if not img_url.startswith('http'):
        continue
        
    is_premium = any(k in name.upper() for k in premium_keywords)
    if not is_premium and len(found) < 4:
        # Require premium keywords for the first 4 to ensure they are "achay walay"
        continue
        
    try:
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
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
            
            # Unboxed bottles typically have aspect ratio < 0.55
            # Premium bottles might be up to 0.6
            if 0.2 < aspect < 0.65:
                print(f"Found premium unboxed: {name} (aspect: {aspect:.2f})")
                found.append(name)
    except Exception as e:
        pass

print("Selected:", found)

# Remove all New badges
code = re.sub(r'"badge":\s*"New",', '"badge": "",', code)

for name in found:
    pattern = r'(\{\s*"id":[^\{]*?"name":\s*"' + re.escape(name) + r'".*?"badge":\s*")[^"]+(")'
    def repl(m):
        return m.group(1) + 'New' + m.group(2)
    code = re.sub(pattern, repl, code, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated khadlaj-perfumes (1).jsx")
