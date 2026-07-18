const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

const startTag = '        {/* Managing Director */}';
const endTag = '        {/* Lifestyle editorial */}';

const startIndex = code.lastIndexOf(startTag);
const endIndex = code.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `        {/* Managing Director */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          
          <div style={{paddingRight: "24px"}}>
            <div style={{borderLeft: "2px solid #3c1152", paddingLeft: "16px", marginBottom: "24px"}}>
              <p style={{fontSize: 14, color: "#3c1152", fontFamily: "'Montserrat', sans-serif", letterSpacing: 0.5, marginBottom: 8}}>
                Managing Director
              </p>
              <h2 style={{fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 300, color: "#111", lineHeight: 1.2, margin: 0, fontFamily: "'Montserrat', sans-serif"}}>
                Asif Mohamed Iqbal Katchi
              </h2>
            </div>
            
            <p style={{color: "#444", lineHeight: 1.8, fontSize: 15, fontFamily: "'Montserrat', sans-serif", textAlign: "justify"}}>
              Asif Mohamed Iqbal Katchi, with over 18 years of profound experience, is dedicated to taking forward the illustrious legacy of his father, Mohamed Iqbal, by consistently delivering excellence in all endeavors. Mr. Asif's visionary and creatively-driven leadership aims for Khadlaj to transcend into a luxurious, trusted name synonymous with unparalleled reliability and a celebrated household name in the fragrance industry. Mr. Asif's passionate motto embodies a profound dedication to perfumery craftsmanship and an unwavering commitment to fostering creativity, innovation, and luxury. He has effectively navigated Khadlaj Perfumes through dynamic industry shifts, showcasing his agile and proactive approach in anticipating and mitigating challenges, thereby fortifying the company's formidable position as a leader in the competitive fragrance market.
            </p>
          </div>

          <div style={{position:"relative",aspectRatio:"4/3",overflow:"hidden"}}>
            <img src="./assets/images/people/managing-director-asif.png"
              alt="Asif Mohamed Iqbal Katchi" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
          </div>

        </div>
`;
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
  fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
  console.log('Replaced successfully.');
} else {
  console.log('Could not find tags');
}
