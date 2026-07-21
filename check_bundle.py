import urllib.request
import re

url = "https://khadlaj-web.vercel.app/bundle-v54.js"
src = urllib.request.urlopen(url).read().decode()

match = re.search(r'"name":\s*"HAREEM AL SULTAN BLUE".*?"img":\s*"([^"]+)"', src, re.DOTALL)
if match:
    print("Found:", match.group(1))
else:
    print("Not found")
