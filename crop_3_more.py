import urllib.request
from PIL import Image, ImageChops
from io import BytesIO
import re

def crop_box(url, keep_side, save_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        img = Image.open(BytesIO(resp.read())).convert('RGB')
        
        bg = Image.new('RGB', img.size, (255, 255, 255))
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -20)
        gray = diff.convert('L')
        
        w, h = gray.size
        col_sums = []
        for x in range(w):
            col_sums.append(sum(gray.getpixel((x, y)) for y in range(h)))
            
        mid_start = int(w * 0.30)
        mid_end = int(w * 0.70)
        
        valley_idx = mid_start + col_sums[mid_start:mid_end].index(min(col_sums[mid_start:mid_end]))
        
        if keep_side == 'left':
            cropped = img.crop((0, 0, valley_idx, h))
        else:
            cropped = img.crop((valley_idx, 0, w, h))
            
        cropped = cropped.convert("RGBA")
        data = cropped.getdata()
        new_data = []
        for item in data:
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 0)) # fully transparent instead of white!
            else:
                new_data.append(item)
        cropped.putdata(new_data)
        
        cropped.save(save_path, "PNG")
        print(f"Cropped {save_path.split('/')[-1]}")

try:
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1783939496', 'left', r'c:\web\assets\images\products\panache_nobox.png')
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OudMuattarBahraini.1_1.png?v=1783939522', 'left', r'c:\web\assets\images\products\bahraini_nobox.png')
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CopyofOudMuattarKuwaiti.1.png?v=1783939555', 'left', r'c:\web\assets\images\products\kuwaiti_nobox.png')
except Exception as e:
    print("Error cropping:", e)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "PANACHE ANGEL DUST": "./assets/images/products/panache_nobox.png",
    "OUD MUATTAR BAHRAINI": "./assets/images/products/bahraini_nobox.png",
    "OUD MUATTAR KUWAITI": "./assets/images/products/kuwaiti_nobox.png"
}

for title, new_img in replacements.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated JSX to use perfectly cropped no-box images for Panache and Bakhoors!")
