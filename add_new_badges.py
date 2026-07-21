import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx:end_idx]

# Find products with badge: "" or badge: "For Unisex" and replace with "New"
# We only want to do this for the first 13 occurrences so we get exactly 16 "New" total
# Currently there are 3 "New" products

count = 0
def replacer(match):
    global count
    if count < 13:
        count += 1
        return re.sub(r'"badge":\s*"[^"]*"', r'"badge": "New"', match.group(0))
    return match.group(0)

# We want to match whole product objects to safely replace inside them
# Object format: { ... }
# Find all objects
objects = re.findall(r'\{[^{}]*"name"[^{}]*"badge"[^{}]*\}', products_str)

new_products_str = products_str

for obj in objects:
    if count >= 13:
        break
    if '"badge": ""' in obj or '"badge": "For Unisex"' in obj:
        if '"name": "KHADLAJ PERFUMES NAFAIS SHARQ GIFT SET FOR WOMEN"' in obj:
            continue # skip gift set
        new_obj = re.sub(r'"badge":\s*"[^"]*"', r'"badge": "New"', obj)
        new_products_str = new_products_str.replace(obj, new_obj)
        count += 1

code = code[:start_idx] + new_products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Added 'New' badge to {count} products.")
