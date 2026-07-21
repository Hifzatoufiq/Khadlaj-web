import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

url = "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/HAREEM_AL_SULTAN_BLUE_35ML_-_Khadlaj_Perfumes-1964718.jpg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
img = Image.open(BytesIO(response.read()))

# Find bounding box of non-white
bg = Image.new(img.mode, img.size, (255, 255, 255))
diff = ImageChops.difference(img, bg)
bbox = diff.getbbox()

print("Original Size:", img.size)
print("Content Bounding Box:", bbox)
