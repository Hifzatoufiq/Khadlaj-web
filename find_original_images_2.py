import subprocess
import re

out = subprocess.check_output(['git', 'show', 'HEAD~15:"khadlaj-perfumes (1).jsx"']).decode('utf-8', errors='ignore')
start_idx = out.find('const PRODUCTS = [')
end_idx = out.find('];\n', start_idx)
products_str = out[start_idx:end_idx]

names = ['KHADLAJ ISLAND DREAMS', 'KHADLAJ ISLAND VANILLA DUNES', 'KHADLAJ ISLAND']
for name in names:
    pattern = r'"name": "' + name + r'".*?"img": "(https://[^"]+)"'
    match = re.search(pattern, products_str, flags=re.DOTALL | re.IGNORECASE)
    if match:
        print(f"{name}: {match.group(1)}")
    else:
        print(f"{name}: NOT FOUND")
