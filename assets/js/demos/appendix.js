(function () {
  "use strict";

  /* ===== チートシート：骨格パターン ===== */
  if (window.K) {
    var P = K.P, r = K.r;
    var G = "#D5D9DE", T = P.main;
    var title = r(48, 36, 560, 40, T, { rx: 4 });
    var pats = {
      "cs-1": title + r(48, 110, 864, 380, G, { rx: 6 }),
      "cs-2": title + r(48, 110, 420, 380, G, { rx: 6 }) + r(492, 110, 420, 380, G, { rx: 6 }),
      "cs-3": title + r(48, 110, 272, 380, G, { rx: 6 }) + r(344, 110, 272, 380, G, { rx: 6 }) + r(640, 110, 272, 380, G, { rx: 6 }),
      "cs-4": title + r(48, 110, 520, 380, G, { rx: 6 }) + r(600, 120, 312, 28, G, { rx: 4 }) + r(600, 170, 280, 20, G, { rx: 4 }) + r(600, 205, 300, 20, G, { rx: 4 }),
      "cs-5": title + r(48, 110, 864, 250, G, { rx: 6 }) + r(48, 384, 864, 106, P.light, { rx: 6 })
    };
    Object.keys(pats).forEach(function (id) { K.still(id, K.svg(pats[id])); });
  }

  /* パレットのコピー */
  document.querySelectorAll(".chip[data-hex]").forEach(function (chip) {
    chip.type = "button";
    chip.addEventListener("click", function () {
      Shiryo.copyText(chip.dataset.hex).then(function () {
        chip.classList.add("copied");
        setTimeout(function () { chip.classList.remove("copied"); }, 1400);
      });
    });
  });

  /* ===== AI指示テンプレート集 ===== */
  var list = document.getElementById("prompt-list");
  if (list) {
    var prompts = window.SHIRYO_PROMPTS || [];
    var html = "";
    prompts.forEach(function (p) {
      html += '<li><label><input type="checkbox" value="' + p.id + '"' + (p.id === "intro" || p.id === "ch05" ? " checked" : "") + ">" +
        '<span><b>' + p.no + "　" + p.title + "</b></span></label>" +
        '<details><summary>内容を見る</summary><div class="prompt-text"></div></details></li>';
    });
    list.innerHTML = html;
    list.querySelectorAll("li").forEach(function (li, i) {
      li.querySelector(".prompt-text").textContent = prompts[i].text;
    });

    var tmpl = document.getElementById("request-template");
    if (tmpl) tmpl.textContent = window.SHIRYO_REQUEST_TEMPLATE || "";

    var out = document.getElementById("combined");
    var count = document.getElementById("combined-count");
    function build() {
      var ids = Array.prototype.slice.call(list.querySelectorAll("input:checked")).map(function (i) { return i.value; });
      var withTmpl = document.getElementById("with-template").checked;
      var parts = [];
      if (withTmpl) parts.push(window.SHIRYO_REQUEST_TEMPLATE);
      prompts.forEach(function (p) { if (ids.indexOf(p.id) >= 0) parts.push(p.text); });
      out.textContent = parts.join("\n\n");
      count.textContent = ids.length + " 件の指示文" + (withTmpl ? "＋依頼文テンプレート" : "");
    }
    list.addEventListener("change", build);
    document.getElementById("with-template").addEventListener("change", build);
    document.getElementById("select-all").addEventListener("click", function () {
      list.querySelectorAll("input").forEach(function (i) { i.checked = true; });
      build();
    });
    document.getElementById("select-none").addEventListener("click", function () {
      list.querySelectorAll("input").forEach(function (i) { i.checked = false; });
      build();
    });
    build();
  }

  /* ===== 直しの指示：1行ずつコピー ===== */
  document.querySelectorAll(".fix-list li").forEach(function (li) {
    var btn = li.querySelector("button");
    var text = li.querySelector(".fix-text");
    if (!btn || !text) return;
    btn.type = "button";
    btn.addEventListener("click", function () {
      Shiryo.copyText(text.textContent.trim()).then(function () {
        btn.textContent = "コピー済";
        setTimeout(function () { btn.textContent = "コピー"; }, 1400);
      });
    });
  });
})();
