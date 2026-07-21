import subprocess
import re

out = subprocess.check_output(['git', 'log', '-p', 'khadlaj-perfumes (1).jsx']).decode('utf-8', errors='ignore')

def find_original_img(name):
    # Search for the block starting with name and ending with img
    pattern = r'"name": "' + name + r'".*?"img": "(https://cdn.shopify[^"]+)"'
    match = re.search(pattern, out, re.IGNORECASE | re.DOTALL)
    if match:
        print(f"{name}: {match.group(1)}")
    else:
        print(f"{name}: NOT FOUND")

find_original_img("KHADLAJ ISLAND DREAMS")
find_original_img("KHADLAJ ISLAND VANILLA DUNES")
find_original_img("KHADLAJ ISLAND")
