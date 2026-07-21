import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace CreamVelvet-4.jpg (open box) with CreamVelvet-2.jpg (hopefully just bottles)
code = code.replace('CreamVelvet-4.jpg', 'CreamVelvet-2.jpg')

# Replace Nafais-Sharq-3.jpg (open box) with Nafais-Sharq-2.jpg (hopefully just bottles)
code = code.replace('Nafais-Sharq-3.jpg', 'Nafais-Sharq-2.jpg')

# Just in case they were reverted to something else
code = code.replace('CreamVelvet-1.jpg', 'CreamVelvet-2.jpg')
code = code.replace('Nafais-Sharq-1.jpg', 'Nafais-Sharq-2.jpg')

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Images swapped to -2.jpg")
