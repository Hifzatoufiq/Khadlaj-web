import { createServer } from "node:http";
import { readFile, stat as statAsync } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handleChatRequest } from "./chatbot-api.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
};

const server = createServer(async (req, res) => {
  if (req.url?.startsWith("/api/chat")) {
    await handleChatRequest(req, res);
    return;
  }

  const rawPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  let urlPath = rawPath;
  try {
    urlPath = decodeURIComponent(rawPath);
  } catch (e) {}

  const safePath = normalize(urlPath).replace(/^([.]{2}[\/\\])+/, "");
  const filePath = join(root, safePath);

  try {
    const fileStat = await statAsync(filePath);
    if (fileStat.isDirectory()) {
      throw new Error("Is directory");
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = types[ext] || "application/octet-stream";

    const range = req.headers.range;
    if (range && (ext === ".mp4" || ext === ".webm" || ext === ".ogg")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
      const chunkSize = end - start + 1;
      const stream = createReadStream(filePath, { start, end });
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      });
      stream.pipe(res);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileStat.size,
      "Accept-Ranges": "bytes",
    });
    createReadStream(filePath).pipe(res);
  } catch {
    try {
      const data = await readFile(join(root, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(String(error));
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`http://127.0.0.1:${port}`);
});
