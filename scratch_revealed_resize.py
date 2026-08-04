import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the box styling
old_box = r'''                  <div style=\{\{
                      position: "relative",
                      padding:"3px", 
                      background:"linear-gradient\(135deg, #F3E5AB 0%, #D4AF37 40%, #A67C00 100%\)", 
                      borderRadius: 16, 
                      marginBottom: 35, 
                      boxShadow:"0 20px 50px rgba\(0,0,0,0\.6\), 0 0 30px rgba\(212,175,55,0\.25\)",
                      transform: "scale\(1\.05\)"
                  \}\}>
                    <div style=\{\{
                        background: "linear-gradient\(135deg, #1A0B22 0%, #0d0412 100%\)",
                        borderRadius: 14,
                        padding: "24px 45px",'''

new_box = '''                  <div style={{
                      position: "relative",
                      padding:"3px", 
                      background:"linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #A67C00 100%)", 
                      borderRadius: 16, 
                      marginBottom: 30, 
                      boxShadow:"0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.2)"
                  }}>
                    <div style={{
                        background: "linear-gradient(135deg, #1A0B22 0%, #0d0412 100%)",
                        borderRadius: 14,
                        padding: "20px 36px",'''

content = re.sub(old_box, new_box, content)

# Replace the text styling
old_text = r'''                       <p style=\{\{
                           fontSize: 38, 
                           fontWeight:900, 
                           margin:0, 
                           background: "linear-gradient\(to bottom, #FFF 0%, #F3E5AB 50%, #D4AF37 100%\)", 
                           WebkitBackgroundClip: "text", 
                           WebkitTextFillColor: "transparent",
                           letterSpacing: 10, '''

new_text = '''                       <p style={{
                           fontSize: 30, 
                           fontWeight:900, 
                           margin:0, 
                           background: "linear-gradient(to bottom, #FFF 0%, #F3E5AB 50%, #D4AF37 100%)", 
                           WebkitBackgroundClip: "text", 
                           WebkitTextFillColor: "transparent",
                           letterSpacing: 8, '''

content = re.sub(old_text, new_text, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated revealed state sizes.")
