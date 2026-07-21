import os
import shutil
from PIL import Image

src_dir = r"C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac"
dst_dir = r"c:\web\assets\images\user_uploads"

os.makedirs(dst_dir, exist_ok=True)

images = [f for f in os.listdir(src_dir) if f.startswith("media__1784485888")]

def get_average_color(img_path):
    img = Image.open(img_path).convert("RGB")
    # Resize to 1x1 to get average color
    img2 = img.resize((1, 1))
    color = img2.getpixel((0, 0))
    return color

results = []
for idx, img_name in enumerate(images):
    src_path = os.path.join(src_dir, img_name)
    dst_name = f"user_{idx}.png"
    dst_path = os.path.join(dst_dir, dst_name)
    shutil.copy2(src_path, dst_path)
    
    color = get_average_color(dst_path)
    results.append((dst_name, color))

for r in results:
    print(f"{r[0]}: RGB={r[1]}")
