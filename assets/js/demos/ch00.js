(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  /* ===== 目的と読み手 ===== */
  K.demo("demo-purpose", function (mode) {
    var s;
    if (mode === "before") {
      s = t(56, 70, "共同配送の検討について", { size: 32, weight: 700 });
      s += K.lines(56, 130, [
        "・検討の経緯：2024年から燃料費が上昇し、配送コストが増加",
        "・参加企業：A社、B社と当社の3社で協議中",
        "・対象エリア：関東の3拠点（拠点A・C・E）",
        "・効果：積載率62%→81%、配送コスト年間1.0億円削減",
        "・課題：拠点の荷受け時間の調整、システム連携、費用分担",
        "・スケジュール：2027年4月から試行、10月から本格運用",
        "・現場への影響：出荷締め時間が30分早まる",
        "・今後の進め方：関係部署と協議し、運用ルールを策定"
      ], { size: 23 }, 46);
      return { svg: K.svg(s), note: "知っていることを全部並べた資料です。<b>誰に何をしてほしいのか</b>が読み取れません。" };
    }
    if (mode === "boss") {
      s = t(56, 76, "共同配送の試行開始について、ご承認をお願いします", { size: 32, weight: 700, fill: P.main });
      s += r(56, 120, 410, 170, P.light, { rx: 10 }) + t(80, 166, "効果", { size: 22, weight: 700, fill: P.main }) +
        t(80, 240, "年間 −1.0億円", { size: 44, weight: 700, fill: P.accentText }) + t(80, 274, "配送コスト（積載率62%→81%）", { size: 20, fill: P.sub });
      s += r(494, 120, 410, 170, "#F4F5F7", { rx: 10 }) + t(518, 166, "リスクと対策", { size: 22, weight: 700, fill: P.text }) +
        K.lines(518, 214, ["荷受け時間の調整が必要", "→ 試行期間で検証する"], { size: 22 }, 38);
      s += t(56, 360, "お願いしたいこと", { size: 22, weight: 700, fill: P.main });
      s += K.lines(56, 404, ["2027年4月から、関東3拠点での6か月の試行を承認いただきたい", "（試行費用：約800万円）"], { size: 24 }, 44);
      return { svg: K.svg(s), note: "部長向け。目的は<b>承認してもらうこと</b>なので、効果・リスク・お願いだけに絞っています。" };
    }
    s = t(56, 76, "4月から、出荷締め時間が30分早まります", { size: 32, weight: 700, fill: P.main });
    s += t(56, 140, "何が変わるか", { size: 22, weight: 700, fill: P.main });
    s += K.lines(56, 186, ["出荷締め　16:00 → 15:30", "積み込み先　自社便 → 共同配送便（3社合同）"], { size: 26 }, 46);
    s += t(56, 306, "いつから・どこで", { size: 22, weight: 700, fill: P.main });
    s += t(56, 350, "2027年4月1日から　拠点A・C・E", { size: 26 });
    s += t(56, 420, "準備してほしいこと", { size: 22, weight: 700, fill: P.main });
    s += t(56, 464, "3月中に新しい積み込み手順の説明会に参加（30分）", { size: 26 });
    return { svg: K.svg(s), note: "現場向け。目的は<b>正しく動いてもらうこと</b>なので、変わることと日時、準備だけに絞っています。" };
  });

  /* ===== 投影用と配布用 ===== */
  K.demo("demo-format", function (mode) {
    var s;
    if (mode === "screen") {
      s = t(56, 96, "積載率が上がり、", { size: 48, weight: 700, fill: P.main });
      s += t(56, 164, "配送コストが8%下がる", { size: 48, weight: 700, fill: P.main });
      s += t(56, 330, "62%", { size: 96, weight: 700, fill: P.gray });
      s += K.arrow(300, 300, 420, 300, P.sub, 6);
      s += t(450, 330, "81%", { size: 96, weight: 700, fill: P.accentText });
      s += t(56, 400, "積載率", { size: 28, fill: P.sub });
      return { svg: K.svg(s), note: "投影用。説明は話し手が口で補うので、<b>文字は少なく大きく</b>します。これを配って読むと、なぜ下がるのかが分かりません。" };
    }
    s = t(56, 70, "積載率が62%から81%に上がり、配送コストが8%下がる", { size: 30, weight: 700, fill: P.main });
    s += K.lines(56, 130, [
      "3社の荷物を同じトラックに積み合わせることで、1台あたりの",
      "積載率が上がり、必要な便数が年間で約2,300便減ります。"
    ], { size: 24 }, 40);
    var rows = [["", "現行", "導入後"], ["積載率", "62%", "81%"], ["年間便数", "9,800便", "7,500便"], ["配送コスト", "12.4億円", "11.4億円"]];
    rows.forEach(function (row, i) {
      var y = 260 + i * 52;
      row.forEach(function (c, j) {
        s += t(j === 0 ? 56 : 380 + (j - 1) * 220, y, c, { size: 24, weight: i === 0 ? 700 : 400, fill: i === 0 ? P.sub : (j === 2 ? P.accentText : P.text), anchor: j === 0 ? undefined : "end" });
      });
      if (i < rows.length - 1) s += l(56, y + 18, 640, y + 18, P.line, 2);
    });
    s += t(56, 490, "出典：2025年度配送実績、3社提供の出荷データをもとに試算", { size: 18, fill: P.muted });
    return { svg: K.svg(s), note: "配布用。話し手がいなくても伝わるよう、<b>理由・数字・出典</b>まで書きます。これをそのまま投影すると、文字が小さく読み切れません。" };
  });

  /* ===== ストーリーの型 ===== */
  (function () {
    var host = K.$("demo-story");
    if (!host) return;
    var slide = host.querySelector(".slide");
    var pos = host.querySelector(".pos");
    var prev = host.querySelector(".prev");
    var next = host.querySelector(".next");
    var note = host.querySelector(".demo-note");
    var steps = [
      ["現状", "配送コストが3年で15%増えている", "数字で事実を示す。読み手と前提をそろえる"],
      ["課題", "原因は積載率の低さ（62%）", "なぜ問題なのか、原因はどこかを示す"],
      ["打ち手", "3社で共同配送を行う", "課題に対して何をするかを示す"],
      ["効果", "配送コストを年間1.0億円削減", "打ち手でどう良くなるかを数字で示す"],
      ["お願い", "4月からの試行を承認してほしい", "読み手にしてほしいことをはっきり書く"]
    ];
    var i = 0;
    function draw() {
      var s = "";
      steps.forEach(function (st, k) {
        var x = 40 + k * 180, on = k === i, done = k < i;
        s += r(x, 60, 160, 64, on ? P.main : (done ? P.light : "#F1F3F5"), { rx: 32 });
        s += t(x + 80, 102, st[0], { size: 26, weight: 700, anchor: "middle", fill: on ? "#FFFFFF" : (done ? P.main : P.muted) });
        if (k < steps.length - 1) s += t(x + 170, 102, "›", { size: 28, fill: P.muted, anchor: "middle" });
      });
      s += t(56, 230, "スライドのタイトル例", { size: 22, fill: P.sub });
      s += t(56, 296, steps[i][1], { size: 40, weight: 700, fill: P.main });
      s += t(56, 400, "このパートの役割", { size: 22, fill: P.sub });
      s += t(56, 450, steps[i][2], { size: 28 });
      slide.innerHTML = K.svg(s);
      pos.textContent = (i + 1) + " / " + steps.length;
      prev.disabled = i === 0;
      next.disabled = i === steps.length - 1;
      note.innerHTML = i === steps.length - 1
        ? "最後に<b>お願い</b>があることで、読み手は何を判断すればよいかが分かります。"
        : "「次へ」で、話の流れを順に見てください。";
    }
    prev.type = next.type = "button";
    prev.addEventListener("click", function () { if (i > 0) { i--; draw(); } });
    next.addEventListener("click", function () { if (i < steps.length - 1) { i++; draw(); } });
    draw();
  })();

  /* 枚数の目安 */
  (function () {
    var host = K.$("demo-time");
    if (!host) return;
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var res = host.querySelector(".result-line");
    function draw() {
      var m = Number(range.value);
      var lo = Math.max(1, Math.floor(m / 2)), hi = Math.max(1, Math.round(m / 1.5));
      out.textContent = m + " 分";
      res.textContent = "本編のスライドは " + lo + "〜" + hi + " 枚が目安（表紙・目次・参考資料は別）";
    }
    range.addEventListener("input", draw);
    draw();
  })();

  /* ===== 数字の扱い ===== */
  K.demo("demo-numbers", function (mode) {
    var s = t(56, 70, "拠点別の保管効率", { size: 32, weight: 700, fill: mode === "after" ? P.main : P.text });
    var rows = mode === "before"
      ? [["拠点", "保管効率", "前年比"], ["拠点A", "82", "+3"], ["拠点B", "76", "-2"], ["拠点C", "91", "+5"]]
      : [["拠点", "保管効率（%）", "前年差（ポイント）"], ["拠点A", "82", "+3"], ["拠点B", "76", "−2"], ["拠点C", "91", "+5"]];
    rows.forEach(function (row, i) {
      var y = 160 + i * 64;
      s += t(56, y, row[0], { size: 26, weight: i === 0 ? 700 : 400, fill: i === 0 ? P.sub : P.text });
      s += t(560, y, row[1], { size: 26, weight: i === 0 ? 700 : 400, fill: i === 0 ? P.sub : P.text, anchor: "end" });
      s += t(900, y, row[2], { size: 26, weight: i === 0 ? 700 : 400, fill: i === 0 ? P.sub : P.text, anchor: "end" });
      s += l(56, y + 22, 904, y + 22, P.line, 2);
    });
    if (mode === "after") {
      s += t(56, 446, "保管効率＝使用中の棚の容積 ÷ 棚の総容積", { size: 20, fill: P.sub });
      s += t(56, 482, "時点：2026年9月末　出典：倉庫管理システム", { size: 20, fill: P.sub });
    }
    return {
      svg: K.svg(s),
      note: mode === "before"
        ? "「82」は%なのか点数なのか、「+3」は%なのかポイントなのか、<b>いつの数字か</b>も分かりません。"
        : "単位・定義・時点・出典を添えました。<b>読み手が数字を疑わずに済みます。</b>"
    };
  });

  /* ===== 文章表現 ===== */
  K.demo("demo-writing", function (mode) {
    var s = t(56, 70, "課題", { size: 30, weight: 700, fill: mode === "after" ? P.main : P.text });
    if (mode === "before") {
      s += K.lines(56, 140, [
        "午後の時間帯において、ピッキング作業における待ち時間が",
        "発生していることが確認されており、これが出荷の遅れの",
        "一因となっている可能性があると考えられることから、",
        "シフト体制の見直しについて検討を行う必要があると思われる。"
      ], { size: 26 }, 50);
      return { svg: K.svg(s), note: "1文に4つの内容が詰まり、「〜における」「〜について検討を行う」など<b>回りくどい言い方</b>が重なっています。" };
    }
    s += K.lines(56, 140, [
      "午後のピッキングで、待ち時間が発生している。",
      "この待ち時間が、出荷遅れの一因になっている。",
      "午後の人員を増やすよう、シフトを見直す。"
    ], { size: 30 }, 64);
    return { svg: K.svg(s), note: "1文に1つの内容。主語と述語が近く、<b>読み返さずに意味が取れます。</b>" };
  });

  /* ===== 設計メモ ===== */
  (function () {
    var host = K.$("demo-memo");
    if (!host) return;
    var inputs = host.querySelectorAll("input, select");
    var out = host.querySelector("#memo-out");
    function draw() {
      var v = {};
      inputs.forEach(function (i) { v[i.name] = i.value.trim(); });
      out.textContent =
        "【目的】" + (v.purpose || "（例：共同配送の試行を承認してもらう）") + "\n" +
        "【読み手】" + (v.reader || "（例：物流部長、前提知識あり）") + "\n" +
        "【結論】" + (v.conclusion || "（例：共同配送で配送コストを年間8%削減できる）") + "\n" +
        "【してほしいこと】" + (v.action || "（例：4月からの試行を承認してほしい）") + "\n" +
        "【使い方】" + v.use + "、" + (v.minutes ? v.minutes + "分" : "時間未定");
    }
    inputs.forEach(function (i) { i.addEventListener("input", draw); i.addEventListener("change", draw); });
    draw();
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(56, 66, "構成案：在庫削減の取り組みについて", { size: 30, weight: 700 });
    var items = ["1. 背景", "2. 在庫の現状", "3. 倉庫の保管料について", "4. 他社の事例", "5. 在庫削減の方法（案）", "6. その他の検討事項", "7. スケジュール", "8. まとめ"];
    items.forEach(function (it, i) {
      s += t(i < 4 ? 80 : 520, 150 + (i % 4) * 80, it, { size: 28 });
    });
    s += t(56, 500, "読み手：物流部長　目的：未記載", { size: 22, fill: P.muted });
    K.still("practice-before", K.svg(s));

    var a = t(56, 66, "構成案：在庫を2割減らし、保管料の値上げ分を吸収する", { size: 28, weight: 700, fill: P.main });
    var rows = [
      ["現状", "保管料が来年度から1坪あたり8%上がる"],
      ["課題", "動きの少ない在庫が全体の3割を占めている"],
      ["打ち手", "出荷が半年ない品目を、生産と協議して減らす"],
      ["効果", "在庫2割減で、値上げ分の年間約2,000万円を吸収"],
      ["お願い", "生産部門との協議の場を設けることを承認してほしい"]
    ];
    rows.forEach(function (row, i) {
      var y = 140 + i * 76;
      a += r(56, y - 36, 130, 52, i === 4 ? P.accent : P.light, { rx: 26 }) + t(121, y - 1, row[0], { size: 22, weight: 700, anchor: "middle", fill: i === 4 ? "#3B2A00" : P.main });
      a += t(212, y, row[1], { size: 26 });
    });
    K.still("practice-after", K.svg(a));
  })();
})();
