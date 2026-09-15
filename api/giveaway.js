const { readFile, writeFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { join } = require("node:path");
const os = require("node:os");

const STORAGE_DIR = process.env.VERCEL ? os.tmpdir() : __dirname;
const ENTRIES_FILE = join(STORAGE_DIR, "giveaway-entries.json");
const WINNERS_FILE = join(STORAGE_DIR, "giveaway-winners.json");
const ADMIN_PASSCODE = "khadlaj2026";

let inMemoryEntries = [];
let inMemoryWinners = [];

function sendJson(res, statusCode, payload) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-store",
  };

  if (typeof res.setHeader === "function") {
    for (const [k, v] of Object.entries(headers)) {
      try {
        res.setHeader(k, v);
      } catch {}
    }
  }

  if (typeof res.status === "function") {
    try {
      const s = res.status(statusCode);
      if (s && typeof s.json === "function") {
        return s.json(payload);
      }
    } catch {}
  }

  if (typeof res.json === "function") {
    try {
      if (typeof res.statusCode !== "undefined") {
        res.statusCode = statusCode;
      }
      return res.json(payload);
    } catch {}
  }

  if (typeof res.writeHead === "function") {
    try {
      res.writeHead(statusCode, headers);
    } catch {}
  }

  if (typeof res.end === "function") {
    return res.end(JSON.stringify(payload));
  }
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

async function loadEntries() {
  try {
    if (existsSync(ENTRIES_FILE)) {
      const raw = await readFile(ENTRIES_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryEntries = parsed;
        return inMemoryEntries;
      }
    }
  } catch {}
  return inMemoryEntries;
}

async function saveEntries(entries) {
  inMemoryEntries = entries;
  try {
    await writeFile(ENTRIES_FILE, JSON.stringify(entries, null, 2), "utf8");
  } catch {}
}

async function loadWinners() {
  try {
    if (existsSync(WINNERS_FILE)) {
      const raw = await readFile(WINNERS_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryWinners = parsed;
        return inMemoryWinners;
      }
    }
  } catch {}
  return inMemoryWinners;
}

async function saveWinners(winners) {
  inMemoryWinners = winners;
  try {
    await writeFile(WINNERS_FILE, JSON.stringify(winners, null, 2), "utf8");
  } catch {}
}

function generateUniqueTicket(existingEntries) {
  const existingTickets = new Set(existingEntries.map((e) => e.ticketNumber));
  let attempts = 0;
  while (attempts < 10000) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticket = `KND-ENTRY-${randomNum}`;
    if (!existingTickets.has(ticket)) {
      return ticket;
    }
    attempts++;
  }
  return `KND-ENTRY-${Date.now().toString().slice(-4)}`;
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    if (typeof res.setHeader === "function") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    if (typeof res.status === "function") {
      return res.status(204).end();
    }
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  const url = new URL(req.url || "/", "http://localhost");
  const pathname = url.pathname.replace(/\/$/, "");

  // 1. POST /api/giveaway/submit
  if (req.method === "POST" && (pathname === "/api/giveaway/submit" || pathname.endsWith("/submit"))) {
    const body = await readJsonBody(req);
    if (!body) {
      return sendJson(res, 400, { success: false, message: "Invalid JSON payload" });
    }

    const { name, phone, email, instagram, city, address, scentPreference } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !instagram?.trim() || !city?.trim() || !address?.trim()) {
      return sendJson(res, 422, {
        success: false,
        message: "All fields are required (Name, Phone, Email, Instagram Username, City, Address). This giveaway is strictly for KSA participants.",
      });
    }

    const entries = await loadEntries();

    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const cleanEmail = email.trim().toLowerCase();
    const existing = entries.find(
      (e) => (e.phone || "").replace(/[\s\-()]/g, "") === cleanPhone || (e.email || "").toLowerCase() === cleanEmail
    );

    if (existing) {
      return sendJson(res, 200, {
        success: true,
        alreadyRegistered: true,
        ticket: existing.ticketNumber,
        message: `Welcome back! You are already registered with ticket ${existing.ticketNumber}.`,
        entry: existing,
      });
    }

    const ticketNumber = generateUniqueTicket(entries);
    const newEntry = {
      id: `giveaway_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: cleanEmail,
      instagram: instagram ? instagram.trim() : "",
      city: city.trim(),
      address: address.trim(),
      scentPreference: scentPreference || "Royal Oud & Amber",
      ticketNumber,
      country: "KSA",
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    await saveEntries(entries);

    return sendJson(res, 201, {
      success: true,
      ticket: ticketNumber,
      message: "Mabrook! Your official entry has been confirmed.",
      entry: newEntry,
    });
  }

  // 2. GET /api/giveaway/entries
  if (req.method === "GET" && (pathname === "/api/giveaway/entries" || pathname.endsWith("/entries"))) {
    const passcode = url.searchParams.get("passcode") || req.headers["authorization"]?.replace("Bearer ", "");
    if (passcode !== ADMIN_PASSCODE) {
      return sendJson(res, 401, { success: false, message: "Unauthorized: Invalid admin passcode" });
    }

    const entries = await loadEntries();
    const winners = await loadWinners();

    return sendJson(res, 200, {
      success: true,
      total: entries.length,
      entries,
      winners,
    });
  }

  // 3. POST /api/giveaway/draw
  if (req.method === "POST" && (pathname === "/api/giveaway/draw" || pathname.endsWith("/draw"))) {
    const body = await readJsonBody(req);
    if (!body || body.passcode !== ADMIN_PASSCODE) {
      return sendJson(res, 401, { success: false, message: "Unauthorized: Invalid admin passcode" });
    }

    const entries = await loadEntries();
    const winners = await loadWinners();

    if (entries.length === 0) {
      return sendJson(res, 400, { success: false, message: "No entries available to draw from." });
    }

    const winnerTickets = new Set(winners.map((w) => w.ticketNumber));
    const eligibleEntries = entries.filter((e) => !winnerTickets.has(e.ticketNumber));

    if (eligibleEntries.length === 0) {
      return sendJson(res, 400, { success: false, message: "All registered entries have already been selected!" });
    }

    const randomIndex = Math.floor(Math.random() * eligibleEntries.length);
    const chosen = eligibleEntries[randomIndex];

    const winnerRecord = {
      ...chosen,
      drawnAt: new Date().toISOString(),
      prize: "96 Bottles of Khadlaj Island 100ml EDP",
      announcementChannel: "Instagram Stories (@khadlajperfumes)",
    };

    winners.unshift(winnerRecord);
    await saveWinners(winners);

    return sendJson(res, 200, {
      success: true,
      winner: winnerRecord,
      totalWinners: winners.length,
      allWinners: winners,
    });
  }

  // 4. GET /api/giveaway/export-csv
  if (req.method === "GET" && (pathname === "/api/giveaway/export-csv" || pathname.endsWith("/export-csv"))) {
    const passcode = url.searchParams.get("passcode");
    if (passcode !== ADMIN_PASSCODE) {
      return sendJson(res, 401, { success: false, message: "Unauthorized" });
    }

    const entries = await loadEntries();
    const headers = ["Ticket Number", "Full Name", "Phone", "Email", "Instagram", "City", "Delivery Address", "Scent Preference", "Date"];
    const rows = entries.map((e) => [
      `"${e.ticketNumber}"`,
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.instagram || "").replace(/"/g, '""')}"`,
      `"${(e.city || "").replace(/"/g, '""')}"`,
      `"${(e.address || "").replace(/"/g, '""')}"`,
      `"${(e.scentPreference || "").replace(/"/g, '""')}"`,
      `"${e.createdAt}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const headersObj = {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="khadlaj-ksa-giveaway-entries-${Date.now()}.csv"`,
      "Cache-Control": "no-store",
    };

    if (typeof res.setHeader === "function") {
      for (const [k, v] of Object.entries(headersObj)) {
        res.setHeader(k, v);
      }
    }

    if (typeof res.status === "function") {
      return res.status(200).send(csvContent);
    }

    res.writeHead(200, headersObj);
    return res.end(csvContent);
  }

  return sendJson(res, 404, { success: false, message: "Giveaway API route not found" });
};

module.exports.default = module.exports;
