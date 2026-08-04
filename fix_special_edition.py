import re

file_path = 'khadlaj-perfumes (1).jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences of 'SPECIAL EDITION SHIYAAKA SNOW' with 'SHIYAAKA SNOW'
new_content = content.replace("SPECIAL EDITION SHIYAAKA SNOW", "SHIYAAKA SNOW")

# Replace all occurrences of 'SPECIAL EDITION SHIYAAKA SHADOW' with 'SHIYAAKA SHADOW'
new_content = new_content.replace("SPECIAL EDITION SHIYAAKA SHADOW", "SHIYAAKA SHADOW")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done replacing SPECIAL EDITION.')
