with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove lines 1610-1623 (0-indexed: 1609-1622) — "Build Your Own Gift Box" section
del lines[1609:1623]

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Done! Removed Build Your Own Gift Box section')
