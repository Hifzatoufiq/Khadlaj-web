import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Saudi and Bahrain back to COUNTRIES
old_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", currency:"AED", rate:1 },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", currency:"KWD", rate:0.08 },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];"""

new_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", currency:"AED", rate:1 },
  { name:"Saudi",    flagUrl:"https://flagcdn.com/w40/sa.png", currency:"SAR", rate:1.02 },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", currency:"KWD", rate:0.08 },
  { name:"Bahrain",  flagUrl:"https://flagcdn.com/w40/bh.png", currency:"BHD", rate:0.10 },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];"""

content = content.replace(old_countries, new_countries)


# 2. Update Navbar to display them like the footer pills (with flexWrap)
old_nav = """              <div style={{display:"flex",gap:2,alignItems:"center"}} className="hide-mob">
                <CountryContext.Consumer>
                  {({ activeCountry, setActiveCountry }) => (
                    <>
                      {COUNTRIES.map(c=>(
                        <div key={c.name} 
                             onClick={() => setActiveCountry(c)}
                             style={{display:"flex",alignItems:"center",gap:4,padding:"6px 8px",cursor:"pointer",transition:"all .2s ease",opacity:activeCountry.name===c.name ? 1 : 0.5}}
                             onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                             onMouseLeave={e=>{if(activeCountry.name!==c.name) e.currentTarget.style.opacity="0.5"}}>
                          {c.flagUrl === "global" ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#111"}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          ) : (
                            <img src={c.flagUrl} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:1}} />
                          )}
                          <span style={{fontSize:"9px",color:"#111",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>{c.name}</span>
                        </div>
                      ))}
                    </>
                  )}
                </CountryContext.Consumer>
              </div>"""

new_nav = """              <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",maxWidth:400}} className="hide-mob">
                <CountryContext.Consumer>
                  {({ activeCountry, setActiveCountry }) => (
                    <>
                      {COUNTRIES.map(c=>(
                        <div key={c.name} 
                             onClick={() => setActiveCountry(c)}
                             style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",cursor:"pointer",transition:"all .2s ease",border:"1px solid",borderColor:activeCountry.name===c.name ? "#111" : "#E8E4DC",borderRadius:4,background:activeCountry.name===c.name ? "#111" : "#fff",color:activeCountry.name===c.name ? "#fff" : "#111"}}
                             onMouseEnter={e=>{if(activeCountry.name!==c.name) {e.currentTarget.style.borderColor="#ccc";}}}
                             onMouseLeave={e=>{if(activeCountry.name!==c.name) {e.currentTarget.style.borderColor="#E8E4DC";}}}>
                          {c.flagUrl === "global" ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          ) : (
                            <img src={c.flagUrl} alt="" style={{width:14,height:10,objectFit:"cover",borderRadius:1}} />
                          )}
                          <span style={{fontSize:"9px",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>{c.name}</span>
                        </div>
                      ))}
                    </>
                  )}
                </CountryContext.Consumer>
              </div>"""

content = content.replace(old_nav, new_nav)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
