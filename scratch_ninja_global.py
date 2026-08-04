import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Disable the custom modal timer
old_timer = r'const t = setTimeout\(\(\)=>setShowPopup\(true\), 6000\);'
new_timer = '// Custom popup disabled in favor of Common Ninja widget'
content = re.sub(old_timer, new_timer, content)

# 2. Add the Common Ninja div globally at the end of the App
old_end = r'    </CountryContext\.Provider>'
new_end = '      <div className="commonninja_component pid-950790ec-bd4f-4717-bad5-d98af52e309f"></div>\n    </CountryContext.Provider>'
content = re.sub(old_end, new_end, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Disabled custom scratch popup and injected Common Ninja widget globally.")
