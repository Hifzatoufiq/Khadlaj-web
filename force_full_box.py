import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "KHADLAJ SPECIAL MUKHALAT PERFUME OILS - DISCOVERY SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KhadlajSpecial-1_026d234f-e548-4f74-aabb-a497d6153248.jpg?v=1776148221",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-1_4e12f62b-1669-4513-9c53-0515dde14336.jpg?v=1776146949"
}

for title, new_img in replacements.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated Mukhalat and Gourmand to full box")
