import re
import codecs

with codecs.open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

def extract_and_remove(name):
    global content
    pattern = r'\{\s*"id":\s*\d+,\s*"name":\s*"' + name + r'".*?\},?\s*'
    match = re.search(pattern, content, flags=re.DOTALL | re.IGNORECASE)
    if match:
        block = match.group(0)
        content = content[:match.start()] + content[match.end():]
        if not block.strip().endswith(','):
            block = block.strip() + ',\n  '
        return block
    return ''

island = extract_and_remove('KHADLAJ ISLAND')
sawaar = extract_and_remove('SAWAAR VANILLE BLANC')
shiyaaka_snow = extract_and_remove('SPECIAL EDITION SHIYAAKA SNOW')
shiyaaka_shadow = extract_and_remove('SPECIAL EDITION SHIYAAKA SHADOW')
shiyaaka_sky = extract_and_remove('SPECIAL EDITION SHIYAAKA SKY')

prod_start = content.find('const PRODUCTS = [\n') + len('const PRODUCTS = [\n')

new_top = island + sawaar + shiyaaka_snow + shiyaaka_shadow
if shiyaaka_sky:
    new_top += shiyaaka_sky

content = content[:prod_start] + '  ' + new_top + content[prod_start:]

# Replace images with cutouts
content = content.replace('cropped_Island2.jpg', '/assets/images/products/island-packshot-tight_transparent.png')
content = content.replace('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1783939807', '/assets/images/products/sawaar-cutout.png')
content = content.replace('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3.jpg?v=1783943040', '/assets/images/products/shiyaaka-shadow-cutout.png')

with codecs.open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
