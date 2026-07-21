import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updates = {
    "OUD PURE MAGICAL THAI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Magical_Thai_02.jpg?v=1748419221",
    "DEHNAL OUD QAISAR SEUFI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_OAISAR_SEUFI-3.jpg?v=1748414554",
    "DEHNAL OUD SHEIKH QADIM": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_SHEIKH_OADIM-3.jpg?v=1748412272",
    "OUD MUATTAR QISSA": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Qissa-03.jpg?v=1745839937",
    "OUD MUATTAR RUKAIYA": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_6f08c36e-4beb-4b09-bdf6-fb68dd7b8427.jpg?v=1743684612",
    "OUD MUATTAR AL BAHAAR": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_a39244be-9fb7-4336-8e0c-7a6b8d964e4c.jpg?v=1743683567",
    "FRASH HAREEM AL SULTAN AIR FRESHENER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_HAREEM_AL_SULTAN_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964518.jpg?v=1722409478",
    "OUD MUATTAR MAAMUL HANEEN": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_HANEEN_48_G_-_Khadlaj_Perfumes-1965670.jpg?v=1722411593",
    "OUD MUATTAR MAAMUL WARDI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_WARDI_48_G_-_Khadlaj_Perfumes-1965681.jpg?v=1722411615",
    "OUD MUATTAR MAAMUL DAHABI": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_DAHABI_48_G_-_Khadlaj_Perfumes-1965659.jpg?v=1722411572",
    "FRASH AFTER ECSTACY AIR FRESHENER": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_ASTER_ECSTACY_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964483.jpg?v=1722409420"
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
