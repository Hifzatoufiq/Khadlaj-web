import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = r'''              let isActive = false;
              if \(page === pg\) \{
                if \(pg === "collections"\) \{
                  isActive = false;
                \} else \{
                  isActive = true;
                \}
              \}'''

new_logic = '''              let isActive = false;
              if (page === pg) {
                if (pg === "collections") {
                  if (label === "Best Sellers") isActive = (collectionCategory === "Best Sellers");
                  else if (label === "Perfume Spray") isActive = (collectionCategory === "EAU DE PARFUM");
                  else if (label === "Perfume Oil") isActive = (collectionCategory === "Atyaab");
                } else {
                  isActive = true;
                }
              }'''

# Replace all occurrences (desktop and mobile)
content = re.sub(old_logic, new_logic, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Restored correct active state logic for collections successfully.")
