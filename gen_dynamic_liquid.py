import os

theme_dir = 'khadlaj-liquid-theme'

new_launches = '''<section style="padding:100px 40px; background:#fff; text-align:center;">
  <div style="max-width:1400px; margin:0 auto;">
    <h2 style="font-family:'Cinzel',serif; font-size:2.5rem; font-weight:400; margin-bottom:10px;">{{ section.settings.title }}</h2>
    <p style="font-size:0.9rem; letter-spacing:0.15em; color:#666; margin-bottom:60px;">{{ section.settings.subtitle }}</p>
    
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:40px;">
      {% for product in collections[section.settings.collection].products limit: section.settings.product_limit %}
        <a href="{{ product.url }}" style="text-decoration:none; color:inherit; text-align:center; display:flex; flex-direction:column; align-items:center; transition:transform 0.3s ease;" class="product-card">
          <div style="width:100%; aspect-ratio:1/1; background:#f9f9f9; display:flex; align-items:center; justify-content:center; border-radius:4px; margin-bottom:20px; position:relative; overflow:hidden;">
            <img src="{{ product.featured_image | img_url: 'large' }}" alt="{{ product.title }}" style="width:80%; height:80%; object-fit:contain; transition:transform 0.4s ease;" class="product-img" />
          </div>
          <span style="font-size:0.75rem; letter-spacing:0.15em; color:#a38048; font-weight:600; margin-bottom:8px;">{{ product.type | upcase }}</span>
          <h3 style="font-family:'Cinzel',serif; font-size:1.1rem; font-weight:500; margin-bottom:15px; letter-spacing:0.05em;">{{ product.title }}</h3>
          <p style="font-size:1.1rem; font-weight:600; color:#111;">{{ product.price | money }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
<style>
.product-card:hover .product-img { transform: scale(1.1); }
</style>
{% schema %}
{
  "name": "New Launches",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "NEW LAUNCHES" },
    { "type": "text", "id": "subtitle", "label": "Subheading", "default": "DISCOVER OUR LATEST CREATIONS" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 16, "step": 4, "label": "Product Limit", "default": 8 }
  ],
  "presets": [{"name":"New Launches"}]
}
{% endschema %}'''
with open(os.path.join(theme_dir, 'sections', 'new-launches.liquid'), 'w', encoding='utf-8') as f:
    f.write(new_launches)

testimonials = '''<section style="background:#0a0a0a; color:#fff; padding:100px 40px; text-align:center;">
  <div style="max-width:1200px; margin:0 auto;">
    <h2 style="font-family:'Cinzel',serif; font-size:2.5rem; font-weight:400; margin-bottom:10px;">{{ section.settings.title }}</h2>
    <p style="font-size:0.9rem; letter-spacing:0.15em; color:#999; margin-bottom:60px; text-transform:uppercase;">{{ section.settings.subtitle }}</p>
    
    <div style="display:flex; justify-content:center; gap:40px; flex-wrap:wrap;">
      {% for block in section.blocks %}
      <div style="background:#111; padding:40px 30px; border-radius:4px; max-width:350px; text-align:left; border:1px solid #1a1a1a;">
        <div style="color:#d4af37; font-size:1.2rem; margin-bottom:15px;">★★★★★</div>
        <h4 style="font-family:'Cinzel',serif; font-size:1.1rem; margin-bottom:15px;">{{ block.settings.heading }}</h4>
        <p style="font-size:0.95rem; line-height:1.6; color:#bbb; margin-bottom:20px;">"{{ block.settings.text }}"</p>
        <div style="font-size:0.8rem; letter-spacing:0.1em; color:#fff;">- {{ block.settings.author }}</div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
{% schema %}
{
  "name": "Testimonials",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "LOVED ACROSS THE WORLD" },
    { "type": "text", "id": "subtitle", "label": "Subheading", "default": "WHAT OUR CUSTOMERS SAY" }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Review",
      "settings": [
        { "type": "text", "id": "heading", "label": "Heading" },
        { "type": "textarea", "id": "text", "label": "Review Text" },
        { "type": "text", "id": "author", "label": "Author" }
      ]
    }
  ],
  "presets": [{"name":"Testimonials"}]
}
{% endschema %}'''
with open(os.path.join(theme_dir, 'sections', 'testimonials.liquid'), 'w', encoding='utf-8') as f:
    f.write(testimonials)

print("Liquid dynamic sections generated!")
