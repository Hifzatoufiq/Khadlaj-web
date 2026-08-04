import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
if match:
    css = match.group(1)
    with open('khadlaj-liquid-theme/assets/base.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print('Extracted CSS to base.css')
else:
    print('Could not find CSS')
