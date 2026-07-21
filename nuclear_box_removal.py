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

overrides = {
    "OUD MUATTAR OUD HIND": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Hind-2.jpg?v=1761552400",
    "HUROOF": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Huroof_Gift_Box-02.jpg?v=1761565458",
    "OUD MUATTAR JUMEIRAH": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Jumeirah_Oud-2.jpg?v=1761553417",
    "QISSA ESHQ": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Eshq-4.jpg?v=1761546631",
    "QISSA TURQUOISE": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qisaa-Turquoise-4.jpg?v=1761545652",
    "FRASH SARA": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Sara-2.jpg?v=1761544487",
    "GALAZAID": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Galazaid-4.jpg?v=1761124960",
    "GRAND COLLECTION": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/GrandGiftBox-03_3165934b-a570-4842-a425-aa3586ebf9ff.jpg?v=1756378107",
    "DEHNAL OUDH COMBODI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg",
    "NAFAIS SHARQ GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg",
    "CREAM VELVET GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg"
}

def is_box(url):
    return bool(re.search(r'[-_.](0?1)(_|\.)', url, re.IGNORECASE))

def get_best_bottle_image(images):
    if not images: return ""
    urls = [img['src'] for img in images]
    
    # 1. Filter out infographics
    urls = [u for u in urls if 'info' not in u.lower()]
    if not urls: urls = [img['src'] for img in images] 
    
    img0 = urls[0]
    
    if not is_box(img0):
        return img0
        
    for num in ['4', '04', '2', '02', '3', '03']:
        for u in urls[1:]:
            if re.search(rf'[-_.]({num})(_|\.)', u, re.IGNORECASE):
                return u
                
    if len(urls) > 1:
        return urls[1]
        
    return img0

title_to_img = {}

for p in products_data:
    title_clean = p['title'].strip()
    
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
    clean_title = re.sub(r'KHADLAJ PERFUMES ', '', title, flags=re.IGNORECASE)
    clean_title = re.sub(r'^KHADLAJ ', '', clean_title, flags=re.IGNORECASE)
    clean_title = re.split(r'\s*(?:\b\d+\s*(?:ML|G|OZ)\b|\bEDP\b|\bEAU DE PARFUM\b|\bEXTRAIT\b|\bFOR WOMEN\b|\bFOR MEN\b)', clean_title, flags=re.IGNORECASE)[0].strip()
    
    if "CREAM VELVET GIFT SET" in title.upper():
        clean_title = "CREAM VELVET GIFT SET"
    if "NAFAIS SHARQ GIFT SET" in title.upper():
        clean_title = "NAFAIS SHARQ GIFT SET"
        
    escaped_title = re.escape(clean_title)
    
    pattern = r'(    "name": "' + escaped_title + r'",[^{}]*?    "img": )"[^"]*"'
    
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1
    else:
        pattern2 = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
        if re.search(pattern2, code, flags=re.IGNORECASE):
            code = re.sub(pattern2, r'\g<1>"' + img_url + r'"', code, count=1, flags=re.IGNORECASE)
            updated += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated images for {updated} products using the NUCLEAR Box-Removal heuristic.")
