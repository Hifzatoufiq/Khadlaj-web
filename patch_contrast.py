import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update product card image stage container background
# Original code:
#       <div className="product-image-stage" style={{
#         position:"relative",
#         width:"100%",
#         height:"clamp(250px, 22vw, 330px)",
#         overflow:"hidden",
#         background:"transparent",
#         border:"none",
#         boxShadow:"none",
#         transition:"box-shadow .35s ease,border-color .35s ease"
#       }}>
content = content.replace(
    'background:"transparent",\r\n        border:"none",\r\n        boxShadow:"none",\r\n        transition:"box-shadow .35s ease,border-color .35s ease"\r\n      }}',
    'background:"#F5F5F2",\r\n        border:"none",\r\n        boxShadow:"none",\r\n        transition:"box-shadow .35s ease,border-color .35s ease"\r\n      }}'
)
content = content.replace(
    'background:"transparent",\n        border:"none",\n        boxShadow:"none",\n        transition:"box-shadow .35s ease,border-color .35s ease"\n      }}',
    'background:"#F5F5F2",\n        border:"none",\n        boxShadow:"none",\n        transition:"box-shadow .35s ease,border-color .35s ease"\n      }}'
)

# 2. Update search overlay image container background
# Original code:
# <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#fff",border:"1px solid #F1ECE4"}}>
content = content.replace(
    'background:"#fff",border:"1px solid #F1ECE4"',
    'background:"#F5F5F2",border:"1px solid #F1ECE4"'
)

# 3. Update main product detail page image container and mixBlendMode
# Original container style:
#           <div
#             style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", overflow:"hidden"}}
content = content.replace(
    'style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", overflow:"hidden"}}',
    'style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"#F5F5F2", borderRadius:"4px", overflow:"hidden"}}'
)

# Original img style on details page:
#               style={{width:"92%", height:"92%", objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)", transition:"transform .45s ease"}}
content = content.replace(
    'mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)", transition:"transform .45s ease"',
    'mixBlendMode:"normal", filter:"contrast(1.02) brightness(0.98)", transition:"transform .45s ease"'
)

# 4. Update small thumbnail image style in trending carousel
# Original: mixBlendMode:"multiply" -> mixBlendMode:"normal"
content = content.replace(
    'style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)"}}',
    'style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"normal", filter:"contrast(1.02) brightness(0.98)"}}'
)

# Also update the background of the thumbnail wrapper (line 571) to #F5F5F2 for consistency
content = content.replace(
    'background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:6',
    'background:"#F5F5F2", display:"flex", alignItems:"center", justifyContent:"center", padding:6'
)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Contrast issues patched.")
