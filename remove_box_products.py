import re
import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Find the start and end of the PRODUCTS array
start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n\nconst COLLECTIONS', start_idx) + 1

if start_idx != -1 and end_idx != -1:
    products_str = code[start_idx + 17 : end_idx]
    # It might not be strict JSON because of trailing commas or comments, but let's try to parse it
    # If json.loads fails, we will manually filter blocks
    
    # We will manually filter objects by looking for { and }
    import ast
    # Instead of ast, let's use regex to find each object and remove it if it matches
    
    names_to_remove = ['FRASH QISSA ESHQ', 'FRASH QISSA TURQUOISE', 'FRASH SARA', 'OUD HIND', 'JUMEIRAH', 'BAHRAINI', 'KUWAITI', 'FAZAA', 'BAKHOOR IZZ']
    
    # Regex to find each object in the array
    # An object starts with { and ends with }, optionally followed by a comma
    
    new_products_str = products_str
    for name in names_to_remove:
        # We find the object containing this name
        # A simple way is to split the products string by '{' and '}'
        # But nested arrays (like notes) have [ ]
        # Since it's formatted nicely, we can use regex to match the whole block for a product
        
        # Regex: {\s*"id":.*?"name": "[^"]*NAME[^"]*".*?},?
        # Note: the name might not be exactly upper case, so we use (?i)
        
        pattern = r'\{\s*"id"[^}]+?"name":\s*"[^"]*' + name.replace(' ', r'\s+') + r'[^"]*"[^}]+?\]\s*\},?'
        new_products_str = re.sub(pattern, '', new_products_str, flags=re.IGNORECASE | re.DOTALL)
        
    # Replace in code
    new_code = code[:start_idx + 17] + new_products_str + code[end_idx:]
    
    with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(new_code)
    print("Products removed successfully.")
else:
    print("Could not find PRODUCTS array.")
