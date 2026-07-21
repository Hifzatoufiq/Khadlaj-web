import re
import subprocess
import urllib.request
from PIL import Image
import numpy as np
from io import BytesIO
import os

# 1. Get old file content
old_file_content = subprocess.check_output(['git', 'show', '972802a:khadlaj-perfumes (1).jsx'], text=True, encoding='utf-8')

# 2. Extract original URLs
original_urls = {}
# simple regex for name and img pairs in the same object
# find all name and img pairs
matches = re.finditer(r'"name":\s*"([^"]+)".*?"img":\s*"([^"]+)"', old_file_content, re.DOTALL)
for m in matches:
    name = m.group(1)
    url = m.group(2)
    # The regex might match across objects if not careful, but since every object has an img, it's usually safe.
    # Let's make sure it's valid
    if len(m.group(0)) < 500: # if it matched across objects, length would be huge
        original_urls[name] = url

# Let's do a more robust extraction just in case
old_blocks = re.findall(r'\{\s*"id":.*?"img":\s*"[^"]+"\s*\}', old_file_content, re.DOTALL)
for block in old_blocks:
    name_m = re.search(r'"name":\s*"([^"]+)"', block)
    url_m = re.search(r'"img":\s*"([^"]+)"', block)
    if name_m and url_m:
        original_urls[name_m.group(1)] = url_m.group(1)

# 3. Read current file
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    current_code = f.read()

# 4. Find all currently cropped items
current_blocks = re.findall(r'\{\s*"id":.*?"img":\s*"[^"]+"\s*\}', current_code, re.DOTALL)
to_recrop = []
for block in current_blocks:
    name_m = re.search(r'"name":\s*"([^"]+)"', block)
    url_m = re.search(r'"img":\s*"([^"]+)"', block)
    if name_m and url_m:
        name = name_m.group(1)
        url = url_m.group(1)
        if 'cropped_' in url:
            to_recrop.append(name)

print(f"Found {len(to_recrop)} products to re-crop with smart logic.")

os.makedirs('assets/images/smart_cropped', exist_ok=True)

# 5. Smart crop function
def smart_crop(img_data, output_path):
    img = Image.open(BytesIO(img_data)).convert('RGB')
    arr = np.array(img)
    diff = np.max(255 - arr, axis=2)
    mask = diff > 15
    col_sums = np.sum(mask, axis=0)
    
    non_zero_cols = np.where(col_sums > 5)[0]
    if len(non_zero_cols) == 0:
        return False
        
    right = non_zero_cols[-1]
    left = right
    
    gap_width = 0
    for i in range(right, -1, -1):
        if col_sums[i] <= 10:
            gap_width += 1
            if gap_width > 15:
                left = i + gap_width
                break
        else:
            gap_width = 0
            left = i
            
    obj_mask = mask[:, left:right+1]
    row_sums = np.sum(obj_mask, axis=1)
    non_zero_rows = np.where(row_sums > 5)[0]
    if len(non_zero_rows) == 0:
        return False
    top = non_zero_rows[0]
    bottom = non_zero_rows[-1]
    
    pad = 20
    left = max(0, left - pad)
    right = min(arr.shape[1], right + pad)
    top = max(0, top - pad)
    bottom = min(arr.shape[0], bottom + pad)
    
    cropped = img.crop((left, top, right, bottom))
    cropped.save(output_path)
    return True

# 6. Process
count = 0
for name in to_recrop:
    if name not in original_urls:
        print(f"Warning: {name} not found in original URLs. Skipping.")
        continue
    
    orig_url = original_urls[name]
    if not orig_url.startswith('http'):
        print(f"Warning: original URL for {name} is local ({orig_url}). Skipping.")
        continue
        
    filename = orig_url.split('/')[-1].split('?')[0]
    local_path = f"assets/images/smart_cropped/smart_{filename}"
    
    try:
        req = urllib.request.Request(orig_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        img_data = response.read()
        
        if smart_crop(img_data, local_path):
            # Replace in current code
            # Find the exact string in current code and replace it
            # We can use regex to replace just the img field for this specific product
            pattern = r'("name":\s*"' + re.escape(name) + r'".*?"img":\s*")[^"]+(")'
            current_code = re.sub(pattern, r'\g<1>./' + local_path + r'\g<2>', current_code, flags=re.DOTALL)
            count += 1
            print(f"Smart cropped {name}")
        else:
            print(f"Failed to find object in {name}")
    except Exception as e:
        print(f"Error processing {name}: {e}")

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(current_code)

print(f"Successfully processed {count} products.")
