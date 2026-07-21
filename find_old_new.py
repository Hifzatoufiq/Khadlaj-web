import subprocess
import re

out = subprocess.check_output(['git', 'show', 'HEAD~4:"khadlaj-perfumes (1).jsx"']).decode('utf-8', errors='ignore')

# find all products with "New"
matches = re.findall(r'"name":\s*"([^"]+)",(?:(?!"name":).)*?"badge":\s*"New"', out, re.DOTALL)
print("Products that were New:", matches)
