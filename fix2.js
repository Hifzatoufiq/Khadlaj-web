var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");
var lines = src.split("\n");

// Find hero-img-wrap start (line 501, index 500)
var heroImgStart = 499; // 0-indexed line 500

// Find the closing of hero section - look for </section> after hero-img-wrap
var scentRibbonLine = -1;
for(var i=500; i<lines.length; i++){
  if(lines[i].includes("{/* ── SCENT RIBBON ── */}")){
    scentRibbonLine = i;
    break;
  }
}

console.log("heroImgStart:", heroImgStart+1, "scentRibbon:", scentRibbonLine+1);

// Replace everything from hero-img-wrap to (but not including) scent ribbon
var videoSection = `        {/* Right side — Video */}
        <div className="hero-img-wrap" style={{position:"relative",minHeight:600,overflow:"hidden",background:"#000"}}>
          <video autoPlay muted loop playsInline style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",minWidth:"100%",minHeight:"100%",width:"auto",height:"auto",objectFit:"cover"}}>
            <source src="./video/Onyx Silver by Khadlaj \u2014 crafted for presence, designed for impact.A vibrant opening ignites the.mp4" type="video/mp4"/>
          </video>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.12) 0%,rgba(0,0,0,.04) 50%,rgba(0,0,0,.28) 100%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:28,left:24,background:"rgba(10,4,22,.88)",border:"1px solid rgba(184,146,42,.4)",padding:"16px 20px",zIndex:3,backdropFilter:"blur(14px)",maxWidth:210}}>
            <p style={{fontSize:8,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>New · Khadlaj</p>
            <p style={{fontSize:14,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:3}}>Onyx Silver</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,.5)",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>100ml EDP · AED 125</p>
            <div style={{height:1,background:"linear-gradient(90deg,#B8922A,#D4AF5A,transparent)"}}/>
          </div>
          <div style={{position:"absolute",top:22,right:22,background:"rgba(10,4,22,.85)",border:"1px solid rgba(184,146,42,.35)",padding:"10px 16px",backdropFilter:"blur(10px)",zIndex:3}}>
            <p style={{fontSize:12,color:"#B8922A",letterSpacing:1,marginBottom:2}}>\u2605\u2605\u2605\u2605\u2605</p>
            <p style={{fontSize:9,color:"rgba(255,255,255,.45)",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>New Arrival</p>
          </div>
        </div>
      </section>

      `;

var before = lines.slice(0, heroImgStart).join("\n");
var after = lines.slice(scentRibbonLine).join("\n");
var result = before + "\n" + videoSection + after;

fs.writeFileSync("khadlaj-perfumes (1).jsx", result);
console.log("Done! Lines replaced:", scentRibbonLine - heroImgStart);
