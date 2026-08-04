import os

templates_dir = 'khadlaj-theme/templates'
if not os.path.exists(templates_dir):
    os.makedirs(templates_dir)

json_content = '{}'

templates = ['index.json', 'collection.json', 'product.json', 'page.json', '404.json', 'cart.json']

for t in templates:
    with open(os.path.join(templates_dir, t), 'w', encoding='utf-8') as f:
        f.write(json_content)

print("Created empty JSON templates for Shopify routing")
