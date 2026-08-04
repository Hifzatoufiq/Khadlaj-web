import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_canvas_style = r'cursor: "pointer", touchAction: "none",'
new_canvas_style = 'cursor: \'url("https://media.geeksforgeeks.org/wp-content/uploads/20231030101751/bx-eraser-icon.png"), auto\', touchAction: "none",'

content = re.sub(old_canvas_style, new_canvas_style, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added eraser icon cursor.")
