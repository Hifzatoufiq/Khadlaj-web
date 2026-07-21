import re
import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove KHADLAJ ISLAND DREAMS
name_to_remove = 'KHADLAJ ISLAND DREAMS'
# Find the start of the object and the end
while True:
    match = re.search(r'"name":\s*"' + name_to_remove + r'"', code)
    if not match:
        break
    
    name_idx = match.start()
    start_idx = code.rfind('{', 0, name_idx)
    
    brace_count = 1
    curr_idx = start_idx + 1
    while brace_count > 0 and curr_idx < len(code):
        if code[curr_idx] == '{':
            brace_count += 1
        elif code[curr_idx] == '}':
            brace_count -= 1
        curr_idx += 1
        
    end_idx = curr_idx
    while end_idx < len(code) and code[end_idx] in ' \t\r\n,':
        end_idx += 1
        
    code = code[:start_idx] + code[end_idx:]

# 2. Update badges for "Him" and "Her"
# Regex to find: "badge": "...", \s* "gender": "Him"
# Since they can be in any order, we just find all objects and if it has gender Him/Her, we change the badge.

# Let's extract the PRODUCTS array string
start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1

if start_idx != -1 and end_idx != -1:
    products_str = code[start_idx:end_idx]
    
    # We will split by },\n or similar? No, better use re.sub with a function
    # Find all objects: { ... } inside products_str
    
    def replacer(m):
        obj_str = m.group(0)
        # Check gender
        gender_match = re.search(r'"gender":\s*"([^"]+)"', obj_str)
        if gender_match:
            gender = gender_match.group(1)
            if gender == "Him":
                obj_str = re.sub(r'"badge":\s*"[^"]*"', r'"badge": "For Him"', obj_str)
            elif gender == "Her":
                obj_str = re.sub(r'"badge":\s*"[^"]*"', r'"badge": "For Her"', obj_str)
        return obj_str
    
    # regex for an object in PRODUCTS: starts with { and ends with }, but there are nested arrays (notes).
    # Since products are flat at the top level except for arrays, we can match:
    # {\n\s+"id":.*?\]\s*\}
    
    new_products_str = re.sub(r'\{\s*"id":.*?\]\n\s*\}', replacer, products_str, flags=re.DOTALL)
    
    code = code[:start_idx] + new_products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated badges and removed KHADLAJ ISLAND DREAMS.")
