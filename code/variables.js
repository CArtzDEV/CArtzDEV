const CONFIG = {
  GITHUB_USER: "CArtzDEV",
  GITHUB_REPO: "CArtzDEV",
  BRANCH: "main"
};

const viewer = document.getElementById("portfolio-viewer");
const titleEl = document.getElementById("mv-title");
const badgeEl = document.getElementById("mv-source");
const counterEl = document.getElementById("mv-counter");
const prevBtn = document.getElementById("mv-prev-btn");
const nextBtn = document.getElementById("mv-next-btn");

let models = [];
let currentIndex = 0;

const apiUrl = `https://api.github.com/repos/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/git/trees/${CONFIG.BRANCH}?recursive=1`;
