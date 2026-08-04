import re
import codecs

with codecs.open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

prod_start = content.find('const PRODUCTS = [')
prod_end = content.find('\n];', prod_start)
if prod_start == -1 or prod_end == -1:
    prod_end = content.find('\r\n];', prod_start)
    if prod_end == -1:
        print("Could not find PRODUCTS array")
        exit(1)

array_str = content[prod_start:prod_end]

pattern = r'\{\s*"id":\s*\d+,\s*"name":\s*"[^"]*(?:ISLAND|SAWAAR|SHIYAAKA)[^"]*".*?\}'

matches = list(re.finditer(pattern, array_str, flags=re.DOTALL | re.IGNORECASE))

extracted = []
for m in reversed(matches):
    start = m.start()
    end = m.end()
    
    block = array_str[start:end]
    extracted.append(block)
    
    comma_match = re.match(r'\s*,', array_str[end:])
    if comma_match:
        array_str = array_str[:start] + array_str[end + comma_match.end():]
    else:
        array_str = array_str[:start] + array_str[end:]

extracted.reverse()

new_top = ',\n  '.join(extracted)
if new_top:
    new_top += ',\n  '

insert_idx = array_str.find('[') + 1
final_array_str = array_str[:insert_idx] + '\n  ' + new_top + array_str[insert_idx:].lstrip()

final_array_str = re.sub(r',\s*,', ',', final_array_str)

content = content[:prod_start] + final_array_str + content[prod_end:]

with codecs.open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Extracted {len(extracted)} items and moved to top.")
