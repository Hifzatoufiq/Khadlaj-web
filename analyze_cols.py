import re
with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()
cols = re.findall(r'"col":\s*"([^"]+)"', code)
from collections import Counter
print("COLLECTIONS:", Counter(cols).most_common())
genders = re.findall(r'"gender":\s*"([^"]+)"', code)
print("GENDERS:", Counter(genders).most_common())
