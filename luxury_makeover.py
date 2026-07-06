with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# 1. Update GLOBAL_CSS with luxury text gradient, button shimmer, and grid hover effects
old_css_end = "  input,textarea{font-family:'Montserrat',sans-serif;}\n`;"
new_css_end = """  input,textarea{font-family:'Montserrat',sans-serif;}

  /* Luxury Gold Metallic text gradient */
  .luxury-gold-text {
    background: linear-gradient(135deg, #CFB53B 0%, #D4AF37 40%, #F3E5AB 60%, #AA7C11 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  /* Shimmer sweep effect on hover for primary & ghost buttons */
  .btn-gold, .btn-ghost, .btn-shimmer, button[style*="cursor"] {
    position: relative;
    overflow: hidden;
  }
  .btn-gold::after, .btn-ghost::after, .btn-shimmer::after, button[style*="cursor"]::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    transition: none;
  }
  .btn-gold:hover::after, .btn-ghost:hover::after, .btn-shimmer:hover::after, button[style*="cursor"]:hover::after {
    left: 160%;
    transition: left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;"""

content = content.replace(old_css_end, new_css_end)

# 2. Make Sticky Navbar look like modern glassmorphism
old_navbar_style = """      {/* ── Main nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"#fff",boxShadow:"0 2px 12px rgba(0,0,0,.04)",borderBottom:"1px solid #E8E4DC"}}>"""

new_navbar_style = """      {/* ── Main nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",boxShadow:"0 4px 30px rgba(0,0,0,0.03)",borderBottom:"1px solid rgba(232,228,220,0.5)",transition:"all 0.3s"}}>"""

content = content.replace(old_navbar_style, new_navbar_style)

# 3. Apply the luxury-gold-text class to critical italicized headings
content = content.replace(
    'Provide the Best</em>',
    'Provide the Best</em>' # Wait, let's replace the whole tag
)

# Let's replace the specific lines directly
content = content.replace(
    '<em style={{fontStyle:"italic",color:"#B8922A"}}>Provide the Best</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>Provide the Best</em>'
)

content = content.replace(
    '<em style={{color:"#B8922A",fontStyle:"italic"}}>French Perfumery</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>French Perfumery</em>'
)

content = content.replace(
    '<em style={{fontStyle:"italic",color:"#B8922A"}}>Arrivals</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>Arrivals</em>'
)

content = content.replace(
    '<em style={{fontStyle:"italic",color:"#B8922A"}}>Gift Collections</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>Gift Collections</em>'
)

content = content.replace(
    '<em style={{fontStyle:"italic",color:"#B8922A"}}>Khadlaj</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>Khadlaj</em>'
)

content = content.replace(
    '<em style={{fontStyle:"italic",color:"#B8922A"}}>Scent Finder</em>',
    '<em className="luxury-gold-text" style={{fontStyle:"italic"}}>Scent Finder</em>'
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully applied luxury makeovers!")
