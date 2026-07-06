with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

old_heading = """            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Featured Fragrances</p>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,color:"#000",lineHeight:1.05,letterSpacing:-1}}>Discover Your<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Signature Scent</em></h2>"""

new_heading = """            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Maison du Maitre Parfumeur</p>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,color:"#000",lineHeight:1.05,letterSpacing:-1}}>Respect the Quality,<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Provide the Best</em></h2>"""

if old_heading in content:
    content = content.replace(old_heading, new_heading)
    print("Successfully replaced the featured section headers!")
else:
    print("Could not find the target section headers.")

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
