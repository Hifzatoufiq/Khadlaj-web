with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Normalize line endings to LF
content = content.replace("\r\n", "\n")

# Find the end pattern
old_end = "    </div>\n);\n}"
new_end = "    </div>\n    </CountryContext.Provider>\n  );\n}"

if old_end in content:
    content = content.replace(old_end, new_end)
    print("Successfully replaced the closing tags!")
else:
    print("Could not find the target end pattern.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
