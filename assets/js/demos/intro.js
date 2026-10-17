(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* 同じ内容の「よくある版」と「整えた版」 */
  function beforeSlide() {
    var s = r(0, 0, 960, 540, "#FFFFFF");
    s += t(480, 70, "物流コストについて", { size: 40, weight: 700, fill: "#1E5BB8", anchor: "middle" });
    s += r(36, 104, 520, 400, "none", { stroke: "#333333", sw: 3 });
    s += K.lines(296, 150, [
      "現在の配送コストは年間12.4億円であり、",
      "燃料費や人件費の上昇により増加傾向。",
      "そこで3社による共同配送を検討した結果、",
      "積載率が62%から81%に向上する見込みで、",
      "年間で約1.0億円（約8%）の削減が可能。",
      "ただし拠点の調整や運用ルールの整備が",
      "必要であり、関係部署との協議を進める。"
    ], { size: 22, anchor: "middle", fill: "#333333" }, 44);
    s += t(296, 478, "※コストは2025年度実績ベース", { size: 18, anchor: "middle", fill: "#E53935" });
    var vals = [12.4, 11.4], cols = ["#E53935", "#43A047"];
    vals.forEach(function (v, i) {
      var x = 620 + i * 130, h = v * 22;
      s += r(x, 470 - h, 80, h, cols[i]) + t(x + 40, 470 - h - 12, v + "億", { size: 22, anchor: "middle", fill: cols[i], weight: 700 });
    });
    s += l(590, 470, 920, 470, "#333333", 2);
    s += r(600, 120, 300, 70, "#FFF59D") + t(750, 166, "大幅削減！！", { size: 30, weight: 700, fill: "#E53935", anchor: "middle" });
    s += t(660, 500, "現行", { size: 20, anchor: "middle" }) + t(790, 500, "導入後", { size: 20, anchor: "middle" });
    return s;
  }

  function afterSlide() {
    var s = t(56, 84, "共同配送の導入で、配送コストを年間8%削減できる", { size: 34, weight: 700, fill: P.main });
    s += t(56, 196, "年間の削減見込み", { size: 24, fill: P.sub });
    s += t(56, 284, "−1.0億円", { size: 78, weight: 700, fill: P.accentText });
    s += K.lines(56, 352, ["3社の共同配送で積載率が", "62%から81%に上がるため"], { size: 26, fill: P.text }, 42);
    s += t(56, 488, "出典：配送実績（2025年度）をもとに試算", { size: 18, fill: P.muted });
    var base = 440;
    [["現行", 12.4, P.gray], ["導入後", 11.4, P.accent]].forEach(function (d, i) {
      var x = 560 + i * 170, h = d[1] * 20;
      s += r(x, base - h, 110, h, d[2], { rx: 3 }) +
        t(x + 55, base - h - 16, d[1] + "億円", { size: 26, anchor: "middle", weight: i ? 700 : 400, fill: i ? P.accentText : P.sub }) +
        t(x + 55, base + 36, d[0], { size: 22, anchor: "middle", fill: P.sub });
    });
    s += l(530, base, 880, base, P.line, 2);
    return s;
  }

  /* 3秒テスト付きの見本 */
  (function () {
    var host = K.$("demo-same");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var mask = host.querySelector(".mask");
    var btn = host.querySelector(".flash");
    var note = host.querySelector(".demo-note");
    var mode = "before";
    var timer = null;

    function draw() {
      var svgWrap = slide.querySelector(".svg-wrap");
      svgWrap.innerHTML = K.svg(mode === "before" ? beforeSlide() : afterSlide());
    }
    function hide(msg) {
      mask.hidden = false;
      mask.textContent = msg;
    }
    btn.type = "button";
    btn.addEventListener("click", function () {
      clearTimeout(timer);
      mask.hidden = true;
      btn.disabled = true;
      timer = setTimeout(function () {
        hide("このスライドの結論を、ひとことで言えますか？");
        btn.disabled = false;
        btn.textContent = "もう一度3秒見る";
        note.innerHTML = mode === "before"
          ? "結論が言えなかった場合は、上の切替で「整えた版」に替えて、もう一度3秒見てみてください。"
          : "同じ内容でも、今度は「配送コストを8%削減できる」と答えられたのではないでしょうか。";
      }, 3000);
    });
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) {
      mode = v;
      clearTimeout(timer);
      draw();
      hide("ボタンを押すと、スライドが3秒だけ表示されます");
      btn.disabled = false;
      btn.textContent = "3秒だけ見る";
      note.innerHTML = "ボタンを押して3秒だけスライドを見たら、結論を思い出してみてください。";
    });
  })();

  /* 読み手の頭の使い方 */
  K.demo("demo-load", function (mode) {
    var parts = mode === "before"
      ? [["どこを見るか探す", 36, P.gray], ["色や記号の意味を照らし合わせる", 28, "#D5D9DE"], ["内容を理解する", 36, P.main]]
      : [["探す", 8, P.gray], ["照合", 7, "#D5D9DE"], ["内容を理解する", 85, P.main]];
    var s = t(56, 80, "読み手の頭の容量を、何に使っているか", { size: 32, weight: 700 });
    var x = 56, w = 848;
    parts.forEach(function (p) {
      var pw = w * p[1] / 100;
      s += r(x, 150, pw - 4, 120, p[2], { rx: 6 });
      s += t(x + 16, 222, p[1] + "%", { size: 30, weight: 700, fill: p[2] === P.main ? "#FFFFFF" : P.text });
      x += pw;
    });
    var y = 330;
    parts.forEach(function (p, i) {
      s += r(56, y + i * 54 - 22, 26, 26, p[2], { rx: 4 }) + t(96, y + i * 54, p[0], { size: 26, fill: P.text });
    });
    return {
      svg: K.svg(s),
      note: mode === "before"
        ? "整っていない資料では、<b>内容を理解する前の作業</b>に頭の容量が取られます（割合はイメージです）。"
        : "見た目が整うと、同じ容量のほとんどを<b>内容の理解</b>に使えます。"
    };
  });

  /* 練習課題 */
  (function () {
    var s = r(0, 0, 960, 540, "#FFFFFF");
    s += t(480, 64, "倉庫作業の現状について", { size: 36, weight: 700, anchor: "middle", fill: "#1E5BB8" });
    s += K.lines(480, 140, [
      "入荷から出荷までのリードタイムは平均2.4日で、",
      "目標の2.0日を上回っている。主な原因は",
      "ピッキング作業の待ち時間であり、特に午後の",
      "時間帯に集中していることが分かった。",
      "シフトの見直しにより0.3日の短縮が見込める。"
    ], { size: 26, anchor: "middle", fill: "#333333" }, 50);
    s += r(250, 410, 460, 70, "#FFEBEE", { stroke: "#E53935", sw: 3 });
    s += t(480, 456, "早急な対応が必要！", { size: 30, weight: 700, fill: "#E53935", anchor: "middle", deco: "underline" });
    K.still("practice-before", K.svg(s));

    var a = t(56, 84, "シフト見直しで、リードタイムを目標の2.0日に近づける", { size: 32, weight: 700, fill: P.main });
    a += t(56, 190, "入荷から出荷までの平均リードタイム", { size: 24, fill: P.sub });
    [["現状", "2.4日", P.gray, P.sub], ["見直し後", "2.1日", P.accent, P.accentText], ["目標", "2.0日", "none", P.sub]].forEach(function (d, i) {
      var x = 56 + i * 290;
      a += r(x, 220, 260, 150, d[2] === "none" ? "#FFFFFF" : (i === 1 ? "#FBF1DA" : "#F1F3F5"), { rx: 10, stroke: d[2] === "none" ? P.line : undefined, sw: 2, dash: d[2] === "none" ? "8 6" : undefined });
      a += t(x + 24, 262, d[0], { size: 24, fill: P.sub }) + t(x + 24, 340, d[1], { size: 56, weight: 700, fill: d[3] });
    });
    a += K.lines(56, 432, ["待ち時間が午後のピッキングに集中しているため、", "午後の人員を厚くするシフトに変更する"], { size: 26 }, 42);
    K.still("practice-after", K.svg(a));
  })();
})();
