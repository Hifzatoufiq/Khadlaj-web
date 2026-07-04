import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the tags at the end of the file
bad_end = """    </div>
);
}"""

good_end = """    </div>
    </CountryContext.Provider>
  );
}"""

content = content.replace(bad_end, good_end)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("End tags fixed successfully")
