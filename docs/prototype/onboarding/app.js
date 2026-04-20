(() => {
  const TOTAL = 6;
  let current = 1;

  const stepSections = document.querySelectorAll(".ob-step");
  const stepperItems = document.querySelectorAll(".step");
  const progressBar = document.querySelector(".stepper-progress-bar");
  const progressLabel = document.querySelector(".stepper-progress-label");
  const backBtn = document.querySelector('[data-action="back"]');
  const nextBtn = document.querySelector('[data-action="next"]');
  const skipBtn = document.querySelector('[data-action="skip"]');

  function render() {
    stepSections.forEach((section) => {
      const n = Number(section.dataset.step);
      const active = n === current;
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });

    stepperItems.forEach((item) => {
      const n = Number(item.dataset.step);
      item.classList.toggle("is-active", n === current);
      item.classList.toggle("is-done", n < current);
    });

    const pct = Math.round((current / TOTAL) * 100);
    if (progressBar) progressBar.style.width = pct + "%";
    if (progressLabel) progressLabel.textContent = `Step ${current} of ${TOTAL}`;

    if (backBtn) backBtn.hidden = current === 1;
    if (nextBtn) nextBtn.textContent = current === TOTAL ? "Go live" : "Continue";
    if (skipBtn) skipBtn.hidden = current === TOTAL;
  }

  function goTo(step) {
    current = Math.max(1, Math.min(TOTAL, step));
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  nextBtn?.addEventListener("click", () => goTo(current + 1));
  backBtn?.addEventListener("click", () => goTo(current - 1));
  skipBtn?.addEventListener("click", () => goTo(current + 1));

  stepperItems.forEach((item) => {
    item.addEventListener("click", () => {
      const n = Number(item.dataset.step);
      if (n < current) goTo(n);
    });
    item.style.cursor = "pointer";
  });

  render();
})();
