import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

updates = {
    "PANACHE ANGEL DUST": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_2_jpg_0bc7a1f3-8af9-4188-98f1-c58151159f55.jpg?v=1771333283",
    "RASAYEL SHAGAF": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_ab0ed6b5-ec07-4047-93e1-f6fa159c44df.jpg?v=1776230769",
    "RASAYEL VID": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_6aa7eaae-bcbe-487e-9be0-0aea3cc91b93.jpg?v=1776230721"
}

for name, new_img in updates.items():
    # Find the object with this name
    match = re.search(r'"name":\s*"' + re.escape(name) + r'".*?"img":\s*"([^"]+)"', code, re.DOTALL)
    if match:
        old_img = match.group(1)
        # replace just the img part for this specific object
        obj_text = match.group(0)
        new_obj_text = obj_text.replace(old_img, new_img)
        code = code.replace(obj_text, new_obj_text)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated 3 images.")
