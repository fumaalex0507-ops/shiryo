(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;
  var RED = "#E53935";

  /* ===== 全部強調 ===== */
  K.demo("demo-allbold", function (mode) {
    var ok = mode === "after", s;
    var lines = [
      ["誤出荷は月27件で、", "前年より44%減った", "。"],
      ["主な効果は、ハンディ検品による", "品番の読み違い", "の防止。"],
      ["一方、", "数量違い", "は減っておらず、対策が必要。"],
      ["10月から", "二重検品", "を拠点Cで試行する。"]
    ];
    s = t(56, 76, "9月の品質報告", { size: 32, weight: 700, fill: ok ? P.main : RED, deco: ok ? undefined : "underline" });
    lines.forEach(function (ln, i) {
      var y = 170 + i * 84;
      if (!ok) {
        s += '<text x="56" y="' + y + '" font-size="28" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-weight="700" fill="#333333">' +
          ln[0] + '<tspan fill="' + RED + '" text-decoration="underline">' + ln[1] + "</tspan>" + ln[2] + "</text>";
      } else {
        var hl = i === 0;
        s += '<text x="56" y="' + y + '" font-size="28" font-family="Hiragino Sans, Yu Gothic, sans-serif" fill="' + (hl ? P.text : P.sub) + '">' +
          ln[0] + (hl ? '<tspan fill="' + P.accentText + '" font-weight="700">' + ln[1] + "</tspan>" : ln[1]) + ln[2] + "</text>";
      }
    });
    return {
      svg: K.svg(s),
      note: ok
        ? "強調は「44%減った」の1か所だけ。他の行は少し色を落としたので、<b>強調がいっそう引き立ちます。</b>"
        : "全部が太字で、各行に赤字と下線があります。<b>強調が4か所あると、どれも強調に見えません。</b>"
    };
  });

  /* ===== 強調の重ねがけ ===== */
  K.demo("demo-mixed", function (mode) {
    var ok = mode === "after", s;
    s = t(56, 76, "共同配送の効果", { size: 32, weight: 700, fill: ok ? P.main : P.text });
    if (!ok) {
      s += r(56, 140, 560, 110, "#FFF59D", { stroke: RED, sw: 4 });
      s += t(80, 214, "コスト▲1.0億円！！", { size: 48, weight: 700, fill: RED, italic: true, deco: "underline" });
      s += t(640, 210, "★重要★", { size: 32, weight: 700, fill: "#1E5BB8" });
      s += K.lines(56, 330, ["積載率が62%から81%に上がる", "年間便数は約2,300便減る"], { size: 28, weight: 700, fill: "#1E5BB8" }, 56);
      return { svg: K.svg(s), note: "黄色の背景・赤い枠・赤字・斜体・下線・記号を重ねています。<b>強調の手段を増やすほど、ごちゃごちゃして読みにくくなります。</b>" };
    }
    s += t(56, 170, "配送コストの年間削減見込み", { size: 24, fill: P.sub });
    s += t(56, 264, "−1.0億円", { size: 88, weight: 700, fill: P.accentText });
    s += K.lines(56, 360, ["積載率が62%から81%に上がる", "年間便数は約2,300便減る"], { size: 28 }, 56);
    return { svg: K.svg(s), note: "強調は<b>色と大きさの2つだけ</b>。それでも、記号や枠を重ねた版よりはっきり目立ちます。" };
  });

  /* ===== 3段階の階層 ===== */
  (function () {
    var host = K.$("demo-levels");
    if (!host) return;
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    function draw() {
      var n = Number(range.value), s;
      var big = n >= 2 ? { size: 34, weight: 700, fill: P.main } : { size: 24 };
      var mid = n >= 3 ? { size: 26, weight: 700 } : (n >= 2 ? { size: 24 } : { size: 24 });
      var small = n >= 3 ? { size: 18, fill: P.muted } : { size: 24 };
      var num = n >= 3 ? { size: 64, weight: 700, fill: P.accentText } : (n >= 2 ? { size: 34, weight: 700, fill: P.main } : { size: 24 });
      s = t(56, 76, "午後の人員を2名増やし、出荷遅れを半分にする", big);
      s += t(56, n >= 3 ? 170 : 150, "出荷遅れの件数（月平均）", mid);
      s += t(56, n >= 3 ? 250 : 200, "42件 → 21件", num);
      s += t(56, n >= 3 ? 330 : 260, "遅れの原因の7割が、午後のピッキング待ち", mid);
      s += K.lines(56, n >= 3 ? 400 : 310, ["人件費は月60万円増えるが、遅延による再配達費が", "月80万円減るため、差し引きでプラスになる"], n >= 3 ? { size: 22 } : { size: 24 }, n >= 3 ? 36 : 50);
      s += t(56, 510, "出典：出荷管理システム（2026年4〜9月）", small);
      slide.innerHTML = K.svg(s);
      out.textContent = n + " 段階";
      note.innerHTML = [
        "すべて同じ大きさ。<b>どこから読めばよいか、手がかりがありません。</b>",
        "タイトルと数字だけ大きくしました。少し読みやすくなりましたが、本文と出典の差がありません。",
        "大（結論と数字）・中（見出し）・小（補足と出典）の3段階。<b>読む順番と重要度が、見た目から分かります。</b>"
      ][n - 1];
    }
    range.addEventListener("input", draw);
    draw();
  })();

  /* ===== 大きな数字 ===== */
  K.demo("demo-bignum", function (mode) {
    var ok = mode === "after", s;
    s = t(56, 76, "9月の物流KPI", { size: 32, weight: 700, fill: ok ? P.main : P.text });
    if (!ok) {
      s += K.lines(56, 160, [
        "・定時配送率は96.4%で、目標の95%を上回った",
        "・誤出荷件数は27件で、前年同月から21件減った",
        "・積載率は68%で、前月から3ポイント上がった"
      ], { size: 26 }, 70);
      return { svg: K.svg(s), note: "大事な数字が文章の中に埋もれています。<b>数字を探すには、文章を読むしかありません。</b>" };
    }
    [["定時配送率", "96.4", "%", "目標95%を上回る"], ["誤出荷件数", "27", "件", "前年同月から21件減"], ["積載率", "68", "%", "前月から3ポイント上昇"]].forEach(function (k, i) {
      var x = 56 + i * 290;
      s += r(x, 130, 266, 300, i === 1 ? "#FBF1DA" : "#F4F5F7", { rx: 10 });
      s += t(x + 22, 180, k[0], { size: 22, fill: P.sub });
      s += '<text x="' + (x + 22) + '" y="290" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-size="72" font-weight="700" fill="' + (i === 1 ? P.accentText : P.main) + '">' + k[1] +
        '<tspan font-size="30" font-weight="400" dx="6">' + k[2] + "</tspan></text>";
      s += t(x + 22, 350, k[3], { size: 20, fill: P.sub });
    });
    return { svg: K.svg(s), note: "数字を大きく、説明を小さく。<b>数字が先に目に入り、説明は確かめたいときだけ読めます。</b>" };
  });

  /* ===== 強調の手段 ===== */
  K.demo("demo-priority", function (mode) {
    var s = t(56, 70, "強調の手段：" + { color: "色", size: "大きさ", bold: "太字", box: "囲み" }[mode], { size: 26, fill: P.sub });
    var before = "原因の7割は、", key = "午後のピッキング待ち", after = "にある。";
    var keyAttr = {
      color: 'fill="' + P.accentText + '"',
      size: 'font-size="40"',
      bold: 'font-weight="700"',
      box: ""
    }[mode];
    if (mode === "box") s += r(258, 168, 360, 56, "none", { stroke: P.text, sw: 2.5, rx: 4 });
    s += '<text x="56" y="210" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-size="30" fill="' + P.text + '">' + before +
      "<tspan " + keyAttr + ">" + key + "</tspan>" + after + "</text>";
    s += K.lines(56, 310, ["待ち時間は1件あたり平均4分で、", "15時〜17時に集中している。"], { size: 26, fill: P.sub }, 46);
    var notes = {
      color: "<b>色</b>：周りの文章の流れを崩さずに、一番はっきり目立ちます。最初に選ぶ手段です。",
      size: "<b>大きさ</b>：強く目立ちますが、行の高さが乱れます。見出しや数字など、独立した要素に向いています。",
      bold: "<b>太字</b>：控えめな強調です。日本語では細かい文字が潰れやすく、多用すると全体が重くなります。",
      box: "<b>囲み</b>：線が文字の周りに増えるため、ごちゃごちゃしやすい手段です。最後の手段にとっておきます。"
    };
    return { svg: K.svg(s), note: notes[mode] };
  });

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(56, 70, "【重要】倉庫Bの作業時間について", { size: 32, weight: 700, fill: RED });
    s += '<text x="56" y="160" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-size="26" font-weight="700" fill="#333333">棚割りの見直しで、<tspan fill="#1E5BB8" text-decoration="underline">1日あたりの歩行距離</tspan>が</text>';
    s += t(56, 210, "18%短くなった！", { size: 26, weight: 700, fill: RED });
    s += '<text x="56" y="290" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-size="26" font-weight="700" fill="#333333">作業時間は<tspan fill="' + RED + '">1日40分</tspan>減り、<tspan text-decoration="underline">月の残業</tspan>は</text>';
    s += t(56, 340, "約13時間の削減になる見込み。", { size: 26, weight: 700, fill: "#1E5BB8" });
    s += r(56, 390, 560, 80, "#FFF59D", { stroke: RED, sw: 3 });
    s += t(76, 442, "★他拠点への展開を検討すべき★", { size: 26, weight: 700, fill: RED });
    K.still("practice-before", K.svg(s));

    var a = t(56, 76, "棚割りの見直しで、倉庫Bの作業時間が1日40分減った", { size: 30, weight: 700, fill: P.main });
    [["歩行距離", "−18", "%"], ["作業時間", "−40", "分/日"], ["残業時間", "−13", "時間/月"]].forEach(function (k, i) {
      var x = 56 + i * 290, hl = i === 1;
      a += r(x, 120, 266, 200, hl ? "#FBF1DA" : "#F4F5F7", { rx: 10 });
      a += t(x + 22, 166, k[0], { size: 22, fill: P.sub });
      a += '<text x="' + (x + 22) + '" y="264" font-family="Hiragino Sans, Yu Gothic, sans-serif" font-size="64" font-weight="700" fill="' + (hl ? P.accentText : P.main) + '">' + k[1] +
        '<tspan font-size="26" font-weight="400" dx="6">' + k[2] + "</tspan></text>";
    });
    a += t(56, 390, "次の一手", { size: 22, fill: P.sub });
    a += t(56, 436, "同じ見直しを、来期に拠点A・Cへ広げたい", { size: 28, weight: 700 });
    a += t(56, 500, "残業時間は見込み（9月の実績をもとに試算）", { size: 18, fill: P.muted });
    K.still("practice-after", K.svg(a));
  })();
})();
