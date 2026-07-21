import urllib.request
import json

products_to_fix = [
    "OUD MUATTAR MAAMUL HANEEN",
    "OUD MUATTAR MAAMUL WARDI",
    "OUD MUATTAR MAAMUL DAHABI",
    "FRASH AFTER ECSTACY",
    "OUD MUATTAR AL BAHAAR",
    "OUD MUATTAR QISSA",
    "OUD MUATTAR RUKAIYA",
    "OUD PURE MAGICAL THAI",
    "DEHNAL OUD QAISAR SEUFI",
    "DEHNAL OUD SHEIKH QADIM",
    "FRASH HAREEM AL SULTAN"
]

found = {}

for page in range(1, 6):
    url = f'https://khadlaj-perfumes.com/products.json?limit=250&page={page}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode())['products']
    if not data:
        break
    
    for p in data:
        title = p['title'].upper()
        for fix_p in products_to_fix:
            if fix_p in title or title in fix_p:
                found[fix_p] = [img['src'] for img in p['images']]

for k, v in found.items():
    print(f"--- {k} ---")
    for i, img in enumerate(v):
        print(f"[{i+1}] {img}")
