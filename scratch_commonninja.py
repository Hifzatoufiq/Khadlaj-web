import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the ScratchCard function
old_scratch_card_comp = r'''/\* ═══════════════════════════════════════════════════════════════
   SCRATCH CARD COMPONENT
═══════════════════════════════════════════════════════════════ \*/
function ScratchCard\(\{ code, onReveal \}\) \{[\s\S]*?\}\);

    return \(
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
    \);
\}'''

content = re.sub(old_scratch_card_comp, '', content)

# Replace the custom popup in the App render with the common ninja widget
# The custom popup starts at `{showPopup && !popupDone && (`
old_popup_render = r'''      \{showPopup && !popupDone && \(
        <div style=\{\{
          position:"fixed", inset:0, zIndex:99999, display:"flex", alignItems:"center", justifyContent:"center",
          background:"rgba\(0,0,0,0\.85\)", backdropFilter:"blur\(8px\)", padding: 20
        \}\}>
[\s\S]*?      \)\}'''

new_popup_render = '''      {/* Common Ninja Scratch Card Widget */}
      <div className="commonninja_component pid-950790ec-bd4f-4717-bad5-d98af52e309f"></div>'''

content = re.sub(old_popup_render, new_popup_render, content)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Replaced custom scratch card with Common Ninja widget.")
