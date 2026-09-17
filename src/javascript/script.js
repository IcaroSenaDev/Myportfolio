"use strict";
document.documentElement.classList.add("js");
const menuButton = document.querySelector("#mobile_btn");
const mobileMenu = document.querySelector("#mobile_menu");
function closeMenu(restoreFocus = false) {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  mobileMenu.hidden = expanded;
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute(
    "aria-label",
    expanded ? "Abrir menu" : "Fechar menu",
  );
});
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) closeMenu(true);
});
const desktop = matchMedia("(min-width: 801px)");
desktop.addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

// Native dialog provides focus containment, Escape support and an inert background.
const cvDialog = document.querySelector("#cv_modal");
let cvOpener;
document.querySelectorAll("[data-cv]").forEach((button) =>
  button.addEventListener("click", () => {
    cvOpener = button.closest("#mobile_menu") ? menuButton : button;
    closeMenu();
    cvDialog.showModal();
  }),
);
document
  .querySelector("#cv_modal_close")
  .addEventListener("click", () => cvDialog.close());
cvDialog.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const focusable = [
    ...cvDialog.querySelectorAll("button, a[href], summary"),
  ].filter(
    (element) =>
      element.getClientRects().length &&
      (!element.closest("details:not([open])") ||
        element.tagName === "SUMMARY"),
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
cvDialog.addEventListener("click", (event) => {
  const rect = cvDialog.getBoundingClientRect();
  if (
    event.target === cvDialog &&
    (event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom)
  )
    cvDialog.close();
});
cvDialog.addEventListener("close", () => cvOpener?.focus());

const filters = document.querySelector(".filters");
const cards = [...document.querySelectorAll(".project-card")];
filters.hidden = false;
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  filters.querySelectorAll("button").forEach((filter) => {
    const selected = filter === button;
    filter.classList.toggle("active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  });
  let count = 0;
  cards.forEach((card) => {
    card.hidden =
      button.dataset.filter !== "all" &&
      card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector("#project-count").textContent =
    `${count} ${count === 1 ? "PROJETO" : "PROJETOS"}`;
});

// Select by anchor, not DOM index: desktop and mobile links stay in sync.
const navLinks = [...document.querySelectorAll("#nav_list a, #mobile_menu a")];
const navSections = [
  ...document.querySelectorAll(
    "#home, #projeto, #sobre, #trajetoria, #contato",
  ),
];
let scrollScheduled = false;
function updateNavigation() {
  scrollScheduled = false;
  const offset = window.innerHeight * 0.32;
  let active = navSections[0].id;
  navSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) active = section.id;
  });
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 8
  )
    active = "contato";
  navLinks.forEach((link) => {
    if (link.hash === `#${active}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateNavigation);
updateNavigation();

// CSS-only 3D geometry: no graphics library, textures or continuous JS render loop.
const panel = document.querySelector(".sculpture-panel");
const sculpture = document.querySelector("#sculpture");
const motionButton = document.querySelector("#motion-toggle");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(pointer: fine)");
let paused = reducedMotion.matches;
let inView = true;
let pointerFrame = 0;
function updateMotion() {
  const stopped = paused || reducedMotion.matches || !inView || document.hidden;
  panel.classList.toggle("motion-paused", stopped);
  motionButton.setAttribute(
    "aria-pressed",
    String(paused || reducedMotion.matches),
  );
  motionButton.textContent =
    paused || reducedMotion.matches
      ? "Movimento pausado ▷"
      : "Pausar movimento Ⅱ";
  motionButton.disabled = reducedMotion.matches;
  motionButton.title = reducedMotion.matches
    ? "Movimento reduzido nas preferências do dispositivo"
    : "";
  if (stopped) sculpture.style.rotate = "";
}
motionButton.hidden = false;
motionButton.addEventListener("click", () => {
  paused = !paused;
  updateMotion();
});
reducedMotion.addEventListener("change", () => {
  paused = reducedMotion.matches;
  updateMotion();
});
document.addEventListener("visibilitychange", updateMotion);
new IntersectionObserver(
  (entries) => {
    inView = entries[0].isIntersecting;
    updateMotion();
  },
  { threshold: 0.1 },
).observe(panel);
panel.addEventListener("pointermove", (event) => {
  if (paused || reducedMotion.matches || !finePointer.matches || pointerFrame)
    return;
  pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    if (paused || reducedMotion.matches || !inView || document.hidden) return;
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    sculpture.style.rotate = `${-y} ${x} 0 ${Math.hypot(x, y) * 13}deg`;
  });
});
panel.addEventListener("pointerleave", () => {
  cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  sculpture.style.rotate = "";
});
updateMotion();
