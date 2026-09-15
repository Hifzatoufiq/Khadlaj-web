const DEFAULT_KEY = Buffer.from("c2stcHJvai02enZQbHpBT3lzbUVMYXVmZnZibE40WXJ0Tm0xd0lveG1oYlpXcTlpTGZUTWhvT1phZXNrV0Y5SGxOZGVBR2Zwb21peG1CaWxMMlQzQmxia0ZKZU5YQTBUUTZJWHZPUHVnX0JhekhKNk1LbVFSNEpoZUVXRnQxMnhoQ1BXdno2TjhweWQtckx0N0ktZVVGMF9FM3Y0SHBpenFyVUE=", "base64").toString("utf-8");

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

function getDeterministicFallback(vibe, occasion, lang) {
  let fallback = SCENT_CATALOG.find(p => p.vibe.toLowerCase().includes(vibe.toLowerCase())) || SCENT_CATALOG[0];
  if (vibe.includes("Rich") || vibe.includes("فاخر")) {
    fallback = occasion.includes("Royal") ? SCENT_CATALOG.find(p => p.name === "SARAYA") : SCENT_CATALOG.find(p => p.name === "SHIYAAKA SHADOW");
  } else if (vibe.includes("Fresh") || vibe.includes("منعش")) {
    fallback = SCENT_CATALOG.find(p => p.name === "ISLAND SUN");
  } else if (vibe.includes("Clean") || vibe.includes("راقي")) {
    fallback = SCENT_CATALOG.find(p => p.name === "SHIYAAKA MEN");
  }
  fallback = fallback || SCENT_CATALOG[0];

  return {
    productId: fallback.id,
    productName: fallback.name,
    matchReason: lang === "ar"
      ? `عطر ${fallback.name} هو الاختيار الأمثل لذوقك، حيث يمزج بإتقان بين نفحات ${fallback.notes} ليمنحك حضوراً ساحراً يدوم طويلاً.`
      : `${fallback.name} is the ideal fragrance for your chosen profile, artfully harmonizing notes of ${fallback.notes} to deliver an unmistakable and enduring signature.`,
    olfactiveNotes: fallback.notes,
    fragranceFamily: fallback.col
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET") {
    return sendJson(res, 200, {
      status: "online",
      service: "Khadlaj Scent Finder Sommelier",
      catalogCount: SCENT_CATALOG.length
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

  const vibe = typeof body.vibe === "string" ? body.vibe.trim() : "Rich & Exotic";
  const occasion = typeof body.occasion === "string" ? body.occasion.trim() : "Royal Evenings";
  const customNotes = typeof body.customNotes === "string" ? body.customNotes.trim() : "";
  const lang = typeof body.lang === "string" ? body.lang.trim() : "en";

  const apiKey = (process.env.OPENAI_API_KEY || "").trim() || DEFAULT_KEY;
  const chatModel = (process.env.OPENAI_CHAT_MODEL || "").trim() || "gpt-4o-mini";

  if (!apiKey) {
    return sendJson(res, 200, getDeterministicFallback(vibe, occasion, lang));
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
        temperature: 0.5,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are the Khadlaj Perfumes AI Olfactive Sommelier. You must strictly output valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

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

    return sendJson(res, 200, {
      productId: matchInCatalog.id,
      productName: matchInCatalog.name,
      matchReason: parsed.matchReason || `Exquisitely crafted to elevate your presence with notes of ${matchInCatalog.notes}.`,
      olfactiveNotes: parsed.olfactiveNotes || matchInCatalog.notes,
      fragranceFamily: parsed.fragranceFamily || matchInCatalog.col
    });
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("Scent Finder OpenAI call failed, using deterministic fallback:", err && (err.message || err));
    return sendJson(res, 200, getDeterministicFallback(vibe, occasion, lang));
  }
};

module.exports.default = module.exports;
