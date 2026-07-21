import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

names = ['OUD PURE MAGICAL THAI','DEHNAL OUD QAISAR SEUFI','DEHNAL OUD SHEIKH QADIM','OUD MUATTAR QISSA','OUD MUATTAR RUKAIYA','OUD MUATTAR AL BAHAAR','FRASH HAREEM AL SULTAN','OUD MUATTAR MAAMUL HANEEN','OUD MUATTAR MAAMUL WARDI','OUD MUATTAR MAAMUL DAHABI','FRASH AFTER ECSTACY']

for n in names:
    match = re.search(r'"name":\s*"([^"\n]*?' + n + r'[^"\n]*)"', code)
    if match:
        print(f'"{match.group(1)}",')
