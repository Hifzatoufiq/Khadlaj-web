import re
import csv

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all items that look like { name: "...", price: ..., img: "..." }
# The format in the file is generally: { id: ..., name: "...", price: ..., img: "..." }
items = re.findall(r'\{\s*(?:id:\s*\d+,\s*)?name:\s*"([^"]+)",(?:[^}]*?)img:\s*"([^"]+)"(?:[^}]*?)\}', content)

# But wait, there are many products, some have single quotes, some don't.
# A more robust regex:
names = re.findall(r'name:\s*["\']([^"\']+)["\']', content)

# Since we just want to create a dummy CSV to populate the store, we can just extract unique names.
unique_names = list(set(names))

# Let's filter out non-products like country names (e.g., "UAE", "UK")
exclude = ['UAE', 'Kuwait', 'India', 'Egypt', 'Malaysia', 'UK', 'USA']
products = [n for n in unique_names if n not in exclude]

csv_rows = []
header = [
    'Handle', 'Title', 'Vendor', 'Type', 'Published',
    'Option1 Name', 'Option1 Value', 'Variant Inventory Tracker',
    'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service',
    'Variant Price', 'Variant Requires Shipping', 'Variant Taxable',
    'Image Src', 'Image Position', 'Status'
]
csv_rows.append(header)

def generate_handle(title):
    return re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

for name in products:
    handle = generate_handle(name)
    title = name
    vendor = 'Khadlaj Perfumes'
    type = 'Perfume'
    published = 'TRUE'
    option1 = 'Title'
    option1v = 'Default Title'
    tracker = 'shopify'
    qty = '100'
    policy = 'deny'
    fulfillment = 'manual'
    price = '150'
    req_ship = 'TRUE'
    taxable = 'TRUE'
    # We don't have the exact image mapped here easily, just leave empty or use a placeholder
    img_src = ''
    status = 'active'
    
    csv_rows.append([
        handle, title, vendor, type, published,
        option1, option1v, tracker, qty, policy, fulfillment,
        price, req_ship, taxable, img_src, '1', status
    ])

with open('products_import.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(csv_rows)

print(f"Generated CSV with {len(products)} products.")
