with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's replace each individual URL directly to avoid indent/whitespace matching issues
content = content.replace(
    'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop'
)

content = content.replace(
    'https://images.unsplash.com/photo-1552689786-8344347c6a0c?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
)

content = content.replace(
    'https://images.unsplash.com/photo-1505236271233-2f5d9d372b64?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop'
)

content = content.replace(
    'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop'
)

# Let's also shorten the descriptions slightly so they look clean in small grid blocks
content = content.replace(
    '"The deep, smoky and animalic soul of luxury Arabic oud."',
    '"The deep, smoky, and precious soul of luxury Arabic blends."'
)
content = content.replace(
    '"Delicate, fresh, and highly aromatic petals from French perfume valleys."',
    '"Delicate, fresh, and highly aromatic petals from French valleys."'
)
content = content.replace(
    '"Rich, golden, and resinous warmth that locks in the fragrance."',
    '"Rich, golden, and resinous warmth that locks in the fragrance."'
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Mosaic images fixed successfully via simple string replace!")
