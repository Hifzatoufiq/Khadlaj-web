with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    code = f.read()

replacements = [
    ('background:"#000"', 'background:"#3c1152"'),
    ('background: "#000"', 'background: "#3c1152"'),
    ('background=\\"#000\\"', 'background=\\"#3c1152\\"'),
    ('e.currentTarget.style.background="#000"', 'e.currentTarget.style.background="#3c1152"'),
    ('e.currentTarget.style.background = "#000"', 'e.currentTarget.style.background = "#3c1152"'),
    ('accentColor:"#000"', 'accentColor:"#3c1152"'),
    # Also replace #111 in buttons if they exist
    ('background:"#111"', 'background:"#3c1152"'),
    ('background: "#111"', 'background: "#3c1152"')
]

for old, new in replacements:
    code = code.replace(old, new)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Applied global purple successfully.")
