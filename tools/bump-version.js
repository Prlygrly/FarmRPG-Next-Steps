// Before each push: stamp every local <script src> in index.html with ?v=<time>, so browsers never mix old and new files.
// Usage: node tools/bump-version.js
const fs = require("fs"), path = require("path");
const file = path.join(__dirname, "..", "index.html");
const d = new Date(), v = d.toISOString().slice(0, 16).replace(/[-:T]/g, "");
const s = fs.readFileSync(file, "utf8").replace(/(<script src=")(?!https?:)([^"?]+\.js)(\?v=[^"]*)?"/g, `$1$2?v=${v}"`);
fs.writeFileSync(file, s);
console.log(`Scripts stamped ?v=${v}: ${s.split(`?v=${v}"`).length - 1}`);
