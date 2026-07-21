import json
import urllib.request
import re

url = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    
url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2) as response:
    data['products'].extend(json.loads(response.read().decode())['products'])

targets = ["PANACHE ANGEL DUST", "OUD MUATTAR BAHRAINI", "OUD MUATTAR KUWAITI"]

for p in data['products']:
    for t in targets:
        if t.lower() in p['title'].lower():
            print(f"--- {p['title']} ---")
            for i, img in enumerate(p['images']):
                print(f"[{i}]: {img['src']}")

