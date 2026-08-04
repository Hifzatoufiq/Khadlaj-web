import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire ScratchCard function
old_scratch_card = r'function ScratchCard\(\{ code, onReveal \}\) \{[\s\S]*?\}\n\n/\* ═══════════════════════════════════════════════════════════════\n   ROOT APP'

new_scratch_card = '''function ScratchCard({ code, onReveal }) {
  const canvasRef = React.useRef(null);
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [prizeValue, setPrizeValue] = React.useState(code || "KHADLAJ10");

  React.useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || isRevealed) return;
    const canvasContext = canvasElement.getContext("2d");
    const width = canvasElement.width;
    const height = canvasElement.height;
    let isDragging = false;

    const initializeCanvas = () => {
      // Premium Luxury Gold Foil Background
      const baseGradient = canvasContext.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, "#C59B27");
      baseGradient.addColorStop(0.3, "#F3E5AB");
      baseGradient.addColorStop(0.5, "#D4AF37");
      baseGradient.addColorStop(0.7, "#FFF");
      baseGradient.addColorStop(1, "#A67C00");
      canvasContext.fillStyle = baseGradient;
      canvasContext.fillRect(0, 0, width, height);

      // Subtle metallic wave/sheen
      const sheen = canvasContext.createLinearGradient(0, height, width, 0);
      sheen.addColorStop(0, "rgba(255,255,255,0)");
      sheen.addColorStop(0.45, "rgba(255,255,255,0)");
      sheen.addColorStop(0.5, "rgba(255,255,255,0.6)");
      sheen.addColorStop(0.55, "rgba(255,255,255,0)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      canvasContext.fillStyle = sheen;
      canvasContext.fillRect(0, 0, width, height);

      // Elegant inner border
      canvasContext.strokeStyle = "rgba(166, 124, 0, 0.4)";
      canvasContext.lineWidth = 1;
      canvasContext.strokeRect(6, 6, width - 12, height - 12);
      canvasContext.strokeStyle = "rgba(255, 255, 255, 0.4)";
      canvasContext.strokeRect(7, 7, width - 14, height - 14);

      // Professional Serif Text
      canvasContext.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
      canvasContext.textAlign = "center";
      canvasContext.textBaseline = "middle";
      canvasContext.letterSpacing = "2px"; 
      
      // Main text
      canvasContext.fillStyle = "#251737";
      canvasContext.fillText("SCRATCH TO REVEAL", width/2, height/2);
    };

    const scratch = (x, y) => {
      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.beginPath();
      // Using circle arcs like the tutorial for realistic bumpy scratch animation
      canvasContext.arc(x, y, 20, 0, 2 * Math.PI);
      canvasContext.fill();
    };

    const getMouseCoordinates = (event) => {
      const rect = canvasElement.getBoundingClientRect();
      const clientX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
      const clientY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;
      
      // Calculate taking into account potential page scrolling
      const x = (clientX || 0) - (rect.left + window.scrollX);
      const y = (clientY || 0) - (rect.top + window.scrollY);
      
      // Scale to canvas internal resolution
      return { 
        x: x * (canvasElement.width / rect.width), 
        y: y * (canvasElement.height / rect.height) 
      };
    };

    const checkReveal = () => {
      if(isRevealed) return;
      const imageData = canvasContext.getImageData(0,0,width,height);
      const pixels = imageData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentCount++;
      }
      const percent = transparentCount / (pixels.length / 4);
      if (percent > 0.35) {
        setIsRevealed(true);
        if(onReveal) onReveal();
      }
    };

    const handleMouseDown = (event) => {
      isDragging = true;
      const { x, y } = getMouseCoordinates(event);
      scratch(x, y);
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        event.preventDefault();
        const { x, y } = getMouseCoordinates(event);
        scratch(x, y);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        checkReveal();
      }
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        isDragging = false;
        checkReveal();
      }
    };

    const isTouchDevice = 'ontouchstart' in window;

    canvasElement.addEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown, { passive: !isTouchDevice });
    canvasElement.addEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove, { passive: false });
    canvasElement.addEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
    canvasElement.addEventListener("mouseleave", handleMouseLeave);

    initializeCanvas();

    return () => {
      canvasElement.removeEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
      canvasElement.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
      canvasElement.removeEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
      canvasElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isRevealed]); // Removed onReveal to prevent constant re-rendering and erasing the canvas!

  return (
    <div className="scratch-hover" style={{position:"relative", width: "100%", maxWidth: 320, height: 100, margin:"0 auto", borderRadius: 8, overflow:"hidden", border:"2px solid #F3E5AB", background:"#111", boxShadow:"0 0 25px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)"}}>
       <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"radial-gradient(circle, #251737 0%, #0a0a0a 100%)", zIndex:1}}>
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
          }}>{prizeValue}</p>
       </div>
       <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", borderRadius: 8, opacity: isRevealed ? 0 : 1, transition: "opacity 0.6s ease", zIndex:10}}>
          <div className="shimmer-effect"></div>
       </div>
       <canvas 
          ref={canvasRef} 
          width={320} 
          height={100} 
          style={{
             position:"absolute", inset:0, 
             cursor: 'url("https://media.geeksforgeeks.org/wp-content/uploads/20231030101751/bx-eraser-icon.png"), auto', 
             width:"100%", height:"100%", 
             opacity: isRevealed ? 0 : 1, 
             transition: "opacity 0.6s ease", 
             pointerEvents: isRevealed ? "none" : "auto", 
             zIndex:10,
             WebkitUserSelect: "none",
             userSelect: "none",
             WebkitTouchCallout: "none",
             WebkitTapHighlightColor: "transparent"
          }} 
       />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP'''

content = re.sub(old_scratch_card, new_scratch_card, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ScratchCard component to use exact tutorial logic and fixed re-rendering issues.")
