const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// 1. Find and extract the old banner
const bannerStart = code.indexOf('{/* ── Social Proof / Happy Customers Banner ── */}');
const bannerEndStr = '</section>\n';
if (bannerStart !== -1) {
  const endIdx = code.indexOf(bannerEndStr, bannerStart);
  if (endIdx !== -1) {
    code = code.substring(0, bannerStart) + code.substring(endIdx + bannerEndStr.length);
  }
}

// 2. Insert the new enhanced banner below New Launch
const newLaunchEnd = code.indexOf('{/* ── FEATURED PRODUCTS ── */}');
if (newLaunchEnd !== -1) {
  const enhancedBanner = `
      {/* ── Social Proof / Happy Customers Banner ── */}
      <section style={{margin:"40px 5% 80px", borderRadius:24, overflow:"hidden", background:"#120917", position:"relative", display:"flex", alignItems:"center", boxShadow:"0 40px 80px rgba(0,0,0,0.2)"}}>
        <div style={{position:"absolute", inset:0, background:"radial-gradient(circle at 75% 50%, rgba(200,169,126,0.15) 0%, transparent 60%)"}} />
        
        <div className="max-container hero-split" style={{display:"grid", gridTemplateColumns:"1.2fr 0.8fr", alignItems:"center", width:"100%", position:"relative", zIndex:2}}>
          
          <div style={{padding:"8% 10%", color:"#fff"}}>
            <p style={{fontSize:11, letterSpacing:4, color:"#C8A97E", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", fontWeight:600, marginBottom:20, display:"flex", alignItems:"center", gap:12}}>
              <span style={{width:30, height:1, background:"#C8A97E"}}/>
              Real experiences. Real results.
            </p>
            <h2 className="disp" style={{fontSize:"clamp(36px, 4.5vw, 64px)", fontWeight:300, color:"#fff", lineHeight:1.05, marginBottom:24}}>
              Trusted by 50,000+ <br/><span style={{color:"#C8A97E", fontStyle:"italic", fontWeight:400}}>Happy Customers</span>
            </h2>
            <p style={{fontSize:15, color:"rgba(255,255,255,0.75)", lineHeight:1.9, fontFamily:"'Montserrat',sans-serif", marginBottom:48, maxWidth:500}}>
              Join thousands of satisfied customers who rely on our quality, service, and consistency. With over 50,000 verified reviews, our community continues to grow every day.
            </p>
            <button className="btn-gold" style={{display:"inline-flex", alignItems:"center", gap:12, padding:"18px 44px", fontSize:12, letterSpacing:2, borderRadius:30}} onClick={() => setPage("collections")}>
              Shop Now 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </button>
          </div>

          <div style={{position:"relative", height:"100%", minHeight:"min(480px, 45vw)", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{position:"absolute", width:"70%", height:"70%", background:"#C8A97E", filter:"blur(120px)", opacity:0.25, borderRadius:"50%"}}/>
            
            <div style={{position:"relative", width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
              {/* Back Left Bottle */}
              <img src="./assets/images/products/limaginaire.jpg" alt="Trusted Product" style={{position:"absolute", left:"10%", top:"15%", maxHeight:"220px", height:"20vw", objectFit:"contain", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5)) blur(2px)", opacity:0.6, animation:"lafedeFloatSmall 7s ease-in-out infinite", mixBlendMode:"screen"}} />
              
              {/* Back Right Bottle */}
              <img src="./assets/images/products/fursan.png" alt="Trusted Product" style={{position:"absolute", right:"15%", bottom:"15%", maxHeight:"240px", height:"22vw", objectFit:"contain", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5)) blur(1px)", opacity:0.8, animation:"lafedeFloatSmall 6s ease-in-out infinite reverse"}} />
              
              {/* Main Center Bottle */}
              <img src="./assets/images/products/hareem-al-sultan-gold-cutout.png" alt="Trusted Product" style={{position:"relative", zIndex:10, maxHeight:"360px", height:"32vw", objectFit:"contain", filter:"drop-shadow(0 40px 60px rgba(0,0,0,0.7))", animation:"lafedeFloat 5s ease-in-out infinite"}} />
            </div>
          </div>

        </div>
      </section>

`;
  code = code.substring(0, newLaunchEnd) + enhancedBanner + code.substring(newLaunchEnd);
}

// 3. Remove Lifestyle editorial
const lifestyleStart = code.indexOf('{/* Lifestyle editorial */}');
if (lifestyleStart !== -1) {
  const endOfStoryPage = code.indexOf('    </div>\n  );\n}', lifestyleStart);
  if (endOfStoryPage !== -1) {
    code = code.substring(0, lifestyleStart) + code.substring(endOfStoryPage);
  }
}

fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
console.log('File patched successfully.');
