import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the gift set
content = re.sub(
    r'\s*{\s*"id":\s*"8711671578823",\s*"name":\s*"KHADLAJ PERFUMES NAFAIS SHARQ GIFT SET FOR WOMEN"[^}]*},\s*',
    '',
    content
)

# Remove the perfume
content = re.sub(
    r'\s*{\s*"id":\s*8409289228487,\s*"name":\s*"KHADLAJ NAFAIS SHARQ"[^}]*},\s*',
    '',
    content
)

# Remove from Curated Experiences slider
content = re.sub(
    r'\s*{\s*name:\s*"Nafais Sharq"[^}]*},',
    '',
    content
)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed Nafais Sharq from all locations.")
