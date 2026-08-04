import re

file_path = 'khadlaj-perfumes (1).jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace "name": "KHADLAJ ...
matches = re.findall(r'"name":\s*"KHADLAJ\s+(.*?)"', content, re.IGNORECASE)
print('Found names:', len(matches))

new_content = re.sub(r'"name":\s*"KHADLAJ\s+', '"name": "', content, flags=re.IGNORECASE)

# Popularity map:
pop_matches = re.findall(r'"KHADLAJ\s+(.*?)"\s*:\s*\d+\.\d+', new_content, re.IGNORECASE)
print('Found popularity keys:', len(pop_matches))

new_content = re.sub(r'"KHADLAJ\s+(.*?)"\s*:\s*(\d+\.\d+)', r'"\1": \2', new_content, flags=re.IGNORECASE)

# Unquoted name keys (like name: "KHADLAJ...")
unquoted_matches = re.findall(r'name:\s*"KHADLAJ\s+(.*?)"', new_content, re.IGNORECASE)
print('Found unquoted name keys:', len(unquoted_matches))

new_content = re.sub(r'name:\s*"KHADLAJ\s+', 'name: "', new_content, flags=re.IGNORECASE)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done replacing.')
