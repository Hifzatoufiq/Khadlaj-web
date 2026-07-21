import urllib.request
import json
import re

# 1. Fetch the 4 products
url = 'https://khadlaj-perfumes.com/collections/master-perfumer-creation-collection/products.json?limit=250'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    master_products = json.loads(response.read().decode())['products']

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 2. Update filtering logic in CollectionsPage and HomePage
# For Atyaab, map to Perfume Oils
# For EAU DE PARFUM, case insensitive
# For Master Perfumery, just match Master Perfumery

# Let's fix HomePage filtering:
hp_filter_old = r'    if\(activeCat==="Unisex"\) return isKhadlajProduct && p.gender==="Unisex";\n    return isKhadlajProduct && \(p.col \|\| \'\'\).toLowerCase\(\) === activeCat.toLowerCase\(\);'
hp_filter_new = """    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    if(activeCat==="Atyaab") return isKhadlajProduct && (p.col==="Perfume Oils" || p.col==="Atyaab");
    if(activeCat==="EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
    if(activeCat==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";
    return isKhadlajProduct && (p.col || '').toLowerCase() === activeCat.toLowerCase();"""
code = re.sub(hp_filter_old, hp_filter_new, code)

# Let's fix CollectionsPage filtering (we previously added Extrait De Parfum to Master Perfumery)
cp_filter_old = r'if\(activeCat==="Master Perfumery"\) return isKhadlajProduct && \(p.col==="Extrait De Parfum" \|\| p.col==="Master Perfumery"\);'
cp_filter_new = r'if(activeCat==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";'
code = code.replace(
    'if(activeCat==="Master Perfumery") return isKhadlajProduct && (p.col==="Extrait De Parfum" || p.col==="Master Perfumery");',
    'if(activeCat==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";'
)

# Also fix the sidebar counts
sidebar_count_old = r'if\(c==="Master Perfumery"\) return isKhadlajProduct && \(p.col==="Extrait De Parfum" \|\| p.col==="Master Perfumery"\);'
code = code.replace(
    'if(c==="Master Perfumery") return isKhadlajProduct && (p.col==="Extrait De Parfum" || p.col==="Master Perfumery");',
    'if(c==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";'
)


# 3. Add or update the 4 Master Perfumery products in the PRODUCTS array
start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1
products_str = code[start_idx+17:end_idx]

for p in master_products:
    title = p['title'].upper()
    # If the product exists in products_str, update its col to "Master Perfumery"
    match = re.search(r'"name":\s*"' + re.escape(title) + r'"', products_str)
    if match:
        obj_start = products_str.rfind('{', 0, match.start())
        obj_end = products_str.find('}', match.start())
        # Replace col
        obj_str = products_str[obj_start:obj_end]
        obj_str = re.sub(r'"col":\s*"[^"]*"', r'"col": "Master Perfumery"', obj_str)
        products_str = products_str[:obj_start] + obj_str + products_str[obj_end:]
    else:
        # Product not found, we must add it!
        # Try to clean up the name
        name = title.replace(' 60 ML MASTER PERFUMER COLLECTION EDP SPRAY FOR MEN & WOMEN', '').replace(' 60 ML EDP SPRAY', '')
        
        # We also want to check if the clean name exists
        match_clean = re.search(r'"name":\s*"' + re.escape(name) + r'"', products_str)
        if match_clean:
            obj_start = products_str.rfind('{', 0, match_clean.start())
            obj_end = products_str.find('}', match_clean.start())
            # Replace col
            obj_str = products_str[obj_start:obj_end]
            obj_str = re.sub(r'"col":\s*"[^"]*"', r'"col": "Master Perfumery"', obj_str)
            products_str = products_str[:obj_start] + obj_str + products_str[obj_end:]
        else:
            # Inject it
            price = float(p['variants'][0]['price']) if p.get('variants') else 150
            img = p['images'][0]['src'] if p.get('images') else ''
            
            # Since these are Master Perfumery, we know some properties
            gender = "Unisex"
            if "MEN & WOMEN" not in title:
                if "MEN" in title: gender = "Him"
                if "WOMEN" in title: gender = "Her"
            
            new_obj = f"""  {{
    "id": {p['id']},
    "name": "{name}",
    "col": "Master Perfumery",
    "price": {price},
    "size": "60ml EDP",
    "badge": "For {gender}",
    "gender": "{gender}",
    "notes": ["Oud", "Woody", "Amber"],
    "img": "{img}"
  }},
"""
            products_str = '\n' + new_obj + products_str

code = code[:start_idx+17] + products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated filters and Master Perfumery products.")
