import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_render = r'''    return \(
      <canvas 
        ref=\{canvasRef\} 
        width=\{320\} 
        height=\{100\} 
        style=\{\{
          cursor: "pointer",
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba\(0,0,0,0\.4\), inset 0 0 10px rgba\(255,255,255,0\.1\)",
          touchAction: "none"
        \}\}
      />
    \);'''

new_render = '''    return (
      <div style={{ position: "relative", width: 320, height: 100, borderRadius: 8, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
        {/* The Base (Prize) that reveals underneath the scratch */}
        <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #111, #1a0822)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #D4AF37", borderRadius: 8,
            boxShadow: "inset 0 0 20px rgba(212,175,55,0.1)"
        }}>
           <div style={{position:"absolute", inset:0, opacity:0.1, background:"url('data:image/svg+xml;utf8,<svg width=\\"20\\" height=\\"20\\" xmlns=\\"http://www.w3.org/2000/svg\\"><circle cx=\\"2\\" cy=\\"2\\" r=\\"1\\" fill=\\"%23D4AF37\\"/></svg>') repeat"}} />
           <p style={{
               fontSize: 32, fontWeight: 900, margin: 0,
               background: "linear-gradient(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37)",
               WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
               letterSpacing: 8, zIndex: 1,
               filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.4))",
               fontFamily: "'Montserrat', sans-serif"
           }}>{code}</p>
        </div>

        {/* The Scratch Canvas Layer */}
        <canvas 
          ref={canvasRef} 
          width={320} 
          height={100} 
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            cursor: "pointer", touchAction: "none",
            opacity: isRevealed ? 0 : 1,
            transition: "opacity 0.6s ease-out"
          }}
        />
      </div>
    );'''

content = re.sub(old_render, new_render, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ScratchCard component to use a realistic layered canvas structure.")
