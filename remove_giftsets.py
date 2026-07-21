import re
import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# We will use regex to find all objects in the PRODUCTS array and filter them.
# The array is `const PRODUCTS = [ { ... }, { ... } ];`

# Find the start of the PRODUCTS array
start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];', start_idx)

if start_idx != -1 and end_idx != -1:
    # Instead of parsing the whole JS file as JSON (which is hard because it has unquoted keys sometimes, but actually it's mostly JSON format)
    # Let's just remove the objects using regex.
    pass

# Simpler approach: find lines containing `"name": "..."`
# Check if it has "GIFT SET" or "DISCOVERY SET"
# If yes, we can remove the whole block.
# Actually, a block is `{ ... },`. 
# We can just write a script that parses the JS file, splits it by `  {\n    "id":`, and reconstructs it.

parts = code.split('  {\n    "id":')
new_parts = [parts[0]]

removed_count = 0
for part in parts[1:]:
    # The part contains the rest of the object
    # Let's extract the name
    name_match = re.search(r'"name": "(.*?)"', part)
    if name_match:
        name = name_match.group(1).upper()
        if "DISCOVERY SET" in name or ("GIFT SET" in name and "CREAM VELVET" not in name and "NAFAIS SHARQ" not in name):
            removed_count += 1
            print(f"Removing: {name}")
            continue # skip adding this part
    
    new_parts.append('  {\n    "id":' + part)

new_code = "".join(new_parts)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(new_code)

print(f"Removed {removed_count} products without pure bottle images.")
