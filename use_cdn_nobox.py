import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "KHADLAJ ISLAND GIFT SET FOR HIM & HER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg",
    "KHADLAJ CLOUD CANDY GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1783945979",
    "CREAM VELVET GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-4_b312994b-4740-40ef-b26d-52e29e7b094a.jpg?v=1776146949"
}

for title, new_img in replacements.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated the main image to the direct Khadlaj CDN single bottle (without box).")
