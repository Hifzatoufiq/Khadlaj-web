import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

pattern = r'\s*\{\s*"id"[^}]+?"name":\s*"LA FEDE INTOXICATE BLUE ELIXIR".*?\},'
code = re.sub(pattern, '', code, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Removed LA FEDE INTOXICATE BLUE ELIXIR.")
