import urllib.request
from PIL import Image
from io import BytesIO

urls = [
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KhadlajSpecial-1_026d234f-e548-4f74-aabb-a497d6153248.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KhadlajSpecial-2_28780ba7-e351-4765-99fa-6f064ac6a842.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KhadlajSpecial-3_2473ec8c-22e9-4cc7-a027-e237682d3c44.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Khadlajspecial-4_edc479bd-a643-4a70-b9b9-b67884cb3ad4.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-1_4e12f62b-1669-4513-9c53-0515dde14336.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-3_36392120-d1dc-489b-8fff-992c3945e6e1.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-2_52a94bd5-b24f-4e19-a2c3-4011791f16dc.jpg",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TheGourmandCollection-4_b312994b-4740-40ef-b26d-52e29e7b094a.jpg"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            img = Image.open(BytesIO(resp.read()))
            print(f"Size: {img.size} Ratio: {img.size[0]/img.size[1]:.2f} - {url.split('/')[-1]}")
    except Exception as e:
        print(e)
