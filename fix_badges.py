import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove all New badges
code = re.sub(r'"badge":\s*"New",', '"badge": "",', code)

# Add New badge to the found ones
found = ["OUD POUR NOBLE", "MUSK PURE MUSK BLEND CREATION OF IQBAL", "ANABIA RED", "KHADLAJ QARAR"]

for name in found:
    pattern = r'(\{\s*"id":[^\{]*?"name":\s*"' + re.escape(name) + r'".*?"badge":\s*")[^"]+(")'
    def repl(m):
        return m.group(1) + 'New' + m.group(2)
    code = re.sub(pattern, repl, code, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated badges.")
