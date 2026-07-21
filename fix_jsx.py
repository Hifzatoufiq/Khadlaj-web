import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the specific JSX block
old_pattern = r'(<\!-- Left: Static Product Image -->.*?<div[^>]*>\s*<img\s*src=\{product\.img\}[^>]*/>\s*</div>)'
new_jsx = """{/* ── Left: Product Image(s) ── */}
          <div style={{width:"100%"}}>
            {product.detailImages ? (
              <div style={{display:"flex", flexDirection:"column", gap:16}}>
                {product.detailImages.map((imgUrl, i) => (
                  <div key={i} style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"#fff", borderRadius:"4px", overflow:"hidden"}}>
                    <img src={imgUrl} alt={product.name} style={{width:"92%", height:"92%", objectFit:"contain", mixBlendMode:"normal", filter:"contrast(1.02) brightness(0.98)"}} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"#fff", borderRadius:"4px", overflow:"hidden"}}
                onMouseEnter={e=>{
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = "scale(1.05)";
                }}
                onMouseLeave={e=>{
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{width:"92%", height:"92%", objectFit:"contain", mixBlendMode:"normal", filter:"contrast(1.02) brightness(0.98)", transition:"transform .45s ease"}}
                />
              </div>
            )}
          </div>"""

# Wait, `<!--` is not valid JSX comment. It's `{/* ── Left: Static Product Image ── */}`
old_pattern = r'\{\/\*\s*── Left: Static Product Image ──\s*\*\/\}.*?<\/div>\s*<\/div>'
# Let me just do a simpler replace. I will look for `src={product.img}` in the `ProductPage` function.
# Or better, let's use the default replace_file_content tool!
