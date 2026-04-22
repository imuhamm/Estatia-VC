(() => {
  // ── Summary strip quick-filter: toggle .is-active on click ──
  document.querySelectorAll(".conv-summary .summary-card").forEach((card) => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".conv-summary .summary-card")
        .forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });

  // ── Range-button toggle ──
  document.querySelectorAll(".filter-range .range-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-range .range-btn").forEach((b) =>
        b.classList.remove("is-active")
      );
      btn.classList.add("is-active");
    });
  });

  // ── Mode toggle (Developer / Broker) — mirrors analytics ──
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

  // ── Row click → detail (SCR-210) ──
  document.querySelectorAll(".conv-row").forEach((row, idx) => {
    row.setAttribute("role", "link");
    row.setAttribute("tabindex", "0");
    const go = () => {
      window.location.href = "detail.html?id=" + (idx + 1);
    };
    row.addEventListener("click", (e) => {
      if (e.target.closest("input, button, label, a")) return;
      go();
    });
    row.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !e.target.closest("input, button, label, a")) {
        e.preventDefault();
        go();
      }
    });
  });

  // ── Detail page: AI Resume/Pause toggle ──
  const aiToggle = document.getElementById("aiToggle");
  if (aiToggle) {
    aiToggle.addEventListener("click", () => {
      const banner = document.querySelector(".lock-banner");
      const aiState = document.querySelector(".ai-state");
      const sideAi = document.querySelector(".side-list .ai-dot");
      const isPaused = aiToggle.textContent.trim() === "Resume AI";
      if (isPaused) {
        aiToggle.textContent = "Pause AI";
        if (banner) banner.style.display = "none";
        if (aiState) aiState.innerHTML = '<span class="ai-dot ai-dot-on"></span> AI active · replying automatically';
        if (sideAi) {
          sideAi.className = "ai-dot ai-dot-on";
          sideAi.parentElement.childNodes[sideAi.parentElement.childNodes.length - 1].textContent = " Active";
        }
      } else {
        aiToggle.textContent = "Resume AI";
        if (banner) banner.style.display = "";
        if (aiState) aiState.innerHTML = '<span class="ai-dot ai-dot-paused"></span> AI paused by Menna A. · just now';
      }
    });
  }

  // ── Detail page: collapsed previous session toggle ──
  document.querySelectorAll(".session-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const divider = btn.closest(".session-divider");
      const expanded = divider.getAttribute("aria-expanded") === "true";
      divider.setAttribute("aria-expanded", expanded ? "false" : "true");
      btn.textContent = (expanded ? "▸" : "▾") + btn.textContent.slice(1);
    });
  });

  // ── Bulk-action bar: show when any row is selected ──
  const bulkBar = document.querySelector(".bulk-actions");
  const bulkCount = bulkBar?.querySelector(".bulk-count b");
  const rowChecks = document.querySelectorAll(".conv-check input");
  const selectAll = document.querySelector(".bulk-select input");

  function refreshBulkBar() {
    const selected = Array.from(rowChecks).filter((c) => c.checked).length;
    if (!bulkBar) return;
    if (selected > 0) {
      bulkBar.removeAttribute("hidden");
      if (bulkCount) bulkCount.textContent = String(selected);
    } else {
      bulkBar.setAttribute("hidden", "");
    }
  }
  rowChecks.forEach((c) => c.addEventListener("change", refreshBulkBar));
  if (selectAll) {
    selectAll.addEventListener("change", () => {
      rowChecks.forEach((c) => (c.checked = selectAll.checked));
      refreshBulkBar();
    });
  }

  // ── Filter chips: remove on × click (stub) ──
  document.querySelectorAll(".filter-chip button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.closest(".filter-chip").remove();
    });
  });
})();
