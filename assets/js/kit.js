/* 見本スライドを描くための共通部品（960×540 のSVG座標で描く） */
(function () {
  "use strict";

  var FONT = 'font-family="Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, sans-serif"';

  /* 自社カラー（第5章で決めた配色） */
  var P = {
    main: "#3A8048",
    light: "#EAF0D2",
    accent: "#E8B44A",
    accentText: "#9A6E14",
    text: "#333333",
    sub: "#666666",
    muted: "#8A8F96",
    gray: "#BFC5CD",
    line: "#D9DDE2",
    bg: "#FFFFFF",
    ng: "#E53935"
  };

  function attrs(o) {
    var s = "";
    for (var k in o) if (o[k] !== undefined && o[k] !== null) s += " " + k + '="' + o[k] + '"';
    return s;
  }

  var K = {
    W: 960,
    H: 540,
    P: P,

    svg: function (inner, defs) {
      return '<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" role="img">' +
        (defs ? "<defs>" + defs + "</defs>" : "") + inner + "</svg>";
    },

    /* 文字。opt: size, weight, fill, anchor, family, italic, deco */
    t: function (x, y, str, opt) {
      opt = opt || {};
      var fam = opt.family ? 'font-family="' + opt.family + '"' : FONT;
      return "<text" + attrs({
        x: x, y: y,
        "font-size": opt.size || 28,
        "font-weight": opt.weight || 400,
        fill: opt.fill || P.text,
        "text-anchor": opt.anchor,
        "font-style": opt.italic ? "italic" : undefined,
        "text-decoration": opt.deco,
        "letter-spacing": opt.ls
      }) + " " + fam + ">" + str + "</text>";
    },

    /* 複数行の文字。gap は行の間隔（px） */
    lines: function (x, y, arr, opt, gap) {
      var out = "";
      gap = gap || Math.round((opt && opt.size || 28) * 1.6);
      arr.forEach(function (s, i) { out += K.t(x, y + i * gap, s, opt); });
      return out;
    },

    r: function (x, y, w, h, fill, opt) {
      opt = opt || {};
      return "<rect" + attrs({
        x: x, y: y, width: w, height: h, fill: fill || "none",
        rx: opt.rx, stroke: opt.stroke, "stroke-width": opt.sw, "stroke-dasharray": opt.dash, opacity: opt.op
      }) + "/>";
    },

    l: function (x1, y1, x2, y2, stroke, sw, dash) {
      return "<line" + attrs({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: stroke || P.line, "stroke-width": sw || 2, "stroke-dasharray": dash }) + "/>";
    },

    c: function (cx, cy, r, fill, opt) {
      opt = opt || {};
      return "<circle" + attrs({ cx: cx, cy: cy, r: r, fill: fill || "none", stroke: opt.stroke, "stroke-width": opt.sw, opacity: opt.op }) + "/>";
    },

    p: function (d, stroke, sw, fill, opt) {
      opt = opt || {};
      return "<path" + attrs({
        d: d, stroke: stroke || "none", "stroke-width": sw, fill: fill || "none",
        "stroke-linecap": opt.cap || "round", "stroke-linejoin": "round", "marker-end": opt.marker, opacity: opt.op
      }) + "/>";
    },

    /* 矢印（線＋三角） */
    arrow: function (x1, y1, x2, y2, color, sw) {
      color = color || P.sub;
      sw = sw || 4;
      var a = Math.atan2(y2 - y1, x2 - x1), s = 14 + sw;
      var bx = x2 - Math.cos(a) * s, by = y2 - Math.sin(a) * s;
      var p1 = (bx + Math.cos(a + Math.PI / 2) * s * 0.55) + " " + (by + Math.sin(a + Math.PI / 2) * s * 0.55);
      var p2 = (bx + Math.cos(a - Math.PI / 2) * s * 0.55) + " " + (by + Math.sin(a - Math.PI / 2) * s * 0.55);
      return K.l(x1, y1, bx, by, color, sw) + '<path d="M' + x2 + " " + y2 + " L" + p1 + " L" + p2 + ' Z" fill="' + color + '"/>';
    },

    /* 番号付きの丸（視線の順番などに使う） */
    badge: function (x, y, n, color) {
      return K.c(x, y, 22, color || P.ng) + K.t(x, y + 9, String(n), { size: 26, weight: 700, fill: "#FFFFFF", anchor: "middle" });
    },

    mount: function (el, svgString) { el.innerHTML = svgString; },

    $: function (id) { return document.getElementById(id); },

    /*
      Before/After などのセグメント切替を持つ見本をつなぐ。
      render(mode, host) は { svg: "...", note: "..." } を返す。
      戻り値の関数を呼ぶと、今のモードで描き直す。
    */
    demo: function (id, render) {
      var host = document.getElementById(id);
      if (!host) return function () {};
      var slide = host.querySelector(".slide");
      var note = host.querySelector(".demo-note");
      var seg = host.querySelector(".seg");
      var mode = null;
      function draw() {
        var out = render(mode, host) || {};
        if (out.svg !== undefined && slide) slide.innerHTML = out.svg;
        if (out.note !== undefined && note) note.innerHTML = out.note;
      }
      if (seg) {
        Shiryo.bindSeg(seg, function (v) { mode = v; draw(); });
      } else {
        draw();
      }
      return draw;
    },

    /* 練習課題など、切替のない固定スライドを描く */
    still: function (id, svgString) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = svgString;
    }
  };

  window.K = K;
})();
