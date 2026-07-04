import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Remove all instances of </CountryContext.Provider> with any surrounding whitespace
content = re.sub(r'\s*</CountryContext\.Provider>\s*', '\n', content)

# The correct place is right before `  );\n}` at the end of the App component.
# Let's find the `App` component end. The end of the file is:
#     </div>
#   );
# }

content = re.sub(r'(    </div>\n  \);\n})$', r'    </div>\n    </CountryContext.Provider>\n  );\n}', content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
