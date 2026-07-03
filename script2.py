import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove Mosaic CSS classes
css_to_remove = """  /* Mosaic Grid */
  .mosaic-wrap {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 240px;
    gap: 4px;
  }
  .mosaic-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #FAFAFA;
  }
  .mosaic-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 24px;
    transition: transform 0.6s ease;
  }
  .mosaic-item:hover .mosaic-img {
    transform: scale(1.06);
  }
  .mosaic-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    pointer-events: none;
  }
  .mosaic-large-left { grid-column: 1 / 3; grid-row: span 2; }
  .mosaic-wide-top { grid-column: 3 / 5; grid-row: span 1; }
  .mosaic-small-1 { grid-column: 3 / 4; grid-row: span 1; }
  .mosaic-small-2 { grid-column: 4 / 5; grid-row: span 1; }
  .mosaic-tall-right { grid-column: 5 / 7; grid-row: span 2; }"""

mobile_css_to_remove = """    /* Mosaic Grid Mobile */
    .mosaic-wrap {
      grid-template-columns: 1fr !important;
      grid-auto-rows: 300px !important;
    }
    .mosaic-large-left, .mosaic-wide-top, .mosaic-small-1, .mosaic-small-2, .mosaic-tall-right {
      grid-column: 1 / -1 !important;
      grid-row: span 1 !important;
    }"""

content = content.replace(css_to_remove, "")
content = content.replace(mobile_css_to_remove, "")


# 2. Replace the mosaic wrap HTML with a clean horizontal reel
# The reel HTML
new_html = """        {/* Editorial Feed — Horizontal Scroll */}
        <div className="reel-track hide-scrollbar" style={{padding:"0 5vw 40px"}}>
          {[
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549",name:"Ihthiraam"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",name:"Intoxicate Mystique"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282",name:"Angel Dust"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228",name:"Onyx Gold"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422",name:"Shiyaaka Snow"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",name:"Saraya"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207",name:"Sawaar Vanille Blanc"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais_Magrib-3.jpg?v=1761115886",name:"Nafais Magrib"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1775637258",name:"Qarar"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400",name:"Zayaan Silver"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615",name:"Icon"},
          ].map((item,i)=>(
            <div key={item.name} className="reel-card" style={{flex:"0 0 min(280px,75vw)",position:"relative",overflow:"hidden",aspectRatio:"4/5",cursor:"pointer",background:"#F9F8F6"}}>
              <img src={item.src} alt={item.name} loading="lazy" 
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center",transition:"transform .8s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",pointerEvents:"none"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",pointerEvents:"none"}}>
                <p style={{fontSize:9,letterSpacing:2,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:4}}>World of Khadlaj</p>
                <p className="disp" style={{fontSize:16,fontWeight:300,color:"#fff"}}>{item.name}</p>
              </div>
            </div>
          ))}
        </div>"""


# Use regex to find and replace the entire mosaic block
# The block starts with {/* Mosaic grid — varying sizes for editorial feel */}
# and ends right before </section>
pattern = re.compile(r'\{\/\* Mosaic grid — varying sizes for editorial feel \*\/}.*?(?=<\/section>)', re.DOTALL)
content = pattern.sub(new_html, content)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
