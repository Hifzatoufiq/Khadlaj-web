import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Remove ALL instances of </CountryContext.Provider>
content = content.replace("    </CountryContext.Provider>\n", "")

# Now add it back only at the end of the App component.
# The App component ends with `      )}\n    </div>\n  );\n}`
content = content.replace(
    "      )}\n    </div>\n  );\n}",
    "      )}\n    </div>\n    </CountryContext.Provider>\n  );\n}"
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
