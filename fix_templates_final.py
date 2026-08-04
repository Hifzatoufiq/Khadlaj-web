import os

theme_dir = 'khadlaj-theme'
templates_dir = os.path.join(theme_dir, 'templates')
sections_dir = os.path.join(theme_dir, 'sections')

if not os.path.exists(templates_dir):
    os.makedirs(templates_dir)
if not os.path.exists(sections_dir):
    os.makedirs(sections_dir)

# Create dummy section
dummy_liquid = '''<!-- Dummy -->
{% schema %}
{
  "name": "Dummy",
  "settings": []
}
{% endschema %}'''
with open(os.path.join(sections_dir, 'dummy.liquid'), 'w', encoding='utf-8') as f:
    f.write(dummy_liquid)

# Create valid JSON templates
json_content = '''{
  "sections": {
    "main": {
      "type": "dummy"
    }
  },
  "order": [
    "main"
  ]
}'''

templates = ['index.json', 'collection.json', 'product.json', 'page.json', '404.json', 'cart.json']

for t in templates:
    with open(os.path.join(templates_dir, t), 'w', encoding='utf-8') as f:
        f.write(json_content)

print("Created valid JSON templates and dummy section")
