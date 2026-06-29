import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const C = {
  obsidian:  "#000000",
  onyx:      "#0A0A0A",
  onyxLight: "#111111",
  champagne: "#FFFFFF",
  ivory:     "#F7F7F7",
  brass:     "#B8922A",
  brassL:    "#C9A84C",
  rouge:     "#5C0000",
  muted:     "#888888",
  mutedL:    "#AAAAAA",
  paper:     "#FFFFFF",
  surface:   "#FFFFFF",
  surface2:  "#F5F5F5",
  text:      "#000000",
  textSoft:  "#555555",
  line:      "#E0E0E0",
  shadow:    "rgba(0,0,0,.06)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const COUNTRIES = [
  { name:"UAE",    flag:"🇦🇪", domain:"khadlaj.ae" },
  { name:"Saudi",  flag:"🇸🇦", domain:"khadlaj.sa" },
  { name:"Kuwait", flag:"🇰🇼", domain:"khadlaj.kw" },
  { name:"Bahrain",flag:"🇧🇭", domain:"khadlaj.bh" },
  { name:"Global", flag:"🌐", domain:"khadlaj-perfumes.com" },
];

const PAYMENTS = ["Visa","Mastercard","Apple Pay","Google Pay","Tabby","Tamara","PayTabs","PayPal"];

const NAV_LINKS = ["Collections","Best Sellers","New Arrivals","Gift Sets","Our Story","Contact"];

const SCENT_RIBBON = ["Oud","Amber","Musk","Rose","Sandalwood","Saffron","Vanilla","Bergamot",
  "Patchouli","Jasmine","Neroli","Cedarwood","Vetiver","Iris","Benzoin","Agarwood","Frankincense"];

const STATS = [
  { v:"1997", l:"Year Founded" },
  { v:"400+", l:"Unique Fragrances" },
  { v:"30+",  l:"Countries" },
  { v:"1",    l:"Master Perfumer" },
];

const PRODUCTS = [
  // ── Local products (own images) ──
  { id:13, name:"Island",               col:"Master Perfumery", price:355, size:"100ml Extrait", badge:"Best Seller", gender:"Unisex", notes:["Marine","Amber","Oud"],        img:"./assets/images/products/island-packshot.png" },
  { id:14, name:"Cream Velvet",         col:"Master Perfumery", price:345, size:"Gift Set",      badge:"Best Seller", gender:"Unisex", notes:["Cream","Velvet","Musk"],        img:"./assets/images/products/cream-velvet-front-box.png", images:["./assets/images/products/cream-velvet-front-box.png","./assets/images/products/cream-velvet-lineup.png","./assets/images/products/cream-velvet-open-box.png","./assets/images/products/cream-velvet-back-box.png"] },
  { id:15, name:"Cloud Candy",          col:"Atyaab",           price:325, size:"Gift Set",      badge:"Best Seller", gender:"Her",    notes:["Peach","Musk","Vanilla"],       img:"./assets/images/products/cloud-candy-front-box.png",  images:["./assets/images/products/cloud-candy-front-box.png","./assets/images/products/cloud-candy-lineup.png","./assets/images/products/cloud-candy-open-box.png","./assets/images/products/cloud-candy-back-box.png"] },
  { id:16, name:"Strawberry Shake",     col:"Atyaab",           price:295, size:"100ml EDP",     badge:"Best Seller", gender:"Her",    notes:["Strawberry","Musk","Vanilla"],  img:"./assets/images/products/strawberry-shake-single.png" },
  { id:17, name:"Biscotti Date Toffee", col:"Lafede",           price:315, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Date","Coffee","Gourmand"],     img:"./assets/images/products/biscotti-date-toffee-single.png" },
  { id:18, name:"Biscotti Melon Musk",  col:"Lafede",           price:315, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Melon","Musk","Cream"],         img:"./assets/images/products/blue-glace-single-1.png" },
  { id:19, name:"Uno Intimo",           col:"Lafede",           price:285, size:"100ml EDP",     badge:null,          gender:"Her",    notes:["Rose","Musk","Peony"],          img:"./assets/images/products/uno-intimo-single.png" },
  { id:20, name:"Shahi Oud",            col:"Master Perfumery", price:360, size:"100ml EDP",     badge:"Best Seller", gender:"Unisex", notes:["Oud","Amber","Saffron"],        img:"./assets/images/products/shahi-oud-single.png" },
  { id:21, name:"Bleu Glacé",           col:"Atyaab",           price:275, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Marine","Bergamot","Musk"],     img:"./assets/images/products/blue-glace-single-2.png" },
  // ── Live products from khadlaj-perfumes.com ──
  { id:200, name:"Saraya",              col:"Master Perfumery", price:105, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Amber","Bergamot","Vetiver"],   img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291" },
  { id:201, name:"Nafais Sharq Gift Set",col:"Atyaab",          price:150, size:"Gift Set",      badge:null,          gender:"Her",    notes:["Rose","Amber","Musk"],          img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-1.jpg?v=1779352739" },
  { id:202, name:"Cream Velvet Gift Set",col:"Master Perfumery",price:160, size:"Gift Set",      badge:null,          gender:"Her",    notes:["Cream","Vanilla","Musk"],       img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383" },
  { id:203, name:"Zayaan Silver",       col:"Atyaab",           price:150, size:"100ml EDP",     badge:"New",         gender:"Him",    notes:["Citrus","Lavender","Sandalwood"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ZayanSilver-1.jpg?v=1776430327" },
  { id:204, name:"Ihthiraam",           col:"Master Perfumery", price:150, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Bergamot","Oud","Musk"],        img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386" },
  { id:205, name:"Qarar",               col:"Master Perfumery", price:150, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Oud","Leather","Vetiver"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-1.jpg?v=1775636739" },
  { id:206, name:"Icon",                col:"Atyaab",           price:130, size:"100ml EDP",     badge:"New",         gender:"Him",    notes:["Bergamot","Lavender","Amber"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.2.jpg?v=1773206615" },
  { id:207, name:"Intoxicate Mystique", col:"Lafede",           price:150, size:"100ml Extrait", badge:null,          gender:"Him",    notes:["Musk","Vetiver","Vanilla"],     img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099" },
  { id:208, name:"Angel Dust",          col:"Master Perfumery", price:200, size:"100ml Extrait", badge:"New",         gender:"Her",    notes:["Vanilla","Sandalwood","Musk"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_2_jpg_0bc7a1f3-8af9-4188-98f1-c58151159f55.jpg?v=1771333283" },
  { id:209, name:"Onyx Silver",         col:"Atyaab",           price:125, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Bergamot","Patchouli","Tonka"], img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver1.jpg?v=1769502676" },
  { id:210, name:"Nuha Bon Bon",        col:"Atyaab",           price:85,  size:"85ml EDP",      badge:"New",         gender:"Her",    notes:["Strawberry","Vanilla","Musk"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHABONBON-01.jpg?v=1768477611" },
  { id:211, name:"Sawaar Vanille Blanc",col:"Master Perfumery", price:200, size:"100ml Extrait", badge:null,          gender:"Her",    notes:["Vanilla","Sandalwood","Amber"], img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-01.jpg?v=1771151092" },
  { id:212, name:"Onyx Gold",           col:"Atyaab",           price:125, size:"100ml EDP",     badge:"Best Seller", gender:"Him",    notes:["Cardamom","Sandalwood","Tonka"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-01_b085642f-9033-4997-a1fd-4e97be2a8575.jpg?v=1762324228" },
  { id:213, name:"Shiyaaka Snow",       col:"Master Perfumery", price:126, size:"100ml EDP",     badge:"Limited",     gender:"Him",    notes:["Bergamot","Vetiver","Cardamom"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422" },
  { id:214, name:"Nafais Magrib",       col:"Atyaab",           price:110, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Citrus","Marine","Musk"],       img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NafaisMagrib-1.jpg?v=1761115734" },
  { id:215, name:"Island Gift Set",     col:"Master Perfumery", price:179, size:"Gift Set",      badge:null,          gender:"Unisex", notes:["Marine","Amber","Musk"],        img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643" },
  { id:216, name:"Cloud Candy Gift Set",col:"Atyaab",           price:169, size:"Gift Set",      badge:"Best Seller", gender:"Her",    notes:["Peach","Musk","Vanilla"],       img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755" },
  { id:22, name:"Hareem Al Sultan",     col:"Atyaab",           price:195, size:"75ml EDP",      badge:"Best Seller", gender:"Her",    notes:["Rose","Amber","Musk"],          img:"https://khadlaj-perfumes.com/cdn/shop/files/HareemAlSultan.jpg" },
  { id:23, name:"Shiyaaka Shadow",      col:"Master Perfumery", price:340, size:"100ml EDP",     badge:"Limited",     gender:"Him",    notes:["Oud","Leather","Vetiver"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3_bef3b7fa-b2c9-4ec5-adcc-0b3f9ac42034.jpg?v=1761113212" },
  { id:24, name:"Oud pour Leather",     col:"Lafede",           price:310, size:"100ml EDP",     badge:"Best Seller", gender:"Unisex", notes:["Oud","Leather","Sandalwood"],   img:"https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=85" },
];

const GIFT_SETS = [
  { id:5,  name:"Cloud Candy Gift Set",          price:169, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755",          desc:"A soft peach-pink gift set with a playful, feminine profile and premium presentation." },
  { id:6,  name:"Strawberry Shake Gift Set",      price:295, pieces:2, img:"./assets/images/gifsets/strawberry-shake-giftset.png",                                                               desc:"A playful rose-pink set with a feminine, candy-like finish." },
  { id:7,  name:"Biscotti Date Toffee Gift Set",  price:315, pieces:2, img:"./assets/images/gifsets/biscotti-date-toffee-giftset.png",                                                           desc:"A warm gourmand set with rich coffee, date, and caramel styling." },
  { id:8,  name:"Biscotti Melon Musk Gift Set",   price:315, pieces:2, img:"./assets/images/gifsets/biscotti-melon-musk-giftset.png",                                                            desc:"A soft pastel presentation for a fresh melon and musk composition." },
  { id:9,  name:"Uno Intimo Gift Set",            price:285, pieces:2, img:"./assets/images/gifsets/uno-intimo-giftset.png",                                                                     desc:"An elegant, polished set with a refined feminine profile." },
  { id:10, name:"Bleu Glacé Gift Set",            price:275, pieces:2, img:"./assets/images/gifsets/blue-glace-giftset.png",                                                                     desc:"A crisp blue presentation with a clean, modern freshness." },
  { id:11, name:"Shahi Oud Gift Set",             price:360, pieces:2, img:"./assets/images/gifsets/shahi-oud-giftset.png",                                                                      desc:"A bold black-and-gold gift set with a rich oud signature." },
  { id:12, name:"Island Gift Set",               price:179, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643",              desc:"The signature Island scent in a luxury gift trio for him and her." },
  { id:13, name:"Cream Velvet Gift Set",          price:160, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383",        desc:"Buttery caramel and warm vanilla in a beautifully curated gift set." },
  { id:14, name:"Nafais Sharq Gift Set",          price:150, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-1.jpg?v=1779352739",      desc:"Rich florals, warm woods, and timeless Arabian allure." },
];

const REVIEWS = [
  { name:"Reem Al Hashimi",  country:"UAE",    stars:5, text:"The richest oud I've ever worn. Lasts 14+ hours on my skin. Khadlaj has a customer for life." },
  { name:"Hamad Al Dosari",  country:"Bahrain",stars:5, text:"Bakhoor Noir is absolutely extraordinary. Authentic Arabian soul with a French elegance." },
  { name:"Priya Nair",       country:"Dubai",  stars:5, text:"Ordered the Discovery Set as a gift — my friend was blown away by the packaging and quality." },
  { name:"Mohammed Al Ghamdi",country:"KSA",   stars:5, text:"Been using Khadlaj for 6 years. Every year the quality gets better. Rose Taifi is a masterpiece." },
];

const COLLECTIONS_DATA = [
  { name:"Atyaab", tagline:"Everyday Luxury", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHABONBON-01.jpg?v=1768477611", desc:"Accessible, wearable scents for every moment. The Atyaab line brings refined Arabian perfumery into daily life without compromise." },
  { name:"Lafede", tagline:"Bold & Characterful", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099", desc:"Intensely expressive fragrances that command attention. Lafede is for those who make their presence felt before they enter the room." },
  { name:"Master Perfumery", tagline:"The Pinnacle of Craft", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386", desc:"The finest expressions from our founder's private atelier. Rare ingredients, extraordinary sillage, and a story in every bottle." },
];

const TEAM = [
  {
    name:"Mohamed Iqbal Abdul Sattar",
    role:"Founder & Master Perfumer",
    img:"./assets/images/people/founder-mohamed-iqbal.png",
    bio:"With over 45 years of experience in perfumery, Mohamed Iqbal Abdul Sattar is the esteemed founder and master perfumer of Khadlaj Perfumes. He is recognized for creating cherished and opulent fragrances including Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. His expertise spans exquisite natural essences and meticulously crafted synthetic compounds, with a deep passion for Musk, Ruh Gulaab, oud, and vetiver.",
  },
];

const REELS = [
  {
    title:"Hareem Al Sultan",
    caption:"Khadlaj ka iconic signature fragrance — the scent that started it all.",
    tag:"TikTok Reel",
    href:"https://www.tiktok.com/@khadlajperfumes/video/7451949579638951185",
    poster:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/STRAWBERRYSHAKE-01.jpg?v=1764228377",
  },
  {
    title:"Island Extrait",
    caption:"A luminous marine-amber story — our best-selling Extrait de Parfum.",
    tag:"TikTok Reel",
    href:"https://www.tiktok.com/@khadlajperfumes",
    poster:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643",
  },
  {
    title:"Shiyaaka Shadow",
    caption:"Special Edition bold masculine — commanding presence in every spray.",
    tag:"TikTok Reel",
    href:"https://www.tiktok.com/@khadlajperfumes",
    poster:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3_bef3b7fa-b2c9-4ec5-adcc-0b3f9ac42034.jpg?v=1761113212",
  },
];

const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@khadlaj.uk",
};
const CATEGORIES = ["All","Best Sellers","New","For Him","For Her","Unisex","Atyaab","Lafede","Master Perfumery"];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#fff;color:#000;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#fff;}
  ::-webkit-scrollbar-thumb{background:#000;}
  .disp{font-family:'Cormorant Garamond',serif;}
  .mono{font-family:'DM Mono',monospace;}

  /* YSL-style primary button: solid black */
  .btn-gold{
    background:#000;color:#fff;border:1px solid #000;
    padding:14px 32px;
    font-family:'DM Sans',sans-serif;font-weight:500;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:background .22s,color .22s;
  }
  .btn-gold:hover{background:#B8922A;border-color:#B8922A;color:#fff;}

  /* ghost = outlined black */
  .btn-ghost{
    background:transparent;color:#000;border:1px solid #000;
    padding:13px 28px;
    font-family:'DM Sans',sans-serif;font-weight:400;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:all .22s;
  }
  .btn-ghost:hover{background:#000;color:#fff;}

  .gold-line{width:40px;height:1px;background:#B8922A;margin:0 auto;}
  .eyebrow{font-size:10px;letter-spacing:4px;color:#B8922A;text-transform:uppercase;font-family:'DM Sans',sans-serif;}

  /* Product card — YSL-style: no lift, just a clean image reveal */
  .card-lift{transition:opacity .25s;}
  .card-lift:hover{opacity:.94;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .65s ease both;}

  @keyframes ribbonScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .ribbon-inner{display:flex;animation:ribbonScroll 32s linear infinite;width:max-content;}

  .reel-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 14px;-webkit-overflow-scrolling:touch;}
  .reel-track::-webkit-scrollbar{height:3px;}
  .reel-track::-webkit-scrollbar-track{background:#000;}
  .reel-track::-webkit-scrollbar-thumb{background:#B8922A;}
  .reel-card{scroll-snap-align:start;flex:0 0 min(330px,82vw);text-decoration:none;color:inherit;}
  .reel-badge{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

  input,textarea{font-family:'DM Sans',sans-serif;}

  /* New arrivals horizontal scroll */
  .new-scroll::-webkit-scrollbar{height:2px;}
  .new-scroll::-webkit-scrollbar-track{background:#F0EDE8;}
  .new-scroll::-webkit-scrollbar-thumb{background:#000;}

  /* Newsletter popup */
  @keyframes popIn{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
  .popup-in{animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both;}

  /* Floating pulse */
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(184,146,42,.4);}50%{box-shadow:0 0 0 10px rgba(184,146,42,0);}}
  .pulse{animation:pulse 2.5s infinite;}

  /* Gold shimmer on hover */
  @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
  .shimmer-text{
    background:linear-gradient(90deg,#B8922A 0%,#F0D080 40%,#B8922A 60%,#D4AF5A 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 3s linear infinite;
  }

  /* ── Mobile responsive ── */
  @media(max-width:900px){
    .hide-mob{display:none!important;}
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .hero-split{grid-template-columns:1fr!important;}
    .hero-img-wrap{height:320px!important;min-height:unset!important;}
    .grid-2{grid-template-columns:1fr!important;}
  }
  @media(max-width:600px){
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .new-scroll > div{flex:0 0 78vw!important;}
    .reel-card{flex:0 0 88vw!important;}
  }
  @media(max-width:480px){
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .popup-in{grid-template-columns:1fr!important;}
  }
`;

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function StarRating({ n=5, color=C.brass }){
  return <span style={{color,fontSize:13,letterSpacing:1}}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}

function ProductCard({ p, onView, onCart }){
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const notes = p.notes || [];
  const packType = p.format || (p.size==="Gift Set" ? "Gift Set" : "Single");

  // Note pill colors — warm amber/oud-inspired palette
  const noteColors = ["#C8A96E","#9C7B50","#B8866A","#7A9E8A","#8B7EAA","#B06A6A","#6A8BAA","#A09060"];

  const handleCart = (e) => {
    e.stopPropagation();
    onCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"#fff",
        display:"flex",
        flexDirection:"column",
        position:"relative",
        transition:"box-shadow .3s",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,.10)" : "0 1px 4px rgba(0,0,0,.06)",
      }}
    >
      {/* ── Badges row ── */}
      <div style={{
        position:"absolute", top:14, left:0, right:0,
        display:"flex", justifyContent:"space-between",
        padding:"0 14px", zIndex:2, pointerEvents:"none",
      }}>
        {p.badge ? (
          <span style={{
            background: p.badge==="Limited" ? "#8B1A1A" : p.badge==="New" ? "#B8922A" : "#000",
            color:"#fff", fontSize:8, letterSpacing:2.5,
            padding:"4px 10px", fontWeight:700, textTransform:"uppercase",
            fontFamily:"'DM Sans',sans-serif",
          }}>{p.badge}</span>
        ) : <span/>}
        <span style={{
          background:"rgba(255,255,255,.92)",
          border:"1px solid #E0E0E0",
          color:"#555", fontSize:8, letterSpacing:2,
          padding:"4px 9px", textTransform:"uppercase",
          fontFamily:"'DM Sans',sans-serif",
        }}>{p.gender}</span>
      </div>

      {/* ── Image area ── */}
      <div
        onClick={()=>onView(p)}
        style={{
          position:"relative", aspectRatio:"3/4",
          overflow:"hidden", background:"#F7F5F2",
          cursor:"pointer",
        }}
      >
        <img
          src={p.img} alt={p.name} loading="lazy"
          style={{
            width:"100%", height:"100%", objectFit:"contain",
            padding:"32px 24px 24px",
            transition:"transform .65s cubic-bezier(.25,.46,.45,.94)",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Hover overlay with quick-view */}
        <div style={{
          position:"absolute", inset:0,
          background:"rgba(0,0,0,.38)",
          display:"flex", alignItems:"center", justifyContent:"center",
          opacity: hov ? 1 : 0,
          transition:"opacity .3s ease",
        }}>
          <span style={{
            color:"#fff", fontSize:10, letterSpacing:3,
            textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif",
            borderBottom:"1px solid rgba(255,255,255,.6)", paddingBottom:3,
          }}>Quick View</span>
        </div>
      </div>

      {/* ── Gold accent line ── */}
      <div style={{
        height:2,
        background: hov
          ? "linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"
          : "linear-gradient(90deg,#E0E0E0,#E0E0E0)",
        transition:"background .4s ease",
      }}/>

      {/* ── Info block ── */}
      <div style={{padding:"16px 16px 0", flex:1, display:"flex", flexDirection:"column"}}>

        {/* Collection eyebrow */}
        <p style={{
          fontSize:9, letterSpacing:3.5, color:"#B8922A",
          textTransform:"uppercase", marginBottom:6,
          fontFamily:"'DM Sans',sans-serif",
        }}>{p.col}</p>

        {/* Name */}
        <h3
          onClick={()=>onView(p)}
          style={{
            fontSize:15, fontWeight:700, color:"#000",
            lineHeight:1.25, marginBottom:4,
            textTransform:"uppercase", letterSpacing:.5,
            cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
          }}
        >{p.name}</h3>

        {/* Size line */}
        <p style={{
          fontSize:11, color:"#999", marginBottom:12,
          fontFamily:"'DM Sans',sans-serif", letterSpacing:.3,
        }}>{p.size} · {packType}</p>

        {/* Stars */}
        <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:12}}>
          <span style={{color:"#B8922A", fontSize:12, letterSpacing:1}}>{"★".repeat(5)}</span>
          <span style={{fontSize:11, color:"#555", fontFamily:"'DM Sans',sans-serif"}}>4.7 <span style={{color:"#aaa"}}>(905)</span></span>
        </div>

        {/* Note pills */}
        {notes.length > 0 && (
          <div style={{display:"flex", flexWrap:"wrap", gap:5, marginBottom:14}}>
            {notes.map((n, i) => (
              <span key={n} style={{
                display:"inline-flex", alignItems:"center", gap:4,
                padding:"3px 9px",
                border:"1px solid #E4E0D8",
                fontSize:9, letterSpacing:1.5,
                color:"#555", textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",
                background:"#FAFAF8",
              }}>
                <span style={{
                  width:7, height:7, borderRadius:"50%",
                  background: noteColors[i % noteColors.length],
                  flexShrink:0, display:"inline-block",
                }}/>
                {n}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <p style={{
          fontSize:18, fontWeight:700, color:"#000",
          letterSpacing:.3, marginBottom:16,
          fontFamily:"'DM Sans',sans-serif",
        }}>AED {p.price}</p>
      </div>

      {/* ── CTA button ── */}
      <button
        onClick={handleCart}
        style={{
          width:"100%",
          background: added ? "#B8922A" : "#000",
          color:"#fff", border:"none",
          padding:"15px 0",
          fontSize:10, fontWeight:700,
          letterSpacing:3.5, textTransform:"uppercase",
          cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",
          transition:"background .25s",
          marginTop:"auto",
        }}
      >
        {added ? "✓  Added" : "Add to Bag"}
      </button>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, light=false }){
  return (
    <div style={{textAlign:"center",marginBottom:52}}>
      <p className="eyebrow" style={{marginBottom:14,color:"#B8922A"}}>{eyebrow}</p>
      <h2 className="disp" style={{fontSize:"clamp(28px,3.8vw,52px)",fontWeight:300,color:"#000",lineHeight:1.15,letterSpacing:"-0.5px",marginBottom:sub?14:0}}>{title}</h2>
      {sub && <p style={{color:"#777",fontSize:14,maxWidth:500,margin:"0 auto",lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>{sub}</p>}
      <div className="gold-line" style={{marginTop:22}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: HOME
═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("Best Sellers");
  const [hov, setHov] = useState(null);

  const filtered = PRODUCTS.filter(p=>{
    if(activeCat==="All") return true;
    if(activeCat==="Best Sellers") return p.badge==="Best Seller";
    if(activeCat==="New") return p.badge==="New";
    if(activeCat==="For Him") return p.gender==="Him";
    if(activeCat==="For Her") return p.gender==="Her";
    if(activeCat==="Unisex") return p.gender==="Unisex";
    return p.col===activeCat;
  }).slice(0,8);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{minHeight:"92vh",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative",overflow:"hidden",background:"#fff",borderBottom:"1px solid #E0E0E0"}} className="hero-split">
        {/* Left copy */}
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 7% 80px",position:"relative",zIndex:2}}>
          <div style={{width:36,height:1,background:"#B8922A",marginBottom:28}}/>
          <p className="fu" style={{fontSize:10,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:18,animationDelay:".05s"}}>New Season · Island Extrait</p>
          <h1 className="disp fu" style={{fontSize:"clamp(56px,6.5vw,96px)",fontWeight:300,lineHeight:.92,letterSpacing:-3,margin:"0 0 28px",animationDelay:".15s",color:"#000"}}>
            Island<br/>
            <em style={{fontStyle:"italic",color:"#B8922A",fontWeight:300}}>Extrait</em>
          </h1>
          <p className="fu" style={{color:"#666",maxWidth:400,lineHeight:1.9,fontSize:14,animationDelay:".3s",fontFamily:"'DM Sans',sans-serif",marginBottom:36}}>
            A luminous marine-amber composition with a polished, fashion-house feel. Clean, modern, unmistakably premium.
          </p>
          {/* Note tags */}
          <div className="fu" style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:40,animationDelay:".4s"}}>
            {["Marine","Amber","Oud","Musk"].map(n=>(
              <span key={n} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",border:"1px solid #DDD",fontSize:9,letterSpacing:2,color:"#555",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",background:"#FAFAF8"}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#B8922A",display:"inline-block"}}/>
                {n}
              </span>
            ))}
          </div>
          <div className="fu" style={{display:"flex",gap:12,flexWrap:"wrap",animationDelay:".5s"}}>
            <button className="btn-gold" onClick={()=>setPage("collections")}>Discover Collection</button>
            <button className="btn-ghost" onClick={()=>setPage("story")}>Our Story</button>
          </div>
        </div>

        {/* Right image */}
        {/* ── Right side — Advanced Perfume Animation ── */}
        <div className="hero-img-wrap" style={{position:"relative",minHeight:600,overflow:"hidden",background:"radial-gradient(ellipse at 60% 40%,#1a0a2e 0%,#0d0618 40%,#050208 100%)"}}>
          <style>{`
            @keyframes bottleFloat{0%,100%{transform:translateY(0px) rotateY(0deg);}25%{transform:translateY(-14px) rotateY(3deg);}75%{transform:translateY(-8px) rotateY(-2deg);}}
            @keyframes liquidShimmer{0%{transform:translateX(-100%);}100%{transform:translateX(300%);}}
            @keyframes mistRise{0%{transform:translateY(0) scale(1);opacity:.7;}100%{transform:translateY(-180px) scale(3);opacity:0;}}
            @keyframes mistRise2{0%{transform:translateY(0) scale(1);opacity:.5;}100%{transform:translateY(-220px) scale(2.5);opacity:0;}}
            @keyframes glowPulse{0%,100%{opacity:.4;transform:scale(1);}50%{opacity:.8;transform:scale(1.12);}}
            @keyframes sparkFloat{0%{transform:translateY(0) translateX(0) scale(1);opacity:1;}100%{transform:translateY(-160px) translateX(var(--sx)) scale(.3);opacity:0;}}
            @keyframes ringPulse{0%{transform:translate(-50%,-50%) scale(.85);opacity:.7;}100%{transform:translate(-50%,-50%) scale(1.7);opacity:0;}}
            @keyframes capShine{0%,100%{opacity:.3;}50%{opacity:.9;}}
            @keyframes bgRotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
            @keyframes labelGlow{0%,100%{filter:brightness(1);}50%{filter:brightness(1.3);}}
            @keyframes dropletFall{0%{transform:translateY(-10px);opacity:1;}100%{transform:translateY(40px);opacity:0;}}
            .perf-bottle{animation:bottleFloat 5s ease-in-out infinite;}
            .mist1{animation:mistRise 2.8s ease-out infinite;}
            .mist2{animation:mistRise2 3.5s ease-out infinite 0.7s;}
            .mist3{animation:mistRise 4s ease-out infinite 1.4s;}
            .glow-orb{animation:glowPulse 3s ease-in-out infinite;}
            .ring1{animation:ringPulse 3s ease-out infinite;}
            .ring2{animation:ringPulse 3s ease-out infinite 1.5s;}
            .cap-shine{animation:capShine 2s ease-in-out infinite;}
            .lbl-glow{animation:labelGlow 3s ease-in-out infinite;}
          `}</style>

          {/* Background rotating conic gradient */}
          <div style={{position:"absolute",inset:0,background:"conic-gradient(from 0deg at 50% 50%,rgba(100,0,200,.06),rgba(0,100,255,.04),rgba(184,146,42,.08),rgba(100,0,200,.06))",animation:"bgRotate 20s linear infinite",pointerEvents:"none"}}/>

          {/* Main glow orb */}
          <div className="glow-orb" style={{position:"absolute",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.22) 0%,rgba(120,0,255,.08) 45%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",filter:"blur(20px)"}}/>

          {/* Pulsing rings */}
          <div className="ring1" style={{position:"absolute",width:280,height:280,borderRadius:"50%",border:"1px solid rgba(184,146,42,.4)",top:"50%",left:"50%"}}/>
          <div className="ring2" style={{position:"absolute",width:280,height:280,borderRadius:"50%",border:"1px solid rgba(150,80,255,.3)",top:"50%",left:"50%"}}/>

          {/* Mist / spray particles */}
          {[
            {cls:"mist1",l:"44%",w:24,h:24,c:"rgba(184,146,42,.55)"},
            {cls:"mist2",l:"50%",w:18,h:18,c:"rgba(255,255,255,.35)"},
            {cls:"mist3",l:"47%",w:20,h:20,c:"rgba(180,100,255,.4)"},
            {cls:"mist1",l:"53%",w:14,h:14,c:"rgba(184,146,42,.4)"},
          ].map((m,i)=>(
            <div key={i} className={m.cls} style={{position:"absolute",bottom:"46%",left:m.l,width:m.w,height:m.h,borderRadius:"50%",background:`radial-gradient(circle,${m.c},transparent)`,filter:"blur(6px)",animationDelay:`${i*0.4}s`}}/>
          ))}

          {/* Gold sparkles */}
          {[
            {l:"38%",b:"48%",sx:"25px",d:"0s",s:5},
            {l:"55%",b:"50%",sx:"-18px",d:"0.5s",s:4},
            {l:"62%",b:"45%",sx:"12px",d:"1s",s:6},
            {l:"41%",b:"52%",sx:"-22px",d:"1.5s",s:3},
            {l:"57%",b:"47%",sx:"30px",d:"0.8s",s:4},
            {l:"35%",b:"49%",sx:"15px",d:"1.3s",s:5},
            {l:"64%",b:"51%",sx:"-10px",d:"0.3s",s:3},
            {l:"48%",b:"46%",sx:"20px",d:"1.8s",s:6},
          ].map((sp,i)=>(
            <div key={i} style={{
              position:"absolute",
              left:sp.l,bottom:sp.b,
              width:sp.s,height:sp.s,
              borderRadius:"50%",
              background:"linear-gradient(135deg,#F0D070,#B8922A)",
              boxShadow:"0 0 8px rgba(184,146,42,.8)",
              animation:`sparkFloat 2.5s ease-out infinite ${sp.d}`,
              "--sx":sp.sx,
            }}/>
          ))}

          {/* ── PERFUME BOTTLE SVG — Advanced ── */}
          <div className="perf-bottle" style={{
            position:"absolute",
            top:"50%",left:"50%",
            transform:"translate(-50%,-54%)",
            width:220,
            filter:"drop-shadow(0 30px 60px rgba(184,146,42,.45)) drop-shadow(0 0 40px rgba(120,0,255,.25))",
          }}>
            <svg viewBox="0 0 220 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",display:"block"}}>
              <defs>
                {/* Cap gradient */}
                <linearGradient id="g_cap" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8C84A"/>
                  <stop offset="35%" stopColor="#F8E070"/>
                  <stop offset="65%" stopColor="#C9A030"/>
                  <stop offset="100%" stopColor="#8B6010"/>
                </linearGradient>
                {/* Neck gradient */}
                <linearGradient id="g_neck" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a0a30"/>
                  <stop offset="30%" stopColor="#2a1050"/>
                  <stop offset="70%" stopColor="#1a0a35"/>
                  <stop offset="100%" stopColor="#0d0520"/>
                </linearGradient>
                {/* Body glass gradient */}
                <linearGradient id="g_body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a0830" stopOpacity=".95"/>
                  <stop offset="25%" stopColor="#2d1050" stopOpacity=".9"/>
                  <stop offset="55%" stopColor="#180628" stopOpacity=".95"/>
                  <stop offset="100%" stopColor="#0a0318" stopOpacity="1"/>
                </linearGradient>
                {/* Liquid gradient */}
                <linearGradient id="g_liquid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6a1090" stopOpacity=".7"/>
                  <stop offset="50%" stopColor="#4a0870" stopOpacity=".8"/>
                  <stop offset="100%" stopColor="#2a0450" stopOpacity=".9"/>
                </linearGradient>
                {/* Label gradient */}
                <linearGradient id="g_label" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#120830" stopOpacity=".98"/>
                  <stop offset="100%" stopColor="#0a0520" stopOpacity="1"/>
                </linearGradient>
                {/* Gold text gradient */}
                <linearGradient id="g_gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A030"/>
                  <stop offset="40%" stopColor="#F8E070"/>
                  <stop offset="70%" stopColor="#D4AF5A"/>
                  <stop offset="100%" stopColor="#B8922A"/>
                </linearGradient>
                {/* Glass edge highlight */}
                <linearGradient id="g_edge" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,.35)"/>
                  <stop offset="50%" stopColor="rgba(255,255,255,.08)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,.15)"/>
                </linearGradient>
                {/* Glass shimmer */}
                <linearGradient id="g_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent"/>
                  <stop offset="50%" stopColor="rgba(255,255,255,.25)"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
                {/* Bottom glow */}
                <radialGradient id="g_bottom" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(184,146,42,.3)"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
                {/* Collar */}
                <linearGradient id="g_collar" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8922A"/>
                  <stop offset="30%" stopColor="#F0D060"/>
                  <stop offset="60%" stopColor="#C9A030"/>
                  <stop offset="100%" stopColor="#8B6010"/>
                </linearGradient>
              </defs>

              {/* ── CAP ── */}
              {/* Cap top knob */}
              <ellipse cx="110" cy="10" rx="14" ry="7" fill="url(#g_cap)"/>
              <rect x="96" y="6" width="28" height="18" rx="3" fill="url(#g_cap)"/>
              {/* Main cap */}
              <rect x="78" y="20" width="64" height="30" rx="5" fill="url(#g_cap)"/>
              {/* Cap highlight */}
              <rect x="82" y="23" width="56" height="4" rx="2" fill="rgba(255,255,255,.35)" className="cap-shine"/>
              {/* Cap shadow bottom */}
              <rect x="78" y="44" width="64" height="6" rx="2" fill="rgba(0,0,0,.35)"/>

              {/* ── NECK ── */}
              <rect x="90" y="50" width="40" height="40" rx="3" fill="url(#g_neck)"/>
              {/* Neck bands */}
              <rect x="90" y="56" width="40" height="3" fill="rgba(255,255,255,.12)"/>
              <rect x="90" y="64" width="40" height="2" fill="rgba(255,255,255,.08)"/>
              <rect x="90" y="72" width="40" height="2" fill="rgba(184,146,42,.2)"/>
              <rect x="90" y="82" width="40" height="2" fill="rgba(255,255,255,.08)"/>

              {/* ── COLLAR ── */}
              <rect x="68" y="88" width="84" height="14" rx="3" fill="url(#g_collar)"/>
              {/* Collar highlight */}
              <rect x="72" y="90" width="76" height="3" rx="1" fill="rgba(255,255,255,.3)"/>

              {/* ── BOTTLE BODY ── */}
              <rect x="48" y="100" width="124" height="240" rx="20" fill="url(#g_body)"/>

              {/* Glass left edge highlight */}
              <rect x="50" y="112" width="10" height="200" rx="5" fill="url(#g_edge)"/>
              {/* Glass right edge */}
              <rect x="160" y="130" width="8" height="160" rx="4" fill="rgba(255,255,255,.07)"/>

              {/* Liquid inside */}
              <rect x="60" y="160" width="100" height="165" rx="12" fill="url(#g_liquid)"/>
              {/* Liquid shimmer sweep */}
              <rect x="60" y="160" width="100" height="165" rx="12" fill="url(#g_shimmer)" style={{animation:"liquidShimmer 3s ease-in-out infinite"}}/>
              {/* Liquid surface ripple */}
              <ellipse cx="110" cy="162" rx="42" ry="6" fill="rgba(255,255,255,.1)"/>

              {/* ── LABEL ── */}
              <rect x="62" y="138" width="96" height="118" rx="8" fill="url(#g_label)"/>
              {/* Label outer border — gold */}
              <rect x="62" y="138" width="96" height="118" rx="8" fill="none" stroke="url(#g_gold)" strokeWidth="1.5"/>
              {/* Label inner border */}
              <rect x="67" y="143" width="86" height="108" rx="5" fill="none" stroke="rgba(184,146,42,.35)" strokeWidth=".8"/>

              {/* Label decorative top line */}
              <line x1="72" y1="155" x2="148" y2="155" stroke="rgba(184,146,42,.3)" strokeWidth=".8"/>

              {/* ISLAND text */}
              <text x="110" y="178" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="22" fontWeight="600" letterSpacing="4" fill="url(#g_gold)" className="lbl-glow">ISLAND</text>

              {/* Decorative wave */}
              <path d="M76 188 Q88 182 100 188 Q112 194 124 188 Q136 182 144 188" stroke="url(#g_gold)" strokeWidth="1" fill="none"/>

              {/* KHADLAJ text */}
              <text x="110" y="204" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" letterSpacing="5" fill="rgba(184,146,42,.85)">KHADLAJ</text>

              {/* Line separator */}
              <line x1="80" y1="212" x2="140" y2="212" stroke="rgba(184,146,42,.25)" strokeWidth=".8"/>

              {/* EXTRAIT DE PARFUM */}
              <text x="110" y="226" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="7.5" letterSpacing="2.5" fill="rgba(255,255,255,.4)">EXTRAIT DE PARFUM</text>

              {/* 100 ML */}
              <text x="110" y="240" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8" letterSpacing="2" fill="rgba(184,146,42,.5)">100 ML</text>

              {/* Label bottom line */}
              <line x1="72" y1="248" x2="148" y2="248" stroke="rgba(184,146,42,.25)" strokeWidth=".8"/>

              {/* ── BODY BASE ── */}
              {/* Bottom glass thickness */}
              <rect x="50" y="318" width="120" height="22" rx="0 0 20 20" fill="rgba(184,146,42,.12)"/>
              {/* Ground reflection ellipse */}
              <ellipse cx="110" cy="344" rx="52" ry="8" fill="url(#g_bottom)" opacity=".6"/>

              {/* Body glass facet sheen */}
              <path d="M 158 108 L 168 120 L 168 310 L 158 320" fill="rgba(255,255,255,.04)"/>
            </svg>
          </div>

          {/* Ground glow */}
          <div style={{position:"absolute",bottom:"12%",left:"50%",transform:"translateX(-50%)",width:160,height:24,background:"radial-gradient(ellipse,rgba(184,146,42,.35),transparent 70%)",filter:"blur(10px)"}}/>

          {/* Product info card */}
          <div style={{
            position:"absolute",bottom:28,left:24,
            background:"rgba(10,4,22,.88)",
            border:"1px solid rgba(184,146,42,.4)",
            padding:"16px 20px",zIndex:3,
            backdropFilter:"blur(14px)",maxWidth:200,
          }}>
            <p style={{fontSize:8,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>Best Seller</p>
            <p style={{fontSize:14,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:3}}>Island Extrait</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,.45)",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>100ml · AED 355</p>
            <div style={{height:1,background:"linear-gradient(90deg,#B8922A,#D4AF5A,transparent)",marginBottom:8}}/>
            <div style={{display:"flex",gap:6}}>
              {["Marine","Amber","Oud"].map(n=>(
                <span key={n} style={{fontSize:7,letterSpacing:1.5,color:"rgba(184,146,42,.75)",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>◈ {n}</span>
              ))}
            </div>
          </div>

          {/* Rating badge */}
          <div style={{position:"absolute",top:22,right:22,background:"rgba(10,4,22,.85)",border:"1px solid rgba(184,146,42,.35)",padding:"10px 16px",backdropFilter:"blur(10px)",zIndex:3}}>
            <p style={{fontSize:12,color:"#B8922A",letterSpacing:1,marginBottom:2}}>★★★★★</p>
            <p style={{fontSize:9,color:"rgba(255,255,255,.45)",letterSpacing:1.5,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>4.9 · 1.2k Reviews</p>
          </div>
        </div>
      </section>
          <style>{`
            @keyframes skyGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
            @keyframes bird1{0%{transform:translate(-10vw,0px) scaleX(1);}100%{transform:translate(110vw,-40px) scaleX(1);}}
            @keyframes bird2{0%{transform:translate(-5vw,60px) scaleX(1);}100%{transform:translate(110vw,10px) scaleX(1);}}
            @keyframes bird3{0%{transform:translate(-15vw,120px) scaleX(1);}100%{transform:translate(110vw,70px) scaleX(1);}}
            @keyframes bird4{0%{transform:translate(-8vw,30px) scaleX(1);}100%{transform:translate(110vw,-10px) scaleX(1);}}
            @keyframes bird5{0%{transform:translate(-20vw,80px) scaleX(1);}100%{transform:translate(110vw,40px) scaleX(1);}}
            @keyframes sunRay{0%,100%{opacity:.18;}50%{opacity:.32;}}
            @keyframes cloudDrift{0%{transform:translateX(0);}100%{transform:translateX(-30px);}}
            @keyframes oceanWave{0%,100%{transform:translateX(0) scaleY(1);}50%{transform:translateX(-8px) scaleY(1.03);}}
            .sky-bg{
              background:linear-gradient(180deg,#87CEEB 0%,#B0D8F0 25%,#D4EBF8 45%,#F5E6C8 65%,#F0C060 80%,#E8904A 100%);
              background-size:200% 200%;
              animation:skyGrad 12s ease-in-out infinite;
            }
            .bird{position:absolute;top:20%;}
            .b1{animation:bird1 18s linear infinite;}
            .b2{animation:bird2 22s linear infinite 3s;}
            .b3{animation:bird3 26s linear infinite 7s;}
            .b4{animation:bird4 20s linear infinite 11s;}
            .b5{animation:bird5 24s linear infinite 15s;}
            .sun-ray{animation:sunRay 4s ease-in-out infinite;}
            .cloud{animation:cloudDrift 20s ease-in-out infinite alternate;}
          `}</style>

          {/* Sky background */}
          <div className="sky-bg" style={{position:"absolute",inset:0}}/>

          {/* Sun glow */}
          <div style={{position:"absolute",top:"18%",left:"50%",transform:"translateX(-50%)",width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,220,80,.9) 0%,rgba(255,180,40,.5) 40%,transparent 70%)",filter:"blur(8px)"}}/>

          {/* Sun rays */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>(
            <div key={i} className="sun-ray" style={{
              position:"absolute",top:"18%",left:"50%",
              width:2,height:180,
              background:"linear-gradient(to bottom,rgba(255,220,80,.6),transparent)",
              transformOrigin:"top center",
              transform:`translateX(-50%) rotate(${deg}deg)`,
              animationDelay:`${i*0.2}s`,
            }}/>
          ))}

          {/* Clouds */}
          <div className="cloud" style={{position:"absolute",top:"12%",left:"15%",width:160,height:40,background:"rgba(255,255,255,.65)",borderRadius:"50px",filter:"blur(6px)"}}/>
          <div className="cloud" style={{position:"absolute",top:"8%",right:"20%",width:100,height:28,background:"rgba(255,255,255,.5)",borderRadius:"50px",filter:"blur(5px)",animationDelay:"5s"}}/>
          <div className="cloud" style={{position:"absolute",top:"22%",right:"35%",width:80,height:22,background:"rgba(255,255,255,.4)",borderRadius:"50px",filter:"blur(4px)",animationDelay:"10s"}}/>

          {/* Birds — SVG seagulls */}
          {[
            {cls:"b1",top:"28%",size:28},
            {cls:"b2",top:"35%",size:22},
            {cls:"b3",top:"42%",size:18},
            {cls:"b4",top:"24%",size:32},
            {cls:"b5",top:"38%",size:20},
          ].map((b,i)=>(
            <div key={i} className={`bird ${b.cls}`} style={{top:b.top}}>
              <svg width={b.size} height={b.size*0.5} viewBox="0 0 40 20" fill="none">
                <path d="M0 12 Q10 2 20 10 Q30 2 40 12" stroke="rgba(30,30,50,.75)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          ))}

          {/* More birds in a flock */}
          {[
            {x:"22%",y:"32%",s:14,delay:"2s"},
            {x:"26%",y:"36%",s:12,delay:"2.3s"},
            {x:"30%",y:"30%",s:16,delay:"1.8s"},
            {x:"18%",y:"38%",s:10,delay:"2.6s"},
          ].map((b,i)=>(
            <div key={"flock"+i} style={{
              position:"absolute",left:b.x,top:b.y,
              animation:`bird1 20s linear infinite ${b.delay}`,
            }}>
              <svg width={b.s} height={b.s*0.5} viewBox="0 0 40 20" fill="none">
                <path d="M0 12 Q10 2 20 10 Q30 2 40 12" stroke="rgba(30,30,50,.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          ))}

          {/* Ocean at bottom */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:"28%",background:"linear-gradient(to bottom,rgba(70,140,200,.6) 0%,rgba(30,90,160,.9) 100%)",overflow:"hidden"}}>
            {/* Wave lines */}
            {[0,1,2].map(i=>(
              <div key={i} className="ocean-wave" style={{
                position:"absolute",
                left:"-10%",right:"-10%",
                top:`${20+i*25}%`,
                height:2,
                background:"rgba(255,255,255,.2)",
                borderRadius:4,
                animation:`oceanWave ${3+i}s ease-in-out infinite ${i*0.5}s`,
              }}/>
            ))}
          </div>

          {/* Light haze overlay */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(255,240,200,.08) 0%,transparent 40%,rgba(0,0,0,.15) 100%)",pointerEvents:"none"}}/>

          {/* Product info tag */}
          <div style={{
            position:"absolute",bottom:32,left:28,
            background:"rgba(255,255,255,.92)",
            border:"1px solid #E0D8C8",
            padding:"16px 20px",
            boxShadow:"0 8px 32px rgba(0,0,0,.12)",
            zIndex:3,maxWidth:210,
            backdropFilter:"blur(10px)",
          }}>
            <p style={{fontSize:8,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>Best Seller</p>
            <p style={{fontSize:14,color:"#000",fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:.3,marginBottom:3}}>Island Extrait</p>
            <p style={{fontSize:11,color:"#777",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>100ml · AED 355</p>
            <div style={{height:1,background:"linear-gradient(90deg,#B8922A,#D4AF5A,transparent)"}}/>
          </div>

      {/* ── SCENT RIBBON ── */}
      <div style={{overflow:"hidden",background:"#000",padding:"16px 0"}}>
        <div className="ribbon-inner">
          {[...SCENT_RIBBON,...SCENT_RIBBON,...SCENT_RIBBON].map((n,i)=>(
            <span key={i} style={{padding:"0 28px",fontSize:9,letterSpacing:4,color:i%4===0?"#B8922A":"rgba(255,255,255,.5)",textTransform:"uppercase",whiteSpace:"nowrap",borderRight:"1px solid rgba(255,255,255,.1)",fontFamily:"'DM Sans',sans-serif"}}>{n}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{background:"#000",padding:"64px 6%",borderBottom:"1px solid #1A1A1A"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}} className="grid-4">
          {STATS.map((s,i)=>(
            <div key={s.v} style={{textAlign:"center",padding:"32px 24px",borderRight:i<3?"1px solid rgba(255,255,255,.08)":"none"}}>
              <p className="disp" style={{fontSize:"clamp(40px,4.5vw,64px)",fontWeight:300,color:"#fff",lineHeight:1,marginBottom:8}}>{s.v}</p>
              <div style={{width:20,height:1,background:"#B8922A",margin:"0 auto 10px"}}/>
              <p style={{fontSize:9,letterSpacing:4,color:"rgba(255,255,255,.45)",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS PREVIEW ── */}
      <section style={{padding:"96px 5%",background:"#fff"}}>
        <SectionHeader eyebrow="Our Collections" title="Three Distinct Worlds" sub="Each collection tells a different story. Find the one that speaks to you."/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}} className="grid-3">
          {COLLECTIONS_DATA.map((col,i)=>(
            <div key={col.name} onClick={()=>setPage("collections")}
              style={{position:"relative",aspectRatio:"2/3",overflow:"hidden",cursor:"pointer"}}>
              <img src={col.img} alt={col.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 50%,transparent 100%)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:32}}>
                <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",marginBottom:8,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{col.tagline}</p>
                <h3 className="disp" style={{fontSize:30,fontWeight:300,color:"#fff",marginBottom:8}}>{col.name}</h3>
                <p style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6,marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{col.desc.slice(0,80)}…</p>
                <p style={{fontSize:10,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>Explore →</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{padding:"0 5% 104px",background:"#FAFAF8"}}>
        <div style={{paddingTop:96,marginBottom:52,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Featured Fragrances</p>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,color:"#000",lineHeight:1.05,letterSpacing:-1}}>Discover Your<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Signature Scent</em></h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>setPage("collections")}>View All</button>
        </div>

        {/* Category pills */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:48,borderBottom:"1px solid #E8E4DC"}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{
                background:activeCat===c?"#000":"transparent",
                color:activeCat===c?"#fff":"#555",
                border:"none",
                borderBottom: activeCat===c ? "2px solid #000" : "2px solid transparent",
                padding:"10px 18px 12px",fontSize:10,letterSpacing:2,cursor:"pointer",whiteSpace:"nowrap",
                fontWeight:activeCat===c?600:400,transition:"all .2s",textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="grid-4">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>
      </section>

      {/* ── TIKTOK REELS ── */}
      <section style={{padding:"96px 5%",background:"#000"}}>
        <div style={{marginBottom:52,textAlign:"center"}}>
          <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 20px"}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>@KhadlajPerfumes</p>
          <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,52px)",fontWeight:300,color:"#fff",letterSpacing:-1,marginBottom:12}}>
            Watch Us on TikTok
          </h2>
          <p style={{color:"rgba(255,255,255,.45)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>
            Real fragrances. Real stories. Follow us for the latest drops.
          </p>
        </div>

        {/* Actual TikTok video embeds */}
        <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",alignItems:"flex-start"}}>

          {/* TikTok video 1 — Hareem Al Sultan */}
          <div style={{flex:"0 0 min(320px,90vw)",background:"#111",overflow:"hidden"}}>
            <iframe
              src="https://www.tiktok.com/embed/v2/7451949579638951185"
              style={{width:"100%",height:580,border:"none",display:"block"}}
              allow="encrypted-media"
              allowFullScreen
              title="Hareem Al Sultan TikTok"
            />
            <div style={{padding:"14px 16px 18px"}}>
              <p style={{fontSize:9,letterSpacing:2,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>TikTok · Khadlaj Perfumes</p>
              <p className="disp" style={{fontSize:18,color:"#fff",fontWeight:300}}>Hareem Al Sultan</p>
            </div>
          </div>

          {/* TikTok video 2 */}
          <div style={{flex:"0 0 min(320px,90vw)",background:"#111",overflow:"hidden"}}>
            <iframe
              src="https://www.tiktok.com/embed/v2/7612296589343821076"
              style={{width:"100%",height:580,border:"none",display:"block"}}
              allow="encrypted-media"
              allowFullScreen
              title="Khadlaj Fragrance TikTok"
            />
            <div style={{padding:"14px 16px 18px"}}>
              <p style={{fontSize:9,letterSpacing:2,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>TikTok · Khadlaj Perfumes</p>
              <p className="disp" style={{fontSize:18,color:"#fff",fontWeight:300}}>Island Extrait</p>
            </div>
          </div>

          {/* TikTok video 3 */}
          <div style={{flex:"0 0 min(320px,90vw)",background:"#111",overflow:"hidden"}}>
            <iframe
              src="https://www.tiktok.com/embed/v2/7643796160100191496"
              style={{width:"100%",height:580,border:"none",display:"block"}}
              allow="encrypted-media"
              allowFullScreen
              title="Khadlaj Shiyaaka TikTok"
            />
            <div style={{padding:"14px 16px 18px"}}>
              <p style={{fontSize:9,letterSpacing:2,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>TikTok · Khadlaj Perfumes</p>
              <p className="disp" style={{fontSize:18,color:"#fff",fontWeight:300}}>Shiyaaka Shadow</p>
            </div>
          </div>

        </div>

        <div style={{textAlign:"center",marginTop:44}}>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            style={{
              display:"inline-flex",alignItems:"center",gap:10,
              border:"1px solid rgba(255,255,255,.25)",
              color:"#fff",padding:"13px 32px",
              fontSize:10,letterSpacing:3,textTransform:"uppercase",
              textDecoration:"none",fontFamily:"'DM Sans',sans-serif",
              transition:"all .2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.25)";}}
          >
            ▶ Follow on TikTok
          </a>
        </div>
      </section>

      {/* ── MASTER PERFUMERY EDITORIAL ── */}
      <section style={{position:"relative",overflow:"hidden",zIndex:0}}>
        <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549"
          alt="Master Perfumery" style={{width:"100%",height:520,objectFit:"cover",objectPosition:"center 25%",display:"block"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.2) 100%)",display:"flex",alignItems:"center",padding:"0 8%"}}>
          <div style={{maxWidth:560}}>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:20}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Master Perfumery</p>
            <h2 className="disp" style={{fontSize:"clamp(32px,5vw,64px)",fontWeight:300,lineHeight:1.05,marginBottom:20,color:"#fff",letterSpacing:-1.5}}>
              The Art of Arabic &amp;<br/><em style={{color:"#B8922A",fontStyle:"italic"}}>French Perfumery</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.6)",lineHeight:1.85,fontSize:14,marginBottom:32,maxWidth:440,fontFamily:"'DM Sans',sans-serif"}}>
              Founded by Mohamed Iqbal Abdul Sattar — each creation blends the ancient soul of Arabian oud with the precision of French fragrance tradition.
            </p>
            <button className="btn-gold" onClick={()=>setPage("story")}>Meet the Perfumers</button>
          </div>
        </div>
      </section>

      {/* ── WHY KHADLAJ — Trust strip ── */}
      <section style={{background:"#fff",borderTop:"1px solid #E8E4DC",borderBottom:"1px solid #E8E4DC",padding:"40px 5%",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,textAlign:"center"}} className="grid-4">
          {[
            {icon:"🌿",title:"Natural Ingredients",desc:"Taif roses, Cambodian oud, French iris — ethically sourced"},
            {icon:"🏆",title:"Award-Winning",desc:"Recognised fragrance house since 1997 across 30+ countries"},
            {icon:"🚚",title:"Free UAE Delivery",desc:"Complimentary shipping on orders above AED 150"},
            {icon:"✨",title:"Luxury Packaging",desc:"Every order arrives gift-ready in premium Khadlaj packaging"},
          ].map((item,i)=>(
            <div key={item.title} style={{padding:"28px 20px",borderRight:i<3?"1px solid #E8E4DC":"none"}}>
              <div style={{fontSize:28,marginBottom:12}}>{item.icon}</div>
              <p style={{fontSize:11,fontWeight:700,color:"#000",letterSpacing:1,fontFamily:"'DM Sans',sans-serif",marginBottom:6,textTransform:"uppercase"}}>{item.title}</p>
              <p style={{fontSize:12,color:"#888",lineHeight:1.65,fontFamily:"'DM Sans',sans-serif",maxWidth:160,margin:"0 auto"}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW ARRIVALS horizontal scroll ── */}
      <section style={{padding:"96px 0 96px 5%",background:"#FAFAF8",overflow:"hidden",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",paddingRight:"5%",marginBottom:40}}>
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:16}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Just Dropped</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>
              New <em style={{fontStyle:"italic",color:"#B8922A"}}>Arrivals</em>
            </h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>{setActiveCat("New");setPage("collections");}}>View All New</button>
        </div>
        <div style={{display:"flex",gap:3,overflowX:"auto",paddingRight:"5%",paddingBottom:4,scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch"}} className="new-scroll">
          {PRODUCTS.filter(p=>p.badge==="New").map(p=>(
            <div key={p.id} style={{flex:"0 0 min(260px,72vw)",scrollSnapAlign:"start",background:"#fff",cursor:"pointer",display:"flex",flexDirection:"column"}}
              onClick={()=>{setViewProduct(p);setPage("product");}}>
              <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#F7F5F2"}}>
                <img src={p.img} alt={p.name} loading="lazy"
                  style={{width:"100%",height:"100%",objectFit:"contain",padding:"20px 16px 28px",transition:"transform .55s ease"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                <span style={{position:"absolute",top:10,left:10,background:"#B8922A",color:"#fff",fontSize:8,letterSpacing:2,padding:"3px 9px",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",fontWeight:700}}>New</span>
              </div>
              <div style={{padding:"12px 12px 14px",flex:1}}>
                <p style={{fontSize:9,color:"#B8922A",letterSpacing:3,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>{p.col}</p>
                <p style={{fontSize:13,fontWeight:700,color:"#000",textTransform:"uppercase",letterSpacing:.4,fontFamily:"'DM Sans',sans-serif",marginBottom:6,lineHeight:1.25}}>{p.name}</p>
                <p style={{fontSize:14,fontWeight:700,color:"#000",fontFamily:"'DM Sans',sans-serif"}}>{p.size} · AED {p.price}</p>
              </div>
              <button onClick={e=>{e.stopPropagation();addToCart(p);}}
                style={{width:"100%",background:"#000",color:"#fff",border:"none",padding:"12px 0",fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#000"}
              >Add to Bag</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── GIFT SETS ── */}
      <section style={{padding:"96px 5%",background:"#FAFAF8",borderTop:"1px solid #E8E4DC"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:60}}>
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:18}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Gifting</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,3.8vw,52px)",fontWeight:300,color:"#000",lineHeight:1,letterSpacing:-1}}>
              Curated<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Gift Collections</em>
            </h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>setPage("gifts")}>View All Gifts</button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="grid-4">
          {PRODUCTS.filter(p=>p.size==="Gift Set").slice(0,8).map(p=>{
            const [hov,setHov] = [false, ()=>{}]; // simple static, ProductCard handles hover
            return (
              <div
                key={p.id}
                style={{background:"#fff",cursor:"pointer",position:"relative",display:"flex",flexDirection:"column"}}
                onClick={()=>{setViewProduct(p);setPage("product");}}
              >
                {/* Image */}
                <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#F7F5F2"}}>
                  <img
                    src={p.img} alt={p.name} loading="lazy"
                    style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s ease"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                  />
                  {/* Gold bottom accent */}
                  <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                  {/* Badge */}
                  {p.badge && (
                    <span style={{
                      position:"absolute",top:12,left:12,
                      background: p.badge==="Limited" ? "#5C0000" : p.badge==="New" ? "#B8922A" : "#000",
                      color:"#fff",fontSize:8,letterSpacing:2,
                      padding:"4px 10px",fontFamily:"'DM Sans',sans-serif",
                      textTransform:"uppercase",fontWeight:700,
                    }}>{p.badge}</span>
                  )}
                  <span style={{
                    position:"absolute",top:12,right:12,
                    background:"rgba(0,0,0,.75)",color:"rgba(255,255,255,.85)",
                    fontSize:8,letterSpacing:2,padding:"4px 10px",
                    fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",
                  }}>Gift Set</span>
                </div>

                {/* Info */}
                <div style={{padding:"16px 16px 0",flex:1,display:"flex",flexDirection:"column"}}>
                  <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>{p.col}</p>
                  <h3 style={{
                    fontSize:14,fontWeight:700,color:"#000",
                    textTransform:"uppercase",letterSpacing:.4,
                    fontFamily:"'DM Sans',sans-serif",lineHeight:1.25,marginBottom:6,
                  }}>{p.name}</h3>
                  {/* Note pills */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {(p.notes||[]).map((n,i)=>(
                      <span key={n} style={{
                        display:"inline-flex",alignItems:"center",gap:3,
                        padding:"2px 8px",border:"1px solid #E8E4DC",
                        fontSize:8,letterSpacing:1,color:"#777",
                        textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",
                      }}>
                        <span style={{width:5,height:5,borderRadius:"50%",background:["#C8A96E","#9C7B50","#B8866A"][i%3],flexShrink:0,display:"inline-block"}}/>
                        {n}
                      </span>
                    ))}
                  </div>
                  {/* Stars */}
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:10}}>
                    <span style={{color:"#B8922A",fontSize:11,letterSpacing:1}}>{"★".repeat(5)}</span>
                    <span style={{fontSize:10,color:"#888",fontFamily:"'DM Sans',sans-serif"}}>4.8</span>
                  </div>
                  <p style={{fontSize:16,fontWeight:700,color:"#000",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>AED {p.price}</p>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={e=>{e.stopPropagation();addToCart(p);}}
                  style={{
                    width:"100%",background:"#000",color:"#fff",border:"none",
                    padding:"14px 0",fontSize:9,fontWeight:700,
                    letterSpacing:3,textTransform:"uppercase",cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",transition:"background .2s",
                    marginTop:"auto",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                  onMouseLeave={e=>e.currentTarget.style.background="#000"}
                >Add to Bag</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{background:"#000",padding:"96px 5%"}}>
        <SectionHeader eyebrow="Reviews" title="Loved Across the Gulf"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1}} className="grid-4">
          {REVIEWS.map((r,i)=>(
            <div key={i} style={{background:"#111",padding:"36px 28px",borderLeft:i===0?"none":"1px solid rgba(255,255,255,.06)"}}>
              <StarRating n={r.stars} color="#B8922A"/>
              <p style={{fontSize:14,color:"rgba(255,255,255,.8)",lineHeight:1.85,margin:"20px 0 24px",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>"{r.text}"</p>
              <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:18}}>
                <p style={{fontSize:12,fontWeight:600,color:"#fff",letterSpacing:.5,fontFamily:"'DM Sans',sans-serif"}}>{r.name}</p>
                <p style={{fontSize:10,letterSpacing:3,color:"#B8922A",marginTop:4,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{r.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCENT QUIZ CTA ── */}
      <section style={{padding:"96px 5%",textAlign:"center",background:"#fff",borderTop:"1px solid #E0E0E0",borderBottom:"1px solid #E0E0E0"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div className="gold-line" style={{marginBottom:36}}/>
          <p className="eyebrow" style={{marginBottom:14}}>Find Your Scent</p>
          <h2 className="disp" style={{fontSize:"clamp(28px,3.8vw,50px)",fontWeight:300,marginBottom:16,color:"#000"}}>Not Sure Where to Start?</h2>
          <p style={{color:"#777",fontSize:14,lineHeight:1.85,marginBottom:40,fontFamily:"'DM Sans',sans-serif"}}>
            Answer 3 quick questions and we'll match you with a fragrance that's perfectly yours.
          </p>
          <button className="btn-gold" style={{fontSize:11,padding:"16px 44px"}}>Take the Scent Quiz</button>
          <div className="gold-line" style={{marginTop:36}}/>
        </div>
      </section>

      {/* ── KHADLAJ WORLD GRID ── */}
      <section style={{padding:"0 5% 96px",background:"#fff"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:36,paddingTop:96}}>
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:18}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>@KhadlajPerfumes</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>
              Feel the World<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>of Khadlaj</em>
            </h2>
          </div>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank" rel="noreferrer"
            style={{
              border:"1px solid #000",color:"#000",
              padding:"10px 22px",fontSize:9,letterSpacing:2.5,
              textTransform:"uppercase",textDecoration:"none",
              fontFamily:"'DM Sans',sans-serif",transition:"all .2s",flexShrink:0,
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#000";}}
          >Follow Us</a>
        </div>

        {/* Mosaic grid — varying sizes for editorial feel */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gridTemplateRows:"auto",gap:3}}>

          {/* Large — spans 2 cols 2 rows */}
          <div style={{gridColumn:"1/3",gridRow:"1/3",position:"relative",overflow:"hidden",aspectRatio:"1/1",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386"
              alt="Ihthiraam" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p style={{color:"#B8922A",fontSize:8,letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>Master Perfumery</p>
              <p className="disp" style={{color:"#fff",fontSize:18,fontWeight:300}}>Ihthiraam</p>
            </div>
          </div>

          {/* Medium top-middle */}
          <div style={{gridColumn:"3/5",gridRow:"1/2",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099"
              alt="Intoxicate Mystique" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease",aspectRatio:"1/1"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px 16px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:15,fontWeight:300}}>Intoxicate Mystique</p>
            </div>
          </div>

          {/* Tall right — spans 2 rows */}
          <div style={{gridColumn:"5/7",gridRow:"1/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_2_jpg_0bc7a1f3-8af9-4188-98f1-c58151159f55.jpg?v=1771333283"
              alt="Angel Dust" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p style={{color:"#B8922A",fontSize:8,letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>Master Perfumery</p>
              <p className="disp" style={{color:"#fff",fontSize:18,fontWeight:300}}>Angel Dust</p>
            </div>
          </div>

          {/* Bottom-middle left */}
          <div style={{gridColumn:"3/4",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-01_b085642f-9033-4997-a1fd-4e97be2a8575.jpg?v=1762324228"
              alt="Onyx Gold" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:13,fontWeight:300}}>Onyx Gold</p>
            </div>
          </div>

          {/* Bottom-middle right */}
          <div style={{gridColumn:"4/5",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422"
              alt="Shiyaaka Snow" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:13,fontWeight:300}}>Shiyaaka Snow</p>
            </div>
          </div>

          {/* Bottom full row — 3 equal */}
          {[
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291",name:"Saraya"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-01.jpg?v=1771151092",name:"Sawaar Vanille Blanc"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NafaisMagrib-1.jpg?v=1761115734",name:"Nafais Magrib"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-1.jpg?v=1775636739",name:"Qarar"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ZayanSilver-1.jpg?v=1776430327",name:"Zayaan Silver"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.2.jpg?v=1773206615",name:"Icon"},
          ].map((item,i)=>(
            <div key={item.name} style={{gridColumn:`${i+1}/${i+2}`,gridRow:"3/4",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
              <img src={item.src} alt={item.name} loading="lazy"
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",aspectRatio:"1/1",transition:"transform .6s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
              <div
                style={{position:"absolute",inset:0,background:"rgba(0,0,0,0)",transition:"background .3s",display:"flex",alignItems:"flex-end",padding:"10px"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.45)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0)"}
              >
                <p className="disp" style={{color:"#fff",fontSize:12,fontWeight:300,opacity:0,transition:"opacity .3s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                >{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: COLLECTIONS
═══════════════════════════════════════════════════════════════ */
function CollectionsPage({ addToCart, setViewProduct, setPage }){
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceMax, setPriceMax] = useState(800);

  let filtered = PRODUCTS.filter(p=>{
    if(activeCat==="All") return true;
    if(activeCat==="Best Sellers") return p.badge==="Best Seller";
    if(activeCat==="New") return p.badge==="New";
    if(activeCat==="For Him") return p.gender==="Him";
    if(activeCat==="For Her") return p.gender==="Her";
    if(activeCat==="Unisex") return p.gender==="Unisex";
    return p.col===activeCat;
  }).filter(p=>p.price<=priceMax);

  if(sortBy==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price);
  if(sortBy==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price);

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(300px,38vw,500px)",overflow:"hidden",background:"#000"}}>
        {/* Background collage of product images */}
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,opacity:.5}}>
          {[
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-01_b085642f-9033-4997-a1fd-4e97be2a8575.jpg?v=1762324228",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422",
          ].map((src,i)=>(
            <div key={i} style={{overflow:"hidden",height:"100%"}}>
              <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.85) 0%,rgba(0,0,0,.65) 50%,rgba(0,0,0,.80) 100%)"}}/>

        {/* Text content */}
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
          padding:"0 5%",textAlign:"center",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:24}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>
            Khadlaj · Est. 1997
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(42px,6vw,88px)",fontWeight:300,
            color:"#fff",lineHeight:.95,letterSpacing:-2,marginBottom:20,
          }}>
            All Fragrances
          </h1>
          <p style={{
            color:"rgba(255,255,255,.6)",fontSize:14,
            fontFamily:"'DM Sans',sans-serif",letterSpacing:.5,
            marginBottom:32,
          }}>
            {PRODUCTS.length} unique creations — from everyday luxury to rare extrait
          </p>
          {/* Live category quick-links */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {["Best Sellers","New","For Him","For Her","Unisex"].map(c=>(
              <button
                key={c}
                onClick={()=>setActiveCat(c)}
                style={{
                  background:"transparent",color:"rgba(255,255,255,.75)",
                  border:"1px solid rgba(255,255,255,.3)",
                  padding:"7px 18px",fontSize:9,letterSpacing:2,
                  textTransform:"uppercase",cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",
                  transition:"all .2s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.3)";e.currentTarget.style.color="rgba(255,255,255,.75)";}}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div style={{
        background:"#fff",borderBottom:"1px solid #E8E4DC",
        padding:"20px 5%",
        display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",
        position:"sticky",top:0,zIndex:50,
        boxShadow:"0 2px 12px rgba(0,0,0,.05)",
      }}>
        {/* Category tabs */}
        <div style={{display:"flex",gap:0,flex:1,flexWrap:"wrap",borderRight:"1px solid #E0E0E0",paddingRight:16,marginRight:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{
                background:"transparent",
                color: activeCat===c ? "#000" : "#888",
                border:"none",
                borderBottom: activeCat===c ? "2px solid #000" : "2px solid transparent",
                padding:"8px 14px 10px",fontSize:10,letterSpacing:1.5,
                cursor:"pointer",whiteSpace:"nowrap",
                fontWeight: activeCat===c ? 700 : 400,
                transition:"all .18s",textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",
              }}>{c}</button>
          ))}
        </div>
        {/* Sort + Price */}
        <div style={{display:"flex",gap:12,alignItems:"center",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,color:"#888",letterSpacing:1,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>Max AED {priceMax}</span>
            <input type="range" min={50} max={800} value={priceMax} onChange={e=>setPriceMax(+e.target.value)}
              style={{width:90,accentColor:"#000"}}/>
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            style={{
              background:"#fff",color:"#000",
              border:"1px solid #E0E0E0",
              padding:"8px 14px",fontSize:10,cursor:"pointer",
              letterSpacing:1,fontFamily:"'DM Sans',sans-serif",
              outline:"none",
            }}>
            <option value="default">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div style={{padding:"40px 5% 96px"}}>
        <p style={{
          fontSize:10,color:"#999",marginBottom:32,
          letterSpacing:2,fontFamily:"'DM Sans',sans-serif",
          textTransform:"uppercase",
        }}>{filtered.length} fragrances found</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="grid-4">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"96px 0"}}>
            <p className="disp" style={{fontSize:36,fontWeight:300,color:"#000",marginBottom:12}}>No fragrances found</p>
            <p style={{fontSize:13,color:"#888",fontFamily:"'DM Sans',sans-serif"}}>Try adjusting the filters above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: PRODUCT DETAIL
═══════════════════════════════════════════════════════════════ */
function ProductPage({ product, addToCart, setPage }){
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const related = PRODUCTS.filter(p=>p.col===product.col && p.id!==product.id).slice(0,4);
  const badgeColor = product.badge==="Limited"?C.rouge:product.badge==="New"?C.brass:"#333";
  const packType = product.format || (product.size==="Gift Set" ? "Gift Set" : "Single");

  const thumbs = product.images?.length ? product.images : [product.img];

  useEffect(()=>{
    setActiveImg(0);
  }, [product.id]);

  const handleAdd = () => {
    for(let i=0;i<qty;i++) addToCart(product);
    setAdded(true);
    setTimeout(()=>setAdded(false),2200);
  };

  return (
    <div style={{padding:"34px 4% 92px",background:"linear-gradient(180deg,#FEFCF8 0%,#FFFFFF 42%,#F6F0E6 100%)",minHeight:"100vh"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <div style={{marginBottom:20}}>
          <button
            onClick={()=>setPage("collections")}
            aria-label="Go back"
            style={{
              width:38,
              height:38,
              border:"1px solid #D9D1C4",
              background:"#fff",
              color:"#111",
              boxShadow:"0 3px 10px rgba(17,17,17,.06)",
              display:"inline-flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer"
            }}
          >
            <span style={{fontSize:22,lineHeight:1}}>&larr;</span>
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:36,alignItems:"start"}} className="grid-2">
          <div style={{position:"relative",display:"grid",placeItems:"center",padding:"12px 0 20px"}}>
            <div
              style={{
                width:"100%",
                maxWidth:620,
                aspectRatio:"1/1",
                display:"grid",
                placeItems:"center",
                background:"radial-gradient(circle at 50% 42%, rgba(255,255,255,.98) 0%, rgba(248,246,241,.98) 64%, rgba(241,236,228,.96) 100%)",
                border:"1px solid #E8E0D2",
                boxShadow:"0 24px 70px rgba(17,17,17,.08)",
                borderRadius:26,
                overflow:"hidden"
              }}
            >
              <img
                src={thumbs[activeImg]}
                alt={product.name}
                style={{
                  width:"82%",
                  height:"82%",
                  objectFit:"contain",
                  filter:"drop-shadow(0 18px 26px rgba(17,17,17,.12))"
                }}
              />
            </div>
            {thumbs.length > 1 && (
              <div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap",justifyContent:"center"}}>
                {thumbs.map((t,i)=>(
                  <button
                    key={t}
                    onClick={()=>setActiveImg(i)}
                    style={{
                      width:58,
                      height:58,
                      padding:0,
                      border:`1px solid ${activeImg===i ? "#111" : "#D8D1C6"}`,
                      background:"#fff",
                      cursor:"pointer",
                      overflow:"hidden",
                      opacity:activeImg===i ? 1 : .6
                    }}
                  >
                    <img src={t} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{maxWidth:520,margin:"8px auto 0",padding:"10px 0 0"}}>
            <p style={{fontSize:11,letterSpacing:2.5,textTransform:"uppercase",color:"#7A7166",marginBottom:12}}>
              {product.col} · {packType}
            </p>
            <h1 className="disp" style={{fontSize:"clamp(34px,5vw,58px)",fontWeight:600,color:"#111",lineHeight:1.02,letterSpacing:-1,marginBottom:14,textTransform:"uppercase"}}>
              {product.name}
            </h1>
            <p style={{fontSize:16,color:"#655E54",lineHeight:1.85,maxWidth:430,marginBottom:22}}>
              {packType === "Gift Set"
                ? "A polished gift presentation with a premium, layered composition made for memorable gifting."
                : `A refined fragrance crafted to feel modern, polished, and effortlessly wearable throughout the day.`}
            </p>

            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <StarRating n={5} color="#111" />
              <span style={{fontSize:14,color:"#111",fontWeight:600}}>4.7 (905)</span>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,maxWidth:430,marginBottom:18}} className="grid-2">
              <div>
                <p style={{fontSize:12,letterSpacing:1.5,textTransform:"uppercase",color:"#6F665B",marginBottom:8}}>Size</p>
                <div style={{border:"1px solid #1A1A1A",padding:"14px 18px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:16,color:"#111",fontWeight:500}}>{product.size}</span>
                  <span style={{fontSize:12,color:"#8A8175",letterSpacing:1.2,textTransform:"uppercase"}}>{packType}</span>
                </div>
              </div>
              <div>
                <p style={{fontSize:12,letterSpacing:1.5,textTransform:"uppercase",color:"#6F665B",marginBottom:8}}>Quantity</p>
                <div style={{border:"1px solid #1A1A1A",padding:"14px 18px",background:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{border:"none",background:"transparent",fontSize:20,cursor:"pointer",lineHeight:1,color:"#111"}} aria-label="Decrease quantity">−</button>
                  <span style={{fontSize:16,color:"#111",fontWeight:500}}>{qty}</span>
                  <button onClick={()=>setQty(q=>q+1)} style={{border:"none",background:"transparent",fontSize:20,cursor:"pointer",lineHeight:1,color:"#111"}} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>

            <p className="disp" style={{fontSize:28,fontWeight:800,color:"#111",marginBottom:18}}>AED {product.price}</p>

            <button
              className="btn-gold"
              onClick={handleAdd}
              style={{
                width:"100%",
                maxWidth:430,
                background:"#111",
                color:"#fff",
                border:"none",
                boxShadow:"none",
                fontSize:14,
                letterSpacing:1.8,
                padding:"18px 24px",
                textTransform:"uppercase"
              }}
            >
              {added ? "Added to Bag" : "Add to Bag"}
            </button>

            <p style={{fontSize:11,color:"#8A8175",marginTop:14,letterSpacing:.8}}>
              Secure checkout · Free shipping on selected orders
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length>0 && (
        <div style={{marginTop:84}}>
          <SectionHeader eyebrow="◈ · From the Same Collection" title={`More from ${product.col}`} light/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="grid-4">
            {related.map(p=>(
              <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct&&setViewProduct(prod);}} onCart={addToCart}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: GIFT SETS
═══════════════════════════════════════════════════════════════ */
function GiftsPage({ addToCart, setViewProduct, setPage }){
  // Pull gift set products directly from PRODUCTS array (size === "Gift Set")
  const giftProducts = PRODUCTS.filter(p => p.size === "Gift Set");

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(280px,38vw,480px)",overflow:"hidden",background:"#000"}}>
        <img
          src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755"
          alt="Gift Sets"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:.55}}
        />
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          padding:"0 5%",textAlign:"center",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:24}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Khadlaj Gifting</p>
          <h1 className="disp" style={{fontSize:"clamp(38px,6vw,80px)",fontWeight:300,color:"#fff",lineHeight:1,letterSpacing:-2,marginBottom:16}}>
            The Gift of<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Authentic Fragrance</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.65)",maxWidth:480,lineHeight:1.8,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>
            Every Khadlaj gift set arrives in premium packaging — a luxury experience from first glance.
          </p>
        </div>
      </div>

      {/* ── Live Gift Set Products (from PRODUCTS) ── */}
      <section style={{padding:"80px 5%",background:"#FAFAF8"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:52}}>
          <div>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Curated Collections</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>
              Gift Sets &amp; <em style={{fontStyle:"italic",color:"#B8922A"}}>Bundles</em>
            </h2>
          </div>
          <p style={{fontSize:12,color:"#888",fontFamily:"'DM Sans',sans-serif"}}>{giftProducts.length} gift sets available</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="grid-4">
          {giftProducts.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{if(setViewProduct){setViewProduct(prod);setPage("product");}}} onCart={addToCart}/>
          ))}
        </div>
      </section>

      {/* ── Featured Gift Sets (editorial 2-col) ── */}
      <section style={{padding:"0 5% 80px",background:"#fff"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:48,paddingTop:80,borderTop:"1px solid #E8E4DC"}}>
          <div>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Premium Sets</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>Signature Gift Boxes</h2>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}} className="grid-3">
          {GIFT_SETS.filter(g=>g.img && !g.img.includes("unsplash")).map(g=>(
            <div
              key={g.id}
              style={{
                position:"relative",
                cursor:"pointer",
                background:"#fff",
                transition:"box-shadow .3s",
              }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.10)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
            >
              {/* Image */}
              <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#F5F3EF"}}>
                <img
                  src={g.img} alt={g.name}
                  style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s ease"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                />
                <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                <span style={{
                  position:"absolute",top:14,left:14,
                  background:"#B8922A",color:"#fff",
                  fontSize:8,letterSpacing:2,padding:"4px 10px",
                  fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",fontWeight:700,
                }}>{g.pieces} pcs</span>
              </div>
              {/* Info */}
              <div style={{padding:"16px 16px 20px"}}>
                <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>Gift Set</p>
                <h3 style={{
                  fontSize:14,fontWeight:700,color:"#000",
                  marginBottom:6,textTransform:"uppercase",letterSpacing:.4,
                  fontFamily:"'DM Sans',sans-serif",lineHeight:1.25,
                }}>{g.name}</h3>
                <p style={{fontSize:12,color:"#777",lineHeight:1.65,marginBottom:14,fontFamily:"'DM Sans',sans-serif"}}>{g.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                  <p style={{fontSize:16,fontWeight:700,color:"#000",fontFamily:"'DM Sans',sans-serif"}}>AED {g.price}</p>
                  <button
                    onClick={()=>addToCart(g)}
                    style={{
                      background:"#000",color:"#fff",border:"none",
                      padding:"10px 18px",fontSize:9,letterSpacing:2.5,
                      textTransform:"uppercase",cursor:"pointer",
                      fontFamily:"'DM Sans',sans-serif",fontWeight:600,
                    }}
                  >Add to Bag</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Build Your Own CTA ── */}
      <section style={{background:"#000",padding:"80px 5%",textAlign:"center"}}>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 32px"}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Custom Orders</p>
          <h2 className="disp" style={{fontSize:"clamp(30px,4vw,56px)",fontWeight:300,color:"#fff",marginBottom:16,letterSpacing:-1}}>Build Your Own Gift Box</h2>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:14,maxWidth:460,margin:"0 auto 40px",lineHeight:1.85,fontFamily:"'DM Sans',sans-serif"}}>
            Choose any 2–6 fragrances and we'll present them in our signature gift packaging. Perfect for corporate gifting or weddings.
          </p>
          <button className="btn-gold" style={{fontSize:10,padding:"15px 44px",letterSpacing:3}}>Start Building</button>
          <div style={{width:40,height:1,background:"#B8922A",margin:"32px auto 0"}}/>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: OUR STORY
═══════════════════════════════════════════════════════════════ */
function StoryPage(){
  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(340px,45vw,560px)",overflow:"hidden",background:"#000"}}>
        {/* Split background — founder photo left, perfume bottles right */}
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          <div style={{overflow:"hidden"}}>
            <img src="./assets/images/people/founder-mohamed-iqbal.png" alt=""
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:.6}}/>
          </div>
          <div style={{overflow:"hidden",background:"#0A0A0A"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386" alt=""
              style={{width:"100%",height:"100%",objectFit:"cover",opacity:.4}}/>
          </div>
        </div>
        {/* Unified dark overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.70) 100%)"}}/>
        {/* Content */}
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          justifyContent:"flex-end",
          padding:"0 6% 56px",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>
            Family-Owned · UAE · Est. 1997
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(48px,7vw,96px)",fontWeight:300,
            color:"#fff",lineHeight:.92,letterSpacing:-3,marginBottom:20,
          }}>
            Our Story
          </h1>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:14,maxWidth:480,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>
            45 years of mastery. One family. 400+ fragrances that define Arabian perfumery.
          </p>
        </div>
      </div>

      <div style={{padding:"80px 5%"}}>
        {/* Founder story */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          <div>
            <p className="eyebrow" style={{marginBottom:16}}>◈ · The Beginning</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,4vw,52px)",fontWeight:300,lineHeight:1.2,marginBottom:24}}>
              Founder and Master Perfumer
            </h2>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              Mohamed Iqbal Abdul Sattar, with over 45 years of experience in perfumery, is the esteemed founder and master perfumer of Khadlaj Perfumes.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:32}}>
              He is recognized for his creation of some of our most cherished and opulent fragrances, including the iconic Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. Mohamed’s unparalleled expertise encompasses both exquisite natural essences and meticulously crafted synthetic compounds, with an ardent passion for Musk, Ruh Gulaab, oud, and vetiver.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
              {STATS.map(s=>(
                <div key={s.v} style={{border:`1px solid ${C.brass}28`,padding:"20px 22px"}}>
                  <p className="disp" style={{fontSize:36,fontWeight:600,color:C.brass}}>{s.v}</p>
                  <p className="eyebrow" style={{color:C.muted,marginTop:4}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
            <img src="./assets/images/people/founder-mohamed-iqbal.png"
              alt="Mohamed Iqbal Abdul Sattar" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(to top,${C.obsidian}EE 0%,transparent 60%)`,padding:"28px 24px"}}>
              <p className="disp" style={{fontSize:22,color:C.champagne}}>Mohamed Iqbal Abdul Sattar</p>
              <p className="eyebrow" style={{color:C.brass,marginTop:4}}>Founder & Master Perfumer</p>
            </div>
          </div>
        </div>

        {/* Managing Director */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
            <img src="./assets/images/people/managing-director-asif.png"
              alt="Asif Mohamed Iqbal Katchi" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(to top,${C.obsidian}EE 0%,transparent 60%)`,padding:"28px 24px"}}>
              <p className="disp" style={{fontSize:22,color:C.champagne}}>Asif Mohamed Iqbal Katchi</p>
              <p className="eyebrow" style={{color:C.brass,marginTop:4}}>Managing Director</p>
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{marginBottom:16}}>? � Leadership</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,4vw,52px)",fontWeight:300,lineHeight:1.2,marginBottom:24}}>
              Managing Director
            </h2>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              Asif Mohamed Iqbal Katchi brings over 18 years of profound experience and carries forward the illustrious legacy of his father, Mohamed Iqbal, with a clear commitment to excellence in every endeavor.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              His visionary and creatively driven leadership is focused on making Khadlaj a luxurious, trusted name in fragrance, synonymous with reliability, innovation, and a celebrated household presence across the industry.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:32}}>
              Known for anticipating challenges with an agile and proactive mindset, Mr. Asif has helped navigate Khadlaj through dynamic market shifts while strengthening the company�s position as a leader in perfumery craftsmanship and luxury.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
              {[
                {v:"18+", l:"Years of Experience"},
                {v:"1", l:"Legacy to Lead"},
              ].map(s=>(
                <div key={s.v} style={{border:`1px solid ${C.brass}28`,padding:"20px 22px"}}>
                  <p className="disp" style={{fontSize:36,fontWeight:600,color:C.brass}}>{s.v}</p>
                  <p className="eyebrow" style={{color:C.muted,marginTop:4}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Master Perfumers */}
        <SectionHeader eyebrow="◎ · The Craftsmen" title="Meet Our Founder & Master Perfumer"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,marginBottom:80}} className="grid-2">
          {TEAM.map(t=>(
            <div key={t.name} style={{background:C.onyx,border:`1px solid ${C.brass}18`,overflow:"hidden",display:"flex",gap:0}}>
              <div style={{width:200,flexShrink:0,overflow:"hidden"}}>
                <img src={t.img} alt={t.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
              </div>
              <div style={{padding:"32px 28px"}}>
                <p className="eyebrow" style={{marginBottom:8}}>{t.role}</p>
                <h3 className="disp" style={{fontSize:28,fontWeight:400,color:C.champagne,marginBottom:16}}>{t.name}</h3>
                <p style={{fontSize:14,color:C.muted,lineHeight:1.8}}>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Craft timeline */}
        <div style={{background:"#000",padding:"64px 6%",marginBottom:80}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 20px"}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Our Process</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,48px)",fontWeight:300,color:"#fff",letterSpacing:-1}}>How a Khadlaj Fragrance is Born</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32}} className="grid-4">
            {[
              {step:"01",icon:"🌹",title:"Source",desc:"We travel to the world's finest sources — Taif roses, Cambodian oud, French iris, Indian sandalwood."},
              {step:"02",icon:"⚗️",title:"Create",desc:"Mohamed Iqbal blends top, heart, and base notes through hundreds of iterations in our private atelier."},
              {step:"03",icon:"⏳",title:"Mature",desc:"Each fragrance macerates for weeks, allowing ingredients to harmonise into a cohesive whole."},
              {step:"04",icon:"📦",title:"Present",desc:"Bottled and packaged in-house, every Khadlaj fragrance is inspected before it reaches your hands."},
            ].map((s,i)=>(
              <div key={s.step} style={{textAlign:"center",padding:"0 8px"}}>
                <p style={{fontSize:10,color:"#B8922A",letterSpacing:3,marginBottom:12,fontFamily:"'DM Mono',monospace"}}>{s.step}</p>
                <span style={{fontSize:32}}>{s.icon}</span>
                <h4 className="disp" style={{fontSize:22,fontWeight:400,color:"#fff",margin:"12px 0 8px"}}>{s.title}</h4>
                <p style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.75,fontFamily:"'DM Sans',sans-serif"}}>{s.desc}</p>
                {i < 3 && <div style={{width:1,height:40,background:"rgba(184,146,42,.3)",margin:"24px auto 0"}}/>}
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle editorial */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:0}}>
          {[
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_2_jpg_0bc7a1f3-8af9-4188-98f1-c58151159f55.jpg?v=1771333283",
          ].map((src,i)=>(
            <div key={i} style={{aspectRatio:"4/5",overflow:"hidden"}}>
              <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: CONTACT
═══════════════════════════════════════════════════════════════ */
function ContactPage(){
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const handle = () => { setSent(true); setForm({name:"",email:"",subject:"",message:""}); };

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(280px,36vw,440px)",overflow:"hidden",background:"#000"}}>
        <img
          src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ZayanSilver-1.jpg?v=1776430327"
          alt="Contact"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:.4}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,.80) 0%,rgba(0,0,0,.50) 60%,rgba(0,0,0,.65) 100%)"}}/>
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          justifyContent:"flex-end",
          padding:"0 6% 52px",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>
            Get in Touch
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(44px,6vw,84px)",fontWeight:300,
            color:"#fff",lineHeight:.92,letterSpacing:-2,marginBottom:16,
          }}>Contact Us</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,maxWidth:420,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>
            Our team is ready to assist — whether you're a customer, retailer, or gifting partner.
          </p>
        </div>
      </div>

      <div style={{padding:"80px 5% 96px",display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:64}} className="hero-split">
        {/* Info */}
        <div>
          <div style={{width:32,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Reach Us</p>
          <h2 className="disp" style={{fontSize:"clamp(28px,3vw,44px)",fontWeight:300,marginBottom:24,lineHeight:1.1,color:"#000",letterSpacing:-1}}>We'd Love to Hear From You</h2>
          <p style={{color:"#777",lineHeight:1.85,fontSize:14,marginBottom:36,fontFamily:"'DM Sans',sans-serif"}}>
            Whether you're a fragrance enthusiast, a retail partner, or a gifting client — our team is here to help.
          </p>
          {[
            ["📍","Address","Dubai, United Arab Emirates"],
            ["📞","Phone","+971 4 000 0000"],
            ["✉️","Email","hello@khadlaj-perfumes.com"],
            ["⏰","Hours","Mon–Sat: 9am–6pm GST"],
          ].map(([icon,label,val])=>(
            <div key={label} style={{display:"flex",gap:18,marginBottom:22,paddingBottom:22,borderBottom:"1px solid #F0EBE3"}}>
              <span style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</span>
              <div>
                <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>{label}</p>
                <p style={{fontSize:14,color:"#333",fontFamily:"'DM Sans',sans-serif"}}>{val}</p>
              </div>
            </div>
          ))}
          <div style={{marginTop:32}}>
            <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Follow Us</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[
                ["Instagram","https://www.instagram.com/khadlajperfumes"],
                ["TikTok",SOCIAL_LINKS.tiktok],
                ["Facebook","https://www.facebook.com/"],
                ["YouTube","https://www.youtube.com/"],
              ].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{
                    border:"1px solid #000",color:"#000",
                    padding:"9px 16px",fontSize:9,letterSpacing:2,
                    cursor:"pointer",textDecoration:"none",
                    fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#000";}}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{background:"#000",padding:"44px 40px"}}>
          {sent ? (
            <div style={{textAlign:"center",padding:"60px 0"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"#B8922A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:22,color:"#fff"}}>✓</div>
              <h3 className="disp" style={{fontSize:32,color:"#fff",margin:"0 0 12px",fontWeight:300}}>Message Sent</h3>
              <p style={{color:"rgba(255,255,255,.5)",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>We'll get back to you within 24 hours.</p>
              <button className="btn-ghost" onClick={()=>setSent(false)} style={{marginTop:32,color:"#fff",borderColor:"rgba(255,255,255,.3)"}}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{width:32,height:1,background:"#B8922A",marginBottom:20}}/>
              <h3 className="disp" style={{fontSize:28,fontWeight:300,color:"#fff",marginBottom:32,letterSpacing:-0.5}}>Send a Message</h3>
              {[["Name","name","text"],["Email","email","email"],["Subject","subject","text"]].map(([label,key,type])=>(
                <div key={key} style={{marginBottom:18}}>
                  <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{label}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                    style={{
                      width:"100%",background:"rgba(255,255,255,.05)",
                      border:"1px solid rgba(255,255,255,.12)",
                      borderBottom:"1px solid rgba(255,255,255,.3)",
                      color:"#fff",padding:"12px 0",fontSize:14,outline:"none",
                      fontFamily:"'DM Sans',sans-serif",
                    }}/>
                </div>
              ))}
              <div style={{marginBottom:28}}>
                <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>Message</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5}
                  style={{
                    width:"100%",background:"rgba(255,255,255,.05)",
                    border:"1px solid rgba(255,255,255,.12)",
                    borderBottom:"1px solid rgba(255,255,255,.3)",
                    color:"#fff",padding:"12px 0",fontSize:14,outline:"none",
                    resize:"vertical",fontFamily:"'DM Sans',sans-serif",
                  }}/>
              </div>
              <button
                onClick={handle}
                style={{
                  width:"100%",background:"#B8922A",color:"#fff",
                  border:"none",padding:"16px",fontSize:10,
                  letterSpacing:3,textTransform:"uppercase",cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",fontWeight:600,
                  transition:"opacity .2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}
              >Send Message</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar({ page, setPage, cartCount }){
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:18}}>
              <span className="hide-mob" style={{fontSize:10,letterSpacing:2,color:"#555",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={()=>setPage("contact")}>Sign Up</span>
              <span style={{cursor:"pointer",fontSize:16,color:"#000",lineHeight:1}} onClick={()=>setSearchOpen(true)}>⌕</span>
              <div onClick={()=>setPage("collections")} style={{position:"relative",cursor:"pointer"}}>
                <span style={{fontSize:16,color:"#000",lineHeight:1}}>⊡</span>
                {cartCount>0 && (
                  <span style={{position:"absolute",top:-7,right:-9,background:"#000",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{cartCount}</span>
                )}
              </div>
              {/* Hamburger — mobile only */}
              <button
                onClick={()=>setMobileMenuOpen(o=>!o)}
                style={{
                  display:"none",background:"none",border:"none",
                  cursor:"pointer",padding:"4px",flexDirection:"column",
                  gap:5,justifyContent:"center",alignItems:"center",
                }}
                className="mob-burger"
                aria-label="Menu"
              >
                <span style={{display:"block",width:22,height:1.5,background:"#000",transition:"all .25s"}}/>
                <span style={{display:"block",width:22,height:1.5,background:"#000",transition:"all .25s"}}/>
                <span style={{display:"block",width:14,height:1.5,background:"#000",transition:"all .25s"}}/>
              </button>
            </div>
          </div>
          {/* Nav links desktop */}
          <div className="hide-mob" style={{display:"flex",justifyContent:"center",gap:36,paddingBottom:14,fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:"#000",fontFamily:"'DM Sans',sans-serif"}}>
            {[["Offers","collections"],["Bestsellers","collections"],["New In","collections"],["Gifts","gifts"],["Perfume","collections"],["Our Story","story"],["Contact","contact"]].map(([label,pg])=>(
              <span key={label} onClick={()=>setPage(pg)} style={{cursor:"pointer",borderBottom:page===pg?"1px solid #000":"1px solid transparent",paddingBottom:4,transition:"border-color .2s"}}>{label}</span>
            ))}
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <div style={{
            background:"#fff",
            borderTop:"1px solid #E0E0E0",
            padding:"8px 0 20px",
            position:"absolute",top:"100%",left:0,right:0,
            zIndex:200,
            boxShadow:"0 8px 32px rgba(0,0,0,.12)",
          }}>
            {[["Offers","collections"],["Bestsellers","collections"],["New In","collections"],["Gift Sets","gifts"],["All Fragrances","collections"],["Our Story","story"],["Contact","contact"]].map(([label,pg])=>(
              <div
                key={label}
                onClick={()=>{setPage(pg);setMobileMenuOpen(false);}}
                style={{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2.5,
                  textTransform:"uppercase",
                  color:"#000",cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                {label}
                <span style={{color:"#B8922A",fontSize:12}}>→</span>
              </div>
            ))}
            <div style={{padding:"14px 6% 0",display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["Instagram","https://www.instagram.com/khadlajperfumes"],["TikTok",SOCIAL_LINKS.tiktok]].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{fontSize:9,letterSpacing:2,color:"#888",border:"1px solid #E0E0E0",padding:"7px 14px",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`.mob-burger{display:none!important;}@media(max-width:900px){.mob-burger{display:flex!important;}}`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer({ setPage }){
  return (
    <footer style={{background:"#fff",borderTop:"1px solid #E0E0E0"}}>
      {/* Newsletter */}
      <div style={{background:"#000",padding:"60px 5%",textAlign:"center"}}>
        <p className="eyebrow" style={{marginBottom:14,color:"#B8922A"}}>Stay Inspired</p>
        <h2 className="disp" style={{fontSize:38,fontWeight:300,marginBottom:10,color:"#fff",letterSpacing:"-0.5px"}}>Join the Khadlaj Circle</h2>
        <p style={{color:"rgba(255,255,255,.55)",fontSize:13,marginBottom:32,fontFamily:"'DM Sans',sans-serif"}}>New launches, exclusive offers, and fragrance stories — direct to your inbox.</p>
        <div style={{display:"flex",gap:0,maxWidth:440,margin:"0 auto",justifyContent:"center"}}>
          <input type="email" placeholder="Your email address"
            style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,.3)",borderRight:"none",color:"#fff",padding:"13px 18px",fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif"}}/>
          <button style={{background:"#B8922A",border:"none",color:"#fff",padding:"13px 24px",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Subscribe</button>
        </div>
      </div>

      {/* Links */}
      <div style={{padding:"64px 5% 40px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48}} className="grid-4">
        <div>
          <p className="disp" style={{fontSize:24,fontWeight:600,letterSpacing:4,color:"#000",textTransform:"uppercase"}}>KHADLAJ</p>
          <p style={{fontSize:7,letterSpacing:6,color:"#B8922A",fontFamily:"'DM Sans',sans-serif",marginBottom:18}}>PERFUMES · UAE</p>
          <p style={{fontSize:13,color:"#666",lineHeight:1.85,maxWidth:240,marginBottom:28,fontFamily:"'DM Sans',sans-serif"}}>Family-owned UAE perfume house. Authentic Arabian &amp; French fragrance artistry since 1997.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {COUNTRIES.map(c=>(
              <div key={c.name} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",border:"1px solid #E0E0E0",cursor:"pointer"}}>
                <span style={{fontSize:13}}>{c.flag}</span>
                <span style={{fontSize:10,color:"#555",fontFamily:"'DM Sans',sans-serif"}}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{fontSize:10,letterSpacing:3,color:"#000",textTransform:"uppercase",marginBottom:20,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Collections</p>
          {["Atyaab","Lafede","Master Perfumery","Gift Sets","New Arrivals","Best Sellers"].map(l=>(
            <p key={l} onClick={()=>setPage("collections")} style={{fontSize:13,color:"#666",marginBottom:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:.3}}
              onMouseEnter={e=>e.target.style.color="#000"} onMouseLeave={e=>e.target.style.color="#666"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:10,letterSpacing:3,color:"#000",textTransform:"uppercase",marginBottom:20,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Company</p>
          {[["Our Story","story"],["Contact Us","contact"],["Find a Store","contact"],["Careers","contact"],["Press","contact"]].map(([l,pg])=>(
            <p key={l} onClick={()=>setPage(pg)} style={{fontSize:13,color:"#666",marginBottom:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:.3}}
              onMouseEnter={e=>e.target.style.color="#000"} onMouseLeave={e=>e.target.style.color="#666"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:10,letterSpacing:3,color:"#000",textTransform:"uppercase",marginBottom:20,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Support</p>
          {["Shipping & Returns","FAQ","Track My Order","Fragrance Guide","Gift Wrapping"].map(l=>(
            <p key={l} style={{fontSize:13,color:"#666",marginBottom:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:.3}}
              onMouseEnter={e=>e.target.style.color="#000"} onMouseLeave={e=>e.target.style.color="#666"}>{l}</p>
          ))}
          <div style={{marginTop:28}}>
            <p style={{fontSize:10,letterSpacing:3,color:"#000",textTransform:"uppercase",marginBottom:14,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Shipping</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["DHL","Aramex","EMX"].map(s=>(
                <span key={s} style={{border:"1px solid #E0E0E0",padding:"4px 10px",fontSize:9,color:"#888",fontFamily:"'DM Mono',monospace"}}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{borderTop:"1px solid #E0E0E0",margin:"0 5%",padding:"22px 0",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:10,color:"#888",letterSpacing:1,fontFamily:"'DM Sans',sans-serif"}}>
        <p>© 2025 Khadlaj Perfumes LLC. All rights reserved. UAE.</p>
        <div style={{display:"flex",gap:20}}>
          {["Privacy Policy","Terms of Use","Cookie Settings"].map(l=>(
            <span key={l} style={{cursor:"pointer"}} onMouseEnter={e=>e.target.style.color="#000"} onMouseLeave={e=>e.target.style.color="#888"}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [page, setPage] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [viewProduct, setViewProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupDone, setPopupDone] = useState(false);

  const addToCart = () => setCartCount(c=>c+1);

  useEffect(()=>{
    const t = setTimeout(()=>setShowPopup(true), 6000);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  const renderPage = () => {
    switch(page){
      case "home":        return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
      case "collections": return <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "product":     return viewProduct ? <ProductPage product={viewProduct} addToCart={addToCart} setPage={setPage} setViewProduct={setViewProduct}/> : <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "gifts":       return <GiftsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "story":       return <StoryPage/>;
      case "contact":     return <ContactPage/>;
      default:            return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
    }
  };

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#fff",color:"#000",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} cartCount={cartCount}/>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>

      {/* ── Floating Shop button ── */}
      {page==="home" && (
        <button
          className="pulse"
          onClick={()=>setPage("collections")}
          style={{
            position:"fixed",bottom:32,right:32,zIndex:200,
            background:"#000",color:"#fff",
            width:58,height:58,borderRadius:"50%",
            border:"none",cursor:"pointer",
            boxShadow:"0 8px 28px rgba(0,0,0,.25)",
            fontSize:22,transition:"background .2s,transform .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.transform="scale(1.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.transform="scale(1)";}}
          title="Shop Now"
        >🛍</button>
      )}

      {/* ── Newsletter Popup ── */}
      {showPopup && !popupDone && (
        <div
          style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}
          onClick={()=>setShowPopup(false)}
        >
          <div
            className="popup-in"
            onClick={e=>e.stopPropagation()}
            style={{
              background:"#fff",maxWidth:520,width:"100%",
              display:"grid",gridTemplateColumns:"1fr 1fr",
              overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.3)",
              position:"relative",
            }}
          >
            <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:14,right:14,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#000",zIndex:1,lineHeight:1,fontWeight:300}}>×</button>
            {/* Left image */}
            <div style={{position:"relative",minHeight:340,overflow:"hidden"}}>
              <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:24}}>
                <p className="shimmer-text" style={{fontSize:30,fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>10% Off<br/>First Order</p>
              </div>
            </div>
            {/* Right form */}
            <div style={{padding:"40px 28px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{width:28,height:1,background:"#B8922A",marginBottom:16}}/>
              <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Welcome</p>
              <h3 className="disp" style={{fontSize:24,fontWeight:300,color:"#000",marginBottom:10,lineHeight:1.15,letterSpacing:-.5}}>Join the Khadlaj Circle</h3>
              <p style={{fontSize:12,color:"#888",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",marginBottom:24}}>Subscribe &amp; get <strong style={{color:"#000"}}>10% off</strong> your first order plus early access to new launches.</p>
              <input type="email" placeholder="Your email address" value={popupEmail} onChange={e=>setPopupEmail(e.target.value)}
                style={{width:"100%",border:"none",borderBottom:"1px solid #000",padding:"10px 0",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",marginBottom:16,background:"transparent"}}/>
              <button
                onClick={()=>{setPopupDone(true);setShowPopup(false);}}
                style={{width:"100%",background:"#000",color:"#fff",border:"none",padding:"14px",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#000"}
              >Claim 10% Off</button>
              <p onClick={()=>setShowPopup(false)} style={{fontSize:11,color:"#bbb",textAlign:"center",marginTop:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textDecoration:"underline"}}>No thanks</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






