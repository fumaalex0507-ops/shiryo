(function () {
  "use strict";

  var W = 960, H = 540;
  var FONT = "font-family=\"Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, sans-serif\"";

  function svg(inner, defs) {
    return '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img">' +
      (defs ? "<defs>" + defs + "</defs>" : "") + inner + "</svg>";
  }
  function text(x, y, str, opt) {
    opt = opt || {};
    return '<text x="' + x + '" y="' + y + '" ' + FONT +
      ' font-size="' + Math.round((opt.size || 20) * 1.3) + '"' +
      ' font-weight="' + (opt.weight || 400) + '"' +
      ' fill="' + (opt.fill || "#222222") + '"' +
      (opt.anchor ? ' text-anchor="' + opt.anchor + '"' : "") +
      ">" + str + "</text>";
  }
  function rect(x, y, w, h, fill, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- 色の計算 ---------- */
  function hexToRgb(hex) {
    var h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgbToHex(rgb) {
    return "#" + rgb.map(function (v) {
      var s = Math.round(Math.max(0, Math.min(255, v))).toString(16);
      return s.length === 1 ? "0" + s : s;
    }).join("").toUpperCase();
  }
  function luminance(hex) {
    return hexToRgb(hex).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (sum, v, i) { return sum + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) {
    var la = luminance(a), lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function rgbToHsl(rgb) {
    var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return [h, s, l];
  }
  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var rgb = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] :
      h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return rgbToHex(rgb.map(function (v) { return (v + m) * 255; }));
  }
  function mix(hex, withHex, t) {
    var a = hexToRgb(hex), b = hexToRgb(withHex);
    return rgbToHex(a.map(function (v, i) { return v + (b[i] - v) * t; }));
  }

  /* ========== 見本1：色の使いすぎ ========== */
  (function () {
    var host = $("demo-overuse");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    var names = ["拠点A", "拠点B", "拠点C", "拠点D", "拠点E"];
    var values = [42, 58, 96, 51, 33];
    var rainbow = ["#4472C4", "#ED7D31", "#70AD47", "#FFC000", "#7E57C2"];
    var mode = "before";
    var accent = 2;

    function render() {
      var out = text(56, 74, "拠点別の配送遅延件数（9月）", { size: 30, weight: 700 }) +
        text(56, 110, "単位：件", { size: 18, fill: "#777777" });
      var base = 470, scale = 2.9;
      out += '<line x1="100" y1="' + base + '" x2="900" y2="' + base + '" stroke="#BBBBBB" stroke-width="2"/>';
      values.forEach(function (v, i) {
        var x = 120 + i * 156 + 30, h = v * scale, w = 96;
        var isAccent = mode === "after" && i === accent;
        var fill = mode === "before" ? rainbow[i] : (isAccent ? "#E07B24" : "#C9CED6");
        out += '<g data-i="' + i + '" style="cursor:' + (mode === "after" ? "pointer" : "default") + '">' +
          rect(x - 20, 140, w + 40, base - 140 + 70, "transparent") +
          rect(x, base - h, w, h, fill, ' rx="3"') +
          text(x + w / 2, base - h - 14, String(v), {
            size: isAccent ? 30 : 24, weight: isAccent ? 700 : 400, anchor: "middle",
            fill: mode === "before" ? "#222222" : (isAccent ? "#C0601A" : "#888888")
          }) +
          text(x + w / 2, base + 36, names[i], { size: 20, anchor: "middle", fill: "#555555" }) +
          "</g>";
      });
      slide.innerHTML = svg(out);
      note.innerHTML = mode === "before"
        ? "5本すべてに違う色。<b>どの棒を見ればよいか、目が迷います。</b>"
        : "主役の1本だけに色。<b>棒をタップすると、強調する拠点を変えられます。</b>目が勝手にその棒へ向くのを確かめてください。";
    }

    slide.addEventListener("click", function (e) {
      if (mode !== "after") return;
      var g = e.target.closest("g[data-i]");
      if (!g) return;
      accent = Number(g.dataset.i);
      render();
    });
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) { mode = v; render(); });
  })();

  /* ========== 見本2：赤と緑だけで区別 ========== */
  (function () {
    var host = $("demo-redgreen");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    var sim = host.querySelector("input[name=sim]");
    var rows = [
      ["拠点A", "98.2%", true], ["拠点B", "91.5%", false], ["拠点C", "97.6%", true],
      ["拠点D", "89.9%", false], ["拠点E", "96.4%", true]
    ];
    var mode = "before";
    var DEFS = '<filter id="cvd-d5"><feColorMatrix type="matrix" values="' +
      "0.367 0.861 -0.228 0 0 " +
      "0.280 0.673 0.047 0 0 " +
      "-0.012 0.043 0.969 0 0 " +
      '0 0 0 1 0"/></filter>';

    function statusMark(cx, cy, ok) {
      if (mode === "before") {
        return '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="' + (ok ? "#3CB043" : "#E03C31") + '"/>';
      }
      if (ok) {
        return '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#1F3A5F"/>' +
          '<path d="M' + (cx - 8) + " " + cy + " l6 6 l11 -12" + '" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
          text(cx + 30, cy + 8, "達成", { size: 22, fill: "#1F3A5F", weight: 700 });
      }
      return '<path d="M' + cx + " " + (cy - 17) + " L" + (cx + 17) + " " + (cy + 14) + " L" + (cx - 17) + " " + (cy + 14) + ' Z" fill="#E07B24"/>' +
        text(cx, cy + 9, "!", { size: 20, weight: 700, anchor: "middle", fill: "#FFFFFF" }) +
        text(cx + 30, cy + 8, "未達", { size: 22, fill: "#C0601A", weight: 700 });
    }

    function render() {
      var out = text(56, 74, "拠点別の定時配送率（目標95%）", { size: 30, weight: 700 });
      out += text(80, 150, "拠点", { size: 18, fill: "#777777" }) +
        text(460, 150, "定時配送率", { size: 18, fill: "#777777", anchor: "end" }) +
        text(600, 150, "判定", { size: 18, fill: "#777777" });
      rows.forEach(function (r, i) {
        var y = 205 + i * 64;
        out += '<line x1="72" y1="' + (y + 30) + '" x2="888" y2="' + (y + 30) + '" stroke="#E3E3E3" stroke-width="2"/>' +
          text(80, y + 8, r[0], { size: 24 }) +
          text(460, y + 8, r[1], { size: 24, anchor: "end" }) +
          statusMark(618, y, r[2]);
      });
      var on = sim.checked;
      slide.innerHTML = svg(on ? '<g filter="url(#cvd-d5)">' + out + "</g>" : out, on ? DEFS : "");
      if (mode === "before") {
        note.innerHTML = on
          ? "色の区別がつきにくい人の見え方の近似です。<b>どの拠点が未達か、色だけでは判別できません。</b>"
          : "赤と緑の丸だけで判定を表しています。下のスイッチで見え方を変えてみてください。";
      } else {
        note.innerHTML = on
          ? "同じ見え方でも、<b>形と文字があるので判定がすぐに分かります。</b>"
          : "形（丸と三角）、文字（達成・未達）、色の3つで区別しています。";
      }
    }
    sim.addEventListener("change", render);
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) { mode = v; render(); });
  })();

  /* ========== 見本3：コントラスト不足 ========== */
  (function () {
    var host = $("demo-contrast");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var range = host.querySelector("input[type=range]");
    var ratioOut = host.querySelector("output");
    var verdict = host.querySelector(".verdict");
    var color = "#BBBBBB";

    function grayHex(v) { return rgbToHex([v, v, v]); }

    function render() {
      var out = text(56, 100, "倉庫Bの保管効率は前年比12%改善", { size: 34, weight: 700, fill: color }) +
        text(56, 210, "棚割りを見直し、ピッキング動線が18%短縮。", { size: 26, fill: color }) +
        text(56, 270, "繁忙期の残業も月40時間削減できた。", { size: 26, fill: color }) +
        text(56, 330, "次期は倉庫Dにも同じ手順を展開する。", { size: 26, fill: color }) +
        text(56, 470, "出典：倉庫管理システム（2026年9月時点）", { size: 18, fill: color });
      slide.innerHTML = svg(out);
      var r = contrast(color, "#FFFFFF");
      ratioOut.textContent = r.toFixed(1) + " : 1";
      var v = r >= 7 ? ["good", "とても読みやすい"] : r >= 4.5 ? ["good", "本文に使える"] :
        r >= 3 ? ["mid", "大きな文字だけ可"] : ["bad", "読みにくい"];
      verdict.className = "verdict " + v[0];
      verdict.textContent = v[1];
    }

    range.addEventListener("input", function () {
      color = grayHex(Number(range.value));
      host.querySelectorAll(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      render();
    });
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) {
      color = v === "gray" ? "#BBBBBB" : v === "yellow" ? "#F2C200" : "#333333";
      if (v === "gray") range.value = 187;
      if (v === "dark") range.value = 51;
      render();
    });
  })();

  /* ========== 見本4：アクセントの面積 ========== */
  (function () {
    var host = $("demo-ratio");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var note = host.querySelector(".demo-note");
    var MAIN = "#1F3A5F", LIGHT = "#E8EEF5", ACC = "#E07B24", ACC_TEXT = "#C0601A";
    var areas = [3, 6, 10, 18, 45];
    var notes = [
      "アクセントは合計金額の1か所だけ。<b>目が最初にそこへ向きます。</b>",
      "2か所に増えました。まだ「一番大事なもの」は分かります。",
      "数字がすべてアクセント色に。<b>どれが一番大事か、差がなくなってきました。</b>",
      "タイトルまでアクセント色に。強調がスライド全体に散らばっています。",
      "カードの面まで塗りました。<b>アクセントがベースのようになり、何も目立ちません。</b>"
    ];

    function render() {
      var n = Number(range.value);
      var cards = [["共同配送", "−8.2%"], ["積載率の改善", "−5.1%"], ["ルートの最適化", "−3.4%"]];
      var s = text(56, 84, "配送コストを下げる3つの施策", { size: 32, weight: 700, fill: n >= 4 ? ACC_TEXT : MAIN });
      cards.forEach(function (c, i) {
        var x = 56 + i * 290, y = 140, w = 266, h = 200;
        var filled = n >= 5;
        var numAcc = (i === 0 && n >= 2) || (i > 0 && n >= 3);
        s += rect(x, y, w, h, filled ? ACC : LIGHT, ' rx="10"') +
          text(x + 24, y + 52, c[0], { size: 22, fill: filled ? "#FFFFFF" : "#444444" }) +
          text(x + 24, y + 140, c[1], { size: 54, weight: 700, fill: filled ? "#FFFFFF" : (numAcc ? ACC_TEXT : MAIN) }) +
          text(x + 24, y + 176, "配送コスト比", { size: 16, fill: filled ? "#FFFFFF" : "#777777" });
      });
      s += text(56, 420, "3施策の合計で、年間の削減見込みは", { size: 24, fill: "#444444" }) +
        text(56, 480, "1.2億円", { size: 48, weight: 700, fill: ACC_TEXT });
      slide.innerHTML = svg(s);
      out.textContent = n + " か所（画面の約" + areas[n - 1] + "%）";
      note.innerHTML = notes[n - 1];
    }
    range.addEventListener("input", render);
    render();
  })();

  /* ========== 見本5：パレット切替 ========== */
  (function () {
    var host = $("demo-palette");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var custom = host.querySelector(".color-input-row");
    var picker = host.querySelector("input[type=color]");
    var info = host.querySelector(".palette-info");
    var PALETTES = {
      navy: { main: "#1F3A5F", light: "#E8EEF5", accent: "#F28C28" },
      green: { main: "#2E6B4F", light: "#EAF3EE", accent: "#D9822B" },
      mono: { main: "#333333", light: "#F2F2F2", accent: "#C0392B" }
    };
    /* 自社カラー：会社案内の配色（グリーン・帯の薄緑・レモンイエロー）から作成 */
    var BRAND = { main: "#3A8048", light: "#EAF0D2", accent: "#E8B44A", accentText: "#9A6E14" };

    /* アクセントを文字に使うときは、白地で4.5:1以上になるまで暗くする */
    function textSafe(hex) {
      var hsl = rgbToHsl(hexToRgb(hex));
      var out = hex.toUpperCase();
      for (var l = hsl[2]; l > 0 && contrast(out, "#FFFFFF") < 4.5; l -= 0.01) {
        out = hslToHex(hsl[0], hsl[1], l);
      }
      return out;
    }
    var current = "navy";

    function customPalette(main) {
      if (main.toUpperCase() === BRAND.main) return BRAND;
      var hsl = rgbToHsl(hexToRgb(main));
      var light = mix(main, "#FFFFFF", 0.9);
      /* 反対側の色相から、白地で見える明るさのアクセントを作る */
      var accent = hslToHex(hsl[0] + 180, Math.max(0.65, hsl[1]), 0.5);
      return { main: main.toUpperCase(), light: light, accent: accent };
    }

    function render() {
      var p = current === "custom" ? customPalette(picker.value) : PALETTES[current];
      var accText = p.accentText || textSafe(p.accent);
      var values = [30, 42, 71, 36];
      var labels = ["4月", "5月", "6月", "7月"];
      var s = text(56, 80, "6月に返品件数が急増", { size: 32, weight: 700, fill: p.main }) +
        text(56, 116, "返品件数の推移（単位：件）", { size: 18, fill: "#777777" });
      var base = 460;
      s += '<line x1="56" y1="' + base + '" x2="520" y2="' + base + '" stroke="#CCCCCC" stroke-width="2"/>';
      values.forEach(function (v, i) {
        var x = 80 + i * 112, h = v * 4, isAcc = i === 2;
        s += rect(x, base - h, 72, h, isAcc ? p.accent : p.main, ' rx="3"') +
          text(x + 36, base - h - 12, String(v), { size: 22, anchor: "middle", weight: isAcc ? 700 : 400, fill: isAcc ? accText : "#555555" }) +
          text(x + 36, base + 32, labels[i], { size: 18, anchor: "middle", fill: "#666666" });
      });
      s += rect(580, 160, 324, 300, p.light, ' rx="10"') +
        text(608, 216, "要因", { size: 19, weight: 700, fill: p.main }) +
        text(608, 266, "梱包資材の変更で", { size: 20, fill: "#333333" }) +
        text(608, 306, "破損による返品が増加", { size: 20, fill: "#333333" }) +
        text(608, 372, "前月比", { size: 18, fill: "#555555" }) +
        text(608, 436, "+69%", { size: 46, weight: 700, fill: accText });
      slide.innerHTML = svg(s);
      info.innerHTML = "メイン <b>" + p.main + "</b>　薄色 <b>" + p.light + "</b>　アクセント <b>" + p.accent + "</b>" +
        (accText !== p.accent.toUpperCase() ? "（文字に使うときは <b>" + accText + "</b>）" : "");
    }

    picker.addEventListener("input", render);
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) {
      current = v;
      custom.hidden = v !== "custom";
      render();
    });
  })();

  /* パレットカードのコピー */
  document.querySelectorAll(".chip[data-hex]").forEach(function (chip) {
    chip.type = "button";
    chip.addEventListener("click", function () {
      Shiryo.copyText(chip.dataset.hex).then(function () {
        chip.classList.add("copied");
        setTimeout(function () { chip.classList.remove("copied"); }, 1400);
      });
    });
  });

  /* ========== 練習課題 ========== */
  (function () {
    var before = $("practice-before");
    var after = $("practice-after");
    if (!before || !after) return;
    var months = ["4月", "5月", "6月", "7月", "8月", "9月"];
    var series = [
      { name: "東倉庫", data: [120, 125, 118, 130, 128, 132], vivid: "#E53935" },
      { name: "西倉庫", data: [110, 115, 120, 165, 180, 195], vivid: "#43A047" },
      { name: "北倉庫", data: [90, 92, 95, 94, 98, 96], vivid: "#1E88E5" }
    ];
    var x0 = 110, x1 = 760, yTop = 150, yBase = 470, vMax = 200;
    function px(i) { return x0 + i * (x1 - x0) / (months.length - 1); }
    function py(v) { return yBase - v / vMax * (yBase - yTop); }
    function path(d) { return d.map(function (v, i) { return (i ? "L" : "M") + px(i) + " " + py(v); }).join(" "); }
    function axis() {
      var s = "";
      months.forEach(function (m, i) { s += text(px(i), yBase + 34, m, { size: 18, anchor: "middle", fill: "#666666" }); });
      return s;
    }

    var b = rect(0, 0, W, H, "#FFFFFF") +
      text(56, 70, "月別出荷量の推移", { size: 30, weight: 700, fill: "#E53935" });
    [50, 100, 150, 200].forEach(function (v) {
      b += '<line x1="' + x0 + '" y1="' + py(v) + '" x2="' + x1 + '" y2="' + py(v) + '" stroke="#CCCCCC" stroke-width="1.5"/>' +
        text(x0 - 14, py(v) + 6, String(v), { size: 16, anchor: "end", fill: "#666666" });
    });
    b += '<line x1="' + x0 + '" y1="' + yBase + '" x2="' + x1 + '" y2="' + yBase + '" stroke="#999999" stroke-width="2"/>';
    series.forEach(function (s) {
      b += '<path d="' + path(s.data) + '" fill="none" stroke="' + s.vivid + '" stroke-width="5"/>';
    });
    b += axis();
    b += rect(790, 160, 150, 120, "#FFFFFF", ' stroke="#999999" stroke-width="1.5"');
    series.forEach(function (s, i) {
      b += rect(806, 182 + i * 34, 22, 6, s.vivid) + text(838, 192 + i * 34, s.name, { size: 18 });
    });
    b += rect(560, 82, 260, 46, "#FFF59D") + text(574, 114, "西倉庫が急増！", { size: 24, weight: 700, fill: "#E53935" });
    before.innerHTML = svg(b);

    var a = text(56, 70, "西倉庫の出荷量が7月以降に急増", { size: 30, weight: 700, fill: "#1F3A5F" }) +
      text(56, 106, "9月は195千ケースで、東倉庫の約1.5倍（単位：千ケース）", { size: 18, fill: "#777777" });
    a += '<line x1="' + x0 + '" y1="' + yBase + '" x2="' + x1 + '" y2="' + yBase + '" stroke="#BBBBBB" stroke-width="2"/>';
    series.forEach(function (s) {
      var isMain = s.name === "西倉庫";
      var col = isMain ? "#E07B24" : "#BFC5CD";
      var last = s.data[s.data.length - 1];
      a += '<path d="' + path(s.data) + '" fill="none" stroke="' + col + '" stroke-width="' + (isMain ? 6 : 4) + '"/>' +
        '<circle cx="' + px(5) + '" cy="' + py(last) + '" r="' + (isMain ? 7 : 5) + '" fill="' + col + '"/>' +
        text(px(5) + 20, py(last) + 7, s.name + " " + last, { size: 20, weight: isMain ? 700 : 400, fill: isMain ? "#C0601A" : "#888888" });
    });
    a += axis();
    after.innerHTML = svg(a);
  })();
})();
