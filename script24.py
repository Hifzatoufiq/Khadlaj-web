import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Normalize line endings to Unix style
content = content.replace("\r\n", "\n")

# Use regex to replace:
# </div> followed by whitespace, then </CountryContext.Provider>, then whitespace, then );, then whitespace, then }
# We want to replace it with </div>\n  );\n}
# We use re.sub with re.MULTILINE or just let it match across lines (re.DOTALL doesn't need to be set since \s matches newlines)

pattern = r'</div>\s*</CountryContext\.Provider>\s*\);\s*}'
replacement = '</div>\n  );\n}'

# Let's see if this matches
matches = re.findall(pattern, content)
print(f"Found {len(matches)} matches for the pattern.")

content = re.sub(pattern, replacement, content)

# Now specifically put it back in the App component.
# App component ends with `      )}\n    </div>\n  );\n}`
# We can replace it with `      )}\n    </div>\n    </CountryContext.Provider>\n  );\n}`
content = content.replace(
    "      )}\n    </div>\n  );\n}",
    "      )}\n    </div>\n    </CountryContext.Provider>\n  );\n}"
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Regex replacement completed")
