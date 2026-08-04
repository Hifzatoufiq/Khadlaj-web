import json
import re
import csv

# We need to extract the `products` array from khadlaj-perfumes (1).jsx
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find the products array using regex or simple parsing
match = re.search(r'const products\s*=\s*(\[.*?\]);\s*const collectionsData', content, re.DOTALL)
if match:
    products_json_str = match.group(1)
    
    # It's JS, not strict JSON (missing quotes on keys, etc). Let's convert to valid JSON.
    # It's easier to just use node to evaluate it and write a JSON file.
    node_script = """
    const fs = require('fs');
    const content = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf-8');
    const match = content.match(/const products\s*=\s*(\\[.*?\\]);\\s*const collectionsData/s);
    if(match){
        const productsStr = match[1];
        // Evaluate the string to get the array
        const products = eval(productsStr);
        fs.writeFileSync('parsed_products.json', JSON.stringify(products, null, 2));
    }
    """
    with open('parse_products.js', 'w', encoding='utf-8') as f2:
        f2.write(node_script)
