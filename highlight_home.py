import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop active state
desktop_old = r'''              if \(page === pg\) \{
                if \(pg === "collections" \|\| pg === "home"\) \{
                  isActive = false;
                \} else \{
                  isActive = true;
                \}
              \}'''

desktop_new = '''              if (page === pg) {
                if (pg === "collections") {
                  isActive = false;
                } else {
                  isActive = true;
                }
              }'''

content = re.sub(desktop_old, desktop_new, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Highlighted Home & Ambience when on Home page successfully.")
