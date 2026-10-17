(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* ===== 意味のない矢印 ===== */
  K.demo("demo-arrows", function (mode) {
    var ok = mode === "after", s;
    var items = [["共同配送", "積載率を81%に"], ["ルートの見直し", "距離を12%短縮"], ["シフトの変更", "待ち時間を半減"]];
    if (!ok) {
      s = t(56, 70, "配送コスト削減の取り組み", { size: 32, weight: 700 });
      s += r(56, 120, 250, 110, "#DCE6F2", { rx: 10, stroke: "#4472C4", sw: 3 }) + t(181, 165, items[0][0], { size: 24, weight: 700, anchor: "middle" }) + t(181, 205, items[0][1], { size: 20, anchor: "middle" });
      s += K.arrow(310, 175, 400, 260, "#4472C4", 6);
      s += r(380, 260, 250, 110, "#FDE9D9", { rx: 10, stroke: "#ED7D31", sw: 3 }) + t(505, 305, items[1][0], { size: 24, weight: 700, anchor: "middle" }) + t(505, 345, items[1][1], { size: 20, anchor: "middle" });
      s += K.arrow(634, 320, 700, 210, "#ED7D31", 6);
      s += r(660, 110, 250, 110, "#E2EFDA", { rx: 10, stroke: "#70AD47", sw: 3 }) + t(785, 155, items[2][0], { size: 24, weight: 700, anchor: "middle" }) + t(785, 195, items[2][1], { size: 20, anchor: "middle" });
      s += K.arrow(785, 225, 600, 420, "#7F7F7F", 6);
      s += t(480, 470, "コスト削減", { size: 30, weight: 700, anchor: "middle", fill: "#C00000" });
      s += K.arrow(160, 236, 360, 450, "#7F7F7F", 4);
      return { svg: K.svg(s), note: "3つの施策は順番に行うものではないのに、矢印でつながっています。<b>読み手は「1→2→3の順番がある」と誤解します。</b>" };
    }
    s = t(56, 70, "3つの施策を並行して進め、配送コストを年1.4億円下げる", { size: 30, weight: 700, fill: P.main });
    items.forEach(function (it, i) {
      var x = 56 + i * 290;
      s += r(x, 130, 266, 150, "#F4F5F7", { rx: 8 });
      s += t(x + 22, 182, it[0], { size: 26, weight: 700 });
      s += t(x + 22, 234, it[1], { size: 22, fill: P.sub });
    });
    s += K.p("M56 310 L56 330 L878 330 L878 310", P.muted, 3) + K.l(467, 330, 467, 360, P.muted, 3);
    s += r(56, 380, 848, 100, P.light, { rx: 8 });
    s += t(80, 444, "合計の削減見込み", { size: 24, fill: P.main });
    s += t(880, 450, "年 1.4億円", { size: 40, weight: 700, anchor: "end", fill: P.accentText });
    return { svg: K.svg(s), note: "並列の施策は<b>矢印を使わず横に並べ</b>、まとまりは括弧の線で示しました。" };
  });

  /* ===== 配送フローの比較 ===== */
  K.demo("demo-flow", function (mode) {
    var ok = mode === "after", s;
    function box(x, y, w, label, opt) {
      opt = opt || {};
      var out = "";
      if (opt.shadow) out += r(x + 8, y + 8, w, 70, "#BBBBBB", { rx: 10 });
      out += r(x, y, w, 70, opt.fill || "#F4F5F7", { rx: opt.rx === undefined ? 8 : opt.rx, stroke: opt.stroke, sw: opt.sw });
      out += t(x + w / 2, y + 45, label, { size: 22, anchor: "middle", weight: opt.bold ? 700 : 400, fill: opt.color || P.text });
      return out;
    }
    if (!ok) {
      s = t(56, 60, "配送フローの変更", { size: 30, weight: 700 });
      s += t(56, 120, "【現状】", { size: 22, weight: 700 });
      s += box(56, 140, 170, "当社倉庫", { shadow: true, fill: "#DCE6F2" }) + K.arrow(232, 175, 290, 175, "#4472C4", 5) +
        box(296, 140, 170, "自社トラック", { shadow: true, fill: "#DCE6F2" }) + K.arrow(472, 175, 530, 175, "#4472C4", 5) + box(536, 140, 170, "得意先", { shadow: true, fill: "#DCE6F2" });
      s += t(600, 300, "【変更後】", { size: 22, weight: 700 });
      s += box(130, 330, 160, "当社倉庫", { rx: 35, fill: "#E2EFDA" });
      s += box(130, 420, 160, "A社・B社", { rx: 35, fill: "#E2EFDA" });
      s += K.arrow(296, 380, 380, 410, "#70AD47", 5) + K.arrow(296, 450, 380, 425, "#70AD47", 5);
      s += box(390, 380, 200, "共同配送センター", { rx: 35, fill: "#E2EFDA" }) + K.arrow(600, 415, 680, 380, "#70AD47", 5);
      s += box(690, 330, 170, "得意先", { rx: 35, fill: "#E2EFDA" });
      return { svg: K.svg(s), note: "現状は影付きの四角、変更後は角丸で配置も別。<b>どこが変わったのかを探す</b>必要があります。" };
    }
    s = t(56, 60, "変更点は、共同配送センターで3社の荷物をまとめること", { size: 28, weight: 700, fill: P.main });
    s += t(56, 140, "現状", { size: 22, weight: 700, fill: P.sub });
    s += box(150, 100, 190, "当社倉庫") + K.arrow(344, 135, 404, 135, P.muted, 4) + box(410, 100, 190, "自社トラック") + K.arrow(604, 135, 664, 135, P.muted, 4) + box(670, 100, 190, "得意先");
    s += l(56, 220, 904, 220, P.line, 2);
    s += t(56, 300, "変更後", { size: 22, weight: 700, fill: P.main });
    s += box(150, 250, 190, "当社倉庫") + K.arrow(344, 285, 404, 285, P.muted, 4);
    s += box(410, 250, 190, "共同配送センター", { fill: P.accent, bold: true, color: "#3B2A00" }) + K.arrow(604, 285, 664, 285, P.muted, 4) + box(670, 250, 190, "得意先");
    s += box(150, 350, 190, "A社・B社の倉庫", { fill: "#FBF1DA" }) + K.p("M340 385 L375 385 L375 300 L404 300", P.muted, 4);
    s += t(150, 470, "3社の荷物を1台に積み合わせ、積載率を62%→81%に", { size: 22, fill: P.accentText });
    return { svg: K.svg(s), note: "現状と変更後を<b>同じ形・同じ位置</b>で上下に並べ、変わった部分だけに色を付けました。" };
  });

  /* ===== 図解の型 ===== */
  (function () {
    var G = "#D5D9DE", M = P.main;
    var flow = "";
    [0, 1, 2, 3].forEach(function (i) {
      flow += r(60 + i * 225, 200, 170, 140, i === 3 ? P.light : G, { rx: 10 });
      if (i < 3) flow += K.arrow(236 + i * 225, 270, 279 + i * 225, 270, P.sub, 8);
    });
    K.still("pt-flow", K.svg(flow));
    var cmp = r(80, 80, 380, 380, G, { rx: 10 }) + r(500, 80, 380, 380, P.light, { rx: 10 });
    [0, 1, 2].forEach(function (i) { cmp += r(120, 150 + i * 100, 300, 40, "#FFFFFF", { rx: 6 }) + r(540, 150 + i * 100, 300, 40, "#FFFFFF", { rx: 6 }); });
    K.still("pt-compare", K.svg(cmp));
    var mtx = l(480, 60, 480, 480, P.sub, 6) + l(160, 270, 800, 270, P.sub, 6);
    mtx += r(510, 90, 270, 150, P.light, { rx: 10 }) + K.c(300, 380, 30, G) + K.c(620, 380, 30, G) + K.c(340, 160, 30, G) + K.c(640, 160, 34, M);
    K.still("pt-matrix", K.svg(mtx));
    var tree = r(60, 220, 200, 100, M, { rx: 10 });
    [0, 1, 2].forEach(function (i) {
      var y = 70 + i * 150;
      tree += K.p("M260 270 L330 270 L330 " + (y + 50) + " L400 " + (y + 50), P.sub, 6) + r(400, y, 200, 100, G, { rx: 10 });
      tree += K.p("M600 " + (y + 50) + " L660 " + (y + 50), P.sub, 6) + r(660, y + 15, 220, 70, "#EEF0F3", { rx: 10 });
    });
    K.still("pt-tree", K.svg(tree));
  })();

  /* ===== 表 ===== */
  (function () {
    var host = K.$("demo-table");
    if (!host) return;
    var inputSw = host.querySelector("input[name=input]");
    var rows = [["拠点A", 3, 12400, 37200], ["拠点B", 4, 9800, 39200], ["拠点C", 2, 15100, 30200], ["拠点E", 5, 7600, 38000]];
    var draw = K.demo("demo-table", function (mode) {
      var ok = mode === "after", s = "";
      s += t(56, 60, ok ? "9月の誤出荷コストは、拠点Bが月3.9万円で最も大きい" : "誤出荷コスト", { size: ok ? 28 : 30, weight: 700, fill: ok ? P.main : P.text });
      var cols = ok ? [56, 440, 680, 904] : [80, 320, 540, 760];
      var heads = ok ? ["拠点", "誤出荷（件）", "1件の対応費（円）", "誤出荷コスト（円）"] : ["拠点", "誤出荷", "対応費", "コスト"];
      var top = 100, rh = 64;
      if (!ok) {
        s += r(60, top, 840, rh, "#4472C4");
        for (var i = 0; i <= rows.length + 1; i++) s += l(60, top + i * rh, 900, top + i * rh, "#000000", 3);
        [60, 300, 520, 740, 900].forEach(function (x) { s += l(x, top, x, top + (rows.length + 1) * rh, "#000000", 3); });
      }
      heads.forEach(function (h, j) {
        s += t(cols[j], top + 42, h, { size: ok ? 20 : 24, weight: 700, fill: ok ? P.sub : "#FFFFFF", anchor: ok && j > 0 ? "end" : undefined });
      });
      if (ok) s += l(56, top + rh - 4, 904, top + rh - 4, P.sub, 2);
      rows.forEach(function (row, i) {
        var y = top + (i + 1) * rh + 42, hl = ok && i === 1;
        if (ok && inputSw.checked) {
          s += r(cols[1] - 120, y - 34, 126, 48, "#FFF7DB", { rx: 4 }) + r(cols[2] - 140, y - 34, 146, 48, "#FFF7DB", { rx: 4 });
        }
        row.forEach(function (v, j) {
          var str = j === 0 ? v : (ok ? v.toLocaleString("ja-JP") : String(v));
          s += t(cols[j], y, str, {
            size: 24, anchor: ok && j > 0 ? "end" : undefined,
            weight: hl && j === 3 ? 700 : 400,
            fill: hl && j === 3 ? P.accentText : P.text
          });
        });
        if (ok) s += l(56, y + 22, 904, y + 22, P.line, 1.5);
      });
      if (ok) {
        s += t(56, 490, "誤出荷コスト＝誤出荷件数×1件あたりの対応費　2026年9月", { size: 16, fill: P.muted });
        if (inputSw.checked) s += r(56, 504, 20, 20, "#FFF7DB", { stroke: "#E0C27A", sw: 1 }) + t(84, 520, "入力するセル（それ以外は計算式）", { size: 16, fill: P.sub });
      }
      return {
        svg: K.svg(s),
        note: ok
          ? "罫線は横線だけ、数字は右揃えで桁区切り、単位は見出しに。<b>線ではなく、そろった数字が表の形を作ります。</b>"
          : "太い格子の罫線、左揃えで桁区切りのない数字、単位のない見出し。<b>数字の大小がひと目では比べられません。</b>"
      };
    });
    inputSw.addEventListener("change", draw);
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var rows = [["東倉庫", "128000", "132000", "3.1%"], ["西倉庫", "120000", "195000", "62.5%"], ["北倉庫", "94000", "96000", "2.1%"]];
    var s = t(56, 60, "倉庫別出荷実績", { size: 30, weight: 700 });
    var cols = [80, 300, 520, 740], top = 110, rh = 70;
    s += r(60, top, 840, rh, "#C00000");
    for (var i = 0; i <= rows.length + 1; i++) s += l(60, top + i * rh, 900, top + i * rh, "#000000", 3);
    [60, 280, 500, 720, 900].forEach(function (x) { s += l(x, top, x, top + (rows.length + 1) * rh, "#000000", 3); });
    ["倉庫", "前年", "今年", "伸び"].forEach(function (h, j) { s += t(cols[j], top + 46, h, { size: 26, weight: 700, fill: "#FFFFFF" }); });
    rows.forEach(function (row, i) {
      row.forEach(function (v, j) { s += t(cols[j], top + (i + 1) * rh + 46, v, { size: 26 }); });
    });
    K.still("practice-before", K.svg(s));

    var a = t(56, 64, "西倉庫だけ、出荷量が前年の1.6倍に伸びた", { size: 30, weight: 700, fill: P.main });
    var c2 = [56, 520, 720, 904];
    ["倉庫", "前年（ケース）", "今年（ケース）", "前年比"].forEach(function (h, j) {
      a += t(c2[j], 150, h, { size: 20, weight: 700, fill: P.sub, anchor: j ? "end" : undefined });
    });
    a += l(56, 168, 904, 168, P.sub, 2);
    rows.forEach(function (row, i) {
      var y = 226 + i * 72, hl = i === 1;
      [row[0], Number(row[1]).toLocaleString("ja-JP"), Number(row[2]).toLocaleString("ja-JP"), "+" + row[3]].forEach(function (v, j) {
        a += t(c2[j], y, v, { size: 26, anchor: j ? "end" : undefined, weight: hl && j === 3 ? 700 : 400, fill: hl && j === 3 ? P.accentText : P.text });
      });
      a += l(56, y + 26, 904, y + 26, P.line, 1.5);
    });
    a += t(56, 490, "2026年9月実績　出典：出荷管理システム", { size: 18, fill: P.muted });
    K.still("practice-after", K.svg(a));
  })();
})();
