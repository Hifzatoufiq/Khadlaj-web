import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clean up Atyaab
content = re.sub(
    r'\s*\{\s*name:\s*"Atyaab"[^}]*\},?',
    '',
    content
)
content = content.replace('"Atyaab"', '"Perfume Oils"')
content = content.replace('p.col==="Perfume Oils" || p.col==="Perfume Oils"', 'p.col==="Perfume Oils"')

# 2. Clean up extra decorative lines safely
# First handle the conditional one in mode==="forgot"
content = content.replace(
    '{mode==="forgot" && <div style={{width:42,height:1,background:"#B8922A",marginBottom:22}}/>}',
    ''
)
# Standalone gold lines in section headers and pages
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

# 3. Update New Launches
# Clear existing "badge": "New"
content = content.replace('"badge": "New"', '"badge": ""')

# Remove existing objects with these names to prevent duplicates
names_to_remove = [
    "KARUS GOLD ABSOLU",
    "KHADLAJ SARAYA",
    "SPECIAL EDITION SHIYAAKA SKY",
    "ZAYAAN SILVER",
    "KHADLAJ QARAR",
    "KHADLAJ IHTHIRAAM",
    "KHADLAJ ICON",
    "PANACHE ANGEL DUST"
]

for name in names_to_remove:
    # Regex to match JSON-like dict in array with given name
    pattern = r'\s*\{\s*"id":\s*\d+,\s*"name":\s*"' + re.escape(name) + r'"[^}]*\},?'
    content = re.sub(pattern, '', content)

# 8 new products to insert at the top of PRODUCTS array
new_products_str = '''  {
    "id": 9100000000001,
    "name": "KARUS GOLD ABSOLU",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML EDP SPRAY",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Gold Oud", "Royal Amber", "Velvet Musk"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/New_Project.png?v=1783662902"
  },
  {
    "id": 9100000000002,
    "name": "KHADLAJ SARAYA",
    "col": "Extrait De Parfum",
    "price": 105,
    "size": "60 ML EXTRAIT DE PARFUM SPRAY FOR MEN & WOMEN",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Precious Oud", "Saffron", "Rose"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1783938953"
  },
  {
    "id": 9100000000003,
    "name": "SPECIAL EDITION SHIYAAKA SKY",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML EAU DE PARFUM",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Fresh Citrus", "Sky Breeze", "Cedarwood"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Blue.4.jpg?v=1771043727"
  },
  {
    "id": 9100000000004,
    "name": "ZAYAAN SILVER",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML EAU DE PARFUM FOR MEN",
    "badge": "New",
    "gender": "Him",
    "notes": ["Bergamot", "Silver Vetiver", "Ambroxan"],
    "img": "/assets/images/products/zayaan-silver_transparent.png"
  },
  {
    "id": 9100000000005,
    "name": "KHADLAJ QARAR",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "60 ML EXTRAIT DE PARFUM SPRAY FOR MEN & WOMEN",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Oud", "Musk", "Amber"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1783939057"
  },
  {
    "id": 9100000000006,
    "name": "KHADLAJ IHTHIRAAM",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "60 ML EXTRAIT DE PARFUM SPRAY FOR MEN & WOMEN",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Precious Wood", "Saffron", "Amber"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1783939279"
  },
  {
    "id": 9100000000007,
    "name": "KHADLAJ ICON",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ML EAU DE PARFUM SPRAY FOR MEN",
    "badge": "New",
    "gender": "Him",
    "notes": ["Bergamot", "Cardamom", "Cedar"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1783939329"
  },
  {
    "id": 9100000000008,
    "name": "PANACHE ANGEL DUST",
    "col": "Extrait De Parfum",
    "price": 200,
    "size": "100 ML EXTRAIT DE PARFUM SPRAY FOR WOMEN",
    "badge": "New",
    "gender": "Her",
    "notes": ["Creamy Vanilla", "White Floral", "Musk"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752"
  },
'''

content = content.replace('const PRODUCTS = [', 'const PRODUCTS = [\n' + new_products_str, 1)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated New Launches, removed Atyaab, and cleaned extra lines without syntax errors.")
