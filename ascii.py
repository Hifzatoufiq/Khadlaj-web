import sys
from PIL import Image

img = Image.open('assets/images/cropped/test_edge_original.jpg')
img = img.resize((40, 40))
img = img.convert('L')
pixels = img.load()

chars = " .:-=+*#%@"
for y in range(40):
    line = ""
    for x in range(40):
        val = pixels[x, y]
        char = chars[int((val / 255) * (len(chars) - 1))]
        line += char
    print(line)
