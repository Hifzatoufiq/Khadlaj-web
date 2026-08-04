import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix z-index issue
old_jsx = r'''       <div style=\{\{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"radial-gradient\(circle, #251737 0%, #0a0a0a 100%\)"\}\}>
          <div style=\{\{position:"absolute", inset:0, opacity:0\.12, background:"url\('data:image/svg\+xml;utf8,<svg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www\.w3\.org/2000/svg\\"><circle cx=\\"2\\" cy=\\"2\\" r=\\"1\\" fill=\\"%23D4AF37\\"/></svg>'\) repeat"\}\} />
          <span style=\{\{fontSize:9, letterSpacing:4, color:"#D4AF37", textTransform:"uppercase", marginBottom:4, fontWeight:600, opacity:0\.9, position:"relative", zIndex:2\}\}>Your Exclusive Gift</span>
          <p className="scratch-text" style=\{\{
             fontWeight:900, 
             margin:0, 
             background: "linear-gradient\(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37\)", 
             WebkitBackgroundClip: "text", 
             WebkitTextFillColor: "transparent", 
             letterSpacing:"6px", 
             fontSize: "28px",
             filter: "drop-shadow\(0 2px 10px rgba\(212,175,55,0\.5\)\)",
             position:"relative", 
             zIndex:2
          \}\}>\{code\}</p>
       </div>
       <div style=\{\{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", borderRadius: 8, opacity: isRevealed \? 0 : 1, transition: "opacity 0\.6s ease"\}\}>
          <div className="shimmer-effect"></div>
       </div>
       <canvas ref=\{canvasRef\} width=\{320\} height=\{100\} style=\{\{position:"absolute", inset:0, cursor:"pointer", width:"100%", height:"100%", opacity: isRevealed \? 0 : 1, transition: "opacity 0\.6s ease", pointerEvents: isRevealed \? "none" : "auto"\}\} />'''

new_jsx = '''       <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"radial-gradient(circle, #251737 0%, #0a0a0a 100%)", zIndex:1}}>
          <div style={{position:"absolute", inset:0, opacity:0.12, background:"url('data:image/svg+xml;utf8,<svg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www.w3.org/2000/svg\\"><circle cx=\\"2\\" cy=\\"2\\" r=\\"1\\" fill=\\"%23D4AF37\\"/></svg>') repeat"}} />
          <span style={{fontSize:9, letterSpacing:4, color:"#D4AF37", textTransform:"uppercase", marginBottom:4, fontWeight:600, opacity:0.9, position:"relative", zIndex:2}}>Your Exclusive Gift</span>
          <p className="scratch-text" style={{
             fontWeight:900, 
             margin:0, 
             background: "linear-gradient(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37)", 
             WebkitBackgroundClip: "text", 
             WebkitTextFillColor: "transparent", 
             letterSpacing:"6px", 
             fontSize: "28px",
             filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.5))",
             position:"relative", 
             zIndex:2
          }}>{code}</p>
       </div>
       <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", borderRadius: 8, opacity: isRevealed ? 0 : 1, transition: "opacity 0.6s ease", zIndex:10}}>
          <div className="shimmer-effect"></div>
       </div>
       <canvas ref={canvasRef} width={320} height={100} style={{position:"absolute", inset:0, cursor:"pointer", width:"100%", height:"100%", opacity: isRevealed ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: isRevealed ? "none" : "auto", zIndex:10}} />'''

content = re.sub(old_jsx, new_jsx, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed zIndex issue successfully.")
