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
                new_data.append((255, 255, 255, 255))
            else:
                new_data.append(item)
        cropped.putdata(new_data)
        
        # Save as png to preserve transparency/white background
        cropped.convert("RGB").save(save_path, "JPEG", quality=95)
        print(f"Cropped {save_path.split('/')[-1]}")

try:
    # Huroof_Gift_Box-02.jpg - Left is bottle, right is box?
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Huroof_Gift_Box-02.jpg?v=1761565458', 'left', r'c:\web\assets\images\products\huroof_gift_set_nobox.jpg')
    # GrandGiftBox-03 - Left is bottles, right is box?
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/GrandGiftBox-03_3165934b-a570-4842-a425-aa3586ebf9ff.jpg?v=1756378107', 'left', r'c:\web\assets\images\products\grand_gift_set_nobox.jpg')
    # Nafais-Sharq-3.jpg - Left is bottles, right is box?
    crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg', 'left', r'c:\web\assets\images\products\nafais_gift_set_nobox.jpg')
except Exception as e:
    print("Error cropping:", e)

# Update JSX
with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "CREAM VELVET GIFT SET": "./assets/images/products/creamvelvet_gift_set_nobox.jpg",
    "ISLAND GIFT SET FOR HIM & HER": "./assets/images/products/island_gift_set_nobox.jpg",
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET": "./assets/images/products/huroof_gift_set_nobox.jpg",
    "GRAND COLLECTION 3 PIECES GIFT SET": "./assets/images/products/grand_gift_set_nobox.jpg",
    "NAFAIS SHARQ GIFT SET": "./assets/images/products/nafais_gift_set_nobox.jpg"
}

for title, new_img in replacements.items():
    clean_title = title
    if "CREAM" in title: clean_title = "CREAM VELVET GIFT SET"
    elif "NAFAIS" in title: clean_title = "NAFAIS SHARQ GIFT SET"
    elif "ISLAND" in title: clean_title = "ISLAND GIFT SET FOR HIM & HER ("
    elif "HUROOF" in title: clean_title = "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET"
    elif "GRAND" in title: clean_title = "GRAND COLLECTION 3 PIECES GIFT SET"
    
    pattern = r'(    "name": "' + re.escape(clean_title) + r'",[^{}]*?    "img": )"[^"]*"'
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated JSX to use perfectly cropped no-box images for all gift sets!")
