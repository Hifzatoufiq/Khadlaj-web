import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the canvas drawing logic
old_draw = r'    // Fill with a realistic silver foil texture.*?ctx\.fillText\("SCRATCH TO REVEAL", width/2, height/2\);'

new_draw = '''    // Fill with a realistic luxury GOLD foil texture
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#855C0B");
    gradient.addColorStop(0.2, "#D4AF37");
    gradient.addColorStop(0.5, "#F3E5AB");
    gradient.addColorStop(0.8, "#D4AF37");
    gradient.addColorStop(1, "#855C0B");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add noise to simulate metallic gold foil grain
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 30 - 15;
      data[i] += noise;     // R
      data[i + 1] += noise; // G
      data[i + 2] += noise; // B
    }
    ctx.putImageData(imgData, 0, 0);

    // Draw luxury geometric diamond pattern
    ctx.strokeStyle = "rgba(133, 92, 11, 0.25)";
    ctx.lineWidth = 1;
    for(let y = -20; y < height + 20; y += 16) {
      ctx.beginPath();
      for(let x = -20; x < width + 20; x += 16) {
         ctx.moveTo(x, y + 8);
         ctx.lineTo(x + 8, y);
         ctx.lineTo(x + 16, y + 8);
         ctx.lineTo(x + 8, y + 16);
         ctx.closePath();
      }
      ctx.stroke();
    }

    // Add text with embossed look
    ctx.font = "800 15px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Highlight (bottom right)
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("REVEAL VIP PRIVILEGE", width/2 + 1, height/2 + 1);
    
    // Shadow (top left)
    ctx.fillStyle = "rgba(80, 50, 0, 0.6)";
    ctx.fillText("REVEAL VIP PRIVILEGE", width/2 - 1, height/2 - 1);
    
    // Main text
    ctx.fillStyle = "#855C0B";
    ctx.fillText("REVEAL VIP PRIVILEGE", width/2, height/2);'''

content = re.sub(old_draw, new_draw, content, flags=re.DOTALL)

# 2. Update the JSX wrapper
old_jsx = r'<div className="scratch-hover" style=\{\{position:"relative", width: "100%", maxWidth: 320, height: 100, margin:"0 auto", borderRadius: 4, overflow:"hidden", border:"2px solid #D4AF37", background:"#2a0a38", boxShadow:"inset 0 4px 10px rgba\(0,0,0,0\.4\), 0 8px 24px rgba\(184,146,42,0\.15\)"\}\}>\s*<div style=\{\{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center"\}\}>\s*<p className="scratch-text" style=\{\{fontWeight:700, color:"#D4AF37", margin:0, textShadow:"0 2px 10px rgba\(212,175,55,0\.3\)"\}\}>\{code\}</p>'

new_jsx = '''<div className="scratch-hover" style={{position:"relative", width: "100%", maxWidth: 320, height: 100, margin:"0 auto", borderRadius: 8, overflow:"hidden", border:"2px solid #F3E5AB", background:"linear-gradient(135deg, #1a0822, #3a1548)", boxShadow:"0 0 25px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)"}}>
       <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center"}}>
          <p className="scratch-text" style={{fontWeight:800, color:"#F3E5AB", margin:0, textShadow:"0 0 15px rgba(212,175,55,0.8), 0 0 30px rgba(212,175,55,0.5)", letterSpacing:"6px"}}>{code}</p>'''

content = re.sub(old_jsx, new_jsx, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratch card to VIP gold successfully.")
