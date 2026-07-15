from PIL import Image
import numpy as np

images = [
    'zayaan-silver-cutout.png',
    'icon-cutout.png',
    'shiyaaka-cutout.png',
    'onyx-cutout.png',
    'island-dreams-cutout.png'
]

for img_name in images:
    path = f'assets/images/products/{img_name}'
    try:
        img = Image.open(path).convert('RGBA')
    except Exception as e:
        print(f'Error opening {img_name}: {e}')
        continue
        
    data = np.array(img)
    alpha = data[:,:,3]
    row_sums = np.sum(alpha, axis=1)
    
    # We look at the bottom 40% of the image to find the gap
    start_search = int(img.height * 0.6)
    search_area = row_sums[start_search:]
    min_idx = np.argmin(search_area)
    crop_y = start_search + min_idx
    
    # If the minimum is too close to the bottom or the row sum isn't small enough
    # Force crop a larger portion (bottom 18%)
    if min_idx > len(search_area) * 0.85:
        crop_y = int(img.height * 0.82)
        
    print(f'{img_name}: height={img.height}, crop_y={crop_y}')
    
    # Crop and save
    img_cropped = img.crop((0, 0, img.width, crop_y))
    
    new_name = img_name.replace('-cutout.png', '_transparent.png')
    img_cropped.save(f'assets/images/products/{new_name}')
    print(f'Saved {new_name}')
