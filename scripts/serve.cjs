const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(
  __dirname,
  "..",
  process.env.SERVE_DIST === "1" ? "dist" : ".",
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};
function createServer() {
  return http.createServer((req, res) => {
    let requested;
    try {
      requested = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    const file = path.resolve(
      root,
      "." + (requested === "/" ? "/index.html" : requested),
    );
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      });
      res.end(data);
    });
  });
}
if (require.main === module)
  createServer().listen(Number(process.env.PORT || 4173), "127.0.0.1", () =>
    console.log("Portfólio: http://127.0.0.1:" + (process.env.PORT || 4173)),
  );
module.exports = { createServer };
