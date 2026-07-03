import re

with open("khadlaj-perfumes (1).jsx", "r") as f:
    content = f.read()

# Replace the start of the mosaic wrapper
content = content.replace(
    '<div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gridTemplateRows:"auto",gap:3}}>',
    '<div className="mosaic-wrap">'
)

# Item 1
content = content.replace(
    '<div style={{gridColumn:"1/3",gridRow:"1/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549"\n              alt="Ihthiraam" loading="lazy"\n              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}',
    '<div className="mosaic-item mosaic-large-left">\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549"\n              alt="Ihthiraam" loading="lazy" className="mosaic-img"'
)

# Item 2
content = content.replace(
    '<div style={{gridColumn:"3/5",gridRow:"1/2",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819"\n              alt="Intoxicate Mystique" loading="lazy"\n              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease",aspectRatio:"1/1"}}',
    '<div className="mosaic-item mosaic-wide-top">\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819"\n              alt="Intoxicate Mystique" loading="lazy" className="mosaic-img"'
)

# Item 3
content = content.replace(
    '<div style={{gridColumn:"5/7",gridRow:"1/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282"\n              alt="Angel Dust" loading="lazy"\n              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}',
    '<div className="mosaic-item mosaic-tall-right">\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282"\n              alt="Angel Dust" loading="lazy" className="mosaic-img"'
)

# Item 4
content = content.replace(
    '<div style={{gridColumn:"3/4",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228"\n              alt="Onyx Gold" loading="lazy"\n              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}',
    '<div className="mosaic-item mosaic-small-1">\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228"\n              alt="Onyx Gold" loading="lazy" className="mosaic-img"'
)

# Item 5
content = content.replace(
    '<div style={{gridColumn:"4/5",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422"\n              alt="Shiyaaka Snow" loading="lazy"\n              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}',
    '<div className="mosaic-item mosaic-small-2">\n            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422"\n              alt="Shiyaaka Snow" loading="lazy" className="mosaic-img"'
)

# Update overlays
content = content.replace(
    '<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>',
    '<div className="mosaic-overlay">'
)
content = content.replace(
    '<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px 16px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>',
    '<div className="mosaic-overlay">'
)
content = content.replace(
    '<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>',
    '<div className="mosaic-overlay">'
)

# Item 6-11 (Map function)
content = content.replace(
    '<div key={item.name} style={{gridColumn:`${i+1}/${i+2}`,gridRow:"3/4",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>\n              <img src={item.src} alt={item.name} loading="lazy"\n                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",aspectRatio:"1/1",transition:"transform .6s ease"}}',
    '<div key={item.name} className="mosaic-item" style={{ gridColumn: typeof window !== "undefined" && window.innerWidth <= 900 ? "1 / -1" : `${i+1}/${i+2}`, gridRow: typeof window !== "undefined" && window.innerWidth <= 900 ? "auto" : "3/4" }}>\n              <img src={item.src} alt={item.name} loading="lazy" className="mosaic-img" style={{padding:"12px"}}'
)


with open("khadlaj-perfumes (1).jsx", "w") as f:
    f.write(content)
