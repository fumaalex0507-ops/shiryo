(function () {
  "use strict";
  var P = K.P, t = K.t, r = K.r, l = K.l;

  function gridLines(xs) {
    var s = "";
    xs.forEach(function (x) { s += l(x, 0, x, 540, "#E53935", 2, "8 6"); });
    return s;
  }

  /* ===== 端がそろっていない ===== */
  (function () {
    var host = K.$("demo-align");
    if (!host) return;
    var grid = host.querySelector("input[name=grid]");
    var draw = K.demo("demo-align", function (mode) {
      var ok = mode === "after";
      var xs = ok ? [56, 56, 56, 56] : [56, 78, 44, 96];
      var ws = ok ? [400, 400, 400] : [380, 430, 350];
      var s = t(xs[0], 78, "拠点別の課題と対策", { size: 32, weight: 700, fill: ok ? P.main : P.text });
      var items = [["拠点A", "荷受けの集中 → 時間指定を分散"], ["拠点B", "保管効率76% → 棚割りを見直し"], ["拠点C", "誤出荷の多発 → 検品を二重化"]];
      items.forEach(function (it, i) {
        var y = 130 + i * 120, x = xs[i + 1];
        s += r(x, y, ws[i], 96, "#F1F3F5", { rx: 8 });
        s += t(x + 20, y + 40, it[0], { size: 24, weight: 700 });
        s += t(x + 20, y + 76, it[1], { size: 20, fill: P.sub });
      });
      var cx = ok ? 520 : 560;
      s += r(cx, ok ? 130 : 150, 384, ok ? 336 : 300, P.light, { rx: 8 });
      s += t(cx + 24, (ok ? 130 : 150) + 52, "優先順位", { size: 24, weight: 700, fill: P.main });
      s += K.lines(cx + 24, (ok ? 130 : 150) + 110, ["1. 拠点B（効果が大きい）", "2. 拠点C（品質リスク）", "3. 拠点A（調整に時間）"], { size: 22 }, 50);
      if (grid.checked) s += gridLines(ok ? [56, 456, 520, 904] : [44, 56, 78, 96, 560]);
      return {
        svg: K.svg(s),
        note: ok
          ? "すべての要素の端が、<b>見えない縦の線</b>にそろっています。"
          : "左端が少しずつずれています。グリッド線を表示すると、<b>そろうべき線がばらばら</b>なのが分かります。"
      };
    });
    grid.addEventListener("change", draw);
  })();

  /* ===== 中央揃え ===== */
  K.demo("demo-center", function (mode) {
    var ok = mode === "after";
    var x = ok ? 56 : 480, anchor = ok ? undefined : "middle";
    var s = t(x, 78, "出荷遅れを減らすために実施すること", { size: 32, weight: 700, anchor: anchor, fill: ok ? P.main : P.text });
    var lines = [
      "・午後のピッキング人員を2名増やす",
      "・出荷締めを30分早め、積み込みに余裕を持たせる",
      "・遅れの多い得意先は、前日に出荷準備を済ませる",
      "・毎週金曜に遅れの件数を確認する"
    ];
    s += K.lines(x, 170, lines, { size: 26, anchor: anchor }, 70);
    return {
      svg: K.svg(s),
      note: ok
        ? "行頭が同じ位置にそろうので、<b>目は毎回同じ場所に戻れます。</b>"
        : "行の長さがばらばらなので、<b>行頭の位置が毎回変わり</b>、次の行を探す手間がかかります。"
    };
  });

  /* ===== 余白 ===== */
  (function () {
    var host = K.$("demo-margin");
    if (!host) return;
    var range = host.querySelector("input[type=range]");
    var out = host.querySelector("output");
    var note = host.querySelector(".demo-note");
    var slide = host.querySelector(".slide");
    function draw() {
      var m = Number(range.value);
      var w = 960 - m * 2;
      var s = r(m, m, w, 540 - m * 2, "none", { stroke: "#E53935", sw: 1.5, dash: "6 6" });
      s += t(m, m + 40, "倉庫Bの保管効率を高める3つの方法", { size: 32, weight: 700, fill: P.main });
      var cw = (w - 40) / 3;
      ["棚割りの見直し", "通路幅の最適化", "定期的な在庫整理"].forEach(function (h, i) {
        var x = m + i * (cw + 20), y = m + 80;
        s += r(x, y, cw, 540 - m * 2 - 80, P.light, { rx: 6 });
        s += t(x + 18, y + 44, h, { size: 22, weight: 700, fill: P.main });
        s += K.lines(x + 18, y + 92, ["効果：+" + (6 - i * 2) + "ポイント", "期間：" + (i + 1) + "か月"], { size: 20 }, 36);
      });
      slide.innerHTML = K.svg(s);
      var inch = (m / 960 * 13.33).toFixed(1);
      out.textContent = "約" + inch + "インチ";
      note.innerHTML = m < 30
        ? "内容がスライドの端に張り付き、<b>窮屈で落ち着かない印象</b>になります。"
        : m <= 70
          ? "端からほどよく離れ、<b>内容がまとまって見えます。</b>赤い点線が内容の外枠です。"
          : "余白が広すぎると、内容が小さくなって<b>読みにくく</b>なります。";
    }
    range.addEventListener("input", draw);
    draw();
  })();

  /* ===== 4原則のスイッチ ===== */
  (function () {
    var host = K.$("demo-four");
    if (!host) return;
    var sw = {};
    host.querySelectorAll("input[type=checkbox]").forEach(function (i) { sw[i.name] = i; });
    var slide = host.querySelector(".slide");
    var note = host.querySelector(".demo-note");
    var items = [["共同配送", "3社で積み合わせ、積載率を81%に上げる"], ["ルートの見直し", "配送距離を12%短くする"], ["シフトの変更", "午後の待ち時間を半分にする"]];
    function draw() {
      var prox = sw.prox.checked, align = sw.align.checked, rep = sw.rep.checked, con = sw.con.checked;
      var offs = [0, 34, -14, 52, 18, -10, 40];
      var s = t(56 + (align ? 0 : offs[0]), 82, "配送コストを下げる3つの施策", con ? { size: 36, weight: 700, fill: P.main } : { size: 26 });
      items.forEach(function (it, i) {
        var hy = prox ? 170 + i * 120 : 160 + i * 2 * 56;
        var dy = prox ? hy + 42 : hy + 56;
        var hx = 56 + (align ? 0 : offs[1 + i * 2]);
        var dx = 56 + (align ? 0 : offs[2 + i * 2]);
        var styles = rep
          ? [{ size: 28, weight: con ? 700 : 400, fill: P.text }, { size: 28, weight: con ? 700 : 400, fill: P.text }, { size: 28, weight: con ? 700 : 400, fill: P.text }]
          : [{ size: 30, weight: 700, fill: P.main }, { size: 24, weight: 400, fill: "#E07B24", deco: "underline" }, { size: 22, weight: 700, fill: P.muted }];
        var tx = hx;
        if (rep) {
          s += K.c(hx + 18, hy - 10, 18, P.light) + t(hx + 18, hy - 2, String(i + 1), { size: 22, weight: 700, anchor: "middle", fill: P.main });
          tx = hx + 50;
        } else if (i === 2) {
          s += r(hx, hy - 22, 18, 18, P.muted);
          tx = hx + 28;
        }
        s += t(tx, hy, it[0], styles[i]);
        s += t(rep ? dx + 50 : dx, dy, it[1], { size: 24, fill: con ? P.sub : P.text });
      });
      if (con) {
        s += t(640, 200, "年間削減見込み", { size: 22, fill: P.sub });
        s += t(640, 270, "1.4億円", { size: 60, weight: 700, fill: P.accentText });
      } else {
        s += t(640, 200, "年間削減見込み", { size: 24 });
        s += t(640, 240, "1.4億円", { size: 24 });
      }
      slide.innerHTML = K.svg(s);
      var off = [];
      if (!prox) off.push("近接");
      if (!align) off.push("整列");
      if (!rep) off.push("反復");
      if (!con) off.push("対比");
      note.innerHTML = off.length === 0
        ? "4つの原則がすべて効いた状態です。スイッチを1つずつ切って、何が崩れるか確かめてください。"
        : "<b>" + off.join("・") + "</b>を切った状態です。" + {
          "近接": "見出しと説明の距離が、項目どうしの距離と同じになり、どれとどれが組なのか分かりにくくなります。",
          "整列": "左端がずれて、全体が雑然と見えます。",
          "反復": "同じ種類の見出しなのに見た目がばらばらで、同じ扱いのものだと伝わりません。",
          "対比": "タイトルも数字も同じ大きさで、何が大事なのか分かりません。"
        }[off[off.length - 1]];
    }
    Object.keys(sw).forEach(function (k) { sw[k].addEventListener("change", draw); });
    draw();
  })();

  /* ===== 骨格パターン ===== */
  (function () {
    var G = "#D5D9DE", T = P.main;
    function title() { return r(48, 36, 560, 40, T, { rx: 4 }); }
    var pats = {
      "pat-1": title() + r(48, 110, 864, 380, G, { rx: 6 }),
      "pat-2": title() + r(48, 110, 420, 380, G, { rx: 6 }) + r(492, 110, 420, 380, G, { rx: 6 }),
      "pat-3": title() + r(48, 110, 272, 380, G, { rx: 6 }) + r(344, 110, 272, 380, G, { rx: 6 }) + r(640, 110, 272, 380, G, { rx: 6 }),
      "pat-4": title() + r(48, 110, 520, 380, G, { rx: 6 }) + r(600, 120, 312, 28, G, { rx: 4 }) + r(600, 170, 280, 20, G, { rx: 4 }) + r(600, 205, 300, 20, G, { rx: 4 }) + r(600, 240, 250, 20, G, { rx: 4 }),
      "pat-5": title() + r(48, 110, 864, 250, G, { rx: 6 }) + r(48, 384, 864, 106, P.light, { rx: 6 })
    };
    Object.keys(pats).forEach(function (id) { K.still(id, K.svg(pats[id])); });
  })();

  /* ===== 練習課題 ===== */
  (function () {
    var s = t(480, 50, "ピッキング動線の改善案", { size: 32, weight: 700, anchor: "middle" });
    s += r(12, 80, 430, 300, "#D5D9DE");
    s += t(227, 240, "倉庫レイアウト図", { size: 24, anchor: "middle", fill: P.sub });
    s += K.lines(700, 110, [
      "よく出る商品を",
      "出荷口の近くに移動",
      "歩行距離が18%短縮",
      "作業時間も1日40分減"
    ], { size: 26, anchor: "middle" }, 52);
    s += r(470, 330, 470, 90, "#F1F3F5");
    s += t(705, 385, "11月から拠点Bで試行", { size: 26, anchor: "middle" });
    s += t(480, 520, "※数値は9月の試算", { size: 18, anchor: "middle", fill: P.sub });
    K.still("practice-before", K.svg(s));

    var a = t(56, 80, "よく出る商品を出荷口の近くに移し、歩行距離を18%短縮", { size: 30, weight: 700, fill: P.main });
    a += r(56, 120, 460, 340, "#D5D9DE", { rx: 6 }) + t(286, 296, "倉庫レイアウト図", { size: 24, anchor: "middle", fill: P.sub });
    a += t(556, 160, "効果（9月の試算）", { size: 22, fill: P.sub });
    a += t(556, 224, "歩行距離　−18%", { size: 34, weight: 700, fill: P.accentText });
    a += t(556, 280, "作業時間　1日40分減", { size: 26 });
    a += l(556, 316, 904, 316, P.line, 2);
    a += t(556, 366, "進め方", { size: 22, fill: P.sub });
    a += K.lines(556, 414, ["11月から拠点Bで試行し、", "効果を確認して他拠点へ"], { size: 24 }, 40);
    K.still("practice-after", K.svg(a));
  })();
})();
