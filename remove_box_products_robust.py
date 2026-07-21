import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

names_to_remove = ['FRASH QISSA ESHQ', 'FRASH QISSA TURQUOISE', 'FRASH SARA', 'OUD HIND', 'JUMEIRAH', 'BAHRAINI', 'KUWAITI', 'FAZAA', 'BAKHOOR IZZ']

out_lines = []
skip = False
brace_level = 0
buffer = []

for line in lines:
    if not skip:
        if '{"id"' in line.replace(' ', ''):
            # This might be the start of a product
            # Let's see if this line is literally '  {\n' or '  {\n    "id": ...'
            pass
            
    # Better approach: Since we know the exact line structure:
    #   {
    #     "id": ...,
    #     "name": "FRASH QISSA ESHQ AIR FRESHENER",
    #     ...
    #   },
    pass

# Let's just find the index of '"name": "..."' where name matches
code = "".join(lines)
for name in names_to_remove:
    while True:
        # Find the name in the code
        match = re.search(r'"name":\s*"[^"]*' + name.replace(' ', r'\s+') + r'[^"]*"', code, re.IGNORECASE)
        if not match:
            break
            
        name_idx = match.start()
        
        # Find the start of the object (the nearest '{' before name_idx)
        start_idx = code.rfind('{', 0, name_idx)
        
        # Find the end of the object
        # Since objects are top level in the array, we can track braces
        brace_count = 1
        curr_idx = start_idx + 1
        while brace_count > 0 and curr_idx < len(code):
            if code[curr_idx] == '{':
                brace_count += 1
            elif code[curr_idx] == '}':
                brace_count -= 1
            curr_idx += 1
            
        end_idx = curr_idx
        
        # also consume the comma and whitespace after it if present
        while end_idx < len(code) and code[end_idx] in ' \t\r\n,':
            end_idx += 1
            
        # remove it
        code = code[:start_idx] + code[end_idx:]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Removed products by tracking braces.")
