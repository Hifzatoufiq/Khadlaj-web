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

print("Fetching products from API...")
products_data = fetch_all()

# Manual overrides for the ones we know for 100% certainty
overrides = {
    "OUD MUATTAR OUD HIND": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Hind-2.jpg?v=1761552400",
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Huroof_Gift_Box-02.jpg?v=1761565458",
    "OUD MUATTAR JUMEIRAH": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Jumeirah_Oud-2.jpg?v=1761553417",
    "FRASH QISSA ESHQ AIR FRESHENER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Eshq-4.jpg?v=1761546631",
    "FRASH QISSA TURQUOISE AIR FRESHENER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Turquoise-4.jpg?v=1761545652",
    "FRASH SARA AIR FRESHENER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Sara-2.jpg?v=1761544487",
    "OUD PURE OUD GALAZAID": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Galazaid-4.jpg?v=1761124960",
    "GRAND COLLECTION 3 PIECES GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/GrandGiftBox-03_3165934b-a570-4842-a425-aa3586ebf9ff.jpg?v=1756378107",
    "DEHNAL OUDH COMBODI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg",
    "NAFAIS SHARQ GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg",
    "CREAM VELVET GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg"
}

title_to_img = {}

def get_best_bottle_image(images):
    if not images: return ""
    urls = [img['src'] for img in images]
    
    # 1. Filter out infographics
    urls = [u for u in urls if 'info' not in u.lower()]
    if not urls: urls = [img['src'] for img in images] # fallback if all were info
    
    img0 = urls[0]
    
    # 2. Is img0 clearly NOT a "box" formatted name?
    # Box names usually end in -1.jpg, _1.jpg, -01.jpg, _01.jpg
    if not re.search(r'[-_]0?1\.(jpg|png)', img0, re.IGNORECASE):
        # E.g. Cloud_Candy-3.jpg, New_Project.png, LA_FEDE...png
        return img0
        
    # 3. img0 is a box. We must find an alternative.
    # We prefer -4 or -2 over -3 (because -3 is often the open box).
    best_candidate = None
    
    # Look for -4 or _4
    for u in urls[1:]:
        if re.search(r'[-_]0?4\.(jpg|png)', u, re.IGNORECASE):
            return u
            
    # Look for -2 or _2
    for u in urls[1:]:
        if re.search(r'[-_]0?2\.(jpg|png)', u, re.IGNORECASE):
            return u
            
    # Look for -3 or _3
    for u in urls[1:]:
        if re.search(r'[-_]0?3\.(jpg|png)', u, re.IGNORECASE):
            return u
            
    # 4. Fallback to the second image if no numbers match
    if len(urls) > 1:
        return urls[1]
        
    return img0

for p in products_data:
    title_clean = p['title'].strip()
    
    # Check overrides
    matched_override = False
    for ov_k, ov_v in overrides.items():
        if ov_k.lower() in title_clean.lower():
            title_to_img[title_clean] = ov_v
            matched_override = True
            break
            
    if not matched_override:
        title_to_img[title_clean] = get_best_bottle_image(p['images'])

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updated = 0
for title, img_url in title_to_img.items():
    # Since we cleaned the names earlier, the title in JSX might be a substring of API title.
    # Our previous cleaning script removed 'KHADLAJ PERFUMES ' and sizes.
    clean_title = re.sub(r'KHADLAJ PERFUMES ', '', title, flags=re.IGNORECASE)
    clean_title = re.sub(r'^KHADLAJ ', '', clean_title, flags=re.IGNORECASE) # sometimes just KHADLAJ
    
    # Split by size indicators to match what we did in clean_data.js
    clean_title = re.split(r'\s*(?:\b\d+\s*(?:ML|G|OZ)\b|\bEDP\b|\bEAU DE PARFUM\b|\bEXTRAIT\b|\bFOR WOMEN\b|\bFOR MEN\b)', clean_title, flags=re.IGNORECASE)[0].strip()
    
    # Some edge cases from the manual clean script:
    if "CREAM VELVET GIFT SET" in title.upper():
        clean_title = "CREAM VELVET GIFT SET"
    if "NAFAIS SHARQ GIFT SET" in title.upper():
        clean_title = "NAFAIS SHARQ GIFT SET"
        
    escaped_title = re.escape(clean_title)
    
    # We find the block for this product and replace its img
    pattern = r'(    "name": "' + escaped_title + r'",[^{}]*?    "img": )"[^"]*"'
    
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1
    else:
        # Try exact title match just in case
        pattern2 = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
        if re.search(pattern2, code, flags=re.IGNORECASE):
            code = re.sub(pattern2, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
            updated += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated images for {updated} products using the strict Bottle-Only heuristic.")
