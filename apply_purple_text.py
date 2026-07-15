with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    code = f.read()

replacements = [
    ('color:"#000"', 'color:"#3c1152"'),
    ('color: "#000"', 'color: "#3c1152"'),
    ('color:"#111"', 'color:"#3c1152"'),
    ('color: "#111"', 'color: "#3c1152"'),
    ('border:"1px solid #111"', 'border:"1px solid #3c1152"'),
    ('border: "1px solid #111"', 'border: "1px solid #3c1152"'),
    ('e.target.style.color="#111"', 'e.target.style.color="#3c1152"'),
    ('e.currentTarget.style.color="#000"', 'e.currentTarget.style.color="#3c1152"')
]

for old, new in replacements:
    code = code.replace(old, new)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Applied global purple text and borders successfully.")
