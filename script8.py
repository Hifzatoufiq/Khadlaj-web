import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the white border on the Master Perfumery black section
old_section = 'style={{position:"relative",overflow:"hidden",zIndex:0,background:"#050505",padding:"0",borderTop:"1px solid #E8E4DC"}}'
new_section = 'style={{position:"relative",overflow:"hidden",zIndex:0,background:"#050505",padding:"0",borderTop:"none"}}'
content = content.replace(old_section, new_section)

# 2. Fix mobile responsiveness for the Hero video
old_css = """    /* Hero — mobile phones */
    .hero-section {
      height: 100svh !important;
      min-height: -webkit-fill-available !important;
    }"""

new_css = """    /* Hero — mobile phones */
    .hero-section {
      height: auto !important;
      min-height: unset !important;
      aspect-ratio: 16 / 9 !important;
    }"""
content = content.replace(old_css, new_css)

# Also fix the tablet responsiveness for Hero video just in case
old_css_tablet = """    /* Hero adjustments — tablet */
    .hero-section { height: 80vh !important; min-height: 520px !important; }"""

new_css_tablet = """    /* Hero adjustments — tablet */
    .hero-section { height: auto !important; min-height: unset !important; aspect-ratio: 16 / 9 !important; }"""
content = content.replace(old_css_tablet, new_css_tablet)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
