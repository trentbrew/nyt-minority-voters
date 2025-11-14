import {
  K as _,
  L as d,
  M as g,
  N as m,
  T as E,
  O as y,
  h as u,
  c as o,
  P as C,
  Q as N,
} from './DiiOs2mw.js';
function T(e) {
  var r = document.createElement('template');
  return ((r.innerHTML = e), r.content);
}
function i(e, r) {
  var t = m;
  t.nodes_start === null && ((t.nodes_start = e), (t.nodes_end = r));
}
function w(e, r) {
  var t = (r & E) !== 0,
    f = (r & y) !== 0,
    s,
    n = !e.startsWith('<!>');
  return () => {
    if (u) return (i(o, null), o);
    s === void 0 && ((s = T(n ? e : '<!>' + e)), t || (s = d(s)));
    var a = f || g ? document.importNode(s, !0) : s.cloneNode(!0);
    if (t) {
      var l = d(a),
        c = a.lastChild;
      i(l, c);
    } else i(a, a);
    return a;
  };
}
function A(e, r) {
  var t = w(e, r);
  return () => x(t());
}
function L(e, r, t = 'svg') {
  var f = !e.startsWith('<!>'),
    s = `<${t}>${f ? e : '<!>' + e}</${t}>`,
    n;
  return () => {
    if (u) return (i(o, null), o);
    if (!n) {
      var a = T(s),
        l = d(a);
      n = d(l);
    }
    var c = n.cloneNode(!0);
    return (i(c, c), c);
  };
}
function x(e) {
  if (u) return e;
  const r = e.nodeType === 11,
    t = e.tagName === 'SCRIPT' ? [e] : e.querySelectorAll('script'),
    f = m;
  for (const n of t) {
    const a = document.createElement('script');
    for (var s of n.attributes) a.setAttribute(s.name, s.value);
    ((a.textContent = n.textContent),
      (r ? e.firstChild === n : e === n) && (f.nodes_start = a),
      (r ? e.lastChild === n : e === n) && (f.nodes_end = a),
      n.replaceWith(a));
  }
  return e;
}
function S(e = '') {
  if (!u) {
    var r = _(e + '');
    return (i(r, r), r);
  }
  var t = o;
  return (t.nodeType !== 3 && (t.before((t = _())), N(t)), i(t, t), t);
}
function b() {
  if (u) return (i(o, null), o);
  var e = document.createDocumentFragment(),
    r = document.createComment(''),
    t = _();
  return (e.append(r, t), i(r, t), e);
}
function I(e, r) {
  if (u) {
    ((m.nodes_end = o), C());
    return;
  }
  e !== null && e.before(r);
}
const M = '5';
var v, p, h;
typeof window != 'undefined' &&
  ((h = (p = (v = window.__svelte) != null ? v : (window.__svelte = {})).v) !=
  null
    ? h
    : (p.v = new Set())
  ).add(M);
export { I as a, S as b, b as c, i as d, T as e, A as f, L as n, w as t };
