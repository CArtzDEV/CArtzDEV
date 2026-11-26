async function loadModels() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    models = (data.tree || [])
      .filter((node) => node.type === "blob" && node.path.toLowerCase().endsWith(".glb"))
      .map((node) => ({
        path: node.path,
        title: formatName(node.path),
        software: detectSoftware(node.path)
      }));
    if (models.length === 0) {
      badgeEl.textContent = "EMPTY";
      titleEl.textContent = "No .glb models found in repository";
      return;
    }
    if (models.length > 1) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
    renderModel(0);
  } catch (err) {
    badgeEl.textContent = "ERROR";
    titleEl.textContent = "Failed to load models from GitHub API";
    console.error(err);
  }
}

function renderModel(index) {
  if (!models.length) return;
  currentIndex = (index + models.length) % models.length;
  const item = models[currentIndex];
  // Encode path segments so spaces/special characters in filenames load properly on GitHub Pages
  const encodedPath = item.path.split("/").map(encodeURIComponent).join("/");
  viewer.src = `./${encodedPath}`;
  viewer.alt = item.title;
  titleEl.textContent = item.title;
  badgeEl.textContent = item.software;
  counterEl.textContent = `${currentIndex + 1} / ${models.length}`;
}

function formatName(filePath) {
  const fileName = filePath.split("/").pop().replace(/\.glb$/i, "");
  return fileName
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectSoftware(filePath) {
  const folder = filePath.split("/")[0]?.toLowerCase();
  const folderUpper = String(folder).charAt(0).toUpperCase() + String(folder).slice(1);
  return folderUpper && filePath.includes("/") ? folderUpper : "Asset";
}

loadModels();