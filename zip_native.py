import os
import zipfile

theme_dir = 'khadlaj-liquid-theme'
zipf = zipfile.ZipFile('khadlaj-native-theme.zip', 'w', zipfile.ZIP_DEFLATED)

for root, dirs, files in os.walk(theme_dir):
    for file in files:
        file_path = os.path.join(root, file)
        arcname = os.path.relpath(file_path, theme_dir)
        zipf.write(file_path, arcname)

zipf.close()
print('khadlaj-native-theme.zip created successfully!')
