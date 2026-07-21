import json
import urllib.request
import re

# The 8 products the user wants in "New Launch"
new_titles_keywords = [
    "KARUS GOLD ABSOLU",
    "AURA VANILLA MILK",
    "KHADLAJ SARAYA",
    "OUD MUATTAR MUBAKHAR",
    "DEHNAL OUDH COMBODI",
    "ZAYAAN SILVER",
    "NAFAIS SHARQ GIFT SET",
    "CREAM VELVET"
]

try:
    with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
        code = f.read()
    
    updated_count = 0
    
    # We will search the file for the product blocks that match these keywords in the "name" field
    # The JSON array format has:
    # "name": "KARUS GOLD ABSOLU 100 ML EDP SPRAY",
    # "col": "Eau De Parfum",
    # "price": 150,
    # "size": "100 ml",
    # "badge": "",
    
    for keyword in new_titles_keywords:
        # Regex to find the block for this product where name contains the keyword
        # "name": "[^"]*KEYWORD[^"]*", followed by "badge": ""
        # Using DOTALL so .*? matches across newlines
        
        # We need to make sure we only match the block up to the nearest badge to avoid greedy matching over multiple products.
        # [^}]*? ensures we stay within the same JSON object.
        pattern = r'(    "name": "[^"]*' + re.escape(keyword) + r'[^"]*",[^}]*?"badge": )""'
        
        # Search and replace
        if re.search(pattern, code, flags=re.IGNORECASE):
            # Replace exactly once per keyword to be safe, or just replace all matches if there are duplicates
            code = re.sub(pattern, r'\1"New"', code, count=1, flags=re.IGNORECASE)
            updated_count += 1
            print(f"Tagged New: {keyword}")
        else:
            print(f"Could not find: {keyword}")
            
    print(f"Successfully tagged {updated_count} products as New.")
    
    with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(code)
        
except Exception as e:
    print("Error:", e)
