import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# We will swap the main `img` property of the 4 gift sets to the purely cropped versions!
# Island -> ./assets/images/products/island_gift_set_nobox.jpg
# Cloud Candy -> ./assets/images/products/cloud_candy_gift_set_nobox.jpg
# Cream Velvet -> ./assets/images/products/creamvelvet_gift_set_nobox.jpg
# Gourmand -> TheGourmandCollection-4 (let's try 4, if it has no box).

replacements = {
    "KHADLAJ ISLAND GIFT SET FOR HIM & HER": "./assets/images/products/island_gift_set_nobox.jpg",
    "KHADLAJ CLOUD CANDY GIFT SET": "./assets/images/products/cloud_candy_gift_set_nobox.jpg",
    "CREAM VELVET GIFT SET": "./assets/images/products/creamvelvet_gift_set_nobox.jpg",
    "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-4_b312994b-4740-40ef-b26d-52e29e7b094a.jpg?v=1776146949"
}

for title, new_img in replacements.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated the main image to the pure nobox versions.")
