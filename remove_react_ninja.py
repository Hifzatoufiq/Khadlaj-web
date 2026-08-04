import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the common ninja div from React component
old_end = r'      <div className="commonninja_component pid-950790ec-bd4f-4717-bad5-d98af52e309f"></div>\n    </CountryContext\.Provider>'
new_end = '    </CountryContext.Provider>'
content = re.sub(old_end, new_end, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed Common Ninja div from React component.")
