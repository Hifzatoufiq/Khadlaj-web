import re
import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace all "badge": "New" with "badge": "" safely
code = code.replace('"badge": "New"', '"badge": ""')

new_launches = [
    "OUD POUR NOBLE",
    "MUSK PURE MUSK BLEND CREATION OF IQBAL",
    "ANABIA RED",
    "KHADLAJ QARAR",
    "HAREEM AL SULTAN",
    "MUSK POUR NARCIS",
    "OUD POUR BLUEBERRY",
    "OUD POUR SHAIKH"
]

for name in new_launches:
    # Use re.sub to find the exact dictionary entry and replace its badge
    pattern = r'(\{\s*"id":[^\{]*?"name":\s*"' + re.escape(name) + r'".*?"badge":\s*")[^"]*(")'
    def repl(m):
        return m.group(1) + 'New' + m.group(2)
    code = re.sub(pattern, repl, code, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated khadlaj-perfumes (1).jsx safely")
