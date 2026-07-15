import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Remove fontFamily:"'Montserrat',sans-serif" from <h[1-4] tags
# Also handles spacing variations
code = re.sub(
    r'(<h[1-4][^>]*?)(\s*,\s*fontFamily:\s*\"\'Montserrat\',sans-serif\"|\s*fontFamily:\s*\"\'Montserrat\',sans-serif\"\s*,\s*)([^>]*>)',
    r'\1\3',
    code
)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Removed inline Montserrat font family from Header tags.")
