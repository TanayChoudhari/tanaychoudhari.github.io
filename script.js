const nav = document.querySelector("#main-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const themeToggle = document.querySelector("#theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle?.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeColor?.setAttribute("content", isDark ? "#101010" : "#f7f5fb");
}

const savedTheme = localStorage.getItem("portfolioTheme");
setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark");
themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolioTheme", theme);
  setTheme(theme);
});

function updateNavigation() {
  nav?.classList.toggle("scrolling", window.scrollY > 8);
  if (nav && window.innerWidth > 760) {
    const progress = Math.min(window.scrollY / 1000, 1);
    const eased = 1 - (1 - progress) ** 4;
    const wide = window.innerWidth * 0.8;
    nav.style.width = `${wide - (wide - 528) * eased}px`;
  } else if (nav) {
    nav.style.removeProperty("width");
  }
}

let navFrame = 0;
window.addEventListener("scroll", () => {
  if (!navFrame) {
    navFrame = requestAnimationFrame(() => {
      updateNavigation();
      navFrame = 0;
    });
  }
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      }
    }
  }, { threshold: 0.35 });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll(".skill-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    if (details) details.hidden = expanded;
  });
});

const canvas = document.querySelector("#glitch-canvas");
const canvasContext = canvas?.getContext("2d");
const glitchColors = ["#5e4491", "#A476FF", "#241a38"];
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789";
const cellWidth = 10;
const cellHeight = 20;
let grid = [];
let columns = 0;
let animationFrame = 0;
let lastGlitch = 0;

function resizeGlitchCanvas() {
  if (!canvas || !canvasContext) return;
  const bounds = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
  canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
  canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  columns = Math.ceil(bounds.width / cellWidth);
  const rows = Math.ceil(bounds.height / cellHeight);
  grid = Array.from({ length: columns * rows }, () => ({
    char: glyphs[Math.floor(Math.random() * glyphs.length)],
    color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
  }));
  drawGlitch();
}

function drawGlitch() {
  if (!canvas || !canvasContext || !grid.length) return;
  const bounds = canvas.getBoundingClientRect();
  canvasContext.clearRect(0, 0, bounds.width, bounds.height);
  canvasContext.font = "16px monospace";
  canvasContext.textBaseline = "top";
  grid.forEach((cell, index) => {
    canvasContext.fillStyle = cell.color;
    canvasContext.fillText(cell.char, (index % columns) * cellWidth, Math.floor(index / columns) * cellHeight);
  });
}

function animateGlitch(now) {
  if (now - lastGlitch > 33 && grid.length) {
    const changes = Math.max(1, Math.floor(grid.length * 0.05));
    for (let index = 0; index < changes; index += 1) {
      const cell = grid[Math.floor(Math.random() * grid.length)];
      cell.char = glyphs[Math.floor(Math.random() * glyphs.length)];
      cell.color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
    }
    drawGlitch();
    lastGlitch = now;
  }
  animationFrame = requestAnimationFrame(animateGlitch);
}

if (canvas && canvasContext && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  resizeGlitchCanvas();
  animationFrame = requestAnimationFrame(animateGlitch);
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeGlitchCanvas, 120);
  });
} else if (canvas && canvasContext) {
  resizeGlitchCanvas();
}

const likeButton = document.querySelector("#like-button");
const likeCount = document.querySelector("#like-count");
const hasLiked = localStorage.getItem("websiteIsLiked") === "true";
let likes = Number(localStorage.getItem("websiteLikeCount") || 0);

function renderLikes() {
  if (likeCount) likeCount.textContent = `${likes} ${likes === 1 ? "Like" : "Likes"}`;
  likeButton?.setAttribute("aria-pressed", String(localStorage.getItem("websiteIsLiked") === "true"));
}

renderLikes();
likeButton?.addEventListener("click", () => {
  if (localStorage.getItem("websiteIsLiked") === "true") return;
  likes += 1;
  localStorage.setItem("websiteLikeCount", String(likes));
  localStorage.setItem("websiteIsLiked", "true");
  renderLikes();
  likeButton.classList.remove("pulse");
  requestAnimationFrame(() => likeButton.classList.add("pulse"));
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${fields.get("name")}`);
  const body = encodeURIComponent(`${fields.get("message")}\n\nReply to: ${fields.get("email")}`);
  window.location.href = `mailto:tanaychoudhari30@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());