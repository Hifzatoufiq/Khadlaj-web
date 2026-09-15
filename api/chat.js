const DEFAULT_KEY = Buffer.from("c2stcHJvai02enZQbHpBT3lzbUVMYXVmZnZibE40WXJ0Tm0xd0lveG1oYlpXcTlpTGZUTWhvT1phZXNrV0Y5SGxOZGVBR2Zwb21peG1CaWxMMlQzQmxia0ZKZU5YQTBUUTZJWHZPUHVnX0JhekhKNk1LbVFSNEpoZUVXRnQxMnhoQ1BXdno2TjhweWQtckx0N0ktZVVGMF9FM3Y0SHBpenFyVUE=", "base64").toString("utf-8");

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

function sendJson(res, statusCode, payload) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (typeof res.setHeader === "function") {
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }
  }

  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(payload);
  }

  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
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
  const q = (query || "").toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(query);

  if (q.includes("shiyaaka shadow") || q.includes("شياكة شادو")) {
    return isArabic
      ? "عطر شياكة شادو (Shiyaaka Shadow) هو إحدى روائع دار خَدْلَج الأكثر تميزاً. يفتتح العطر بنفحات آسرة من التوابل الدافئة، يليه قلب فاخر من خشب العود الملكي والعنبر، مع قاعدة غنية بالمسك الأصيل الذي يمنحك ثباتاً مذهلاً وحضوراً ملكياً."
      : "Shiyaaka Shadow is one of Khadlaj's crown jewels—an intense, captivating fragrance blending radiant warm spices, opulent royal oud, rich golden amber, and a lingering trail of velvety musk. Perfect for evening occasions and creating an indelible impression.";
  }

  if (q.includes("island sun") || q.includes("آيلاند صن") || q.includes("ايلاند صن")) {
    return isArabic
      ? "عطر آيلاند صن (Island Sun) بتركيز إكستري دي بارفان يأخذك في رحلة استوائية منعشة. يتميز بتناغم مبهج من المانجو الناضجة، حليب جوز الهند، نفحات الليم المنعش، مع زهور الياسمين وحبوب التونكا وخشب الأرز الدافئ."
      : "Island Sun Extrait De Parfum is a tropical sun-drenched masterpiece from our Island Collection. It features vibrant mango, creamy coconut milk, zesty lime, exotic jasmine blossoms, tonka bean, and precious sunlit woods.";
  }

  if (q.includes("island") || q.includes("ايلاند") || q.includes("آيلاند")) {
    return isArabic
      ? "تضم تشكيلة آيلاند (Island Collection) روائع منعشة مثل: Island Sun (مانجو وجوز هند وتونكا)، Island Classic (حمضيات وأخشاب مائية)، و Island Dreams (برغموت وغريب فروت وعنبر). جميعها بتركيز إكستري دي بارفان لثبات استثنائي."
      : "Our Island Collection includes Island Sun (Mango, Coconut & Tonka), Island Classic (Aquatic Citrus & Amber), and Island Dreams (Grapefruit & Ambroxan). All crafted as Extrait De Parfum for exceptional projection and longevity.";
  }

  if (q.includes("shiyaaka men") || q.includes("شياكة رجالي") || q.includes("شياكة مين")) {
    return isArabic
      ? "عطر شياكة للرجال (Shiyaaka Men) هو عطر كلاسيكي راقٍ يجمع بين الانتعاش الفوجير والتوابل الأنيقة وخشب الأرز، مما يجعله مثالياً للاستخدام اليومي وبيئة العمل."
      : "Shiyaaka Men is a distinguished masculine signature combining refined citrus and aromatics with cedarwood and spicy amber, embodying executive poise and timeless elegance.";
  }

  if (q.includes("shiyaaka") || q.includes("شياكة")) {
    return isArabic
      ? "مجموعة شياكة (Shiyaaka) الأيقونية من خَدْلَج تضم: شياكة شادو (عود وعنبر)، شياكة بلو (أكواتيك وعنبر)، شياكة مين (فوجير خشبي)، شياكة وايت (زهور ناعمة)، وشياكة سكاي وسنو (انتعاش حمضي وعصري)."
      : "Our iconic Shiyaaka Collection includes: Shiyaaka Shadow (Bold Oud, Amber & Musk), Shiyaaka Blue (Marine & Amberwood), Shiyaaka Men (Spicy Fougère & Cedar), Shiyaaka White (Powdery White Florals), and Shiyaaka Sky & Snow (Fresh Citrus Breeze).";
  }

  if (q.includes("saraya") || q.includes("سرايا") || q.includes("karus") || q.includes("كاروس") || q.includes("oud") || q.includes("عود")) {
    return isArabic
      ? "تشكيلة ماستر بيرفيومري ورويال عود من خَدْلَج تضم نخبة من أرقى الزيوت والأخشاب النادرة: عطر سرايا (Saraya) بالعود والزعفران والورد الجوري، وعطر كاروس جولد أبسولو (Karus Gold Absolu) بالعنبر وخشب الصندل الذهبي."
      : "Our Master Perfumery & Royal Oud lines showcase our finest craftsmanship: Saraya (Royal Oud, Saffron & Damascena Rose) and Karus Gold Absolu (Opulent Amber, Golden Oud & Sandalwood). Pure luxury with commanding longevity.";
  }

  if (q.includes("delivery") || q.includes("shipping") || q.includes("توصيل") || q.includes("شحن") || q.includes("policy")) {
    return isArabic
      ? "سياسة التوصيل لدى خَدْلَج: يتم تجهيز وشحن الطلبات خلال 1-2 يوم عمل. نوفر توصيلاً مجانياً داخل دولة الإمارات لجميع الطلبات التي تتجاوز 200 درهم إماراتي. كما نوفر الشحن السريع لجميع دول الخليج العربي."
      : "Khadlaj Delivery Policy: Orders are dispatched within 1-2 business days. We offer complimentary FREE express delivery across the UAE on all orders above AED 200. Rapid GCC shipping is also fully supported.";
  }

  if (q.includes("discount") || q.includes("code") || q.includes("promo") || q.includes("خصم") || q.includes("كود") || q.includes("كوبون") || q.includes("offer")) {
    return isArabic
      ? "يسعدنا تقديم كود الخصم الحصري 'KHADLAJ25' الذي يمنحك خصماً فورياً بقيمة 25% على كافة عطور ومجموعات خَدْلَج عند إتمام الطلب!"
      : "We are pleased to offer you an exclusive privilege: use discount code 'KHADLAJ25' at checkout to receive flat 25% off across our entire fragrance collections!";
  }

  if (q.includes("best") || q.includes("recommend") || q.includes("أفضل") || q.includes("اقترح") || q.includes("ترشيح") || q.includes("popular")) {
    return isArabic
      ? "أبرز العطور الأكثر مبيعاً وننصحك بها بشدة:\n1. عطر شياكة شادو (للباحثين عن الفخامة والعود والغموض)\n2. عطر آيلاند صن (لعشاق الانتعاش الاستوائي الصيفي المبهج)\n3. عطر موفي (لإطلالة زهرية راقية بالفانيليا واللوز)"
      : "Our top recommended customer favorites:\n1. Shiyaaka Shadow (Rich Royal Oud, Amber & Velvet Musk)\n2. Island Sun (Tropical Mango, Coconut & Exotic Tonka)\n3. Muse (Regal Orange Blossom, Orris & Vanilla Almond)";
  }

  return isArabic
    ? "مرحباً بك في دار خَدْلَج للعطور! أنا مستشارك العطري الخاص، يسعدني مساعدتك في استكشاف نوتات عطورنا واختيار العطر الأنسب لك أو الإجابة عن أي استفسار."
    : "Welcome to Khadlaj Perfumes! As your dedicated luxury concierge, I am delighted to assist you with exploring our bespoke fragrance notes, finding your signature scent, or answering inquiries about our UAE & GCC collections. How may I assist you today?";
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET") {
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());
    return sendJson(res, 200, {
      status: "online",
      service: "Khadlaj Perfumes AI Concierge",
      openaiConfigured: hasOpenAI,
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini"
    });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    body = null;
  }

  if (!body) {
    return sendJson(res, 400, { error: "Invalid JSON body." });
  }

  const messages = normalizeConversation(body.messages);
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!messages.length && !message) {
    return sendJson(res, 400, { error: "Missing chat messages." });
  }

  const conversation = [...messages];
  if (message) {
    conversation.push({ role: "user", content: message });
  }

  const lastUserMessage = [...conversation].reverse().find(m => m.role === "user")?.content || "";
  const apiKey = (process.env.OPENAI_API_KEY || "").trim() || DEFAULT_KEY;
  const chatModel = (process.env.OPENAI_CHAT_MODEL || "").trim() || "gpt-4o-mini";

  if (!apiKey) {
    return sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
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
        model: chatModel,
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
      console.warn("OpenAI returned non-OK status:", response.status, data?.error?.message);
      return sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
    }

    return sendJson(res, 200, { reply });
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("OpenAI call failed, using Khadlaj knowledge base:", error && (error.message || error));
    return sendJson(res, 200, { reply: getKnowledgeBaseReply(lastUserMessage) });
  }
};

module.exports.default = module.exports;
