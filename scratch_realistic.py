import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the canvas drawing logic
old_canvas = r'''    // Premium Luxury Gold Foil Background
    const baseGradient = ctx\.createLinearGradient\(0, 0, width, height\);
    baseGradient\.addColorStop\(0, "#C59B27"\);
    baseGradient\.addColorStop\(0\.3, "#F3E5AB"\);
    baseGradient\.addColorStop\(0\.5, "#D4AF37"\);
    baseGradient\.addColorStop\(0\.7, "#FFF"\);
    baseGradient\.addColorStop\(1, "#A67C00"\);
    ctx\.fillStyle = baseGradient;
    ctx\.fillRect\(0, 0, width, height\);

    // Subtle metallic wave/sheen
    const sheen = ctx\.createLinearGradient\(0, height, width, 0\);
    sheen\.addColorStop\(0, "rgba\(255,255,255,0\)"\);
    sheen\.addColorStop\(0\.45, "rgba\(255,255,255,0\)"\);
    sheen\.addColorStop\(0\.5, "rgba\(255,255,255,0\.6\)"\);
    sheen\.addColorStop\(0\.55, "rgba\(255,255,255,0\)"\);
    sheen\.addColorStop\(1, "rgba\(255,255,255,0\)"\);
    ctx\.fillStyle = sheen;
    ctx\.fillRect\(0, 0, width, height\);

    // Elegant inner border
    ctx\.strokeStyle = "rgba\(166, 124, 0, 0\.4\)";
    ctx\.lineWidth = 1;
    ctx\.strokeRect\(6, 6, width - 12, height - 12\);
    ctx\.strokeStyle = "rgba\(255, 255, 255, 0\.4\)";
    ctx\.strokeRect\(7, 7, width - 14, height - 14\);

    // Subtle repeating minimal pattern \(dots instead of loud diamonds\)
    ctx\.fillStyle = "rgba\(166, 124, 0, 0\.15\)";
    for\(let y = 10; y < height - 10; y \+= 8\) \{
      for\(let x = 10; x < width - 10; x \+= 8\) \{
         ctx\.beginPath\(\);
         ctx\.arc\(x, y, 0\.5, 0, 2\*Math\.PI\);
         ctx\.fill\(\);
      \}
    \}

    // Professional Serif Text
    ctx\.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
    ctx\.textAlign = "center";
    ctx\.textBaseline = "middle";
    ctx\.letterSpacing = "2px"; // HTML5 canvas letterSpacing support
    
    // Very subtle elegant drop shadow for text depth
    ctx\.fillStyle = "rgba\(255,255,255,0\.7\)";
    ctx\.fillText\("SCRATCH TO REVEAL", width/2, height/2 \+ 1\);
    
    // Main text
    ctx\.fillStyle = "#251737";
    ctx\.fillText\("SCRATCH TO REVEAL", width/2, height/2\);
    
    // Reset letterSpacing just in case
    ctx\.letterSpacing = "0px";

    let isDrawing = false;'''

new_canvas = '''    // Hyper-Realistic Silver Foil Background
    const baseGradient = ctx.createLinearGradient(0, 0, width, height);
    baseGradient.addColorStop(0, "#D3D7DF");
    baseGradient.addColorStop(0.2, "#B9BEC8");
    baseGradient.addColorStop(0.4, "#E2E6ED");
    baseGradient.addColorStop(0.5, "#939BA8");
    baseGradient.addColorStop(0.6, "#E2E6ED");
    baseGradient.addColorStop(0.8, "#B9BEC8");
    baseGradient.addColorStop(1, "#D3D7DF");
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed metal effect (horizontal lines)
    ctx.lineWidth = 0.5;
    for(let y = 0; y < height; y += 4) {
      ctx.strokeStyle = `rgba(255,255,255,${Math.random()*0.3})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      ctx.strokeStyle = `rgba(0,0,0,${Math.random()*0.05})`;
      ctx.beginPath();
      ctx.moveTo(0, y+2);
      ctx.lineTo(width, y+2);
      ctx.stroke();
    }

    // Overprint security pattern (classic scratch card look)
    ctx.fillStyle = "rgba(100, 105, 120, 0.15)";
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for(let y = 8; y < height; y += 16) {
      for(let x = (y % 32 === 0 ? 8 : 24); x < width; x += 32) {
         ctx.fillText("VIP", x, y);
      }
    }

    // Bold Professional Text
    ctx.font = "800 20px 'Montserrat', sans-serif";
    ctx.letterSpacing = "4px"; 
    
    // Drop shadow for text depth
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("SCRATCH HERE", width/2 + 1, height/2 + 2);
    
    // Main text (Dark Charcoal ink)
    ctx.fillStyle = "#1A1A1A";
    ctx.fillText("SCRATCH HERE", width/2, height/2);
    
    ctx.letterSpacing = "0px";

    let isDrawing = false;
    let lastPos = null;'''

content = re.sub(old_canvas, new_canvas, content)

# 2. Replace the scratching mouse logic
old_mouse = r'''    const startDrawing = \(e\) => \{
      isDrawing = true;
      scratch\(e\);
    \};

    const stopDrawing = \(\) => \{
      isDrawing = false;
      checkReveal\(\);
    \};

    const scratch = \(e\) => \{
      if \(!isDrawing\) return;
      const pos = getMousePos\(e\);
      ctx\.globalCompositeOperation = "destination-out";
      const radGrad = ctx\.createRadialGradient\(pos\.x, pos\.y, 10, pos\.x, pos\.y, 26\);
      radGrad\.addColorStop\(0, "rgba\(0,0,0,1\)"\);
      radGrad\.addColorStop\(1, "rgba\(0,0,0,0\)"\);
      ctx\.fillStyle = radGrad;
      ctx\.beginPath\(\);
      ctx\.arc\(pos\.x, pos\.y, 26, 0, 2 \* Math\.PI\);
      ctx\.fill\(\);
    \};'''

new_mouse = '''    const startDrawing = (e) => {
      isDrawing = true;
      lastPos = getMousePos(e);
      scratch(e);
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      lastPos = null;
      checkReveal();
    };

    const scratch = (e) => {
      if (!isDrawing) return;
      const currentPos = getMousePos(e);
      ctx.globalCompositeOperation = "destination-out";
      
      // Continuous smooth stroke scratching
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 42;
      
      // Slight shadow to soften edges like foil flaking
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0,0,0,1)";

      ctx.beginPath();
      if (lastPos) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
      } else {
        ctx.moveTo(currentPos.x, currentPos.y);
        ctx.lineTo(currentPos.x + 1, currentPos.y + 1);
        ctx.stroke();
      }
      
      lastPos = currentPos;
    };'''

content = re.sub(old_mouse, new_mouse, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ScratchCard realistic styling and scratch logic successfully.")
