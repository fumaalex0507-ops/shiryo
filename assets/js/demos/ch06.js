(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;
  var MINCHO = "Hiragino Mincho ProN, Yu Mincho, Noto Serif CJK JP, serif";
  var MARU = "Hiragino Maru Gothic ProN, Meiryo, Noto Sans CJK JP, sans-serif";
  var POP = "Comic Sans MS, Chalkboard SE, Hiragino Maru Gothic ProN, sans-serif";

  /* ===== フォントの混在 ===== */
  K.demo("demo-mixed", function (mode) {
    var ok = mode === "after", s;
    if (!ok) {
      s = t(56, 80, "誤出荷を減らす3つの取り組み", { size: 36, weight: 700, family: MINCHO });
      s += t(56, 160, "1. ハンディ検品", { size: 28, weight: 700, family: MARU, fill: "#1E5BB8" });
      s += t(80, 202, "品番をバーコードで照合し、読み違いを防ぐ", { size: 24 });
      s += t(56, 270, "2. 二重検品", { size: 28, weight: 700, family: MINCHO });
      s += t(80, 312, "出荷前に別の担当者がもう一度数える", { size: 24, family: MARU });
      s += t(56, 380, "3. 棚の表示変更", { size: 28, family: POP });
      s += t(80, 422, "似た品番の棚に、色の違うラベルを貼る", { size: 24 });
      s += t(860, 500, "Sept. 2026", { size: 22, family: "Times New Roman, serif", anchor: "end", italic: true });
      return { svg: K.svg(s), note: "明朝・丸ゴシック・ゴシックなど、<b>4種類以上のフォント</b>が混ざっています。" };
    }
    s = t(56, 80, "誤出荷を減らす3つの取り組み", { size: 36, weight: 700, fill: P.main });
    [["1. ハンディ検品", "品番をバーコードで照合し、読み違いを防ぐ"], ["2. 二重検品", "出荷前に別の担当者がもう一度数える"], ["3. 棚の表示変更", "似た品番の棚に、色の違うラベルを貼る"]].forEach(function (it, i) {
      var y = 160 + i * 110;
      s += t(56, y, it[0], { size: 28, weight: 700 }) + t(56, y + 42, it[1], { size: 24, fill: P.sub });
    });
    s += t(904, 500, "2026年9月", { size: 20, fill: P.muted, anchor: "end" });
    return { svg: K.svg(s), note: "フォントは1種類だけ。違いは<b>大きさと太さ</b>だけで付けています。" };
  });

  /* ===== 全部同じ大きさ ===== */
  K.demo("demo-size", function (mode) {
    var ok = mode === "after", s;
    var A = ok ? { size: 34, weight: 700, fill: P.main } : { size: 26 };
    var B = ok ? { size: 26, weight: 700 } : { size: 26 };
    var C = ok ? { size: 24, fill: P.text } : { size: 26 };
    var D = ok ? { size: 18, fill: P.muted } : { size: 26 };
    s = t(56, 80, "二重検品で、数量違いを月10件から3件に減らす", A);
    s += t(56, ok ? 170 : 160, "なぜ二重検品か", B);
    s += K.lines(56, ok ? 216 : 210, ["数量違いは1人で数えるときの見落としが原因。", "別の人が数え直せば、ほとんど防げる。"], C, ok ? 40 : 46);
    s += t(56, ok ? 340 : 350, "かかる手間", B);
    s += t(56, ok ? 386 : 400, "1件あたり約20秒。1日の作業時間は15分増える。", C);
    s += t(56, ok ? 500 : 480, "出典：拠点Cでの2週間の試行（2026年9月）", D);
    return {
      svg: K.svg(s),
      note: ok
        ? "タイトル・見出し・本文・出典の<b>4つの大きさ</b>に分けました（第4章の3段階＋本文）。"
        : "すべて同じ大きさなので、<b>見出しと本文の区別</b>がつきません。"
    };
  });

  /* ===== 縮小して詰め込む ===== */
  K.demo("demo-shrink", function (mode) {
    var ok = mode === "after", s;
    if (!ok) {
      s = t(56, 60, "二重検品の試行結果と今後の進め方について", { size: 26, weight: 700 });
      s += K.lines(56, 104, [
        "・拠点Cで9月の2週間、出荷前の二重検品を試行した。対象は全出荷の約3割（ケース単位の出荷）。",
        "・数量違いは試行前の月10件ペースから、試行中は月3件ペースまで減少した。",
        "・品番違いは試行前後で変化なし（ハンディ検品で既に防げているため）。",
        "・作業時間は1件あたり約20秒増加し、1日の合計で約15分の増加となった。",
        "・午後の繁忙時間帯は、二重検品の担当者が不足する場面があった。",
        "・作業者からは「確認の手順が分かりやすい」との声が多かった一方、繁忙時の負担を懸念する声もあった。",
        "・今後は11月から拠点A・Eに展開する予定。繁忙時間帯は応援要員を1名配置する。",
        "・展開後3か月で効果を検証し、全拠点への展開を判断する。費用は月約12万円の見込み。",
        "・なお、ケース単位以外の出荷（ピース出荷）への適用は、別途検討が必要である。"
      ], { size: 15 }, 34);
      return { svg: K.svg(s), note: "入りきらないので文字を15ptまで小さくしました。<b>読む気がしない</b>見た目になっています。" };
    }
    s = r(20, 40, 450, 460, "#FFFFFF", { stroke: P.line, sw: 2 }) + r(490, 40, 450, 460, "#FFFFFF", { stroke: P.line, sw: 2 });
    s += K.lines(44, 100, ["二重検品で、数量違いが", "月10件→3件に減った"], { size: 24, weight: 700, fill: P.main }, 36);
    s += K.lines(44, 210, ["・対象：ケース単位の出荷", "・作業時間：1件あたり+20秒", "・品番違いは変化なし"], { size: 20 }, 44);
    s += t(44, 470, "1枚目：試行の結果", { size: 16, fill: P.muted });
    s += K.lines(514, 100, ["11月から拠点A・Eに広げ、", "3か月後に全拠点を判断"], { size: 24, weight: 700, fill: P.main }, 36);
    s += K.lines(514, 210, ["・繁忙時は応援を1名配置", "・費用：月約12万円", "・ピース出荷は別途検討"], { size: 20 }, 44);
    s += t(514, 470, "2枚目：今後の進め方", { size: 16, fill: P.muted });
    return { svg: K.svg(s), note: "「結果」と「進め方」の2枚に分け、文も短く削りました。<b>文字の大きさを下げずに</b>収まっています。" };
  });

  /* ===== 行間 ===== */
  (function () {
    var host = K.$("demo-leading");
    if (!host) return;
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    function draw() {
      var lh = Number(range.value) / 10;
      var s = t(56, 76, "午後の作業集中を分散させる", { size: 32, weight: 700, fill: P.main });
      s += K.lines(56, 150, [
        "午後のピッキングは、15時から17時に集中している。",
        "この時間帯は、待ち時間が1件あたり平均4分ある。",
        "午前に準備できる出荷を前倒しすれば、集中を分散できる。",
        "まずは翌日分の準備を、午前の空き時間に回す。"
      ], { size: 26 }, Math.round(26 * lh));
      slide.innerHTML = K.svg(s);
      out.textContent = lh.toFixed(1) + " 倍";
      note.innerHTML = lh < 1.15
        ? "行と行がくっつき、<b>次の行を読むときに行を間違えやすく</b>なります。"
        : lh <= 1.6
          ? "ほどよい行間です。<b>1行ずつがまとまり</b>、次の行頭もすぐ見つかります。"
          : "行間が広すぎて、<b>文章としてのまとまりが感じられません</b>。";
    }
    range.addEventListener("input", draw);
    draw();
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(480, 64, "★ 新しい出荷締め時間のお知らせ ★", { size: 30, weight: 700, family: POP, anchor: "middle", fill: "#1E5BB8" });
    s += K.lines(56, 120, [
      "4月1日より、共同配送の開始に伴い、出荷締め時間が16:00から15:30に変更になります。",
      "対象は拠点A・C・Eの全出荷です。15:30以降に入った受注は翌日の出荷となりますので、",
      "営業部門への周知と、得意先への連絡をお願いします。なお、緊急出荷が必要な場合は、",
      "物流部（内線1234）までご連絡ください。個別に対応を検討します。"
    ], { size: 17, family: MINCHO }, 30);
    s += t(56, 300, "変更内容", { size: 26, weight: 700, family: MARU });
    s += t(56, 346, "出荷締め：16:00 → 15:30", { size: 26, family: "Times New Roman, serif" });
    s += t(56, 400, "お問い合わせ：物流部 内線1234", { size: 17, family: MINCHO });
    K.still("practice-before", K.svg(s));

    var a = t(56, 80, "4月1日から、出荷締めが30分早まります", { size: 34, weight: 700, fill: P.main });
    a += t(56, 170, "出荷締め時間", { size: 22, fill: P.sub });
    a += t(56, 240, "16:00 → 15:30", { size: 56, weight: 700, fill: P.accentText });
    a += t(560, 170, "対象", { size: 22, fill: P.sub }) + t(560, 216, "拠点A・C・Eの全出荷", { size: 26 });
    a += l(56, 290, 904, 290, P.line, 2);
    a += t(56, 340, "お願い", { size: 22, fill: P.sub });
    a += K.lines(56, 384, ["15:30以降の受注は翌日出荷になることを、", "営業部門と得意先に周知してください"], { size: 26 }, 42);
    a += t(56, 500, "緊急出荷の相談：物流部（内線1234）", { size: 20, fill: P.muted });
    K.still("practice-after", K.svg(a));
  })();
})();
