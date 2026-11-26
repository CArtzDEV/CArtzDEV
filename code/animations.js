const animBar = document.getElementById("mv-anim-bar");

viewer.addEventListener("load", () => {
  const animations = viewer.availableAnimations || [];
  animBar.innerHTML = "";

  // Hide bar if the model has no animations
  if (animations.length === 0) {
    animBar.classList.remove("visible");
    return;
  }

  animBar.classList.add("visible");

  // If 1 normal animation: show a Play / Pause toggle button
  if (animations.length === 1) {
    viewer.animationName = animations[0];
    viewer.play();

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mv-anim-btn active";
    toggleBtn.textContent = "❚❚ Pause";

    toggleBtn.addEventListener("click", () => {
      if (viewer.paused) {
        viewer.play();
        toggleBtn.textContent = "❚❚ Pause";
        toggleBtn.classList.add("active");
      } else {
        viewer.pause();
        toggleBtn.textContent = "▶ Play";
        toggleBtn.classList.remove("active");
      }
    });

    animBar.appendChild(toggleBtn);
    return;
  }

  // If multiple action animations: build a switcher pill for each one
  animations.forEach((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "mv-anim-btn" + (idx === 0 ? " active" : "");
    btn.textContent = name;

    btn.addEventListener("click", () => {
      viewer.animationName = name;
      viewer.play();
      animBar.querySelectorAll(".mv-anim-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });

    animBar.appendChild(btn);
  });

  // Start playing the first animation by default
  viewer.animationName = animations[0];
  viewer.play();
});