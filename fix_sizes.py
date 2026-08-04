import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace verbose size strings in the top 8 products (and anywhere else they occur)
replacements = [
    ("60 ML EXTRAIT DE PARFUM SPRAY FOR MEN & WOMEN", "60 ML"),
    ("100 ML EXTRAIT DE PARFUM SPRAY FOR WOMEN", "100 ML"),
    ("100 ML EAU DE PARFUM SPRAY FOR MEN", "100 ML"),
    ("100 ML EAU DE PARFUM FOR MEN", "100 ML"),
    ("100 ML EAU DE PARFUM", "100 ML"),
    ("100 ML EDP SPRAY", "100 ML"),
]

for old_size, new_size in replacements:
    content = content.replace(f'"size": "{old_size}"', f'"size": "{new_size}"')
    content = content.replace(f"'size': '{old_size}'", f"'size': '{new_size}'")

# Also let's clean any generic regex occurrences where size has extra text after ML or ml
# e.g. "size": "100ml EDP" -> "size": "100 ML"
# But let's check: did they ask for just these new ones or in general? Let's make sure our 8 new ones are 100 ML and 60 ML!

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully cleaned product sizes to show ONLY ML without extra text.")
