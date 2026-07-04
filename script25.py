import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Normalize line endings
content = content.replace("\r\n", "\n")

# 1. First, strip ALL occurrences of </CountryContext.Provider>
# (Except the context definition itself, which is const CountryContext)
content = re.sub(r'\s*</CountryContext\.Provider>\s*', '\n', content)

# 2. Now, append the provider tag ONLY at the end of the App component.
# The App component ends the entire file. So it's followed by maybe some whitespace and EOF.
# We match:
#     </div>
#   );
# }
# at the very end of the file.

content = re.sub(r'    </div>\n  \);\n}\s*$', '    </div>\n    </CountryContext.Provider>\n  );\n}', content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Provider tags fixed correctly with end-of-file constraint")
