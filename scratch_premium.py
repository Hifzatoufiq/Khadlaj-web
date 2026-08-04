import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_canvas = r'''    // Fill with a realistic luxury GOLD foil texture
    const gradient = ctx\.createLinearGradient\(0, 0, width, height\);
    gradient\.addColorStop\(0, "#855C0B"\);
    gradient\.addColorStop\(0\.2, "#D4AF37"\);
    gradient\.addColorStop\(0\.5, "#F3E5AB"\);
    gradient\.addColorStop\(0\.8, "#D4AF37"\);
    gradient\.addColorStop\(1, "#855C0B"\);
    
    ctx\.fillStyle = gradient;
    ctx\.fillRect\(0, 0, width, height\);

    // Add noise to simulate metallic gold foil grain
    const imgData = ctx\.getImageData\(0, 0, width, height\);
    const data = imgData\.data;
    for \(let i = 0; i < data\.length; i \+= 4\) \{
      const noise = Math\.random\(\) \* 30 - 15;
      data\[i\] \+= noise;     // R
      data\[i \+ 1\] \+= noise; // G
      data\[i \+ 2\] \+= noise; // B
    \}
    ctx\.putImageData\(imgData, 0, 0\);

    // Draw luxury geometric diamond pattern
    ctx\.strokeStyle = "rgba\(133, 92, 11, 0\.25\)";
    ctx\.lineWidth = 1;
    for\(let y = -20; y < height \+ 20; y \+= 16\) \{
      ctx\.beginPath\(\);
      for\(let x = -20; x < width \+ 20; x \+= 16\) \{
         ctx\.moveTo\(x, y \+ 8\);
         ctx\.lineTo\(x \+ 8, y\);
         ctx\.lineTo\(x \+ 16, y \+ 8\);
         ctx\.lineTo\(x \+ 8, y \+ 16\);
         ctx\.closePath\(\);
      \}
      ctx\.stroke\(\);
    \}

    // Add text with embossed look
    ctx\.font = "800 15px 'Montserrat', sans-serif";
    ctx\.textAlign = "center";
    ctx\.textBaseline = "middle";
    
    // Highlight \(bottom right\)
    ctx\.fillStyle = "rgba\(255, 255, 255, 0\.7\)";
    ctx\.fillText\("REVEAL VIP PRIVILEGE", width/2 \+ 1, height/2 \+ 1\);
    
    // Shadow \(top left\)
    ctx\.fillStyle = "rgba\(80, 50, 0, 0\.6\)";
    ctx\.fillText\("REVEAL VIP PRIVILEGE", width/2 - 1, height/2 - 1\);
    
    // Main text
    ctx\.fillStyle = "#855C0B";
    ctx\.fillText\("REVEAL VIP PRIVILEGE", width/2, height/2\);'''

new_canvas = '''    // Premium Luxury Gold Foil Background
    const baseGradient = ctx.createLinearGradient(0, 0, width, height);
    baseGradient.addColorStop(0, "#C59B27");
    baseGradient.addColorStop(0.3, "#F3E5AB");
    baseGradient.addColorStop(0.5, "#D4AF37");
    baseGradient.addColorStop(0.7, "#FFF");
    baseGradient.addColorStop(1, "#A67C00");
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle metallic wave/sheen
    const sheen = ctx.createLinearGradient(0, height, width, 0);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.45, "rgba(255,255,255,0)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0.6)");
    sheen.addColorStop(0.55, "rgba(255,255,255,0)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    // Elegant inner border
    ctx.strokeStyle = "rgba(166, 124, 0, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, width - 12, height - 12);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.strokeRect(7, 7, width - 14, height - 14);

    // Subtle repeating minimal pattern (dots instead of loud diamonds)
    ctx.fillStyle = "rgba(166, 124, 0, 0.15)";
    for(let y = 10; y < height - 10; y += 8) {
      for(let x = 10; x < width - 10; x += 8) {
         ctx.beginPath();
         ctx.arc(x, y, 0.5, 0, 2*Math.PI);
         ctx.fill();
      }
    }

    // Professional Serif Text
    ctx.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "2px"; // HTML5 canvas letterSpacing support
    
    // Very subtle elegant drop shadow for text depth
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("SCRATCH TO REVEAL", width/2, height/2 + 1);
    
    // Main text
    ctx.fillStyle = "#251737";
    ctx.fillText("SCRATCH TO REVEAL", width/2, height/2);
    
    // Reset letterSpacing just in case
    ctx.letterSpacing = "0px";'''

content = re.sub(old_canvas, new_canvas, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ScratchCard canvas design successfully.")
