import json
import urllib.request
import re

url = "https://khadlaj-perfumes.com/collections/best-seller-top-fragrances-to-shop-online/products.json?limit=250"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
    
    best_seller_titles = [p['title'].strip() for p in data['products']]
    print(f"Fetched {len(best_seller_titles)} best sellers from Khadlaj.")
    
    with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
        code = f.read()
    
    updated_count = 0
    
    # We will iterate through best seller titles and regex replace the badge in the JSON object
    for title in best_seller_titles:
        # Escape title for regex
        escaped_title = re.escape(title)
        
        # Regex to find the block for this product. 
        # Pattern: "name": "TITLE", followed by anything (non-greedy) until "badge": ""
        pattern = r'(    "name": "' + escaped_title + r'",\s*.*?"badge": )""'
        
        if re.search(pattern, code, flags=re.DOTALL):
            code = re.sub(pattern, r'\1"Best Seller"', code, count=1, flags=re.DOTALL)
            updated_count += 1
            
    print(f"Successfully tagged {updated_count} products as Best Seller in PRODUCTS array.")
    
    # Fix front page Best Sellers limit from 4 to 6
    old_slice = 'slice(0, activeCat === "Best Sellers" ? 4 : 16);'
    new_slice = 'slice(0, activeCat === "Best Sellers" ? 6 : 16);'
    if old_slice in code:
        code = code.replace(old_slice, new_slice)
        print("Updated front page slice limit to 6.")
    
    with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(code)
        
except Exception as e:
    print("Error:", e)
