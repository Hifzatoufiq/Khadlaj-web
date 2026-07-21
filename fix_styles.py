import sys

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix Best Sellers limit
# Find the end of filtered array map logic
#   }).slice(0,16);
# Change it to:
#   }).slice(0, activeCat === "Best Sellers" ? 4 : 16);
code = code.replace("  }).slice(0,16);", "  }).slice(0, activeCat === \"Best Sellers\" ? 4 : 16);")

# 2. Fix Tags Theme
old_tag_style = 'background:"#F5F5F5", fontSize:8.5, letterSpacing:.7, color:"#666"'
new_tag_style = 'background:"#251737", fontSize:8.5, letterSpacing:.7, color:"#B8922A", border:"1px solid rgba(200,169,126,0.3)"'
code = code.replace(old_tag_style, new_tag_style)

# 3. Fix Dot color inside tag
old_dot_style = 'background: noteColors[i % noteColors.length]'
new_dot_style = 'background: "#B8922A"'
code = code.replace(old_dot_style, new_dot_style)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated styles and limits successfully.")
