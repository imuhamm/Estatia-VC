(() => {
  // ── Summary strip quick-filter ──
  document.querySelectorAll(".cust-summary .summary-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".cust-summary .summary-card").forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });

  // ── Range-button toggle (time range + timeline filter) ──
  document.querySelectorAll(".filter-range").forEach((group) => {
    group.querySelectorAll(".range-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".range-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  });

  // ── Mode toggle (Developer / Broker) ──
  function setMode(mode) {
    document.querySelectorAll(".mode-toggle .mode-btn").forEach((b) => {
      const active = b.dataset.mode === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    document.body.dataset.mode = mode;
    const nameEl = document.querySelector(".account-name");
    const key = "name" + mode[0].toUpperCase() + mode.slice(1);
    if (nameEl && nameEl.dataset[key]) nameEl.textContent = nameEl.dataset[key];
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".mode-toggle .mode-btn");
    if (!btn) return;
    e.preventDefault();
    setMode(btn.dataset.mode);
  });

  // ── Bulk select-all ──
  const selectAll = document.querySelector(".bulk-select-all");
  if (selectAll) {
    selectAll.addEventListener("change", () => {
      document
        .querySelectorAll(".cust-row .cust-check input")
        .forEach((c) => (c.checked = selectAll.checked));
    });
  }

  // ── Filter chips: remove on × ──
  document.querySelectorAll(".filter-chip button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.closest(".filter-chip").remove();
    });
  });
})();
