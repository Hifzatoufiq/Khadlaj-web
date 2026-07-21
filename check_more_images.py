import urllib.request
import json

names = [
    "HAREEM AL SULTAN BLUE",
    "WOW OUD",
    "GAITH",
    "RIMAAL BROWN",
    "FRASH AL MAJALIS",
    "FRASH SHAMOOKH",
    "OUD PURE MAGICAL THAI"
]

found = {}
for page in range(1, 6):
    try:
        url = f'https://khadlaj-perfumes.com/products.json?limit=250&page={page}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode())['products']
        if not data: break
        
        for p in data:
            title = p['title'].upper()
            for fix_p in names:
                if fix_p in title:
                    found[fix_p] = [img['src'] for img in p['images']]
    except Exception as e:
        print("Error", e)

for k, v in found.items():
    print(f"--- {k} ---")
    for i, img in enumerate(v):
        print(f"[{i+1}] {img}")
