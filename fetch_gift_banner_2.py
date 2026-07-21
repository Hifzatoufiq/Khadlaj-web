import urllib.request
import re

url = "https://khadlaj-perfumes.com/collections/gift-sets"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'https://cdn\.shopify\.com/s/files/[^"\'\s]+\.(?:jpg|png|webp)', html)
    print("Found images:")
    for img in set(images):
        if 'collection' in img.lower() or 'banner' in img.lower() or 'paradise' in img.lower():
            print("MATCH:", img)
        elif len(img) > 80:
            print(img)
except Exception as e:
    print(e)
