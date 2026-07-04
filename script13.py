import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the COUNTRIES array
old_countries = """const COUNTRIES = [
  { name:"UAE",    flagUrl:"https://flagcdn.com/w40/ae.png", domain:"khadlaj.ae" },
  { name:"Saudi",  flagUrl:"https://flagcdn.com/w40/sa.png", domain:"khadlaj.sa" },
  { name:"Kuwait", flagUrl:"https://flagcdn.com/w40/kw.png", domain:"khadlaj.kw" },
  { name:"Bahrain",flagUrl:"https://flagcdn.com/w40/bh.png", domain:"khadlaj.bh" },
  { name:"Global", flagUrl:"global", domain:"khadlaj-perfumes.com" },
];"""

new_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", domain:"khadlaj.ae" },
  { name:"Saudi",    flagUrl:"https://flagcdn.com/w40/sa.png", domain:"khadlaj.sa" },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", domain:"khadlaj.kw" },
  { name:"Bahrain",  flagUrl:"https://flagcdn.com/w40/bh.png", domain:"khadlaj.bh" },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", domain:"khadlaj.in" },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", domain:"khadlaj.eg" },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", domain:"khadlaj.my" },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", domain:"khadlaj.co.uk" },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", domain:"khadlaj.us" },
  { name:"Global",   flagUrl:"global", domain:"khadlaj-perfumes.com" },
];"""

content = content.replace(old_countries, new_countries)

# 2. Update the Topbar country selector to be a dropdown
old_nav_left = """            {/* Left utility */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{display:"flex",gap:4,alignItems:"center"}} className="hide-mob">
                {COUNTRIES.map(c=>(
                  <div key={c.name} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",background:"transparent",cursor:"pointer",transition:"all .25s ease",opacity:0.75}}
                    onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1.05)";}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity="0.75";e.currentTarget.style.transform="scale(1)";}}
                  >
                    {c.flagUrl === "global" ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#111"}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    ) : (
                      <img src={c.flagUrl} alt="" style={{width:20,height:14,objectFit:"cover",borderRadius:1}} />
                    )}
                    <span style={{fontSize:"10.5px",color:"#111",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>{c.name}</span>
                  </div>
                ))}
              </div>"""

new_nav_left = """            {/* Left utility */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{display:"flex",gap:4,alignItems:"center"}} className="hide-mob">
                
                <div style={{position:"relative"}} 
                     onMouseEnter={e=>{e.currentTarget.querySelector('.country-dropdown').style.opacity='1'; e.currentTarget.querySelector('.country-dropdown').style.visibility='visible'; e.currentTarget.querySelector('.country-dropdown').style.transform='translateY(0)';}}
                     onMouseLeave={e=>{e.currentTarget.querySelector('.country-dropdown').style.opacity='0'; e.currentTarget.querySelector('.country-dropdown').style.visibility='hidden'; e.currentTarget.querySelector('.country-dropdown').style.transform='translateY(10px)';}}>
                  
                  {/* Active Selection */}
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",cursor:"pointer",transition:"all .2s ease"}}>
                    <img src="https://flagcdn.com/w40/ae.png" alt="UAE" style={{width:20,height:14,objectFit:"cover",borderRadius:1}} />
                    <span style={{fontSize:"10.5px",color:"#111",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>UAE</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="country-dropdown" style={{position:"absolute",top:"100%",left:0,background:"#fff",boxShadow:"0 12px 40px rgba(0,0,0,0.12)",borderRadius:4,padding:"12px 0",display:"flex",flexDirection:"column",minWidth:160,opacity:0,visibility:"hidden",transform:"translateY(10px)",transition:"all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",zIndex:200,border:"1px solid #F0F0F0"}}>
                    {COUNTRIES.map(c=>(
                      <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 20px",cursor:"pointer",transition:"background .2s"}}
                           onMouseEnter={e=>e.currentTarget.style.background="#F9F9F9"}
                           onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                        {c.flagUrl === "global" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        ) : (
                          <img src={c.flagUrl} alt="" style={{width:20,height:14,objectFit:"cover",borderRadius:1,boxShadow:"0 0 0 1px rgba(0,0,0,.05)"}} />
                        )}
                        <span style={{fontSize:"10px",color:"#333",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",whiteSpace:"nowrap"}}>{c.name}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>"""

content = content.replace(old_nav_left, new_nav_left)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
