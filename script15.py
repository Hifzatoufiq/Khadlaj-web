import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update COUNTRIES array
old_countries = """const COUNTRIES = [
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

new_countries = """const COUNTRIES = [
  { name:"UAE",      flagUrl:"https://flagcdn.com/w40/ae.png", currency:"AED", rate:1 },
  { name:"Kuwait",   flagUrl:"https://flagcdn.com/w40/kw.png", currency:"KWD", rate:0.08 },
  { name:"India",    flagUrl:"https://flagcdn.com/w40/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"https://flagcdn.com/w40/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"https://flagcdn.com/w40/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"https://flagcdn.com/w40/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"https://flagcdn.com/w40/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];
const CountryContext = React.createContext();
"""

content = content.replace(old_countries, new_countries)

# 2. Add context to App
content = content.replace(
    'function App() {',
    'function App() {\n  const [activeCountry, setActiveCountry] = React.useState(COUNTRIES[0]);'
)

# Replace the main return wrapper in App to include the Provider
old_app_return = """  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",color:"#000",background:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column"}}>"""
new_app_return = """  return (
    <CountryContext.Provider value={{ activeCountry, setActiveCountry }}>
    <div style={{fontFamily:"'Montserrat',sans-serif",color:"#000",background:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column"}}>"""
content = content.replace(old_app_return, new_app_return)

content = content.replace(
    '      <Footer setPage={setPage}/>',
    '      <Footer setPage={setPage}/>\n    </CountryContext.Provider>'
)

# 3. Fix ProductCard
old_pc = """function ProductCard({ p, light=false }){
  const [hov, setHov] = React.useState(false);"""
new_pc = """function ProductCard({ p, light=false }){
  const [hov, setHov] = React.useState(false);
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;"""
content = content.replace(old_pc, new_pc)
content = content.replace('AED {p.price}', '{formatPrice(p.price)}')

# 4. Fix Navbar (remove dropdown, render horizontally)
old_nav = """            {/* Left utility */}
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

new_nav = """            {/* Left utility */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{display:"flex",gap:2,alignItems:"center"}} className="hide-mob">
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

content = content.replace(old_nav, new_nav)

# 5. Add Social Icons to Footer
old_footer = """          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {COUNTRIES.map(c=>(
              <span key={c.name} style={{fontSize:10,color:"#111",fontFamily:"'Montserrat',sans-serif",cursor:"pointer",padding:"4px 8px",background:"#fff",border:"1px solid #E8E4DC",borderRadius:4}}>{c.name}</span>
            ))}
          </div>"""

new_footer = """          {/* Social Icons */}
          <div style={{display:"flex",gap:12,marginTop:24}}>
            {[
              {n:"facebook", p:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"},
              {n:"twitter", p:"M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"},
              {n:"instagram", p:"M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A5 5 0 0122.5 12v0a5 5 0 01-5 5h-11a5 5 0 01-5-5v0a5 5 0 015-5z"},
              {n:"linkedin", p:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z"},
              {n:"youtube", p:"M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"}
            ].map(social=>(
              <a key={social.n} href="#" style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:"50%",background:"#000",color:"#fff",textDecoration:"none",transition:"transform .2s, background .2s"}}
                 onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.background="#B8922A"}}
                 onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.background="#000"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={social.p}/></svg>
              </a>
            ))}
          </div>"""

content = content.replace(old_footer, new_footer)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)
