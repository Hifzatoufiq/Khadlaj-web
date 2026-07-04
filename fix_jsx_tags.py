with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# Replace ProductPage end
old_productpage = """      )}
    </div>
    </CountryContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: GIFT SETS"""

new_productpage = """      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: GIFT SETS"""

if old_productpage in content:
    content = content.replace(old_productpage, new_productpage)
    print("Fixed ProductPage end successfully!")
else:
    print("Could not find ProductPage end pattern.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
