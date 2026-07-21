import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx:end_idx]

# Find objects with "New" badge
objects = re.findall(r'\{[^{}]*"name"[^{}]*"badge":\s*"New"[^{}]*\}', products_str)

new_products_str = products_str

for obj in objects:
    # Check if it's Gift Sets or Bakhoor
    if '"col": "Gift Sets"' in obj or '"col": "Bakhoor"' in obj or '"col": "Dehn Al Oudh"' in obj:
        # replace "New" with ""
        new_obj = re.sub(r'"badge":\s*"New"', r'"badge": ""', obj)
        new_products_str = new_products_str.replace(obj, new_obj)

code = code[:start_idx] + new_products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Removed 'New' badge from Gift Sets, Bakhoor, Dehn Al Oudh.")
