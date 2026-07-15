with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    code = f.read()

replacements = [
    (
        'background: p.badge==="Limited" ? "#5C0000" : p.badge==="New" ? "#B8922A" : "#000"',
        'background: p.badge==="Limited" ? "#5C0000" : p.badge==="New" ? "#B8922A" : "#3c1152"'
    ),
    (
        'background:p.badge==="New"?"#B8922A":p.badge==="Limited"?"#5C0000":"#000"',
        'background:p.badge==="New"?"#B8922A":p.badge==="Limited"?"#5C0000":"#3c1152"'
    ),
    (
        'background:"#000",color:"#fff",textAlign:"center",padding:"10px 16px",fontSize:"9px",letterSpacing:"3px",fontFamily:"\'DM Sans\',sans-serif",textTransform:"uppercase",fontWeight:500',
        'background:"#3c1152",color:"#fff",textAlign:"center",padding:"10px 16px",fontSize:"9px",letterSpacing:"3px",fontFamily:"\'DM Sans\',sans-serif",textTransform:"uppercase",fontWeight:500'
    ),
    (
        'background:"#000",color:"#fff",border:"none",boxShadow:"0 12px 32px rgba(0,0,0,.2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99}} className="cart-float"',
        'background:"#3c1152",color:"#fff",border:"none",boxShadow:"0 12px 32px rgba(0,0,0,.2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99}} className="cart-float"'
    ),
    (
        'background:"#000",color:"#fff",border:"none",fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"\'Montserrat\',sans-serif",transition:"background .3s"}} onMouseEnter={e=>e.currentTarget.style.background="#B8922A"} onMouseLeave={e=>e.currentTarget.style.background="#000"}',
        'background:"#3c1152",color:"#fff",border:"none",fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"\'Montserrat\',sans-serif",transition:"background .3s"}} onMouseEnter={e=>e.currentTarget.style.background="#B8922A"} onMouseLeave={e=>e.currentTarget.style.background="#3c1152"}'
    ),
    (
        'background:"#000", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"',
        'background:"#3c1152", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"'
    ),
    (
        'background:"#000", border:"none", color:"#fff", fontSize:11, letterSpacing:3, fontWeight:600, textTransform:"uppercase", cursor:"pointer", fontFamily:"\'Montserrat\',sans-serif", transition:"background .3s"}} onMouseEnter={e=>e.currentTarget.style.background="#B8922A"} onMouseLeave={e=>e.currentTarget.style.background="#000"}',
        'background:"#3c1152", border:"none", color:"#fff", fontSize:11, letterSpacing:3, fontWeight:600, textTransform:"uppercase", cursor:\"pointer\", fontFamily:\"\'Montserrat\',sans-serif\", transition:\"background .3s\"}} onMouseEnter={e=>e.currentTarget.style.background=\"#B8922A\"} onMouseLeave={e=>e.currentTarget.style.background=\"#3c1152\"}'
    )
]

for old, new in replacements:
    code = code.replace(old, new)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Updated accent colors successfully.")
