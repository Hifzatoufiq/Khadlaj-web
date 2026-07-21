import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

names_to_remove = [
    "OUD PURE MAGICAL THAI",
    "ROOHI WA ROOHAK GOLD",
    "ALF WARDAAT",
    "AL FURSAN",
    "AL RIYAN"
]

count = 0
for name in names_to_remove:
    # Match the object in the array
    # { ... "name": "...", ... },
    # Be careful not to delete too much. We can match from { up to }
    pattern = r'\{\s*"id":\s*\d+,\s*"name":\s*"' + re.escape(name) + r'".*?\},?'
    # wait, the object might be at the end of the array without a comma, or have nested arrays
    # using regex for json objects is tricky. Let's just parse the file or do string manipulation.
    
    # Actually, a better way is to use regex with negative lookahead or just find the block.
    # The objects look like:
    #   {
    #     "id": ...,
    #     "name": "OUD PURE MAGICAL THAI",
    #     ...
    #     "img": "..."
    #   },
    
    # A safe regex: match '{' followed by any characters not containing '{', then '"name": "NAME"', then any characters not containing '{', then '},'
    # Wait, the object contains a "notes" array: "notes": [ ... ] so it contains '[' and ']'.
    # Does it contain '{'? No, it's just a flat object except for the array.
    pattern2 = r'\{\s*"id":[^\{]*?"name":\s*"' + re.escape(name) + r'"[^\{]*?\},?'
    
    matches = re.findall(pattern2, code, re.DOTALL)
    for match in matches:
        code = code.replace(match, "")
        count += 1
        print(f"Removed {name}")

# Fix potential trailing commas in arrays
# If an array ends with `, ]`, change it to `]`
code = re.sub(r',\s*\]', '\n  ]', code)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"Removed {count} products.")
