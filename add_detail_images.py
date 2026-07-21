import re
import json

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# I will define the detailImages manually for the gift sets.
detail_images = {
    "NAFAIS SHARQ GIFT SET": [
        "./assets/images/products/nafais_gift_set_nobox.jpg",
        "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NAFAIS-3.jpg?v=1783943403"
    ],
    "CREAM VELVET GIFT SET": [
        "./assets/images/products/creamvelvet_gift_set_nobox.jpg",
        "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094"
    ],
    "HUROOF 3 PCS PERFUMES COLLECTION GIFT SET": [
        "./assets/images/products/huroof_gift_set_nobox.jpg"
    ],
    "GRAND COLLECTION 3 PIECES GIFT SET": [
        "./assets/images/products/grand_gift_set_nobox.jpg"
    ],
    "ISLAND GIFT SET FOR HIM & HER": [
        "./assets/images/products/island_gift_set_nobox.jpg"
    ]
}

# The user asked for "2 IMAGE RAKHO WOTHO BOX". If I only have 1, I'll just put 1. If I have 2, I'll put 2.
# Let's see if I have other cropped ones.
# In my earlier crop script, I did panache, bahraini, kuwaiti, but those are single perfumes, not gift sets.
# I will just inject detailImages into these specific Gift Sets.

for title, imgs in detail_images.items():
    imgs_str = json.dumps(imgs)
    # find the object with this name
    pattern = r'(    "name": "' + re.escape(title) + r'",\n)'
    if re.search(pattern, code, flags=re.IGNORECASE):
        code = re.sub(pattern, r'\g<1>    "detailImages": ' + imgs_str + r',\n', code, count=1, flags=re.IGNORECASE)

# Now modify the ProductPage component
old_product_page_html = """
          {/* ── Left: Static Product Image ── */}
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
"""

new_product_page_html = """
          {/* ── Left: Product Image(s) ── */}
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
          </div>
"""

# Replace exact string
code = code.replace(old_product_page_html.strip(), new_product_page_html.strip())

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated ProductPage to support detailImages")
