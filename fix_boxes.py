import json
import urllib.request
import re

def fetch_all():
    products = []
    for page in [1, 2]:
        url = f"https://khadlaj-perfumes.com/products.json?limit=250&page={page}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            products.extend(data['products'])
    return products

products_data = fetch_all()

title_to_img = {}

# We know these specific ones have boxes at [0], so we pick [2] or a specific one:
for p in products_data:
    urls = [img['src'] for img in p['images']]
    if not urls: continue
    
    img_to_use = urls[0]
    
    # If the first image is a known "box" format (-1.jpg, -01.jpg)
    if re.search(r'[-_]0?1\.(jpg|png)', img_to_use, re.IGNORECASE):
        # Look for a bottle image: usually ends in -2, -4, -02, -03
        for u in urls:
            if re.search(r'[-_](2|4|03|04)\.(jpg|png)', u, re.IGNORECASE):
                img_to_use = u
                break
                
    title_to_img[p['title'].strip()] = img_to_use

# Manual overrides for the ones the user specifically showed to be 100% sure
overrides = {
    "OUD MUATTAR OUD HIND 24 G": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Hind-2.jpg?v=1761552400",
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET FOR MEN AND WOMEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Huroof_Gift_Box-02.jpg?v=1761565458",
    "OUD MUATTAR JUMEIRAH 24 G": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Jumeirah_Oud-2.jpg?v=1761553417",
    "FRASH QISSA ESHQ AIR FRESHENER 320ML": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Eshq-4.jpg?v=1761546631",
    "FRASH QISSA TURQUOISE AIR FRESHENER 320ML": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Turquoise-4.jpg?v=1761545652",
    "FRASH SARA AIR FRESHENER 320ML": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Sara-2.jpg?v=1761544487",
    "OUD PURE OUD GALAZAID 60 ML MASTER PERFUMER COLLECTION EDP SPRAY FOR MEN & WOMEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Galazaid-4.jpg?v=1761124960",
    "GRAND COLLECTION 3 PIECES GIFT SET FOR WOMEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/GrandGiftBox-03_3165934b-a570-4842-a425-aa3586ebf9ff.jpg?v=1756378107"
}

for title, url in overrides.items():
    title_to_img[title] = url

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updated = 0
for title, img_url in title_to_img.items():
    # Since we cleaned the names earlier! We must match by the CLEAN name.
    # The clean name in our code is without sizes. Let's just find by partial title!
    
    clean_title = re.sub(r'KHADLAJ PERFUMES ', '', title, flags=re.IGNORECASE)
    clean_title = re.split(r'\s*(?:\b\d+\s*(?:ML|G|OZ)\b|\bEDP\b|\bEAU DE PARFUM\b|\bEXTRAIT\b|\bFOR WOMEN\b|\bFOR MEN\b)', clean_title, flags=re.IGNORECASE)[0].strip()
    
    escaped_title = re.escape(clean_title)
    
    # We find the block for this product and replace its img
    pattern = r'(    "name": "' + escaped_title + r'",[^{}]*?    "img": )"[^"]*"'
    
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1
    else:
        # If partial match failed, try exact title match just in case
        pattern2 = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
        if re.search(pattern2, code, flags=re.IGNORECASE):
            code = re.sub(pattern2, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
            updated += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated images for {updated} products to eliminate boxes.")
