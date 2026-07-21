import urllib.request
import re

url = 'https://khadlaj-perfumes.com/collections/gift-sets-perfect-for-loved-ones-best-for-any-occassion'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        # Look for Shopify collection image banner
        match = re.search(r'<img[^>]+class="[^"]*collection-hero__image[^"]*"[^>]+src="([^"]+)"', html)
        if match:
            # Usually Shopify URLs start with //cdn...
            img_url = match.group(1)
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            print('Banner image URL:', img_url)
        else:
            # Alternatively look for og:image
            match_og = re.search(r'<meta property="og:image" content="([^"]+)"', html)
            if match_og:
                print('Banner image URL (OG):', match_og.group(1))
            else:
                print('Not found')
except Exception as e:
    print('Error:', e)
