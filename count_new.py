with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()
import re
print("New badges:", len(re.findall(r'"badge":\s*"New"', code)))
