(function () {
  "use strict";

  var MEALS = [
    { key: "fruehstueck", label: "Frühstück" },
    { key: "mittag", label: "Mittagessen" },
    { key: "abend", label: "Abendessen" },
    { key: "snack", label: "Snacks & Zwischenmahlzeiten" }
  ];

  var DEFAULT_GOALS = { protein: 60, fiber: 30, fett: 80, zucker: 50 };

  var STORE_PREFIX = "naehrbuch:day:";
  var GOALS_KEY = "naehrbuch:goals";

  var state = {
    date: new Date(),
    goals: loadGoals(),
    pendingMealKey: null
  };

  // ---------- storage ----------
  function dateKey(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function loadGoals() {
    try {
      var raw = localStorage.getItem(GOALS_KEY);
      if (raw) return Object.assign({}, DEFAULT_GOALS, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, DEFAULT_GOALS);
  }

  function saveGoals(g) {
    state.goals = g;
    try { localStorage.setItem(GOALS_KEY, JSON.stringify(g)); } catch (e) {}
  }

  function loadDay(d) {
    var key = STORE_PREFIX + dateKey(d);
    try {
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var empty = {};
    MEALS.forEach(function (m) { empty[m.key] = []; });
    return empty;
  }

  function saveDay(d, data) {
    var key = STORE_PREFIX + dateKey(d);
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
  }

  // ---------- helpers ----------
  function fmt(n) {
    return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(n);
  }
  function fmtInt(n) {
    return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(n);
  }

  function computeEntryValues(food, grams) {
    var factor = grams / 100;
    return {
      protein: food.protein * factor,
      fiber: food.fiber * factor,
      fett: food.fett * factor,
      zucker: food.zucker * factor,
      kcal: food.kcal * factor
    };
  }

  function sumEntries(entries) {
    var t = { protein: 0, fiber: 0, fett: 0, zucker: 0, kcal: 0 };
    entries.forEach(function (e) {
      t.protein += e.protein; t.fiber += e.fiber; t.fett += e.fett;
      t.zucker += e.zucker; t.kcal += e.kcal;
    });
    return t;
  }

  function sumDay(dayData) {
    var t = { protein: 0, fiber: 0, fett: 0, zucker: 0, kcal: 0 };
    MEALS.forEach(function (m) {
      var s = sumEntries(dayData[m.key] || []);
      t.protein += s.protein; t.fiber += s.fiber; t.fett += s.fett;
      t.zucker += s.zucker; t.kcal += s.kcal;
    });
    return t;
  }

  // ---------- day nav ----------
  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderDayLabel() {
    var today = new Date();
    var yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    var tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    var label = "";
    if (isSameDay(state.date, today)) label = "Heute";
    else if (isSameDay(state.date, yesterday)) label = "Gestern";
    else if (isSameDay(state.date, tomorrow)) label = "Morgen";
    else label = state.date.toLocaleDateString("de-DE", { weekday: "long" });
    document.getElementById("dayLabel").textContent = label;
    document.getElementById("dayDate").textContent = state.date.toLocaleDateString("de-DE", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });
  }

  // ---------- rendering ----------
  var MACRO_DEFS = [
    { key: "protein", label: "Protein", cls: "protein", mode: "reach" },
    { key: "fiber", label: "Ballaststoffe", cls: "fiber", mode: "reach" },
    { key: "fett", label: "Fett", cls: "fett", mode: "limit" },
    { key: "zucker", label: "Zucker", cls: "zucker", mode: "limit" }
  ];

  function renderSummary(totals) {
    var grid = document.getElementById("macroGrid");
    grid.innerHTML = "";
    MACRO_DEFS.forEach(function (def) {
      var value = totals[def.key];
      var goal = state.goals[def.key];
      var pct = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;
      var reached = value >= goal;
      var item = document.createElement("div");
      item.className = "macro-item " + def.cls + (reached ? (def.mode === "reach" ? " reached" : " over") : "");
      var badge = "";
      if (def.mode === "reach" && reached) badge = '<span class="status-badge">Ziel erreicht ✓</span>';
      if (def.mode === "limit" && reached) badge = '<span class="status-badge">Grenze erreicht</span>';
      item.innerHTML =
        '<div class="macro-name">' + def.label + (def.mode === "limit" ? " (Grenze)" : "") + '</div>' +
        '<div class="macro-values"><strong>' + fmt(value) + '</strong> g von ' + fmt(goal) + ' g</div>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
        badge;
      grid.appendChild(item);
    });
    document.getElementById("kcalTotal").textContent = fmtInt(totals.kcal);
  }

  function renderMeals(dayData) {
    var wrap = document.getElementById("meals");
    wrap.innerHTML = "";
    MEALS.forEach(function (meal) {
      var entries = dayData[meal.key] || [];
      var sub = sumEntries(entries);
      var card = document.createElement("section");
      card.className = "meal-card";

      var header = document.createElement("div");
      header.className = "meal-header";
      header.innerHTML =
        "<h3>" + meal.label + "</h3>" +
        '<span class="meal-sub">' + fmtInt(sub.kcal) + " kcal · P " + fmt(sub.protein) + " g · B " +
        fmt(sub.fiber) + " g · F " + fmt(sub.fett) + " g · Z " + fmt(sub.zucker) + " g</span>";
      card.appendChild(header);

      var list = document.createElement("div");
      list.className = "entry-list";
      if (entries.length === 0) {
        var hint = document.createElement("p");
        hint.className = "empty-hint";
        hint.textContent = "Noch nichts eingetragen.";
        list.appendChild(hint);
      } else {
        entries.forEach(function (entry, idx) {
          var row = document.createElement("div");
          row.className = "entry-row";
          row.innerHTML =
            '<div class="entry-main"><span class="entry-name">' + escapeHtml(entry.name) + "</span>" +
            '<span class="entry-detail">' + fmtInt(entry.grams) + " g · " + fmtInt(entry.kcal) + " kcal · P " +
            fmt(entry.protein) + "g B " + fmt(entry.fiber) + "g F " + fmt(entry.fett) + "g Z " + fmt(entry.zucker) + "g</span></div>" +
            '<button class="entry-remove" data-meal="' + meal.key + '" data-idx="' + idx + '" aria-label="Entfernen">✕</button>';
          list.appendChild(row);
        });
      }
      card.appendChild(list);

      card.appendChild(buildAddForm(meal.key));
      wrap.appendChild(card);
    });

    // remove handlers
    wrap.querySelectorAll(".entry-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mealKey = btn.getAttribute("data-meal");
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        var day = loadDay(state.date);
        day[mealKey].splice(idx, 1);
        saveDay(state.date, day);
        refresh();
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildAddForm(mealKey) {
    var form = document.createElement("div");
    form.className = "add-form";
    form.innerHTML =
      '<div class="search-wrap">' +
        '<input type="text" class="food-search" placeholder="Lebensmittel suchen …" autocomplete="off" />' +
        '<div class="suggestions"></div>' +
      '</div>' +
      '<input type="number" class="amount-input" placeholder="Menge" min="0" step="1" />' +
      '<span style="align-self:center;color:var(--text-muted);font-size:0.85rem;">g</span>' +
      '<button class="add-btn" disabled>Hinzufügen</button>';

    var searchInput = form.querySelector(".food-search");
    var amountInput = form.querySelector(".amount-input");
    var suggestions = form.querySelector(".suggestions");
    var addBtn = form.querySelector(".add-btn");
    var selectedFood = null;

    function closeSuggestions() {
      suggestions.classList.remove("open");
      suggestions.innerHTML = "";
    }

    function renderSuggestions(query) {
      var q = query.trim().toLowerCase();
      suggestions.innerHTML = "";
      if (!q) { closeSuggestions(); return; }
      var matches = window.FOOD_DB.filter(function (f) {
        return f.name.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);

      matches.forEach(function (f) {
        var item = document.createElement("div");
        item.className = "suggestion-item";
        item.innerHTML = "<span>" + escapeHtml(f.name) + '</span><span class="s-cat">' + escapeHtml(f.cat) + "</span>";
        item.addEventListener("click", function () {
          selectedFood = f;
          searchInput.value = f.name;
          closeSuggestions();
          updateAddBtn();
          amountInput.focus();
        });
        suggestions.appendChild(item);
      });

      var customItem = document.createElement("div");
      customItem.className = "suggestion-item custom-option";
      customItem.textContent = '+ „' + query.trim() + '" als eigenes Lebensmittel anlegen';
      customItem.addEventListener("click", function () {
        closeSuggestions();
        openCustomModal(query.trim(), function (food) {
          selectedFood = food;
          searchInput.value = food.name;
          updateAddBtn();
          amountInput.focus();
        });
      });
      suggestions.appendChild(customItem);
      suggestions.classList.add("open");
    }

    function updateAddBtn() {
      var grams = parseFloat(amountInput.value);
      addBtn.disabled = !(selectedFood && grams > 0);
    }

    searchInput.addEventListener("input", function () {
      selectedFood = null;
      updateAddBtn();
      renderSuggestions(searchInput.value);
    });
    searchInput.addEventListener("focus", function () {
      if (searchInput.value) renderSuggestions(searchInput.value);
    });
    document.addEventListener("click", function (e) {
      if (!form.contains(e.target)) closeSuggestions();
    });
    amountInput.addEventListener("input", updateAddBtn);

    addBtn.addEventListener("click", function () {
      if (!selectedFood) return;
      var grams = parseFloat(amountInput.value);
      if (!(grams > 0)) return;
      var values = computeEntryValues(selectedFood, grams);
      var entry = Object.assign({ name: selectedFood.name, grams: grams }, values);
      var day = loadDay(state.date);
      if (!day[mealKey]) day[mealKey] = [];
      day[mealKey].push(entry);
      saveDay(state.date, day);
      refresh();
    });

    return form;
  }

  // ---------- custom food modal ----------
  var customCallback = null;
  function openCustomModal(prefillName, callback) {
    customCallback = callback;
    document.getElementById("customName").value = prefillName || "";
    document.getElementById("customProtein").value = 0;
    document.getElementById("customFiber").value = 0;
    document.getElementById("customFett").value = 0;
    document.getElementById("customZucker").value = 0;
    document.getElementById("customKcal").value = 0;
    document.getElementById("customBackdrop").classList.add("open");
  }
  function closeCustomModal() {
    document.getElementById("customBackdrop").classList.remove("open");
    customCallback = null;
  }

  document.getElementById("customCancel").addEventListener("click", closeCustomModal);
  document.getElementById("customBackdrop").addEventListener("click", function (e) {
    if (e.target === this) closeCustomModal();
  });
  document.getElementById("customSave").addEventListener("click", function () {
    var name = document.getElementById("customName").value.trim();
    if (!name) { document.getElementById("customName").focus(); return; }
    var food = {
      name: name,
      cat: "Eigenes Lebensmittel",
      protein: parseFloat(document.getElementById("customProtein").value) || 0,
      fiber: parseFloat(document.getElementById("customFiber").value) || 0,
      fett: parseFloat(document.getElementById("customFett").value) || 0,
      zucker: parseFloat(document.getElementById("customZucker").value) || 0,
      kcal: parseFloat(document.getElementById("customKcal").value) || 0
    };
    window.FOOD_DB.push(food); // available for rest of the session too
    var cb = customCallback;
    closeCustomModal();
    if (cb) cb(food);
  });

  // ---------- settings modal ----------
  document.getElementById("settingsBtn").addEventListener("click", function () {
    document.getElementById("goalProtein").value = state.goals.protein;
    document.getElementById("goalFiber").value = state.goals.fiber;
    document.getElementById("goalFett").value = state.goals.fett;
    document.getElementById("goalZucker").value = state.goals.zucker;
    document.getElementById("settingsBackdrop").classList.add("open");
  });
  document.getElementById("settingsCancel").addEventListener("click", function () {
    document.getElementById("settingsBackdrop").classList.remove("open");
  });
  document.getElementById("settingsBackdrop").addEventListener("click", function (e) {
    if (e.target === this) this.classList.remove("open");
  });
  document.getElementById("settingsSave").addEventListener("click", function () {
    var g = {
      protein: parseFloat(document.getElementById("goalProtein").value) || DEFAULT_GOALS.protein,
      fiber: parseFloat(document.getElementById("goalFiber").value) || DEFAULT_GOALS.fiber,
      fett: parseFloat(document.getElementById("goalFett").value) || DEFAULT_GOALS.fett,
      zucker: parseFloat(document.getElementById("goalZucker").value) || DEFAULT_GOALS.zucker
    };
    saveGoals(g);
    document.getElementById("settingsBackdrop").classList.remove("open");
    refresh();
  });

  // ---------- day nav events ----------
  document.getElementById("prevDay").addEventListener("click", function () {
    state.date.setDate(state.date.getDate() - 1);
    refresh();
  });
  document.getElementById("nextDay").addEventListener("click", function () {
    state.date.setDate(state.date.getDate() + 1);
    refresh();
  });

  // ---------- main refresh ----------
  function refresh() {
    renderDayLabel();
    var day = loadDay(state.date);
    var totals = sumDay(day);
    renderSummary(totals);
    renderMeals(day);
  }

  refresh();

  // ---------- PWA service worker ----------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/service-worker.js").catch(function () {});
    });
  }
})();
