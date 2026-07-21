import urllib.request
import json

url1 = "https://khadlaj-perfumes.com/products.json?limit=250&page=1"
url2 = "https://khadlaj-perfumes.com/products.json?limit=250&page=2"

req1 = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})

with urllib.request.urlopen(req1) as response:
    data1 = json.loads(response.read().decode())
with urllib.request.urlopen(req2) as response:
    data2 = json.loads(response.read().decode())

all_prods = data1['products'] + data2['products']

names = ['KHADLAJ ISLAND DREAMS', 'KHADLAJ ISLAND VANILLA DUNES', 'KHADLAJ ISLAND']

for p in all_prods:
    t = p['title'].upper()
    for name in names:
        if name in t:
            img = p['images'][0]['src'] if p.get('images') else 'NONE'
            print(f"{name}: {img}")
