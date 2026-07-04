import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Normalize line endings to Unix style for easy replacement
content = content.replace("\r\n", "\n")

# Replace the incorrect tags
content = content.replace("    </div>\n    </CountryContext.Provider>\n  );\n}", "    </div>\n  );\n}")

# Specifically put it back in the App component.
content = content.replace(
    "      )}\n    </div>\n  );\n}",
    "      )}\n    </div>\n    </CountryContext.Provider>\n  );\n}"
)

# Convert back to Windows CRLF if that's what was there (or esbuild will handle it)
# We can just write it as LF, Vercel/esbuild is fine with LF.

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Line ending normalized and tags fixed successfully")
