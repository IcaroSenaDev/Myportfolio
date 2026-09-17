const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const baseline = require("./content-baseline.json");
const normalizedHtml = html.replace(/\s+/g, " ");

test("preserva os 10 projetos e todas as descrições originais", () => {
  assert.equal((html.match(/class="project-card /g) || []).length, 10);
  for (const description of baseline.descriptions)
    assert.ok(
      normalizedHtml.includes(description.replace(/\s+/g, " ")),
      description,
    );
});
test("preserva links de projetos, redes sociais e âncoras originais", () => {
  for (const url of baseline.links) {
    if (url.startsWith("src/cv/"))
      assert.ok(fs.existsSync(path.join(root, url)), url);
    else assert.ok(html.includes(`href="${url}"`), url);
  }
});
test("todos os arquivos locais e destinos de âncoras existem", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, "IDs duplicados");
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith("#")) assert.ok(ids.includes(url.slice(1)), url);
    else if (!/^[a-z]+:/i.test(url))
      assert.ok(fs.existsSync(path.join(root, url)), url);
  }
});
test("currículo atualizado, compatibilidade do link antigo e PDFs anteriores preservados", () => {
  const updated = fs.readFileSync(
    path.join(root, "src/cv/Curriculo_Icaro_Bonfim_de_Sena.pdf"),
  );
  assert.equal(updated.subarray(0, 5).toString(), "%PDF-");
  assert.deepEqual(
    updated,
    fs.readFileSync(path.join(root, "src/cv/Currículo-IcaroBonfimdeSena.pdf")),
  );
  const crypto = require("node:crypto");
  for (const [file, hash] of Object.entries(baseline.pdfHashes)) {
    assert.equal(
      crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(root, file)))
        .digest("hex"),
      hash,
    );
  }
});
test("dados essenciais do currículo e contato presentes", () => {
  for (const term of [
    "Global Manutenções e Construções",
    "JUL 2025",
    "2023 — 2025",
    "180 testes automatizados",
    "SQLAlchemy",
    "PostgreSQL",
    "Alembic",
    "Waitress",
    "Take Off Courses",
    "icarobonfimdesena5@gmail.com",
  ])
    assert.ok(normalizedHtml.includes(term), term);
});
