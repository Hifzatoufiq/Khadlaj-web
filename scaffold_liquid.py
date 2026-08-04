import os
import shutil

theme_dir = 'khadlaj-liquid-theme'
if os.path.exists(theme_dir):
    shutil.rmtree(theme_dir)

# Create folders
folders = ['layout', 'templates', 'sections', 'snippets', 'assets', 'config', 'locales']
for f in folders:
    os.makedirs(os.path.join(theme_dir, f))

# 1. config/settings_schema.json
settings_schema = '''[
  {
    "name": "theme_info",
    "theme_name": "Khadlaj Native Liquid Theme",
    "theme_author": "Antigravity AI",
    "theme_version": "1.0.0",
    "theme_documentation_url": "",
    "theme_support_url": ""
  }
]'''
with open(os.path.join(theme_dir, 'config', 'settings_schema.json'), 'w', encoding='utf-8') as f:
    f.write(settings_schema)

# 2. layout/theme.liquid
theme_liquid = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ page_title }} - {{ shop.name }}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  {{ content_for_header }}
  {{ 'base.css' | asset_url | stylesheet_tag }}
</head>
<body style="background:#fff; font-family:'Montserrat',sans-serif; overflow-x:clip; max-width:100vw; width:100%;">
  {% section 'header' %}
  
  <main id="MainContent" role="main">
    {{ content_for_layout }}
  </main>

  {% section 'footer' %}
</body>
</html>'''
with open(os.path.join(theme_dir, 'layout', 'theme.liquid'), 'w', encoding='utf-8') as f:
    f.write(theme_liquid)

# 3. templates/index.json (OS 2.0 Template)
index_json = '''{
  "sections": {
    "hero": {
      "type": "hero-video"
    },
    "promotional": {
      "type": "promotional-banner"
    },
    "new_launches": {
      "type": "new-launches"
    },
    "collections": {
      "type": "featured-collections"
    },
    "testimonials": {
      "type": "testimonials"
    }
  },
  "order": [
    "hero",
    "new_launches",
    "collections",
    "testimonials",
    "promotional"
  ]
}'''
with open(os.path.join(theme_dir, 'templates', 'index.json'), 'w', encoding='utf-8') as f:
    f.write(index_json)

# Create empty sections
sections = ['header.liquid', 'hero-video.liquid', 'promotional-banner.liquid', 'new-launches.liquid', 'featured-collections.liquid', 'testimonials.liquid', 'footer.liquid']
for s in sections:
    with open(os.path.join(theme_dir, 'sections', s), 'w', encoding='utf-8') as f:
        f.write('<!-- ' + s + ' -->')

print('Basic Native Liquid Theme Structure Created!')
