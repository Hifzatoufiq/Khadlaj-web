import re
import traceback

with open(r'c:\web\khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Find the PRODUCTS array
match = re.search(r'(const PRODUCTS = \[)(.*?)(\n\];)', code, re.DOTALL)
if not match:
    print("Could not find PRODUCTS array.")
    exit(1)

products_str = match.group(2)

# We want to match each object in the array
# Example: { id: 2003, name: "Khadlaj Saraya 60 Ml Extrait De Parfum Spray For Men & Women", col: "Perfume Spray", price: 105.0, size: "100ml EDP", badge: "Best Seller", gender: "Her", notes: ["Bergamot", "Musk", "Oud"], img: "..." }

def process_product(m):
    obj_str = m.group(0)
    
    # Extract name
    name_match = re.search(r'name:\s*"([^"]+)"', obj_str)
    if not name_match: return obj_str
    
    orig_name = name_match.group(1)
    
    # Try to find the size/ml/g in the name
    size_match = re.search(r'(\d+(?:\.\d+)?)\s*(Ml|G|Oz)', orig_name, re.IGNORECASE)
    
    extracted_size = None
    if size_match:
        extracted_size = size_match.group(1) + size_match.group(2).lower()
        
    # Clean the name:
    # Remove things like "60 Ml", "Extrait De Parfum", "Spray", "For Men & Women", "For Men", "For Women", "Eau De Parfum", "Eau Da Parfum"
    new_name = orig_name
    
    # Remove the size
    new_name = re.sub(r'\d+(?:\.\d+)?\s*(Ml|G|Oz)', '', new_name, flags=re.IGNORECASE)
    
    # Remove common filler words
    fillers = [
        r'Extrait De Parfum', r'Eau De Parfum', r'Eau Da Parfum', r'Eau de Parfum',
        r'Perfume Spray', r'Spray', r'For Men & Women', r'For Men And Women',
        r'For Men', r'For Women', r'Perfume Oils', r'Perfume Oil', r'Gift Set',
        r'Air Freshener', r'Discovery Set', r'Pcs Perfumes Collection',
        r'Master Perfumer Collection Edp'
    ]
    for filler in fillers:
        new_name = re.sub(r'\b' + filler + r'\b', '', new_name, flags=re.IGNORECASE)
        
    # Remove extra spaces, hyphens at end, commas
    new_name = re.sub(r'\s+', ' ', new_name).strip(' -,&')
    new_name = re.sub(r'\(\s*\)', '', new_name).strip() # empty parens
    new_name = re.sub(r'\s+', ' ', new_name).strip()
    
    # Now, if we found an extracted size, update the `size: "..."` field
    if extracted_size:
        # Check if the name had "Extrait" or "EDP" to append it to the size
        if re.search(r'extrait', orig_name, re.IGNORECASE):
            extracted_size += " Extrait"
        elif re.search(r'eau d[ea] parfum|edp', orig_name, re.IGNORECASE):
            extracted_size += " EDP"
        elif re.search(r'oil|mukhalat', orig_name, re.IGNORECASE):
            extracted_size += " Oil"
        elif 'g' in extracted_size.lower():
            pass # Keep as is, like "40g"
            
        obj_str = re.sub(r'size:\s*"[^"]+"', f'size: "{extracted_size}"', obj_str)
        
    # Finally, replace the name
    obj_str = re.sub(r'name:\s*"([^"]+)"', f'name: "{new_name}"', obj_str)
    
    return obj_str

try:
    new_products_str = re.sub(r'\{[^{}]+\}', process_product, products_str)
    
    new_code = code[:match.start(2)] + new_products_str + code[match.end(2):]
    
    with open(r'c:\web\khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
        f.write(new_code)
    print("Successfully processed products!")
except Exception as e:
    traceback.print_exc()

