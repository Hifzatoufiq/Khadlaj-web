with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Find the ProductCard's main style wrapper and add height: "100%"
old_style = """      style={{
        background:"transparent",
        display:"flex",
        flexDirection:"column",
        position:"relative",
        cursor:"pointer",
        border: "none",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}"""

new_style = """      style={{
        background:"transparent",
        display:"flex",
        flexDirection:"column",
        height:"100%",
        position:"relative",
        cursor:"pointer",
        border: "none",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}"""

if old_style in content:
    content = content.replace(old_style, new_style)
    print("Successfully fixed product cards alignment by adding height 100%!")
else:
    print("Could not find the target ProductCard style.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
