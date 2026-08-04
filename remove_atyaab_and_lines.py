import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove Atyaab from COLLECTIONS_DATA
content = re.sub(
    r'\s*\{\s*name:\s*"Atyaab"[^}]*\},?',
    '',
    content
)

# 2. Replace "Atyaab" with "Perfume Oils" everywhere else
content = content.replace('"Atyaab"', '"Perfume Oils"')
content = content.replace('p.col==="Perfume Oils" || p.col==="Perfume Oils"', 'p.col==="Perfume Oils"')

# 3. Remove the extra decorative horizontal lines
# Specifically: <div style={{width:...,height:1,background:...}}/> and <div className="gold-line".../>
content = re.sub(
    r'\s*<div\s+style=\{\{\s*width:\s*\d+,\s*height:\s*1,\s*background:\s*"#[A-Fa-f0-9]+"[^}]*\}\}\s*/>',
    '',
    content
)
content = re.sub(
    r'\s*<div\s+className="gold-line"[^>]*/>',
    '',
    content
)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully cleaned up Atyaab and decorative lines.")
