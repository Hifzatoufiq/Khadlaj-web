with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Replace the incorrect/broken Unsplash URLs in the 2x2 Ingredient Mosaic with beautiful, guaranteed high-quality luxury perfume-related imagery.
old_mosaic_block = """          {/* Right Column: 2x2 Ingredient Mosaic */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:12, padding:"30px", background:"#050505", minHeight:"450px"}}>
            {[
              { title: "Pure Oud", img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=500&auto=format&fit=crop", desc: "The deep, smoky and animalic soul of luxury Arabic oud." },
              { title: "Damask Rose", img: "https://images.unsplash.com/photo-1552689786-8344347c6a0c?q=80&w=500&auto=format&fit=crop", desc: "Delicate, fresh, and highly romantic petals from French perfume valleys." },
              { title: "Warm Amber", img: "https://images.unsplash.com/photo-1505236271233-2f5d9d372b64?q=80&w=500&auto=format&fit=crop", desc: "Rich, golden, and resinous warmth that locks in the fragrance." },
              { title: "White Musk", img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=500&auto=format&fit=crop", desc: "Clean, sensual, and powdery soft base note for a lasting signature trail." }
            ].map((ing, i) => ("""

new_mosaic_block = """          {/* Right Column: 2x2 Ingredient Mosaic */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:12, padding:"30px", background:"#050505", minHeight:"450px"}}>
            {[
              { title: "Pure Oud", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop", desc: "The deep, smoky, and precious soul of luxury Arabic blends." },
              { title: "Damask Rose", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", desc: "Delicate, fresh, and highly aromatic petals from French valleys." },
              { title: "Warm Amber", img: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop", desc: "Rich, golden, and resinous warmth that locks in the fragrance." },
              { title: "White Musk", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop", desc: "Clean, sensual, and powdery soft base note for a lasting signature trail." }
            ].map((ing, i) => ("""

if old_mosaic_block in content:
    content = content.replace(old_mosaic_block, new_mosaic_block)
    print("Successfully updated mosaic images!")
else:
    print("Could not find the target mosaic block.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
