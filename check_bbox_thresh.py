import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

url = "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/HAREEM_AL_SULTAN_BLUE_35ML_-_Khadlaj_Perfumes-1964718.jpg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
img = Image.open(BytesIO(response.read())).convert('L')

# threshold to get mask of objects
# background is near white, say > 240
# mask will be white for objects, black for background
mask = img.point(lambda p: 255 if p < 240 else 0)
bbox = mask.getbbox()

print("Original Size:", img.size)
print("Content Bounding Box (threshold < 240):", bbox)
