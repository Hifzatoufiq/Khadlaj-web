import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update lineWidth in scratch
old_scratch = r'''      ctx\.globalCompositeOperation = "destination-out";
      ctx\.lineJoin = "round";
      ctx\.lineCap = "round";
      ctx\.lineWidth = 42;
      ctx\.shadowBlur = 4;'''

new_scratch = '''      ctx.globalCompositeOperation = "destination-out";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 60; // Thicker brush for faster clearing
      ctx.shadowBlur = 4;'''

content = re.sub(old_scratch, new_scratch, content)

# 2. Update transparent check and threshold in checkReveal
old_reveal = r'''      let transparentCount = 0;
      for \(let i = 3; i < pixels\.length; i \+= 4\) \{
        if \(pixels\[i\] === 0\) transparentCount\+\+;
      \}
      const percent = transparentCount / \(pixels\.length / 4\);
      if \(percent > 0\.40\) \{'''

new_reveal = '''      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        // Count partially transparent pixels as well since shadowBlur creates semi-transparent edges
        if (pixels[i] < 128) transparentCount++;
      }
      const percent = transparentCount / (pixels.length / 4);
      // Lowered threshold to 30% for a very fast reveal
      if (percent > 0.30) {'''

content = re.sub(old_reveal, new_reveal, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratching brush size and reveal logic for instant feedback.")
