const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const { createServer } = require("../scripts/serve.cjs");
let browser, server, url;
before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  url = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_CHANNEL
      ? { channel: process.env.BROWSER_CHANNEL }
      : {}),
  });
  fs.mkdirSync(path.resolve(__dirname, "../test-results"), { recursive: true });
});
after(async () => {
  await browser?.close();
  server?.close();
});

test("desktop: recursos, filtros, teclado, currículo e movimento", async () => {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(url);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".project-card:visible").count(), 10);
  for (const [category, count] of Object.entries({
    fullstack: 3,
    web: 3,
    iot: 2,
    automacao: 1,
    mobile: 1,
    all: 10,
  })) {
    await page.locator(`[data-filter="${category}"]`).click();
    assert.equal(await page.locator(".project-card:visible").count(), count);
    assert.equal(
      await page
        .locator(`[data-filter="${category}"]`)
        .getAttribute("aria-pressed"),
      "true",
    );
  }
  await page.locator("#cv_trigger_desktop").click();
  assert.equal(await page.locator("#cv_modal").evaluate((el) => el.open), true);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page.evaluate(() => !!document.activeElement.closest("#cv_modal")),
      "Foco saiu do modal",
    );
  }
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#cv_modal_options a").first().click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "IcaroSena_curriculo_PT.pdf");
  assert.equal(await download.failure(), null);
  await page.keyboard.press("Escape");
  await page.waitForFunction(
    () =>
      !document.querySelector("#cv_modal").open &&
      document.activeElement.id === "cv_trigger_desktop",
  );
  assert.equal(
    await page.locator("#cv_modal").evaluate((el) => el.open),
    false,
  );
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "cv_trigger_desktop",
  );
  for (const link of await page.locator("#cv_modal a").all()) {
    const response = await page.request.get(
      url + "/" + (await link.getAttribute("href")),
    );
    assert.equal(response.status(), 200);
    assert.ok((await response.body()).subarray(0, 5).toString() === "%PDF-");
  }
  await page.locator("#home").scrollIntoViewIfNeeded();
  await page.locator("#motion-toggle").click();
  assert.equal(
    await page
      .locator("#sculpture")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
    "paused",
  );
  await page.screenshot({
    path: "test-results/desktop-full.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.locator('#nav_list a[href="#sobre"]').click();
  await page.waitForFunction(() =>
    document
      .querySelector('#nav_list a[href="#sobre"]')
      .hasAttribute("aria-current"),
  );
  assert.deepEqual(errors, []);
  await page.close();
});

test("responsividade: 320, 390, 768, 1024 e 1920 pixels sem rolagem horizontal", async () => {
  for (const width of [320, 390, 768, 1024, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await page.goto(url);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow em ${width}px`,
    );
    if (width <= 800) {
      await page.locator("#mobile_btn").click();
      assert.equal(
        await page.locator("#mobile_btn").getAttribute("aria-expanded"),
        "true",
      );
      await page.locator("#cv_trigger_mobile").click();
      assert.ok(await page.locator("#cv_modal").evaluate((el) => el.open));
      await page.keyboard.press("Escape");
      await page.waitForFunction(
        () =>
          !document.querySelector("#cv_modal").open &&
          document.activeElement.id === "mobile_btn",
      );
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "mobile_btn",
      );
      await page.locator("#mobile_btn").click();
      await page.locator('#mobile_menu a[href="#projeto"]').click();
      assert.equal(
        await page.locator("#mobile_menu").evaluate((el) => el.hidden),
        true,
      );
      await page.waitForFunction(() =>
        document
          .querySelector('#mobile_menu a[href="#projeto"]')
          .hasAttribute("aria-current"),
      );
    }
    if (width === 390) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({
        path: "test-results/mobile-full.png",
        fullPage: true,
      });
      await page.screenshot({ path: "test-results/mobile-hero.png" });
    }
    await page.close();
  }
});

test("acessibilidade automatizada WCAG 2.2 AA, desktop/mobile e modal", async () => {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await page.goto(url);
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    for (const modal of [false, true]) {
      if (modal)
        await page.evaluate(() =>
          document.querySelector("#cv_modal").showModal(),
        );
      const result = await page.evaluate(async () =>
        axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
          },
        }),
      );
      fs.writeFileSync(
        `test-results/axe-${width}-${modal ? "modal" : "page"}.json`,
        JSON.stringify(result.violations, null, 2),
      );
      assert.deepEqual(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        [],
        `${width}px / modal=${modal}`,
      );
    }
    await page.close();
  }
});

test("movimento reduzido e conteúdo utilizável sem JavaScript", async () => {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(url);
  assert.equal(
    await page
      .locator("#sculpture")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  assert.equal(await page.locator("#motion-toggle").isDisabled(), true);
  await page.close();
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await context.newPage();
  await staticPage.goto(url);
  assert.equal(await staticPage.locator(".project-card:visible").count(), 10);
  assert.ok(await staticPage.locator("noscript a").first().isVisible());
  assert.equal(await staticPage.locator(".filters").isVisible(), false);
  await context.close();
});
