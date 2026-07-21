import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "PANACHE ANGEL DUST": "./assets/images/products/panache_nobox.png",
    "OUD MUATTAR BAHRAINI": "./assets/images/products/bahraini_nobox.png",
    "OUD MUATTAR KUWAITI": "./assets/images/products/kuwaiti_nobox.png",
    "CREAM VELVET GIFT SET": "./assets/images/products/creamvelvet_gift_set_nobox.jpg",
    "ISLAND GIFT SET FOR HIM & HER": "./assets/images/products/island_gift_set_nobox.jpg",
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET": "./assets/images/products/huroof_gift_set_nobox.jpg",
    "GRAND COLLECTION 3 PIECES GIFT SET": "./assets/images/products/grand_gift_set_nobox.jpg",
    "NAFAIS SHARQ GIFT SET": "./assets/images/products/nafais_gift_set_nobox.jpg"
}

updated = 0
for title, new_img in replacements.items():
    clean_title = title
    if "CREAM" in title: clean_title = "CREAM VELVET GIFT SET"
    elif "NAFAIS" in title: clean_title = "NAFAIS SHARQ GIFT SET"
    elif "ISLAND" in title: clean_title = "ISLAND GIFT SET FOR HIM & HER"
    elif "HUROOF" in title: clean_title = "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET"
    elif "GRAND" in title: clean_title = "GRAND COLLECTION 3 PIECES GIFT SET"
    
    pattern = r'(    "name": "' + re.escape(clean_title) + r'",[^{}]*?    "img": )"[^"]*"'
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)
        updated += 1
        print("Re-applied crop for:", clean_title)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated {updated} products to use cropped images again.")
