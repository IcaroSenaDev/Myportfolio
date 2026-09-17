const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const dest = path.join(root, "dist");
fs.mkdirSync(dest, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(dest, "index.html"));
fs.cpSync(path.join(root, "src"), path.join(dest, "src"), { recursive: true });
console.log("Build estático gerado em dist/ (HTML, CSS, JS e currículos).");
