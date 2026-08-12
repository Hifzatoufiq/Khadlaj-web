import React, { useState, useEffect, useRef } from "react";

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
  { name:"UAE",      flagUrl:"/assets/images/flags/ae.png", currency:"AED", rate:1 },
  { name:"Kuwait",   flagUrl:"/assets/images/flags/kw.png", currency:"KWD", rate:0.08 },
  { name:"India",    flagUrl:"/assets/images/flags/in.png", currency:"INR", rate:22.5 },
  { name:"Egypt",    flagUrl:"/assets/images/flags/eg.png", currency:"EGP", rate:13.2 },
  { name:"Malaysia", flagUrl:"/assets/images/flags/my.png", currency:"MYR", rate:1.25 },
  { name:"UK",       flagUrl:"/assets/images/flags/gb.png", currency:"GBP", rate:0.21 },
  { name:"USA",      flagUrl:"/assets/images/flags/us.png", currency:"USD", rate:0.27 },
  { name:"Global",   flagUrl:"global", currency:"USD", rate:0.27 },
];
const CountryContext = React.createContext();

// ── Cloudinary CDN config ──────────────────────────────────────────────────
// Sign up free at cloudinary.com and paste your cloud name below.
const CLOUDINARY_CLOUD = ""; // e.g. "khadlaj-perfumes"
const _CDN = CLOUDINARY_CLOUD
  ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/f_auto,q_auto`
  : null;

function getOptimizedImage(url, width = 600) {
  if (!url || typeof url !== 'string') return url;
  // Shopify / Khadlaj store CDN — add width & webp params
  if (url.includes('cdn.shopify.com') || url.includes('khadlaj-perfumes.com/cdn')) {
    const sep = url.includes('?') ? '&' : '?';
    if (!url.includes('width=')) return `${url}${sep}width=${width}&format=webp`;
    return url;
  }
  // Cloudinary fetch — auto-format, auto-quality, resize any image
  if (_CDN) {
    const abs = url.startsWith('/') ? (typeof window !== 'undefined' ? window.location.origin : '') + url : url;
    return `${_CDN},w_${width}/${encodeURIComponent(abs)}`;
  }
  return url;
}


const PAYMENTS = ["Visa","Mastercard","Apple Pay","Google Pay","Tabby","Tamara","PayTabs","PayPal"];

const NAV_LINKS = ["Best Sellers","Perfume Spray","Perfume Oil","Home & Ambience","Gift Sets","Our legacy"];

const SCENT_RIBBON = ["Island", "Icon", "Shiyaaka", "Empire", "Fursan", "Nuha", "Valor", "Velvet"];

const STATS = [
  { v:"1997", l:"Year Founded" },
  { v:"400+", l:"Unique Fragrances" },
  { v:"30+",  l:"Countries" },
  { v:"1",    l:"Master Perfumer" },
];

const PRODUCTS = [
  {
    "id": 8199234977991,
    "name": "ISLAND",
    "col": "Extrait De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/products/island-packshot-tight_transparent.png"
  },
  {
    "id": 8561163075783,
    "name": "SAWAAR VANILLE BLANC",
    "col": "Extrait De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Her",
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/products/sawaar-cutout.png"
  },
  {
    "id": 8409302073543,
    "name": "SHIYAAKA SHADOW",
    "col": "Eau De Parfum",
    "price": 126,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Him",
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/products/shiyaaka-shadow-cutout.png"
  },
  {
    "id": 9100000000003,
    "name": "SHIYAAKA SNOW",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML",
    "badge": "",
    "gender": "Unisex",
    "notes": ["Fresh Citrus", "Sky Breeze", "Cedarwood"],
    "img": "/assets/images/products/shiyaaka-snow-cutout.png"
  },
  {
    "id": 8354691940551,
    "name": "ISLAND VANILLA DUNES",
    "col": "Extrait De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Vanilla-3.jpg?v=1783945707"
  },
  {
    "id": 9200000000003,
    "name": "SHIYAAKA SKY",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ml",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Fresh Citrus", "Sky Breeze", "Cedarwood"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SPECIAL_EDITION_SHIYAAKA_SKY.png?v=1783938999",
    "detailImages": [
      "https://khadlaj-perfumes.com/cdn/shop/files/SPECIAL_EDITION_SHIYAAKA_SKY.png?v=1783938999",
      "https://khadlaj-perfumes.com/cdn/shop/files/Screenshot_2026-06-12_154715.png?v=1781264869",
      "https://khadlaj-perfumes.com/cdn/shop/files/Screenshot_2026-06-12_154730.png?v=1781264869",
      "https://khadlaj-perfumes.com/cdn/shop/files/skynotes_jpg.jpg?v=1781264809",
      "https://khadlaj-perfumes.com/cdn/shop/files/Screenshot_2026-06-12_154835.png?v=1781264927"
    ],
    "desc": [
      "Shiyaaka Sky is a refined expression of freshness and modern sophistication, crafted for those who embrace confidence, freedom, and effortless elegance.",
      "The fragrance opens with a vibrant burst of bergamot, mandarin, and verbena, creating a crisp and uplifting introduction that feels as refreshing as a clear summer sky. At its heart, a luminous blend of neroli, geranium, orange blossom, and green notes unfolds, bringing a clean floral character balanced by natural freshness and airy vitality.",
      "As the scent settles, ambroxan, vetiver, musk, and sandalwood create a smooth and sophisticated foundation. The result is a lasting trail that is clean, woody, and subtly sensual, leaving an unforgettable impression of understated luxury.",
      "<strong>Fragrance Family:</strong> Fresh Aromatic Woody",
      "<strong>Olfactory Profile:</strong> Bright • Airy • Elegant • Modern",
      "Shiyaaka Sky captures the feeling of limitless horizons and endless possibilities—a fragrance that embodies freshness elevated to a new level of sophistication."
    ]
  },
  {
    "id": 9100000000001,
    "name": "KARUS GOLD ABSOLU",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Gold Oud", "Royal Amber", "Velvet Musk"],
    "img": "/assets/images/products/karus-gold-absolu.png?v=2"
  },
  {
    "id": 7554205647047,
    "name": "SHIYAAKA BLUE",
    "col": "Eau De Parfum",
    "price": 65,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Blue.1.jpg?v=1771043727"
  },
  {
    "id": 7554205614279,
    "name": "SHIYAAKA MEN",
    "col": "Eau De Parfum",
    "price": 65,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://hifzatoufiq.github.io/Khadlaj-web/assets/images/products/shiya_men_v3.png"
  },
  {
    "id": 7554205581511,
    "name": "SHIYAAKA WHITE",
    "col": "Eau De Parfum",
    "price": 65,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.White.1.jpg?v=2"
  },
  {
    "id": 7554205548743,
    "name": "SHIYAAKA GOLD",
    "col": "Eau De Parfum",
    "price": 65,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Gold.1.jpg?v=2"
  },

  {
    "id": 9100000000002,
    "name": "SARAYA",
    "col": "Extrait De Parfum",
    "price": 105,
    "size": "60 ML",
    "badge": "",
    "gender": "Unisex",
    "notes": ["Precious Oud", "Saffron", "Rose"],
    "img": "/assets/images/products/saraya-cutout.png"
  },
  
  {
    "id": 9100000000004,
    "name": "ZAYAAN SILVER",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ML",
    "badge": "New",
    "gender": "Him",
    "notes": ["Bergamot", "Silver Vetiver", "Ambroxan"],
    "img": "/assets/images/products/zayaan-silver_transparent.png"
  },
  {
    "id": 9100000000005,
    "name": "QARAR",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "60 ML",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/products/qarar-cutout.png"
  },
  {
    "id": 9100000000006,
    "name": "IHTHIRAAM",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "60 ML",
    "badge": "New",
    "gender": "Unisex",
    "notes": ["Precious Wood", "Saffron", "Amber"],
    "img": "/assets/images/products/ihthiraam-cutout.png"
  },
  {
    "id": 9100000000007,
    "name": "ICON",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ML",
    "badge": "New",
    "gender": "Him",
    "notes": ["Bergamot", "Cardamom", "Cedar"],
    "img": "/assets/images/products/icon-cutout.png"
  },
  {
    "id": 9100000000008,
    "name": "PANACHE ANGEL DUST",
    "col": "Extrait De Parfum",
    "price": 200,
    "size": "100 ML",
    "badge": "New",
    "gender": "Her",
    "notes": ["Creamy Vanilla", "White Floral", "Musk"],
    "img": "/assets/images/products/panache-cutout.png"
  },

  {
    "id": 8526052262087,
    "name": "OUD JUMEIRAH",
    "col": "Master Perfumery",
    "price": 200.0,
    "size": "60ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": ["Oud", "Woody", "Amber"],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Jumeirah-3.jpg?v=1783940923"
  },{
    "id": "8711666925767",
    "name": "CREAM VELVET GIFT SET",
    "price": 160.0,
    "size": "Gift Set",
    "badge": "",
    "col": "Gift Sets",
    "gender": "Unisex",
    "topNotes": [],
    "midNotes": [],
    "baseNotes": [],
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/gifsets/cream_velvet_nobox.png",
    "detailImages": ["/assets/images/gifsets/cream_velvet_nobox.png"]
  },
  {
    "id": "8674591408327",
    "name": "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET FOR WOMEN",
    "price": 125.0,
    "size": "Gift Set",
    "badge": "Sold Out",
    "col": "Gift Sets",
    "gender": "Unisex",
    "topNotes": [],
    "midNotes": [],
    "baseNotes": [],
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/gifsets/gourmand_nobox.png",
    "detailImages": ["/assets/images/gifsets/gourmand_nobox.png"]
  },
  {
    "id": "8586765697223",
    "name": "CLOUD CANDY GIFT SET",
    "price": 169.0,
    "size": "Gift Set",
    "badge": "",
    "col": "Gift Sets",
    "gender": "Unisex",
    "topNotes": [],
    "midNotes": [],
    "baseNotes": [],
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/gifsets/cloud_candy_nobox.png",
    "detailImages": ["/assets/images/gifsets/cloud_candy_nobox.png"]
  },
  {
    "id": "8586762813639",
    "name": "ISLAND GIFT SET FOR HIM & HER",
    "price": 179.0,
    "size": "Gift Set",
    "badge": "",
    "col": "Gift Sets",
    "gender": "Unisex",
    "topNotes": [],
    "midNotes": [],
    "baseNotes": [],
    "notes": ["Oud", "Musk", "Amber"],
    "img": "/assets/images/gifsets/island_nobox.png",
    "detailImages": ["/assets/images/gifsets/island_nobox.png"]
  },
  {
    "id": 8783764291783,
    "name": "OUD MUATTAR MUBAKHAR",
    "col": "Bakhoor",
    "price": 65,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Jumeirah-3.jpg?v=1783940923"
  },
  {
    "id": 8730021134535,
    "name": "LA FEDE AURA VANILLA MILK",
    "col": "Lafede",
    "price": 55,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_VANILLA_MILK_100_ML.png?v=1783938923"
  },
  {
    "id": 7554136703175,
    "name": "DEHNAL OUDH COMBODI",
    "col": "Dehn Al Oudh",
    "price": 65,
    "size": "3ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg"
  },

  {
    "id": 8637240934599,
    "name": "LA FEDE INTOXICATE MYSTIQUE",
    "col": "Lafede",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1783939357"
  },
  {
    "id": 8633008914631,
    "name": "OUD MUATTAR OUD AL RAWDA",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_OUD_AL_RAWDA.jpg?v=1783939385"
  },
  {
    "id": 8604851437767,
    "name": "ONYX SILVER",
    "col": "Eau De Parfum",
    "price": 125,
    "size": "100ml EDP",
    "badge": "New",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver3.jpg?v=1783939577"
  },
  {
    "id": 8597262368967,
    "name": "NUHA BON BON",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_BON_BON-03.jpg?v=1783939633"
  },
  {
    "id": 8561538171079,
    "name": "STRAWBERRY SHAKE",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/products/strawberry-shake.png"
  },

  {
    "id": 8540408479943,
    "name": "ONYX GOLD",
    "col": "Eau De Parfum",
    "price": 125,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1783939937"
  },
  {
    "id": 8526040367303,
    "name": "OUD BARAKAT",
    "col": "Master Perfumery",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Barakat-3.jpg?v=1783940266"
  },
  {
    "id": 8525988200647,
    "name": "GALAZAID",
    "col": "Master Perfumery",
    "price": 200,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Galazaid-3.jpg?v=1761124822"
  },
  {
    "id": 8516215439559,
    "name": "RIA",
    "col": "Eau De Parfum",
    "price": 125,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-3.jpg?v=1783941881"
  },
  {
    "id": 8496480944327,
    "name": "MANSION",
    "col": "Eau De Parfum",
    "price": 110,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/mansion_2.jpg?v=1783942858"
  },
  {
    "id": 8488117600455,
    "name": "PEACH VELVET",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/mansion_2.jpg?v=1783942858"
  },
  {
    "id": 8484193861831,
    "name": "TITAN",
    "col": "Eau De Parfum",
    "price": 110,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TITAN-3.jpg?v=1783942163"
  },
  {
    "id": 8473765675207,
    "name": "BISCOTTI MELON MISK",
    "col": "Extrait De Parfum",
    "price": 110,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Melon_Misk-3.jpg?v=1783942967"
  },
  {
    "id": 8457608462535,
    "name": "LA FEDE CELEBRITY CRUSH",
    "col": "Lafede",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CELEBRITY_CRUSH-3.jpg?v=1784374422"
  },
  {
    "id": 8457604071623,
    "name": "LA FEDE CELEBRITY FAME",
    "col": "Lafede",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CELEBRITY_FAME-3.jpg?v=1784374252"
  },
  {
    "id": 8443601223879,
    "name": "ZAYAAN GOLD",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Gold-3_RESIZE.jpg?v=1783936479"
  },
  {
    "id": 8416731889863,
    "name": "LA FEDE EDGE INTENSE",
    "col": "Lafede",
    "price": 90,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Edge_Intense-2.jpg?v=1776231578"
  },
  {
    "id": 8416723861703,
    "name": "LA FEDE EDGE ORIGINAL",
    "col": "Lafede",
    "price": 90,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Edge_Original-2.jpg?v=1776231633"
  },

{
    "id": 8398776959175,
    "name": "BISCOTTI DATE TOFFEE",
    "col": "Extrait De Parfum",
    "price": 110,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Date_Toffee-3.jpg?v=1784370825"
  },
  {
    "id": 8398776860871,
    "name": "BISCOTTI CARAMEL POP",
    "col": "Extrait De Parfum",
    "price": 110,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Caramel_Pop-3_d5613249-6b48-4c8b-8b10-65ab03db07df.jpg?v=1784370936"
  },
  {
    "id": 8386685599943,
    "name": "OUD POUR LEATHER",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_POUR_LEATHER.jpg?v=1783945848"
  },
  {
    "id": 8385197375687,
    "name": "OUD PURE MAGICAL THAI",
    "col": "Perfume Oils",
    "price": 325,
    "size": "3ML",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_Magical_Thai_02.jpg"
  },
  {
    "id": 8385137639623,
    "name": "DEHNAL OUD QAISAR SEUFI",
    "col": "Dehn Al Oudh",
    "price": 325,
    "size": "3ML",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_OAISAR_SEUFI-3.jpg"
  },
  {
    "id": 8385113981127,
    "name": "DEHNAL OUD SHEIKH QADIM",
    "col": "Dehn Al Oudh",
    "price": 325,
    "size": "3ML",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_SHEIKH_OADIM-3.jpg"
  },
  {
    "id": 8361494839495,
    "name": "CLOUD CANDY",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1783945979"
  },
  {
    "id": 8342080946375,
    "name": "OUD MUATTAR QISSA",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Qissa-03.jpg?v=1745839937"
  },
  
  {
    "id": 8342076129479,
    "name": "OUD MUATTAR RUKAIYA",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_2_6f08c36e-4beb-4b09-bdf6-fb68dd7b8427.jpg"
  },
  {
    "id": 8342075244743,
    "name": "OUD MUATTAR AL BAHAAR",
    "col": "Bakhoor",
    "price": 27,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_2_a39244be-9fb7-4336-8e0c-7a6b8d964e4c.jpg"
  },
  {
    "id": 7734819553479,
    "name": "MAISON L' IMAGINAIRE",
    "col": "Eau De Parfum",
    "price": 158,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_L_IMAGINAIRE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965352.jpg?v=1783947272"
  },
  {
    "id": 8332571082951,
    "name": "LA FEDE CELESTE JOICE",
    "col": "Lafede",
    "price": 75,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Joice01.jpg?v=1742360987"
  },
  {
    "id": 8332579340487,
    "name": "LA FEDE CELESTE FLUER",
    "col": "Lafede",
    "price": 75,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Fleur01.jpg?v=1742360562"
  },
  {
    "id": 8332573081799,
    "name": "LA FEDE CELESTE AQUA",
    "col": "Lafede",
    "price": 75,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Aqua02.jpg?v=1742359156"
  },
  {
    "id": 8332570689735,
    "name": "LA FEDE CELESTE TOFFEE",
    "col": "Lafede",
    "price": 75,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Toffee01.jpg?v=1742357488"
  },
  {
    "id": 8331128668359,
    "name": "LA FEDE SYMBOL OF LOVE",
    "col": "Lafede",
    "price": 110,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Symbol_of_Love-3.jpg?v=1776230343"
  },
  {
    "id": 8331129028807,
    "name": "LA FEDE SYMBOL OF POWER",
    "col": "Lafede",
    "price": 110,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Symbol_of_Power-3.jpg?v=1776230317"
  },
  {
    "id": 8323950018759,
    "name": "LA FEDE CHOCO BROWN",
    "col": "Lafede",
    "price": 100,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BrownChoco2.jpg?v=1776231251"
  },
  {
    "id": 8323929342151,
    "name": "LA FEDE WHITE FOREST STRAWBERRY",
    "col": "Lafede",
    "price": 75,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Whiteforeststrawberry02.jpg?v=1776231284"
  },
  {
    "id": 8316886679751,
    "name": "PRIVATE BLEND TOBAC EXTRA",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Tobac_Extra_03.jpg?v=1783946489"
  },
  {
    "id": 8263133561031,
    "name": "MOCHA LATTE",
    "col": "Extrait De Parfum",
    "price": 100,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Mocha_Latte_03.jpg?v=1784382482"
  },
  {
    "id": 8306104369351,
    "name": "NUHA CHERRY BLUSH",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nuha_cherry_blush_03.jpg?v=1783946612"
  },
  {
    "id": 8306103517383,
    "name": "NUHA VANILLA PEARL",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nuha_Vanilla_Pearl_03.jpg?v=1783946810"
  },
  {
    "id": 8300976472263,
    "name": "DESERT ROSE",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Desert_Rose_02.jpg?v=1784383039"
  },
  {
    "id": 8300976341191,
    "name": "BLEU GLACE",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1784382935"
  },
  {
    "id": 8300764332231,
    "name": "OPUS REBORN",
    "col": "Eau De Parfum",
    "price": 90,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Opus_Reborn-03.jpg?v=1783947747"
  },
  {
    "id": 8298206986439,
    "name": "AZURE VELVET",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Azure_Velvet_03.jpg?v=1783946944"
  },
  {
    "id": 8297538945223,
    "name": "JOHAYNA PURPLE",
    "col": "Perfume Oils",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_c65ff337-7d6f-4807-aba0-e617570abc93.jpg?v=1737811492"
  },
  {
    "id": 8297527967943,
    "name": "ANABIA RED",
    "col": "Perfume Oils",
    "price": 32,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/4_0d518155-87a3-4775-9fb3-92c952c6e4fa.jpg?v=1737806598"
  },
  {
    "id": 8297521414343,
    "name": "AMBER PURE",
    "col": "Perfume Oils",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_e11d6c3a-c93a-4ea8-9e37-f7eae4bb3bc7.jpg?v=1784375039"
  },
  {
    "id": 8289952399559,
    "name": "ARABIAN TREASURE",
    "col": "Perfume Oils",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_6cff4d8f-5f86-4355-9a5d-abb81a740c00.jpg?v=1736916084"
  },
  {
    "id": 8285560078535,
    "name": "LA FEDE AURA PISTA DESSERT",
    "col": "Lafede",
    "price": 70,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Pistadessert01.jpg?v=1776230643"
  },
  {
    "id": 8285559816391,
    "name": "LA FEDE AURA MANGA SPLASH",
    "col": "Lafede",
    "price": 70,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MangaSplash01.jpg?v=1776230669"
  },
  {
    "id": 8283965522119,
    "name": "CREAM VELVET",
    "col": "Extrait De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094"
  },
  {
    "id": 8276542390471,
    "name": "RASAYEL VID",
    "col": "Eau De Parfum",
    "price": 90,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_6aa7eaae-bcbe-487e-9be0-0aea3cc91b93.jpg?v=1776230721"
  },
  {
    "id": 8276541243591,
    "name": "RASAYEL SHAGAF",
    "col": "Eau De Parfum",
    "price": 90,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_ab0ed6b5-ec07-4047-93e1-f6fa159c44df.jpg?v=1776230769"
  },
  {
    "id": 8275957448903,
    "name": "SAQR AL BADIYA",
    "col": "Extrait De Parfum",
    "price": 140,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_c731ae61-af1b-42d1-b131-10ec842e6fa2.jpg?v=1783947616"
  },
  {
    "id": 8263132709063,
    "name": "CAFFE LATTE",
    "col": "Extrait De Parfum",
    "price": 100,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cafe_Latte_03.jpg?v=1783947469"
  },
  {
    "id": 8259368353991,
    "name": "ANABIA BLUE",
    "col": "Perfume Oils",
    "price": 32,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_0fda46e3-b76b-4eeb-86d0-70981ce7cb19.jpg?v=1732252986"
  },
  {
    "id": 8237332136135,
    "name": "MUSK POUR AMBER",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_34.jpg?v=1783947834"
  },
  {
    "id": 8210140102855,
    "name": "OUD & MUSK",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_60f1207b-0529-4e44-903b-5b75f67b8184.jpg?v=1725714648"
  },
  {
    "id": 8225224294599,
    "name": "FURSAN BROWN",
    "col": "Eau De Parfum",
    "price": 95,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_651eba7e-7275-416f-b294-45ea01b0149a.jpg?v=1783947945"
  },
  {
    "id": 8221158047943,
    "name": "FURSAN WHITE",
    "col": "Eau De Parfum",
    "price": 90,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_e7287acf-841a-4e28-a898-549b1e89d2a2.jpg?v=1783948020"
  },
  {
    "id": 8220687958215,
    "name": "MUSK COUTURE",
    "col": "Eau De Parfum",
    "price": 118,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_cbe4f164-57ee-4f48-9832-89e3371dbc54.jpg?v=1784369644"
  },
  {
    "id": 8210117427399,
    "name": "SARA",
    "col": "Extrait De Parfum",
    "price": 90,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_34647ca0-413e-49af-a7d4-042b6d78a207.jpg?v=1783948104"
  },
  {
    "id": 8207565914311,
    "name": "GHADEER GOLD",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_24.jpg?v=1784368680"
  },
  {
    "id": 8207561621703,
    "name": "GHADEER SILVER",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_20.jpg?v=1784368631"
  },
  {
    "id": 8207557296327,
    "name": "MUSK AL SABAH",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_19.jpg?v=1784368941"
  },
  {
    "id": 8206430208199,
    "name": "OUD AL SABAH",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_21.jpg?v=1784368894"
  },
  {
    "id": 8203303518407,
    "name": "PURE MUSK",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURE_MUSK_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965788.jpg?v=1784382776"
  },
  {
    "id": 8203204690119,
    "name": "JOHAYNA GREEN",
    "col": "Perfume Oils",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_19.jpg?v=1724745977"
  },

  {
    "id": 8143006892231,
    "name": "PURE MUSK PURE BLEND",
    "col": "Master Perfumery",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965450.jpg?v=1783948198"
  },
  {
    "id": 8138178920647,
    "name": "KAYAAN SILVER",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_SILVER_20_ML_-_Khadlaj_Perfumes-1964884.png?v=1722410054"
  },
  {
    "id": 8137730195655,
    "name": "LA FEDE MAGNUM EXTREME BLUE",
    "col": "Lafede",
    "price": 125,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_EXTREME_BLUE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965091.png?v=1722410514"
  },
  {
    "id": 8137648177351,
    "name": "LA FEDE MAGNUM WILD GREEN",
    "col": "Lafede",
    "price": 95,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_WILD_GREEN_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965148.png?v=1722410593"
  },
  {
    "id": 8137641164999,
    "name": "LA FEDE OPERA ROSE L'OR",
    "col": "Lafede",
    "price": 125,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_OPERA_ROSE_L_OR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965196.png?v=1722410696"
  },
  {
    "id": 8137639690439,
    "name": "LA FEDE OPERA NOIR L'OR",
    "col": "Lafede",
    "price": 125,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_OPERA_NOIR_L_OR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965173.png?v=1722410643"
  },
  {
    "id": 8137137815751,
    "name": "LA FEDE LAVISH BLUSH",
    "col": "Lafede",
    "price": 50,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_BLUSH_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965043.png?v=1722410357"
  },
  {
    "id": 8137115205831,
    "name": "LA FEDE LAVISH ROUGE",
    "col": "Lafede",
    "price": 50,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_ROUGE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965067.png?v=1722410410"
  },
  {
    "id": 8137080733895,
    "name": "LA FEDE LAVISH LUNA",
    "col": "Lafede",
    "price": 38,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_LUNA_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965055.png?v=1722410385"
  },
  {
    "id": 8092526411975,
    "name": "FRASH HAREEM AL SULTAN AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_HAREEM_AL_SULTAN_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964518.jpg?v=1722409478"
  },
  {
    "id": 8092502786247,
    "name": "OUD MUATTAR MAAMUL HANEEN",
    "col": "Bakhoor",
    "price": 21,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_HANEEN_48_G_-_Khadlaj_Perfumes-1965670.jpg?v=1722411593"
  },
  {
    "id": 8092416835783,
    "name": "OUD MUATTAR MAAMUL WARDI",
    "col": "Bakhoor",
    "price": 21,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_WARDI_48_G_-_Khadlaj_Perfumes-1965681.jpg?v=1722411615"
  },
  {
    "id": 8092413296839,
    "name": "OUD MUATTAR MAAMUL DAHABI",
    "col": "Bakhoor",
    "price": 21,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_DAHABI_48_G_-_Khadlaj_Perfumes-1965659.jpg?v=1722411572"
  },
  {
    "id": 8069288493255,
    "name": "LA FEDE CRYSTALLIA PRIMASO",
    "col": "Lafede",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_CRYSTALLIA_PRIMASO_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965006.jpg?v=1776230465"
  },
  {
    "id": 8069037031623,
    "name": "LA FEDE CRYSTALLIA IMPERIO",
    "col": "Lafede",
    "price": 130,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_CRYSTALLIA_IMPERIO_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964995.jpg?v=1776230499"
  },
  {
    "id": 8068803788999,
    "name": "FRASH AFTER ECSTACY AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_ASTER_ECSTACY_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964483.jpg?v=1722409420"
  },
  {
    "id": 8036476453063,
    "name": "FRASH QISSA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_QISSA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964615.jpg?v=1722409613"
  },
  {
    "id": 8034253078727,
    "name": "KAYAAN GOLD",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_GOLD_20_ML_-_Khadlaj_Perfumes-1964865.jpg?v=1722410025"
  },
  {
    "id": 7932349415623,
    "name": "LE PRESTIGE BOLD",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_BOLD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965224.jpg?v=1783948762"
  },
  {
    "id": 7880529510599,
    "name": "LE PRESTIGE EMPRESS",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_EMPRESS_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965241.jpg?v=1783948693"
  },
  {
    "id": 7871133450439,
    "name": "L\u00c9 PRESTIGE KING",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_KING_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965257.jpg?v=1783948286"
  },
  {
    "id": 7887419048135,
    "name": "L\u00c9 PRESTIGE ROYAL",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_ROYAL_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965268.jpg?v=1783948597"
  },
  {
    "id": 7923502710983,
    "name": "FRASH AL MAJALIS AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_AL_MAJALIS_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964465.jpg"
  },
  {
    "id": 7923498844359,
    "name": "FRASH SHAMOOKH AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_SHAMOOKH_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964639.jpg"
  },
  {
    "id": 7887478096071,
    "name": "MALIKA GREEN",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_GREEN_20_ML_-_Khadlaj_Perfumes-1965384.jpg?v=1722411061"
  },
  {
    "id": 7880505491655,
    "name": "25 LOYALTY",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_LOYALTY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964940.jpg?v=1783949037"
  },
  {
    "id": 7880500805831,
    "name": "25 TRUST",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_TRUST_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964947.jpg?v=1783948967"
  },
  {
    "id": 7887475310791,
    "name": "MALIKA RED",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_RED_20_ML_-_Khadlaj_Perfumes-1965402.jpg?v=1722411093"
  },
  {
    "id": 7887470559431,
    "name": "PINK MUSK",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PINK_MUSK_20_ML_-_Khadlaj_Perfumes-1965776.jpg?v=1722411810"
  },
  {
    "id": 7887473180871,
    "name": "PURPLE MUSK",
    "col": "Perfume Oils",
    "price": 100,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURPLE_MUSK_20_ML_-_Khadlaj_Perfumes-1965796.jpg?v=1722411845"
  },
  {
    "id": 7887397486791,
    "name": "LA FEDE MAGNUM GOLD EDITION",
    "col": "Lafede",
    "price": 125,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_GOLD_EDITION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965117.jpg?v=1722410535"
  },
  {
    "id": 7880493433031,
    "name": "25 EXPERIENCE",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_EXPERIENCE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964897.jpg?v=1783948901"
  },
  {
    "id": 7880390279367,
    "name": "25 HERITAGE",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_HERITAGE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964913.jpg?v=1783949209"
  },
  {
    "id": 7880382480583,
    "name": "25 INTEGRITY",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_INTEGRITY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964925.jpg?v=1783949116"
  },
  {
    "id": 7871045894343,
    "name": "LA FEDE MAGNUM SILVER EDITION",
    "col": "Lafede",
    "price": 125,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_SILVER_EDITION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965133.jpg?v=1722410566"
  },
  {
    "id": 7880367505607,
    "name": "VALOR ENIGMA",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_ENIGMA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966082.jpg?v=1783950074"
  },
  {
    "id": 7880365375687,
    "name": "VALOR MYSTIQUE",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_MYSTIQUE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966123.jpg?v=1783949881"
  },
  {
    "id": 7880362098887,
    "name": "VALOR HONOR",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_HONOR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966101.jpg?v=1783949927"
  },
  {
    "id": 7880359706823,
    "name": "VALOR CHIVALRY",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_CHIVALRY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966062.jpg?v=1783949953"
  },
  {
    "id": 7874350219463,
    "name": "EMPIRE REGENT",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_REGENT_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964376.jpg?v=1783950440"
  },
  {
    "id": 7872604143815,
    "name": "EMPIRE CROWN",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_CROWN_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964329.jpg?v=1783950456"
  },
  {
    "id": 7872603291847,
    "name": "EMPIRE EMPRESS",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_EMPRESS_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964353.jpg?v=1783950517"
  },
  {
    "id": 7872601030855,
    "name": "EMPIRE VICTOR",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_VICTOR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964409.jpg?v=1783950572"
  },
  {
    "id": 7858357534919,
    "name": "KARUS AMBER GOLD",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_AMBER_GOLD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964823.jpg?v=1783949629"
  },
  {
    "id": 7554157838535,
    "name": "KARUS GOLD ABSOLU",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/products/karus-gold-absolu.png?v=2"
  },
  {
    "id": 7858340659399,
    "name": "KARUS SECRET MUSK",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_SECRET_MUSK_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964854.jpg?v=1783949701"
  },
  {
    "id": 7858332958919,
    "name": "KARUS BLU SPICE",
    "col": "Eau De Parfum",
    "price": 150,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_BLU_SPICE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964834.jpg?v=1783949739"
  },
  {
    "id": 7852696993991,
    "name": "BAKHOOR QUTOOF 55 GM",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_QUTOOF_55_GM_-_Khadlaj_Perfumes-1964149.jpg?v=1722408918"
  },
  {
    "id": 7838835802311,
    "name": "HAREEM AL SULTAN",
    "col": "Eau De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/HAREEM_AL_SULTAN_Bottle.jpg?v=1783946128"
  },
  {
    "id": 7792441295047,
    "name": "RIMAAL GREEN",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/RIMAAL_GREEN_15_ML_-_Khadlaj_Perfumes-1965844.jpg?v=1776231685"
  },
  {
    "id": 7792438214855,
    "name": "RIMAAL BROWN",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "/assets/images/smart_cropped/smart_RIMAAL_BROWN_15_ML_-_Khadlaj_Perfumes-1965826.jpg"
  },
  {
    "id": 7792432414919,
    "name": "WOW OUD",
    "col": "Eau De Parfum",
    "price": 75,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_WOW_OUD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966157.jpg"
  },
  {
    "id": 7792427696327,
    "name": "GAITH",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_GAITH_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964668.jpg"
  },
  {
    "id": 7792426582215,
    "name": "NUHA",
    "col": "Eau De Parfum",
    "price": 85,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965514.jpg?v=1784382712"
  },
  {
    "id": 7752183611591,
    "name": "THE PROPOSAL SPECIAL OCCASION",
    "col": "Eau De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/THE_PROPOSAL_SPECIAL_OCCASION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966015.jpg?v=1783948477"
  },
  {
    "id": 7752172765383,
    "name": "THE PROPOSAL DATE NIGHT",
    "col": "Eau De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/THE_PROPOSAL_DATE_NIGHT_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966002.jpg?v=1783948404"
  },
  {
    "id": 7734805659847,
    "name": "MAISON EPOQUE ARTISTIQUE",
    "col": "Eau De Parfum",
    "price": 158,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_EPOQUE_ARTISTIQUE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965317.jpg?v=1783950732"
  },
  {
    "id": 7734795632839,
    "name": "MAISON L' OR NOIR",
    "col": "Eau De Parfum",
    "price": 158,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_L_OR_NOIR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965370.jpg?v=1783950815"
  },
  {
    "id": 7734460022983,
    "name": "MAISON FLOR OUD",
    "col": "Eau De Parfum",
    "price": 158,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_FLOR_OUD_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965335.jpg?v=1783950845"
  },
  {
    "id": 7734459498695,
    "name": "MAISON CREATION DE REVE",
    "col": "Eau De Parfum",
    "price": 158,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_CREATION_DE_REVE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965299.jpg?v=1783950976"
  },
  {
    "id": 7726385529031,
    "name": "INFINI ABSOLUTE",
    "col": "Eau De Parfum",
    "price": 137,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/INFINI_ABSOLUTE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1964798.jpg?v=1784011705"
  },
  {
    "id": 7582155407559,
    "name": "HAREEM AL SULTAN SILVER",
    "col": "Perfume Oils",
    "price": 75,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_HAREEM_AL_SULTAN_SILVER_35ML_-_Khadlaj_Perfumes-1964773.jpg"
  },
  {
    "id": 7582151672007,
    "name": "HAREEM AL SULTAN GOLD",
    "col": "Perfume Oils",
    "price": 75,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_HAREEM_AL_SULTAN_GOLD_35ML_-_Khadlaj_Perfumes-1964749.jpg"
  },
  {
    "id": 7721533669575,
    "name": "MUKHALATH MA'A WARD TAIBA",
    "col": "Perfume Oils",
    "price": 280,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Perfume oil"
    ],
    "img": "/assets/images/smart_cropped/smart_MUKHALATH_MA_A_WARD_TAIBA_12_ML_-_Khadlaj_Perfumes-1965432.jpg"
  },
  {
    "id": 7716614078663,
    "name": "MAGNATE NOBLE",
    "col": "Eau De Parfum",
    "price": 60,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAGNATE_NOBLE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965285.jpg?v=1784369081"
  },
  {
    "id": 7716611293383,
    "name": "MAGNATE PREMIER",
    "col": "Eau De Parfum",
    "price": 60,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAGNATE_PREMIER_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965293.jpg?v=1784369126"
  },
  {
    "id": 7554205352135,
    "name": "ROSE COUTURE",
    "col": "Eau De Parfum",
    "price": 118,
    "size": "100 ml",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ROSE_COUTURE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965899.jpg?v=1784369711"
  },
  {
    "id": 7677458972871,
    "name": "OUD MUATTAR OUD AL MAQAAM",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_OUD_AL_MAQAAM_40_G_-_Khadlaj_Perfumes-1965702.jpg"
  },
  {
    "id": 7677438492871,
    "name": "OUD MUATTAR OUD AL SAADA",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_OUD_AL_SAADA_40_G_-_Khadlaj_Perfumes-1965708.jpg"
  },
  {
    "id": 7676794765511,
    "name": "LA FEDE BELLE REVE SEGRATO VIOLA",
    "col": "Lafede",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_BELLE_REVE_SEGRATO_VIOLA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964990.jpg?v=1722410259"
  },
  {
    "id": 7676794339527,
    "name": "LA FEDE BELLA REVE DOLCE FLORE",
    "col": "Lafede",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_BELLA_REVE_DOLCE_FLORE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964984.jpg?v=1722410248"
  },
  {
    "id": 7651533717703,
    "name": "MYSTICAL INDIAN OUD PURE",
    "col": "Eau De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_MYSTICAL_INDIAN-2.jpg"
  },
  {
    "id": 7651506225351,
    "name": "HANEEN ROSE GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_HANEEN_ROSE_GOLD_20_ML_-_Khadlaj_Perfumes-1964702.jpg"
  },
  {
    "id": 7651482337479,
    "name": "HANEEN GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_HANEEN_GOLD_20_ML_-_Khadlaj_Perfumes-1964693.jpg"
  },
  {
    "id": 7640196841671,
    "name": "LA FEDE INTOXICATE",
    "col": "Lafede",
    "price": 145,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_INTOXICATE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965026.jpg?v=1722410324"
  },
  {
    "id": 7640152965319,
    "name": "BUKHOOR AL BAHAAR GOLD",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BUKHOOR_AL_BAHAAR_GOLD_55_G_-_Khadlaj_Perfumes-1964226.jpg?v=1722409036"
  },
  {
    "id": 7639215079623,
    "name": "Mesmerizing Perfume Oil Set of 3 for Him & Her",
    "col": "Perfume Oils",
    "price": 69,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Mesmerizing_Perfume_Oil_Set_of_3_for_Him_Her_-_Khadlaj_Perfumes-1965424.jpg?v=1722411133"
  },
  {
    "id": 7638902571207,
    "name": "Amazing Perfume Oil Set of 4 for Him",
    "col": "Perfume Oils",
    "price": 89,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Amazing_Perfume_Oil_Set_of_4_for_Him_-_Khadlaj_Perfumes-1963945.jpg?v=1722408612"
  },
  {
    "id": 7638901752007,
    "name": "Enchant all with our Perfume Oil Set of 4 for Her",
    "col": "Perfume Oils",
    "price": 92,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Enchant_all_with_our_Perfume_Oil_Set_of_4_for_Her_-_Khadlaj_Perfumes-1964431.jpg?v=1722409351"
  },
  {
    "id": 7638899622087,
    "name": "Exquisite Perfume Oil Set for Him and Her",
    "col": "Perfume Oils",
    "price": 69,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Exquisite_Perfume_Oil_Set_for_Him_and_Her_-_Khadlaj_Perfumes-1964439.jpg?v=1722409361"
  },
  {
    "id": 7638896869575,
    "name": "Finest Perfume Oil Set for Him",
    "col": "Perfume Oils",
    "price": 69,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Finest_Perfume_Oil_Set_for_Him_-_Khadlaj_Perfumes-1964454.jpg?v=1722409380"
  },
  {
    "id": 7638896181447,
    "name": "Luxurious Perfume Oil Set of 3 for Him",
    "col": "Perfume Oils",
    "price": 61,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Deals"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Luxurious_Perfume_Oil_Set_of_3_for_Him_-_Khadlaj_Perfumes-1965279.jpg?v=1722410854"
  },
  {
    "id": 7627660591303,
    "name": "OUD MUATTAR GHANAATI",
    "col": "Bakhoor",
    "price": 65,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_GHANAATI_100_G_-_Khadlaj_Perfumes-1965632.jpg"
  },
  {
    "id": 7627659509959,
    "name": "OUD MUATTAR KHAWAATER",
    "col": "Bakhoor",
    "price": 35,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_KHAWAATER_35_G_-_Khadlaj_Perfumes-1965650.jpg"
  },
  {
    "id": 7602862031047,
    "name": "STELLAR OUD",
    "col": "Eau De Parfum",
    "price": 80,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_STELLAR_OUD_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1965984.jpg"
  },
  {
    "id": 7602860949703,
    "name": "STELLAR MUSK",
    "col": "Eau De Parfum",
    "price": 80,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Her",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_STELLAR_MUSK_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1965978.jpg"
  },
  {
    "id": 7598654980295,
    "name": "CASHMERE SUNSHINE MUSK",
    "col": "Eau De Parfum",
    "price": 140,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CASHMERE_SUNSHINE_MUSK_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1964238.jpg?v=1784011864"
  },
  {
    "id": 7598653505735,
    "name": "CASHMERE WARM OUD",
    "col": "Eau De Parfum",
    "price": 140,
    "size": "100ml EDP",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CASHMERE_WARM_OUD_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1964248.jpg?v=1784011805"
  },
  {
    "id": 7598644396231,
    "name": "LA FEDE AURA KISS OF ROSE",
    "col": "Lafede",
    "price": 70,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_KISS_OF_ROSE_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1964975.jpg?v=1722410230"
  },
  {
    "id": 7598637777095,
    "name": "LA FEDE AURA CRISP FLOWER",
    "col": "Lafede",
    "price": 70,
    "size": "100ml EDP",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_CRISP_FLOWER_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1964964.jpg?v=1722410213"
  },
  {
    "id": 7582427381959,
    "name": "MIBRAAK",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_MIBRAAK_18ML_-_Khadlaj_Perfumes-1965427.jpg"
  },
  {
    "id": 7582424268999,
    "name": "IBHAAR",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_IBHAAR_18ML_-_Khadlaj_Perfumes-1964788.jpg"
  },
  {
    "id": 7582421254343,
    "name": "ASTOORA",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ASTOORA_18ML_-_Khadlaj_Perfumes-1963955.jpg"
  },
  {
    "id": 7582413947079,
    "name": "FATIMA",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_FATIMA_15ML_-_Khadlaj_Perfumes-1964446.jpg"
  },
  {
    "id": 7582409949383,
    "name": "ANAB",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ANAB_18ML_-_Khadlaj_Perfumes-1963948.jpg"
  },
  {
    "id": 7582406574279,
    "name": "AZAARI",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_AZAARI_17ML_-_Khadlaj_Perfumes-1963961.jpg"
  },
  {
    "id": 7582193680583,
    "name": "GHAZLAAN",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_GHAZLAAN_20ML_-_Khadlaj_Perfumes-1964689.jpg"
  },
  {
    "id": 7582193057991,
    "name": "RANIYA",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_RANIYA_18ML_-_Khadlaj_Perfumes-1965818.jpg"
  },
  {
    "id": 7582192304327,
    "name": "AALIYA",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_AALIYA_27ML_-_Khadlaj_Perfumes-1963911.jpg"
  },
  {
    "id": 7582186242247,
    "name": "ROOHI WA ROOHAK SILVER",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ROOHI_WA_ROOHAK_SILVER_20_ML_-_Khadlaj_Perfumes-1965884.jpg"
  },
  {
    "id": 7582185095367,
    "name": "ROOHI WA ROOHAK GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ROOHI_WA_ROOHAK_GOLD_20_ML_-_Khadlaj_Perfumes-1965877.jpg"
  },
  {
    "id": 7582182899911,
    "name": "ALF WARDAAT",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ALF_WARDAAT_30ML_-_Khadlaj_Perfumes-1963933.jpg"
  },
  {
    "id": 7582179262663,
    "name": "AL FURSAN",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_AL_FURSAN_18ML_-_Khadlaj_Perfumes-1963918.jpg"
  },
  {
    "id": 7582167105735,
    "name": "AL RIYAN",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_AL_RIYAN_17ML_-_Khadlaj_Perfumes-1963926.jpg"
  },
  {
    "id": 7582158979271,
    "name": "JAMEEL",
    "col": "Perfume Oils",
    "price": 50,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_JAMEEL_25ML_-_Khadlaj_Perfumes-1964811.jpg"
  },
  {
    "id": 7582143119559,
    "name": "ZAINAB",
    "col": "Perfume Oils",
    "price": 45,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ZAINAB_18_ML_-_Khadlaj_Perfumes-1966171.jpg"
  },
  {
    "id": 7582139089095,
    "name": "ROOH AL OUD",
    "col": "Dehn Al Oudh",
    "price": 525,
    "size": "100ml EDP",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_ROOH_AL_OUD_12_ML_-_Khadlaj_Perfumes-1965864.jpg"
  },
  {
    "id": 7554129625287,
    "name": "FRASH DALOUAA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_DALOUAA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964497.jpg"
  },
  {
    "id": 7554137391303,
    "name": "FRASH ZAHOOR AL KHALEEJ AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_ZAHOOR_AL_KHALEEJ_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964652.jpg"
  },
  {
    "id": 7554137456839,
    "name": "FRASH ROMANCIA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_ROMANCIA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964632.jpg"
  },
  {
    "id": 7554137555143,
    "name": "FRASH MAKHMALI AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_MAKHMALI_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964589.jpg"
  },
  {
    "id": 7554137522375,
    "name": "FRASH MUSKY AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_MUSKY_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964602.jpg"
  },
  {
    "id": 7554137489607,
    "name": "FRASH NASEEM AL WARD AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_NASEEM_AL_WARD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964609.jpg"
  },
  {
    "id": 7554137915591,
    "name": "BARWAAZ SOLID GREY",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BARWAAZ_SOLID_GREY_EDP_SPRAY_100ML_-_Khadlaj_Perfumes-1964221.jpg?v=1784369469"
  },
  {
    "id": 7554137653447,
    "name": "FRASH LA YUQAWAM AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 38,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_LA_YUQAWAM_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964537.jpg"
  },
  {
    "id": 7554138505415,
    "name": "OUD MUATTAR GHALIYA",
    "col": "Bakhoor",
    "price": 35,
    "size": "35 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_GHALIYA_35_G_-_Khadlaj_Perfumes-1965626.jpg"
  },
  {
    "id": 7554138439879,
    "name": "OUD MUATTAR MUNAWWARA",
    "col": "Bakhoor",
    "price": 35,
    "size": "35 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_MUNAWWARA_35_G_-_Khadlaj_Perfumes-1965696.jpg"
  },
  {
    "id": 7554137981127,
    "name": "BARWAAZ SADDLE BROWN",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BARWAAZ_SADDLE_BROWN_EDP_100_ML_-_Khadlaj_Perfumes-1964210.jpg?v=1784369421"
  },
  {
    "id": 7554143355079,
    "name": "SHAMOOKH SILVER",
    "col": "Perfume Oils",
    "price": 50,
    "size": "20 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_SHAMOOKH_SILVER_20ML_-_Khadlaj_Perfumes-1965933.jpg"
  },
  {
    "id": 7554143092935,
    "name": "FRASH MUKHALLAT SHUYOOKHI AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "/assets/images/smart_cropped/smart_FRASH_MUKHALLAT_SHUYOOKHI_AIR_FRESHENER_320_ML_-_Khadlaj_Perfumes-1964596.jpg"
  },
  {
    "id": 7554138865863,
    "name": "BAKHOOR HANEEN 100 GMS",
    "col": "Bakhoor",
    "price": 53,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_BAKHOOR_HANEEN_100_GMS_-_Khadlaj_Perfumes-1964075.jpg"
  },
  {
    "id": 7554138767559,
    "name": "BAKHOOR MAHA 100 GMS",
    "col": "Bakhoor",
    "price": 53,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_BAKHOOR_MAHA_100_GMS_-_Khadlaj_Perfumes-1964119.jpg"
  },
  {
    "id": 7554143748295,
    "name": "MUSK WA OUD",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_WA_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965483.jpg?v=1771046715"
  },
  {
    "id": 7554143715527,
    "name": "MUSK WA WARD",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_MUSK_WA_WARD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965487.jpg"
  },
  {
    "id": 7554143518919,
    "name": "UNO INTIMO",
    "col": "Eau De Parfum",
    "price": 45,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966033.jpg"
  },
  {
    "id": 7554144043207,
    "name": "OUD MUATTAR RIMAAL 40GM",
    "col": "Bakhoor",
    "price": 37,
    "size": "40 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_RIMAAL_40GM_-_Khadlaj_Perfumes-1965721.jpg"
  },
  {
    "id": 7554144010439,
    "name": "OUD MUATTAR SAMOU AL OUD 40GM",
    "col": "Bakhoor",
    "price": 37,
    "size": "40 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_SAMOU_AL_OUD_40GM_-_Khadlaj_Perfumes-1965730.jpg"
  },
  {
    "id": 7554143813831,
    "name": "MUSK RASAAS",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_RASAAS_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965459.jpg?v=1722411198"
  },
  {
    "id": 7554204664007,
    "name": "FRASH MAHASIN KHAWATER AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_KHAWATER_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964565.jpg?v=1722409542"
  },
  {
    "id": 7554204631239,
    "name": "FRASH MAHASIN OUD AL AHBAB AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_OUD_AL_AHBAB_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964571.jpg?v=1722409552"
  },
  {
    "id": 7554204532935,
    "name": "FRASH MAHASIN SILVER AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_SILVER_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964579.jpg?v=1722409561"
  },
  {
    "id": 7554204500167,
    "name": "FRASH ZAHRET AL LAILAK AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_ZAHRET_AL_LAILAK_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964660.jpg?v=1722409681"
  },
  {
    "id": 7554204860615,
    "name": "FRASH MAHASIN ABAYA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_ABAYA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964545.jpg?v=1722409511"
  },
  {
    "id": 7554204827847,
    "name": "FRASH MAHASIN AL RIYAN AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_AL_RIYAN_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964551.jpg?v=1722409524"
  },
  {
    "id": 7554204729543,
    "name": "FRASH MAHASIN GOLD AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_GOLD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964559.jpg?v=1722409533"
  },
  {
    "id": 7554204991687,
    "name": "FRASH AL ABYAD AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_AL_ABYAD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964458.jpg?v=1722409385"
  },
  {
    "id": 7554204958919,
    "name": "FRASH BINT AKABIR AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_BINT_AKABIR_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964490.jpg?v=1722409430"
  },
  {
    "id": 7554204926151,
    "name": "FRASH FARFASHA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_FARFASHA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964503.jpg?v=1722409449"
  },
  {
    "id": 7554204893383,
    "name": "FRASH KASAR AL SAADA AIR FRESHENER",
    "col": "Eau De Parfum",
    "price": 37,
    "size": "320 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Air freshner"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_KASAR_AL_SAADA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964530.jpg?v=1722409492"
  },
  {
    "id": 7554205122759,
    "name": "SHAMOOKH GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "20 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAMOOKH_GOLD_20ML_-_Khadlaj_Perfumes-1965928.jpg?v=1722412114"
  },
  {
    "id": 7554205089991,
    "name": "MAZOON GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "18 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAZOON_GOLD_18ML_-_Khadlaj_Perfumes-1965412.jpg?v=1722411115"
  },
  {
    "id": 7554205057223,
    "name": "MAZOON ROSE GOLD",
    "col": "Perfume Oils",
    "price": 50,
    "size": "18 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAZOON_ROSE_GOLD_18_ML_-_Khadlaj_Perfumes-1965418.jpg?v=1722411124"
  },
  {
    "id": 7554205319367,
    "name": "UNO DURABLE",
    "col": "Eau De Parfum",
    "price": 55,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_DURABLE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966025.jpg?v=1722412307"
  },
  {
    "id": 7554205253831,
    "name": "UNO LUSSO",
    "col": "Eau De Parfum",
    "price": 42,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_LUSSO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966042.jpg?v=1722412344"
  },
  {
    "id": 7554205221063,
    "name": "UNO SENSUALE",
    "col": "Eau De Parfum",
    "price": 55,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_SENSUALE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966051.jpg?v=1722412362"
  },
  {
    "id": 7554205155527,
    "name": "SHAHI OUD",
    "col": "Eau De Parfum",
    "price": 35,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1784369275"
  },
  {
    "id": 7554205515975,
    "name": "MUSK SAHRA",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_SAHRA_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965475.jpg?v=1771046641"
  },
  {
    "id": 7554205384903,
    "name": "ROSE AND ROMANCE",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ROSE_AND_ROMANCE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965893.jpg?v=1784382622"
  },
  
  
  
  
  {
    "id": 7554206204103,
    "name": "BAKHOOR TAIBA",
    "col": "Bakhoor",
    "price": 32,
    "size": "58 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_TAIBA_58_G_-_Khadlaj_Perfumes-1964187.jpg?v=1722408978"
  },
  {
    "id": 7554206105799,
    "name": "OUD MUATTAR AL AZRAQ 40GM",
    "col": "Bakhoor",
    "price": 35,
    "size": "40 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_AL_AZRAQ_40GM_-_Khadlaj_Perfumes-1965615.jpg?v=1722411495"
  },
  {
    "id": 7554206040263,
    "name": "OUD MUATTAR BADAR",
    "col": "Bakhoor",
    "price": 21,
    "size": "30 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_BADAR_30_G_-_Khadlaj_Perfumes-1965621.jpg?v=1722411506"
  },
  {
    "id": 7554206007495,
    "name": "OUD MUATTAR MAJNOON",
    "col": "Bakhoor",
    "price": 27,
    "size": "50 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAJNOON_50_G_-_Khadlaj_Perfumes-1965690.jpg?v=1722411633"
  },
  {
    "id": 7554206367943,
    "name": "BAKHOOR BAIT AL ATHEEQ",
    "col": "Bakhoor",
    "price": 21,
    "size": "65 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_ATHEEQ_65_G_-_Khadlaj_Perfumes-1964016.jpg?v=1722408721"
  },
  {
    "id": 7554206302407,
    "name": "BAKHOOR BAIT AL ISRA",
    "col": "Bakhoor",
    "price": 21,
    "size": "65 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_ISRA_65_G_-_Khadlaj_Perfumes-1964025.jpg?v=1722408731"
  },
  {
    "id": 7554206236871,
    "name": "BAKHOOR MARAH",
    "col": "Bakhoor",
    "price": 21,
    "size": "55 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_MARAH_55_G_-_Khadlaj_Perfumes-1964126.jpg?v=1722408886"
  },
  {
    "id": 7554206499015,
    "name": "BAKHOOR TAHIYA",
    "col": "Bakhoor",
    "price": 21,
    "size": "60 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_TAHIYA_60_G_-_Khadlaj_Perfumes-1964178.jpg?v=1722408964"
  },
  {
    "id": 7554206466247,
    "name": "BAKHOOR ASDAAF",
    "col": "Bakhoor",
    "price": 21,
    "size": "70 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_ASDAAF_70_G_-_Khadlaj_Perfumes-1963989.jpg?v=1722408676"
  },
  {
    "id": 7554206400711,
    "name": "BAKHOOR ATEEB",
    "col": "Bakhoor",
    "price": 21,
    "size": "70 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_ATEEB_70_G_-_Khadlaj_Perfumes-1963996.jpg?v=1722408685"
  },
  {
    "id": 7554206630087,
    "name": "BAKHOOR MUDHELA",
    "col": "Bakhoor",
    "price": 21,
    "size": "60 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_MUDHELA_60_G_-_Khadlaj_Perfumes-1964134.jpg?v=1722408897"
  },
  {
    "id": 7554206597319,
    "name": "BAKHOOR NOUF 100 GMS",
    "col": "Bakhoor",
    "price": 53,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_NOUF_100_GMS_-_Khadlaj_Perfumes-1964141.jpg?v=1722408908"
  },
  {
    "id": 7554206564551,
    "name": "BAKHOOR RUKAIYA 55GM",
    "col": "Bakhoor",
    "price": 27,
    "size": "55 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_RUKAIYA_55GM_-_Khadlaj_Perfumes-1964162.jpg?v=1722408938"
  },
  {
    "id": 7554206531783,
    "name": "BAKHOOR SOUGAH",
    "col": "Bakhoor",
    "price": 32,
    "size": "55 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_SOUGAH_55_G_-_Khadlaj_Perfumes-1964170.jpg?v=1722408952"
  },
  {
    "id": 7554206793927,
    "name": "BAKHOOR HOOR AL AIN 72GM",
    "col": "Bakhoor",
    "price": 27,
    "size": "72 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_HOOR_AL_AIN_72GM_-_Khadlaj_Perfumes-1964082.jpg?v=1722408821"
  },
  {
    "id": 7554206695623,
    "name": "BAKHOOR INSHERAH 55GM",
    "col": "Bakhoor",
    "price": 35,
    "size": "55 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_INSHERAH_55GM_-_Khadlaj_Perfumes-1964091.jpg?v=1722408837"
  },
  {
    "id": 7554206662855,
    "name": "BAKHOOR KHULOOD",
    "col": "Bakhoor",
    "price": 27,
    "size": "72 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_KHULOOD_72_G_-_Khadlaj_Perfumes-1964112.jpg?v=1722408867"
  },
  {
    "id": 7554206892231,
    "name": "BAKHOOR BAIT AL AHLAM",
    "col": "Bakhoor",
    "price": 21,
    "size": "45 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_AHLAM_45_G_-_Khadlaj_Perfumes-1964003.jpg?v=1722408697"
  },
  {
    "id": 7554120188103,
    "name": "BAKHOOR AMAAR 100 GMS",
    "col": "Bakhoor",
    "price": 53,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_AMAAR_100_GMS_-_Khadlaj_Perfumes-1963980.jpg?v=1722408666"
  },
  {
    "id": 7554206957767,
    "name": "BAKHOOR AL BAHAAR",
    "col": "Bakhoor",
    "price": 35,
    "size": "55 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_AL_BAHAAR_55_G_-_Khadlaj_Perfumes-1963970.jpg?v=1722408647"
  },
  {
    "id": 7554206859463,
    "name": "BAKHOOR GANAA 120GM",
    "col": "Bakhoor",
    "price": 90,
    "size": "120 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_GANAA_120GM_-_Khadlaj_Perfumes-1964063.jpg?v=1722408787"
  },
  {
    "id": 7554206826695,
    "name": "BAKHOOR HAKIM 100gm",
    "col": "Bakhoor",
    "price": 74,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_HAKIM_100gm_-_Khadlaj_Perfumes-1964067.jpg?v=1722408798"
  },
  {
    "id": 7554206269639,
    "name": "BAKHOOR BU KHALIFA",
    "col": "Bakhoor",
    "price": 90,
    "size": "120 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BU_KHALIFA_120_G_-_Khadlaj_Perfumes-1964039.jpg?v=1722408751"
  },
  {
    "id": 7554206171335,
    "name": "BAKHOOR KASHMEERI 120GM",
    "col": "Bakhoor",
    "price": 90,
    "size": "120 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_KASHMEERI_120GM_-_Khadlaj_Perfumes-1964106.jpg?v=1722408857"
  },
  {
    "id": 7554206138567,
    "name": "OUD MUATTAR AFZAL 24GM",
    "col": "Bakhoor",
    "price": 63,
    "size": "24 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_AFZAL_24GM_-_Khadlaj_Perfumes-1965609.jpg?v=1722411485"
  },
  {
    "id": 7554205909191,
    "name": "MUSK POUR NARCIS",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "",
    "gender": "Her",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_4.jpg?v=1784007371"
  },
  {
    "id": 7554205876423,
    "name": "OUD POUR BLUEBERRY",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_5.jpg?v=1784007569"
  },
  {
    "id": 7554205843655,
    "name": "OUD POUR KLASSIK",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_POUR_KLASSIK_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965756.jpg?v=1722411765"
  },
  {
    "id": 7554205810887,
    "name": "OUD POUR NOBLE",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_6.jpg?v=1784007947"
  },
  {
    "id": 7554205778119,
    "name": "OUD POUR ROUGE",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_7.jpg?v=1784008049"
  },
  {
    "id": 7554205745351,
    "name": "OUD POUR SHAIKH",
    "col": "Eau De Parfum",
    "price": 130,
    "size": "100 ml",
    "badge": "",
    "gender": "Him",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Perfume.jpg?v=1784008336"
  },
  {
    "id": 7554205712583,
    "name": "LA FEDE FIRST LADY",
    "col": "Lafede",
    "price": 210,
    "size": "75 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_FIRST_LADY_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965018.jpg?v=1722410308"
  },
  {
    "id": 7554205679815,
    "name": "LA FEDE MISS PREMIERE",
    "col": "Lafede",
    "price": 210,
    "size": "75 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MISS_PREMIERE_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965165.jpg?v=1722410627"
  },
  {
    "id": 7554205483207,
    "name": "PURE MUSK",
    "col": "Eau De Parfum",
    "price": 50,
    "size": "100 ml",
    "badge": "Best Seller",
    "gender": "Unisex",
    "notes": [
      "Musk",
      "Floral",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURE_MUSK_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965788.jpg?v=1784382776"
  },
  {
    "id": 7554205450439,
    "name": "OMBRE NOTES",
    "col": "Eau De Parfum",
    "price": 118,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OMBRE_NOTES_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965535.jpg?v=1784368548"
  },
  {
    "id": 7554205188295,
    "name": "INFINI",
    "col": "Eau De Parfum",
    "price": 53,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/INFINI_EDP_SPRAY_100ML_-_Khadlaj_Perfumes-1964808.jpg?v=1784369227"
  },
  {
    "id": 7554143617223,
    "name": "SENSUOS NIGHT",
    "col": "Eau De Parfum",
    "price": 118,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SENSUOS_NIGHT_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965914.jpg?v=1784368457"
  },
  {
    "id": 7554138603719,
    "name": "OUD MUATTAR KHALAB 100GM",
    "col": "Bakhoor",
    "price": 60,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_KHALAB_100GM_-_Khadlaj_Perfumes-1965643.jpg?v=1722411545"
  },
  {
    "id": 7554138341575,
    "name": "OUD MUATTAR QAISER 100GM",
    "col": "Bakhoor",
    "price": 60,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_QAISER_100GM_-_Khadlaj_Perfumes-1965714.jpg?v=1722411690"
  },
  {
    "id": 7554138079431,
    "name": "OUD NOIR",
    "col": "Eau De Parfum",
    "price": 118,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_NOIR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965741.jpg?v=1784012003"
  },
  {
    "id": 7554130182343,
    "name": "CODE MARRON OUD",
    "col": "Eau De Parfum",
    "price": 210,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_MARRON_OUD_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964255.jpg?v=1722409079"
  },
  {
    "id": 7554130116807,
    "name": "CODE ROUGE AMOUR",
    "col": "Eau De Parfum",
    "price": 210,
    "size": "100 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_ROUGE_AMOUR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964262.jpg?v=1722409089"
  },
  {
    "id": 7554130051271,
    "name": "CODE VERDE SUBLIME",
    "col": "Eau De Parfum",
    "price": 210,
    "size": "100 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_VERDE_SUBLIME_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964272.jpg?v=1722409106"
  },
  {
    "id": 7554130018503,
    "name": "CODE VIOLA NECTAR",
    "col": "Eau De Parfum",
    "price": 210,
    "size": "100 ml",
    "badge": "For Her",
    "gender": "Her",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_VIOLA_NECTAR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964279.jpg?v=1722409115"
  },
  {
    "id": 7554129952967,
    "name": "LA FEDE KINGSMAN",
    "col": "Lafede",
    "price": 210,
    "size": "75 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_KINGSMAN_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965035.jpg?v=1722410340"
  },
  {
    "id": 7554129887431,
    "name": "LA FEDE STATESMAN",
    "col": "Lafede",
    "price": 210,
    "size": "75 ml",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_STATESMAN_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965207.jpg?v=1722410717"
  },
  {
    "id": 7554120155335,
    "name": "BAKHOOR BELAD ZAYED 120GM",
    "col": "Bakhoor",
    "price": 90,
    "size": "120 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BELAD_ZAYED_120GM_-_Khadlaj_Perfumes-1964033.jpg?v=1722408741"
  },
  {
    "id": 7554120089799,
    "name": "BAKHOOR DHIYAFA 120GM",
    "col": "Bakhoor",
    "price": 90,
    "size": "120 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_DHIYAFA_120GM_-_Khadlaj_Perfumes-1964046.jpg?v=1722408763"
  },
  {
    "id": 7554120057031,
    "name": "BAKHOOR DUKHOON MAKNOON",
    "col": "Bakhoor",
    "price": 74,
    "size": "100 g",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Musk",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_DUKHOON_MAKNOON_100_G_-_Khadlaj_Perfumes-1964057.jpg?v=1722408777"
  },
  {
    "id": 7554119958727,
    "name": "WILD INDONESIAN OUD PURE",
    "col": "Eau De Parfum",
    "price": 200,
    "size": "100ml EDP",
    "badge": "For Him",
    "gender": "Him",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Wild_Indonesian-04.jpg?v=1764136825"
  },
  {
    "id": 7554119925959,
    "name": "DEHNAL OUD AQDAM",
    "col": "Dehn Al Oudh",
    "price": 95,
    "size": "3 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_AQDAM_3ML_-_Khadlaj_Perfumes-1964287.jpg?v=1722409125"
  },
  {
    "id": 7554119893191,
    "name": "DEHNAL OUD AZEEM",
    "col": "Dehn Al Oudh",
    "price": 95,
    "size": "3 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_AZEEM_3ML_-_Khadlaj_Perfumes-1964293.jpg?v=1722409134"
  },
  {
    "id": 7554119860423,
    "name": "DEHNAL OUD TURAAS",
    "col": "Dehn Al Oudh",
    "price": 95,
    "size": "3 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_TURAAS_3ML_-_Khadlaj_Perfumes-1964300.jpg?v=1722409143"
  },
  {
    "id": 7554119794887,
    "name": "DEHNAL OUDH ASAL",
    "col": "Dehn Al Oudh",
    "price": 189,
    "size": "3 ml",
    "badge": "",
    "gender": "Unisex",
    "notes": [
      "Oud",
      "Woody",
      "Amber"
    ],
    "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_ASAL_3_ML_-_Khadlaj_Perfumes-1964308.jpg?v=1722409153"
  }
];




const REVIEWS = [
  { name: "Verified Buyer", country: "Online", stars: 5, text: "The perfumes are really good I went to Original testor stores, stores like afnan & Rasasi but this perfume brand blew my mind. The perfumes were really good and strong in the initial smelling. Good discounts & good perfumes.", url: "" },
  { name: "Verified Buyer", country: "Online", stars: 5, text: "Hareem al sultan the viral perfume oil is from khadlaj perfumes, they do have a great collection of exotic perfumes and oils. Most products comes in a very good package.", url: "" },
  { name: "Verified Buyer", country: "Online", stars: 5, text: "Nice perfume amezing long lasting fragrance, value of money,And very kind and supportive staff, Very nice experience with khadlaj", url: "" },
  { name: "Verified Buyer", country: "Online", stars: 5, text: "Amazing fragrances depends on mood , type , flavour and long lasting. Have purchased their all time famous klassik is much more to give to your mood while interacting with other people And done lot of repeated purchases", url: "" }
];

const COLLECTIONS_DATA = [
  { name:"Lafede", tagline:"Bold & Characterful", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819", desc:"Intensely expressive fragrances that command attention. Lafede is for those who make their presence felt before they enter the room." },
  { name:"Master Perfumery", tagline:"The Pinnacle of Craft", img:"/assets/images/products/shahi-oud_transparent.png", desc:"The finest expressions from our founder's private atelier. Rare ingredients, extraordinary sillage, and a story in every bottle." },
];

const TEAM = [
  {
    name:"Mohamed Iqbal Abdul Sattar",
    role:"Founder & Master Perfumer",
    img:"/assets/images/people/founder-mohamed-iqbal.png",
    bio:"With over 45 years of experience in perfumery, Mohamed Iqbal Abdul Sattar is the esteemed founder and master perfumer of Khadlaj Perfumes. He is recognized for creating cherished and opulent fragrances including Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. His expertise spans exquisite natural essences and meticulously crafted synthetic compounds, with a deep passion for Musk, Ruh Gulaab, oud, and vetiver.",
  },
];

const REELS = [
  {
    id: "7602275376135408918",
    title: "Hareem Al Sultan Gold Review",
    caption: "The viral sensation on #perfumetok. Does it live up to the hype?",
    tag: "Viral on TikTok",
    price: 195,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755"
  },
  {
    id: "7614741288168066334",
    title: "Panache First Impressions",
    caption: "A gorgeous creamy floral gourmand. Completely blind buy safe!",
    tag: "First Impressions",
    price: 200,
    img: "/assets/images/products/panache-cutout.png"
  },
  {
    id: "7639701570875165985",
    title: "Shiyaaka Silver - Affordable Niche?",
    caption: "This smells 10x more expensive than it is. Unbelievable quality.",
    tag: "Hidden Gem",
    price: 126,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108"
  },
  {
    id: "7608773049986469134",
    title: "Island Extrait Layering Combo",
    caption: "How I layer Khadlaj Island for a 24-hour scent bubble.",
    tag: "Layering Tip",
    price: 355,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332"
  },
  {
    id: "7643796160100191496",
    title: "Zayaan Silver Unboxing",
    caption: "The packaging on this is insane. Luxury on a budget.",
    tag: "Unboxing",
    price: 150,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363"
  },
  {
    id: "7602275376135408918",
    title: "Cream Velvet - Compliment Getter",
    caption: "Wore this today and got stopped 3 times. Must have for gourmand lovers.",
    tag: "Review",
    price: 345,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383"
  },
  {
    id: "7369114430497361170",
    title: "Shiyaaka Perfume Review",
    caption: "The viral sensation on #perfumetok. Does it live up to the hype?",
    tag: "Viral on TikTok",
    price: 126,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755"
  },
  {
    id: "7324677889293634817",
    title: "Shiyaaka Silver First Impressions",
    caption: "A gorgeous scent profile. Completely blind buy safe!",
    tag: "First Impressions",
    price: 126,
    img: "/assets/images/products/panache-cutout.png"
  },
  {
    id: "7624542837278870805",
    title: "Waheed Perfumes Review",
    caption: "This smells 10x more expensive than it is. Unbelievable quality.",
    tag: "Hidden Gem",
    price: 200,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108"
  },
  {
    id: "7504908791528377608",
    title: "Khadlaj Perfumes Deep Dive",
    caption: "How to find your perfect signature scent with Khadlaj.",
    tag: "Perfume Tips",
    price: 150,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332"
  },
  {
    id: "7455362471231114503",
    title: "Zahra's Khadlaj Favorites",
    caption: "The packaging on this is insane. Luxury on a budget.",
    tag: "Unboxing",
    price: 180,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_TRIUMPH_-_Khadlaj_Perfumes-1966158.jpg?v=1722412558"
  },
  {
    id: "7336459568240807176",
    title: "Khadlaj Sponsored Post",
    caption: "Our best-selling fragrances of the year.",
    tag: "Bestseller",
    price: 210,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_TRIUMPH_-_Khadlaj_Perfumes-1966158.jpg?v=1722412558"
  }
];

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/khadlajperfumes",
  facebook: "https://www.facebook.com/khadlajperfumes",
  youtube: "https://www.youtube.com/",
  linkedin: "https://www.linkedin.com/",
  tiktok: "https://www.tiktok.com/@khadlaj.uk",
};
const CATEGORIES = ["Best Sellers","New","For Him","For Her","Unisex","Perfume Oils","EAU DE PARFUM","Master Perfumery"];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700&display=swap');
  @import url('https://fonts.cdnfonts.com/css/trajan-pro');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#fff;color:#000;font-family:'Montserrat',sans-serif;overflow-x:clip;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#fff;}
  ::-webkit-scrollbar-thumb{background:#000;}
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  h1,h2,h3,h4,.disp{font-family:'Trajan Pro', 'Cinzel', serif; text-transform: uppercase; font-weight: 400 !important;}
  .mono{font-family:'Montserrat',sans-serif;}
  
  .country-dropdown { position: relative; display: inline-block; padding: 6px 0; }
  .country-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid #E8E4DC; border-radius: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 200; padding: 6px; min-width: 140px; margin-top: 4px; }
  .country-dropdown:hover .country-dropdown-menu { display: flex; flex-direction: column; gap: 2px; }

  /* YSL-style primary button: solid black */
  .btn-gold{
    background:#000;color:#fff;border:1px solid #000;
    padding:14px 32px;
    font-family:'Montserrat',sans-serif;font-weight:500;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:background .22s,color .22s;
  }
  .btn-gold:hover{background:#B8922A;border-color:#B8922A;color:#fff;}

  /* ghost = outlined black */
  .btn-ghost{
    background:transparent;color:#000;border:1px solid #000;
    padding:13px 28px;
    font-family:'Montserrat',sans-serif;font-weight:400;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:all .22s;
  }
  .btn-ghost:hover{background:#000;color:#fff;}

  .gold-line{width:40px;height:1px;background:#B8922A;margin:0 auto;}
  .eyebrow{font-size:10px;letter-spacing:4px;color:#B8922A;text-transform:uppercase;font-family:'Montserrat',sans-serif;}

  /* Product card — YSL-style: no lift, just a clean image reveal */
  .card-lift{transition:opacity .25s;}
  .card-lift:hover{opacity:.94;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .65s ease both;}

  @keyframes ribbonScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .ribbon-inner{display:flex;animation:ribbonScroll 80s linear infinite;width:max-content;}

  .reel-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 14px;-webkit-overflow-scrolling:touch;}
  .reel-track::-webkit-scrollbar{height:3px;}
  .reel-track::-webkit-scrollbar-track{background:#000;}
  .reel-track::-webkit-scrollbar-thumb{background:#B8922A;}
  .reel-card{scroll-snap-align:start;flex:0 0 min(330px,82vw);text-decoration:none;color:inherit;}
  .reel-badge{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

  /* Hide TikTok iframe scrollbars */
  iframe{scrolling:no;overflow:hidden;}
  .tiktok-card{overflow:hidden;position:relative;}
  .tiktok-card iframe{pointer-events:none;border:none;overflow:hidden;}

  input,textarea{font-family:'Montserrat',sans-serif;}

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

  /* Navbar Link Hover Effect */
  .nav-link { position: relative; cursor: pointer; padding-bottom: 10px; color: #251737; transition: color 0.4s ease, transform 0.4s ease; display: inline-block; }
  .nav-link::after { 
    content: '✦'; 
    position: absolute; 
    bottom: -10px; 
    left: 50%; 
    transform: translateX(-50%) scale(0) rotate(-90deg); 
    opacity: 0; 
    color: #B8922A; 
    font-size: 11px;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); 
  }
  .nav-link:hover { color: #B8922A; transform: translateY(-3px); }
  .nav-link:hover::after { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
  .nav-link.active { color: #B8922A; transform: translateY(-3px); }
  .nav-link.active::after { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
  
  .mob-nav-link { transition: all 0.3s ease; }
  .mob-nav-link:hover { background: #FAF8F4; color: #B8922A !important; padding-left: 8% !important; }

  @keyframes lafedeFloat{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-10px) scale(1.015);}}
  @keyframes lafedeFloatSmall{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(8px) rotate(1.5deg);}}
  @keyframes lafedeGlow{0%,100%{opacity:.34;transform:scale(.94);}50%{opacity:.72;transform:scale(1.05);}}
  @keyframes lafedeSweep{0%{transform:translateX(-140%) rotate(16deg);opacity:0;}35%{opacity:.18;}100%{transform:translateX(140%) rotate(16deg);opacity:0;}}

  /* Scratch Card Animations */
  @keyframes floatY { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
  .bottle-float { animation: floatY 4s ease-in-out infinite; }

  /* 25th Anniversary Section */
  /* 25th Anniversary Section - Single Line Animated Layout */
  .khadlaj25-section { background: #FAF8F4; padding: 120px 0; overflow: hidden; }
  .k25-header { text-align: center; padding: 0 5%; margin-bottom: 80px; }
  
  .k25-slider-container { width: 100%; overflow-x: auto; position: relative; padding: 20px 0; scroll-behavior: smooth; -ms-overflow-style: none; scrollbar-width: none; scroll-snap-type: x mandatory; }
  .k25-slider-container::-webkit-scrollbar { display: none; }
  .k25-slider-track { display: flex; width: max-content; }
  
  
  .k25-card { 
    width: 380px; margin: 0 20px; scroll-snap-align: center;
    background: linear-gradient(145deg, #2A1A40, #180F25); 
    border: 1px solid rgba(184,146,42,0.25);
    border-radius: 200px 200px 20px 20px;
    overflow: hidden; position: relative; 
    transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); 
    display: flex; flex-direction: column; 
    align-items: center; align-self: stretch; justify-content: flex-start;
    box-shadow: inset 0 0 40px rgba(184,146,42,0.03), 0 15px 35px rgba(0,0,0,0.3);
  }
  .k25-card:hover { 
    transform: translateY(-12px) scale(1.02); 
    box-shadow: inset 0 0 60px rgba(184,146,42,0.1), 0 30px 60px rgba(0,0,0,0.5), 0 0 30px rgba(184,146,42,0.2);
    border-color: rgba(184,146,42,0.8);
  }
  
  .k25-card-img-wrapper { 
    height: 420px; width: 100%; position: relative; 
    background: radial-gradient(circle at 50% 50%, rgba(184,146,42,0.12) 0%, transparent 65%); 
    flex-shrink: 0; 
    display: flex; align-items: center; justify-content: center;
    border-radius: 200px 200px 0 0;
    overflow: hidden;
  }
  
  .product-layout-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-rows: max-content auto;
    grid-template-areas: 
      "images details"
      "story details";
    gap: 0 clamp(40px, 8vw, 120px);
    align-items: start;
  }
  .product-layout-images { grid-area: images; width: 100%; }
  .product-layout-details { grid-area: details; width: 100%; position: sticky; top: 120px; padding-top: 16px; max-width: 500px; }
  .product-layout-story { grid-area: story; margin-top: 32px; padding-right: 40px; }

  @media (max-width: 900px) {
    .product-layout-grid {
      grid-template-columns: 100%;
      grid-template-areas: 
        "images"
        "details"
        "story";
      gap: 40px 0;
    }
    .product-layout-details { position: relative; top: 0; padding-top: 0; max-width: 100%; }
    .product-layout-story { margin-top: 0px; padding-right: 0; }
    .product-gallery-wrapper { flex-direction: column-reverse !important; gap: 16px !important; }
    .product-thumbnails { flex-direction: row !important; width: 100% !important; overflow-x: auto; padding-bottom: 8px; }
  }
  
  .k25-card-img-wrapper img { 
    height: 100%; width: 100%; object-fit: cover; display: block; 
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
  }
  .k25-card:hover .k25-card-img-wrapper img { 
    transform: scale(1.08); 
    filter: brightness(1.15); 
  }
  
  .k25-card-content { 
    padding: 10px 30px 40px; text-align: center; position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    width: 100%; background: transparent;
    flex-grow: 1; transition: all 0.6s ease;
  }
  
  .k25-card-title { 
    font-family: 'Playfair Display', serif; font-size: 34px; color: #fff; margin-bottom: 6px; letter-spacing: 3px;
    background: linear-gradient(to right, #ffffff, #C8A97E, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-size: 200% auto; animation: shine 5s linear infinite;
  }
  .k25-card-subtitle { font-size: 10px; color: #C8A97E; letter-spacing: 5px; margin-bottom: 20px; text-transform: uppercase; font-weight: 500; }
  .k25-card-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 30px; padding: 0 10px; }
  
  /* Creative Animated Button */
  .k25-card-btn { 
    margin-top: auto; position: relative; overflow: hidden; z-index: 1;
    padding: 14px 34px; background: transparent; border: 1px solid rgba(200,169,126,0.3); 
    border-radius: 30px;
    color: #C8A97E; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; 
  }
  .k25-card:hover .k25-card-btn { 
    background: #C8A97E; color: #180F25; border-color: #C8A97E; box-shadow: 0 5px 20px rgba(200,169,126,0.4);
  }
  @keyframes shine {
    to { background-position: 200% center; }
  }

  @media(max-width: 1024px) {
    .k25-card { width: 340px; }
  }
  @media(max-width: 768px) {
    .k25-card { width: 300px; }
    .k25-card-img-wrapper { height: 360px; }
    .k25-card-content { padding: 10px 20px 30px; }
    .k25-card-title { font-size: 28px; }
  }

  /* Discovery Grid */
  .discovery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; padding: 0 5%; justify-items: center; }
  .discovery-card { 
    width: 100%; max-width: 350px; aspect-ratio: 3/4; 
    border-radius: 8px; overflow: hidden; position: relative; cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .discovery-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); filter: brightness(0.85); }
  .discovery-card-overlay { 
    position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.2) 60%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 30px 20px;
    transform: translateY(0); opacity: 1; transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .discovery-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.2); }
  .discovery-card:hover img { transform: scale(1.08); filter: brightness(1.1); }
  
  .discovery-type { font-size: 10px; color: #E8E4DC; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; font-weight: 500; font-family: 'Montserrat', sans-serif; opacity: 0.9; transition: all 0.6s 0.1s; }
  .discovery-name { font-family: 'Playfair Display', serif; font-size: 26px; color: #fff; margin-bottom: 20px; transition: all 0.6s 0.2s; }
  .discovery-btn { 
    display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; border: 1px solid rgba(255,255,255,0.4); color: #fff;
    font-size: 10px; text-transform: uppercase; letter-spacing: 2px; width: fit-content; transition: all 0.4s; font-family: 'Montserrat', sans-serif;
    transform: translateY(0); opacity: 1;
  }
  .discovery-card:hover .discovery-btn { background: #fff; color: #000; border-color: #fff; }
  
  @media(max-width: 1024px) {
    .discovery-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media(max-width: 768px) {
    .discovery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 0 3%; }
    .discovery-card { aspect-ratio: 4/5; }
  }
  @media(max-width: 480px) {
    .discovery-grid { grid-template-columns: 1fr; }
    .discovery-card { aspect-ratio: auto; height: 400px; }
  }

  /* Gift Slider */
  .gift-slider-section { padding: 80px 0 100px; background: #fff; overflow: hidden; position: relative; }
  .gift-slider-track { display: flex; width: max-content; animation: slideGifts 35s linear infinite; }
  .gift-slider-track:hover { animation-play-state: paused; }
  @keyframes slideGifts { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  
  .gift-slide-card { width: 680px; height: 380px; margin: 0 20px; background: #F0EBE6; border: 1px solid #EBE4DD; border-radius: 4px; overflow: hidden; cursor: pointer; transition: transform 0.4s ease, box-shadow 0.4s ease; display: flex; flex-direction: row; }
  .gift-slide-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.08); }
  
  .gift-slide-img { flex: 1.3; position: relative; display: flex; justify-content: center; align-items: center; padding: 20px; }
  .gift-slide-img img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1)); position: relative; z-index: 0; }
  .gift-slide-card:hover .gift-slide-img img { transform: scale(1.08); filter: drop-shadow(0 30px 40px rgba(0,0,0,0.15)); }
  
  .gift-slide-content { flex: 1; padding: 10% 8% 10% 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 2; }
  .gift-slide-eyebrow { color: #888; font-size: 9px; letter-spacing: 4px; text-transform: uppercase; font-family: 'Montserrat',sans-serif; margin-bottom: 16px; font-weight: 600; }
  .gift-slide-title { font-family: 'Playfair Display', serif; font-size: 42px; line-height: 1.1; color: #251737; margin-bottom: 30px; font-weight: 300; }
  .gift-slide-btn { background: transparent; color: #251737; border: 1px solid #251737; padding: 14px 32px; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; transition: all 0.4s ease; width: max-content; }
  .gift-slide-card:hover .gift-slide-btn { background: #B8922A; border-color: #B8922A; color: #fff; }
  
  @media(max-width: 768px) {
    .gift-slide-card { width: 340px; height: auto; flex-direction: column; }
    .gift-slide-img { height: 300px; flex: auto; padding: 20px; }
    .gift-slide-content { padding: 40px 20px; }
    .gift-slide-title { font-size: 32px; }
  }
  
  @keyframes shimmerSweep { 0% { left: -100%; } 100% { left: 150%; } }
  .shimmer-effect {
    position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmerSweep 2.5s infinite;
    pointer-events: none;
    transform: skewX(-20deg);
  }
  
  @keyframes glowUp {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 20px rgba(184,146,42,0.6); }
    100% { transform: scale(1); opacity: 1; text-shadow: 0 0 10px rgba(184,146,42,0.2); }
  }
  .glow-up { animation: glowUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

  .scratch-hover { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s; width: 100%; max-width: 320px; }
  .scratch-hover:hover { transform: scale(1.04); box-shadow: inset 0 4px 10px rgba(0,0,0,0.4), 0 12px 30px rgba(184,146,42,0.25) !important; }
  .scratch-text { font-size: 30px; letter-spacing: 5px; }

  .popup-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }

  .max-container { max-width: 1440px; margin: 0 auto; width: 100%; }

  /* ── Mobile responsive ── */
  @media(max-width:900px){
    .hide-mob{display:none!important;}
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;width:100%!important;}
    .product-card{min-width:0!important;overflow:hidden!important;}
    .product-image-stage{height:clamp(190px,42vw,270px)!important;}
    .product-card-info{padding:12px 4px 16px!important;min-width:0!important;}
    .product-card-title{font-size:13px!important;letter-spacing:.6px!important;overflow-wrap:anywhere!important;}
    .product-card-size{font-size:11px!important;margin-bottom:9px!important;}
    .product-notes{gap:3px!important;min-width:0!important;overflow:hidden!important;}
    .product-note{font-size:7.3px!important;letter-spacing:.25px!important;padding:3px 4px!important;gap:2px!important;min-width:0!important;}
    .product-note-dot{width:4px!important;height:4px!important;}
    .auth-visual-panel{display:none!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .hero-split{grid-template-columns:1fr!important;}
    .hero-img-wrap{height:320px!important;min-height:unset!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .hero-section { padding: 28px 5% 24px !important; }
    .hero-layout { grid-template-columns:1fr !important; gap: 28px !important; }
    .hero-copy { padding: 0 !important; }
    .hero-visual { min-height: 420px !important; order:-1; }
    .hero-headline { font-size: 38px !important; }
    .gift-hero-copy{max-width:72%!important;padding-left:6%!important;}
  }
  @media(max-width:600px){
    .collections-layout{grid-template-columns:1fr!important;}
    .collections-sidebar{position:static!important;left:auto!important;top:auto!important;width:100%!important;max-height:none!important;overflow:visible!important;}
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;}
    .product-image-stage{height:clamp(170px,48vw,230px)!important;}
    .product-card-title{font-size:12px!important;letter-spacing:.4px!important;}
    .product-note{font-size:6.8px!important;padding:3px 3.5px!important;}
    .cart-line{grid-template-columns:82px 1fr!important;align-items:start!important;}
    .cart-line-actions{grid-column:1 / -1!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .new-scroll > div{flex:0 0 78vw!important;}
    .reel-card{flex:0 0 88vw!important;}
    .hero-section { padding: 24px 5% 20px !important; }
    .hero-layout { gap: 22px !important; }
    .hero-visual { min-height: 330px !important; }
    .hero-headline { font-size: 30px !important; line-height: 1.15 !important; margin-bottom: 10px !important; }
    .hero-subtitle { font-size: 13px !important; line-height: 1.6 !important; max-width: 100% !important; margin-bottom: 16px !important; }
    .hero-stats-row { gap: 10px !important; padding-top: 10px !important; flex-wrap: wrap !important; }
    .hero-stat-item { padding-right: 10px !important; margin-right: 10px !important; }
    .popup-overlay { align-items: flex-end !important; padding: 0 !important; }
    .popup-in { box-sizing: border-box !important; border-radius: 24px 24px 0 0 !important; width: 100% !important; max-width: 100% !important; border: none !important; border-top: 1px solid rgba(212,175,55,0.3) !important; animation: slideUp .5s cubic-bezier(0.16, 1, 0.3, 1) both !important; padding: 35px 20px 40px !important; }
    @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .disp.mobile-text { font-size: 19px !important; letter-spacing: 0.5px !important; }
  }
  @media(max-width:480px){
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;}
    .product-image-stage{height:clamp(150px,52vw,205px)!important;}
    .product-card-title{font-size:11px!important;line-height:1.25!important;}
    .product-note{font-size:6.2px!important;letter-spacing:0!important;padding:2.5px 3px!important;}
    .scratch-text { font-size: 24px !important; letter-spacing: 3px !important; }
    .scratch-hover { height: 85px !important; }
    .popup-in{grid-template-columns:1fr!important;}
    .hero-layout { gap: 18px !important; }
    .hero-visual { min-height: 280px !important; }
    .k25-row { flex-direction: column !important; min-height: auto; }
    .k25-image-pane { min-height: 500px; width: 100%; }
    .k25-text-pane { padding: 80px 8% !important; align-items: center; text-align: center; }
    .k25-row-title { font-size: 38px; }
    .khadlaj25-section { padding: 80px 0 !important; }
    .k25-header { margin-bottom: 50px; }
    .hero-cta-row { flex-direction: column !important; gap: 8px !important; width: 100% !important; }
    .hero-cta-row button { width: 100% !important; text-align: center !important; justify-content: center !important; }
    .hero-stats-row { border-top: none !important; padding-top: 0 !important; }
    .hero-stat-item { border-right: none !important; flex: 1 1 40% !important; margin-right: 0 !important; padding-right: 0 !important; }
    .gift-hero-copy{max-width:100%!important;text-align:center!important;align-items:center!important;padding:0 6%!important;}
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
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const notes = p.notes || [];
  const collectionLabel = p.col === "Lafede" ? "La Fede" : p.col;
  const noteColors = ["#C8A96E","#9C7B50","#B8866A","#7A9E8A","#8B7EAA","#B06A6A","#6A8BAA","#A09060"];
  
  const imageScale = {
    "Biscotti Date Toffee": 0.82,
    "Biscotti Melon Musk": 0.88,
    "Bleu Glacé": 0.62,
    "Saraya": 0.78,
    "SHIYAAKA SNOW": 1.35,
    "SHIYAAKA SHADOW": 1.05,
    "KARUS GOLD ABSOLU": 1.05,
    "ISLAND": 1.05,
    "SAWAAR VANILLE BLANC": 1.05,
    "PANACHE ANGEL DUST": 1.15,
    "SARAYA": 1.08,
    "QARAR": 1.08,
    "IHTHIRAAM": 1.08,
    "ZAYAAN SILVER": 0.88,
    "ICON": 1.05
  }[p.name] || 0.88;

  const imageShiftY = {
    "Biscotti Date Toffee": 0.02,
    "Biscotti Melon Musk": 0.05,
    "Bleu Glacé": 0.02,
    "Saraya": 0.06,
    "SHIYAAKA SNOW": -0.10,
    "SHIYAAKA SHADOW": 0,
    "KHADLAJ ISLAND": -0.02,
    "SAWAAR VANILLE BLANC": 0.15,
    "ZAYAAN SILVER": 0.0,
    "KHADLAJ ICON": 0,
    "QARAR": 0,
    "KHADLAJ IHTHIRAAM": 0,
    "PANACHE ANGEL DUST": 0,
    "SARAYA": 0.08
  }[p.name] || 0;

  return (
    <div
      className="product-card"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onView(p)}
      style={{
        background:"transparent",
        display:"flex",
        flexDirection:"column",
        height:"100%",
        position:"relative",
        cursor:"pointer",
        border: "none",
        alignSelf:"stretch",
        isolation:"isolate",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {p.badge && (
        <span style={{
          position:"absolute", top:12, left:12, zIndex:3,
          background: p.badge==="Limited" ? "#5C0000" : p.badge==="New" ? "#B8922A" : "#251737",
          color:"#fff", fontSize:9.5, letterSpacing:2.5,
          padding:"5px 11px", fontWeight:600, textTransform:"uppercase",
          fontFamily:"'Montserrat',sans-serif",
        }}>{p.badge}</span>
      )}
      <div className="product-image-stage" style={{
        position:"relative",
        width:"100%",
        height:"clamp(250px, 22vw, 330px)",
        overflow:"hidden",
        background:"transparent",
        border:"none",
        boxShadow:"none",
        transition:"box-shadow .35s ease,border-color .35s ease"
      }}>
        <div className="gift-hero-copy" style={{
          position:"absolute",
          inset:"12px",
          background:"transparent",
          display:"none",
          pointerEvents:"none"
        }}/>
        <div style={{
          position:"absolute",
          left:"24%",
          right:"24%",
          bottom:22,
          height:14,
          borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(0,0,0,.09) 0%, rgba(0,0,0,.025) 48%, rgba(0,0,0,0) 72%)",
          filter:"blur(2px)",
          opacity: hov ? .7 : .45,
          transition:"opacity .35s ease"
        }}/>
        <div style={{position:"absolute", inset:"42px 0 26px 0", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
          <img
            src={getOptimizedImage(p.img,500)} alt={p.name} loading="lazy"
            style={{
              width:"100%",
              height:"100%",
              objectFit:"contain",
              objectPosition:"center center",
              mixBlendMode:"multiply",
              background:"transparent",
              filter:"brightness(1.05) contrast(1.02)",
              transition:"transform .8s cubic-bezier(0.25, 1, 0.25, 1)",
              transform: hov
                ? `translateY(calc(-2px + ${imageShiftY * 100}%)) scale(${imageScale * 1.05})`
                : `translateY(${imageShiftY * 100}%) scale(${imageScale})`,
            }}
          />
        </div>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          padding:"15px", display:"flex", justifyContent:"center",
          transition:"all .4s cubic-bezier(0.25, 1, 0.25, 1)",
          transform: hov ? "translateY(0)" : "translateY(20px)",
          opacity: hov ? 1 : 0, zIndex:10
        }}>
          <button
            onClick={(e)=>{
              e.stopPropagation();
              if (onCart) onCart(p);
            }}
            style={{
            width:"100%", background:"#251737", color:"#fff", border:"none", 
            padding:"12px", fontSize:11, letterSpacing:2, fontWeight:600, 
            cursor:"pointer", textTransform:"uppercase",
            fontFamily:"'Montserrat',sans-serif", transition:"background .3s"
          }}
          onMouseEnter={(e)=>e.target.style.background="#B8922A"}
          onMouseLeave={(e)=>e.target.style.background="#251737"}
          >
            Add to Bag
          </button>
        </div>
      </div>
      <div className="product-card-info" style={{padding:"16px 10px 18px", flex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
        <p style={{fontSize:9.5, letterSpacing:3, color:"#B8922A", textTransform:"uppercase", marginBottom:7, fontFamily:"'Montserrat',sans-serif", fontWeight:600}}>{collectionLabel}</p>
        <h3 className="product-card-title" style={{fontSize:15.5, fontWeight:600, color:"#251737", lineHeight:1.25, marginBottom:5, textTransform:"uppercase", letterSpacing:1.1}}>{p.name}</h3>
        <p className="product-card-size" style={{fontSize:12.5, color:"#888", marginBottom:12, fontFamily:"'Montserrat',sans-serif", letterSpacing:.4, fontWeight:400}}>{p.size}</p>
        {notes.length > 0 && (
          <div className="product-notes" style={{display:"flex", flexWrap:"nowrap", gap:4, marginBottom:12, justifyContent:"center", alignItems:"center", width:"100%"}}>
            {notes.map((n, i) => (
              <span className="product-note" key={n} style={{display:"inline-flex", alignItems:"center", gap:3, padding:"3px 6px", background:"#f5f5f5", fontSize:8, letterSpacing:.7, color:"#666", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", fontWeight:600, whiteSpace:"nowrap", borderRadius:2}}>
                <span className="product-note-dot" style={{width:4, height:4, borderRadius:"50%", background: "#C8A96E", flexShrink:0, display:"inline-block"}}/>
                {n}
              </span>
            ))}
          </div>
        )}
        <div style={{marginTop:"auto", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:6, paddingTop:12, borderTop:"1px solid #F0F0F0"}}>
          <div style={{display:"flex", alignItems:"center", gap:4, justifyContent:"center"}}>
            <span style={{color:"#C8A96E", fontSize:12, letterSpacing:1}}>{"★".repeat(5)}</span>
            <span style={{fontSize:10, color:"#aaa", fontFamily:"'Montserrat',sans-serif", fontWeight:600}}>(905)</span>
          </div>
          <p style={{fontSize:17, fontWeight:600, color:"#251737", fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(p.price)}</p>
        </div>
      </div>
    </div>
  );
}
function SectionHeader({ eyebrow, title, sub, light=false }){
  return (
    <div style={{textAlign:"center",marginBottom:52}}>
      {eyebrow && <p className="eyebrow" style={{marginBottom:14,color:"#B8922A"}}>{eyebrow}</p>}
      <h2 className="disp" style={{fontSize:"clamp(28px,3.8vw,52px)",fontWeight:300,color: light ? "#fff" : "#251737",lineHeight:1.15,letterSpacing:"-0.5px",marginBottom:sub?14:0}}>{title}</h2>
      {sub && <p style={{color: light ? "rgba(255,255,255,0.7)" : "#777",fontSize:14,maxWidth:500,margin:"0 auto",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>{sub}</p>}
    </div>
  );
}

function TikTokCard({ t }) {
  const [hov, setHov] = useState(false);
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:"0 0 320px",
        height: 520,
        position: "relative",
        background:"#251737",
        borderRadius: 16,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        justifyContent: "flex-end",
        scrollSnapAlign: "center",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hov ? "0 24px 48px rgba(0,0,0,.15)" : "0 8px 24px rgba(0,0,0,.06)",
        transition: "all .4s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      {/* Blurred product image — shows while iframe loads */}
      <div style={{
        position: "absolute", inset: "-10%", width: "120%", height: "120%",
        backgroundImage: `url(${t.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.25,
        filter: "blur(10px)",
        zIndex: 0
      }} />

      {/* TikTok Player v1 — autoplay, muted, loop */}
      <iframe
        src={`https://www.tiktok.com/player/v1/${t.id}?music_info=0&description=0&loop=1&autoplay=1&muted=1&controls=0&rel=0&native_context_menu=0&closed_caption=0`}
        scrolling="no"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title={t.title}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          border: "none", zIndex: 1,
          pointerEvents: hov ? "auto" : "none",
          transform: hov ? "scale(1.02)" : "scale(1)",
          transition: "transform .6s ease",
          background: "transparent",
        }}
      />

      {/* Gradient Overlay (Disabled pointer events so user can click video controls) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
        pointerEvents: "none"
      }}/>

      {/* Content (Disabled pointer events so user can click Play on the iframe) */}
      <div style={{position: "relative", zIndex: 3, padding: "30px 24px", color: "#fff", pointerEvents: "none"}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:20}}>
          <div style={{width:48, height:48, borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:6}}>
            <img decoding="async" src={getOptimizedImage(t.img,400)} alt="" style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"normal", filter:"contrast(1.02) brightness(0.98)"}}/>
          </div>
          <div>
            <p style={{fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:"#C1A46A", fontFamily:"'Montserrat',sans-serif", marginBottom:4}}>{t.tag || "Trending"}</p>
            <p style={{fontSize:18, fontWeight:400, fontFamily:"'Montserrat',sans-serif", lineHeight:1, color:"#fff"}}>{t.title}</p>
          </div>
        </div>
        
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(255,255,255,0.15)", paddingTop:16}}>
          <p style={{fontSize:16, fontWeight:600, fontFamily:"'Montserrat',sans-serif", color:"#fff"}}>{formatPrice(t.price)}</p>
          <span style={{fontSize:11, letterSpacing:2, textTransform:"uppercase", fontWeight:600, fontFamily:"'Montserrat',sans-serif", display:"flex", alignItems:"center", gap:6, color:"#fff"}}>
            Shop Now <span>&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRUST BANNER
═══════════════════════════════════════════════════════════════ */
function TrustBanner() {
  const items = [
    {
      title: "SECURE PAYMENTS",
      desc: "100% encrypted transactions",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
    },
    {
      title: "CRUELTY FREE",
      desc: "Ethically crafted fragrances",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 16a3 3 0 0 1 2.24 5"/><path d="M18 12h.01"/><path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"/><path d="M20 8.54V4a2 2 0 1 0-4 0v3"/><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"/><path d="M4 15.5v.01"/></svg>
    },
    {
      title: "FREE SAMPLES",
      desc: "With every single order",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
    },
    {
      title: "GLOBAL SHIPPING",
      desc: "Delivered worldwide",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    }
  ];

  return (
    <div style={{
      background: "linear-gradient(90deg, #F9F7F1 0%, #FFFFFF 50%, #F9F7F1 100%)",
      borderTop: "1px solid #E8E4DC",
      borderBottom: "1px solid #E8E4DC",
      padding: "40px 5%",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        gap: 30, alignItems: "center"
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", 
            textAlign: "center", padding: "10px"
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: "50%", background: "rgba(184,146,42,0.1)", 
              color: "#B8922A", display: "flex", alignItems: "center", justifyContent: "center", 
              marginBottom: 16
            }}>
              {it.icon}
            </div>
            <h4 style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, 
              letterSpacing: 2, color: "#251737", textTransform: "uppercase", marginBottom: 6
            }}>{it.title}</h4>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: 13, fontStyle: "italic", 
              color: "#888"
            }}>{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: HOME
═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("Best Sellers");
  const [hov, setHov] = useState(null);
  const [quizStep, setQuizStep] = useState(1);
  const [quizMood, setQuizMood] = useState("");
  const [quizOccasion, setQuizOccasion] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const quizProducts = {
    "Rich & Exotic": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 204) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 20) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 200) || PRODUCTS[0]
    },
    "Fresh & Energizing": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 301) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 13) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 15) || PRODUCTS[0]
    },
    "Clean & Sophisticated": {
      "Royal Evenings": PRODUCTS.find(p => p.id === 208) || PRODUCTS[0],
      "Daily Wear & Office": PRODUCTS.find(p => p.id === 14) || PRODUCTS[0],
      "Romantic Date Nights": PRODUCTS.find(p => p.id === 303) || PRODUCTS[0]
    }
  };

  const filtered = PRODUCTS.filter(p=>{
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    if(activeCat==="Perfume Oils") return isKhadlajProduct && (p.col==="Perfume Oils");
    if(activeCat==="EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
    if(activeCat==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";
    return isKhadlajProduct && (p.col || '').toLowerCase() === activeCat.toLowerCase();
  }).slice(0, activeCat === "Best Sellers" ? 6 : 16);
  const newLaunches = PRODUCTS.filter(p => p.badge === "New").slice(0, 8);


  return (
    <>
      {/* ── HERO VIDEO ── */}
      <section className="hero-section" style={{position:"relative",width:"100%",height:"70vh",minHeight:"450px",overflow:"hidden",background:"#0a0a0a"}}>
        <video
          className="hero-video"
          src={window.__VIDEO_URL__ || "./assets/videos/duty-free.mp4"}
          autoPlay muted loop playsInline preload="auto"
          onCanPlay={() => window.hidePreloader && window.hidePreloader()}
          onLoadedData={() => window.hidePreloader && window.hidePreloader()}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:.8}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(8,8,8,.04) 0%,rgba(8,8,8,.18) 35%,rgba(8,8,8,.52) 100%)",pointerEvents:"none"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,.05) 50%,rgba(0,0,0,.22) 100%)",pointerEvents:"none"}} />
      </section>

      {/* ── SCENT RIBBON ── */}
      <div style={{overflow:"hidden",background:"#251737",padding:"24px 0", borderTop:"1px solid rgba(193,164,106,0.15)", borderBottom:"1px solid rgba(193,164,106,0.15)"}}>
        <div className="ribbon-inner" style={{display:"flex", alignItems:"center"}}>
          {[...SCENT_RIBBON,...SCENT_RIBBON,...SCENT_RIBBON].map((n,i)=>(
            <div key={i} style={{display:"flex", alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:400,letterSpacing:8,color:"#E8E4DC",textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"'Montserrat',sans-serif"}}>{n}</span>
              <span style={{margin:"0 64px",color:"#C1A46A",fontSize:10}}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 25TH ANNIVERSARY COLLECTION ── */}
      {/* ── 25TH ANNIVERSARY COLLECTION ── */}
      <section className="khadlaj25-section">
        <div className="k25-header">
          <span style={{fontSize: 11, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16}}>The Masterpiece</span>
          <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: 46, color: "#251737", margin: 0, fontWeight: 500}}>Shiyaaka Collection</h2>
          <p style={{fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: "#555", maxWidth: 640, margin: "20px auto 0", lineHeight: 1.6}}>
            Experience the essence of modern sophistication. A definitive collection curated for elegance and timeless charm.
          </p>
        </div>

        <div style={{position: "relative", padding: "0 2%"}}>
          <button onClick={() => document.getElementById("k25-scroll-container").scrollBy({left:-460, behavior:"smooth"})} style={{position: "absolute", left: "3%", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "1px solid #E8E4DC", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", cursor: "pointer", color: "#251737", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s"}} onMouseEnter={(e)=>{e.currentTarget.style.background="#251737"; e.currentTarget.style.color="#fff";}} onMouseLeave={(e)=>{e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#251737";}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button onClick={() => document.getElementById("k25-scroll-container").scrollBy({left:460, behavior:"smooth"})} style={{position: "absolute", right: "3%", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "1px solid #E8E4DC", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", cursor: "pointer", color: "#251737", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s"}} onMouseEnter={(e)=>{e.currentTarget.style.background="#251737"; e.currentTarget.style.color="#fff";}} onMouseLeave={(e)=>{e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#251737";}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div id="k25-scroll-container" className="k25-slider-container">
            <div className="k25-slider-track">
              {[
                { name: "SHIYAAKA SKY", subtitle: "Fresh & Uplifting", desc: "A refreshing blend of fresh citrus and sky breeze notes, anchored by a warm cedarwood foundation.", img: "/assets/images/products/shiyaaka_custom_5_cropped.png" },
                { name: "SHIYAAKA SHADOW", subtitle: "Mysterious & Bold", desc: "A captivating fragrance that symbolizes modern masculinity, bottled for the discerning individual.", img: "/assets/images/products/shiyaaka_custom_3.jpg" },
                { name: "SHIYAAKA SNOW", subtitle: "Crisp & Pure", desc: "An aromatic tribute to the frosty freshness, woven into the very fabric of our heritage.", img: "/assets/images/products/shiyaaka_custom_4.png" },
                { name: "SHIYAAKA GOLD", subtitle: "Timeless Elegance", desc: "A majestic blend reflecting strength, honor, and timeless elegance that lasts through the ages.", img: "/assets/images/products/shiyaaka_custom_2.jpg" },
                { name: "SHIYAAKA BLUE", subtitle: "Fresh & Aquatic", desc: "Built on the essence of pure freshness, leaving a trail of sophisticated confidence wherever you go.", img: "/assets/images/products/shiyaaka_custom_1.jpg" },
                { name: "SHIYAAKA MEN", subtitle: "Bold & Classic", desc: "A signature masculine scent blending rich spices with deep woody undertones.", img: "/assets/images/products/shiya_men_v3.png" },
                { name: "SHIYAAKA SKY", subtitle: "Fresh & Uplifting", desc: "A refreshing blend of fresh citrus and sky breeze notes, anchored by a warm cedarwood foundation.", img: "/assets/images/products/shiyaaka_custom_5_cropped.png" },
                { name: "SHIYAAKA SHADOW", subtitle: "Mysterious & Bold", desc: "A captivating fragrance that symbolizes modern masculinity, bottled for the discerning individual.", img: "/assets/images/products/shiyaaka_custom_3.jpg" },
                { name: "SHIYAAKA SNOW", subtitle: "Crisp & Pure", desc: "An aromatic tribute to the frosty freshness, woven into the very fabric of our heritage.", img: "/assets/images/products/shiyaaka_custom_4.png" },
                { name: "SHIYAAKA GOLD", subtitle: "Timeless Elegance", desc: "A majestic blend reflecting strength, honor, and timeless elegance that lasts through the ages.", img: "/assets/images/products/shiyaaka_custom_2.jpg" },
                { name: "SHIYAAKA BLUE", subtitle: "Fresh & Aquatic", desc: "Built on the essence of pure freshness, leaving a trail of sophisticated confidence wherever you go.", img: "/assets/images/products/shiyaaka_custom_1.jpg" },
                { name: "SHIYAAKA MEN", subtitle: "Bold & Classic", desc: "A signature masculine scent blending rich spices with deep woody undertones.", img: "/assets/images/products/shiya_men_v3.png" }
              ].map((item, idx) => (
                <div className="k25-card" key={idx}>
                  <div className="k25-card-img-wrapper">
                    <img loading="lazy" decoding="async" src={getOptimizedImage(item.img,500)} alt={item.name} />
                  </div>
                  <div className="k25-card-content">
                    <h3 className="k25-card-title">{item.name}</h3>
                    <p className="k25-card-subtitle">{item.subtitle}</p>
                    <p className="k25-card-desc">{item.desc}</p>
                    <button className="k25-card-btn">Discover</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW LAUNCH ── */}
      <section style={{padding:"84px 5% 96px", background:"linear-gradient(180deg, #fff 0%, #fcfaf7 100%)"}}>
        <div className="max-container">
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,marginBottom:28,textAlign:"center"}}>
            <SectionHeader title="New Launches" sub="A balanced spotlight on the latest fragrances, curated to feel clean and contemporary." />
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24,alignItems:"stretch"}} className="grid-4">
            {newLaunches.map(p=>(
              <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
            ))}
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginTop:18,flexWrap:"wrap",paddingTop:12,borderTop:"1px solid #EBE4DD"}}>
            <p style={{fontSize:10.5,letterSpacing:2.5,color:"#888",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>
              {newLaunches.length} fresh launches
            </p>
          </div>
        </div>
      </section>


      
      

      {/* ── WHAT SETS US APART ── */}
      {/* ── DISCOVER YOUR NEXT FAVORITE ── */}
      <section style={{padding:"120px 0", background:"#FAF8F4", overflow:"hidden"}}>
        <div style={{textAlign:"center", marginBottom:60}}>
          <span style={{fontSize: 11, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, display:"block", marginBottom:16}}>Curated Selections</span>
          <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: 46, color: "#251737", margin: 0, fontWeight: 500}}>
            Discover Your Next Favorite
          </h2>
          <p style={{fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: "#555", maxWidth: 600, margin: "20px auto 0", lineHeight: 1.6}}>
            Explore our most captivating signature fragrances, beautifully crafted to evoke unforgettable emotions.
          </p>
        </div>

        <div className="discovery-grid">
          {[
            {name: "Island", type: "Premium Blend", img: "/assets/images/products/island-gold.jpg"},
            {name: "Shiyaaka Sky", type: "Special Edition", img: "/assets/images/products/shiyaaka_custom_5_cropped.png"},
            {name: "Fursan", type: "Royal Elegance", img: "/assets/images/products/fursan.png"},
            {name: "L'imaginaire", type: "Artisan Creation", img: "/assets/images/products/limaginaire.jpg"},
            {name: "Nuha Cherry Blush", type: "Eau De Parfum", img: "/assets/images/products/nuha-cherry.jpg"},
            {name: "Cream Velvet", type: "Signature Collection", img: "/assets/images/products/cream-velvet-bottle.png"},
            {name: "Mocha Latte", type: "Gourmand Essence", img: "/assets/images/products/mocha-latte.png"},
            {name: "Hareem Al Sultan", type: "Masterpiece", img: "/assets/images/products/hareem-al-sultan.png"}
          ].map((item, i) => (
            <div key={item.name} className="discovery-card">
              <img decoding="async" src={getOptimizedImage(item.img,500)} alt={item.name} loading="lazy" />
              <div className="discovery-card-overlay">
                <p className="discovery-type">{item.type}</p>
                <h3 className="discovery-name">{item.name}</h3>
                <span className="discovery-btn">Shop Now</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{display:"flex", flexWrap:"wrap", background:"#251737"}}>
        {/* Left Content Area */}
        <div style={{flex:"1 1 50%", padding:"8vw 6%", minWidth:300, display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <span style={{display:"block", color:"#C8A97E", letterSpacing:4, fontSize:12, textTransform:"uppercase", marginBottom:16, fontWeight:600}}>The New Standard</span>
          <h2 className="disp" style={{fontSize:"clamp(36px, 5vw, 56px)", fontWeight:400, color:"#fff", lineHeight:1.1, marginBottom:32, letterSpacing:"-0.5px"}}>
            Discover Shiyaaka Sky
          </h2>
          <p style={{fontSize:16, color:"rgba(255,255,255,0.85)", lineHeight:1.9, fontFamily:"'Montserrat',sans-serif", marginBottom:48, maxWidth:650, fontWeight:300}}>
            Immerse yourself in the ultimate expression of freshness. Shiyaaka Sky brings together zesty citrus, the airy touch of a sky breeze, and the grounding warmth of cedarwood for a truly liberating olfactory experience.
          </p>
          
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:24, marginBottom:56, maxWidth:700}}>
            {[
              "Invigorating Fresh Citrus",
              "Breathable Sky Breeze",
              "Warm Cedarwood Base",
              "Everyday Elegance",
              "Long-Lasting Sillage"
            ].map((point, i) => (
                <div key={i} style={{display:"flex", alignItems:"flex-start", gap:16}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop:2, flexShrink:0}}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{color:"#fff", fontFamily:"'Montserrat',sans-serif", fontSize:15, fontWeight:400, lineHeight:1.4}}>{point}</span>
                </div>
            ))}
          </div>
          
          <div>
            <button onClick={()=>{
                const skyProduct = PRODUCTS.find(p=>p.name==="SHIYAAKA SKY" || p.id===9200000000003);
                if(skyProduct) { setViewProduct(skyProduct); setPage("product"); }
              }} style={{padding:"18px 48px", borderRadius:0, fontSize:13, letterSpacing:2, background:"transparent", border:"1px solid #C8A97E", color:"#C8A97E", textTransform:"uppercase", transition:"all 0.3s ease", cursor:"pointer"}}
              onMouseEnter={(e)=>{e.target.style.background="#C8A97E"; e.target.style.color="#fff";}}
              onMouseLeave={(e)=>{e.target.style.background="transparent"; e.target.style.color="#C8A97E";}}>
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Video Area */}
        <div style={{flex:"1 1 50%", minWidth:300, position:"relative", minHeight:"600px"}}>
          <video src={window.__SHIYAAKA_VIDEO_URL__ || "/assets/videos/shiyaaka-sky-approved.mp4"} autoPlay loop muted playsInline preload="auto" style={{position:"absolute", width:"100%", height:"100%", objectFit:"cover"}} />
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{padding:"0 5% 104px",background:"#fff"}}>
        <div style={{paddingTop:96,marginBottom:52,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div style={{textAlign:"left"}}>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,color:"#251737",lineHeight:1.15,letterSpacing:"-0.5px"}}>
              Where every scent has a story
            </h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>setPage("collections")}>View All</button>
        </div>

        {/* Category pills */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:48,borderBottom:"1px solid #E8E4DC"}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{
                background:"transparent",color:activeCat===c?"#000":"#777",
                border:"none",
                borderBottom: activeCat===c ? "1px solid #000" : "1px solid transparent",
                padding:"8px 14px 10px",fontSize:10.5,letterSpacing:2,cursor:"pointer",whiteSpace:"nowrap",
                fontWeight:activeCat===c?800:700,transition:"all .2s",textTransform:"uppercase",
                fontFamily:"'Montserrat',sans-serif",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24,alignItems:"stretch"}} className="grid-4">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>
      </section>

      
      
      {/* ── ANIMATED GIFT SLIDER ── */}
      <section className="gift-slider-section">
        <SectionHeader title="CURATED GIFT COLLECTION" />
        
        <div style={{marginTop: 60, position: "relative"}}>
          <div className="gift-slider-track">
            {[
              { name: "Cloud Candy", desc: "A soft peach-pink gift set", price: 169, img: "/assets/images/gifsets/cloudcandy_gift_transparent.png" },
              { name: "Island", desc: "The signature Island scent", price: 179, img: "/assets/images/gifsets/island_gift_transparent.png" },
              { name: "Cream Velvet", desc: "Buttery caramel and vanilla", price: 160, img: "/assets/images/gifsets/creamvelvet_gift_user.png" },
              { name: "Cloud Candy", desc: "A soft peach-pink gift set", price: 169, img: "/assets/images/gifsets/cloudcandy_gift_transparent.png" },
              { name: "Island", desc: "The signature Island scent", price: 179, img: "/assets/images/gifsets/island_gift_transparent.png" },
              { name: "Cream Velvet", desc: "Buttery caramel and vanilla", price: 160, img: "/assets/images/gifsets/creamvelvet_gift_user.png" }
            ].map((gift, idx) => (
              <div className="gift-slide-card" key={idx} onClick={() => setPage("gifts")}>
                <div className="gift-slide-img">
                  <img loading="lazy" decoding="async" src={getOptimizedImage(gift.img,500)} alt={gift.name} />
                </div>
                <div className="gift-slide-content">
                  <p className="gift-slide-eyebrow">Handpicked</p>
                  <h2 className="gift-slide-title">
                    {gift.name.replace(' Gift Set', '').split(' ').map((word, i) => <span key={i}>{word}<br/></span>)}
                    Sets
                  </h2>
                  <button className="gift-slide-btn">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── SCENT FINDER QUIZ ── */}
      <section style={{background:"#251737", padding:"96px 5%", color:"#fff", borderTop:"1px solid rgba(255,255,255,0.08)", position:"relative", zIndex:1}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:64, alignItems:"center"}} className="hero-split">
          
          {/* Left info column */}
          <div>
            <h2 className="disp" style={{fontSize:"clamp(30px,3.8vw,52px)",fontWeight:400,color:"#fff",lineHeight:1.05,letterSpacing:-1,marginBottom:24}}>
              KHADLAJ <em className="luxury-gold-text" style={{fontStyle:"normal"}}>SCENT FINDER</em>
            </h2>
            <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:14,maxWidth:440,fontFamily:"'Montserrat',sans-serif",marginBottom:32}}>
              Fragrance is a deeply personal language. Answer a few questions and our custom olfactive profiler will match you with a signature scent from our master perfume lines.
            </p>

          </div>

          {/* Right quiz container */}
          <div style={{background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"40px 32px", minHeight:380, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative"}}>
            
            {quizStep === 1 && (
              <div style={{animation:"fadeUp .4s ease both"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:600, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Step 1 of 2</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:24}}>Choose Your Olfactive Vibe</h3>
                <div style={{display:"flex", flexDirection:"column", gap:12}}>
                  {[
                    { v: "Rich & Exotic", desc: "Bold Oud, precious Amber, and warm spices." },
                    { v: "Fresh & Energizing", desc: "Vibrant Citrus, crisp Marine, and delicate florals." },
                    { v: "Clean & Sophisticated", desc: "Sensual Musk, creamy Sandalwood, and soft iris." }
                  ].map(item => (
                    <button key={item.v}
                      onClick={() => { setQuizMood(item.v); setQuizStep(2); }}
                      style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#fff", padding:"14px 20px", borderRadius:8, textAlign:"left", cursor:"pointer", transition:"all 0.25s ease"}}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,146,42,0.1)"; e.currentTarget.style.borderColor = "#B8922A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <p style={{fontSize:12, fontWeight:600, fontFamily:"'Montserrat',sans-serif", margin:0}}>{item.v}</p>
                      <p style={{fontSize:9, color:"rgba(255,255,255,0.5)", margin:"4px 0 0", fontFamily:"'Montserrat',sans-serif"}}>{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div style={{animation:"fadeUp .4s ease both"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:600, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Step 2 of 2</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:24}}>When will you wear this?</h3>
                <div style={{display:"flex", flexDirection:"column", gap:12}}>
                  {[
                    { k: "Royal Evenings", label: "Royal Evenings", desc: "Special events, formal dinners, and night statements." },
                    { k: "Daily Wear & Office", label: "Daily Wear & Office", desc: "Sophisticated signature scent for day-to-day use." },
                    { k: "Romantic Date Nights", label: "Romantic Date Nights", desc: "Warm, intimate, and captivating close encounters." }
                  ].map(item => (
                    <button key={item.k}
                      onClick={() => {
                        const finalProduct = quizProducts[quizMood][item.label];
                        setQuizOccasion(item.label);
                        setQuizResult(finalProduct);
                        setQuizStep(3);
                      }}
                      style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#fff", padding:"14px 20px", borderRadius:8, textAlign:"left", cursor:"pointer", transition:"all 0.25s ease"}}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,146,42,0.1)"; e.currentTarget.style.borderColor = "#B8922A"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <p style={{fontSize:12, fontWeight:600, fontFamily:"'Montserrat',sans-serif", margin:0}}>{item.label}</p>
                      <p style={{fontSize:9, color:"rgba(255,255,255,0.5)", margin:"4px 0 0", fontFamily:"'Montserrat',sans-serif"}}>{item.desc}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setQuizStep(1)} style={{background:"none", border:"none", color:"rgba(255,255,255,0.5)", fontSize:9, textTransform:"uppercase", letterSpacing:1.5, marginTop:20, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Montserrat',sans-serif", padding:0}}>
                  &larr; Back
                </button>
              </div>
            )}

            {quizStep === 3 && quizResult && (
              <div style={{animation:"fadeUp .4s ease both", textAlign:"center"}}>
                <p style={{fontSize:10, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", fontWeight:600, marginBottom:8, fontFamily:"'Montserrat',sans-serif"}}>Your Scent Match</p>
                <h3 className="disp" style={{fontSize:20, fontWeight:400, color:"#fff", marginBottom:20}}>The Perfect Fit</h3>
                
                {/* Result Box */}
                <div style={{display:"flex", alignItems:"center", gap:20, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", padding:20, borderRadius:8, marginBottom:24, textAlign:"left"}}>
                  <div style={{width:80, height:80, background:"#fff", borderRadius:6, padding:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <img loading="lazy" decoding="async" src={getOptimizedImage(quizResult.img,600)} alt={quizResult.name} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
                  </div>
                  <div>
                    <p style={{fontSize:8, color:"#B8922A", letterSpacing:2, textTransform:"uppercase", margin:0, fontWeight:600, fontFamily:"'Montserrat',sans-serif"}}>{quizResult.col}</p>
                    <h4 style={{fontSize:15, fontWeight:600, color:"#fff", textTransform:"uppercase", margin:"4px 0 6px"}}>{quizResult.name}</h4>
                    <p style={{fontSize:11, color:"rgba(255,255,255,0.6)", margin:0, fontFamily:"'Montserrat',sans-serif"}}>{quizResult.size}</p>
                  </div>
                </div>

                <div style={{display:"flex", gap:12}}>
                  <button onClick={() => { setViewProduct(quizResult); setPage("product"); }}
                    style={{flex:1, background:"#B8922A", border:"1px solid #B8922A", color:"#fff", padding:"14px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontWeight:600, borderRadius:4, transition:"all .25s ease"}}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#B8922A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#B8922A"; }}
                  >
                    Discover Perfume
                  </button>
                  <button onClick={() => setQuizStep(1)}
                    style={{background:"transparent", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"14px 20px", fontSize:10, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:4, transition:"all .25s ease"}}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>



{/* ── TIKTOK REELS ── */}
      <section style={{padding:"80px 5% 40px",background:"#fff"}}>
        <div style={{marginBottom:48,textAlign:"center"}}>
          <h2 className="disp" style={{fontSize:"clamp(24px,3vw,42px)",fontWeight:400,color:"#251737",letterSpacing:-0.5,marginBottom:10,lineHeight:1.2}}>
            SHOP BY REEL
          </h2>
          <p style={{color:"#777",fontSize:12,fontFamily:"'Montserrat',sans-serif",letterSpacing:0.3}}>
            Browse fragrances through short, stylish reels and discover your next favorite scent.
          </p>
        </div>

        {/* Actual TikTok video embeds */}
        <div 
          className="reel-track hide-scrollbar"
          style={{
            display:"flex", gap:20, overflowX:"auto", scrollSnapType:"x mandatory",
            padding:"10px 5% 30px", margin:"0 -5%", scrollBehavior:"smooth"
          }}
        >
          {REELS.map((t, idx) => (
            <TikTokCard key={idx} t={t} />
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:44}}>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            style={{
              display:"inline-flex",alignItems:"center",gap:10,
              border:"1px solid #251737",
              color:"#251737",padding:"13px 32px",
              fontSize:10,letterSpacing:3,textTransform:"uppercase",
              textDecoration:"none",fontFamily:"'Montserrat',sans-serif",
              transition:"all .2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#251737";e.currentTarget.style.color="#251737";}}
          >
            ▶ Follow on TikTok
          </a>
        </div>
      </section>


      {/* ── TESTIMONIALS ── */}
      <section style={{background:"#251737",padding:"64px 5%"}}>
        <SectionHeader eyebrow="Reviews" title="Loved Across the World" light={true} />
        <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(255,255,255,.15)"}}>
          {REVIEWS.map((r,i)=>(
            <a href={r.url || "#"} target="_blank" rel="noopener noreferrer" key={i} style={{textDecoration:"none", color:"inherit"}}>
              <div style={{background:"#251737",padding:"32px 24px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",transition:"background 0.3s ease", height:"100%"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"} onMouseLeave={e=>e.currentTarget.style.background="#251737"}>
                <StarRating n={r.stars} color="#B8922A"/>
                <p style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.6,margin:"16px 0",fontStyle:"italic",fontWeight:300,fontFamily:"'Montserrat',sans-serif"}}>"{r.text}"</p>
                <div style={{marginTop:"auto"}}>
                  <p style={{fontSize:9,fontWeight:600,color:"#fff",letterSpacing:2,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>{r.name}</p>
                  <p style={{fontWeight:600,fontSize:8,letterSpacing:4,color:"#B8922A",marginTop:6,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>{r.country}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>


{/* ── WHY KHADLAJ — Trust strip ── */}
      <section style={{background:"#fff",borderBottom:"1px solid #E8E4DC",padding:"40px 5% 80px",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,textAlign:"center"}} className="grid-4">
          {[
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><path d="M12 22V12" /><path d="M12 12c2-2.5 4-3 5-5-2 .5-4.5 2-5 5z" fill="rgba(184,146,42,0.1)" /><path d="M12 12c-2-2.5-4-3-5-5 2 .5 4.5 2 5 5z" fill="rgba(184,146,42,0.1)" /><path d="M12 15c1.5-1.5 3-1.8 3.8-3-.8.3-2.2 1-3.8 3z" /><path d="M12 15c-1.5-1.5-3-1.8-3.8-3 .8.3 2.2 1 3.8 3z" /></svg>,
              title:"Natural Ingredients",
              desc:"Taif roses, Cambodian oud, French iris — ethically sourced"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><polygon points="12 6 13.5 9.5 17 9.5 14 11.5 15.5 15 12 13 8.5 15 10 11.5 7 9.5 10.5 9.5 12 6" fill="rgba(184,146,42,0.15)" /></svg>,
              title:"Award-Winning",
              desc:"Recognised fragrance house since 1997 across 30+ countries"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><rect x="6" y="8" width="8" height="6" rx="1" fill="rgba(184,146,42,0.1)" /><path d="M14 9h3l2 2v3h-5V9z" /><circle cx="8.5" cy="16.5" r="1.5" fill="#B8922A" /><circle cx="15.5" cy="16.5" r="1.5" fill="#B8922A" /></svg>,
              title:"Free UAE Delivery",
              desc:"Complimentary shipping on orders above AED 150"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><rect x="6" y="8" width="12" height="8" rx="1" fill="rgba(184,146,42,0.1)" /><path d="M6 11h12M12 8v8" /><path d="M12 8c-.8-1-2.2-1.5-2.2-.5s1.2 1 2.2.5c.8-1 2.2-1.5 2.2-.5s-1.2 1-2.2.5z" /></svg>,
              title:"Luxury Packaging",
              desc:"Every order arrives gift-ready in premium Khadlaj packaging"
            },
          ].map((item,i)=>(
            <div key={item.title} style={{
              padding:"40px 28px",
              background:"#FCFBFA",
              border:"1px solid #F0ECE6",
              transition:"all .3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.transform="translateY(-6px)";
              e.currentTarget.style.borderColor="#B8922A";
              e.currentTarget.style.boxShadow="0 16px 36px rgba(184,146,42,0.08)";
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.transform="translateY(0)";
              e.currentTarget.style.borderColor="#F0ECE6";
              e.currentTarget.style.boxShadow="none";
            }}
            >
              <div style={{marginBottom:22,display:"flex",justifyContent:"center"}}>{item.icon}</div>
              <p style={{fontSize:11,fontWeight:600,color:"#251737",letterSpacing:2,fontFamily:"'Montserrat',sans-serif",marginBottom:12,textTransform:"uppercase"}}>{item.title}</p>
              <p style={{fontSize:12,color:"#777",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",maxWidth:220,margin:"0 auto"}}>{item.desc}</p>
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
function CollectionsPage({ addToCart, setViewProduct, setPage, collectionCategory }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [activeCat, setActiveCat] = useState(collectionCategory || "Khadlaj");
  React.useEffect(() => {
    if(collectionCategory) setActiveCat(collectionCategory);
  }, [collectionCategory]);
  const [sortBy, setSortBy] = useState("default");
  const [priceMax, setPriceMax] = useState(800);

  let filtered = PRODUCTS.filter(p=>{
    if(p.size === "Gift Set") return false;
    const isKhadlajProduct = p.col !== "Lafede";
    if(activeCat==="Khadlaj") return p.col !== "Lafede";
    if(activeCat==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
    if(activeCat==="New") return isKhadlajProduct && p.badge==="New";
    if(activeCat==="For Him") return isKhadlajProduct && p.gender==="Him";
    if(activeCat==="For Her") return isKhadlajProduct && p.gender==="Her";
    if(activeCat==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
    
    if(activeCat==="Perfume Oils") return isKhadlajProduct && (p.col==="Perfume Oils");
    if(activeCat==="EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
    if(activeCat==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";
    
    return isKhadlajProduct && p.col===activeCat;
  }).filter(p=>p.price<=priceMax);

  if(sortBy==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price);
  if(sortBy==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price);

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(300px,38vw,500px)",overflow:"hidden",background:"#251737"}}>
        {/* Background collage of product images */}
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,opacity:.5}}>
          {[
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422",
          ].map((src,i)=>(
            <div key={i} style={{overflow:"hidden",height:"100%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img decoding="async" src={getOptimizedImage(src,800)} alt="" style={{width:"86%",height:"86%",objectFit:"contain",objectPosition:"center"}}/>
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
          <h1 className="disp" style={{
            fontSize:"clamp(42px,6vw,88px)",fontWeight:400,
            color:"#fff",lineHeight:.95,letterSpacing:-2,marginBottom:20,
          }}>
            FRAGRANCE COLLECTIONS
          </h1>
          <p style={{
            color:"rgba(255,255,255,.6)",fontSize:14,
            fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,
            marginBottom:32,
          }}>
            {PRODUCTS.length} unique creations — from everyday luxury to rare extrait
          </p>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div style={{
        background:"#fff",borderBottom:"1px solid #E8E4DC",
        padding:"20px 5%",
        display:"flex",gap:12,alignItems:"center",justifyContent:"flex-end",flexWrap:"wrap",
        position:"sticky",top:0,zIndex:50,
        boxShadow:"0 2px 12px rgba(0,0,0,.05)",
      }}>
        {/* Sort + Price */}
        <div style={{display:"flex",gap:12,alignItems:"center",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:8.5,color:"#888",letterSpacing:0.8,fontFamily:"'Montserrat',sans-serif",whiteSpace:"nowrap"}}>Max {formatPrice(priceMax)}</span>
            <input type="range" min={50} max={800} value={priceMax} onChange={e=>setPriceMax(+e.target.value)}
              style={{width:90,accentColor:"#251737"}}/>
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            style={{
              background:"#fff",color:"#251737",
              border:"1px solid #E0E0E0",
              padding:"7px 12px",fontSize:9,cursor:"pointer",
              letterSpacing:0.8,fontFamily:"'Montserrat',sans-serif",
              outline:"none",
            }}>
            <option value="default">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div style={{padding:"32px 3% 80px"}}>
        <div className="collections-layout" style={{display:"grid",gridTemplateColumns:"278px minmax(0,1fr)",gap:34}}>
          <aside className="collections-sidebar" style={{width:278}}>
            <div style={{position:"sticky",top:100,border:"1px solid #E8E4DC",background:"linear-gradient(180deg,#fff 0%,#FFFCF7 100%)",padding:18,boxShadow:"0 18px 42px rgba(0,0,0,.045)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:18}}>
              <div>
                <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:6}}>Shop By</p>
                <p className="disp" style={{fontSize:22,lineHeight:1,color:"#251737",fontWeight:300}}>Collections</p>
              </div>
              <span style={{width:34,height:34,border:"1px solid #E5D6B5",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#B8922A",fontSize:15}}>+</span>
            </div>
            {CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setActiveCat(c)}
                style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,textAlign:"left",background:activeCat===c?"#251737":"rgba(255,255,255,.72)",color:activeCat===c?"#fff":"#444",border:"1px solid",borderColor:activeCat===c?"#251737":"#EEE",padding:"12px 12px",marginBottom:8,fontSize:10,letterSpacing:1.35,cursor:"pointer",fontWeight:activeCat===c?600:600,transition:"all .18s",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",boxShadow:activeCat===c?"0 10px 24px rgba(60,17,82,.22)":"none"}}
              >
                <span style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:activeCat===c?"#B8922A":"#D7C59E",display:"inline-block",flexShrink:0}}/>
                  {c}
                </span>
                <span style={{fontSize:9,letterSpacing:0,color:activeCat===c?"rgba(255,255,255,.65)":"#B8922A"}}>{PRODUCTS.filter(p=>{
                  if(p.size === "Gift Set") return false;
                  const isKhadlajProduct = p.col !== "Lafede";
                  if(c==="Khadlaj") return isKhadlajProduct;
                  if(c==="Best Sellers") return isKhadlajProduct && p.badge==="Best Seller";
                  if(c==="New") return isKhadlajProduct && p.badge==="New";
                  if(c==="For Him") return isKhadlajProduct && p.gender==="Him";
                  if(c==="For Her") return isKhadlajProduct && p.gender==="Her";
                  if(c==="Unisex") return isKhadlajProduct && p.gender==="Unisex";
                  
                  if(c==="Perfume Oils") return isKhadlajProduct && (p.col==="Perfume Oils");
                  if(c==="EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
                  if(c==="Master Perfumery") return isKhadlajProduct && p.col==="Master Perfumery";
                  
                  return isKhadlajProduct && p.col===c;
                }).length}</span>
              </button>
            ))}
            <button onClick={()=>setPage("lafede")}
              style={{width:"100%",textAlign:"left",background:"linear-gradient(135deg,#F8F1DE 0%,#fff 100%)",color:"#8A681F",border:"1px solid #E6D8B6",padding:"14px 12px",marginTop:12,fontSize:10,letterSpacing:1.4,cursor:"pointer",fontWeight:600,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",boxShadow:"inset 0 0 0 1px rgba(255,255,255,.55)"}}
            >
              La Fede Landing <span style={{float:"right",fontSize:12}}>{"->"}</span>
            </button>
            </div>
          </aside>

          <div>
            <p style={{fontSize:8.5,color:"#999",marginBottom:32,letterSpacing:1.6,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
              {filtered.length} fragrances found
            </p>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24,alignItems:"stretch"}} className="grid-4">
              {filtered.map(p=>(
                <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
              ))}
            </div>

            {filtered.length===0 && (
              <div style={{textAlign:"center",padding:"96px 0"}}>
                <p className="disp" style={{fontSize:36,fontWeight:300,color:"#251737",marginBottom:12}}>No fragrances found</p>
                <p style={{fontSize:13,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>Try adjusting the filters above.</p>
              </div>
            )}
          </div>
        </div>
      </div>

            <TrustBanner />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: PRODUCT DETAIL
═══════════════════════════════════════════════════════════════ */
function LaFedePage({ addToCart, setViewProduct, setPage }){
  const laFedeProducts = PRODUCTS.filter(p=>p.col==="Lafede");
  const [laFedeFilter, setLaFedeFilter] = useState("featured");
  const visibleLaFedeProducts = applyProductFilter(laFedeProducts, laFedeFilter);
  const filterOptions = [
    {value:"featured",label:"Featured"},
    {value:"new",label:"New"},
    {value:"top",label:"Top Selling"},
    {value:"value",label:"Value Picks"},
  ];
  return (
    <div style={{background:"#fff"}}>
      <section style={{position:"relative",minHeight:"clamp(280px,32vw,420px)",display:"grid",gridTemplateColumns:"1fr .9fr",alignItems:"center",gap:24,padding:"44px 6%",background:"#080808",overflow:"hidden"}} className="hero-split">
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 74% 45%, rgba(184,146,42,.18), transparent 34%), linear-gradient(135deg,#060606 0%,#101010 54%,#050505 100%)"}}/>
        <div style={{position:"absolute",top:"-25%",bottom:"-25%",left:"44%",width:120,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)",animation:"lafedeSweep 5.8s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2}}>
          <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Dedicated Collection</p>
          <h1 className="disp" style={{fontSize:"clamp(40px,5.5vw,74px)",fontWeight:300,color:"#fff",lineHeight:.95,marginBottom:16}}>La Fede</h1>
          <p style={{color:"rgba(255,255,255,.68)",fontSize:13,maxWidth:480,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif",marginBottom:24}}>
            A separate space for expressive La Fede fragrances, kept apart from the main Khadlaj collection for clearer browsing.
          </p>
          <button className="btn-gold" onClick={()=>setPage("collections")}>Back to Khadlaj</button>
        </div>
        <div style={{position:"relative",zIndex:2,minHeight:280,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"absolute",width:"70%",height:"72%",borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.22),rgba(184,146,42,0) 68%)",animation:"lafedeGlow 4.5s ease-in-out infinite"}}/>
          <img decoding="async" src={getOptimizedImage("/assets/images/products/intoxicate-mystique-cutout.png",700)} alt="La Fede Intoxicate Mystique" style={{height:"min(330px,28vw)",maxHeight:330,width:"auto",objectFit:"contain",filter:"drop-shadow(0 24px 52px rgba(0,0,0,.45))",animation:"lafedeFloat 4.6s ease-in-out infinite"}}/>
          <img decoding="async" src={getOptimizedImage("/assets/images/products/uno-intimo-cutout.png",700)} alt="La Fede Uno Intimo" style={{position:"absolute",right:"8%",bottom:"4%",height:"min(220px,19vw)",maxHeight:220,width:"auto",objectFit:"contain",filter:"drop-shadow(0 22px 40px rgba(0,0,0,.35))",animation:"lafedeFloatSmall 5.2s ease-in-out infinite"}}/>
        </div>
      </section>

      <section style={{padding:"76px 5% 96px"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,flexWrap:"wrap",marginBottom:40}}>
          <div>
            <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>La Fede</p>
            <h2 className="disp" style={{fontSize:"clamp(34px,4.5vw,64px)",fontWeight:300,color:"#251737",lineHeight:1.05,letterSpacing:-1,marginBottom:12}}>La Fede Eau De Parfum</h2>
            <p style={{fontSize:13,color:"#777",fontFamily:"'Montserrat',sans-serif",lineHeight:1.8,maxWidth:560}}>Bold, characterful fragrances presented in their own collection.</p>
          </div>
          <ProductFilterBar active={laFedeFilter} setActive={setLaFedeFilter} options={filterOptions}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24,alignItems:"stretch",marginTop:40}} className="grid-4">
          {visibleLaFedeProducts.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>
      </section>
    </div>
  );
}

function Accordion({ title, children, defaultOpen=false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{borderBottom:"1px solid #E8E4DC"}}>
      <button 
        onClick={()=>setOpen(!open)}
        style={{
          width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"20px 0", background:"transparent", border:"none", cursor:"pointer",
          fontSize:12, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif",
          fontWeight:600, color:"#251737"
        }}
      >
        <span>{title}</span>
        <span style={{fontSize:18, fontWeight:300}}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{paddingBottom:24, fontSize:14, color:"#555", lineHeight:1.8, fontFamily:"'Montserrat',sans-serif"}}>
          {children}
        </div>
      )}
    </div>
  );
}

function ProductFilterBar({ active, setActive, options }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:8,flexWrap:"wrap"}}>
      {options.map(opt=>(
        <button key={opt.value} onClick={()=>setActive(opt.value)}
          style={{
            background:active===opt.value ? "#111" : "#fff",
            color:active===opt.value ? "#fff" : "#111",
            border:"1px solid",
            borderColor:active===opt.value ? "#111" : "#E1D7C7",
            padding:"11px 16px",
            fontSize:9,
            letterSpacing:1.8,
            textTransform:"uppercase",
            fontFamily:"'Montserrat',sans-serif",
            fontWeight:600,
            cursor:"pointer",
            transition:"all .2s ease",
            whiteSpace:"nowrap",
          }}
        >{opt.label}</button>
      ))}
    </div>
  );
}

function applyProductFilter(products, filter) {
  if (filter === "new") {
    const fresh = products.filter(p=>p.badge==="New");
    return fresh.length ? fresh : products.slice(0,4);
  }
  if (filter === "top") return [...products].sort((a,b)=>{
    const badgeScore = (p) => p.badge==="Best Seller" ? 1000 : 0;
    return (badgeScore(b)+b.price) - (badgeScore(a)+a.price);
  }).slice(0,4);
  if (filter === "value") return [...products].sort((a,b)=>a.price-b.price).slice(0,4);
  if (filter === "featured") return products.slice(0,4);
  return products;
}

function ProductPage({ product, addToCart, setPage, setViewProduct }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const related = PRODUCTS.filter(p=>p.col===product.col && p.id!==product.id).slice(0,3);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });
  
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(2)" });
  };
  
  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: "center center", transform: "scale(1)" });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Khadlaj Perfumes`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {}
  };
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
      
      {/* ── Breadcrumbs ── */}
      <div style={{padding:"32px 5% 0", maxWidth:1440, margin:"0 auto", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:"#888", fontFamily:"'Montserrat',sans-serif"}}>
        <span style={{cursor:"pointer", color:"#251737", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#B8922A"} onMouseLeave={e=>e.currentTarget.style.color="#251737"} onClick={()=>setPage("home")}>Home</span>
        <span style={{margin:"0 12px", color:"#ddd"}}>|</span>
        <span style={{cursor:"pointer", color:"#251737", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#B8922A"} onMouseLeave={e=>e.currentTarget.style.color="#251737"} onClick={()=>setPage("collections")}>Collections</span>
        <span style={{margin:"0 12px", color:"#ddd"}}>|</span>
        <span>{product.name}</span>
      </div>

      {/* ── Main Product Section ── */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"40px 5% 120px"}}>
        <div className="product-layout-grid">
          
          {/* ── Left: Advanced Interactive Gallery ── */}
          <div className="product-layout-images">
            {(() => {
              const images = product.detailImages || [product.img];
              return (
                <div className="product-gallery-wrapper" style={{display:"flex", gap:24, width:"100%"}}>
                  {/* Thumbnails */}
                  <div className="product-thumbnails" style={{display:"flex", flexDirection:"column", gap:12, width:80, flexShrink:0}}>
                    {images.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveImageIndex(i)}
                        style={{
                          width:80, height:80, flexShrink:0,
                          border: activeImageIndex === i ? "2px solid #B8922A" : "1px solid #ddd", 
                          borderRadius: 8, 
                          overflow:"hidden", 
                          cursor:"pointer", 
                          display:"flex", alignItems:"center", justifyContent:"center", 
                          background:"#FAFAFA",
                          transition:"border-color 0.2s"
                        }}
                      >
                        <img decoding="async" src={getOptimizedImage(imgUrl,700)} style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"multiply"}} alt="Thumbnail" />
                      </div>
                    ))}
                  </div>

                  {/* Main Viewer */}
                  <div 
                    style={{flex:1, aspectRatio:"4/5", background:"#FAFAFA", borderRadius:8, position:"relative", overflow:"hidden", cursor:"crosshair"}}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img decoding="async" 
                      src={images[activeImageIndex]} 
                      alt={product.name} 
                      style={{
                        width:"100%", height:"100%", 
                        objectFit:"contain", padding:"5%", mixBlendMode:"multiply", filter:"contrast(1.05)",
                        transition:"transform 0.1s ease-out",
                        ...zoomStyle
                      }} 
                    />

                    {/* Share Button Overlay */}
                    <div 
                      onClick={(e) => { e.stopPropagation(); handleShare(); }}
                      style={{
                        position:"absolute", top:16, right:16, 
                        width:40, height:40, borderRadius:"50%", background:"#fff", 
                        display:"flex", alignItems:"center", justifyContent:"center", 
                        boxShadow:"0 4px 12px rgba(0,0,0,0.1)", cursor:"pointer",
                        zIndex:10, transition:"transform 0.2s"
                      }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#251737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ── Rich Product Story Section (Under Image) ── */}
          <div className="product-layout-story">
              <h2 style={{fontSize:28, fontFamily:"'Cinzel', serif", fontWeight:400, color:"#111", marginBottom:24, letterSpacing:1}}>The Story of {product.name}</h2>
              {Array.isArray(product.desc) ? (
                product.desc.map((para, i) => (
                  <p key={i} style={{marginBottom:24, fontSize:15, lineHeight:1.8, color:"#444", fontWeight:300, fontFamily:"'Montserrat',sans-serif", display: (!storyExpanded && i > 0) ? 'none' : 'block'}} dangerouslySetInnerHTML={{__html: para}} />
                ))
              ) : (
                <>
                  <p style={{marginBottom:24, fontSize:15, lineHeight:1.8, color:"#444", fontWeight:300, fontFamily:"'Montserrat',sans-serif", WebkitLineClamp: storyExpanded ? 'unset' : 4, WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden'}}>
                    {product.desc || `Experience the timeless elegance of ${product.name}. Crafted with precision and the finest ingredients, this fragrance is a true testament to the art of Arabian perfumery.`}
                  </p>
                </>
              )}
              
              <button 
                onClick={() => setStoryExpanded(!storyExpanded)}
                style={{
                  background: 'none', border: 'none', color: '#111', fontSize: 13, fontWeight: 600, 
                  textTransform: 'uppercase', letterSpacing: 1, padding: 0, borderBottom: '1px solid #111', 
                  cursor: 'pointer', marginBottom: 24, transition: 'opacity 0.2s'
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity=0.7}
                onMouseLeave={e=>e.currentTarget.style.opacity=1}
              >
                {storyExpanded ? 'Read Less' : 'Read More'}
              </button>

              {/* Fragrance Profile Visual Grid */}
              <h3 style={{fontSize:18, fontFamily:"'Montserrat',sans-serif", fontWeight:500, color:"#111", marginTop:48, marginBottom:24, textTransform:"uppercase", letterSpacing:2}}>Olfactory Profile</h3>
              
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:16}}>
                {/* Top Notes */}
                <div style={{background:"#FAFAFA", padding:24, borderRadius:8, textAlign:"center", border:"1px solid #eee"}}>
                  <div style={{fontSize:10, textTransform:"uppercase", letterSpacing:2, color:"#B8922A", marginBottom:8, fontWeight:600}}>Top Notes</div>
                  <div style={{fontSize:14, color:"#111", fontFamily:"'Montserrat',sans-serif", fontWeight:400}}>
                    {product.notes && product.notes.length >= 1 ? product.notes[0] : "Bergamot, Citrus"}
                  </div>
                </div>
                {/* Heart Notes */}
                <div style={{background:"#FAFAFA", padding:24, borderRadius:8, textAlign:"center", border:"1px solid #eee"}}>
                  <div style={{fontSize:10, textTransform:"uppercase", letterSpacing:2, color:"#B8922A", marginBottom:8, fontWeight:600}}>Heart Notes</div>
                  <div style={{fontSize:14, color:"#111", fontFamily:"'Montserrat',sans-serif", fontWeight:400}}>
                    {product.notes && product.notes.length >= 2 ? product.notes[1] : "Floral, Jasmine"}
                  </div>
                </div>
                {/* Base Notes */}
                <div style={{background:"#FAFAFA", padding:24, borderRadius:8, textAlign:"center", border:"1px solid #eee"}}>
                  <div style={{fontSize:10, textTransform:"uppercase", letterSpacing:2, color:"#B8922A", marginBottom:8, fontWeight:600}}>Base Notes</div>
                  <div style={{fontSize:14, color:"#111", fontFamily:"'Montserrat',sans-serif", fontWeight:400}}>
                    {product.notes && product.notes.length >= 3 ? product.notes[2] : "Musk, Amber, Wood"}
                  </div>
                </div>
              </div>
            </div>
          
          {/* ── Right: Minimalist Product Details (Sticky) ── */}
          <div className="product-layout-details">
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

             {/* PRICE & STOCK */}
             <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:8}}>
               <p style={{fontSize:22, fontWeight:300, color:"#111", fontFamily:"'Montserrat',sans-serif", margin:0}}>{formatPrice(product.price)}</p>
               <span style={{fontSize:12, color:"#2E7D32", fontFamily:"'Montserrat',sans-serif", fontWeight:500}}>In Stock</span>
             </div>
             <p style={{fontSize:11, color:"#888", fontFamily:"'Montserrat',sans-serif", marginBottom:24}}>Tax included. Shipping calculated at checkout.</p>

             {/* SHORT DESCRIPTION EXCERPT */}
             <div style={{fontSize:15, lineHeight:1.8, color:"#444", fontWeight:300, fontFamily:"'Montserrat',sans-serif", marginBottom:32}}>
               {Array.isArray(product.desc) 
                  ? <span dangerouslySetInnerHTML={{__html: product.desc[0]}} /> 
                  : (product.desc ? product.desc.substring(0, 150) + "..." : "Experience the timeless elegance of " + product.name + ".")}
               <span onClick={()=>window.scrollTo({top: document.body.scrollHeight/2, behavior:'smooth'})} style={{color:"#111", borderBottom:"1px solid #111", cursor:"pointer", marginLeft:8, fontWeight:400}}>Read more</span>
             </div>

             {/* ACTIONS (Qty + Add to Cart + Wishlist) */}
             <div style={{display:"flex", gap:16, marginBottom:16, flexWrap:"wrap"}}>
               {/* Premium Quantity */}
               <div style={{display:"flex", alignItems:"center", border:"1px solid #eaeaea", borderRadius:4, width:110, height:48, background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.02)"}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:18, cursor:"pointer", color:"#888", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#111"} onMouseLeave={e=>e.currentTarget.style.color="#888"}>−</button>
                  <span style={{flex:1, textAlign:"center", fontSize:14, fontFamily:"'Montserrat',sans-serif", fontWeight:600, color:"#111"}}>{qty}</span>
                  <button onClick={()=>setQty(q=>q+1)} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:18, cursor:"pointer", color:"#888", transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#111"} onMouseLeave={e=>e.currentTarget.style.color="#888"}>+</button>
               </div>
               
               {/* Sleek Add to Bag */}
               <button 
                 onClick={handleAdd} 
                 style={{
                   flex:1, minWidth:200, height:48, background:"#111", color:"#fff", border:"none", borderRadius:4,
                   fontSize:12, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", 
                   fontFamily:"'Montserrat',sans-serif", cursor:"pointer", transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                   boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
                 }} 
                 onMouseEnter={e=>{e.currentTarget.style.background="#333"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.2)";}} 
                 onMouseLeave={e=>{e.currentTarget.style.background="#111"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.15)";}}
               >
                 {added ? "Added to Bag" : "Add to Bag"}
               </button>

               {/* Premium Buy Now Button */}
               <button 
                 onClick={() => { handleAdd(); setPage("cart"); }} 
                 style={{
                   flex:1, minWidth:200, height:48, background:"linear-gradient(135deg, #B8922A 0%, #E6C875 50%, #B8922A 100%)", color:"#fff", border:"none", borderRadius:4,
                   fontSize:12, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", backgroundSize:"200% auto",
                   fontFamily:"'Montserrat',sans-serif", cursor:"pointer", transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                   boxShadow: "0 4px 15px rgba(184,146,42,0.3)"
                 }} 
                 onMouseEnter={e=>{e.currentTarget.style.backgroundPosition="right center"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 25px rgba(184,146,42,0.5)";}} 
                 onMouseLeave={e=>{e.currentTarget.style.backgroundPosition="left center"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 15px rgba(184,146,42,0.3)";}}
               >
                 Buy Now
               </button>

               {/* Wishlist Button */}
               <button 
                 onClick={()=>alert("Added to Wishlist!")}
                 style={{
                   width:48, height:48, background:"#fff", color:"#111", border:"1px solid #eaeaea", borderRadius:4,
                   display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.3s ease",
                   boxShadow:"0 2px 8px rgba(0,0,0,0.02)"
                 }}
                 onMouseEnter={e=>{e.currentTarget.style.borderColor="#111"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)";}}
                 onMouseLeave={e=>{e.currentTarget.style.borderColor="#eaeaea"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.02)";}}
                 title="Add to Wishlist"
               >
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
               </button>
             </div>

             {/* EXPRESS CHECKOUT BUTTONS */}
             <button 
               onClick={()=>alert("Redirecting to PayPal Checkout...")}
               style={{
                 width:"100%", height:48, background:"#FFC439", color:"#111", border:"none", borderRadius:4,
                 fontSize:14, fontWeight:600, cursor:"pointer", transition:"background 0.3s", fontFamily:"Arial, sans-serif",
                 display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:8
               }}
               onMouseEnter={e=>e.currentTarget.style.background="#F4B82A"}
               onMouseLeave={e=>e.currentTarget.style.background="#FFC439"}
             >
               Pay with <strong style={{color:"#003087", fontStyle:"italic", fontSize:18, display:"inline-flex", gap:2}}>PayPal</strong>
             </button>
             <button 
               style={{
                 width:"100%", height:40, background:"#fff", color:"#111", border:"1px solid #ddd", borderRadius:4,
                 fontSize:12, fontWeight:500, cursor:"pointer", transition:"background 0.3s", fontFamily:"'Montserrat',sans-serif",
                 marginBottom:32
               }}
               onMouseEnter={e=>e.currentTarget.style.background="#FAFAFA"}
               onMouseLeave={e=>e.currentTarget.style.background="#fff"}
             >
               More Payment Options
             </button>

             {/* REWARDS GAMIFICATION BOX */}
             <div style={{border:"1px solid #eee", borderRadius:8, padding:20, marginBottom:32, background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.02)"}}>
               <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
                 <div style={{width:32, height:32, background:"#FFF3E0", color:"#FF9800", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center"}}>
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                 </div>
                 <div>
                   <p style={{fontSize:12, fontWeight:600, color:"#111", fontFamily:"'Montserrat',sans-serif", margin:0}}>Free Gift</p>
                   <p style={{fontSize:10, color:"#888", fontFamily:"'Montserrat',sans-serif", margin:0, marginTop:2}}>0 of 1 is ready to claim</p>
                 </div>
               </div>
               <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
                 <p style={{fontSize:12, color:"#111", fontFamily:"'Montserrat',sans-serif", fontWeight:500, margin:0, maxWidth:"60%"}}>Spend at least {formatPrice(250)} to get rewards</p>
                 <span style={{background:"#2E7D32", color:"#fff", padding:"4px 10px", borderRadius:12, fontSize:10, fontWeight:600, fontFamily:"'Montserrat',sans-serif"}}>Special Reward</span>
               </div>
               <p style={{fontSize:11, color:"#555", fontFamily:"'Montserrat',sans-serif", marginBottom:8}}>Buy {formatPrice(Math.max(0, 250 - product.price))} more to unlock this reward</p>
               <div style={{width:"100%", height:6, background:"#eee", borderRadius:3, overflow:"hidden"}}>
                 <div style={{width:`${Math.min(100, (product.price / 250)*100)}%`, height:"100%", background:"#2E7D32", borderRadius:3}}></div>
               </div>
             </div>

             {/* FREQUENTLY BOUGHT TOGETHER (Minimalist) */}
             <div style={{marginBottom:48, paddingTop:24, borderTop:"1px solid #eee"}}>
               <h3 style={{fontSize:11, fontWeight:500, color:"#555", textTransform:"uppercase", letterSpacing:1.5, marginBottom:24, fontFamily:"'Montserrat',sans-serif"}}>Frequently Bought Together</h3>
               <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:24}}>
                  <div style={{width:56, height:56, background:"#FAFAFA", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img loading="lazy" decoding="async" src={getOptimizedImage(product.img,700)} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt="Product 1" />
                  </div>
                  <span style={{fontSize:14, color:"#ccc", fontWeight:300}}>+</span>
                  <div style={{width:56, height:56, background:"#FAFAFA", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img decoding="async" src={getOptimizedImage(PRODUCTS[4].img,700)} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt="Product 2" />
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
               <Accordion title="Shipping & Returns" defaultOpen>
                 <p style={{fontSize:13, lineHeight:1.6, color:"#444", fontWeight:300}}>Orders are processed within 1-2 business days. Free shipping on all orders over AED 200 within the UAE. International shipping rates apply and will be calculated at checkout.</p>
               </Accordion>
             </div>

             {/* PAYMENT ICONS */}
             <div style={{marginTop:32, paddingTop:24, borderTop:"1px solid #eee", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap"}}>
               <span style={{fontSize: 18, fontWeight: 900, color: '#1a1f71', fontStyle: 'italic', letterSpacing: '-0.5px', marginRight: 4, fontFamily: 'Arial, sans-serif'}}>VISA</span>
               <img decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height="20" alt="Mastercard" style={{objectFit:"contain"}}/>
               <img decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" height="24" alt="Apple Pay" style={{objectFit:"contain"}}/>
               <img decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height="16" alt="PayPal" style={{objectFit:"contain"}}/>
             </div>
          </div>
        </div>
      </div>

      {/* ── UPSELL SECTION (Dark Theme) ── */}
      <div style={{background:"#251737", padding:"80px 5%", color:"#fff", marginBottom:80}}>
        <div style={{maxWidth:1000, margin:"0 auto", display:"flex", gap:48, alignItems:"center", flexWrap:"wrap"}}>
          <div style={{width:200, height:250, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden"}}>
            <img decoding="async" src={getOptimizedImage(PRODUCTS[1].img,700)} style={{maxHeight:"90%", maxWidth:"90%", objectFit:"contain", mixBlendMode:"multiply"}} alt={PRODUCTS[1].name} />
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

      {/* ── Related Products ── */}
      {related.length>0 && (
        <div style={{padding:"0 5% 104px"}}>
          <SectionHeader eyebrow="◈ · Handpicked For You" title="You May Also Like" light/>
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

/* ═══════════════════════════════════════════════════════════════
   PAGE: GIFT SETS
═══════════════════════════════════════════════════════════════ */
function GiftsPage({ addToCart, setViewProduct, setPage }){
  // Pull gift set products directly from PRODUCTS array (size === "Gift Set")
  const giftProducts = PRODUCTS.filter(p => p.size === "Gift Set");
  const [giftFilter, setGiftFilter] = useState("featured");
  const visibleGiftProducts = applyProductFilter(giftProducts, giftFilter);
  const giftFilterOptions = [
    {value:"featured",label:"Featured"},
    {value:"new",label:"New"},
    {value:"top",label:"Top Selling"},
    {value:"value",label:"Value Sets"},
  ];

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{width:"100%",background:"#251737"}}>
        <img
          src="/assets/images/banners/my-paradise-banner.png"
          alt="Gift Sets"
          style={{width:"100%",height:"auto",display:"block"}}
        />
      </div>

      {/* ── Live Gift Set Products (from PRODUCTS) ── */}
      <section style={{padding:"80px 5%",background:"#fff"}}>
        <div className="max-container">
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:52}}>
            <div>
              <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Curated Collections</p>
              <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#251737",letterSpacing:-1,lineHeight:1.05}}>
                Gift Sets &amp; <em style={{fontStyle:"italic",color:"#B8922A"}}>Bundles</em>
              </h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12}}>
              <p style={{fontSize:12,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>{visibleGiftProducts.length} of {giftProducts.length} gift sets</p>
              <ProductFilterBar active={giftFilter} setActive={setGiftFilter} options={giftFilterOptions}/>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24,alignItems:"stretch"}} className="grid-4">
            {visibleGiftProducts.map(p=>(
              <ProductCard key={p.id} p={p} onView={(prod)=>{if(setViewProduct){setViewProduct(prod);setPage("product");}}} onCart={addToCart}/>
            ))}
          </div>
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

      {/* ── Minimal Luxury Hero ── */}
      <div style={{position:"relative",height:"clamp(280px, 40vw, 400px)",background:"#251737",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 5%"}}>
        <div>
          <h1 className="disp" style={{fontSize:"clamp(40px,7vw,80px)",fontWeight:400,color:"#C8A97E",lineHeight:1.1,letterSpacing:4,marginBottom:16,textTransform:"uppercase"}}>
            Our Legacy
          </h1>
          <p style={{fontWeight:500,fontSize:10,letterSpacing:8,color:"#fff",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",opacity:0.8}}>
            Luxury & Elegance in every fragrance creation
          </p>
        </div>
      </div>

      {/* ── Brand Story & Video Section ── */}
      <div style={{background:"#FAFAFA", padding:"clamp(60px, 10vw, 120px) 5%"}}>
        <div className="max-container hero-split" style={{display:"grid", gridTemplateColumns:"1fr 1.1fr", gap:"clamp(40px, 8vw, 100px)", alignItems:"center"}}>
          
          {/* Text Content */}
          <div style={{display:"flex", flexDirection:"column", gap:"24px"}}>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:400,color:"#111",lineHeight:1.1}}>
              Khadlaj Perfumes
            </h2>
            <p style={{fontSize:"15px", color:"#555", lineHeight:2.2, fontFamily:"'Montserrat',sans-serif", textAlign:"justify"}}>
              Khadlaj Perfumes, established in January 1997, is a UAE-based perfume house specializing in bespoke Arabic and French fragrances, including renowned home ambiance fragrances. We are dedicated to embodying luxury and elegance in every fragrance creation.
            </p>
            <p style={{fontSize:"15px", color:"#555", lineHeight:2.2, fontFamily:"'Montserrat',sans-serif", textAlign:"justify"}}>
              Our specialties include Dehn Al Oud, rose, and musk, and we also offer high-quality niche fragrances. With a legacy spanning 29 years of creating high-quality fragrances, our brand has a global presence in over 80 countries and 15 showrooms—7 in the UAE and 8 in Oman. Additionally, Khadlaj Perfumes holds trademarks across most continents.
            </p>
          </div>

          {/* Video Content */}
          <div style={{position:"relative", borderRadius:"4px", overflow:"hidden", boxShadow:"0 30px 60px rgba(0,0,0,0.12)", aspectRatio:"4/5", width:"100%", maxWidth:"540px", margin:"0 auto"}}>
            <video 
              autoPlay muted loop playsInline 
              style={{width:"100%", height:"100%", objectFit:"cover"}}
            >
              <source src="https://cdn.shopify.com/videos/c/o/v/eedca68692644b0991d51fb3427d1bf4.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>

      {/* ── Founder Story (Redesigned) ── */}
      <div style={{background:"#23152d", position:"relative", padding:"60px 5% 0px", display:"flex", flexDirection:"column", alignItems:"center"}}>
        
        {/* Star Sparkle Icon */}
        <div style={{position:"absolute", top:"-24px", left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"flex-start", gap:"4px"}}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#D3B787"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"18px"}}>
            <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#D3B787"/>
          </svg>
        </div>

        <div className="max-container hero-split" style={{display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:"clamp(40px, 6vw, 80px)", alignItems:"center", width:"100%"}}>
          
          {/* Founder Image (Left) */}
          <div style={{position:"relative", transform:"translateY(30px)", zIndex:10}}>
            <img loading="lazy" decoding="async" src={getOptimizedImage("/assets/images/people/founder-mohamed-iqbal.png",600)}
              alt="Mohamed Iqbal Abdul Sattar" style={{width:"100%",height:"auto",display:"block",boxShadow:"0 20px 40px rgba(0,0,0,0.4)"}}/>
          </div>

          {/* Text Content (Right) */}
          <div style={{display:"flex", flexDirection:"column", gap:"24px", paddingBottom:"60px", paddingTop:"20px"}}>
            
            <div style={{borderLeft:"2px solid #fff", paddingLeft:"20px", display:"flex", flexDirection:"column", gap:"8px"}}>
              <p style={{fontSize:"13px", color:"#fff", fontFamily:"'Montserrat',sans-serif", margin:0}}>
                Founder and Master Perfumer
              </p>
              <h2 style={{fontSize:"clamp(26px, 3vw, 36px)", fontWeight:400, color:"#fff", fontFamily:"'Montserrat',sans-serif", margin:0, letterSpacing:"0.5px"}}>
                Mohamed Iqbal Abdul Sattar
              </h2>
            </div>
            
            <p style={{color:"rgba(255,255,255,0.85)",lineHeight:1.9,fontSize:14,fontFamily:"'Montserrat',sans-serif",textAlign:"left"}}>
              Mohamed Iqbal Abdul Sattar, with over 45 years of experience in perfumery, is the esteemed founder and master perfumer of Khadlaj Perfumes. He is recognized for his creation of some of our most cherished and opulent fragrances, including the iconic Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. Mohamed’s unparalleled expertise encompasses both exquisite natural essences and meticulously crafted synthetic compounds, with an ardent passion for ingredients such as Musk, Ruh Gulaab, oud, and vetiver. His profound knowledge and unwavering commitment to uncompromising excellence epitomize Khadlaj Perfumes' dedication to crafting extraordinary and enduring fragrances.
            </p>
          </div>
        </div>
      </div>

      <div style={{padding:"80px 5%"}}>

        {/* Managing Director */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          
          <div style={{paddingRight: "24px"}}>
            <div style={{borderLeft: "2px solid #251737", paddingLeft: "16px", marginBottom: "24px"}}>
              <p style={{fontSize: 14, color: "#251737", fontFamily: "'Montserrat', sans-serif", letterSpacing: 0.5, marginBottom: 8}}>
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
            <img loading="lazy" decoding="async" src={getOptimizedImage("/assets/images/people/managing-director-asif.png",600)}
              alt="Asif Mohamed Iqbal Katchi" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
          </div>

        </div>
        {/* Head Office & Manufacturing Unit */}
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:88}}>
          <div style={{textAlign:"center", maxWidth:800, marginBottom:48}}>
            <h2 className="disp" style={{fontSize:"clamp(32px, 4vw, 42px)", fontWeight:300, color:"#251737", lineHeight:1.2, margin:0, fontFamily:"'Montserrat', sans-serif"}}>
              Head Office &amp; Manufacturing Unit
            </h2>
            <p style={{color: "#555", lineHeight: 1.8, fontSize: 15, fontFamily: "'Montserrat', sans-serif"}}>
              At Khadlaj Perfumes, our operations are supported by state-of-the-art facilities and a strategic head office location:
            </p>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, width:"100%"}} className="hero-split">
            {/* Manufacturing Unit */}
            <div style={{background:"#FAFAFA", borderRadius:"8px", overflow:"hidden", boxShadow:"0 20px 40px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", transition:"transform 0.3s ease", cursor:"default"}} onMouseEnter={e => e.currentTarget.style.transform="translateY(-10px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              <div style={{height: 280, overflow:"hidden"}}>
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1580982327559-c1202864eb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Manufacturing Unit" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
              </div>
              <div style={{padding:"32px 32px", flex:1, display:"flex", flexDirection:"column", background:"#fff"}}>
                <h3 style={{fontSize:22, fontWeight:600, color:"#111", fontFamily:"'Montserrat', sans-serif", marginBottom:16}}>Manufacturing Unit</h3>
                <p style={{fontSize:14, color:"#666", lineHeight:1.8, fontFamily:"'Montserrat', sans-serif", margin:0, textAlign:"justify"}}>
                  Located in Ras Al Khaimah, our manufacturing facility is certified under ISO 9001: 2015 standards. Here, stringent quality control measures ensure that every product meets our exacting standards. Our production processes prioritize the use of authentic components to create high-quality fragrances, free from microbial or hazardous contaminants.
                </p>
              </div>
            </div>

            {/* Head Office */}
            <div style={{background:"#FAFAFA", borderRadius:"8px", overflow:"hidden", boxShadow:"0 20px 40px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", transition:"transform 0.3s ease", cursor:"default"}} onMouseEnter={e => e.currentTarget.style.transform="translateY(-10px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              <div style={{height: 280, overflow:"hidden"}}>
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Head Office" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
              </div>
              <div style={{padding:"32px 32px", flex:1, display:"flex", flexDirection:"column", background:"#fff"}}>
                <h3 style={{fontSize:22, fontWeight:600, color:"#111", fontFamily:"'Montserrat', sans-serif", marginBottom:16}}>Head Office</h3>
                <p style={{fontSize:14, color:"#666", lineHeight:1.8, fontFamily:"'Montserrat', sans-serif", margin:0, textAlign:"justify"}}>
                  Situated in Sharjah, our head office serves as the central hub for our global operations. From here, we oversee product development, marketing strategies, and customer relations. Our team is committed to innovation and excellence, ensuring that every aspect of our business reflects the values of Khadlaj Perfumes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values & Ethos + Our Motto Banner */}
        <div style={{background:"#251737", margin:"0 -5.5% 88px", padding:"80px 5.5%", color:"#fff"}}>
          <div className="max-container" style={{display:"flex", flexDirection:"column", gap:80}}>
            
            {/* Values & Ethos */}
            <div className="hero-split" style={{display:"grid", gridTemplateColumns:"0.8fr 1.2fr", gap:48}}>
              <div>
                <h2 className="disp" style={{fontSize:"clamp(32px, 4vw, 42px)", fontWeight:300, color:"#fff", lineHeight:1.2, margin:0, fontFamily:"'Montserrat', sans-serif"}}>
                  Values &amp; Ethos
                </h2>
                <p style={{color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 14, fontFamily: "'Montserrat', sans-serif"}}>
                  At Khadlaj Perfumes, we are guided by fundamental values that define our commitment to excellence:
                </p>
              </div>

              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:16}}>
                {[
                  { title: "Experience", text: "We continuously strive to understand customer needs and exceed expectations.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                  { title: "Integrity", text: "We adhere to our morals and maintain transparency in all our dealings.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { title: "Heritage", text: "We honor our origins and uphold the legacy of our home.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M12 2v8"/><path d="M8 5l4-3 4 3"/></svg> },
                  { title: "Trust", text: "We are dedicated to fostering faith and confidence in our customers.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                  { title: "Loyalty", text: "We prioritize building lasting, loyal relationships with our customers.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { title: "Quality", text: "We set high standards and strive for excellence in every fragrance we create.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg> }
                ].map(item => (
                  <div key={item.title} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:24, transition:"all 0.3s ease"}} onMouseEnter={e => {e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(200,169,126,0.3)";}} onMouseLeave={e => {e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";}}>
                    <div style={{marginBottom:16}}>{item.icon}</div>
                    <h4 style={{fontSize:15, fontWeight:600, color:"#fff", fontFamily:"'Montserrat', sans-serif", marginBottom:8}}>{item.title}</h4>
                    <p style={{fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.6, fontFamily:"'Montserrat', sans-serif", margin:0}}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{width:"100%", height:1, background:"rgba(255,255,255,0.06)"}}/>

            {/* Our Motto */}
            <div>
              <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:32}}>
                <h2 className="disp" style={{fontSize:"clamp(32px, 4vw, 42px)", fontWeight:300, color:"#fff", lineHeight:1.2, margin:0, fontFamily:"'Montserrat', sans-serif"}}>
                  Our Motto
                </h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>

              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:24}}>
                {/* Vision Card */}
                <div style={{position:"relative", overflow:"hidden", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)", padding:"40px 32px"}}>
                  <div style={{position:"absolute", top:0, left:0, width:"4px", height:"100%", background:"#C8A97E"}}/>
                  <h3 style={{fontSize:24, fontWeight:400, color:"#fff", fontFamily:"'Montserrat', sans-serif", marginBottom:16}}>Our vision</h3>
                  <p style={{fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.8, fontFamily:"'Montserrat', sans-serif", margin:0}}>
                    Our vision is to be a trusted name in the perfume industry and make our presence known in every household worldwide.
                  </p>
                </div>

                {/* Mission Card */}
                <div style={{position:"relative", overflow:"hidden", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)", padding:"40px 32px"}}>
                  <div style={{position:"absolute", top:0, left:0, width:"4px", height:"100%", background:"#C8A97E"}}/>
                  <h3 style={{fontSize:24, fontWeight:400, color:"#fff", fontFamily:"'Montserrat', sans-serif", marginBottom:16}}>Our mission</h3>
                  <p style={{fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.8, fontFamily:"'Montserrat', sans-serif", margin:0}}>
                    Our mission is to spread our wings across the globe gradually by opening up outlets across the GCC and worldwide.
                  </p>
                </div>
              </div>
            </div>

          </div>
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
      <div style={{position:"relative",height:"clamp(280px,36vw,440px)",overflow:"hidden",background:"#1A1025"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 76% 46%, rgba(184,146,42,.18), rgba(184,146,42,0) 30%), linear-gradient(135deg,#130b1b 0%,#251737 58%,#0e0814 100%)"}}/>
        <div style={{position:"absolute",right:"7%",top:"7%",bottom:"7%",width:"42%",display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
          <img
            src="/assets/images/products/zayaan-silver_transparent.png"
            alt="Zayaan Silver perfume bottle"
            style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center center",opacity:.78,filter:"drop-shadow(0 34px 60px rgba(0,0,0,.55))"}}
          />
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(37,23,55,.88) 0%,rgba(37,23,55,.64) 42%,rgba(37,23,55,.22) 100%)"}}/>
        <div style={{
          position:"absolute",inset:0,zIndex:2,
          display:"flex",flexDirection:"column",
          justifyContent:"flex-end",
          padding:"0 6% 52px",
        }}>
          <p style={{fontWeight:600,fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>
            Get in Touch
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(32px, 8vw, 84px)",fontWeight:300,
            color:"#fff",lineHeight:.92,letterSpacing:-2,marginBottom:16,
          }}>Contact Us</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,maxWidth:420,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>
            Our team is ready to assist — whether you're a customer, retailer, or gifting partner.
          </p>
        </div>
      </div>

      <div style={{padding:"clamp(40px, 6vw, 80px) 5% clamp(48px, 8vw, 96px)",display:"grid",gridTemplateColumns:"1fr 1.35fr",gap:40,alignItems:"stretch"}} className="hero-split">
        {/* Info */}
        <div>
          <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Reach Us</p>
          <h2 className="disp" style={{fontSize:"clamp(24px, 6vw, 44px)",fontWeight:300,marginBottom:24,lineHeight:1.1,color:"#251737",letterSpacing:-1}}>We'd Love to Hear From You</h2>
          <p style={{color:"#777",lineHeight:1.85,fontSize:14,marginBottom:36,fontFamily:"'Montserrat',sans-serif"}}>
            Whether you're a fragrance enthusiast, a retail partner, or a gifting client — our team is here to help.
          </p>
          {[
            ["📍","Address","Dubai, United Arab Emirates"],
            ["📞","Phone","+971 4 000 0000"],
            ["✉️","Email","hello@khadlaj-perfumes.com"],
            ["⏰","Hours","Mon–Sat: 9am–6pm GST"],
          ].map(([icon,label,val])=>(
            <div key={label} style={{display:"flex",gap:16,marginBottom:14,padding:"14px 0",borderBottom:"1px solid #F0EBE3"}}>
              <span style={{width:38,height:38,borderRadius:"50%",border:"1px solid #E2D2AD",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,marginTop:0,background:"#fff"}}>{icon}</span>
              <div>
                <p style={{fontWeight:600,fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:4}}>{label}</p>
                <p style={{fontSize:14,color:"#333",fontFamily:"'Montserrat',sans-serif"}}>{val}</p>
              </div>
            </div>
          ))}
          <div style={{marginTop:32}}>
            <p style={{fontWeight:600,fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Follow Us</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[
                ["Instagram",SOCIAL_LINKS.instagram],
                ["TikTok",SOCIAL_LINKS.tiktok],
                ["Facebook",SOCIAL_LINKS.facebook],
                ["YouTube",SOCIAL_LINKS.youtube],
              ].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{
                    border:"1px solid #000",color:"#251737",
                    padding:"9px 16px",fontSize:9,letterSpacing:2,
                    cursor:"pointer",textDecoration:"none",
                    fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#251737";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#251737";}}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#251737 0%,#1A0F2E 100%)",padding:"clamp(24px, 5vw, 44px) clamp(20px, 5vw, 40px)",boxShadow:"0 26px 70px rgba(0,0,0,.18)"}}>
          <div style={{position:"absolute",top:-120,right:-80,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.26),rgba(184,146,42,0) 68%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:"linear-gradient(180deg,#B8922A,#F0D080,#B8922A)"}}/>
          {sent ? (
            <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"60px 0"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"#B8922A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:22,color:"#fff"}}>✓</div>
              <h3 className="disp" style={{fontSize:32,color:"#fff",margin:"0 0 12px",fontWeight:300}}>Message Sent</h3>
              <p style={{color:"rgba(255,255,255,.5)",fontSize:13,fontFamily:"'Montserrat',sans-serif"}}>We'll get back to you within 24 hours.</p>
              <button className="btn-ghost" onClick={()=>setSent(false)} style={{marginTop:32,color:"#fff",borderColor:"rgba(255,255,255,.3)"}}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 className="disp" style={{fontSize:28,fontWeight:300,color:"#fff",marginBottom:32,letterSpacing:-0.5}}>Send a Message</h3>
              {[["Name","name","text"],["Email","email","email"],["Subject","subject","text"]].map(([label,key,type])=>(
                <div key={key} style={{marginBottom:18}}>
                  <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>{label}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                    style={{
                      width:"100%",background:"rgba(255,255,255,.075)",
                      border:"1px solid rgba(255,255,255,.14)",
                      borderBottom:"1px solid rgba(184,146,42,.45)",
                      color:"#fff",padding:"13px 14px",fontSize:14,outline:"none",
                      fontFamily:"'Montserrat',sans-serif",
                    }}/>
                </div>
              ))}
              <div style={{marginBottom:28}}>
                <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>Message</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5}
                  style={{
                    width:"100%",background:"rgba(255,255,255,.075)",
                    border:"1px solid rgba(255,255,255,.14)",
                    borderBottom:"1px solid rgba(184,146,42,.45)",
                    color:"#fff",padding:"13px 14px",fontSize:14,outline:"none",
                    resize:"vertical",fontFamily:"'Montserrat',sans-serif",
                  }}/>
              </div>
              <button
                onClick={handle}
                style={{
                  width:"100%",background:"#B8922A",color:"#fff",
                  border:"none",padding:"16px",fontSize:10,
                  letterSpacing:3,textTransform:"uppercase",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",fontWeight:600,
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
function SignupPageOld(){
  const [form, setForm] = useState({name:"",email:"",phone:""});
  const [done, setDone] = useState(false);
  const submit = () => { setDone(true); setForm({name:"",email:"",phone:""}); };
  return (
    <div style={{background:"linear-gradient(180deg,#fff 0%,#FAF8F4 100%)"}}>
      <section style={{padding:"74px 5% 96px"}}>
        <div style={{maxWidth:1420,margin:"0 auto",display:"grid",gridTemplateColumns:".95fr 1.05fr",alignItems:"stretch",border:"1px solid #E8E0D2",boxShadow:"0 28px 80px rgba(0,0,0,.08)",background:"#fff"}} className="hero-split">
          <div style={{position:"relative",overflow:"hidden",minHeight:610,background:"linear-gradient(135deg,#080808 0%,#15110A 72%,#060606 100%)",padding:"58px 52px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div style={{position:"absolute",top:-110,right:-90,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.28),rgba(184,146,42,0) 68%)"}}/>
            <div style={{position:"absolute",right:"5%",bottom:"-2%",width:"54%",height:"76%",display:"flex",alignItems:"flex-end",justifyContent:"center",pointerEvents:"none"}}>
              <img loading="lazy" decoding="async" src={getOptimizedImage("/assets/images/gifsets/cloudcandy_gift_transparent.png",800)} alt="Khadlaj fragrances" style={{width:"100%",height:"100%",objectFit:"contain",filter:"drop-shadow(0 34px 70px rgba(0,0,0,.42))"}}/>
            </div>
            <div style={{position:"relative",zIndex:2,maxWidth:440}}>
              <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:18}}>Khadlaj Circle</p>
              <h1 className="disp" style={{fontSize:"clamp(44px,5.6vw,82px)",fontWeight:300,lineHeight:.98,color:"#fff",marginBottom:22}}>Sign Up</h1>
              <p style={{fontSize:14,color:"rgba(255,255,255,.68)",lineHeight:1.9,maxWidth:420,fontFamily:"'Montserrat',sans-serif"}}>
                Join for launch previews, fragrance stories, and private offers from Khadlaj Perfumes.
              </p>
            </div>
            <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:520}}>
              {["Early access","Private offers","Fragrance news"].map(item=>(
                <div key={item} style={{border:"1px solid rgba(255,255,255,.14)",background:"rgba(255,255,255,.045)",padding:"14px 12px"}}>
                  <span style={{display:"block",width:6,height:6,borderRadius:"50%",background:"#B8922A",marginBottom:10}}/>
                  <p style={{fontSize:9,letterSpacing:1.6,color:"rgba(255,255,255,.72)",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,lineHeight:1.4}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"58px 52px",background:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          {done ? (
            <div style={{textAlign:"center",padding:"52px 0"}}>
              <div style={{width:54,height:54,borderRadius:"50%",background:"#B8922A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",color:"#fff",fontSize:22}}>✓</div>
              <h2 className="disp" style={{fontSize:38,color:"#251737",fontWeight:300,marginBottom:12}}>You're In</h2>
              <p style={{color:"#777",fontSize:13,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>Thank you for joining the Khadlaj Circle.</p>
              <button className="btn-ghost" onClick={()=>setDone(false)} style={{marginTop:28}}>Add Another</button>
            </div>
          ) : (
            <div style={{position:"relative",zIndex:1}}>
              <p style={{fontWeight:600,fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Member Access</p>
              <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,lineHeight:1.05,color:"#251737",marginBottom:14}}>Create your account</h2>
              <p style={{fontSize:13,color:"#777",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif",marginBottom:30,maxWidth:520}}>
                Receive curated updates and exclusive Khadlaj moments directly in your inbox.
              </p>
              {[
                ["Name","name","text"],
                ["Email","email","email"],
                ["Phone","phone","tel"],
              ].map(([label,key,type])=>(
                <div key={key} style={{marginBottom:18}}>
                  <label style={{fontSize:9,letterSpacing:2.8,color:"#9B8A67",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>{label}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                    style={{width:"100%",background:"#FAF8F4",border:"1px solid #E8E0D2",borderBottom:"1px solid #B8922A",color:"#251737",padding:"15px 16px",fontSize:14,outline:"none",fontFamily:"'Montserrat',sans-serif"}}
                  />
                </div>
              ))}
              <button onClick={submit} style={{width:"100%",background:"#251737",color:"#fff",border:"none",padding:"17px",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginTop:8}}>Create Account</button>
              <p style={{fontSize:10,color:"#999",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginTop:18,textAlign:"center"}}>
                By signing up, you agree to receive Khadlaj updates and offers.
              </p>
            </div>
          )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FloatingInput({ label, type, value, onChange }) {
  const [focus, setFocus] = React.useState(false);
  const active = focus || value.length > 0;
  return (
    <div style={{position:"relative", marginBottom:24}}>
      <label style={{position:"absolute", left:16, top:active ? 8 : 18, fontSize:active ? 9 : 13, color:active ? "#B8922A" : "#999", letterSpacing:active?2:0, textTransform:active?"uppercase":"none", transition:"all 0.25s ease", pointerEvents:"none", fontFamily:"'Montserrat',sans-serif", fontWeight:active?700:400}}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={onChange}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{width:"100%", background:"#FAF8F4", border:"1px solid", borderColor:active ? "#B8922A" : "#E8E0D2", color:"#251737", padding:"24px 16px 8px", fontSize:15, outline:"none", fontFamily:"'Montserrat',sans-serif", transition:"border-color 0.3s ease"}}
      />
    </div>
  );
}

function SignupPage(){
  const [mode, setMode] = useState("login");
  const [done, setDone] = useState("");
  const [signupForm, setSignupForm] = useState({name:"",email:"",phone:"",password:""});
  const [loginForm, setLoginForm] = useState({email:"",password:""});
  const [forgotEmail, setForgotEmail] = useState("");
  const submit = (type) => {
    setDone(type);
    if(type==="signup") setSignupForm({name:"",email:"",phone:"",password:""});
    if(type==="login") setLoginForm({email:"",password:""});
    if(type==="forgot") setForgotEmail("");
  };
  const title = mode==="forgot" ? "Reset Password" : mode==="login" ? "Welcome Back" : "Create your account";
  const subtitle = mode==="forgot"
    ? "Enter your email and we will send password reset instructions."
    : mode==="login"
      ? "Login to manage your Khadlaj profile, wishlist, and private offers."
      : "Join for launch previews, fragrance stories, and private offers.";

  return (
    <div style={{background:"linear-gradient(180deg,#fff 0%,#FAF8F4 100%)"}}>
      <section style={{padding:"74px 5% 96px"}}>
        <div style={{maxWidth:1420,margin:"0 auto",display:"grid",gridTemplateColumns:".95fr 1.05fr",alignItems:"stretch",border:"1px solid #E8E0D2",boxShadow:"0 40px 100px rgba(0,0,0,.06)",background:"#fff"}} className="hero-split">
          <div className="auth-visual-panel" style={{position:"relative",overflow:"hidden",minHeight:680,background:"url('/assets/images/banners/my-paradise-banner.png') center/cover",padding:"58px 52px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(60,17,82,0.85) 0%, rgba(10,10,10,0.95) 100%)"}}/>
            <div style={{position:"absolute",top:-110,right:-90,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.28),rgba(184,146,42,0) 68%)",zIndex:1}}/>
            <div style={{position:"relative",zIndex:2,maxWidth:470,marginTop:"auto",marginBottom:"auto"}}>
              <p style={{fontWeight:600,fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:18}}>Khadlaj Circle</p>
              <h1 className="disp" style={{fontSize:"clamp(48px,6vw,84px)",fontWeight:300,lineHeight:.98,color:"#fff",marginBottom:24,letterSpacing:"-1px"}}>{mode==="login" ? "Login" : mode==="forgot" ? "Reset Password" : "Sign Up"}</h1>
              <p style={{fontSize:15,color:"rgba(255,255,255,.75)",lineHeight:1.9,maxWidth:430,fontFamily:"'Montserrat',sans-serif",fontWeight:300}}>
                {mode==="login" ? "Welcome back! Login to manage your Khadlaj profile, wishlist, and exclusive offers." : mode==="forgot" ? "Enter your email and we will send you password reset instructions." : "Join Khadlaj Circle for new launch previews, fragrance stories, and private exclusive offers."}
              </p>
            </div>
          </div>

          <div style={{padding:"52px",background:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {done ? (
              <div style={{textAlign:"center",padding:"52px 0",animation:"fadeIn .5s ease"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"#251737",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",color:"#fff",fontSize:13,letterSpacing:2,fontFamily:"'Montserrat',sans-serif",fontWeight:600,boxShadow:"0 12px 24px rgba(60,17,82,.2)"}}>OK</div>
                <h2 className="disp" style={{fontSize:42,color:"#251737",fontWeight:300,marginBottom:12}}>{done==="forgot" ? "Check Your Email" : done==="login" ? "Welcome Back" : "You're In"}</h2>
                <p style={{color:"#777",fontSize:14,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>
                  {done==="forgot" ? "Password reset instructions have been prepared for your email." : done==="login" ? "You are ready to continue your Khadlaj experience." : "Thank you for joining the Khadlaj Circle."}
                </p>
                <button className="btn-ghost" onClick={()=>setDone("")} style={{marginTop:32,padding:"16px 32px",borderColor:"#251737",color:"#251737"}}>Continue</button>
              </div>
            ) : (
              <div style={{position:"relative",zIndex:1,animation:"fadeIn .4s ease"}}>
                <div style={{display:mode==="forgot"?"none":"flex",gap:32,borderBottom:"1px solid #E8E0D2",marginBottom:42}}>
                  {["login","signup"].map(tab=>(
                    <button key={tab} onClick={()=>setMode(tab)} style={{border:"none",background:"transparent",color:mode===tab?"#251737":"#999",padding:"0 0 16px",fontSize:11,letterSpacing:2.4,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,cursor:"pointer",position:"relative",transition:"color .3s ease"}}>
                      {tab==="login" ? "Login" : "Sign Up"}
                      {mode===tab && <span style={{position:"absolute",bottom:-1,left:0,right:0,height:2,background:"#251737",animation:"slideIn .3s ease"}}/>}
                    </button>
                  ))}
                </div>
                
                
                <h2 className="disp" style={{fontSize:"clamp(32px,3.7vw,54px)",fontWeight:300,lineHeight:1.05,color:"#251737",marginBottom:14}}>{title}</h2>
                <p style={{fontSize:14,color:"#777",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif",marginBottom:36,maxWidth:520}}>{subtitle}</p>

                {mode==="signup" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Full Name" type="text" value={signupForm.name} onChange={e=>setSignupForm({...signupForm,name:e.target.value})} />
                    <FloatingInput label="Email Address" type="email" value={signupForm.email} onChange={e=>setSignupForm({...signupForm,email:e.target.value})} />
                    <FloatingInput label="Phone Number" type="tel" value={signupForm.phone} onChange={e=>setSignupForm({...signupForm,phone:e.target.value})} />
                    <FloatingInput label="Password" type="password" value={signupForm.password} onChange={e=>setSignupForm({...signupForm,password:e.target.value})} />
                    <button onClick={()=>submit("signup")} style={{width:"100%",background:"#251737",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginTop:12,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Create Account</button>
                  </div>
                )}

                {mode==="login" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Email Address" type="email" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} />
                    <FloatingInput label="Password" type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} />
                    
                    <div style={{display:"flex",justifyContent:"flex-end",margin:"-12px 0 24px"}}>
                      <button onClick={()=>setMode("forgot")} style={{background:"transparent",border:"none",color:"#B8922A",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,cursor:"pointer",transition:"color .3s ease"}} onMouseEnter={e=>e.currentTarget.style.color="#251737"} onMouseLeave={e=>e.currentTarget.style.color="#B8922A"}>Forgot Password?</button>
                    </div>
                    <button onClick={()=>submit("login")} style={{width:"100%",background:"#251737",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Login</button>
                  </div>
                )}

                {mode==="forgot" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Email Address" type="email" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} />
                    <button onClick={()=>submit("forgot")} style={{width:"100%",background:"#251737",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Send Reset Link</button>
                    <button onClick={()=>setMode("login")} style={{width:"100%",background:"transparent",color:"#251737",border:"1px solid #251737",padding:"18px",fontSize:11,letterSpacing:2.6,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginTop:16,transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(60,17,82,.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Back to Login</button>
                  </div>
                )}

                <p style={{fontSize:11,color:"#999",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginTop:32,textAlign:"center"}}>
                  Your account is used for Khadlaj updates, wishlists, and private fragrance offers.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function CartPage({ cartItems, updateCartQty, removeFromCart, setPage, setViewProduct }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const subtotal = cartItems.reduce((sum, item)=>sum + item.price * item.qty, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 20;
  const total = subtotal + shipping;

  return (
    <div style={{background:"#fff",minHeight:"100vh"}}>
      <section style={{padding:"70px 5% 96px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginBottom:44}}>
          <div>
            <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Shopping Bag</p>
            <h1 className="disp" style={{fontSize:"clamp(38px,5vw,68px)",fontWeight:300,lineHeight:1,color:"#251737"}}>Your Cart</h1>
          </div>
          <button className="btn-ghost" onClick={()=>setPage("collections")}>Continue Shopping</button>
        </div>

        {cartItems.length === 0 ? (
          <div style={{border:"1px solid #E8E4DC",padding:"56px 24px",textAlign:"center",background:"#FCFBFA"}}>
            <h2 className="disp" style={{fontSize:34,fontWeight:300,marginBottom:12}}>Your bag is empty</h2>
            <p style={{fontSize:13,color:"#777",fontFamily:"'Montserrat',sans-serif",marginBottom:28}}>Add your favourite Khadlaj fragrances and checkout securely.</p>
            <button className="btn-gold" onClick={()=>setPage("collections")}>Shop Fragrances</button>
          </div>
        ) : (
          <div className="grid-2" style={{display:"grid",gridTemplateColumns:"minmax(0,1.5fr) minmax(320px,.8fr)",gap:34,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {cartItems.map(item=>(
                <div key={item.id} className="cart-line" style={{display:"grid",gridTemplateColumns:"112px 1fr auto",gap:18,alignItems:"center",border:"1px solid #E8E4DC",padding:16,background:"#fff"}}>
                  <div onClick={()=>{setViewProduct(item);setPage("product");}} style={{height:118,width:"100%",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"radial-gradient(circle at 50% 70%, rgba(0,0,0,.06), rgba(255,255,255,0) 58%)",padding:6}}>
                    <img loading="lazy" decoding="async" src={getOptimizedImage(item.img,500)} alt={item.name} style={{width:"100%",height:"100%",objectFit:"contain",filter:"drop-shadow(0 12px 18px rgba(0,0,0,.08))"}}/>
                  </div>
                  <div>
                    <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:6}}>{item.col === "Lafede" ? "La Fede" : item.col}</p>
                    <h3 style={{fontSize:16,letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:6}}>{item.name}</h3>
                    <p style={{fontSize:12,color:"#888",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>{item.size}</p>
                    <button onClick={()=>removeFromCart(item.id)} style={{background:"none",border:"none",borderBottom:"1px solid #999",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#777",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",paddingBottom:2}}>Remove</button>
                  </div>
                  <div className="cart-line-actions" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:14}}>
                    <p style={{fontSize:15,fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(item.price * item.qty)}</p>
                    <div style={{display:"flex",alignItems:"center",border:"1px solid #E8E4DC",height:38}}>
                      <button onClick={()=>updateCartQty(item.id, item.qty - 1)} style={{width:36,height:"100%",border:"none",background:"#fff",cursor:"pointer",fontSize:18}}>-</button>
                      <span style={{width:34,textAlign:"center",fontSize:12,fontFamily:"'Montserrat',sans-serif"}}>{item.qty}</span>
                      <button onClick={()=>updateCartQty(item.id, item.qty + 1)} style={{width:36,height:"100%",border:"none",background:"#fff",cursor:"pointer",fontSize:16}}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside style={{border:"1px solid #E8E4DC",padding:26,position:"sticky",top:130,background:"#FCFBFA"}}>
              <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:18}}>Order Summary</p>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:12}}><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:16}}><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong></div>
              {subtotal > 0 && subtotal < 200 && <p style={{fontSize:11,color:"#777",lineHeight:1.7,marginBottom:16,fontFamily:"'Montserrat',sans-serif"}}>Add {formatPrice(200 - subtotal)} more for free UAE shipping.</p>}
              <div style={{height:1,background:"#E8E4DC",margin:"18px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <span style={{fontSize:13,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Total</span>
                <strong style={{fontSize:22,fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(total)}</strong>
              </div>
              <button className="btn-gold" style={{width:"100%"}} onClick={()=>setPage("checkout")}>Checkout</button>
              <p style={{fontSize:10,color:"#888",lineHeight:1.7,textAlign:"center",marginTop:14,fontFamily:"'Montserrat',sans-serif"}}>Secure checkout. Payment and delivery details are validated before order placement.</p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

function CheckoutPage({ cartItems, setPage, clearCart }){
  const { activeCountry } = React.useContext(CountryContext);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const subtotal = cartItems.reduce((sum, item)=>sum + item.price * item.qty, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 20;
  const total = subtotal + shipping;
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    address:"",
    city:"",
    country:activeCountry.name,
    payment:"Card",
    notes:"",
    agree:false,
  });

  const setField = (key, value) => {
    setForm(prev=>({...prev,[key]:value}));
    setErrors(prev=>({...prev,[key]:""}));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number";
    if (form.address.trim().length < 8) next.address = "Enter full delivery address";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.country.trim()) next.country = "Country is required";
    if (!form.payment) next.payment = "Select payment method";
    if (!form.agree) next.agree = "Please accept the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitOrder = () => {
    if (cartItems.length === 0) {
      setPage("cart");
      return;
    }
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const fieldStyle = (key) => ({
    width:"100%",
    border:`1px solid ${errors[key] ? "#B00020" : "#E2DED6"}`,
    background:"#fff",
    padding:"14px 15px",
    fontSize:12,
    outline:"none",
    fontFamily:"'Montserrat',sans-serif",
  });
  const labelStyle = {display:"block",fontSize:9,letterSpacing:2.5,textTransform:"uppercase",color:"#777",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:8};
  const errorText = (key) => errors[key] ? <p style={{fontSize:10,color:"#B00020",marginTop:6,fontFamily:"'Montserrat',sans-serif"}}>{errors[key]}</p> : null;

  if (submitted) {
    return (
      <div style={{background:"#fff",minHeight:"100vh",padding:"90px 5%"}}>
        <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",border:"1px solid #E8E4DC",padding:"64px 28px",background:"#FCFBFA"}}>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:18}}>Order Received</p>
          <h1 className="disp" style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:300,marginBottom:16}}>Thank you, {form.firstName}</h1>
          <p style={{fontSize:14,color:"#666",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif",maxWidth:520,margin:"0 auto 30px"}}>Your Khadlaj order request has been submitted. A confirmation will be sent to {form.email}.</p>
          <button className="btn-gold" onClick={()=>setPage("home")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#fff",minHeight:"100vh"}}>
      <section style={{padding:"70px 5% 96px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:44}}>
          <p style={{fontWeight:600,fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Secure Checkout</p>
          <h1 className="disp" style={{fontSize:"clamp(38px,5vw,68px)",fontWeight:300,lineHeight:1,color:"#251737"}}>Checkout</h1>
        </div>

        <div className="grid-2" style={{display:"grid",gridTemplateColumns:"minmax(0,1.15fr) minmax(320px,.85fr)",gap:34,alignItems:"start"}}>
          <div style={{border:"1px solid #E8E4DC",padding:"clamp(22px,4vw,38px)",background:"#fff"}}>
            <h2 style={{fontSize:14,letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:24}}>Delivery Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}} className="grid-2">
              <div><label style={labelStyle}>First Name</label><input value={form.firstName} onChange={e=>setField("firstName",e.target.value)} style={fieldStyle("firstName")}/>{errorText("firstName")}</div>
              <div><label style={labelStyle}>Last Name</label><input value={form.lastName} onChange={e=>setField("lastName",e.target.value)} style={fieldStyle("lastName")}/>{errorText("lastName")}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}} className="grid-2">
              <div><label style={labelStyle}>Email</label><input type="email" value={form.email} onChange={e=>setField("email",e.target.value)} style={fieldStyle("email")}/>{errorText("email")}</div>
              <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e=>setField("phone",e.target.value)} style={fieldStyle("phone")}/>{errorText("phone")}</div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={labelStyle}>Address</label>
              <input value={form.address} onChange={e=>setField("address",e.target.value)} style={fieldStyle("address")}/>
              {errorText("address")}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:22}} className="grid-2">
              <div><label style={labelStyle}>City</label><input value={form.city} onChange={e=>setField("city",e.target.value)} style={fieldStyle("city")}/>{errorText("city")}</div>
              <div><label style={labelStyle}>Country</label><input value={form.country} onChange={e=>setField("country",e.target.value)} style={fieldStyle("country")}/>{errorText("country")}</div>
            </div>

            <h2 style={{fontSize:14,letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:16}}>Payment Method</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10,marginBottom:22}} className="grid-3">
              {["Card","Cash on Delivery","PayPal"].map(method=>(
                <button key={method} onClick={()=>setField("payment",method)} style={{border:`1px solid ${form.payment===method ? "#111" : "#E8E4DC"}`,background:form.payment===method?"#111":"#fff",color:form.payment===method?"#fff":"#111",padding:"13px 10px",fontSize:10,letterSpacing:1.6,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,cursor:"pointer"}}>{method}</button>
              ))}
            </div>
            {errorText("payment")}

            <div style={{marginBottom:22}}>
              <label style={labelStyle}>Order Notes</label>
              <textarea value={form.notes} onChange={e=>setField("notes",e.target.value)} rows={4} style={{...fieldStyle("notes"),resize:"vertical"}} placeholder="Delivery notes, gift message, or special request"/>
            </div>

            <label style={{display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",marginBottom:8}}>
              <input type="checkbox" checked={form.agree} onChange={e=>setField("agree",e.target.checked)} style={{marginTop:3}}/>
              <span style={{fontSize:11,color:"#666",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif"}}>I confirm my delivery details are correct and agree to Khadlaj order terms.</span>
            </label>
            {errorText("agree")}
          </div>

          <aside style={{border:"1px solid #E8E4DC",padding:26,position:"sticky",top:130,background:"#FCFBFA"}}>
            <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,marginBottom:18}}>Review Order</p>
            <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:20}}>
              {cartItems.map(item=>(
                <div key={item.id} style={{display:"grid",gridTemplateColumns:"58px 1fr auto",gap:10,alignItems:"center"}}>
                  <div style={{height:64,display:"flex",alignItems:"center",justifyContent:"center",background:"#fff"}}>
                    <img loading="lazy" decoding="async" src={getOptimizedImage(item.img,500)} alt={item.name} style={{maxWidth:"90%",maxHeight:"90%",objectFit:"contain"}}/>
                  </div>
                  <div>
                    <p style={{fontSize:11,fontWeight:600,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",lineHeight:1.25}}>{item.name}</p>
                    <p style={{fontSize:10,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>Qty {item.qty}</p>
                  </div>
                  <strong style={{fontSize:12,fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(item.price * item.qty)}</strong>
                </div>
              ))}
            </div>
            <div style={{height:1,background:"#E8E4DC",margin:"18px 0"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:12}}><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:16}}><span>Shipping</span><strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"20px 0 24px",paddingTop:18,borderTop:"1px solid #E8E4DC"}}>
              <span style={{fontSize:13,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Total</span>
              <strong style={{fontSize:22,fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(total)}</strong>
            </div>
            <button className="btn-gold" style={{width:"100%"}} onClick={submitOrder}>Place Order</button>
            <button onClick={()=>setPage("cart")} style={{width:"100%",marginTop:12,background:"transparent",border:"1px solid #251737",padding:"13px",fontSize:10,letterSpacing:2,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:600,cursor:"pointer"}}>Back to Cart</button>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Navbar({ page, setPage, cartCount, setCollectionCategory, collectionCategory, activeCountry }){
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
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
              style={{flex:1,border:"none",outline:"none",fontSize:"clamp(16px,2.5vw,26px)",fontFamily:"'Trajan Pro', 'Cinzel', serif",fontWeight:300,color:"#251737",background:"transparent"}}
            />
            <button onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);}}
              style={{background:"none",border:"none",fontSize:28,cursor:"pointer",color:"#251737",fontWeight:300,lineHeight:1}}>×</button>
          </div>
          <div style={{flex:1,overflowY:"auto",paddingTop:24}}>
            {searchQuery && searchResults.length===0 && (
              <div style={{textAlign:"center",paddingTop:64}}>
                <p className="disp" style={{fontSize:28,fontWeight:300,color:"#251737",marginBottom:8}}>No results for "{searchQuery}"</p>
                <p style={{fontSize:13,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>Try "oud", "musk", "gift"...</p>
              </div>
            )}
            {searchResults.length>0 && (
              <>
                <p style={{fontWeight:600,fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:20}}>{searchResults.length} results for "{searchQuery}"</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:48}} className="grid-3">
                  {searchResults.map(p=>(
                    <div key={p.id} onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);setPage("product");}} style={{cursor:"pointer"}}>
                      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#fff",border:"1px solid #F1ECE4"}}>
                        <div style={{position:"absolute",inset:10,background:"radial-gradient(circle at 50% 42%, rgba(184,146,42,.10), rgba(255,255,255,0) 62%)"}}/>
                        <img decoding="async" src={getOptimizedImage(p.img,500)} alt={p.name} loading="lazy" style={{position:"relative",width:"100%",height:"100%",objectFit:"contain",padding:"16px",filter:"drop-shadow(0 12px 20px rgba(0,0,0,.08))"}}/>
                        <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                        {p.badge&&<span style={{position:"absolute",top:10,left:10,background:p.badge==="New"?"#B8922A":p.badge==="Limited"?"#5C0000":"#251737",color:"#fff",fontSize:8,letterSpacing:2,padding:"3px 8px",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>{p.badge}</span>}
                      </div>
                      <div style={{padding:"10px 6px 14px"}}>
                        <p style={{fontWeight:600,fontSize:9,color:"#B8922A",letterSpacing:3,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:3}}>{p.col==="Lafede" ? "La Fede" : p.col}</p>
                        <p style={{fontSize:12,fontWeight:600,color:"#251737",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:4,lineHeight:1.2}}>{p.name}</p>
                        <p style={{fontSize:13,fontWeight:600,color:"#251737",fontFamily:"'Montserrat',sans-serif"}}>{formatPrice(p.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!searchQuery && (
              <div>
                <p style={{fontWeight:600,fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Popular Searches</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
                  {["Oud","Musk","Gift Set","New Arrivals","For Her","For Him","Amber","Island"].map(s=>(
                    <button key={s} onClick={()=>handleSearch(s)}
                      style={{background:"#F7F5F2",border:"1px solid #E8E4DC",padding:"8px 16px",fontSize:12,color:"#333",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#251737";e.currentTarget.style.color="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#F7F5F2";e.currentTarget.style.color="#333";}}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Sticky Header Wrapper ── */}
      <div style={{position:"sticky",top:0,zIndex:100}}>
        {/* ── Announcement bar ── */}
        <div style={{background:"#251737",color:"#fff",textAlign:"center",padding:"14px 16px",fontSize:"12px",letterSpacing:"4px",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",fontWeight:500}}>
          USE "KHADLAJ25" FOR FLAT 25% DISCOUNT
        </div>

        {/* ── Main nav ── */}
        <nav style={{background:"rgba(255,255,255,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",boxShadow:"0 4px 30px rgba(0,0,0,0.03)",borderBottom:"1px solid rgba(232,228,220,0.5)",transition:"all 0.3s"}}>
        <div style={{padding:"0 5%"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",minHeight:"auto",padding:"16px 0",gap:24}}>
            {/* Left utility */}
            <div style={{display:"flex",gap:12,alignItems:"center",paddingLeft:"20px"}}>
              <span className="mob-search-left" style={{cursor:"pointer",display:"flex",alignItems:"center"}} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div className="hide-mob country-dropdown">
                <CountryContext.Consumer>
                  {({ activeCountry, setActiveCountry }) => (
                    <>
                      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 18px",border:"1px solid #E8E4DC",borderRadius:4,background:"#FAF9F6",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:14,fontWeight:600,color:"#251737"}}>
                        {activeCountry.flagUrl === "global"
                          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          : <img decoding="async" src={activeCountry.flagUrl} alt={activeCountry.name} style={{width:24,height:17,objectFit:"cover",borderRadius:2,display:"block"}} />
                        }
                        {activeCountry.name}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:"6px"}}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      <div className="country-dropdown-menu">
                        {COUNTRIES.map(c => {
                          const isActive = activeCountry.name === c.name;
                          return (
                            <button
                              key={c.name}
                              onClick={() => setActiveCountry(c)}
                              style={{
                                display:"flex",alignItems:"center",gap:7,
                                padding:"8px 12px",
                                border:"none",
                                borderRadius:3,
                                background: isActive ? "#F4F1EA" : "transparent",
                                cursor:"pointer",
                                fontFamily:"'Montserrat',sans-serif",
                                fontSize:11,fontWeight: isActive ? 600 : 500,
                                color: isActive ? "#251737" : "#555",
                                textAlign: "left",
                                width: "100%",
                                transition:"all .2s",
                              }}
                              onMouseEnter={e => { if(!isActive){ e.currentTarget.style.background="#FBFaf8"; e.currentTarget.style.color="#251737"; } }}
                              onMouseLeave={e => { if(!isActive){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#555"; } }}
                            >
                              {c.flagUrl === "global"
                                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                : <img decoding="async" src={c.flagUrl} alt={c.name} style={{width:20,height:14,objectFit:"cover",borderRadius:2,display:"block"}} />
                              }
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </CountryContext.Consumer>
              </div>
            </div>
            {/* Logo */}
            <div onClick={()=>setPage("home")} style={{cursor:"pointer",textAlign:"center",userSelect:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img
                src="/assets/images/purple-logo.png?v=2"
                alt="Khadlaj Perfumes"
                style={{width:"clamp(85px, 12vw, 120px)",height:"auto",objectFit:"contain",display:"block",transition:"transform 0.3s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
            </div>
            {/* Right icons */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:24}}>
              <span className="hide-mob" style={{fontSize:"11px",letterSpacing:"2px",color:"#251737",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#251737"} onClick={()=>setPage("signup")}>Sign Up</span>
              <span className="hide-mob" style={{cursor:"pointer",display:"flex",alignItems:"center",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div onClick={()=>setPage("cart")} style={{position:"relative",cursor:"pointer",transition:"transform .2s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                {cartCount>0 && (
                  <span style={{position:"absolute",top:-5,right:-7,background:"#B8922A",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>{cartCount}</span>
                )}
              </div>
              {/* Hamburger — mobile only */}
              <button
                onClick={()=>setMobileMenuOpen(o=>!o)}
                style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:"4px",flexDirection:"column",gap:5,justifyContent:"center",alignItems:"center"}}
                className="mob-burger"
                aria-label="Menu"
              >
                <span style={{display:"block",width:20,height:1.5,background:"#251737",transition:"all .25s"}}/>
                <span style={{display:"block",width:20,height:1.5,background:"#251737",transition:"all .25s"}}/>
                <span style={{display:"block",width:14,height:1.5,background:"#251737",transition:"all .25s"}}/>
              </button>
            </div>
          </div>
          <div className="hide-mob" style={{display:"flex",justifyContent:"center",gap:40,paddingBottom:16,fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",color:"#251737",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>
            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gift Sets","gifts"],["Our legacy","story"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections") {
                  if (label === "Best Sellers") isActive = (collectionCategory === "Best Sellers");
                  else if (label === "Perfume Spray") isActive = (collectionCategory === "EAU DE PARFUM");
                  else if (label === "Perfume Oil") isActive = (collectionCategory === "Perfume Oils");
                } else {
                  isActive = true;
                }
              }
              return (
                <span key={label} onClick={() => {
                  if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                    setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Perfume Oils" : label);
                  } else if (pg === "collections") {
                    setCollectionCategory("Khadlaj");
                  }
                  setPage(pg);
                  window.scrollTo(0,0);
                }} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {label}
                </span>
              );
            })}
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
            {[["Best Sellers","collections"],["Perfume Spray","collections"],["Perfume Oil","collections"],["Home & Ambience","home"],["La Fede","lafede"],["Gift Sets","gifts"],["Our legacy","story"],["Sign Up","signup"]].map(([label,pg])=>{
              let isActive = false;
              if (page === pg) {
                if (pg === "collections") {
                  if (label === "Best Sellers") isActive = (collectionCategory === "Best Sellers");
                  else if (label === "Perfume Spray") isActive = (collectionCategory === "EAU DE PARFUM");
                  else if (label === "Perfume Oil") isActive = (collectionCategory === "Perfume Oils");
                } else {
                  isActive = true;
                }
              }
              return (
              <div
                key={label}
                className="mob-nav-link"
                onClick={()=>{
                  if(label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
                    setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Perfume Oils" : label);
                  } else if (pg === "collections") {
                    setCollectionCategory("Khadlaj");
                  }
                  setPage(pg);
                  setMobileMenuOpen(false);
                  window.scrollTo(0,0);
                }}
                style={{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2.5,
                  textTransform:"uppercase",
                  color: isActive ? "#B8922A" : "#251737",
                  fontWeight: isActive ? 700 : 500,
                  cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                {label}
                <span style={{color:isActive ? "#B8922A" : "rgba(37,23,55,0.4)",fontSize:12}}>→</span>
              </div>
            )})}
            <div style={{padding:"14px 6% 0",display:"flex",gap:12,flexWrap:"wrap"}}>
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
                            : <img decoding="async" src={c.flagUrl} alt={c.name} style={{width:16,height:11,objectFit:"cover",borderRadius:1,display:"block"}} />
                          }
                          {c.name}
                        </button>
                      );
                    })
                  )}
                </CountryContext.Consumer>
              </div>
            </div>
          </div>
        )}
      </nav>
      </div>
      <style>{`.mob-burger{display:none!important;}@media(max-width:900px){.mob-burger{display:flex!important;}.mob-search-left{display:inline-block!important;}}@media(min-width:901px){.mob-search-left{display:none!important;}} @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer({ setPage }){
  return (
    <footer style={{background:"#fff",borderTop:"1px solid #E8E4DC"}}>
      {/* Newsletter */}
      <div style={{background:"#251737",padding:"80px 5%",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.05)",borderTop:"1px solid rgba(193,164,106,0.15)"}}>
        <div style={{maxWidth:560,margin:"0 auto"}}>
          <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:14,fontWeight:600}}>Newsletter</p>
          <h2 className="disp" style={{fontSize:"clamp(26px,3.5vw,42px)",fontWeight:300,marginBottom:14,color:"#fff",letterSpacing:"-0.5px"}}>Join the Khadlaj Circle</h2>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,marginBottom:36,fontFamily:"'DM Sans',sans-serif",lineHeight:1.7}}>Get exclusive access to new launches and special offers</p>
          <div style={{display:"flex",gap:0,maxWidth:440,margin:"0 auto"}}>
            <input type="email" placeholder="Enter your email"
              style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.15)",borderRight:"none",color:"#fff",padding:"16px 22px",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif"}}
            />
            <button style={{background:"#B8922A",border:"1px solid #B8922A",color:"#fff",padding:"16px 36px",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#251737";e.currentTarget.style.borderColor="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="#B8922A"}}
            >Subscribe</button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{background:"#FAF9F6",padding:"80px 6% 48px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,borderTop:"1px solid #f0f0f0"}} className="grid-3">
        <div>
          <img
            src="/assets/images/purple-logo.png?v=2"
            alt="Khadlaj Perfumes"
            style={{height:126,width:"auto",objectFit:"contain",display:"block",marginBottom:24}}
          />
          <p style={{fontSize:"8px",letterSpacing:3.5,color:"#B8922A",fontFamily:"'Montserrat',sans-serif",marginBottom:16,textTransform:"uppercase",fontWeight:600}}>Perfumes · UAE · Est. 1997</p>
          <p style={{fontSize:13,color:"#555",lineHeight:1.85,maxWidth:260,marginBottom:32,fontFamily:"'Montserrat',sans-serif"}}>Family-owned UAE perfume house. Authentic Arabian &amp; French fragrance artistry since 1997.</p>
          
          <CountryContext.Consumer>
            {({ activeCountry, setActiveCountry }) => (
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {COUNTRIES.map(c=>(
                  <div
                    key={c.name}
                    onClick={() => setActiveCountry(c)}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:6,
                      padding:"5px 12px",
                      border:"1px solid",
                      borderColor: activeCountry.name===c.name ? "#B8922A" : "#e5e5e5",
                      background: activeCountry.name===c.name ? "rgba(184,146,42,0.08)" : "#fff",
                      cursor:"pointer",
                      transition:"all .2s ease"
                    }}
                    onMouseEnter={e=>{ if(activeCountry.name!==c.name) e.currentTarget.style.borderColor="#000"; }}
                    onMouseLeave={e=>{ if(activeCountry.name!==c.name) e.currentTarget.style.borderColor="#e5e5e5"; }}
                  >
                    {c.flagUrl === "global" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#222"}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    ) : (
                      <img decoding="async" src={c.flagUrl} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:1}} />
                    )}
                    <span style={{fontSize:9,color:"#222",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>{c.name}</span>
                  </div>
                ))}
              </div>
            )}
          </CountryContext.Consumer>
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#251737",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Collections</p>
          {[["Perfume Oils","collections"],["La Fede","lafede"],["Master Perfumery","collections"],["Gift Sets","gifts"],["New Arrivals","collections"],["Best Sellers","collections"]].map(([l,pg])=>(
            <p key={l} onClick={()=>setPage(pg)} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#251737",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Company</p>
          {[["Our Story","story"],["Contact Us","contact"],["Find a Store","contact"],["Careers","contact"],["Press","contact"]].map(([l,pg])=>(
            <p key={l} onClick={()=>setPage(pg)} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#251737",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Support</p>
          {["Shipping & Returns","FAQ","Track My Order","Fragrance Guide","Gift Wrapping"].map(l=>(
            <p key={l} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
          <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid #e5e5e5"}}>
            <p style={{fontSize:"8px",letterSpacing:2.5,color:"#251737",textTransform:"uppercase",marginBottom:14,fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>Ships With</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["DHL","Aramex","EMX"].map(s=>(
                <span key={s} style={{border:"1px solid #e5e5e5",padding:"4px 12px",fontSize:9,color:"#444",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,background:"#fff",borderRadius:1}}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderTop:"1px solid #E8E4DC",padding:"30px 5%",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20,fontSize:9,color:"#888",letterSpacing:1.5,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
        <div>
          <p style={{marginBottom:10,color:"#251737",fontWeight:600}}>© 2025 Khadlaj Perfumes LLC. All rights reserved. UAE.</p>
          <div style={{display:"flex",gap:24}}>
            {["Privacy Policy","Terms of Use","Cookie Settings"].map(l=>(
              <span key={l} style={{cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#888"}>{l}</span>
            ))}
          </div>
        </div>

        {/* Social Icons inside unified white footer */}
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          {[
            { name: "facebook", href:SOCIAL_LINKS.facebook, path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", fill: "none" },
            { name: "tiktok", href:SOCIAL_LINKS.tiktok, path: "M12 2h4a5 5 0 005 5v4a8.8 8.8 0 01-5-1.6V16a6 6 0 11-6-6c.4 0 .7 0 1 .1v4a2 2 0 102 1.9V2z", fill: "currentColor" },
            { name: "instagram", href:SOCIAL_LINKS.instagram, path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A5 5 0 0122.5 12v0a5 5 0 01-5 5h-11a5 5 0 01-5-5v0a5 5 0 015-5z", fill: "none" },
            { name: "linkedin", href:SOCIAL_LINKS.linkedin, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z", fill: "currentColor" },
            { name: "youtube", href:SOCIAL_LINKS.youtube, path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z", fill: "currentColor" }
          ].map(social => (
            <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#251737",
              color: "#fff",
              textDecoration: "none",
              transition: "transform 0.2s, background 0.2s, color 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = "#B8922A";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#251737";
            }}
            >
              {social.hasDot && (
                <span style={{
                  position: "absolute",
                  top: 0,
                  right: "8px",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#FF3B30",
                  zIndex: 10
                }}/>
              )}
              <svg width="13" height="13" viewBox="0 0 24 24" fill={social.fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={social.path}/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
/* ═══════════════════════════════════════════════════════════════
   SCRATCH CARD COMPONENT
═══════════════════════════════════════════════════════════════ */
function ScratchCard({ code, onReveal }) {
  const canvasRef = React.useRef(null);
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [prizeValue, setPrizeValue] = React.useState(code || "KHADLAJ10");

  React.useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || isRevealed) return;
    const canvasContext = canvasElement.getContext("2d");
    const width = canvasElement.width;
    const height = canvasElement.height;
    let isDragging = false;

    const initializeCanvas = () => {
      // Premium Luxury Gold Foil Background
      const baseGradient = canvasContext.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, "#C59B27");
      baseGradient.addColorStop(0.3, "#F3E5AB");
      baseGradient.addColorStop(0.5, "#D4AF37");
      baseGradient.addColorStop(0.7, "#FFF");
      baseGradient.addColorStop(1, "#A67C00");
      canvasContext.fillStyle = baseGradient;
      canvasContext.fillRect(0, 0, width, height);

      // Subtle metallic wave/sheen
      const sheen = canvasContext.createLinearGradient(0, height, width, 0);
      sheen.addColorStop(0, "rgba(255,255,255,0)");
      sheen.addColorStop(0.45, "rgba(255,255,255,0)");
      sheen.addColorStop(0.5, "rgba(255,255,255,0.6)");
      sheen.addColorStop(0.55, "rgba(255,255,255,0)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      canvasContext.fillStyle = sheen;
      canvasContext.fillRect(0, 0, width, height);

      // Elegant inner border
      canvasContext.strokeStyle = "rgba(166, 124, 0, 0.4)";
      canvasContext.lineWidth = 1;
      canvasContext.strokeRect(6, 6, width - 12, height - 12);
      canvasContext.strokeStyle = "rgba(255, 255, 255, 0.4)";
      canvasContext.strokeRect(7, 7, width - 14, height - 14);

      // Professional Serif Text
      canvasContext.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
      canvasContext.textAlign = "center";
      canvasContext.textBaseline = "middle";
      canvasContext.letterSpacing = "2px"; 
      
      // Main text
      canvasContext.fillStyle = "#251737";
      canvasContext.fillText("SCRATCH TO REVEAL", width/2, height/2);
    };

    const scratch = (x, y) => {
      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.beginPath();
      // Using circle arcs like the tutorial for realistic bumpy scratch animation
      canvasContext.arc(x, y, 20, 0, 2 * Math.PI);
      canvasContext.fill();
    };

    const getMouseCoordinates = (event) => {
      const rect = canvasElement.getBoundingClientRect();
      const clientX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
      const clientY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;
      
      // Calculate taking into account potential page scrolling
      const x = (clientX || 0) - (rect.left + window.scrollX);
      const y = (clientY || 0) - (rect.top + window.scrollY);
      
      // Scale to canvas internal resolution
      return { 
        x: x * (canvasElement.width / rect.width), 
        y: y * (canvasElement.height / rect.height) 
      };
    };

    const checkReveal = () => {
      if(isRevealed) return;
      const imageData = canvasContext.getImageData(0,0,width,height);
      const pixels = imageData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentCount++;
      }
      const percent = transparentCount / (pixels.length / 4);
      if (percent > 0.35) {
        setIsRevealed(true);
        if(onReveal) onReveal();
      }
    };

    const handleMouseDown = (event) => {
      isDragging = true;
      const { x, y } = getMouseCoordinates(event);
      scratch(x, y);
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        event.preventDefault();
        const { x, y } = getMouseCoordinates(event);
        scratch(x, y);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        checkReveal();
      }
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        isDragging = false;
        checkReveal();
      }
    };

    const isTouchDevice = 'ontouchstart' in window;

    canvasElement.addEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown, { passive: !isTouchDevice });
    canvasElement.addEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove, { passive: false });
    canvasElement.addEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
    canvasElement.addEventListener("mouseleave", handleMouseLeave);

    initializeCanvas();

    return () => {
      canvasElement.removeEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
      canvasElement.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
      canvasElement.removeEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
      canvasElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isRevealed]); // Removed onReveal to prevent constant re-rendering and erasing the canvas!

  return (
    <div className="scratch-hover" style={{position:"relative", width: "100%", maxWidth: 320, height: 100, margin:"0 auto", borderRadius: 8, overflow:"hidden", border:"2px solid #F3E5AB", background:"#111", boxShadow:"0 0 25px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)"}}>
       <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"radial-gradient(circle, #251737 0%, #0a0a0a 100%)", zIndex:1}}>
          <div style={{position:"absolute", inset:0, opacity:0.12, background:"url('data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"2\" cy=\"2\" r=\"1\" fill=\"%23D4AF37\"/></svg>') repeat"}} />
          <span style={{fontSize:9, letterSpacing:4, color:"#D4AF37", textTransform:"uppercase", marginBottom:4, fontWeight:600, opacity:0.9, position:"relative", zIndex:2}}>Your Exclusive Gift</span>
          <p className="scratch-text" style={{
             fontWeight:900, 
             margin:0, 
             background: "linear-gradient(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37)", 
             WebkitBackgroundClip: "text", 
             WebkitTextFillColor: "transparent", 
             letterSpacing:"6px", 
             fontSize: "28px",
             filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.5))",
             position:"relative", 
             zIndex:2
          }}>{prizeValue}</p>
       </div>
       <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", borderRadius: 8, opacity: isRevealed ? 0 : 1, transition: "opacity 0.6s ease", zIndex:10}}>
          <div className="shimmer-effect"></div>
       </div>
       <canvas 
          ref={canvasRef} 
          width={320} 
          height={100} 
          style={{
             position:"absolute", inset:0, 
             cursor: 'url("https://media.geeksforgeeks.org/wp-content/uploads/20231030101751/bx-eraser-icon.png"), auto', 
             width:"100%", height:"100%", 
             opacity: isRevealed ? 0 : 1, 
             transition: "opacity 0.6s ease", 
             pointerEvents: isRevealed ? "none" : "auto", 
             zIndex:10,
             WebkitUserSelect: "none",
             userSelect: "none",
             WebkitTouchCallout: "none",
             WebkitTapHighlightColor: "transparent"
          }} 
       />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [activeCountry, setActiveCountry] = React.useState(COUNTRIES[0]);
  const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
  const [page, setPage] = useState("home");
  const [collectionCategory, setCollectionCategory] = useState("Khadlaj");
  const [cartItems, setCartItems] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupState, setPopupState] = useState("scratch"); // "email", "scratch", "revealed"
  const [popupDone, setPopupDone] = useState(false);

  const [tiltStyle, setTiltStyle] = useState({});
  const handleTilt = (e) => {
    if(window.innerWidth <= 600) return; // Disable tilt on mobile
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out"
    });
  };
  const resetTilt = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out"
    });
  };

  const cartCount = cartItems.reduce((sum, item)=>sum + item.qty, 0);
  const addToCart = (product, qty=1) => {
    if (!product) return;
    const safeQty = Math.max(1, Number(qty) || 1);
    setCartItems(items=>{
      const exists = items.find(item=>item.id === product.id);
      if (exists) {
        return items.map(item=>item.id === product.id ? {...item, qty:item.qty + safeQty} : item);
      }
      return [...items, {...product, qty:safeQty}];
    });
  };
  const updateCartQty = (id, qty) => {
    setCartItems(items=>items
      .map(item=>item.id === id ? {...item, qty:Math.max(0, qty)} : item)
      .filter(item=>item.qty > 0)
    );
  };
  const removeFromCart = (id) => setCartItems(items=>items.filter(item=>item.id !== id));
  const clearCart = () => setCartItems([]);

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const chatMessagesRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to Khadlaj Perfumes. I can help with collections, products, shipping, discounts, or any page on the website." }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputVal.trim() || loading) return;
    const userMsg = { role: "user", content: inputVal };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputVal("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.error || "I am unable to answer right now. Please try again in a moment." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "I am unable to connect right now. Please check your network connection and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const t = setTimeout(()=>setShowPopup(true), 6000);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  const renderPage = () => {
    switch(page){
      case "home":        return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
      case "collections": return <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage} collectionCategory={collectionCategory}/>;
      case "lafede":      return <LaFedePage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "product":     return viewProduct ? <ProductPage product={viewProduct} addToCart={addToCart} setPage={setPage} setViewProduct={setViewProduct}/> : <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage} collectionCategory={collectionCategory}/>;
      case "gifts":       return <GiftsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "cart":        return <CartPage cartItems={cartItems} updateCartQty={updateCartQty} removeFromCart={removeFromCart} setPage={setPage} setViewProduct={setViewProduct}/>;
      case "checkout":    return <CheckoutPage cartItems={cartItems} setPage={setPage} clearCart={clearCart}/>;
      case "story":       return <StoryPage/>;
      case "signup":      return <SignupPage/>;
      case "contact":     return <ContactPage/>;
      default:            return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
    }
  };

  return (
    <CountryContext.Provider value={{ activeCountry, setActiveCountry }}>
    <div style={{fontFamily:"'Montserrat',sans-serif",background:"#fff",color:"#251737",minHeight:"100vh"}}>
      <style>{GLOBAL_CSS + `\n@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} setCollectionCategory={setCollectionCategory} collectionCategory={collectionCategory} activeCountry={activeCountry}/>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>

      {/* ── Floating Shop button ── */}
      {page==="home" && (
        <button
          className="pulse"
          onClick={()=>setPage("collections")}
          style={{
            position:"fixed",bottom:24,right:24,zIndex:200,
            background:"#251737",color:"#fff",
            width:46,height:46,borderRadius:"50%",
            border:"none",cursor:"pointer",
            boxShadow:"0 8px 28px rgba(0,0,0,.25)",
            fontSize:18,transition:"background .2s,transform .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.transform="scale(1.06)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#251737";e.currentTarget.style.transform="scale(1)";}}
          title="Shop Now"
        >🛍</button>
      )}

      {/* ── Chatbot Floating Button ── */}
      <button
        onClick={()=>setChatOpen(!chatOpen)}
        style={{
          position:"fixed",bottom:24,left:24,zIndex:200,
          background:"#251737",color:"#fff",
          width:46,height:46,borderRadius:"50%",
          border:"none",cursor:"pointer",
          boxShadow:"0 8px 28px rgba(0,0,0,.25)",
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"background .2s,transform .2s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.transform="scale(1.06)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="#251737";e.currentTarget.style.transform="scale(1)";}}
        title="Chat with Us"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>

      {/* ── Chatbot Window Panel ── */}
      {chatOpen && (
        <div style={{
          position:"fixed", bottom:84, left:24, width:320, height:420,
          zIndex:200, background:"rgba(255, 255, 255, 0.98)",
          border:"1px solid rgba(0,0,0,0.1)", borderRadius:12,
          boxShadow:"0 16px 40px rgba(0,0,0,0.15)",
          display:"flex", flexDirection:"column", overflow:"hidden",
          animation:"fadeUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
          fontFamily:"'Montserrat',sans-serif"
        }}>
          {/* Header */}
          <div style={{background:"#251737", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <div style={{width:8, height:8, borderRadius:"50%", background:"#2ec4b6"}}></div>
              <div>
                <p style={{fontSize:11, letterSpacing:2, color:"#B8922A", textTransform:"uppercase", margin:0, fontWeight:600}}>Scent Assistant</p>
                <p style={{fontSize:9, color:"rgba(255,255,255,0.7)", margin:0}}>Khadlaj Perfumes</p>
              </div>
            </div>
            <button onClick={()=>setChatOpen(false)} style={{background:"none", border:"none", color:"#fff", fontSize:18, cursor:"pointer", padding:0}}>×</button>
          </div>

          {/* Messages list */}
          <div ref={chatMessagesRef} style={{flex:1, padding:20, overflowY:"auto", display:"flex", flexDirection:"column", gap:12, background:"#FCFBFA"}} className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                background: msg.role === "user" ? "#000" : "#fff",
                color: msg.role === "user" ? "#fff" : "#111",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                border: msg.role === "user" ? "none" : "1px solid #E8E4DC",
              }}>
                <p style={{fontSize:12, margin:0, lineHeight:1.45, whiteSpace:"pre-line"}}>{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div style={{alignSelf:"flex-start", maxWidth:"80%", background:"#fff", padding:"10px 14px", borderRadius:"12px 12px 12px 0", border:"1px solid #E8E4DC", boxShadow:"0 2px 8px rgba(0,0,0,0.03)"}}>
                <p style={{fontSize:11, color:"#888", margin:0}}>Assistant is writing...</p>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div style={{padding:"14px 16px", borderTop:"1px solid #E8E4DC", background:"#fff", display:"flex", gap:10, alignItems:"center"}}>
            <input
              type="text"
              placeholder="Ask about our perfumes..."
              value={inputVal}
              onChange={e=>setInputVal(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter") handleSendMessage();}}
              style={{
                flex:1, border:"1px solid #E8E4DC", padding:"10px 14px",
                fontSize:12, outline:"none", borderRadius:6,
                fontFamily:"'Montserrat',sans-serif"
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                background:"#251737", border:"none", color:"#fff",
                padding:"10px 14px", borderRadius:6, cursor:"pointer",
                fontSize:11, fontWeight:600, textTransform:"uppercase"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

{/* ── Newsletter Popup ── */}
      {showPopup && !popupDone && (
        <div
          className="popup-overlay"
          onClick={()=>setShowPopup(false)}
        >
          <div
            className="popup-in"
            onClick={e=>e.stopPropagation()}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{
              background:"linear-gradient(135deg, #251737 0%, #1A0B22 100%)",maxWidth:440,width:"90%",
              overflow:"visible",boxShadow:"0 32px 80px rgba(0,0,0,.4)",
              position:"relative", borderRadius:12,
              border:"1px solid rgba(212,175,55,.45)",
              padding: "40px 30px",
              boxSizing: "border-box",
              ...tiltStyle
            }}
          >
            <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:12,right:12,background:"rgba(212,175,55,0.1)",border:"none",width:30,height:30,borderRadius:"50%",fontSize:18,cursor:"pointer",color:"#D4AF37",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(212,175,55,0.2)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(212,175,55,0.1)";}}>×</button>
            
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              {popupState === "scratch" ? (
                <div style={{textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <p style={{fontSize:15,letterSpacing:5,color:"#D4AF37",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14, fontWeight:700}}>Exclusive Privilege</p>
                  <h3 className="disp mobile-text" style={{fontSize:26,fontWeight:400,color:"#F9F4EB",marginBottom:28,lineHeight:1.15}}>Your Private Invitation</h3>
                  
                  <ScratchCard code="KHADLAJ10" onReveal={() => {
                     setTimeout(() => setPopupState("revealed"), 800);
                  }} />
                  
                  <button onClick={()=>setShowPopup(false)} style={{background:"none", border:"none", fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", textAlign:"center", marginTop:24, cursor:"pointer", fontFamily:"'Montserrat',sans-serif", borderBottom:"1px solid transparent", transition:"all 0.3s", paddingBottom:2}}
                    onMouseEnter={e=>{e.currentTarget.style.color="#D4AF37";}}
                    onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.4)";}}
                  >Decline Offer</button>
                </div>
              ) : (
                <div className="glow-up" style={{textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <p style={{fontSize:15,letterSpacing:5,color:"#D4AF37",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12, fontWeight:700}}>Reward Claimed</p>
                  <h3 className="disp mobile-text" style={{fontSize:26,fontWeight:400,color:"#F9F4EB",marginBottom:12,lineHeight:1.15}}>VIP Privilege Unlocked</h3>
                  <p style={{fontSize:11,color:"rgba(249,244,235,0.7)",lineHeight:1.6,fontFamily:"'Montserrat',sans-serif",marginBottom:30}}>Your exclusive 10% discount is ready. Apply this code at checkout.</p>
                  
                  <div style={{
                      position: "relative",
                      padding:"3px", 
                      background:"linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #A67C00 100%)", 
                      borderRadius: 16, 
                      marginBottom: 30, 
                      boxShadow:"0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.2)"
                  }}>
                    <div style={{
                        background: "linear-gradient(135deg, #1A0B22 0%, #0d0412 100%)",
                        borderRadius: 14,
                        padding: "20px 36px",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                       <div style={{position:"absolute", inset:0, opacity:0.1, backgroundImage:"radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize:"12px 12px"}} />
                       <div style={{position:"absolute", top:"-50%", left:"-50%", width:"200%", height:"200%", background:"conic-gradient(from 90deg at 50% 50%, rgba(212,175,55,0) 0%, rgba(212,175,55,0.1) 50%, rgba(212,175,55,0) 100%)", animation:"spin 10s linear infinite"}} />
                       
                       <p style={{fontSize: 9, letterSpacing: 5, color:"#F3E5AB", textTransform:"uppercase", marginBottom: 6, zIndex:2, position:"relative", opacity: 0.8}}>Discount Code</p>
                       <p style={{
                           fontSize: 30, 
                           fontWeight:900, 
                           margin:0, 
                           background: "linear-gradient(to bottom, #FFF 0%, #F3E5AB 50%, #D4AF37 100%)", 
                           WebkitBackgroundClip: "text", 
                           WebkitTextFillColor: "transparent",
                           letterSpacing: 8, 
                           filter: "drop-shadow(0 4px 15px rgba(212,175,55,0.5))",
                           position: "relative",
                           zIndex: 2,
                           fontFamily: "'Cinzel', serif"
                       }}>KHADLAJ10</p>
                    </div>
                  </div>

                  <button
                    onClick={()=>{
                      navigator.clipboard.writeText("KHADLAJ10");
                      setPopupDone(true);
                      setShowPopup(false);
                    }}
                    style={{
                       width:"100%",
                       background:"linear-gradient(90deg, #A67C00 0%, #F3E5AB 50%, #A67C00 100%)",
                       backgroundSize: "200% auto",
                       color:"#1A0B22",
                       border:"none",
                       padding:"18px",
                       fontSize:12,
                       letterSpacing:3,
                       textTransform:"uppercase",
                       cursor:"pointer",
                       fontFamily:"'Montserrat',sans-serif",
                       fontWeight:800,
                       transition:"all 0.5s ease",
                       borderRadius: 6,
                       boxShadow: "0 10px 30px rgba(212,175,55,0.4)"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundPosition="right center"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 15px 40px rgba(212,175,55,0.6)";}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundPosition="left center"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(212,175,55,0.4)";}}
                  >Copy Code & Shop Now</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </CountryContext.Provider>
  );
}







