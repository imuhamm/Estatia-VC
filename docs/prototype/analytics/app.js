(() => {
  const tabs = document.querySelectorAll(".section-tab");
  const panels = document.querySelectorAll(".tab-panel");
  const content = document.querySelector(".analytics-content");

  function activate(tabName) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === tabName));
    panels.forEach((p) => {
      const active = p.dataset.panel === tabName;
      p.hidden = !active;
      p.classList.toggle("is-active", active);
    });
    if (content) content.dataset.activeTab = tabName;
  }

  tabs.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      activate(t.dataset.tab);
    });
  });

  // Range-button toggle within filter bar
  document.querySelectorAll(".filter-range .range-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-range .range-btn").forEach((b) =>
        b.classList.remove("is-active")
      );
      btn.classList.add("is-active");
    });
  });

  // Mode toggle (Developer / Broker) — flips broker-only sections
  function setMode(mode) {
    document.querySelectorAll(".mode-toggle .mode-btn").forEach((b) => {
      const active = b.dataset.mode === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    document.body.dataset.mode = mode;
    document.querySelectorAll(".broker-only").forEach((el) => {
      if (mode === "broker") el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
    });
    const nameEl = document.querySelector(".account-name");
    const key = "name" + mode[0].toUpperCase() + mode.slice(1);
    if (nameEl && nameEl.dataset[key]) nameEl.textContent = nameEl.dataset[key];
    // Jump to Demand tab when entering Broker so the broker-only row is visible
    if (mode === "broker") activate("demand");
  }
  // Event delegation so clicks register even if buttons re-render
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".mode-toggle .mode-btn");
    if (!btn) return;
    e.preventDefault();
    setMode(btn.dataset.mode);
  });
})();
