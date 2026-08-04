import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_mouse = r'''    const startDrawing = \(e\) => \{
      isDrawing = true;
      lastPos = getMousePos\(e\);
      scratch\(e\);
    \};

    const stopDrawing = \(\) => \{
      if \(!isDrawing\) return;
      isDrawing = false;
      lastPos = null;
      checkReveal\(\);
    \};

    const scratch = \(e\) => \{
      if \(!isDrawing\) return;
      const currentPos = getMousePos\(e\);
      ctx\.globalCompositeOperation = "destination-out";
      
      // Continuous smooth stroke scratching
      ctx\.lineJoin = "round";
      ctx\.lineCap = "round";
      ctx\.lineWidth = 42;
      
      // Slight shadow to soften edges like foil flaking
      ctx\.shadowBlur = 4;
      ctx\.shadowColor = "rgba\(0,0,0,1\)";

      ctx\.beginPath\(\);
      if \(lastPos\) \{
        ctx\.moveTo\(lastPos\.x, lastPos\.y\);
        ctx\.lineTo\(currentPos\.x, currentPos\.y\);
        ctx\.stroke\(\);
      \} else \{
        ctx\.moveTo\(currentPos\.x, currentPos\.y\);
        ctx\.lineTo\(currentPos\.x \+ 1, currentPos\.y \+ 1\);
        ctx\.stroke\(\);
      \}
      
      lastPos = currentPos;
    \};

    const checkReveal = \(\) => \{
      if\(isRevealed\) return;
      const imageData = ctx\.getImageData\(0,0,width,height\);
      const pixels = imageData\.data;
      let transparentCount = 0;
      for \(let i = 3; i < pixels\.length; i \+= 4\) \{
        if \(pixels\[i\] === 0\) transparentCount\+\+;
      \}
      const percent = transparentCount / \(pixels\.length / 4\);
      if \(percent > 0\.45\) \{'''

new_mouse = '''    const startDrawing = (e) => {
      isDrawing = true;
      lastPos = getMousePos(e);
      // Removed scratch(e) so a single click doesn't immediately scratch a big circle
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      lastPos = null;
      checkReveal();
    };

    const scratch = (e) => {
      if (!isDrawing || !lastPos) return;
      const currentPos = getMousePos(e);
      
      // Prevent tiny micro-movements from counting as a scratch
      const dx = currentPos.x - lastPos.x;
      const dy = currentPos.y - lastPos.y;
      if (dx * dx + dy * dy < 4) return; // Must move at least 2 pixels

      ctx.globalCompositeOperation = "destination-out";
      
      // Continuous smooth stroke scratching
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 42;
      
      // Slight shadow to soften edges like foil flaking
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0,0,0,1)";

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
      
      lastPos = currentPos;
    };

    const checkReveal = () => {
      if(isRevealed) return;
      const imageData = ctx.getImageData(0,0,width,height);
      const pixels = imageData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentCount++;
      }
      const percent = transparentCount / (pixels.length / 4);
      // Increased threshold so they have to scratch at least 60% of the card
      if (percent > 0.60) {'''

content = re.sub(old_mouse, new_mouse, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratching interaction to prevent single-click scratching.")
