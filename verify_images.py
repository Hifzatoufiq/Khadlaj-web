import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Extract a sample of products and their images to verify
blocks = re.findall(r'\{[^{}]*"name":\s*"([^"]*)",[^{}]*"img":\s*"([^"]*)"', code)

for i, (name, img) in enumerate(blocks[:30]):
    print(f"{name}: {img}")
    
