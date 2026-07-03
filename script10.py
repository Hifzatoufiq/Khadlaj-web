import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's completely fix the Hero section for mobile.
# We'll make it 60vh tall on mobile so it's a nice big banner, and ensure the video covers it gracefully.
old_css = """    /* Hero — mobile phones */
    .hero-section {
      height: 75svh !important;
      min-height: 450px !important;
      aspect-ratio: unset !important;
    }"""

new_css = """    /* Hero — mobile phones */
    .hero-section {
      height: 60vh !important;
      min-height: 400px !important;
    }
    .hero-video {
      object-fit: cover !important;
      object-position: center center !important;
    }"""
content = content.replace(old_css, new_css)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
