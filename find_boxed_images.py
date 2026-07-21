import urllib.request
import json
import time

products_to_fix = [
    "PANACHE ANGEL DUST",
    "OUD PURE MAGICAL THAI",
    "JOHAYNA PURPLE",
    "ANABIA RED",
    "ARABIAN TREASURE",
    "ANABIA BLUE",
    "OUD & MUSK",
    "JOHAYNA GREEN",
    "KAYAAN SILVER",
    "KAYAAN GOLD",
    "MALIKA GREEN",
    "MALIKA RED",
    "PINK MUSK",
    "PURPLE MUSK"
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
