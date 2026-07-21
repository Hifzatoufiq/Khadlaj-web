import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Match the entire dictionary for HAREEM AL SULTAN BLUE
# It looks like:
#   {
#     "id": ...,
#     "name": "HAREEM AL SULTAN BLUE",
#     ...
#   },
pattern = r'\s*\{\s*"id"[^}]+?"name":\s*"HAREEM AL SULTAN BLUE".*?\},'
code = re.sub(pattern, '', code, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Removed HAREEM AL SULTAN BLUE.")
