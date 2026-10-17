/* 章の一覧。ready: true の章だけ目次からリンクする */
window.SHIRYO_CHAPTERS = [
  { id: "intro", no: "序章", title: "なぜ資料の見た目が大事か", desc: "見た目は読み手の負担を減らす技術", href: "chapters/00-intro.html", ready: false, group: "はじめに" },
  { id: "ch00", no: "第0章", title: "作る前の設計", desc: "目的と読み手、ストーリー、資料の種類", href: "chapters/00-planning.html", ready: false, group: "はじめに" },
  { id: "ch01", no: "第1章", title: "メッセージと構成", desc: "1スライド1メッセージ、メッセージライン", href: "chapters/01-message.html", ready: false, group: "組み立てる" },
  { id: "ch02", no: "第2章", title: "レイアウト", desc: "近接・整列・反復・対比、余白", href: "chapters/02-layout.html", ready: false, group: "組み立てる" },
  { id: "ch03", no: "第3章", title: "視線の流れ", desc: "Z型・F型、重要情報の置き場所", href: "chapters/03-eye-flow.html", ready: false, group: "組み立てる" },
  { id: "ch04", no: "第4章", title: "情報の階層と強調", desc: "大中小の3段階、強調の優先順位", href: "chapters/04-hierarchy.html", ready: false, group: "組み立てる" },
  { id: "ch05", no: "第5章", title: "配色", desc: "3色構成、面積比、パレット、色覚の多様性", href: "chapters/05-color.html", ready: true, sections: 10, group: "見た目を整える" },
  { id: "ch06", no: "第6章", title: "文字", desc: "フォント、サイズ階層、文字量", href: "chapters/06-type.html", ready: false, group: "見た目を整える" },
  { id: "ch07", no: "第7章", title: "グラフ", desc: "選び方、装飾を削る、誤解を招かない", href: "chapters/07-chart.html", ready: false, group: "見た目を整える" },
  { id: "ch08", no: "第8章", title: "図解とエクセル表", desc: "矢印、比較・フロー、見やすい表", href: "chapters/08-diagram-table.html", ready: false, group: "見た目を整える" },
  { id: "ch09", no: "第9章", title: "仕上げチェック", desc: "はみ出し・ズレ・統一感の最終確認", href: "chapters/09-final-check.html", ready: false, group: "仕上げる" },
  { id: "appA", no: "付録A", title: "チートシート", desc: "すぐ使える型を1画面に", href: "appendix/cheatsheet.html", ready: false, group: "付録" },
  { id: "appB", no: "付録B", title: "AI指示テンプレート集", desc: "型をAIに守らせる指示文", href: "appendix/ai-prompts.html", ready: false, group: "付録" }
];
