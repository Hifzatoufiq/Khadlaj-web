import re
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx:end_idx]

# Find all products with badge "New"
objects = re.findall(r'\{[^{}]*"name"[^{}]*"badge":\s*"New"[^{}]*\}', products_str)

for obj in objects:
    name_match = re.search(r'"name":\s*"([^"]+)"', obj)
    col_match = re.search(r'"col":\s*"([^"]+)"', obj)
    print(f"{name_match.group(1)} - {col_match.group(1)}")
