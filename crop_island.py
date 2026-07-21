import urllib.request
from PIL import Image
from io import BytesIO

url = "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
img = Image.open(BytesIO(response.read()))

width, height = img.size
# Crop left 40%
left = 0
top = 0
right = width * 0.40
bottom = height

cropped = img.crop((left, top, right, bottom))
cropped.save("assets/images/cropped/cropped_Island2.jpg")

print("Cropped left 40%")
