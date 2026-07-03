import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix mobile responsiveness for the Hero video to be a tall banner, not a squished 16:9 box
old_css = """    /* Hero — mobile phones */
    .hero-section {
      height: auto !important;
      min-height: unset !important;
      aspect-ratio: 16 / 9 !important;
    }"""

new_css = """    /* Hero — mobile phones */
    .hero-section {
      height: 75svh !important;
      min-height: 450px !important;
      aspect-ratio: unset !important;
    }"""
content = content.replace(old_css, new_css)

# Update tablet as well to a balanced height
old_css_tablet = """    /* Hero adjustments — tablet */
    .hero-section { height: auto !important; min-height: unset !important; aspect-ratio: 16 / 9 !important; }"""

new_css_tablet = """    /* Hero adjustments — tablet */
    .hero-section { height: 60vh !important; min-height: 450px !important; aspect-ratio: unset !important; }"""
content = content.replace(old_css_tablet, new_css_tablet)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
