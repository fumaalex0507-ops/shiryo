(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* ===== 間違い探し ===== */
  (function () {
    var host = K.$("demo-spot");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    var showAll = host.querySelector(".show-all");
    var reset = host.querySelector(".reset-spot");
    var defects = [
      { id: "line", box: [40, 34, 560, 76], label: "タイトル下の飾りの線（意味のない装飾）" },
      { id: "overflow", box: [404, 168, 200, 52], label: "文字が枠からはみ出している" },
      { id: "overlap", box: [330, 248, 184, 60], label: "吹き出しが2つの枠に重なっている" },
      { id: "unit", box: [480, 224, 280, 60], label: "「1.2億」と「円」が改行で分かれている" },
      { id: "gap", box: [40, 318, 880, 118], label: "下の3つの箱の間隔がばらばら" }
    ];
    var found = {};

    function base() {
      var s = t(56, 76, "9月の配送コスト報告", { size: 32, weight: 700, fill: P.main });
      s += l(56, 96, 360, 96, P.accent, 5);
      s += r(56, 130, 380, 150, "#F4F5F7", { rx: 8 });
      s += t(80, 176, "主な要因", { size: 22, fill: P.sub });
      s += t(80, 222, "燃料費の上昇による配送コストの増加", { size: 26, weight: 700 });
      s += r(470, 130, 434, 150, P.light, { rx: 8 });
      s += t(494, 176, "前年からの増加額", { size: 22, fill: P.sub });
      s += t(494, 222, "年間 1.2億", { size: 44, weight: 700, fill: P.accentText });
      s += t(494, 272, "円", { size: 44, weight: 700, fill: P.accentText });
      s += r(340, 256, 160, 44, "#FFFFFF", { rx: 22, stroke: P.accent, sw: 3 }) + t(420, 286, "前年比+6%", { size: 20, weight: 700, anchor: "middle", fill: P.accentText });
      [[56, 260], [330, 260], [650, 254]].forEach(function (b, i) {
        s += r(b[0], 330, b[1], 96, "#F4F5F7", { rx: 8 });
        s += t(b[0] + 20, 372, ["燃料費 +12%", "人件費 +4%", "車両費 ±0%"][i], { size: 22, weight: 700 });
        s += t(b[0] + 20, 406, ["単価上昇が続く", "時給改定の影響", "更新は来年度"][i], { size: 18, fill: P.sub });
      });
      s += t(56, 490, "出典：配送費明細（2026年9月）", { size: 18, fill: P.muted });
      return s;
    }

    function draw() {
      var s = base(), n = 0, list = [];
      defects.forEach(function (d) {
        var b = d.box;
        if (found[d.id]) {
          n++;
          list.push(d.label);
          s += '<ellipse cx="' + (b[0] + b[2] / 2) + '" cy="' + (b[1] + b[3] / 2) + '" rx="' + (b[2] / 2 + 10) + '" ry="' + (b[3] / 2 + 10) +
            '" fill="none" stroke="#E53935" stroke-width="5"/>';
        }
      });
      defects.forEach(function (d) {
        var b = d.box;
        s += '<rect class="hit" data-id="' + d.id + '" x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" fill="transparent"/>';
      });
      slide.innerHTML = K.svg(s);
      note.innerHTML = '見つけた数：<span class="found-count">' + n + " / " + defects.length + "</span>" +
        (list.length ? "<br>" + list.map(function (x, i) { return (i + 1) + ". " + x; }).join("<br>") : "<br>気になるところをタップしてください。");
    }
    slide.addEventListener("click", function (e) {
      var hit = e.target.closest(".hit");
      if (!hit) return;
      found[hit.dataset.id] = true;
      draw();
    });
    showAll.type = reset.type = "button";
    showAll.addEventListener("click", function () { defects.forEach(function (d) { found[d.id] = true; }); draw(); });
    reset.addEventListener("click", function () { found = {}; draw(); });
    draw();
  })();

  /* ===== スライド間のずれ ===== */
  (function () {
    var host = K.$("demo-consistency");
    if (!host) return;
    var overlay = host.querySelector("input[name=overlay]");
    function slideA(c) {
      var s = t(56, 76, "燃料費が前年比18%上昇した", { size: 32, weight: 700, fill: c || P.main });
      s += r(56, 120, 520, 330, c ? "none" : "#F4F5F7", { rx: 8, stroke: c, sw: c ? 3 : undefined });
      s += t(620, 160, "要因", { size: 22, fill: c || P.sub });
      return s;
    }
    function slideB(ok, c) {
      var tx = ok ? 56 : 84, ty = ok ? 76 : 98, size = ok ? 32 : 28;
      var s = t(tx, ty, "人件費は時給改定で4%増えた", { size: size, weight: 700, fill: c || (ok ? P.main : "#1E5BB8") });
      s += r(ok ? 56 : 70, ok ? 120 : 140, ok ? 520 : 500, ok ? 330 : 320, c ? "none" : "#F4F5F7", { rx: 8, stroke: c, sw: c ? 3 : undefined });
      s += t(ok ? 620 : 600, ok ? 160 : 190, "要因", { size: 22, fill: c || P.sub });
      return s;
    }
    var draw = K.demo("demo-consistency", function (mode) {
      var ok = mode === "after", s = "";
      if (overlay.checked) {
        s += slideA("#2F78AD") + slideB(ok, "#E53935");
        s += t(56, 510, "青：5ページ目　赤：6ページ目", { size: 20, fill: P.sub });
        return {
          svg: K.svg(s),
          note: ok ? "重ねるとぴったり一致します。<b>ページをめくっても、何も動きません。</b>" : "重ねると、タイトルの位置・大きさ・色、本文の枠が<b>少しずつずれている</b>のが分かります。"
        };
      }
      s += r(20, 120, 440, 248, "#FFFFFF", { stroke: P.line, sw: 2 }) + r(500, 120, 440, 248, "#FFFFFF", { stroke: P.line, sw: 2 });
      s += '<g transform="translate(20 120) scale(0.4583)">' + slideA() + "</g>";
      s += '<g transform="translate(500 120) scale(0.4583)">' + slideB(ok) + "</g>";
      s += t(240, 400, "5ページ目", { size: 20, anchor: "middle", fill: P.sub }) + t(720, 400, "6ページ目", { size: 20, anchor: "middle", fill: P.sub });
      return {
        svg: K.svg(s),
        note: ok ? "2枚のタイトルと本文の位置がそろっています。" : "並べただけでは、ずれに気づきにくいかもしれません。<b>「重ねて比べる」をオンにしてみてください。</b>"
      };
    });
    overlay.addEventListener("change", draw);
  })();

  /* ===== AIが付けがちな装飾 ===== */
  K.demo("demo-deco", function (mode) {
    var ok = mode === "after", s = "";
    if (!ok) {
      s += r(0, 0, 18, 540, P.main);
      s += t(56, 76, "共同配送の3つの効果", { size: 32, weight: 700, fill: P.main });
      s += l(56, 96, 220, 96, P.accent, 6);
      [["コスト", "年1.0億円の削減"], ["環境", "CO2を年18%削減"], ["人手", "ドライバーを12名削減"]].forEach(function (it, i) {
        var x = 56 + i * 290;
        s += r(x, 150, 266, 220, "#F4F5F7", { rx: 10 }) + r(x, 150, 10, 220, P.accent);
        s += K.c(x + 52, 204, 26, P.main) + t(x + 52, 213, String(i + 1), { size: 24, weight: 700, anchor: "middle", fill: "#FFFFFF" });
        s += t(x + 96, 214, it[0], { size: 26, weight: 700 });
        s += t(x + 30, 290, it[1], { size: 22, fill: P.sub });
      });
      s += r(0, 500, 960, 40, P.main) + t(904, 527, "Confidential", { size: 18, anchor: "end", fill: "#FFFFFF" });
      return { svg: K.svg(s), note: "左端の帯、タイトル下の線、カード端の色、下の帯。<b>どれも意味を持たない装飾</b>で、AIが作った資料によく見られます。" };
    }
    s += t(56, 76, "共同配送で、コスト・環境・人手の3つに効果が出る", { size: 30, weight: 700, fill: P.main });
    [["コスト", "年1.0億円の削減"], ["環境", "CO2を年18%削減"], ["人手", "ドライバーを12名削減"]].forEach(function (it, i) {
      var x = 56 + i * 290;
      s += r(x, 150, 266, 220, i === 0 ? P.light : "#F4F5F7", { rx: 10 });
      s += t(x + 24, 202, it[0], { size: 24, fill: P.sub });
      s += t(x + 24, 268, it[1], { size: 26, weight: 700, fill: i === 0 ? P.main : P.text });
    });
    s += t(56, 500, "出典：3社の配送実績をもとに試算", { size: 18, fill: P.muted });
    return { svg: K.svg(s), note: "装飾を外し、その分タイトルを結論の文にしました。<b>目立たせたいものは、装飾ではなく内容と配置で目立たせます。</b>" };
  });

  /* ===== 練習課題 ===== */
  (function () {
    var s = r(0, 0, 14, 540, "#1E5BB8");
    s += t(480, 66, "倉庫別の作業生産性について", { size: 32, weight: 700, anchor: "middle", fill: "#1E5BB8" });
    s += l(330, 86, 630, 86, "#1E5BB8", 4);
    var vals = [["東倉庫", 142, "#4472C4"], ["西倉庫", 118, "#ED7D31"], ["北倉庫", 151, "#A5A5A5"]];
    vals.forEach(function (v, i) {
      var h = (v[1] - 100) * 4;
      s += r(110 + i * 150, 420 - h, 90, h, v[2]);
      s += t(155 + i * 150, 450, v[0], { size: 18, anchor: "middle" });
    });
    s += t(80, 140, "ケース/人時", { size: 16, fill: "#666666" });
    s += r(600, 150, 320, 230, "#FFFFFF", { stroke: "#333333", sw: 2 });
    s += K.lines(616, 196, ["西倉庫は他の2倉庫より", "生産性が約2割低く、改善が", "急務である。原因は通路の"], { size: 22, weight: 700 }, 40);
    s += t(616, 316, "狭さによる渋滞と考えられる。", { size: 22, weight: 700, fill: "#E53935" });
    s += t(616, 356, "→ レイアウト変更を提案！", { size: 22, weight: 700, fill: "#E53935" });
    K.still("practice-before", K.svg(s));

    var a = t(56, 76, "西倉庫の生産性は他の2倉庫より約2割低い", { size: 32, weight: 700, fill: P.main });
    a += t(56, 116, "倉庫別の作業生産性（ケース/人時、2026年9月）", { size: 20, fill: P.sub });
    vals.slice().sort(function (x, y) { return y[1] - x[1]; }).forEach(function (v, i) {
      var y = 150 + i * 90, w = v[1] * 2.6, hl = v[0] === "西倉庫";
      a += t(56, y + 38, v[0], { size: 24, weight: hl ? 700 : 400 });
      a += r(180, y + 10, w, 40, hl ? P.accent : P.gray, { rx: 3 });
      a += t(192 + w, y + 40, String(v[1]), { size: 24, weight: hl ? 700 : 400, fill: hl ? P.accentText : P.sub });
    });
    a += r(56, 430, 848, 76, P.light, { rx: 8 });
    a += t(80, 478, "原因は通路の狭さによる渋滞。レイアウト変更を提案する", { size: 24 });
    K.still("practice-after", K.svg(a));
  })();
})();
