import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx:end_idx]

# Find all products and check if they have "notes"
objects = re.findall(r'\{[^{}]*"name"[^{}]*\}', products_str)
missing_notes_count = 0
new_products_str = products_str

for obj in objects:
    if '"notes":' not in obj:
        missing_notes_count += 1
        # Insert "notes": ["Oud", "Musk", "Amber"], right before "img":
        new_obj = re.sub(r'("img":)', r'"notes": ["Oud", "Musk", "Amber"],\n    \1', obj)
        new_products_str = new_products_str.replace(obj, new_obj)

code = code[:start_idx] + new_products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Added default notes to {missing_notes_count} products.")
