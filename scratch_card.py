import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_draw = r'    // Fill with a radial luxury gold gradient.*?ctx\.shadowColor = "transparent"; // reset'

new_draw = '''    // Fill with a realistic silver foil texture
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#c4c4c4");
    gradient.addColorStop(0.3, "#e6e6e6");
    gradient.addColorStop(0.7, "#9c9c9c");
    gradient.addColorStop(1, "#c4c4c4");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add noise to simulate metallic foil grain
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 40 - 20;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imgData, 0, 0);

    // Draw scratch card wavy security pattern
    ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
    ctx.lineWidth = 1.5;
    for(let y = 0; y < height; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for(let x = 0; x < width; x += 20) {
         ctx.quadraticCurveTo(x + 10, y + 4, x + 20, y);
      }
      ctx.stroke();
    }

    // Add text with embossed look
    ctx.font = "800 17px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Highlight (bottom right)
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("SCRATCH TO REVEAL", width/2 + 1, height/2 + 1);
    
    // Shadow (top left)
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText("SCRATCH TO REVEAL", width/2 - 1, height/2 - 1);
    
    // Main text
    ctx.fillStyle = "#707070";
    ctx.fillText("SCRATCH TO REVEAL", width/2, height/2);'''

content = re.sub(old_draw, new_draw, content, flags=re.DOTALL)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratch card texture successfully.")
