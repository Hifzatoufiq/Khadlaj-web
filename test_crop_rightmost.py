import os
from PIL import Image
import numpy as np

def crop_rightmost_object(img_path, output_path):
    img = Image.open(img_path).convert('RGB')
    arr = np.array(img)
    
    # Calculate difference from white
    diff = np.max(255 - arr, axis=2)
    
    # Threshold to find objects (anything darker than very light gray)
    mask = diff > 15
    
    # Column sums to project vertically
    col_sums = np.sum(mask, axis=0)
    
    # Find start and end of objects
    # We want to find the rightmost island.
    # To do this robustly, we can look for columns where the sum is 0 (or very low).
    
    # Let's find the bounding box of ALL content first
    non_zero_cols = np.where(col_sums > 5)[0]
    if len(non_zero_cols) == 0:
        return False
        
    # Find gaps
    # We define a gap as a column where the sum is <= 5, preceded by object and followed by object
    # Or simpler: just find the rightmost peak and crop around it!
    # Let's just walk from right to left to find the first object, then keep walking left until we hit a gap.
    
    right = non_zero_cols[-1]
    left = right
    
    # Walk left until we hit a gap (say, 5 consecutive columns with sum <= 5, or just reaching the end)
    gap_width = 0
    for i in range(right, -1, -1):
        if col_sums[i] <= 10: # threshold for gap
            gap_width += 1
            if gap_width > 15: # 15 pixels of gap is a solid split
                left = i + gap_width # the start of the object
                break
        else:
            gap_width = 0
            left = i
            
    # Now we have left and right of the rightmost object.
    # We also need the top and bottom of just this object.
    obj_mask = mask[:, left:right+1]
    row_sums = np.sum(obj_mask, axis=1)
    non_zero_rows = np.where(row_sums > 5)[0]
    if len(non_zero_rows) == 0:
        return False
    top = non_zero_rows[0]
    bottom = non_zero_rows[-1]
    
    # Add a little padding
    pad = 20
    left = max(0, left - pad)
    right = min(arr.shape[1], right + pad)
    top = max(0, top - pad)
    bottom = min(arr.shape[0], bottom + pad)
    
    cropped = img.crop((left, top, right, bottom))
    cropped.save(output_path)
    return True

crop_rightmost_object('assets/images/cropped/cropped_Magical_Thai_02.jpg', 'assets/images/cropped/test_magical_thai.jpg')
print("Test completed.")
