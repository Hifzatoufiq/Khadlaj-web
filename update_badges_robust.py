import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const PRODUCTS = [')
end_idx = code.find('];\n', start_idx) + 1

if start_idx != -1 and end_idx != -1:
    products_str = code[start_idx:end_idx]
    
    # We can split by '  },\n  {' to process each object, or we can just replace 'badge' conditionally.
    # Actually, we can find all occurrences of "gender": "Him" and "gender": "Her".
    # For each, we go backwards to find "badge": "..." and replace it.
    
    # Let's iterate over all matches of gender
    offset = 0
    while True:
        match = re.search(r'"gender":\s*"(Him|Her)"', products_str[offset:])
        if not match:
            break
            
        gender = match.group(1)
        gender_start = offset + match.start()
        
        # go backwards to find the start of this object
        obj_start = products_str.rfind('{', 0, gender_start)
        # go backwards from gender_start to find 'badge'
        badge_idx = products_str.rfind('"badge"', obj_start, gender_start)
        
        if badge_idx != -1:
            # find the value of badge
            # "badge": "Something"
            badge_match = re.search(r'"badge":\s*"[^"]*"', products_str[badge_idx:gender_start])
            if badge_match:
                old_badge_str = badge_match.group(0)
                new_badge_str = f'"badge": "For {gender}"'
                
                # Replace it in products_str
                # the exact position is badge_idx + badge_match.start()
                replace_start = badge_idx + badge_match.start()
                replace_end = badge_idx + badge_match.end()
                products_str = products_str[:replace_start] + new_badge_str + products_str[replace_end:]
                
                # Update offset to after the new string
                offset = replace_end + 1
            else:
                offset = gender_start + 1
        else:
            # Maybe badge is AFTER gender?
            # Find end of object
            obj_end = products_str.find('}', gender_start)
            badge_idx = products_str.find('"badge"', gender_start, obj_end)
            if badge_idx != -1:
                badge_match = re.search(r'"badge":\s*"[^"]*"', products_str[badge_idx:obj_end])
                if badge_match:
                    old_badge_str = badge_match.group(0)
                    new_badge_str = f'"badge": "For {gender}"'
                    
                    replace_start = badge_idx + badge_match.start()
                    replace_end = badge_idx + badge_match.end()
                    products_str = products_str[:replace_start] + new_badge_str + products_str[replace_end:]
                    offset = replace_end + 1
                else:
                    offset = gender_start + 1
            else:
                offset = gender_start + 1

    code = code[:start_idx] + products_str + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated badges successfully using offset iteration.")
