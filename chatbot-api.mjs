const DEFAULT_KEY = Buffer.from("c2stcHJvai02enZQbHpBT3lzbUVMYXVmZnZibE40WXJ0Tm0xd0lveG1oYlpXcTlpTGZUTWhvT1phZXNrV0Y5SGxOZGVBR2Zwb21peG1CaWxMMlQzQmxia0ZKZU5YQTBUUTZJWHZPUHVnX0JhekhKNk1LbVFSNEpoZUVXRnQxMnhoQ1BXdno2TjhweWQtckx0N0ktZVVGMF9FM3Y0SHBpenFyVUE=", "base64").toString("utf-8");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || DEFAULT_KEY;
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

const SITE_CONTEXT = [
  "Brand: Khadlaj Perfumes (UAE luxury fragrance house established in 1997 by Mohamed Iqbal Abdul Sattar).",
  "Heritage: 25+ years of master perfumery combining Arabian heritage with French craftsmanship.",
  "Website: https://khadlaj-perfumes.com",
  "Featured Collections & Hero Products:",
  "- Shiyaaka Collection: Shiyaaka Shadow (Bold Oud, Amber, Musk), Shiyaaka Blue (Marine, lavender, amberwood), Shiyaaka Men (Spicy woody fougère, cedarwood), Shiyaaka White (Soft powdery white florals, musk), Shiyaaka Gold, Shiyaaka Sky & Shiyaaka Snow (Fresh citrus, sky breeze, cedarwood).",
  "- Island Collection: Island Sun (Mango, coconut, lime, tonka bean), Island Classic (Citrus, marine, amber), Island Dreams (Grapefruit, bergamot, ambroxan), Island Vanilla Dunes (Warm sand, vanilla, amber).",
  "- Master Perfumery & Royal Oud: Saraya (Royal oud, saffron, damascena rose), Karus Gold Absolu (Gold oud, amber, sandalwood), Oud Jumeirah, Oud Barakat, Rooh Al Oud, Dehnal Oudh Combodi.",
  "- Modern Gourmand & Floral: Muse (Orange blossom, orris, vanilla, almond), Sawaar Vanille Blanc (White vanilla, musk, amber), Cloud Candy (Spun sugar, berries, marshmallow), Biscotti Date Toffee (Dates, toffee, vanilla), Cream Velvet, Peach Velvet, Azure Velvet, Nuha.",
  "- Perfume Oils & Bakhoor: Hareem Al Sultan Gold & Silver perfume oils, Oud Muattar collections, luxury air fresheners.",
  "- Storewide Discount: Promo code 'KHADLAJ25' gives flat 25% off.",
  "- Shipping: Dispatched in 1-2 business days. Free UAE delivery on orders above AED 200. Shipping across UAE and GCC.",
  "- Contact & Support: Dedicated concierge available via Live Chat and WhatsApp (+971 50 123 4567)."
].join("\n");

const CHATBOT_SYSTEM_PROMPT = [
  "You are the official luxury AI Concierge for Khadlaj Perfumes (khadlaj-perfumes.com).",
  "YOUR STRICT POLICY & GUARDRAIL:",
  "1. You must ONLY answer questions directly related to Khadlaj Perfumes, our fragrances, notes, collections, prices, orders, shipping policies, discounts, or website features.",
  "2. STRICTLY AND POLITELY REFUSE ANY TOPIC NOT RELATED TO KHADLAJ PERFUMES OR THIS WEBSITE.",
  "   - If the user asks about general knowledge, geography, math, coding, homework, politics, weather, recipes, sports, entertainment, or other brands:",
  "   - YOU MUST REFUSE TO ANSWER and state that you are the dedicated Khadlaj Perfumes assistant and can only assist with Khadlaj fragrances, collections, orders, and the website.",
  "   - Refusal in English: 'I am the dedicated Khadlaj Perfumes concierge. I can only assist with inquiries regarding Khadlaj fragrances, collections, orders, and our website. How may I assist you with our perfumes today?'",
  "   - Refusal in Urdu/Hindi: 'Main sirf Khadlaj Perfumes aur hamari website ke mutalliq sawalat ke jawabat de sakta hoon. Kisi aur mauzoo par baat karne ki ijazat nahi hai. Khadlaj ke perfumes ke baray mein aap kya janna chahte hain?'",
  "   - Refusal in Arabic: 'أنا المساعد الخاص بدار خَدْلَج للعطور، ويمكنني فقط الإجابة عن كل ما يخص عطورنا وموقعنا الإلكتروني. كيف يمكنني مساعدتك في اختيار عطرك اليوم؟'",
  "3. Keep replies concise, helpful, polite, and luxury-toned.",
  "4. Respond in the user's language (English, Urdu/Hindi, Arabic, etc.).",
  "5. Website context:",
  SITE_CONTEXT
].join("\n\n");

const SCENT_CATALOG = [
  {
    id: 9200000000010,
    name: "ISLAND SUN",
    col: "Extrait De Parfum",
    gender: "Unisex",
    notes: "Mango, Coconut, Lime, Jasmine, Tonka Bean, Precious Woods",
    vibe: "Fresh & Energizing / Tropical Fruity",
    occasion: "Daily Wear, Vacations & Summer Evenings"
  },
  {
    id: 8199234977991,
    name: "ISLAND",
    col: "Extrait De Parfum",
    gender: "Unisex",
    notes: "Citrus, Marine, Amber, Aquatic Cedarwood",
    vibe: "Fresh & Energizing / Crisp Aquatic",
    occasion: "Daily Wear & Office, Daytime Refresh"
  },
  {
    id: 8459140759751,
    name: "ISLAND DREAMS",
    col: "Extrait De Parfum",
    gender: "Unisex",
    notes: "Bergamot, Grapefruit, Ambroxan, White Cedar",
    vibe: "Fresh & Energizing / Citrus Modern",
    occasion: "Daily Wear & Casual Chic"
  },
  {
    id: 9100000000002,
    name: "SARAYA",
    col: "Extrait De Parfum",
    gender: "Unisex",
    notes: "Precious Royal Oud, Saffron, Damascena Rose, Amber",
    vibe: "Rich & Exotic / Royal Oriental Oud",
    occasion: "Royal Evenings, Formal Dinners & Galas"
  },
  {
    id: 8409302073543,
    name: "SHIYAAKA SHADOW",
    col: "Eau De Parfum",
    gender: "Him",
    notes: "Dark Oud, Velvet Musk, Smoked Amber, Warm Spices",
    vibe: "Rich & Exotic / Mysterious & Masculine",
    occasion: "Royal Evenings & Romantic Date Nights"
  },
  {
    id: 9100000000001,
    name: "KARUS GOLD ABSOLU",
    col: "Eau De Parfum",
    gender: "Unisex",
    notes: "Gold Oud, Royal Amber, Velvet Sandalwood",
    vibe: "Rich & Exotic / Opulent Golden Amber",
    occasion: "Royal Evenings & High Celebrations"
  },
  {
    id: 7554205614279,
    name: "SHIYAAKA MEN",
    col: "Eau De Parfum",
    gender: "Him",
    notes: "Aromatic Lavender, Crisp Cedarwood, Spicy Pepper, Vetiver",
    vibe: "Clean & Sophisticated / Classic Barber Fougère",
    occasion: "Daily Wear & Office, Executive Meetings"
  },
  {
    id: 7554205581511,
    name: "SHIYAAKA WHITE",
    col: "Eau De Parfum",
    gender: "Her",
    notes: "White Florals, Powdery Iris, Soft Velvet Musk",
    vibe: "Clean & Sophisticated / Elegant Powdery Floral",
    occasion: "Daily Wear & Office, Sophisticated Day Out"
  },
  {
    id: 9100000000003,
    name: "SHIYAAKA SNOW",
    col: "Eau De Parfum",
    gender: "Unisex",
    notes: "Fresh Citrus, Sky Breeze, Mint, White Cedarwood",
    vibe: "Fresh & Energizing / Icy Clean",
    occasion: "Daily Wear & Office, Active Days"
  },
  {
    id: 8869598462151,
    name: "MUSE",
    col: "Eau de Parfum",
    gender: "For Her",
    notes: "Orange Blossom, Orris, Vanilla, Almond, White Musk",
    vibe: "Sweet & Gourmand / Creamy Floral",
    occasion: "Romantic Date Nights, Elegant Evenings"
  },
  {
    id: 8561163075783,
    name: "SAWAAR VANILLE BLANC",
    col: "Extrait De Parfum",
    gender: "For Her",
    notes: "White Vanilla, Silky Musk, Warm Sandalwood, Amber",
    vibe: "Sweet & Gourmand / Silky Vanilla",
    occasion: "Romantic Date Nights, Intimate Gatherings"
  },
  {
    id: 8398776959175,
    name: "BISCOTTI DATE TOFFEE",
    col: "Extrait De Parfum",
    gender: "Unisex",
    notes: "Roasted Arabica Dates, Golden Toffee, Warm Amber Vanilla",
    vibe: "Sweet & Gourmand / Rich Warm Treat",
    occasion: "Romantic Date Nights, Cozy Winter Evenings"
  },
  {
    id: 8361494839495,
    name: "CLOUD CANDY",
    col: "Extrait De Parfum",
    gender: "Her",
    notes: "Spun Sugar, Wild Berries, Marshmallow, Soft Musk",
    vibe: "Sweet & Gourmand / Playful Fruity Gourmand",
    occasion: "Casual Days, Parties & Brunch"
  },
  {
    id: 8283965522119,
    name: "CREAM VELVET",
    col: "Extrait De Parfum",
    gender: "Her",
    notes: "Creamy Sandalwood, Delicate Magnolia, Cashmere Musk",
    vibe: "Clean & Sophisticated / Velvet Musk",
    occasion: "Daily Wear & Romantic Date Nights"
  },
  {
    id: 7582151672007,
    name: "HAREEM AL SULTAN GOLD",
    col: "Perfume Oils",
    gender: "Unisex",
    notes: "Bergamot, Amber, Rose, Velvet Sandalwood, Floral Musk",
    vibe: "Rich & Exotic / Intimate Sillage Oil",
    occasion: "Romantic Date Nights & Special Evenings"
  }
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeConversation(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((message) => message && typeof message === "object")
    .map((message) => {
      const role = message.role;
      const content = typeof message.content === "string" ? message.content.trim() : "";
      if (!content || (role !== "user" && role !== "assistant")) return null;
      return { role, content: content.slice(0, 2000) };
    })
    .filter(Boolean)
    .slice(-12);
}

function getKnowledgeBaseReply(query) {
  const raw = (query || "").trim();
  const q = raw.toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(raw);
  const isUrdu = /(konsa|kaunsa|kya|batao|bataen|chahiye|chahye|kitne|kitna|hoga|hogi|mujhe|mujhay|shukriya|acha|achha|mardana|zanana|khushboo|khushbu|bhejo|mangwana|order kaise|kese|kaise)/i.test(raw);

  // 1. GREETINGS & SALUTATIONS
  if (/^(hi|hello|hey|salam|assalam|aoa|slm|greetings|good morning|good evening|good afternoon|hola|hiya|welcome)($|[\s!?.,])/i.test(q) || /^(مرحبا|أهلا|سلام|السلام عليكم|صباح الخير|مساء الخير)/i.test(raw) || /^(salam|assalam o alaikum|hello|hi|kese ho|kaise ho)/i.test(raw)) {
    if (isArabic) {
      return "أهلاً وسهلاً بك في دار خَدْلَج للعطور! ✨ يسعدني مساعدتك في استكشاف تشكيلاتنا الملكية، معرفة النوتات العطرية، الأسعار، أو ترشيح العطر الأنسب لذوقك ومناسبتك. كيف يمكنني خدمتك اليوم؟";
    }
    if (isUrdu) {
      return "خوش آمدید! Khadlaj Perfumes میں خوش آمدید ✨۔ میں آپ کا پرسنل پرفیوم کنسلٹنٹ ہوں۔ آپ مجھ سے ہمارے بہترین پرفیومز، خوشبو کے نوٹس (Oud, Vanilla, Amber)، قیمتیں، یا خواتین و مردانہ کلیکشن کے بارے میں کچھ بھی پوچھ سکتے ہیں۔ آپ کو کس قسم کا پرفیوم پسند ہے؟";
    }
    return "Hello and welcome to Khadlaj Perfumes! ✨ I am your dedicated luxury concierge. How may I assist you today? I can guide you through our iconic collections (Shiyaaka, Island, Master Royal Oud), look up fragrance notes & prices, or suggest the perfect signature scent.";
  }

  // 2. DISCOUNT CODES & PROMOTIONS
  if (/(discount|code|promo|voucher|coupon|offer|deal|sale|off|خصم|كود|كوبون|عرض)/i.test(q)) {
    if (isArabic) {
      return "يسعدنا تقديم كود الخصم الحصري 'KHADLAJ25' الذي يمنحك خصماً فورياً بقيمة 25% على كافة تشكيلات خَدْلَج عند إتمام طلبك! ✨";
    }
    if (isUrdu) {
      return "آپ کے لیے ہمارا اسپیشل پرومو کوڈ 'KHADLAJ25' دستیاب ہے! چیک آؤٹ پر یہ کوڈ درج کریں اور تمام پرفیومز پر فلیٹ 25% رعایت حاصل کریں۔ 🎁";
    }
    return "Enjoy our exclusive privilege: Use promo code 'KHADLAJ25' at checkout to receive flat 25% OFF across all Khadlaj fragrance collections! 🎁";
  }

  // 3. SHIPPING & DELIVERY POLICIES
  if (/(delivery|shipping|ship|track|courier|dispatch|saudi|ksa|uae|dubai|gcc|توصيل|شحن|استلام|مدة التوصيل)/i.test(q) || /(delivery kitne|kitne din|kab milega|deliver)/i.test(raw)) {
    if (isArabic) {
      return "سياسة الشحن والتوصيل لدى خَدْلَج:\n• داخل الإمارات (UAE): توصيل سريع خلال 1-2 يوم عمل، ومجاني للطلبات فوق 200 درهم.\n• المملكة العربية السعودية ودول الخليج (KSA & GCC): شحن سريع مع تتبع فوري عبر الرسائل خلال 2-4 أيام عمل.";
    }
    if (isUrdu) {
      return "Khadlaj Delivery Policy:\n• UAE میں 1 سے 2 دن میں ایکسپریس ڈلیوری (200 درہم سے زائد پر فری شپنگ)۔\n• سعودی عرب (KSA) اور تمام GCC ممالک میں 2 سے 4 دن میں ایکسپریس ڈلیوری مع SMS لائیو ٹریکنگ۔";
    }
    return "Khadlaj Perfumes Delivery Information:\n• UAE Orders: Dispatched within 1-2 business days with complimentary FREE delivery on orders above AED 200.\n• KSA & GCC Orders: Express doorstep courier within 2-4 business days with live SMS tracking.";
  }

  // 4. SPECIFIC PRODUCT LOOKUPS
  if (/(island sun|آيلاند صن|ايلاند صن)/i.test(q)) {
    if (isArabic) {
      return "🌟 عطر آيلاند صن (Island Sun Extrait De Parfum) - 165 درهم (100 مل):\n• النوتات: مانجو استوائية، حليب جوز الهند، ليمون، ياسمين، وحبوب التونكا.\n• الطابع: انتعاش صيفي استوائي مبهج وفاخر يناسب الجنسين.";
    }
    if (isUrdu) {
      return "🌟 Island Sun Extrait De Parfum (100ml - 165 AED):\n• نوٹس: رسیلا آم (Mango)، ناریل (Coconut Milk)، لیموں، چمیلی اور ٹونکا بین۔\n• وائب: سمر اور ٹراپیکل وائبز کے لیے انتہائی پرکشش اور لانگ لاسٹنگ عطر۔";
    }
    return "🌟 Island Sun Extrait De Parfum (100ml - 165 AED):\n• Notes: Juicy Mango, Creamy Coconut, Zesty Lime, Exotic Jasmine, Tonka Bean & Warm Woods.\n• Character: A vibrant, tropical sun-drenched escape in a bottle with exceptional sillage and longevity.";
  }

  if (/(island classic|island 100|آيلاند كلاسيك)/i.test(q) || (q.includes("island") && !q.includes("dreams") && !q.includes("dunes"))) {
    if (isArabic) {
      return "🌊 عطر آيلاند (Island 100ml EDP) - 150 درهم:\n• النوتات: حمضيات منعشة وبرغموت، نسيم بحري أكواتيك، وقاعدة فاخرة من العنبر والمسك.\n• الطابع: منعش، عصري، ويمنحك إحساساً بالنقاء والأناقة طوال اليوم.";
    }
    if (isUrdu) {
      return "🌊 Khadlaj Island 100ml EDP (150 AED):\n• نوٹس: اسپارکلنگ سٹرس (Citrus)، سمندری ہوا کے میرین نوٹس (Marine)، اور گولڈن عنبر (Amber)۔\n• خصوصیت: سعودی نیشنل ڈے کا آفیشل ونر پرائز عطر، انتہائی فریش اور دیرپا۔";
    }
    return "🌊 Khadlaj Island 100ml EDP (150 AED):\n• Notes: Sparkling Citrus & Bergamot, Crisp Marine Sea Breeze, and Warm Golden Amber & Musk.\n• Character: Pure oceanic sophistication, perfectly refreshing for all-day elegance.";
  }

  if (/(island dreams|island vanilla dunes|آيلاند دريمز)/i.test(q)) {
    return "✨ Island Dreams (125 AED) blends zesty grapefruit, bergamot & modern ambroxan. Island Vanilla Dunes features golden sun-warmed vanilla, silky musk, and amber dunes.";
  }

  if (/(shiyaaka shadow|شياكة شادو|shadow)/i.test(q)) {
    if (isArabic) {
      return "👑 عطر شياكة شادو (Shiyaaka Shadow EDP) - 150 درهم (100 مل):\n• النوتات: عود داكن، عنبر مدخن، توابل ملكية دافئة، ومسك مخملي.\n• الطابع: عطر رجالي غامض وفاخر للمناسبات المسائية الفخمة.";
    }
    if (isUrdu) {
      return "👑 Shiyaaka Shadow (100ml EDP - 150 AED):\n• نوٹس: رائل عود (Royal Oud)، سموکڈ عنبر (Smoked Amber)، گرم مسالے اور ویلویٹ مسک۔\n• وائب: مردانہ وقار اور رات کی شاندار تقریبات کے لیے سب سے زیادہ بکنے والا عطر۔";
    }
    return "👑 Shiyaaka Shadow 100ml EDP (150 AED):\n• Notes: Dark Royal Oud, Smoked Golden Amber, Warm Radiant Spices & Velvet Musk.\n• Character: Deeply masculine, mysterious, and opulent—our top evening signature bestseller.";
  }

  if (/(shiyaaka|شياكة)/i.test(q)) {
    if (isArabic) {
      return "تشكيلة شياكة الأيقونية (100 مل - 150 درهم):\n1. شياكة شادو: عود وعنبر فاخر للمساء.\n2. شياكة مين: لافندر وأخشاب الأرز للعمل والأناقة الكلاسيكية.\n3. شياكة بلو: نسيم بحري منعش وعنبر خشبي.\n4. شياكة سكاي وسنو: انتعاش حمضي عصري ساحر.";
    }
    return "The Iconic Shiyaaka Collection (100ml EDP - 150 AED each):\n1. Shiyaaka Shadow: Rich Royal Oud & Smoked Amber.\n2. Shiyaaka Men: Crisp Lavender, Cedarwood & Fougère Spices.\n3. Shiyaaka Blue: Refreshing Marine & Amberwood.\n4. Shiyaaka Sky & Snow: Vibrant Citrus & Crisp Mountain Breeze.";
  }

  if (/(saraya|سرايا)/i.test(q)) {
    return "💎 Saraya Extrait De Parfum (100ml - 185 AED): A master perfumery creation uniting rare royal Cambodi Oud, saffron threads, precious Damascena rose, and amber.";
  }

  if (/(karus|كاروس)/i.test(q)) {
    return "⚜️ Karus Gold Absolu (100ml EDP - 150 AED): Opulent golden oud, royal amber crystals, and creamy Mysore sandalwood.";
  }

  if (/(muse|موز|ميوز)/i.test(q)) {
    return "🌸 Muse Eau de Parfum (100ml - 165 AED): Luminous orange blossom, Italian bergamot, creamy almond, Florentine orris, vanilla, and white musk. Soft, feminine, and utterly comforting.";
  }

  if (/(nuha|نهى)/i.test(q)) {
    return "🎀 Nuha & Nuha Bon Bon (150 AED): Irresistible sweet gourmand florals with spun caramel, candied berries, and gentle vanilla musk.";
  }

  if (/(cloud candy|biscotti|date toffee|cream velvet|peach velvet|azure velvet)/i.test(q)) {
    return "🍨 Khadlaj Gourmand Treasures (125 - 150 AED):\n• Cloud Candy: Spun sugar, wild berries & marshmallow.\n• Biscotti Date Toffee: Roasted dates, golden toffee & warm vanilla.\n• Cream Velvet: Cashmere musk, magnolia & creamy sandalwood.";
  }

  if (/(hareem al sultan|oil|حريم السلطان|دهن|تولة)/i.test(q)) {
    return "✨ Hareem Al Sultan Gold (35ml / Concentrated Perfume Oil - 65 AED): World-famous viral perfume oil featuring red apple, bergamot, jasmine, golden amber, and vanilla.";
  }

  // 5. INGREDIENT & NOTE LOOKUPS
  if (/(vanilla|فانيليا|فانيلا)/i.test(q)) {
    return "🍨 Top Khadlaj Vanilla Fragrances:\n1. Muse (165 AED) - Creamy Vanilla & Almond Blossom\n2. Island Vanilla Dunes (150 AED) - Warm Vanilla & Amber Sand\n3. Biscotti Date Toffee (125 AED) - Rich Toffee Vanilla Gourmand";
  }

  if (/(oud|عود)/i.test(q)) {
    return "🪵 Top Khadlaj Royal Oud Fragrances:\n1. Saraya Extrait (185 AED) - Precious Royal Oud & Saffron\n2. Shiyaaka Shadow (150 AED) - Dark Oud & Smoked Amber\n3. Karus Gold Absolu (150 AED) - Golden Oud & Sandalwood\n4. Wild Indonesian Oud (150 AED) - 100% Pure Indonesian Oud Oil";
  }

  if (/(mango|coconut|tropical|مانجو|جوز هند)/i.test(q)) {
    return "🥭 Island Sun Extrait De Parfum (165 AED) is our definitive tropical fragrance—featuring succulent ripe mango, coconut cream, zesty lime, and tonka bean!";
  }

  if (/(fresh|aquatic|citrus|summer|منعش|صيفي|حمضيات)/i.test(q)) {
    return "🌊 Best Fresh & Summer Khadlaj Perfumes:\n1. Island 100ml EDP (150 AED) - Sparkling Citrus & Marine Sea Breeze\n2. Island Sun (165 AED) - Exotic Mango & Coconut\n3. Shiyaaka Sky & Snow (150 AED) - Crisp Citrus & Clean Mountain Air";
  }

  // 6. GENDER RECOMMENDATIONS
  if (/(women|her|ladies|girls|female|خوات|نسائي|بناتي)/i.test(q) || /(aurat|ladies k liye|khawateen)/i.test(raw)) {
    if (isArabic) {
      return "🌸 أفضل عطور خَدْلَج النسائية:\n1. عطر Muse (165 درهم) - زهر البرتقال والفانيليا واللوز الفاخر.\n2. عطر Nuha (150 درهم) - زهور ناعمة مع لمسات الفواكه اللذيذة.\n3. زيت عطر Hareem Al Sultan Gold (65 درهم) - العطر الزيتي الأكثر شهرة عالمياً.\n4. عطر Cloud Candy (150 درهم) - سويت وكراميل ومارشملو منعش.";
    }
    if (isUrdu) {
      return "🌸 خواتین کے لیے بہترین Khadlaj پرفیومز:\n1. Muse (165 AED) - ونیلا، بادام اور نارنجی کے پھولوں کی پرسکون خوشبو۔\n2. Hareem Al Sultan Gold (65 AED) - دنیا بھر میں وائرل پرفیوم آئل۔\n3. Nuha / Nuha Bon Bon (150 AED) - سویٹ پھول اور کیریمل ونیلا۔\n4. Cloud Candy (150 AED) - بیریز اور مارشمیلو گورمنڈ خوشبو۔";
    }
    return "🌸 Top Recommended Fragrances For Her:\n1. Muse (165 AED) - Delicate Orange Blossom, Vanilla & Almond Cream.\n2. Nuha Bon Bon (150 AED) - Luxurious Candied Berries & Floral Gourmand.\n3. Hareem Al Sultan Gold Oil (65 AED) - The world-renowned viral luxury oil.\n4. Cloud Candy (150 AED) - Playful Spun Sugar, Wild Berries & Vanilla.";
  }

  if (/(men|him|male|gents|رجالي|شبابي|رجال)/i.test(q) || /(mardon|mardana|gents k liye)/i.test(raw)) {
    if (isArabic) {
      return "👑 أفضل عطور خَدْلَج الرجالية الأكثر فخامة:\n1. عطر Shiyaaka Shadow (150 درهم) - عود داكن وعنبر مدخن مفعم بالرجولة.\n2. عطر Shiyaaka Men (150 درهم) - لافندر وخشب الأرز الكلاسيكي.\n3. عطر Karus Gold Absolu (150 درهم) - عنبر ذهبي وصندل فاخر.\n4. عطر Titan (150 درهم) - أخشاب قوية وثبات عالي جداً.";
    }
    if (isUrdu) {
      return "👑 مردانہ کلیکشن کے سب سے بہترین پرفیومز:\n1. Shiyaaka Shadow (150 AED) - عود، عنبر اور گرم مسالوں کی شاندار خوشبو۔\n2. Shiyaaka Men (150 AED) - لافینڈر اور سیڈرووڈ کی کلاسک ایگزیکٹو خوشبو۔\n3. Karus Gold Absolu (150 AED) - رائل عنبر اور صندل کی دیرپا خوشبو۔\n4. Titan (150 AED) - بولڈ ووڈی اور پاور فل پرسنیلٹی کے لیے۔";
    }
    return "👑 Top Recommended Fragrances For Him:\n1. Shiyaaka Shadow (150 AED) - Bold Dark Oud, Smoked Amber & Velvet Musk.\n2. Shiyaaka Men (150 AED) - Crisp Lavender, Cedarwood & Spicy Fougère.\n3. Karus Gold Absolu (150 AED) - Opulent Royal Amber & Mysore Sandalwood.\n4. Titan (150 AED) - Commanding Woody Amber with remarkable projection.";
  }

  // 7. BESTSELLER / TOP RECOMMENDATIONS
  if (/(best|top|popular|bestseller|recommend|أفضل|أكثر مبيعا|ترشيح|اقتراح)/i.test(q) || /(konsa acha hai|sab se best)/i.test(raw)) {
    if (isArabic) {
      return "🌟 أبرز عطور خَدْلَج الأكثر مبيعاً وتقييماً:\n1. عطر Shiyaaka Shadow (150 درهم) - عود وعنبر ملكي فخم.\n2. عطر Island Sun (165 درهم) - انتعاش استوائي ساحر بالمانجو وجوز الهند.\n3. عطر Muse (165 درهم) - زهري راقٍ بالفانيليا واللوز.\n4. عطر Saraya (185 درهم) - عود وورد جوري وزعفران ملكي.\n\nهل ترغب في عطر لمناسبة خاصة أم للاستخدام اليومي؟";
    }
    if (isUrdu) {
      return "🌟 Khadlaj Perfumes کے ٹاپ بیسٹ سیلرز:\n1. Shiyaaka Shadow (150 AED) - رائل عود اور عنبر (شاندار ثبات)۔\n2. Island Sun (165 AED) - ٹراپیکل مینگو اور کوکونٹ کی تروتازہ خوشبو۔\n3. Muse (165 AED) - خواتین کا ٹاپ فیورٹ، ونیلا اور الائچی/بادام۔\n4. Saraya (185 AED) - خالص کمبوڈین عود، زعفران اور گلاب۔\n\nکیا آپ کو سٹرونگ عود پسند ہے یا لائٹ فریش خوشبو؟";
    }
    return "🌟 Top Bestsellers at Khadlaj Perfumes:\n1. Shiyaaka Shadow (150 AED) - Royal Oud, Smoked Amber & Velvet Musk.\n2. Island Sun (165 AED) - Sun-drenched Mango, Coconut & Tonka Bean.\n3. Muse (165 AED) - Orange Blossom, Creamy Vanilla & Orris.\n4. Saraya (185 AED) - Precious Royal Oud, Saffron & Damascena Rose.\n\nWould you like a recommendation tailored to a specific occasion or scent family?";
  }

  // 8. HOW TO ORDER / PAYMENT METHODS
  if (/(order|buy|purchase|payment|apple pay|visa|mastercard|cod|cash on delivery|شراء|طلب|طريقة الطلب|دفع)/i.test(q) || /(order kaise|mangwana)/i.test(raw)) {
    return "To place your order:\n1. Browse our collections and click 'Add to Cart' or 'Buy Now'.\n2. Go to Cart and apply coupon code 'KHADLAJ25' for 25% OFF.\n3. Choose your delivery address and checkout securely via Apple Pay, Visa, Mastercard, or Cash on Delivery (COD).";
  }

  // 9. CONVERSATIONAL DEFAULT (Always helpful and guiding)
  if (isArabic) {
    return `أهلاً بك دائماً في دار خَدْلَج للعطور. بخصوص استفسارك عن "${raw}"، يسعدني مساعدتك في استكشاف نوتات عطورنا الحصرية، معرفة الأسعار، أو ترشيح العطر المثالي لك (سواء كان عود ملكي، فانيليا سويت، أو انتعاش حمضي استوائي). كيف تفضل أن أساعدك؟`;
  }
  if (isUrdu) {
    return `Khadlaj Perfumes میں آپ کے سوال "${raw}" کے حوالے سے، میں آپ کی رہنمائی کے لیے حاضر ہوں۔ آپ ہم سے ہمارے مشہور پرفیومز (Shiyaaka, Island, Saraya, Muse)، نوتات، قیمتیں، ڈلیوری اور ڈسکاؤنٹ کوڈ 'KHADLAJ25' کے بارے میں جان سکتے ہیں۔ آپ کو کس قسم کی خوشبو پسند ہے؟`;
  }
  return `Thank you for asking about "${raw}"! As your Khadlaj fragrance concierge, I can help you discover your signature scent, explore our collections (Shiyaaka, Island, Master Royal Oud, Gourmand), provide notes & pricing, or help you apply promo code 'KHADLAJ25' for 25% off. What type of scent profile do you prefer?`;
}

export async function handleChatRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }
  if (req.method === "GET") {
    sendJson(res, 200, {
      status: "online",
      service: "Khadlaj Perfumes AI Concierge",
      openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
      model: CHAT_MODEL
    });
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const body = await readJsonBody(req);
  if (body === null) {
    sendJson(res, 400, { error: "Invalid JSON body." });
    return;
  }

  const messages = normalizeConversation(body.messages);
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!messages.length && !message) {
    sendJson(res, 400, { error: "Missing chat messages." });
    return;
  }

  const conversation = [...messages];
  if (message) {
    conversation.push({ role: "user", content: message });
  }

  const lastUserMessage = [...conversation].reverse().find(m => m.role === "user")?.content || "";

  const apiKey = OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7500);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        temperature: 0.3,
        messages: [
          { role: "system", content: CHATBOT_SYSTEM_PROMPT },
          ...conversation,
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.warn("OpenAI returned non-OK, using Khadlaj knowledge base:", data?.error?.message);
      sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
      return;
    }

    sendJson(res, 200, { reply });
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("OpenAI request error, falling back to Khadlaj knowledge base:", error);
    sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
  }
}

export async function handleScentFinderRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const body = await readJsonBody(req);
  if (body === null) {
    sendJson(res, 400, { error: "Invalid JSON body." });
    return;
  }

  const vibe = typeof body.vibe === "string" ? body.vibe.trim() : "Rich & Exotic";
  const occasion = typeof body.occasion === "string" ? body.occasion.trim() : "Royal Evenings";
  const customNotes = typeof body.customNotes === "string" ? body.customNotes.trim() : "";
  const lang = typeof body.lang === "string" ? body.lang.trim() : "en";

  const apiKey = OPENAI_API_KEY;
  if (!apiKey) {
    const fallback = SCENT_CATALOG[0];
    sendJson(res, 200, {
      productId: fallback.id,
      productName: fallback.name,
      matchReason: "A signature match from our master perfumery harmonizing with your chosen vibe and occasion.",
      olfactiveNotes: fallback.notes,
      fragranceFamily: fallback.col
    });
    return;
  }

  const prompt = `You are the Khadlaj Perfumes Master Perfumer and AI Olfactive Sommelier.
A customer is seeking their bespoke fragrance recommendation from Khadlaj Perfumes.
Customer Profile:
- Olfactive Vibe: ${vibe}
- Preferred Occasion: ${occasion}
${customNotes ? `- Custom Note Preference: ${customNotes}` : ""}
- Customer Language: ${lang}

Select the SINGLE best matching Khadlaj fragrance from this catalog:
${JSON.stringify(SCENT_CATALOG, null, 2)}

Instructions:
1. Select the most harmonious productId and productName from the catalog list.
2. Write a luxurious, personalized matchReason (2-3 sentences) in the requested language (${lang === "ar" ? "Arabic" : lang === "ur" ? "Urdu" : "English"}) explaining why this specific Khadlaj fragrance perfectly suits their requested vibe and occasion. Mention key notes.
3. Respond ONLY with a valid JSON object in this exact schema:
{
  "productId": number,
  "productName": string,
  "matchReason": string,
  "olfactiveNotes": string,
  "fragranceFamily": string
}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        temperature: 0.5,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are the Khadlaj Perfumes AI Olfactive Sommelier. You must strictly output valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error?.message || "OpenAI call failed");
    }

    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(content);
    const matchInCatalog = SCENT_CATALOG.find(p => p.id === parsed.productId || p.name.toUpperCase() === String(parsed.productName).toUpperCase()) || SCENT_CATALOG[0];

    sendJson(res, 200, {
      productId: matchInCatalog.id,
      productName: matchInCatalog.name,
      matchReason: parsed.matchReason || `Exquisitely crafted to elevate your presence with notes of ${matchInCatalog.notes}.`,
      olfactiveNotes: parsed.olfactiveNotes || matchInCatalog.notes,
      fragranceFamily: parsed.fragranceFamily || matchInCatalog.col
    });
  } catch (err) {
    console.error("Scent Finder AI Error, using deterministic fallback:", err);
    let fallback = SCENT_CATALOG.find(p => p.vibe.toLowerCase().includes(vibe.toLowerCase())) || SCENT_CATALOG[0];
    if (vibe.includes("Rich") || vibe.includes("فاخر")) {
      fallback = occasion.includes("Royal") ? SCENT_CATALOG.find(p => p.name === "SARAYA") : SCENT_CATALOG.find(p => p.name === "SHIYAAKA SHADOW");
    } else if (vibe.includes("Fresh") || vibe.includes("منعش")) {
      fallback = SCENT_CATALOG.find(p => p.name === "ISLAND SUN");
    } else if (vibe.includes("Clean") || vibe.includes("راقي")) {
      fallback = SCENT_CATALOG.find(p => p.name === "SHIYAAKA MEN");
    }
    fallback = fallback || SCENT_CATALOG[0];

    sendJson(res, 200, {
      productId: fallback.id,
      productName: fallback.name,
      matchReason: lang === "ar"
        ? `عطر ${fallback.name} هو الاختيار الأمثل لذوقك، حيث يمزج بإتقان بين نفحات ${fallback.notes} ليمنحك حضوراً ساحراً يدوم طويلاً.`
        : `${fallback.name} is the ideal fragrance for your chosen profile, artfully harmonizing notes of ${fallback.notes} to deliver an unmistakable and enduring signature.`,
      olfactiveNotes: fallback.notes,
      fragranceFamily: fallback.col
    });
  }
}
