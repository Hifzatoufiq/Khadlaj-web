import json
import urllib.request

url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1) as response:
    data1 = json.loads(response.read().decode())

url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2) as response:
    data2 = json.loads(response.read().decode())

products = data1['products'] + data2['products']

targets = ["ISLAND GIFT SET FOR HIM & HER", "KHADLAJ CLOUD CANDY GIFT SET", "CREAM VELVET GIFT SET", "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET", "NAFAIS SHARQ GIFT SET"]

for p in products:
    t = p['title'].upper()
    for target in targets:
        if target in t or t in target:
            print(f"--- {p['title']} ---")
            for i, img in enumerate(p['images']):
                print(f"[{i}]: {img['src']}")
