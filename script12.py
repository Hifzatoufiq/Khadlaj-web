import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update font imports
old_import = "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');"
new_import = "@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700&display=swap');"
content = content.replace(old_import, new_import)

# 2. Update .disp class for titles to use Trajan Pro
old_disp = ".disp{font-family:'Cinzel',serif;}"
new_disp = ".disp{font-family:'Trajan Pro', 'Cinzel', serif;}"
content = content.replace(old_disp, new_disp)

# 3. Update the search input which explicitly used Cinzel
old_search_font = "fontFamily:\"'Cinzel',serif\""
new_search_font = "fontFamily:\"'Trajan Pro', 'Cinzel', serif\""
content = content.replace(old_search_font, new_search_font)

# 4. Standardise sub-headings that might be using 700 to 600 (Semi Bold)
# Actually, the user wants sub-headings to be Semi Bold. It's safer to just set the import and the main classes.
# The body already uses Montserrat sans-serif.

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
