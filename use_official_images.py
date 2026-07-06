with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the Unsplash URLs in the 2x2 Ingredient Mosaic with Khadlaj's official Shopify perfume bottle images
content = content.replace(
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_OUD_FIRE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964843.jpg?v=1722409981'
)

content = content.replace(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-3.jpg?v=1760188227'
)

content = content.replace(
    'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291'
)

content = content.replace(
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965450.jpg?v=1722411181'
)

# Set the object-fit style of these images inside the map function to contain (so they don't get cut off, and show the luxury bottles fully)
content = content.replace(
    'objectFit: "cover"',
    'objectFit: "contain", background: "#fff", padding: "10px"'
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully replaced mosaic images with official Khadlaj Shopify images!")
