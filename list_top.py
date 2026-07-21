import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

best_sellers = []
new_launches = []

# Using regex to extract product name and badge
product_blocks = re.findall(r'\{[^{}]*"name":\s*"([^"]*)",[^{}]*"badge":\s*"([^"]*)"', code)

for name, badge in product_blocks:
    if badge == "Best Seller":
        best_sellers.append(name)
    elif badge == "New":
        new_launches.append(name)

print("BEST SELLERS (Top 6):")
for name in best_sellers[:6]:
    print(name)

print("\nNEW LAUNCHES (Top 7):")
for name in new_launches[:7]:
    print(name)
