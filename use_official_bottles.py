import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    "KHADLAJ SPECIAL MUKHALAT PERFUME OILS": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Khadlajspecial-4_edc479bd-a643-4a70-b9b9-b67884cb3ad4.jpg?v=1776148221",
    "THE GOURMAND COLLECTION BY KHADLAJ": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-4_b312994b-4740-40ef-b26d-52e29e7b094a.jpg?v=1776146949",
    "PANACHE ANGEL DUST": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_4_jpg_9a48384b-07d9-4332-9446-3afd35eb42ac.jpg?v=1771334327",
    "OUD MUATTAR BAHRAINI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Copy_of_OudMuattarBahraini.3.png?v=1771070678",
    "OUD MUATTAR KUWAITI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CopyofOudMuattarKuwaiti.4_d17eb7b5-4810-4d9c-be13-3397010d78bb.png?v=1771069657",
    "CREAM VELVET GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094",
    "NAFAIS SHARQ GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NAFAIS-3.jpg?v=1783943403",
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Huroof_Gift_Box-04.jpg?v=1761565412",
    "GRAND COLLECTION 3 PIECES GIFT SET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/GrandGiftBox-03_3165934b-a570-4842-a425-aa3586ebf9ff.jpg?v=1756378107",
    "ISLAND GIFT SET FOR HIM & HER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724"
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
        print("Set pure bottle official URL for:", clean_title)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated {updated} products to use official pure bottle images from the website.")
