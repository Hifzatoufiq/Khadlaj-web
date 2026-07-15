import re

with open("khadlaj-perfumes (1).jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the old top country selector bar
# Find the block starting with "{/* ── Country selector bar ── */}" up to "{/* ── Announcement bar ── */}"
# We'll use a regex search to match this block and replace it with just the Announcement bar comment.
pattern = r"\{\/\* ── Country selector bar ── \*\/\}\s*<CountryContext\.Consumer>.*?<\/CountryContext\.Consumer>\s*"
content = re.sub(pattern, "", content, flags=re.DOTALL)

# 2. Add the desktop country selector into the "Left utility" div
old_left_utility = """            {/* Left utility */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span className="mob-search-left" style={{cursor:"pointer",display:"flex",alignItems:"center"}} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>"""

new_left_utility = """            {/* Left utility */}
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <span className="mob-search-left" style={{cursor:"pointer",display:"flex",alignItems:"center"}} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div className="hide-mob" style={{display:"flex",alignItems:"center",gap:6}}>
                <CountryContext.Consumer>
                  {({ activeCountry, setActiveCountry }) => (
                    COUNTRIES.map(c => {
                      const isActive = activeCountry.name === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setActiveCountry(c)}
                          style={{
                            display:"flex",alignItems:"center",gap:5,
                            padding:"4px 8px",
                            border: isActive ? "1px solid #B8922A" : "1px solid #E8E4DC",
                            borderRadius:3,
                            background: isActive ? "#FAF9F6" : "transparent",
                            cursor:"pointer",
                            fontFamily:"'Montserrat',sans-serif",
                            fontSize:9.5,fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#B8922A" : "#555",
                            transition:"all .2s",
                          }}
                          onMouseEnter={e => { if(!isActive){ e.currentTarget.style.borderColor="#B8922A"; e.currentTarget.style.color="#B8922A"; } }}
                          onMouseLeave={e => { if(!isActive){ e.currentTarget.style.borderColor="#E8E4DC"; e.currentTarget.style.color="#555"; } }}
                        >
                          {c.flagUrl === "global"
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            : <img src={c.flagUrl} alt={c.name} style={{width:15,height:10,objectFit:"cover",borderRadius:1,display:"block"}} />
                          }
                          {c.name}
                        </button>
                      );
                    })
                  )}
                </CountryContext.Consumer>
              </div>
            </div>"""

# Replace in unix and windows newline formats
content = content.replace(old_left_utility.replace("\n", "\r\n"), new_left_utility.replace("\n", "\r\n"))
content = content.replace(old_left_utility, new_left_utility)

# 3. Add mobile country selector in mobile menu right under social links
old_mobile_menu_socials = """            <div style={{padding:"14px 6% 0",display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["Instagram",SOCIAL_LINKS.instagram],["TikTok",SOCIAL_LINKS.tiktok]].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{fontSize:9,letterSpacing:2,color:"#888",border:"1px solid #E0E0E0",padding:"7px 14px",textDecoration:"none",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
                  {s}
                </a>
              ))}
            </div>"""

new_mobile_menu_socials = """            <div style={{padding:"14px 6% 0",display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["Instagram",SOCIAL_LINKS.instagram],["TikTok",SOCIAL_LINKS.tiktok]].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{fontSize:9,letterSpacing:2,color:"#888",border:"1px solid #E0E0E0",padding:"7px 14px",textDecoration:"none",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
                  {s}
                </a>
              ))}
            </div>
            <div style={{padding:"18px 6% 0",borderTop:"1px solid #F0EBE3",marginTop:18}}>
              <p style={{fontSize:9,letterSpacing:2,color:"#888",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:8,fontWeight:600}}>Select Country</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <CountryContext.Consumer>
                  {({ activeCountry, setActiveCountry }) => (
                    COUNTRIES.map(c => {
                      const isActive = activeCountry.name === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => { setActiveCountry(c); setMobileMenuOpen(false); }}
                          style={{
                            display:"flex",alignItems:"center",gap:5,
                            padding:"6px 12px",
                            border: isActive ? "1px solid #B8922A" : "1px solid #E0E0E0",
                            borderRadius:4,
                            background: isActive ? "#FAF9F6" : "#fff",
                            cursor:"pointer",
                            fontFamily:"'Montserrat',sans-serif",
                            fontSize:10,fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#B8922A" : "#555",
                          }}
                        >
                          {c.flagUrl === "global"
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            : <img src={c.flagUrl} alt={c.name} style={{width:16,height:11,objectFit:"cover",borderRadius:1,display:"block"}} />
                          }
                          {c.name}
                        </button>
                      );
                    })
                  )}
                </CountryContext.Consumer>
              </div>
            </div>"""

content = content.replace(old_mobile_menu_socials.replace("\n", "\r\n"), new_mobile_menu_socials.replace("\n", "\r\n"))
content = content.replace(old_mobile_menu_socials, new_mobile_menu_socials)

with open("khadlaj-perfumes (1).jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Layout adjusted.")
