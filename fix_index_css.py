import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace overflow-x:hidden with overflow-x:clip in html, body and #root
content = content.replace('overflow-x:hidden', 'overflow-x:clip')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html CSS successfully.")
