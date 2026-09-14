import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const ENTRIES_FILE = join(root, "giveaway-entries.json");
const WINNERS_FILE = join(root, "giveaway-winners.json");
const ADMIN_PASSCODE = "khadlaj2026";

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

async function loadEntries() {
  if (!existsSync(ENTRIES_FILE)) {
    await writeFile(ENTRIES_FILE, JSON.stringify([], null, 2), "utf8");
    return [];
  }
  try {
    const raw = await readFile(ENTRIES_FILE, "utf8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

async function saveEntries(entries) {
  await writeFile(ENTRIES_FILE, JSON.stringify(entries, null, 2), "utf8");
}

async function loadWinners() {
  if (!existsSync(WINNERS_FILE)) {
    await writeFile(WINNERS_FILE, JSON.stringify([], null, 2), "utf8");
    return [];
  }
  try {
    const raw = await readFile(WINNERS_FILE, "utf8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

async function saveWinners(winners) {
  await writeFile(WINNERS_FILE, JSON.stringify(winners, null, 2), "utf8");
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

export async function handleGiveawayRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  const url = new URL(req.url, "http://localhost");
  const pathname = url.pathname;

  // 1. POST /api/giveaway/submit
  if (req.method === "POST" && pathname === "/api/giveaway/submit") {
    const body = await readJsonBody(req);
    if (!body) {
      sendJson(res, 400, { success: false, message: "Invalid JSON payload" });
      return;
    }

    const { name, phone, email, city, address, scentPreference } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !city?.trim() || !address?.trim()) {
      sendJson(res, 422, {
        success: false,
        message: "All fields are required (Name, Phone, Email, City, Address). This giveaway is strictly for KSA participants.",
      });
      return;
    }

    const entries = await loadEntries();

    // Check duplicate phone or email
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const cleanEmail = email.trim().toLowerCase();
    const existing = entries.find(
      (e) => e.phone.replace(/[\s\-()]/g, "") === cleanPhone || e.email.toLowerCase() === cleanEmail
    );

    if (existing) {
      sendJson(res, 200, {
        success: true,
        alreadyRegistered: true,
        ticket: existing.ticketNumber,
        message: `Welcome back! You are already registered with ticket ${existing.ticketNumber}.`,
        entry: existing,
      });
      return;
    }

    const ticketNumber = generateUniqueTicket(entries);
    const newEntry = {
      id: `giveaway_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: cleanEmail,
      city: city.trim(),
      address: address.trim(),
      scentPreference: scentPreference || "Royal Oud & Amber",
      ticketNumber,
      country: "KSA",
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    await saveEntries(entries);

    sendJson(res, 201, {
      success: true,
      ticket: ticketNumber,
      message: "Mabrook! Your official entry has been confirmed.",
      entry: newEntry,
    });
    return;
  }

  // 2. GET /api/giveaway/entries (Admin)
  if (req.method === "GET" && pathname === "/api/giveaway/entries") {
    const passcode = url.searchParams.get("passcode") || req.headers["authorization"]?.replace("Bearer ", "");
    if (passcode !== ADMIN_PASSCODE) {
      sendJson(res, 401, { success: false, message: "Unauthorized: Invalid admin passcode" });
      return;
    }

    const entries = await loadEntries();
    const winners = await loadWinners();

    sendJson(res, 200, {
      success: true,
      total: entries.length,
      entries,
      winners,
    });
    return;
  }

  // 3. POST /api/giveaway/draw (Admin random draw)
  if (req.method === "POST" && pathname === "/api/giveaway/draw") {
    const body = await readJsonBody(req);
    if (!body || body.passcode !== ADMIN_PASSCODE) {
      sendJson(res, 401, { success: false, message: "Unauthorized: Invalid admin passcode" });
      return;
    }

    const entries = await loadEntries();
    const winners = await loadWinners();

    if (entries.length === 0) {
      sendJson(res, 400, { success: false, message: "No entries available to draw from." });
      return;
    }

    const winnerTickets = new Set(winners.map((w) => w.ticketNumber));
    const eligibleEntries = entries.filter((e) => !winnerTickets.has(e.ticketNumber));

    if (eligibleEntries.length === 0) {
      sendJson(res, 400, { success: false, message: "All registered entries have already been selected!" });
      return;
    }

    // Pick random winner
    const randomIndex = Math.floor(Math.random() * eligibleEntries.length);
    const chosen = eligibleEntries[randomIndex];

    const winnerRecord = {
      ...chosen,
      drawnAt: new Date().toISOString(),
      prize: "500 Luxury Fragrance Discovery Sets",
      announcementChannel: "Instagram Stories (@khadlajperfumes)",
    };

    winners.unshift(winnerRecord);
    await saveWinners(winners);

    sendJson(res, 200, {
      success: true,
      winner: winnerRecord,
      totalWinners: winners.length,
      allWinners: winners,
    });
    return;
  }

  // 4. GET /api/giveaway/export-csv
  if (req.method === "GET" && pathname === "/api/giveaway/export-csv") {
    const passcode = url.searchParams.get("passcode");
    if (passcode !== ADMIN_PASSCODE) {
      sendJson(res, 401, { success: false, message: "Unauthorized" });
      return;
    }

    const entries = await loadEntries();
    const headers = ["Ticket Number", "Full Name", "Phone", "Email", "City", "Delivery Address", "Scent Preference", "Date"];
    const rows = entries.map((e) => [
      `"${e.ticketNumber}"`,
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.city || "").replace(/"/g, '""')}"`,
      `"${(e.address || "").replace(/"/g, '""')}"`,
      `"${(e.scentPreference || "").replace(/"/g, '""')}"`,
      `"${e.createdAt}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    res.writeHead(200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="khadlaj-ksa-giveaway-entries-${Date.now()}.csv"`,
      "Cache-Control": "no-store",
    });
    res.end(csvContent);
    return;
  }

  sendJson(res, 404, { success: false, message: "Giveaway API route not found" });
}
