import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix the const PRODUCTS = \n { ... }, \n [
# We need to change it to const PRODUCTS = [\n { ... }, \n

# Find "const PRODUCTS = \n  {" or similar
code = re.sub(r'const PRODUCTS =\s*\{\s*"id":', r'const PRODUCTS = [\n  {\n    "id":', code)

# Then we need to find the stray `[` that was pushed down
# The stray `[` will be right before the first original object, which is "id": "8711671578823"
# So let's look for "},\n[\n  {\n    \"id\": \"8711671578823\""
code = code.replace('},\n[\n  {\n    "id": "8711671578823"', '},\n  {\n    "id": "8711671578823"')

# Let's verify by just printing the lines
with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixed syntax error")
