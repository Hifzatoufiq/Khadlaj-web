import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove all New badges
code = re.sub(r'"badge":\s*"New",', '"badge": "",', code)

# Find blocks with smart_cropped
# We will just split by '{' and find the first 8 that have 'smart_cropped'
blocks = code.split(',\n  {')
new_blocks = []
count = 0

for i, block in enumerate(blocks):
    if 'smart_cropped' in block and count < 8:
        # Give it a New badge
        # Find "badge": "",
        block = re.sub(r'"badge":\s*"",', '"badge": "New",', block)
        count += 1
    new_blocks.append(block)

code = ',\n  {'.join(new_blocks)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Added New badge to {count} smart-cropped products.")
