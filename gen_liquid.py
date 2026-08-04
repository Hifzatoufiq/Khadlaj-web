import os

theme_dir = 'khadlaj-liquid-theme'

header_liquid = '''<header style="width:100%; height:90px; background:#fff; position:sticky; top:0; z-index:99; display:flex; align-items:center; justify-content:space-between; padding:0 40px; box-shadow:0 1px 15px rgba(0,0,0,0.03);">
  <img src="https://hifzatoufiq.github.io/Khadlaj-web/assets/images/khadlaj-logo-new-4.png" style="height:45px;" alt="Logo" />
  <nav style="display:flex; gap:35px; align-items:center;">
    <a href="/" style="text-decoration:none; color:#222; font-size:0.8rem; font-weight:500; letter-spacing:0.12em;">HOME</a>
    <a href="/collections/all" style="text-decoration:none; color:#222; font-size:0.8rem; font-weight:500; letter-spacing:0.12em;">COLLECTIONS</a>
    <a href="/pages/gifts" style="text-decoration:none; color:#222; font-size:0.8rem; font-weight:500; letter-spacing:0.12em;">GIFTS</a>
    <div style="cursor:pointer; display:flex; align-items:center; justify-content:center; width:38px; height:38px; background:#fafafa; border-radius:50%;">
      BAG
    </div>
  </nav>
</header>
{% schema %}
{
  "name": "Header",
  "settings": []
}
{% endschema %}
'''
with open(os.path.join(theme_dir, 'sections', 'header.liquid'), 'w', encoding='utf-8') as f:
    f.write(header_liquid)

hero_liquid = '''<section style="width:100%; height:85vh; position:relative; display:flex; align-items:center; justify-content:center; background:#000;">
  <video autoPlay loop muted playsInline style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity:0.8;">
    <source src="https://cdn.shopify.com/videos/c/o/v/6eef70570cc94f92bc44365287e02cf3.mp4" type="video/mp4" />
  </video>
  <div style="position:relative; z-index:10; text-align:center; color:#fff; display:flex; flex-direction:column; align-items:center;">
    <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_LOGO_2.png?v=1711186716" style="width:300px; margin-bottom:40px; filter:brightness(0) invert(1);" alt="Khadlaj" />
    <h1 style="font-family:'Cinzel',serif; font-size:3rem; font-weight:400; letter-spacing:0.15em; margin-bottom:15px; text-shadow:0 2px 10px rgba(0,0,0,0.3);">THE ART OF FRAGRANCE</h1>
    <p style="font-size:1.1rem; font-weight:300; letter-spacing:0.3em; opacity:0.9; margin-bottom:40px;">CRAFTED IN THE UAE</p>
    <a href="/collections/all" style="display:inline-block; padding:16px 45px; background:transparent; border:1px solid #fff; color:#fff; text-decoration:none; font-size:0.85rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; transition:all 0.3s ease;">DISCOVER COLLECTION</a>
  </div>
</section>
{% schema %}
{
  "name": "Hero Video",
  "settings": [],
  "presets": [{"name":"Hero Video"}]
}
{% endschema %}
'''
with open(os.path.join(theme_dir, 'sections', 'hero-video.liquid'), 'w', encoding='utf-8') as f:
    f.write(hero_liquid)

promotional_liquid = '''<section style="background:#111; color:#fff; padding:35px 20px; border-bottom:1px solid rgba(255,255,255,0.05); text-align:center;">
  <div style="max-width:1200px; margin:0 auto; display:flex; flex-direction:column; gap:15px;">
    <div style="display:flex; justify-content:center; gap:50px; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:12px;">
         <span style="font-size:1.2rem;">✨</span>
         <span style="font-size:0.85rem; letter-spacing:0.1em; font-weight:500;">PREMIUM CRAFTSMANSHIP</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
         <span style="font-size:1.2rem;">💎</span>
         <span style="font-size:0.85rem; letter-spacing:0.1em; font-weight:500;">LONG-LASTING ESSENCE</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
         <span style="font-size:1.2rem;">🌍</span>
         <span style="font-size:0.85rem; letter-spacing:0.1em; font-weight:500;">LOVED WORLDWIDE</span>
      </div>
    </div>
  </div>
</section>
{% schema %}
{
  "name": "Promotional Strip",
  "presets": [{"name":"Promotional Strip"}]
}
{% endschema %}
'''
with open(os.path.join(theme_dir, 'sections', 'promotional-banner.liquid'), 'w', encoding='utf-8') as f:
    f.write(promotional_liquid)

footer_liquid = '''<footer style="background:#0a0a0a; color:#fff; padding:80px 40px 40px; border-top:1px solid #1a1a1a;">
  <div style="max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:50px; margin-bottom:80px;">
    <div style="display:flex; flex-direction:column; gap:25px;">
      <img src="https://hifzatoufiq.github.io/Khadlaj-web/assets/images/khadlaj-logo-new-4.png" style="width:160px; filter:brightness(0) invert(1);" alt="Footer Logo" />
      <p style="font-size:0.85rem; line-height:1.8; color:#999;">Crafting exceptional fragrances that blend Arabian heritage with modern elegance since 1997.</p>
    </div>
  </div>
  <div style="max-width:1400px; margin:0 auto; padding-top:30px; border-top:1px solid #1a1a1a; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#666; letter-spacing:0.1em;">
    <p>© 2026 KHADLAJ PERFUMES. ALL RIGHTS RESERVED.</p>
  </div>
</footer>
{% schema %}
{
  "name": "Footer",
  "settings": []
}
{% endschema %}
'''
with open(os.path.join(theme_dir, 'sections', 'footer.liquid'), 'w', encoding='utf-8') as f:
    f.write(footer_liquid)

print("Liquid sections generated!")
