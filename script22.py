import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the incorrect ones. 
# We can replace:
#     </div>
#     </CountryContext.Provider>
#   );
# }
# with:
#     </div>
#   );
# }
# This will replace all of them, including the one in App.

content = content.replace("    </div>\n    </CountryContext.Provider>\n  );\n}", "    </div>\n  );\n}")

# Now, specifically put it back in the App component.
# App component ends with `      )}\n    </div>\n  );\n}`
content = content.replace(
    "      )}\n    </div>\n  );\n}",
    "      )}\n    </div>\n    </CountryContext.Provider>\n  );\n}"
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Rogue tags cleaned and App wrapper restored")
