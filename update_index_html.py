with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

old_css = '''    <style>
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:#fff;font-family:'Montserrat',sans-serif;}
      #root{min-height:100vh;}
    </style>'''

new_css = '''    <style>
      *{box-sizing:border-box;margin:0;padding:0;}
      html, body{overflow-x:hidden;max-width:100vw;width:100%;}
      body{background:#fff;font-family:'Montserrat',sans-serif;}
      #root{min-height:100vh;overflow-x:hidden;max-width:100vw;width:100%;}
    </style>'''

code = code.replace(old_css, new_css)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated index.html CSS safely.")
