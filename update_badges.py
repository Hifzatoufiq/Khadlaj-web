import re

file_path = "c:\\web\\khadlaj-perfumes (1).jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the PRODUCTS array
start_idx = content.find("const PRODUCTS = [")
end_idx = content.find("];", start_idx)
if start_idx == -1 or end_idx == -1:
    print("Could not find PRODUCTS array.")
    exit(1)

products_block = content[start_idx:end_idx]

lines = products_block.split("\n")
best_seller_count = 0
new_lines = []

for line in lines:
    if "badge:" in line or "badge :" in line:
        # Check if it has Best Seller
        if '"Best Seller"' in line or "'Best Seller'" in line:
            best_seller_count += 1
            if best_seller_count > 6:
                # Replace Best Seller with the gender
                # extract gender
                match = re.search(r'gender:\s*"([^"]+)"', line)
                if match:
                    gender = match.group(1)
                    if gender == "Her":
                        tag = "For Her"
                    elif gender == "Him":
                        tag = "For Him"
                    else:
                        tag = "Unisex"
                    
                    line = re.sub(r'badge:\s*"Best Seller"', f'badge:"{tag}"', line)
                    line = re.sub(r'badge:\s*\'Best Seller\'', f'badge:"{tag}"', line)
    new_lines.append(line)

new_products_block = "\n".join(new_lines)

new_content = content[:start_idx] + new_products_block + content[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Kept 6 Best Sellers. Modified the rest.")
