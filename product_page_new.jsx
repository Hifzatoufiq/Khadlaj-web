function ProductPage({ product, addToCart, setPage, setViewProduct }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => ${activeCountry.currency} ;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = PRODUCTS.filter(p=>p.col===product.col && p.id!==product.id).slice(0,3);

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [product.id]);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(()=>setAdded(false),2200);
  };

  return (
    <div style={{background:"#fff", minHeight:"100vh"}}>
      
      {/* -- Breadcrumbs -- */}
      <div style={{padding:"32px 5% 0", maxWidth:1440, margin:"0 auto", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:"#888", fontFamily:"'Montserrat',sans-serif"}}>
        <span style={{cursor:"pointer", color:"#251737", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#B8922A"} onMouseLeave={e=>e.currentTarget.style.color="#251737"} onClick={()=>setPage("home")}>Home</span>
        <span style={{margin:"0 12px", color:"#ddd"}}>|</span>
        <span style={{cursor:"pointer", color:"#251737", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#B8922A"} onMouseLeave={e=>e.currentTarget.style.color="#251737"} onClick={()=>setPage("collections")}>Collections</span>
        <span style={{margin:"0 12px", color:"#ddd"}}>|</span>
        <span>{product.name}</span>
      </div>

      {/* -- Main Product Section -- */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"40px 5% 120px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(40px, 8vw, 120px)", alignItems:"start"}} className="grid-2">
          
          {/* -- Left: High-End Image Layout -- */}
          <div style={{width:"100%"}}>
            {product.detailImages ? (
              <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8}}>
                {product.detailImages.map((imgUrl, i) => (
                  <div key={i} style={{gridColumn: i === 0 ? "span 2" : "span 1", aspectRatio: i===0 ? "4/5" : "1/1", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#FAFAFA", overflow:"hidden"}}>
                    <img src={imgUrl} alt={product.name} style={{width:"100%", height:"100%", objectFit:"cover", mixBlendMode:"multiply", filter:"contrast(1.05)"}} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{width:"100%", aspectRatio:"4/5", display:"flex", alignItems:"center", justifyContent:"center", background:"#FAFAFA", overflow:"hidden"}}>
                <img src={product.img} alt={product.name} style={{width:"100%", height:"100%", objectFit:"cover", mixBlendMode:"multiply", filter:"contrast(1.05)"}} />
              </div>
            )}
          </div>
          
          {/* -- Right: Minimalist Product Details (Sticky) -- */}
          <div style={{paddingTop:16, maxWidth:500, position:"sticky", top:120}}>
             {/* EYEBROW */}
             <p style={{fontWeight:600,fontSize:10, letterSpacing:3, color:"#888", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:12}}>Khadlaj Perfumes</p>
             
             {/* TITLE */}
             <h1 className="disp" style={{fontSize:"clamp(32px, 4vw, 48px)", fontWeight:400, color:"#111", lineHeight:1.1, letterSpacing:"-0.5px", textTransform:"uppercase", marginBottom:16, fontFamily:"'Cinzel', serif"}}>
               {product.name}
             </h1>

             {/* REVIEWS */}
             <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:24}}>
               <StarRating n={5} color="#111" />
               <span style={{fontSize:12, color:"#555", fontFamily:"'Montserrat',sans-serif", borderBottom:"1px solid #ddd", cursor:"pointer", paddingBottom:2}}>4.9 rating (55 reviews)</span>
             </div>

             {/* PRICE */}
             <p style={{fontSize:22, fontWeight:300, color:"#111", fontFamily:"'Montserrat',sans-serif", marginBottom:8}}>{formatPrice(product.price)}</p>
             <p style={{fontSize:11, color:"#888", fontFamily:"'Montserrat',sans-serif", marginBottom:40}}>Tax included. Shipping calculated at checkout.</p>

             {/* ACTIONS (Qty + Add to Cart) */}
             <div style={{display:"flex", gap:16, marginBottom:40, flexWrap:"wrap"}}>
               {/* Minimalist Quantity */}
               <div style={{display:"flex", alignItems:"center", borderBottom:"1px solid #111", width:100, height:48}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:20, cursor:"pointer", color:"#111", fontWeight:300}}>-</button>
                  <span style={{flex:1, textAlign:"center", fontSize:14, fontFamily:"'Montserrat',sans-serif", fontWeight:300}}>{qty}</span>
                  <button onClick={()=>setQty(q=>q+1)} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:20, cursor:"pointer", color:"#111", fontWeight:300}}>+</button>
               </div>
               
               {/* Sleek Add to Bag */}
               <button 
                 onClick={handleAdd} 
                 style={{
                   flex:1, minWidth:200, height:48, background:"#111", color:"#fff", border:"1px solid #111", 
                   fontSize:11, fontWeight:500, letterSpacing:2, textTransform:"uppercase", 
                   fontFamily:"'Montserrat',sans-serif", cursor:"pointer", transition:"all .3s ease"
                 }} 
                 onMouseEnter={e=>{e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#111";}} 
                 onMouseLeave={e=>{e.currentTarget.style.background="#111"; e.currentTarget.style.color="#fff";}}
               >
                 {added ? "Added to Bag" : "Add to Bag"}
               </button>
             </div>

             {/* FREQUENTLY BOUGHT TOGETHER (Minimalist) */}
             <div style={{marginBottom:48, paddingTop:24, borderTop:"1px solid #eee"}}>
               <h3 style={{fontSize:11, fontWeight:500, color:"#555", textTransform:"uppercase", letterSpacing:1.5, marginBottom:24, fontFamily:"'Montserrat',sans-serif"}}>Frequently Bought Together</h3>
               <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:24}}>
                  <div style={{width:56, height:56, background:"#FAFAFA", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src={product.img} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt="Product 1" />
                  </div>
                  <span style={{fontSize:14, color:"#ccc", fontWeight:300}}>+</span>
                  <div style={{width:56, height:56, background:"#FAFAFA", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src={PRODUCTS[4].img} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt="Product 2" />
                  </div>
                  <div style={{marginLeft:"auto", textAlign:"right"}}>
                    <div style={{fontSize:10, color:"#999", textDecoration:"line-through", fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(product.price + PRODUCTS[4].price + 20)}</div>
                    <div style={{fontSize:14, fontWeight:500, color:"#111", fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(product.price + PRODUCTS[4].price)}</div>
                  </div>
               </div>
               <button 
                 onClick={()=>{addToCart(product,1); addToCart(PRODUCTS[4],1); setAdded(true); setTimeout(()=>setAdded(false),2200);}}
                 style={{width:"100%", height:40, background:"#fff", border:"1px solid #ddd", color:"#111", textTransform:"uppercase", letterSpacing:1.5, fontSize:10, fontWeight:500, cursor:"pointer", transition:"all 0.3s", fontFamily:"'Montserrat',sans-serif"}}
                 onMouseEnter={e=>{e.currentTarget.style.border="1px solid #111";}}
                 onMouseLeave={e=>{e.currentTarget.style.border="1px solid #ddd";}}
               >
                 Add Bundle to Bag
               </button>
             </div>

             {/* SLEEK TRUST BADGES */}
             <div style={{display:"flex", justifyContent:"space-between", marginBottom:48, paddingTop:24, borderTop:"1px solid #eee"}}>
               <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
                 Fast Ship
               </div>
               <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                 Authentic
               </div>
               <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:9, color:"#777", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                 Secure
               </div>
             </div>

             {/* ACCORDIONS */}
             <div style={{borderTop:"1px solid #eee"}}>
               <Accordion title="Description" defaultOpen>
                 <p style={{marginBottom:12, fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>Experience the timeless elegance of {product.name}. Crafted with precision and the finest ingredients, this fragrance is a true testament to the art of Arabian perfumery.</p>
                 {product.desc && <p style={{fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>{product.desc}</p>}
               </Accordion>
               
               <Accordion title="Fragrance Notes">
                  {product.notes && product.notes.length > 0 ? (
                    <ul style={{paddingLeft:16, margin:0, display:"flex", flexDirection:"column", gap:8, fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>
                      {product.notes.map(n=><li key={n}>{n}</li>)}
                    </ul>
                  ) : (
                    <p style={{fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>A harmonious blend of signature Khadlaj notes crafted for a lasting impression.</p>
                  )}
               </Accordion>

               <Accordion title="Shipping & Returns">
                 <p style={{fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>Orders are processed within 1-2 business days. Free shipping on all orders over AED 200 within the UAE. International shipping rates apply and will be calculated at checkout.</p>
               </Accordion>
             </div>
          </div>
        </div>
      </div>

      {/* -- UPSELL SECTION (Dark Theme) -- */}
      <div style={{background:"#111", padding:"80px 5%", color:"#fff", marginBottom:80}}>
        <div style={{maxWidth:1000, margin:"0 auto", display:"flex", gap:48, alignItems:"center", flexWrap:"wrap"}}>
          <div style={{width:200, height:250, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden"}}>
            <img src={PRODUCTS[1].img} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt={PRODUCTS[1].name} />
          </div>
          <div style={{flex:1, minWidth:250}}>
            <p style={{fontSize:10, textTransform:"uppercase", letterSpacing:3, color:"#B8922A", marginBottom:12, fontFamily:"'Montserrat',sans-serif", fontWeight:500}}>Complete The Collection</p>
            <h3 style={{fontSize:32, fontWeight:400, marginBottom:16, fontFamily:"'Cinzel', serif"}}>{PRODUCTS[1].name}</h3>
            <p style={{fontSize:14, color:"rgba(255,255,255,0.7)", marginBottom:32, fontFamily:"'Montserrat',sans-serif", lineHeight:1.6, maxWidth:500, fontWeight:300}}>Elevate your signature scent with this exquisite complementary product, designed to layer perfectly and enhance longevity.</p>
            <button 
              onClick={()=>{addToCart(PRODUCTS[1],1); setAdded(true); setTimeout(()=>setAdded(false),2200);}}
              style={{background:"#B8922A", border:"none", color:"#fff", padding:"16px 32px", fontSize:11, textTransform:"uppercase", letterSpacing:2, cursor:"pointer", transition:"background 0.3s", fontFamily:"'Montserrat',sans-serif", fontWeight:600}}
              onMouseEnter={e=>e.currentTarget.style.background="#A38125"}
              onMouseLeave={e=>e.currentTarget.style.background="#B8922A"}
            >
              Add for {formatPrice(PRODUCTS[1].price)}
            </button>
          </div>
        </div>
      </div>

      {/* -- Related Products -- */}
      {related.length>0 && (
        <div style={{padding:"0 5% 104px"}}>
          <SectionHeader eyebrow="? · Handpicked For You" title="You May Also Like" light/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32,}} className="grid-3">
            {related.map(p=>(
              <ProductCard key={p.id} p={p} onView={(prod)=>{if(setViewProduct){setViewProduct(prod);setPage("product");}}} onCart={addToCart}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
