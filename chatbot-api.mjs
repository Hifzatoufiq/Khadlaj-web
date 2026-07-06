const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

const SITE_CONTEXT = [
  "Brand: Khadlaj Perfumes.",
  "Founded in 1997 by Mohamed Iqbal Abdul Sattar.",
  "Family-owned UAE perfume house with Arabian and French fragrance artistry.",
  "Core collections on the site: Atyaab, Lafede, and Master Perfumery.",
  "Featured products and gift sets include Island, Cream Velvet, Shahi Oud, Ihthiraam, Qarar, Saraya, Ria, Panache, Onyx, Shiyaaka, Cloud Candy, Strawberry Shake, Biscotti Date Toffee, Biscotti Melon Musk, Uno Intimo, Nafais Magrib, and more.",
  "Shipping note shown on the site: orders are processed within 1-2 business days; free UAE delivery applies above AED 200.",
  "Discount code shown on the site: KHADLAJ25 for flat 25% off.",
  "The assistant should only answer questions about this website, the brand, its products, collections, shipping, discounts, stores, or contact-related site pages.",
].join("\n");

const SYSTEM_PROMPT = [
  "You are the official website assistant for Khadlaj Perfumes.",
  "Answer only questions that are about the Khadlaj Perfumes website, brand, products, collections, shipping, offers, or site pages.",
  "If the user asks about anything unrelated, politely refuse and redirect them back to the website.",
  "Keep replies concise, helpful, and polished.",
  "Reply in the user's language when possible.",
  "Use the website context below as the source of truth:",
  SITE_CONTEXT,
].join("\n\n");

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
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
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "OPENAI_API_KEY is not configured on the server." });
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
        temperature: 0.45,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
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
