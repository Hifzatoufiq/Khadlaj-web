import re
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f: text = f.read()
products = re.findall(r'\{\s*"id":\s*\d+,\s*"name":\s*"(.*?)",\s*"col":\s*"(.*?)",\s*"price":\s*\d+,\s*"size":\s*"(.*?)"', text, re.DOTALL)
for p in products:
    if p[1] == 'Perfume Oils': print(p)
