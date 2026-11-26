prevBtn.addEventListener("click", () => renderModel(currentIndex - 1));
nextBtn.addEventListener("click", () => renderModel(currentIndex + 1));

window.addEventListener("keydown", (e) => {
  if (models.length <= 1) return;
  if (e.key === "ArrowLeft") renderModel(currentIndex - 1);
  if (e.key === "ArrowRight") renderModel(currentIndex + 1);
});

