import urllib.request
from PIL import Image
import numpy as np
from io import BytesIO

url = "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Edge_Original-2.jpg?v=1776231633"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
img_data = response.read()

img = Image.open(BytesIO(img_data)).convert('RGB')
arr = np.array(img)
diff = np.max(255 - arr, axis=2)
mask = diff > 15
col_sums = np.sum(mask, axis=0)

non_zero_cols = np.where(col_sums > 5)[0]
right = non_zero_cols[-1]
left = right

gap_width = 0
for i in range(right, -1, -1):
    if col_sums[i] <= 10:
        gap_width += 1
        if gap_width > 15:
            left = i + gap_width
            break
    else:
        gap_width = 0
        left = i

obj_mask = mask[:, left:right+1]
row_sums = np.sum(obj_mask, axis=1)
non_zero_rows = np.where(row_sums > 5)[0]
top = non_zero_rows[0]
bottom = non_zero_rows[-1]

pad = 20
left = max(0, left - pad)
right = min(arr.shape[1], right + pad)
top = max(0, top - pad)
bottom = min(arr.shape[0], bottom + pad)

cropped = img.crop((left, top, right, bottom))
cropped.save("assets/images/cropped/test_edge_original.jpg")

print("Cropped Edge Original.")
