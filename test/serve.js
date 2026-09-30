// Tiny static server for local checks: node test/serve.js  → http://localhost:5174
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".css": "text/css" };
http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split("?")[0]).replace(/\/$/, "/index.html"));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": (types[path.extname(p)] || "application/octet-stream") + "; charset=utf-8" });
    res.end(data);
  });
}).listen(5174, () => console.log("serving on http://localhost:5174"));
