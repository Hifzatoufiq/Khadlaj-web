import sys

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

target = """  const filtered = PRODUCTS.filter(p=>{
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    return isKhadlajProduct && p.col===activeCat;
  }).slice(0,16);"""

replacement = """  const filtered = PRODUCTS.filter(p=>{
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    return isKhadlajProduct && (p.col || '').toLowerCase() === activeCat.toLowerCase();
  }).slice(0,16);"""

if target in code:
    code = code.replace(target, replacement)
    
    # Now replace the newLaunches array
    start_nl = code.find('  const newLaunches = [')
    end_nl = code.find('  ];', start_nl)
    
    if start_nl != -1 and end_nl != -1:
        end_nl += 4
        nl_replacement = '  const newLaunches = PRODUCTS.filter(p => p.badge === "New").slice(0, 8);\n'
        code = code[:start_nl] + nl_replacement + code[end_nl:]
        
        with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
            f.write(code)
        print("Success")
    else:
        print("newLaunches array not found")
else:
    print("Target not found")
