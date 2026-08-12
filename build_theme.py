import os
import shutil
import zipfile
import re

theme_dir = 'khadlaj-theme'
if os.path.exists(theme_dir):
    shutil.rmtree(theme_dir)

os.makedirs(os.path.join(theme_dir, 'layout'))
os.makedirs(os.path.join(theme_dir, 'templates'))
os.makedirs(os.path.join(theme_dir, 'assets'))
os.makedirs(os.path.join(theme_dir, 'config'))

# Get CSS and HTML from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

style_match = re.search(r'<style>(.*?)</style>', index_html, re.DOTALL)
css_content = style_match.group(1) if style_match else ''
with open(os.path.join(theme_dir, 'assets', 'index.css'), 'w', encoding='utf-8') as f:
    f.write(css_content)

# 1. theme.liquid
theme_liquid = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ shop.name }}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  {{ content_for_header }}
  {{ 'index.css' | asset_url | stylesheet_tag }}
  <script>
    window.__VIDEO_URL__ = "{{ 'duty-free.mp4' | asset_url }}";
    window.__SHIYAAKA_VIDEO_URL__ = "{{ 'shiyaaka-sky-approved.mp4' | asset_url }}";
  </script>
</head>
<body>
  <div id="preloader">
    <img src="https://hifzatoufiq.github.io/Khadlaj-web/assets/images/purple-logo.png?v=2" alt="Khadlaj Logo" class="vip-logo" />
    <div class="vip-loader-bar"></div>
  </div>
  {{ content_for_layout }}
  <script src="{{ 'bundle-v208-shopify.js' | asset_url }}"></script>
</body>
</html>"""
with open(os.path.join(theme_dir, 'layout', 'theme.liquid'), 'w', encoding='utf-8') as f:
    f.write(theme_liquid)

# 2. index.liquid
index_liquid = '<div id="root"></div>'
with open(os.path.join(theme_dir, 'templates', 'index.liquid'), 'w', encoding='utf-8') as f:
    f.write(index_liquid)

# 3. settings_schema.json
settings_schema = """[
  {
    "name": "theme_info",
    "theme_name": "Khadlaj React Theme",
    "theme_author": "Antigravity AI",
    "theme_version": "1.0.0",
    "theme_documentation_url": "",
    "theme_support_url": ""
  }
]"""
with open(os.path.join(theme_dir, 'config', 'settings_schema.json'), 'w', encoding='utf-8') as f:
    f.write(settings_schema)

# 4. Copy and modify assets
with open('bundle-v208.js', 'r', encoding='utf-8') as f:
    bundle_code = f.read()

# Copy the video file directly into the theme assets folder so Shopify serves it!
shutil.copy('assets/videos/duty-free.mp4', os.path.join(theme_dir, 'assets', 'duty-free.mp4'))
shutil.copy('assets/videos/shiyaaka-sky-approved.mp4', os.path.join(theme_dir, 'assets', 'shiyaaka-sky-approved.mp4'))

# Replace local image paths with absolute github pages paths so they work in Shopify!
bundle_code = bundle_code.replace('"/assets/', '"https://hifzatoufiq.github.io/Khadlaj-web/assets/')
bundle_code = bundle_code.replace("'./assets/", "'https://hifzatoufiq.github.io/Khadlaj-web/assets/")
bundle_code = bundle_code.replace('"./assets/', '"https://hifzatoufiq.github.io/Khadlaj-web/assets/')
bundle_code = bundle_code.replace("'/assets/", "'https://hifzatoufiq.github.io/Khadlaj-web/assets/")

with open(os.path.join(theme_dir, 'assets', 'bundle-v208-shopify.js'), 'w', encoding='utf-8') as f:
    f.write(bundle_code)

# 5. Zip it up
zipf = zipfile.ZipFile('khadlaj-theme.zip', 'w', zipfile.ZIP_DEFLATED)
for root, dirs, files in os.walk(theme_dir):
    for file in files:
        file_path = os.path.join(root, file)
        arcname = os.path.relpath(file_path, theme_dir)
        zipf.write(file_path, arcname)
zipf.close()

print('khadlaj-theme.zip created successfully!')
