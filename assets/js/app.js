(function () {
  "use strict";

  var ROOT = new URL("../../", document.currentScript.src);
  var PREFIX = "shiryo:";

  /* localStorage は使えない環境でも表示を壊さない */
  var store = {
    get: function (key) {
      try { return window.localStorage.getItem(PREFIX + key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(PREFIX + key, value); } catch (e) { /* 何もしない */ }
    },
    remove: function (key) {
      try { window.localStorage.removeItem(PREFIX + key); } catch (e) { /* 何もしない */ }
    }
  };

  /* ---------- セグメント切替 ---------- */
  function bindSeg(seg, onChange) {
    var buttons = Array.prototype.slice.call(seg.querySelectorAll("button"));
    function select(value) {
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.value === value ? "true" : "false");
      });
      onChange(value);
    }
    buttons.forEach(function (b) {
      b.type = "button";
      b.addEventListener("click", function () { select(b.dataset.value); });
    });
    var initial = buttons.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0] || buttons[0];
    select(initial.dataset.value);
    return select;
  }

  /* ---------- AIへの指示文を差し込む ---------- */
  function initPrompts() {
    var list = window.SHIRYO_PROMPTS || [];
    document.querySelectorAll(".copybox[data-prompt]").forEach(function (box) {
      var item = list.filter(function (p) { return p.id === box.dataset.prompt; })[0];
      if (!item) return;
      var id = "prompt-" + item.id;
      box.innerHTML = '<div id="' + id + '"></div><button class="btn" data-copy-target="' + id + '">コピー</button>';
      box.querySelector("#" + id).textContent = item.text;
    });
  }

  /* ---------- コピー ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function initCopyButtons() {
    document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
      btn.type = "button";
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.dataset.copyTarget);
        if (!target) return;
        var original = btn.textContent;
        copyText(target.innerText.trim()).then(function () {
          btn.textContent = "コピーしました";
        }, function () {
          btn.textContent = "コピーできませんでした";
        }).then(function () {
          setTimeout(function () { btn.textContent = original; }, 1600);
        });
      });
    });
  }

  /* ---------- チェックリスト ---------- */
  function initChecklists() {
    document.querySelectorAll(".checklist[data-key]").forEach(function (list) {
      var key = "check:" + list.dataset.key;
      var saved = {};
      try { saved = JSON.parse(store.get(key) || "{}"); } catch (e) { saved = {}; }
      var inputs = Array.prototype.slice.call(list.querySelectorAll("input[type=checkbox]"));
      var meta = document.querySelector('[data-checklist-meta="' + list.dataset.key + '"]');
      var countEl = meta && meta.querySelector(".count");
      var reset = meta && meta.querySelector(".reset");

      function update() {
        var done = inputs.filter(function (i) { return i.checked; }).length;
        if (countEl) countEl.textContent = done + " / " + inputs.length + " 項目";
      }
      inputs.forEach(function (input, idx) {
        var id = input.dataset.id || String(idx);
        input.checked = !!saved[id];
        input.addEventListener("change", function () {
          saved[id] = input.checked;
          store.set(key, JSON.stringify(saved));
          update();
        });
      });
      if (reset) {
        reset.type = "button";
        reset.addEventListener("click", function () {
          saved = {};
          store.remove(key);
          inputs.forEach(function (i) { i.checked = false; });
          update();
        });
      }
      update();
    });
  }

  /* ---------- 答えを見る ---------- */
  function initReveal() {
    document.querySelectorAll("[data-reveal]").forEach(function (btn) {
      var target = document.getElementById(btn.dataset.reveal);
      if (!target) return;
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var open = target.hasAttribute("hidden");
        if (open) {
          target.removeAttribute("hidden");
          btn.textContent = btn.dataset.closeLabel || "答えを閉じる";
        } else {
          target.setAttribute("hidden", "");
          btn.textContent = btn.dataset.openLabel || "答えを見る";
        }
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        target.dispatchEvent(new CustomEvent("revealchange", { detail: { open: open } }));
      });
    });
  }

  /* ---------- 既読管理 ---------- */
  function readKey(chapter, sec) { return "read:" + chapter + ":" + sec; }

  function countRead(chapterId) {
    var n = 0;
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(PREFIX + "read:" + chapterId + ":") === 0) n++;
      }
    } catch (e) { return 0; }
    return n;
  }

  function initReadTracking() {
    var chapter = document.body.dataset.chapter;
    if (!chapter) return;
    var secs = Array.prototype.slice.call(document.querySelectorAll(".sec[id]"));
    var bar = document.querySelector(".progressbar span");

    function refresh() {
      var done = secs.filter(function (s) { return store.get(readKey(chapter, s.id)); }).length;
      if (bar && secs.length) bar.style.width = (done / secs.length * 100) + "%";
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var sec = entry.target.closest(".sec");
          if (sec && !store.get(readKey(chapter, sec.id))) {
            store.set(readKey(chapter, sec.id), "1");
            refresh();
          }
          io.unobserve(entry.target);
        });
      });
      secs.forEach(function (s) {
        var end = s.querySelector(":scope > .sec-end");
        if (!end) {
          end = document.createElement("div");
          end.className = "sec-end";
          s.appendChild(end);
        }
        io.observe(end);
      });
    }
    refresh();
  }

  /* ---------- 前後の章 ---------- */
  function initPager() {
    var chapter = document.body.dataset.chapter;
    var pager = document.querySelector(".pager");
    var list = window.SHIRYO_CHAPTERS || [];
    if (!chapter || !pager || !list.length) return;
    var idx = list.findIndex(function (c) { return c.id === chapter; });
    if (idx < 0) return;

    function cell(item, dir, cls) {
      if (!item) return '<span class="' + cls + '" aria-hidden="true"></span>';
      var label = '<span class="dir">' + dir + "</span>" + item.no + " " + item.title;
      if (!item.ready) return '<span class="' + cls + '">' + label + "（準備中）</span>";
      return '<a class="' + cls + '" href="' + new URL(item.href, ROOT).href + '">' + label + "</a>";
    }
    pager.innerHTML = cell(list[idx - 1], "前の章", "prev") + cell(list[idx + 1], "次の章", "next");
  }

  /* ---------- 目次 ---------- */
  function initToc() {
    var toc = document.getElementById("toc");
    var list = window.SHIRYO_CHAPTERS || [];
    if (!toc) return;
    var html = "";
    var group = "";
    list.forEach(function (c) {
      if (c.group !== group) {
        if (group) html += "</ul>";
        group = c.group;
        html += '<p class="toc-group">' + group + '</p><ul class="toc">';
      }
      var stat = "準備中";
      var statCls = "stat";
      if (c.ready) {
        var read = Math.min(countRead(c.id), c.sections || 0);
        stat = read >= c.sections ? "読了" : read + " / " + c.sections;
        if (read >= c.sections) statCls += " done";
      }
      var inner = '<span class="no">' + c.no + '</span><span class="ttl">' + c.title +
        '<span class="desc">' + c.desc + '</span></span><span class="' + statCls + '">' + stat + "</span>";
      html += c.ready
        ? '<li><a href="' + c.href + '">' + inner + "</a></li>"
        : '<li><span class="soon">' + inner + "</span></li>";
    });
    html += "</ul>";
    toc.innerHTML = html;
  }

  /* ---------- Service Worker ---------- */
  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost") return;
    navigator.serviceWorker.register(new URL("sw.js", ROOT).href, { scope: ROOT.pathname }).catch(function () {});
  }

  window.Shiryo = { store: store, bindSeg: bindSeg, copyText: copyText };

  document.addEventListener("DOMContentLoaded", function () {
    initPrompts();
    initCopyButtons();
    initChecklists();
    initReveal();
    initReadTracking();
    initPager();
    initToc();
    registerSW();
  });
})();
