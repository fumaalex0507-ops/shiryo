(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* 月別の誤出荷件数（7月にハンディ検品を導入） */
  function errorChart(x0, y0, w, h, highlight) {
    var months = ["4月", "5月", "6月", "7月", "8月", "9月"];
    var vals = [52, 48, 55, 31, 29, 27];
    var s = "", bw = w / months.length * 0.6, step = w / months.length;
    vals.forEach(function (v, i) {
      var bh = v / 60 * h, x = x0 + i * step + (step - bw) / 2;
      var col = highlight ? (i >= 3 ? P.accent : P.gray) : P.main;
      s += r(x, y0 + h - bh, bw, bh, col, { rx: 3 });
      s += t(x + bw / 2, y0 + h - bh - 10, String(v), { size: 22, anchor: "middle", fill: highlight && i >= 3 ? P.accentText : P.sub, weight: highlight && i >= 3 ? 700 : 400 });
      s += t(x + bw / 2, y0 + h + 32, months[i], { size: 20, anchor: "middle", fill: P.sub });
    });
    s += l(x0, y0 + h, x0 + w, y0 + h, P.line, 2);
    return s;
  }

  /* ===== 見出し型とメッセージ型 ===== */
  K.demo("demo-topic", function (mode) {
    var s;
    if (mode === "before") {
      s = t(56, 76, "誤出荷の状況について", { size: 34, weight: 700 });
      s += t(56, 116, "月別の誤出荷件数（単位：件）", { size: 20, fill: P.sub });
      s += errorChart(80, 150, 800, 280, false);
      return { svg: K.svg(s), note: "タイトルは<b>テーマ名</b>だけ。何を読み取ればよいかは、グラフを見て自分で考えるしかありません。" };
    }
    s = t(56, 76, "ハンディ検品の導入後、誤出荷が月平均で約4割減った", { size: 32, weight: 700, fill: P.main });
    s += t(56, 116, "月別の誤出荷件数（単位：件）　7月にハンディ検品を導入", { size: 20, fill: P.sub });
    s += errorChart(80, 150, 800, 280, true);
    return { svg: K.svg(s), note: "タイトルが<b>結論</b>になっています。読み手はタイトルを読んでから、グラフで確かめるだけで済みます。" };
  });

  /* ===== 論点が3つ ===== */
  K.demo("demo-multi", function (mode) {
    var s;
    if (mode === "before") {
      s = t(56, 70, "9月の物流実績", { size: 32, weight: 700 });
      var blocks = [
        ["コスト", ["配送費は前年比+6%", "燃料費の上昇が主因", "共同配送で対策予定"]],
        ["品質", ["誤出荷は27件で減少", "ハンディ検品が効果", "破損は横ばい"]],
        ["人手", ["残業は月平均22時間", "午後に作業が集中", "シフト見直しを検討"]]
      ];
      blocks.forEach(function (b, i) {
        var x = 56 + i * 290;
        s += r(x, 110, 270, 380, "#F4F5F7", { rx: 8 });
        s += t(x + 20, 156, b[0], { size: 26, weight: 700 });
        s += K.lines(x + 20, 210, b[1], { size: 22 }, 54);
      });
      return { svg: K.svg(s), note: "コスト・品質・人手の3つの話が1枚に入っています。<b>結局どれが言いたいのか</b>が分かりません。" };
    }
    var titles = [
      ["燃料費の上昇で、配送費が", "前年比6%増えた"],
      ["ハンディ検品の効果で、", "誤出荷は27件まで減った"],
      ["午後の作業集中で、", "残業が月22時間に増えた"]
    ];
    s = "";
    titles.forEach(function (tt, i) {
      var x = 30 + i * 306;
      s += r(x, 110, 290, 164, "#FFFFFF", { stroke: P.line, sw: 2, rx: 6 });
      s += K.lines(x + 16, 150, tt, { size: 19, weight: 700, fill: P.main }, 30);
      s += r(x + 16, 200, 258, 56, "#F1F3F5", { rx: 4 });
      s += t(x + 145, 300, "スライド" + (i + 1), { size: 20, anchor: "middle", fill: P.sub });
    });
    s += t(56, 400, "1枚に1つの論点。タイトルを読むだけで、", { size: 28 });
    s += t(56, 446, "3つの結論がそれぞれ伝わる。", { size: 28 });
    return { svg: K.svg(s), note: "論点ごとにスライドを分け、<b>それぞれのタイトルに結論</b>を書きました。" };
  });

  /* ===== メッセージラインを組み立てる ===== */
  (function () {
    var host = K.$("demo-builder");
    if (!host) return;
    var f = {};
    host.querySelectorAll("input").forEach(function (i) { f[i.name] = i; });
    var out = host.querySelector(".result-line");
    var verdict = host.querySelector(".builder-note");
    function draw() {
      var why = f.why.value.trim(), subj = f.subj.value.trim(), num = f.num.value.trim(), change = f.change.value.trim();
      var line = (why ? why + "により、" : "") + (subj || "〇〇") + "が" + (num ? num : "") + (change || "△△した");
      out.textContent = line;
      var len = line.length;
      var msg = [];
      if (!num) msg.push("数字が入ると、変化の大きさが伝わります");
      if (!why) msg.push("理由や打ち手があると、次の行動につながります");
      if (len > 35) msg.push("35字を超えています。言葉を削れないか見直しましょう");
      verdict.textContent = msg.length ? msg.join("。") + "。" : "結論・数字・理由がそろったメッセージラインです（" + len + "字）。";
    }
    Object.keys(f).forEach(function (k) { f[k].addEventListener("input", draw); });
    draw();
  })();

  /* ===== 結論が先か、後か ===== */
  K.demo("demo-pyramid", function (mode) {
    var order = mode === "last"
      ? [["背景", P.gray], ["データ1", P.gray], ["データ2", P.gray], ["データ3", P.gray], ["結論", P.main]]
      : [["結論", P.main], ["根拠1", P.light], ["根拠2", P.light], ["根拠3", P.light], ["お願い", P.accent]];
    var s = t(56, 70, mode === "last" ? "結論が最後にくる構成" : "結論が先にくる構成", { size: 30, weight: 700 });
    order.forEach(function (o, i) {
      var x = 40 + i * 180;
      s += r(x, 120, 160, 100, o[1], { rx: 8 });
      s += t(x + 80, 180, o[0], { size: 26, weight: 700, anchor: "middle", fill: o[1] === P.main ? "#FFFFFF" : P.text });
      if (i < order.length - 1) s += t(x + 170, 180, "›", { size: 30, anchor: "middle", fill: P.muted });
    });
    if (mode === "last") {
      s += K.lines(56, 300, [
        "読み手は、何の話か分からないまま",
        "データを読み続けることになる。",
        "途中で時間切れになると、結論が伝わらない。"
      ], { size: 28 }, 52);
    } else {
      s += K.lines(56, 300, [
        "最初に結論を知っているので、",
        "以降のデータを「結論の根拠」として読める。",
        "途中で時間切れになっても、結論は伝わっている。"
      ], { size: 28 }, 52);
    }
    return { svg: K.svg(s) };
  });

  /* ===== サマリースライドの例 ===== */
  (function () {
    var s = t(56, 70, "共同配送の試行を4月から始めたい", { size: 32, weight: 700, fill: P.main });
    s += t(56, 110, "サマリー", { size: 20, fill: P.sub });
    var rows = [
      ["現状", "配送コストが3年で15%増加。積載率は62%にとどまる"],
      ["打ち手", "関東3拠点で、2社と共同配送を行う"],
      ["効果", "積載率81%、配送コストは年間1.0億円の削減見込み"],
      ["お願い", "2027年4月からの6か月の試行を承認いただきたい"]
    ];
    rows.forEach(function (row, i) {
      var y = 180 + i * 80;
      s += t(56, y, row[0], { size: 24, weight: 700, fill: i === 3 ? P.accentText : P.main });
      s += t(200, y, row[1], { size: 26 });
      if (i < rows.length - 1) s += l(56, y + 32, 904, y + 32, P.line, 2);
    });
    K.still("summary-slide", K.svg(s));
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(56, 70, "9月の倉庫別出荷実績", { size: 32, weight: 700 });
    s += t(56, 110, "倉庫別の出荷量（単位：千ケース）", { size: 20, fill: P.sub });
    var d = [["東倉庫", 132, 128], ["西倉庫", 195, 120], ["北倉庫", 96, 94]];
    d.forEach(function (row, i) {
      var y = 180 + i * 110;
      s += t(56, y + 30, row[0], { size: 24 });
      s += r(200, y, row[2] * 3, 26, "#C7CCD3") + r(200, y + 30, row[1] * 3, 26, P.main);
      s += t(210 + row[2] * 3, y + 22, "前年 " + row[2], { size: 18, fill: P.sub });
      s += t(210 + row[1] * 3, y + 52, "今年 " + row[1], { size: 18, fill: P.text });
    });
    K.still("practice-before", K.svg(s));

    var a = t(56, 70, "新規取引先の開始で、西倉庫の出荷量が前年の1.6倍に", { size: 30, weight: 700, fill: P.main });
    a += t(56, 110, "倉庫別の出荷量（9月、単位：千ケース）", { size: 20, fill: P.sub });
    d.forEach(function (row, i) {
      var y = 180 + i * 110, hl = i === 1;
      a += t(56, y + 30, row[0], { size: 24, weight: hl ? 700 : 400 });
      a += r(200, y, row[2] * 3, 26, "#E3E6EA") + r(200, y + 30, row[1] * 3, 26, hl ? P.accent : P.gray);
      a += t(210 + row[2] * 3, y + 22, "前年 " + row[2], { size: 18, fill: P.muted });
      a += t(210 + row[1] * 3, y + 52, "今年 " + row[1], { size: 18, fill: hl ? P.accentText : P.sub, weight: hl ? 700 : 400 });
    });
    K.still("practice-after", K.svg(a));
  })();
})();
