import re
with open('c:/web/khadlaj.html', 'r', encoding='utf-16') as f:
    text = f.read()

matches = re.finditer(r'<video.*?</video>', text, re.DOTALL)
for m in matches:
    chunk = text[max(0, m.start()-200):m.end()+200]
    vid = re.search(r'https://cdn\.shopify\.com/[^\"'']+\.mp4', chunk)
    if vid:
        print('---')
        print(vid.group(0))
        # print some context around the video to identify it
        clean_chunk = re.sub(r'<[^>]+>', ' ', chunk)
        clean_chunk = re.sub(r'\s+', ' ', clean_chunk)
        print(clean_chunk[:200])
