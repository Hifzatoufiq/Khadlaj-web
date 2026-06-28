var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

var navStart = src.indexOf("function Navbar({ page, setPage, cartCount }){");
var footerComment = "/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   FOOTER";
var navEnd = src.indexOf(footerComment, navStart);

var newNavbar = `function Navbar({ page, setPage, cartCount }){
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    var lower = q.toLowerCase();
    var results = PRODUCTS.filter(function(p) {
      return p.name.toLowerCase().includes(lower) ||
        p.col.toLowerCase().includes(lower) ||
        (p.notes||[]).some(function(n){ return n.toLowerCase().includes(lower); }) ||
        (p.gender||"").toLowerCase().includes(lower);
    }).slice(0, 8);
    setSearchResults(results);
  };

  return (
    <>
      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(255,255,255,.98)",display:"flex",flexDirection:"column",padding:"0 5%"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,borderBottom:"2px solid #000",padding:"28px 0 18px"}}>
            <span style={{fontSize:20,color:"#888"}}>⌕</span>
            <input autoFocus type="text" value={searchQuery} onChange={e=>handleSearch(e.target.value)}
              placeholder="Search fragrances, collections, notes..."
              style={{flex:1,border:"none",outline:"none",fontSize:"clamp(16px,2.5vw,26px)",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,color:"#000",background:"transparent"}}
            />
            <button onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);}}
              style={{background:"none",border:"none",fontSize:28,cursor:"pointer",color:"#000",fontWeight:300,lineHeight:1}}>×</button>
          </div>
          <div style={{flex:1,overflowY:"auto",paddingTop:24}}>
            {searchQuery && searchResults.length===0 && (
              <div style={{textAlign:"center",paddingTop:64}}>
                <p className="disp" style={{fontSize:28,fontWeight:300,color:"#000",marginBottom:8}}>No results for "{searchQuery}"</p>
                <p style={{fontSize:13,color:"#888",fontFamily:"'DM Sans',sans-serif"}}>Try "oud", "musk", "gift"...</p>
              </div>
            )}
            {searchResults.length>0 && (
              <>
                <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:20}}>{searchResults.length} results for "{searchQuery}"</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="grid-4">
                  {searchResults.map(p=>(
                    <div key={p.id} onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);setPage("product");}} style={{cursor:"pointer"}}>
                      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#F7F5F2"}}>
                        <img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"contain",padding:"16px"}}/>
                        <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                        {p.badge&&<span style={{position:"absolute",top:10,left:10,background:p.badge==="New"?"#B8922A":p.badge==="Limited"?"#5C0000":"#000",color:"#fff",fontSize:8,letterSpacing:2,padding:"3px 8px",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>{p.badge}</span>}
                      </div>
                      <div style={{padding:"10px 6px 14px"}}>
                        <p style={{fontSize:9,color:"#B8922A",letterSpacing:3,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>{p.col}</p>
                        <p style={{fontSize:12,fontWeight:700,color:"#000",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:4,lineHeight:1.2}}>{p.name}</p>
                        <p style={{fontSize:13,fontWeight:700,color:"#000",fontFamily:"'DM Sans',sans-serif"}}>AED {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!searchQuery && (
              <div>
                <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Popular Searches</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
                  {["Oud","Musk","Gift Set","New Arrivals","For Her","For Him","Amber","Island"].map(s=>(
                    <button key={s} onClick={()=>handleSearch(s)}
                      style={{background:"#F7F5F2",border:"1px solid #E8E4DC",padding:"8px 16px",fontSize:12,color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#F7F5F2";e.currentTarget.style.color="#333";}}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Announcement bar ── */}
      <div style={{background:"#000",color:"#fff",textAlign:"center",padding:"10px 16px",fontSize:10,letterSpacing:3,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>
        REGISTER NOW &amp; RECEIVE 10% OFF — CODE: 10OFF
      </div>

      {/* ── Main nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.96)",backdropFilter:"blur(16px)",borderBottom:"1px solid #E0E0E0"}}>
        <div style={{padding:"0 5%"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",height:64,gap:16}}>
            {/* Left utility */}
            <div className="hide-mob" style={{display:"flex",gap:20,alignItems:"center",fontSize:10,letterSpacing:2,color:"#555",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>
              <span style={{cursor:"pointer"}} onClick={()=>setPage("contact")}>Find a Store</span>
              <span style={{opacity:.3}}>|</span>
              <span style={{cursor:"pointer"}} onClick={()=>setPage("contact")}>Help</span>
            </div>
            {/* Logo */}
            <div onClick={()=>setPage("home")} style={{cursor:"pointer",textAlign:"center",userSelect:"none"}}>
              <p className="disp" style={{fontSize:26,fontWeight:600,letterSpacing:5,color:"#000",lineHeight:1,textTransform:"uppercase"}}>KHADLAJ</p>
              <p style={{fontSize:7,letterSpacing:7,color:"#B8922A",marginTop:3,fontFamily:"'DM Sans',sans-serif"}}>PERFUMES · UAE</p>
            </div>
            {/* Right icons */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:20}}>
              <span className="hide-mob" style={{fontSize:10,letterSpacing:2,color:"#555",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={()=>setPage("contact")}>Sign Up</span>
              <span style={{cursor:"pointer",fontSize:16,color:"#000",lineHeight:1}} onClick={()=>setSearchOpen(true)}>⌕</span>
              <div onClick={()=>setPage("collections")} style={{position:"relative",cursor:"pointer"}}>
                <span style={{fontSize:16,color:"#000",lineHeight:1}}>⊡</span>
                {cartCount>0 && (
                  <span style={{position:"absolute",top:-7,right:-9,background:"#000",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{cartCount}</span>
                )}
              </div>
            </div>
          </div>
          {/* Nav links */}
          <div className="hide-mob" style={{display:"flex",justifyContent:"center",gap:36,paddingBottom:14,fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#000",fontFamily:"'DM Sans',sans-serif"}}>
            {[["Offers","collections"],["Bestsellers","collections"],["New In","collections"],["Gifts","gifts"],["Perfume","collections"],["Our Story","story"],["Contact","contact"]].map(([label,pg])=>(
              <span key={label} onClick={()=>setPage(pg)} style={{cursor:"pointer",borderBottom:page===pg?"1px solid #000":"1px solid transparent",paddingBottom:4,transition:"border-color .2s"}}>{label}</span>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

`;

var result = src.substring(0, navStart) + newNavbar + src.substring(navEnd);
fs.writeFileSync("khadlaj-perfumes (1).jsx", result);
console.log("Navbar replaced successfully.");
