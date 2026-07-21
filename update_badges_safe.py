import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Remove KHADLAJ ISLAND DREAMS
out_lines = []
skip = False
brace_level = 0
for i, line in enumerate(lines):
    if not skip:
        # Check if this line is the start of an object and has our name shortly after
        if '"name": "KHADLAJ ISLAND DREAMS",' in line:
            # wait, this line ITSELF is the name, we need to skip backwards to the '{'
            pass

# Since parsing lines backwards is annoying, let's just use string replacement on the whole file
import re
code = "".join(lines)

# Remove KHADLAJ ISLAND DREAMS
name_to_remove = 'KHADLAJ ISLAND DREAMS'
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

# 2. Update badges for Him and Her
lines = code.split('\n')
for i in range(len(lines)):
    line = lines[i]
    if '"gender": "Him"' in line:
        # look up for badge
        for j in range(i-1, max(-1, i-5), -1):
            if '"badge":' in lines[j]:
                lines[j] = re.sub(r'"badge":\s*"[^"]*"', r'"badge": "For Him"', lines[j])
                break
    elif '"gender": "Her"' in line:
        # look up for badge
        for j in range(i-1, max(-1, i-5), -1):
            if '"badge":' in lines[j]:
                lines[j] = re.sub(r'"badge":\s*"[^"]*"', r'"badge": "For Her"', lines[j])
                break

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Updated badges and removed KHADLAJ ISLAND DREAMS safely.")
