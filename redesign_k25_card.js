const fs = require('fs');
let code = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

const start = code.indexOf('.k25-card {');
const end = code.indexOf('/* Discovery Grid */');

if (start !== -1 && end !== -1) {
  const replacement = `
  .k25-card { 
    width: 380px; margin: 0 20px; scroll-snap-align: center;
    background: #1a1125; border: 1px solid rgba(200,169,126,0.3);
    border-radius: 200px 200px 16px 16px;
    overflow: hidden; position: relative; 
    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); 
    display: flex; flex-direction: column; 
    align-items: center; align-self: stretch; justify-content: flex-start;
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }
  .k25-card:hover { 
    transform: translateY(-15px); 
    box-shadow: 0 30px 60px rgba(200,169,126,0.15);
    border-color: rgba(200,169,126,0.8);
  }
  
  .k25-card-img-wrapper { 
    height: 420px; width: 100%; position: relative; 
    background: radial-gradient(circle at 50% 50%, rgba(200,169,126,0.1) 0%, transparent 70%); 
    flex-shrink: 0; 
    display: flex; align-items: center; justify-content: center;
    border-radius: 200px 200px 0 0;
    overflow: visible;
  }
  
  .k25-card-img-wrapper img { 
    height: 85%; object-fit: contain; display: block; 
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
    animation: lafedeFloat 6s ease-in-out infinite;
  }
  .k25-card:hover .k25-card-img-wrapper img { 
    transform: scale(1.1) translateY(-10px); 
    filter: drop-shadow(0 30px 40px rgba(0,0,0,0.7)) brightness(1.1); 
  }
  
  .k25-card-content { 
    padding: 20px 30px 40px; text-align: center; position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    width: 100%; background: #1a1125;
    flex-grow: 1; transition: all 0.6s ease;
  }
  
  .k25-card-title { font-family: 'Playfair Display', serif; font-size: 32px; color: #fff; margin-bottom: 8px; letter-spacing: 2px; }
  .k25-card-subtitle { font-size: 11px; color: #C8A97E; letter-spacing: 4px; margin-bottom: 24px; text-transform: uppercase; font-weight: 600; }
  .k25-card-desc { font-family: 'Montserrat', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 30px; }
  
  /* Creative Animated Button */
  .k25-card-btn { 
    margin-top: auto; position: relative; overflow: hidden; z-index: 1;
    padding: 12px 0; background: transparent; border: none; 
    border-bottom: 1px solid rgba(200,169,126,0.3); 
    color: #C8A97E; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; 
  }
  .k25-card-btn::after {
    content: ''; position: absolute; bottom: -1px; left: 0; width: 0%; height: 1px; background: #fff; z-index: 2; transition: width 0.4s ease;
  }
  .k25-card:hover .k25-card-btn { color: #fff; border-color: rgba(255,255,255,0.2); }
  .k25-card:hover .k25-card-btn::after { width: 100%; }

  @media(max-width: 1024px) {
    .k25-card { width: 340px; }
  }
  @media(max-width: 768px) {
    .k25-card { width: 300px; }
    .k25-card-img-wrapper { height: 360px; }
    .k25-card-content { padding: 10px 20px 30px; }
    .k25-card-title { font-size: 28px; }
  }

  `;
  code = code.substring(0, start) + replacement + code.substring(end);
  fs.writeFileSync('khadlaj-perfumes (1).jsx', code, 'utf8');
  console.log("Card CSS replaced successfully.");
} else {
  console.log("Could not find start/end indices for replacement.");
}
