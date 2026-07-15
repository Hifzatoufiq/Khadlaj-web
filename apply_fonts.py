with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    code = f.read()

replacements = [
    ('fontWeight:800', 'fontWeight:600'),
    ('fontWeight:700', 'fontWeight:600'),
    ('fontWeight:500', 'fontWeight:400'),
    ('fontWeight: 800', 'fontWeight: 600'),
    ('fontWeight: 700', 'fontWeight: 600'),
    ('fontWeight: 500', 'fontWeight: 400'),
]

for old, new in replacements:
    code = code.replace(old, new)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(code)

print("Applied font weights successfully.")
