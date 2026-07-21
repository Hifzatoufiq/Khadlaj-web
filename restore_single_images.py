import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the wrong gift set images with the correct single perfume CDN images
# We only want to replace them for the SINGLE PERFUMES.
# How do we know it's a single perfume? The name is NOT "GIFT SET".
# Or better, just regex replace inside the single perfume's block!

replacements = {
    "CLOUD CANDY": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1783945979",
    "ISLAND": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724",
    "CREAM VELVET": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094",
    "NAFAIS SHARQ": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NAFAIS-3.jpg?v=1779352739"
}

# The names of the single perfumes are EXACTLY "CLOUD CANDY", "ISLAND", "CREAM VELVET", "NAFAIS SHARQ"
# We can just match the block where name is exactly that string.
for title, new_img in replacements.items():
    pattern = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "img": )"[^"]*"'
    code = re.sub(pattern, r'\g<1>"' + new_img + r'"', code, count=1, flags=re.IGNORECASE)
    
    # Also fix detailImages for the single perfume (if it exists and is an array)
    pattern_detail = r'(    "name": "' + re.escape(title) + r'",[^{}]*?    "detailImages": )\[.*?\]'
    code = re.sub(pattern_detail, r'\g<1>["' + new_img + r'"]', code, count=1, flags=re.IGNORECASE|re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Restored correct images for the single perfumes.")
