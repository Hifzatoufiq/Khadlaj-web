import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the mismatched tags
# Let's find the end of the App component.
# The App component ends with:
#       <Footer setPage={setPage}/>
#     </CountryContext.Provider>
#     </div>
#   );
# }

# Let's revert the incorrect provider placement
bad_footer_replacement = "      <Footer setPage={setPage}/>\\n    </CountryContext.Provider>"

# If the bad replacement is exactly in the file:
content = content.replace(
    '      <Footer setPage={setPage}/>\n    </CountryContext.Provider>',
    '      <Footer setPage={setPage}/>'
)

# And now place the provider correctly at the end of App component return block
# I know the end of the return block is:
#       {/* ── Newsletter Popup ── */}
#       ...
#     </div>
#   );
# }
# Wait, actually there's a popup and then the closing div.
old_end = "    </div>\\n  );\\n}"
# I need to wrap the whole div. The best way is to replace the main closing div with </div>\n    </CountryContext.Provider>
# But let's just find the closing div of App.
# I'll use regex to fix it.

content = re.sub(r'(    </div>\n  \);\n})', r'    </div>\n    </CountryContext.Provider>\n  );\n}', content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
