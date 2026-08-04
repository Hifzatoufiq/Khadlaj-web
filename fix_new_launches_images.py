import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Also fix the TikTok review image for Panache so it doesn't use Island1.jpg
content = content.replace('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752', '/assets/images/products/panache-cutout.png')

# Update the images of the 8 inserted products at the top of PRODUCTS array
replacements = [
    ("KARUS GOLD ABSOLU", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/New_Project.png?v=1783662902", "/assets/images/products/karus-cutout.png"),
    ("KHADLAJ SARAYA", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1783938953", "/assets/images/products/saraya-cutout.png"),
    ("SPECIAL EDITION SHIYAAKA SKY", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Blue.4.jpg?v=1771043727", "/assets/images/products/shiyaaka-cutout.png"),
    ("ZAYAAN SILVER", "/assets/images/products/zayaan-silver_transparent.png", "/assets/images/products/zayaan-silver_transparent.png"),
    ("KHADLAJ QARAR", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1783939057", "/assets/images/products/qarar-cutout.png"),
    ("KHADLAJ IHTHIRAAM", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1783939279", "/assets/images/products/ihthiraam-cutout.png"),
    ("KHADLAJ ICON", "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1783939329", "/assets/images/products/icon-cutout.png"),
    ("PANACHE ANGEL DUST", "/assets/images/products/panache-cutout.png", "/assets/images/products/panache-cutout.png"),
]

for name, old_img, new_img in replacements:
    # Find the block for this product in the top definitions and replace its img
    # Since we know the name is in the dict, let's do regex replacement for img inside that block
    pattern = r'(\{\s*"id":\s*\d+,\s*"name":\s*"' + re.escape(name) + r'".*?"img":\s*")[^"]+("' + r'\s*\})'
    content = re.sub(pattern, r'\1' + new_img + r'\2', content, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated all 8 New Launches to use clean without-box cutout images.")
