import urllib.request
from PIL import Image
from io import BytesIO
import numpy as np

urls = [
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/HAREEM_AL_SULTAN_Bottle.jpg?v=1783946128',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_4.jpg?v=1784007371',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_5.jpg?v=1784007569'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        pil_img = Image.open(BytesIO(response.read())).convert('RGB')
        arr = np.array(pil_img)
        diff = np.max(255 - arr, axis=2)
        mask = diff > 15
        
        row_sums = np.sum(mask, axis=1)
        col_sums = np.sum(mask, axis=0)
        
        non_zero_rows = np.where(row_sums > 5)[0]
        non_zero_cols = np.where(col_sums > 5)[0]
        
        if len(non_zero_rows) > 0 and len(non_zero_cols) > 0:
            h = non_zero_rows[-1] - non_zero_rows[0]
            w = non_zero_cols[-1] - non_zero_cols[0]
            aspect = w / h if h > 0 else 100.0
            print(f"URL: {url.split('/')[-1]}, Aspect: {aspect:.2f}")
    except Exception as e:
        print("Error:", e)
