import re

file_path = r'c:\web\khadlaj-perfumes (1).jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_products = [
    'KARUS GOLD ABSOLU',
    'ZAYAAN SILVER',
    'QARAR',
    'KHADLAJ IHTHIRAAM',
    'KHADLAJ ICON',
    'PANACHE ANGEL DUST',
    'KHADLAJ ONYX SILVER'
]

lines = content.split('\n')
current_name = None

for i, line in enumerate(lines):
    name_match = re.search(r'"name":\s*"([^"]+)"', line)
    if name_match:
        current_name = name_match.group(1)
    
    if '"badge":' in line:
        if current_name in new_products:
            lines[i] = re.sub(r'"badge":\s*"[^"]*"', '"badge": "New"', line)
        else:
            badge_match = re.search(r'"badge":\s*"([^"]*)"', line)
            if badge_match and badge_match.group(1) == 'New':
                lines[i] = re.sub(r'"badge":\s*"New"', '"badge": ""', line)
        current_name = None

new_content = '\n'.join(lines)
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Updated successfully')
