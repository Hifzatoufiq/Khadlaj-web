import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updates = {
    "PANACHE ANGEL DUST": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_4_jpg_9a48384b-07d9-4332-9446-3afd35eb42ac.jpg?v=1771334327",
    "OUD PURE MAGICAL THAI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Magical_Thai_03.jpg?v=1748419167",
    "JOHAYNA PURPLE": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_c65ff337-7d6f-4807-aba0-e617570abc93.jpg?v=1737811492",
    "ANABIA RED": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/4_0d518155-87a3-4775-9fb3-92c952c6e4fa.jpg?v=1737806598",
    "ARABIAN TREASURE": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_6cff4d8f-5f86-4355-9a5d-abb81a740c00.jpg?v=1736916084",
    "ANABIA BLUE": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_0fda46e3-b76b-4eeb-86d0-70981ce7cb19.jpg?v=1732252986",
    "OUD & MUSK": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_60f1207b-0529-4e44-903b-5b75f67b8184.jpg?v=1725714648",
    "JOHAYNA GREEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_19.jpg?v=1724745977",
    "KAYAAN SILVER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_SILVER_20_ML_-_Khadlaj_Perfumes-1964884.png?v=1722410054",
    "KAYAAN GOLD": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_GOLD_20_ML_-_Khadlaj_Perfumes-1964865.jpg?v=1722410025",
    "MALIKA GREEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_GREEN_20_ML_-_Khadlaj_Perfumes-1965384.jpg?v=1722411061",
    "MALIKA RED": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_RED_20_ML_-_Khadlaj_Perfumes-1965402.jpg?v=1722411093",
    "PINK MUSK": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PINK_MUSK_20_ML_-_Khadlaj_Perfumes-1965776.jpg?v=1722411810",
    "PURPLE MUSK": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURPLE_MUSK_20_ML_-_Khadlaj_Perfumes-1965796.jpg?v=1722411845"
}

count = 0
for name, new_img in updates.items():
    match = re.search(r'"name":\s*"' + re.escape(name) + r'".*?"img":\s*"([^"]+)"', code, re.DOTALL)
    if match:
        old_img = match.group(1)
        obj_text = match.group(0)
        new_obj_text = obj_text.replace(old_img, new_img)
        code = code.replace(obj_text, new_obj_text)
        count += 1

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Updated {count} images.")
