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

export async function handleChatRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const apiKey = OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "OPENAI_API_KEY is not configured." });
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
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const detail = data?.error?.message || "OpenAI request failed.";
      sendJson(res, 502, { error: detail });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      sendJson(res, 502, { error: "No assistant reply returned." });
      return;
    }

    sendJson(res, 200, { reply });
  } catch (error) {
    sendJson(res, 502, { error: error instanceof Error ? error.message : "OpenAI request failed." });
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
