with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# 1. Update css styles in media queries
old_styles = """    /* Hero adjustments — tablet */
    .hero-section { height: 60vh !important; min-height: 450px !important; aspect-ratio: unset !important; }"""

new_styles = """    /* Hero adjustments — tablet */
    .hero-section { height: 55vh !important; min-height: 380px !important; aspect-ratio: unset !important; }"""

content = content.replace(old_styles, new_styles)

old_mobile_styles = """    /* Hero — mobile phones */
    .hero-section {
      height: 60vh !important;
      min-height: 400px !important;
    }"""

new_mobile_styles = """    /* Hero — mobile phones */
    .hero-section {
      height: 50vh !important;
      min-height: 320px !important;
    }"""

content = content.replace(old_mobile_styles, new_mobile_styles)

# Remove the 100svh height override for max-width:480px
old_480_hero = "    .hero-section { height: 100svh !important; }"
content = content.replace(old_480_hero, "")

# 2. Update inline style in JSX for desktop
old_jsx_hero = '<section className="hero-section" style={{position:"relative",width:"100%",height:"100svh",minHeight:"500px",overflow:"hidden",background:"#0a0a0a"}}>'
new_jsx_hero = '<section className="hero-section" style={{position:"relative",width:"100%",height:"70vh",minHeight:"450px",overflow:"hidden",background:"#0a0a0a"}}>'

content = content.replace(old_jsx_hero, new_jsx_hero)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully reduced hero video size!")
