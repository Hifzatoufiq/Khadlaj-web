import re
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's count how many products have badge: "" or badge: "For Unisex" and are NOT sold out
prods = re.findall(r'"name":\s*"([^"]+)",\s*"col":\s*"([^"]+)",\s*"price":\s*[\d\.]+,\s*"size":\s*"[^"]*",\s*"badge":\s*"([^"]*)"', code)
empty_badges = [p for p in prods if p[2] == "" or p[2] == "For Unisex"]
print(f"Found {len(empty_badges)} empty/unisex badges. First 10:", empty_badges[:10])
