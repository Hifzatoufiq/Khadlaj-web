import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = r'''    const startDrawing = \(e\) => \{
      isDrawing = true;
      lastPos = getMousePos\(e\);
      // Removed scratch\(e\) so a single click doesn't immediately scratch a big circle
    \};

    const stopDrawing = \(\) => \{
      if \(!isDrawing\) return;
      isDrawing = false;
      lastPos = null;
      checkReveal\(\);
    \};

    const scratch = \(e\) => \{
      if \(!isDrawing \|\| !lastPos\) return;
      const currentPos = getMousePos\(e\);
      
      // Prevent tiny micro-movements from counting as a scratch
      const dx = currentPos\.x - lastPos\.x;
      const dy = currentPos\.y - lastPos\.y;
      if \(dx \* dx \+ dy \* dy < 4\) return; // Must move at least 2 pixels

      ctx\.globalCompositeOperation = "destination-out";
      
      // Continuous smooth stroke scratching
      ctx\.lineJoin = "round";
      ctx\.lineCap = "round";
      ctx\.lineWidth = 42;
      
      // Slight shadow to soften edges like foil flaking
      ctx\.shadowBlur = 4;
      ctx\.shadowColor = "rgba\(0,0,0,1\)";

      ctx\.beginPath\(\);
      ctx\.moveTo\(lastPos\.x, lastPos\.y\);
      ctx\.lineTo\(currentPos\.x, currentPos\.y\);
      ctx\.stroke\(\);
      
      lastPos = currentPos;
    \};'''

new_logic = '''    const startDrawing = (e) => {
      isDrawing = true;
      lastPos = getMousePos(e);
      scratch(e, true);
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      isDrawing = false;
      lastPos = null;
      checkReveal();
    };

    const scratch = (e, isInitialClick = false) => {
      if (!isDrawing || !lastPos) return;
      const currentPos = getMousePos(e);
      
      if (!isInitialClick) {
        const dx = currentPos.x - lastPos.x;
        const dy = currentPos.y - lastPos.y;
        if (dx * dx + dy * dy < 4) return;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 42;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0,0,0,1)";

      ctx.beginPath();
      if (isInitialClick) {
        ctx.arc(currentPos.x, currentPos.y, 21, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
      }
      
      lastPos = currentPos;
    };'''

content = re.sub(old_logic, new_logic, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated scratch card to scratch on click.")
