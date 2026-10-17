(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* 視線の順番（番号）と経路を重ねる */
  function eyePath(points) {
    var s = "";
    for (var i = 0; i < points.length - 1; i++) {
      s += '<g class="eye-step" style="animation-delay:' + (i * 0.45 + 0.2) + 's">' +
        K.p("M" + points[i][0] + " " + points[i][1] + " L" + points[i + 1][0] + " " + points[i + 1][1], "#E53935", 4, "none") +
        "</g>";
    }
    points.forEach(function (p, i) {
      s += '<g class="eye-step" style="animation-delay:' + (i * 0.45) + 's">' + K.badge(p[0], p[1], i + 1, "#E53935") + "</g>";
    });
    return s;
  }

  function stockChart(x, y, w, h) {
    var vals = [91, 76, 82], names = ["拠点A", "拠点B", "拠点C"], s = "";
    vals.forEach(function (v, i) {
      var by = y + i * (h / 3), bw = v / 100 * (w - 160);
      s += t(x, by + 34, names[i], { size: 22, fill: P.sub });
      s += r(x + 100, by + 10, bw, 34, i === 1 ? P.accent : P.gray, { rx: 3 });
      s += t(x + 110 + bw, by + 36, v + "%", { size: 22, fill: i === 1 ? P.accentText : P.sub, weight: i === 1 ? 700 : 400 });
    });
    return s;
  }

  /* ===== 結論が右下に埋もれている ===== */
  (function () {
    var host = K.$("demo-buried");
    if (!host) return;
    var eye = host.querySelector("input[name=eye]");
    var draw = K.demo("demo-buried", function (mode) {
      var ok = mode === "after", s;
      if (!ok) {
        s = t(56, 76, "拠点別の保管効率", { size: 32, weight: 700 });
        s += stockChart(56, 130, 560, 300);
        s += K.lines(56, 470, ["保管効率＝使用中の棚の容積÷総容積", "2026年9月末時点"], { size: 18, fill: P.muted }, 28);
        s += r(640, 360, 280, 140, "#F1F3F5", { rx: 6 });
        s += K.lines(660, 404, ["結論：拠点Bの", "棚割りを見直し、", "80%台を目指す"], { size: 22 }, 34);
        if (eye.checked) s += eyePath([[28, 66], [150, 190], [150, 400], [28, 470], [780, 470]]);
      } else {
        s = t(56, 76, "拠点Bの棚割りを見直し、保管効率を80%台に上げる", { size: 32, weight: 700, fill: P.main });
        s += t(56, 116, "拠点別の保管効率（2026年9月末）", { size: 20, fill: P.sub });
        s += stockChart(56, 150, 560, 300);
        s += r(660, 150, 244, 300, P.light, { rx: 8 });
        s += K.lines(684, 200, ["拠点Bだけ", "70%台", "", "目標まで", "あと4ポイント"], { size: 24 }, 40);
        s += t(56, 500, "保管効率＝使用中の棚の容積÷総容積", { size: 18, fill: P.muted });
        if (eye.checked) s += eyePath([[28, 66], [150, 260], [880, 180], [28, 492]]);
      }
      return {
        svg: K.svg(s),
        note: ok
          ? "結論が最初に目に入る場所にあるので、<b>読み始めた時点で結論が伝わります。</b>"
          : "目は左上から読み始め、<b>結論は最後に</b>やっと目に入ります。途中で読むのをやめると、結論は伝わりません。"
      };
    });
    eye.addEventListener("change", draw);
  })();

  /* ===== Z型とF型 ===== */
  (function () {
    var host = K.$("demo-zf");
    if (!host) return;
    var eye = host.querySelector("input[name=eye]");
    var draw = K.demo("demo-zf", function (mode) {
      var s;
      if (mode === "z") {
        s = t(56, 86, "共同配送で、積載率を81%に", { size: 34, weight: 700, fill: P.main });
        s += t(904, 86, "−1.0億円", { size: 40, weight: 700, fill: P.accentText, anchor: "end" });
        s += r(56, 200, 400, 250, "#D5D9DE", { rx: 6 }) + t(256, 334, "配送ルートの図", { size: 24, anchor: "middle", fill: P.sub });
        s += r(520, 330, 384, 120, P.light, { rx: 8 }) + t(544, 380, "お願い", { size: 22, weight: 700, fill: P.main }) + t(544, 424, "4月からの試行を承認", { size: 24 });
        if (eye.checked) s += eyePath([[28, 72], [930, 120], [90, 230], [880, 420]]);
        return { svg: K.svg(s), note: "要素が少ないスライドでは、目は<b>Z字</b>を描いて動きます。左上と右下が、特に目に留まる場所です。" };
      }
      s = t(56, 76, "共同配送の進め方", { size: 32, weight: 700, fill: P.main });
      var rows = [["準備", "3社で荷受け時間と荷姿のルールを決める"], ["試行", "関東3拠点で6か月間、週3便から始める"], ["評価", "積載率とコスト、遅延件数を月次で確認する"], ["展開", "効果が確認できたら、関西エリアに広げる"]];
      rows.forEach(function (row, i) {
        var y = 160 + i * 90;
        s += t(56, y, row[0], { size: 26, weight: 700, fill: P.main });
        s += t(180, y, row[1], { size: 24 });
      });
      if (eye.checked) s += eyePath([[28, 66], [380, 66], [28, 150], [640, 150], [28, 240], [400, 240], [28, 330], [28, 420]]);
      return { svg: K.svg(s), note: "文字の多いスライドでは、目は<b>F字</b>に動きます。上の行はよく読まれ、下に行くほど行頭だけを拾い読みします。" };
    });
    eye.addEventListener("change", draw);
  })();

  /* ===== 比較の構図 ===== */
  K.demo("demo-compare", function (mode) {
    var ok = mode === "after";
    var s = t(56, 76, "共同配送の導入前後の比較", { size: 32, weight: 700, fill: ok ? P.main : P.text });
    if (!ok) {
      s += r(56, 120, 380, 360, "#F1F3F5", { rx: 8 });
      s += t(80, 170, "導入前", { size: 26, weight: 700 });
      s += K.lines(80, 230, ["便数：年9,800便", "コスト：12.4億円", "積載率は62%"], { size: 24 }, 50);
      s += r(480, 150, 424, 300, P.light, { rx: 30 });
      s += t(692, 210, "導入後", { size: 26, weight: 700, anchor: "middle" });
      s += t(692, 280, "積載率 81%", { size: 34, weight: 700, anchor: "middle", fill: P.main });
      s += t(692, 340, "11.4億円（コスト）", { size: 24, anchor: "middle" });
      s += t(692, 390, "便数は7,500便に", { size: 22, anchor: "middle" });
      return { svg: K.svg(s), note: "左右で、項目の順番・書き方・形がすべて違います。<b>何と何を比べればよいか</b>を探す必要があります。" };
    }
    [["導入前", ["62%", "9,800便", "12.4億円"], "#F1F3F5", P.sub], ["導入後", ["81%", "7,500便", "11.4億円"], P.light, P.accentText]].forEach(function (col, c) {
      var x = 300 + c * 310;
      s += r(x, 110, 290, 380, col[2], { rx: 8 });
      s += t(x + 145, 160, col[0], { size: 26, weight: 700, anchor: "middle", fill: c ? P.main : P.sub });
      col[1].forEach(function (v, i) {
        s += t(x + 145, 250 + i * 90, v, { size: 40, weight: 700, anchor: "middle", fill: col[3] });
      });
    });
    ["積載率", "年間便数", "配送コスト"].forEach(function (lab, i) {
      s += t(56, 238 + i * 90, lab, { size: 24, fill: P.sub });
    });
    return { svg: K.svg(s), note: "同じ項目を<b>同じ高さ・同じ書き方</b>で並べたので、目は横に動くだけで差が分かります。" };
  });

  /* ===== 置き場所の地図 ===== */
  (function () {
    var s = r(40, 30, 560, 110, P.light, { rx: 8 }) + t(64, 80, "1  結論（タイトル）", { size: 26, weight: 700, fill: P.main }) + t(64, 118, "最初に必ず目に入る", { size: 20, fill: P.sub });
    s += r(620, 30, 300, 110, "#F1F3F5", { rx: 8 }) + t(644, 80, "2  重要な数字", { size: 24, weight: 700 }) + t(644, 118, "Z型で2番目に見られる", { size: 18, fill: P.sub });
    s += r(40, 160, 880, 220, "#F1F3F5", { rx: 8 }) + t(64, 210, "3  根拠となる図・グラフ", { size: 24, weight: 700 }) + t(64, 248, "結論を確かめる材料。左から右へ読む順に置く", { size: 20, fill: P.sub });
    s += r(40, 400, 560, 110, "#F7F8F9", { rx: 8 }) + t(64, 450, "補足・注記・出典", { size: 22, fill: P.sub }) + t(64, 486, "興味がある人だけが読む", { size: 18, fill: P.muted });
    s += r(620, 400, 300, 110, "#FBF1DA", { rx: 8 }) + t(644, 450, "4  次の行動", { size: 24, weight: 700, fill: P.accentText }) + t(644, 486, "視線の終点に置く", { size: 18, fill: P.sub });
    K.still("place-map", K.svg(s));
  })();

  /* ===== ぼかして確かめる ===== */
  (function () {
    var host = K.$("demo-blur");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var mode = "before";
    function svgFor() {
      var s;
      if (mode === "before") {
        s = t(56, 76, "拠点別の保管効率", { size: 32, weight: 700 });
        s += stockChart(56, 130, 560, 300);
        s += r(640, 360, 280, 140, "#F1F3F5", { rx: 6 });
        s += K.lines(660, 404, ["結論：拠点Bの", "棚割りを見直し、", "80%台を目指す"], { size: 22 }, 34);
        return s;
      }
      s = t(56, 76, "拠点Bの棚割りを見直し、保管効率を80%台に上げる", { size: 32, weight: 700, fill: P.main });
      s += stockChart(56, 150, 560, 300);
      s += r(660, 150, 244, 300, P.light, { rx: 8 });
      s += K.lines(684, 200, ["拠点Bだけ", "70%台"], { size: 24 }, 40);
      return s;
    }
    function draw() {
      slide.innerHTML = K.svg(svgFor());
      slide.style.setProperty("--blur", range.value + "px");
      out.textContent = range.value === "0" ? "なし" : range.value + "px";
    }
    range.addEventListener("input", draw);
    Shiryo.bindSeg(host.querySelector(".seg"), function (v) { mode = v; draw(); });
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(56, 70, "2つの物流倉庫の比較", { size: 32, weight: 700 });
    s += r(56, 110, 400, 380, "#F1F3F5", { rx: 8 });
    s += t(80, 160, "現在の倉庫", { size: 24, weight: 700 });
    s += K.lines(80, 220, ["家賃：月850万円", "主要顧客まで平均42km", "延床面積：9,000㎡"], { size: 22 }, 48);
    s += r(500, 110, 404, 380, "#F1F3F5", { rx: 8 });
    s += t(524, 160, "移転候補の倉庫", { size: 24, weight: 700 });
    s += K.lines(524, 220, ["面積は12,000㎡と広い", "賃料は月720万円", "顧客までの距離は58km"], { size: 22 }, 48);
    s += t(524, 440, "→移転を推奨", { size: 20, fill: P.sub });
    K.still("practice-before", K.svg(s));

    var a = t(56, 70, "移転すれば賃料が月130万円下がり、面積は3割広がる", { size: 30, weight: 700, fill: P.main });
    var rows = [["月額賃料", "850万円", "720万円"], ["延床面積", "9,000㎡", "12,000㎡"], ["顧客までの平均距離", "42km", "58km"]];
    a += t(560, 140, "現在", { size: 22, fill: P.sub, anchor: "end" }) + t(860, 140, "移転候補", { size: 22, fill: P.main, anchor: "end", weight: 700 });
    rows.forEach(function (row, i) {
      var y = 220 + i * 80, worse = i === 2;
      a += t(56, y, row[0], { size: 24 });
      a += t(560, y, row[1], { size: 30, anchor: "end", fill: P.sub });
      a += t(860, y, row[2], { size: 30, anchor: "end", weight: 700, fill: worse ? P.text : P.accentText });
      a += l(56, y + 26, 904, y + 26, P.line, 2);
    });
    a += t(56, 488, "距離は16km延びるため、配送費の増加分を次のページで試算", { size: 22, fill: P.sub });
    K.still("practice-after", K.svg(a));
  })();
})();
