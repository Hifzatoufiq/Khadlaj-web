import re
import urllib.request
import os
from PIL import Image
from io import BytesIO

os.makedirs('assets/images/cropped', exist_ok=True)

names = [
    "FRASH DALOUAA AIR FRESHENER",
    "FRASH ZAHOOR AL KHALEEJ AIR FRESHENER",
    "FRASH ROMANCIA AIR FRESHENER",
    "FRASH MAKHMALI AIR FRESHENER",
    "FRASH MUSKY AIR FRESHENER",
    "FRASH NASEEM AL WARD AIR FRESHENER",
    "FRASH LA YUQAWAM AIR FRESHENER",
    "OUD MUATTAR GHALIYA",
    "OUD MUATTAR MUNAWWARA",
    "SHAMOOKH SILVER",
    "FRASH MUKHALLAT SHUYOOKHI AIR FRESHENER",
    "BAKHOOR HANEEN 100 GMS",
    "BAKHOOR MAHA 100 GMS",
    "MUSK WA WARD",
    "UNO INTIMO",
    "OUD MUATTAR RIMAAL 40GM",
    "OUD MUATTAR SAMOU AL OUD 40GM"
]

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

count = 0
for n in names:
    match = re.search(r'"name":\s*"' + re.escape(n) + r'".*?"img":\s*"([^"]+)"', code, re.DOTALL)
    if match:
        old_img_url = match.group(1)
        print(f"Processing {n}: {old_img_url}")
        
        if not old_img_url.startswith('http'):
            print(f"  -> Skipping, already local: {old_img_url}")
            continue
            
        try:
            req = urllib.request.Request(old_img_url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            img_data = response.read()
            img = Image.open(BytesIO(img_data))
            
            # Crop right 52% (start at 48%)
            width, height = img.size
            left = width * 0.48
            top = 0
            right = width
            bottom = height
            
            cropped_img = img.crop((left, top, right, bottom))
            
            # Save locally
            filename = old_img_url.split('/')[-1].split('?')[0]
            local_path = f"assets/images/cropped/cropped_{filename}"
            cropped_img.save(local_path)
            
            # Replace in code
            obj_text = match.group(0)
            new_obj_text = obj_text.replace(old_img_url, f"./{local_path}")
            code = code.replace(obj_text, new_obj_text)
            count += 1
            print(f"  -> Saved and replaced with ./{local_path}")
        except Exception as e:
            print(f"Error processing {n}: {e}")
    else:
        print(f"Not found in code: {n}")

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Successfully processed and updated {count} images.")
