import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update Island product images
updates = {
    "KHADLAJ ISLAND DREAMS": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Dreams-3.jpg?v=1783940088",
    "KHADLAJ ISLAND VANILLA DUNES": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Vanilla-3.jpg?v=1783945707",
    "KHADLAJ ISLAND": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643"
}

for name, img in updates.items():
    # Only replace if we match the exact name
    # e.g. "name": "KHADLAJ ISLAND DREAMS",
    # ...
    # "img": "..."
    # Warning: "KHADLAJ ISLAND" could match "KHADLAJ ISLAND DREAMS" if we're not careful.
    pattern = r'("name":\s*"' + name + r'",(?:(?!"name":).)*?"img":\s*)"[^"]+"'
    code = re.sub(pattern, r'\1"' + img + '"', code, count=1, flags=re.DOTALL)

# 2. Update Contact banner background
# original: <div style={{position:"relative",height:"clamp(280px,36vw,440px)",overflow:"hidden",background:"#090909"}}>
# original: <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 76% 46%, rgba(184,146,42,.18), rgba(184,146,42,0) 30%), linear-gradient(135deg,#070707 0%,#171717 58%,#050505 100%)"}}/>

banner_pattern_1 = r'overflow:"hidden",background:"#090909"\}'
code = code.replace('overflow:"hidden",background:"#090909"}', 'overflow:"hidden",background:"#1A1025"}')

banner_pattern_2 = r'linear-gradient\(135deg,#070707 0%,#171717 58%,#050505 100%\)'
code = code.replace('linear-gradient(135deg,#070707 0%,#171717 58%,#050505 100%)', 'linear-gradient(135deg,#130b1b 0%,#251737 58%,#0e0814 100%)')

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updates applied.")
