(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;
  var VIVID = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5"];

  /* ===== 装飾を1つずつ削る ===== */
  (function () {
    var host = K.$("demo-declutter");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var pos = host.querySelector(".pos");
    var prev = host.querySelector(".prev");
    var next = host.querySelector(".next");
    var note = host.querySelector(".demo-note");
    var months = ["4月", "5月", "6月", "7月", "8月", "9月"];
    var last = [98, 101, 99, 103, 100, 104];
    var cur = [102, 106, 105, 112, 110, 118];
    var notes = [
      "表計算ソフトの初期設定に近い状態です。枠線、背景、濃い目盛り線、凡例、鮮やかな2色。<b>ここから1つずつ削っていきます。</b>",
      "1. 枠線と背景色を消しました。グラフがスライドに溶け込み、<b>データそのものが前に出ます。</b>",
      "2. 目盛り線を消しました。値は棒の長さで比べられるので、<b>細かい目盛りは必要ありません。</b>",
      "3. 凡例をやめ、系列名を棒のすぐ近くに書きました。<b>凡例と棒の間で目を往復させずに済みます。</b>",
      "4. 前年をグレーにし、今年をメインの色に。伝えたい9月だけをアクセントにしました。<b>色が意味を持ちます。</b>",
      "5. 数値は伝えたい9月の2本だけに残しました。<b>全部に数字があると、どれも同じ重さに見えます。</b>",
      "6. タイトルを結論の文にしました。<b>グラフから何を読み取ればよいかが、最初に分かります。</b>"
    ];
    var i = 0;
    function draw() {
      var x0 = 110, x1 = 860, base = 450, top = 150, vmax = 130;
      var s = "";
      if (i < 1) s += r(30, 20, 900, 500, "#EEF1F6", { stroke: "#7F7F7F", sw: 3 });
      s += i >= 6
        ? t(56, 70, "9月の配送コストは前年同月比13%増と、増加幅が広がった", { size: 28, weight: 700, fill: P.main })
        : t(480, 70, "配送コスト", { size: 30, weight: 700, anchor: "middle", fill: P.text });
      s += t(i >= 6 ? 56 : 60, 110, "月別の配送コスト（単位：百万円）", { size: 18, fill: P.sub });
      if (i < 2) {
        [0, 20, 40, 60, 80, 100, 120].forEach(function (v) {
          var y = base - v / vmax * (base - top);
          s += l(x0, y, x1, y, "#A6A6A6", 1.5) + t(x0 - 12, y + 6, String(v), { size: 16, anchor: "end", fill: "#595959" });
        });
      }
      s += l(x0, base, x1, base, i < 2 ? "#7F7F7F" : P.line, 2);
      var step = (x1 - x0) / months.length, bw = step * 0.32;
      months.forEach(function (m, k) {
        var cx = x0 + k * step + step / 2;
        var hl = k === 5 && i >= 4;
        var cLast = i >= 4 ? "#DDE1E6" : VIVID[0];
        var cCur = i >= 4 ? (hl ? P.accent : P.main) : VIVID[1];
        var hL = last[k] / vmax * (base - top), hC = cur[k] / vmax * (base - top);
        s += r(cx - bw - 2, base - hL, bw, hL, cLast) + r(cx + 2, base - hC, bw, hC, cCur);
        if (i < 5 || k === 5) {
          var showAll = i < 5;
          s += t(cx - bw / 2 - 2, base - hL - 8, String(last[k]), { size: showAll ? 14 : 18, anchor: "middle", fill: P.sub });
          s += t(cx + bw / 2 + 2, base - hC - 8, String(cur[k]), { size: showAll ? 14 : 22, anchor: "middle", fill: hl ? P.accentText : P.text, weight: hl ? 700 : 400 });
        }
        s += t(cx, base + 30, m, { size: 18, anchor: "middle", fill: P.sub });
      });
      if (i < 3) {
        s += r(330, 486, 18, 18, VIVID[0]) + t(356, 501, "前年", { size: 18 });
        s += r(470, 486, 18, 18, VIVID[1]) + t(496, 501, "今年", { size: 18 });
      } else {
        var cx0 = x0 + step / 2;
        s += t(cx0 - bw / 2 - 2, base - last[0] / vmax * (base - top) - (i < 5 ? 30 : 12), "前年", { size: 18, anchor: "middle", fill: P.sub });
        s += t(cx0 + bw / 2 + 2, base - cur[0] / vmax * (base - top) - (i < 5 ? 30 : 12), "今年", { size: 18, anchor: "middle", fill: i >= 4 ? P.main : P.text, weight: 700 });
      }
      slide.innerHTML = K.svg(s);
      pos.textContent = i === 0 ? "元の状態" : "ステップ " + i + " / 6";
      prev.disabled = i === 0;
      next.disabled = i === 6;
      note.innerHTML = notes[i];
    }
    prev.type = next.type = "button";
    prev.addEventListener("click", function () { if (i > 0) { i--; draw(); } });
    next.addEventListener("click", function () { if (i < 6) { i++; draw(); } });
    draw();
  })();

  /* ===== 凡例と直接ラベル ===== */
  K.demo("demo-legend", function (mode) {
    var ok = mode === "after";
    var months = ["4月", "5月", "6月", "7月", "8月", "9月"];
    var series = [
      ["拠点A", [96.0, 96.4, 95.8, 96.6, 96.9, 97.1]],
      ["拠点B", [95.2, 94.6, 93.9, 93.1, 92.4, 91.8]],
      ["拠点C", [97.0, 97.3, 97.1, 97.4, 97.6, 97.5]],
      ["拠点D", [94.8, 95.1, 95.5, 95.4, 95.9, 96.2]]
    ];
    var cols = ["#4472C4", "#ED7D31", "#5B9BD5", "#FFC000"];
    var x0 = 90, x1 = ok ? 740 : 820, top = 140, base = 440, lo = 90, hi = 100;
    function px(k) { return x0 + k * (x1 - x0) / 5; }
    function py(v) { return base - (v - lo) / (hi - lo) * (base - top); }
    var s = ok
      ? t(56, 70, "拠点Bだけ、定時配送率が半年で3.4ポイント下がった", { size: 28, weight: 700, fill: P.main })
      : t(56, 70, "拠点別の定時配送率の推移", { size: 30, weight: 700 });
    s += t(56, 108, "単位：%（縦軸は90%から）", { size: 18, fill: P.sub });
    months.forEach(function (m, k) { s += t(px(k), base + 30, m, { size: 18, anchor: "middle", fill: P.sub }); });
    [90, 95, 100].forEach(function (v) { s += t(x0 - 12, py(v) + 6, String(v), { size: 16, anchor: "end", fill: P.muted }); });
    s += l(x0, base, x1, base, P.line, 2);
    series.forEach(function (se, j) {
      var col = ok ? (j === 1 ? P.accent : P.gray) : cols[j];
      var d = se[1].map(function (v, k) { return (k ? "L" : "M") + px(k) + " " + py(v); }).join(" ");
      s += K.p(d, col, ok && j === 1 ? 6 : 4);
      if (ok) {
        var lv = se[1][5];
        var ly = py(lv) + 7 + ({ 0: -8, 2: -14, 3: 8 }[j] || 0);
        s += t(px(5) + 14, ly, se[0] + " " + lv.toFixed(1), { size: 20, fill: j === 1 ? P.accentText : P.sub, weight: j === 1 ? 700 : 400 });
      }
    });
    if (!ok) {
      series.forEach(function (se, j) {
        var x = 200 + j * 150;
        s += l(x, 500, x + 30, 500, cols[j], 4) + t(x + 40, 507, se[0], { size: 18 });
      });
    }
    return {
      svg: K.svg(s),
      note: ok
        ? "名前を線の右端に直接書き、伝えたい拠点Bだけに色を付けました。<b>凡例を探す必要がありません。</b>"
        : "どの線がどの拠点かは、下の凡例と色を照らし合わせないと分かりません。<b>4本の線と凡例の間を、目が何度も往復します。</b>"
    };
  });

  /* ===== 3Dグラフ ===== */
  function pie3d(cx, cy, rx, ry, depth, slices) {
    function pt(a, dy) { return (cx + rx * Math.cos(a)).toFixed(1) + " " + (cy + ry * Math.sin(a) + (dy || 0)).toFixed(1); }
    var sides = "", tops = "", labels = "";
    slices.forEach(function (sl) {
      var a0 = sl.a0, a1 = sl.a1;
      var s0 = Math.max(a0, 0), s1 = Math.min(a1, Math.PI);
      if (s1 > s0) {
        sides += '<path d="M' + pt(s0) + " A" + rx + " " + ry + " 0 0 1 " + pt(s1) + " L" + pt(s1, depth) +
          " A" + rx + " " + ry + " 0 0 0 " + pt(s0, depth) + ' Z" fill="' + sl.dark + '"/>';
      }
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      tops += '<path d="M' + cx + " " + cy + " L" + pt(a0) + " A" + rx + " " + ry + " 0 " + large + " 1 " + pt(a1) + ' Z" fill="' + sl.col + '" stroke="#FFFFFF" stroke-width="2"/>';
      var m = (a0 + a1) / 2;
      labels += t(cx + rx * 0.62 * Math.cos(m), cy + ry * 0.62 * Math.sin(m) + 8, sl.name, { size: 22, weight: 700, anchor: "middle", fill: "#FFFFFF" });
    });
    return sides + tops + labels;
  }

  K.demo("demo-3d", function (mode) {
    var ok = mode === "after";
    var data = [["拠点A", 30], ["拠点B", 30], ["拠点C", 20], ["拠点D", 20]];
    var s;
    if (!ok) {
      var d = Math.PI / 180;
      var slices = [
        { name: "拠点A", a0: 216 * d, a1: 324 * d, col: "#4472C4", dark: "#2F528F" },
        { name: "拠点D", a0: 324 * d, a1: 396 * d, col: "#FFC000", dark: "#BF9000" },
        { name: "拠点B", a0: 36 * d, a1: 144 * d, col: "#ED7D31", dark: "#AE5A21" },
        { name: "拠点C", a0: 144 * d, a1: 216 * d, col: "#A5A5A5", dark: "#7C7C7C" }
      ];
      s = t(56, 70, "拠点別の出荷量の構成比", { size: 30, weight: 700 });
      s += pie3d(440, 270, 300, 130, 56, slices);
      return { svg: K.svg(s), note: "拠点Aと拠点Bは<b>どちらも30%</b>です。手前の拠点Bのほうが、側面が見えるぶん大きく見えませんか。" };
    }
    s = t(56, 70, "出荷量は拠点Aと拠点Bが同じ30%で最も多い", { size: 30, weight: 700, fill: P.main });
    s += t(56, 108, "拠点別の出荷量の構成比（%）", { size: 18, fill: P.sub });
    data.forEach(function (row, i) {
      var y = 150 + i * 86, w = row[1] * 18;
      s += t(56, y + 38, row[0], { size: 24 });
      s += r(180, y + 8, w, 44, i < 2 ? P.main : P.gray, { rx: 3 });
      s += t(192 + w, y + 40, row[1] + "%", { size: 24, weight: i < 2 ? 700 : 400, fill: i < 2 ? P.main : P.sub });
    });
    return { svg: K.svg(s), note: "平らな横棒なら、<b>2つの30%が同じ長さ</b>に見えます。" };
  });

  /* ===== 縦軸の省略 ===== */
  K.demo("demo-axis", function (mode) {
    var names = ["拠点A", "拠点B", "拠点C"], vals = [96.1, 94.8, 97.2], target = 95;
    var s, x0 = 160, base = 440, top = 150;
    if (mode === "diff") {
      s = t(56, 70, "目標（95%）を下回ったのは拠点Bだけ", { size: 30, weight: 700, fill: P.main });
      s += t(56, 108, "定時配送率の目標との差（ポイント）", { size: 18, fill: P.sub });
      var zero = 300;
      s += l(x0 - 20, zero, 880, zero, P.sub, 2) + t(x0 - 30, zero + 6, "目標", { size: 18, anchor: "end", fill: P.sub });
      vals.forEach(function (v, i) {
        var dv = v - target, h = dv * 60, cx = x0 + 80 + i * 240;
        var neg = dv < 0;
        s += r(cx - 50, neg ? zero : zero - h, 100, Math.abs(h), neg ? P.accent : P.gray, { rx: 3 });
        s += t(cx, neg ? zero + Math.abs(h) + 32 : zero - h - 12, (dv > 0 ? "+" : "−") + Math.abs(dv).toFixed(1), { size: 26, anchor: "middle", weight: 700, fill: neg ? P.accentText : P.sub });
        s += t(cx, 480, names[i], { size: 20, anchor: "middle", fill: P.sub });
      });
      return { svg: K.svg(s), note: "差を見せたいなら、<b>差そのものをグラフにする</b>のが正直で分かりやすい方法です。" };
    }
    var lo = mode === "cut" ? 94 : 0, hi = mode === "cut" ? 97.5 : 100;
    s = t(56, 70, "拠点別の定時配送率", { size: 30, weight: 700 });
    s += t(56, 108, "単位：%" + (mode === "cut" ? "（縦軸は94%から）" : ""), { size: 18, fill: P.sub });
    var ticks = mode === "cut" ? [94, 95, 96, 97] : [0, 25, 50, 75, 100];
    ticks.forEach(function (v) {
      var y = base - (v - lo) / (hi - lo) * (base - top);
      s += l(x0, y, 880, y, "#EEEEEE", 1.5) + t(x0 - 12, y + 6, String(v), { size: 16, anchor: "end", fill: P.muted });
    });
    vals.forEach(function (v, i) {
      var h = (v - lo) / (hi - lo) * (base - top), cx = x0 + 120 + i * 240;
      s += r(cx - 50, base - h, 100, h, P.main, { rx: 3 });
      s += t(cx, base - h - 12, v.toFixed(1), { size: 24, anchor: "middle" });
      s += t(cx, 480, names[i], { size: 20, anchor: "middle", fill: P.sub });
    });
    s += l(x0, base, 880, base, P.sub, 2);
    return {
      svg: K.svg(s),
      note: mode === "cut"
        ? "縦軸を94%から始めたので、拠点Bは拠点Cの<b>3分の1以下</b>に見えます。実際の差は2.4ポイントです。"
        : "0から始めると、3つの差はほとんど見えません。<b>これが本当の差の大きさ</b>です。"
    };
  });

  /* ===== グラフの選び方 ===== */
  (function () {
    var G = P.gray, M = P.main, A = P.accent;
    var bar = "";
    [520, 400, 330, 220].forEach(function (w, i) { bar += r(80, 80 + i * 100, w, 60, i === 0 ? A : G, { rx: 4 }); });
    K.still("ch-bar", K.svg(bar));
    var line = K.p("M80 400 L250 360 L420 380 L590 250 L760 200 L880 140", A, 10) + K.p("M80 330 L250 320 L420 340 L590 330 L760 320 L880 330", G, 8) + l(80, 460, 880, 460, P.line, 4);
    K.still("ch-line", K.svg(line));
    var stack = "";
    [[0.5, 0.3, 0.2], [0.35, 0.4, 0.25], [0.6, 0.25, 0.15]].forEach(function (row, i) {
      var x = 80, y = 100 + i * 130;
      row.forEach(function (v, j) {
        stack += r(x, y, v * 800, 80, [M, "#8DB596", P.light][j]);
        x += v * 800;
      });
    });
    K.still("ch-stack", K.svg(stack));
    var slope = l(200, 80, 200, 470, P.line, 4) + l(760, 80, 760, 470, P.line, 4);
    [[380, 160, A], [300, 330, G], [250, 270, G], [420, 400, G]].forEach(function (d) {
      slope += l(200, d[0], 760, d[1], d[2], d[2] === A ? 10 : 6) + K.c(200, d[0], 14, d[2]) + K.c(760, d[1], 14, d[2]);
    });
    K.still("ch-slope", K.svg(slope));
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var d = Math.PI / 180;
    var vals = [["燃料費", 35, "#4472C4"], ["人件費", 30, "#ED7D31"], ["車両費", 18, "#A5A5A5"], ["高速代", 10, "#FFC000"], ["その他", 7, "#5B9BD5"]];
    var s = r(20, 16, 920, 508, "#F2F2F2", { stroke: "#7F7F7F", sw: 2 });
    s += t(480, 66, "配送コストの内訳", { size: 30, weight: 700, anchor: "middle" });
    var a = -90 * d, cx = 360, cy = 300, rr = 180;
    vals.forEach(function (v) {
      var a1 = a + v[1] / 100 * 2 * Math.PI;
      var large = v[1] > 50 ? 1 : 0;
      s += '<path d="M' + cx + " " + cy + " L" + (cx + rr * Math.cos(a)) + " " + (cy + rr * Math.sin(a)) + " A" + rr + " " + rr + " 0 " + large + " 1 " + (cx + rr * Math.cos(a1)) + " " + (cy + rr * Math.sin(a1)) + ' Z" fill="' + v[2] + '" stroke="#FFFFFF" stroke-width="2"/>';
      a = a1;
    });
    vals.forEach(function (v, i) {
      s += r(640, 180 + i * 48, 22, 22, v[2]) + t(674, 199 + i * 48, v[0], { size: 22 });
    });
    K.still("practice-before", K.svg(s));

    var b = t(56, 70, "燃料費が配送コストの35%を占め、最大の削減対象", { size: 30, weight: 700, fill: P.main });
    b += t(56, 108, "配送コストの内訳（2025年度、構成比%）", { size: 18, fill: P.sub });
    vals.forEach(function (v, i) {
      var y = 140 + i * 74, w = v[1] * 18, hl = i === 0;
      b += t(56, y + 36, v[0], { size: 24, weight: hl ? 700 : 400 });
      b += r(190, y + 8, w, 40, hl ? P.accent : P.gray, { rx: 3 });
      b += t(202 + w, y + 38, v[1] + "%", { size: 24, weight: hl ? 700 : 400, fill: hl ? P.accentText : P.sub });
    });
    K.still("practice-after", K.svg(b));
  })();
})();
