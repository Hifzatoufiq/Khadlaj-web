import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx:end_idx]

# Find the object for PANACHE ANGEL DUST
# We match from { to } inclusive, ensuring it contains the name
match = re.search(r'(\{[^{}]*"name":\s*"PANACHE ANGEL DUST"[^{}]*\},\s*)', products_str)
if not match:
    # try without trailing comma
    match = re.search(r'(\{[^{}]*"name":\s*"PANACHE ANGEL DUST"[^{}]*\})', products_str)

if match:
    obj_str = match.group(1)
    new_products_str = products_str.replace(obj_str, '')
    code = code[:start_idx] + new_products_str + code[end_idx:]
    
    with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Removed PANACHE ANGEL DUST.")
else:
    print("Could not find PANACHE ANGEL DUST.")
