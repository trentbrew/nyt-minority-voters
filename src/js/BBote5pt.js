import {
  Y as V,
  Z as m,
  _ as T,
  $ as P,
  N as D,
  U as F,
  I as $,
  a0 as q,
  h as E,
  a1 as C,
  a2 as A,
  a3 as w,
  Q as L,
  K as M,
  b as x,
  a4 as U,
  c as h,
  L as W,
  a5 as N,
  a6 as S,
  P as z,
  a7 as G,
  a8 as K,
  a9 as Q,
  aa as X,
  ab as Z,
  ac as J,
  a as ee,
  v as te,
  e as re,
  w as ae,
} from './DiiOs2mw.js';
import { d as ne } from './ChPUba6M.js';
function ve(e) {
  return (
    e.endsWith('capture') &&
    e !== 'gotpointercapture' &&
    e !== 'lostpointercapture'
  );
}
const ie = [
  'beforeinput',
  'click',
  'change',
  'dblclick',
  'contextmenu',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointerdown',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchend',
  'touchmove',
  'touchstart',
];
function ye(e) {
  return ie.includes(e);
}
const oe = {
  formnovalidate: 'formNoValidate',
  ismap: 'isMap',
  nomodule: 'noModule',
  playsinline: 'playsInline',
  readonly: 'readOnly',
  defaultvalue: 'defaultValue',
  defaultchecked: 'defaultChecked',
  srcobject: 'srcObject',
  novalidate: 'noValidate',
  allowfullscreen: 'allowFullscreen',
  disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback',
};
function we(e) {
  var t;
  return ((e = e.toLowerCase()), (t = oe[e]) != null ? t : e);
}
const se = ['touchstart', 'touchmove'];
function ue(e) {
  return se.includes(e);
}
const le = ['textarea', 'script', 'style', 'title'];
function Ee(e) {
  return le.includes(e);
}
function ge(e, t, a, n = !0) {
  n && a();
  for (var i of t) e.addEventListener(i, a);
  V(() => {
    for (var r of t) e.removeEventListener(r, a);
  });
}
function ce(e) {
  var t = P,
    a = D;
  (m(null), T(null));
  try {
    return e();
  } finally {
    (m(t), T(a));
  }
}
const H = new Set(),
  R = new Set();
function de(e, t, a, n = {}) {
  function i(r) {
    if ((n.capture || g.call(t, r), !r.cancelBubble))
      return ce(() => (a == null ? void 0 : a.call(this, r)));
  }
  return (
    e.startsWith('pointer') || e.startsWith('touch') || e === 'wheel'
      ? q(() => {
          t.addEventListener(e, i, n);
        })
      : t.addEventListener(e, i, n),
    i
  );
}
function be(e, t, a, n, i) {
  var r = { capture: n, passive: i },
    f = de(e, t, a, r);
  (t === document.body || t === window || t === document) &&
    V(() => {
      t.removeEventListener(e, f, r);
    });
}
function me(e) {
  for (var t = 0; t < e.length; t++) H.add(e[t]);
  for (var a of R) a(e);
}
function g(e) {
  var O;
  var t = this,
    a = t.ownerDocument,
    n = e.type,
    i = ((O = e.composedPath) == null ? void 0 : O.call(e)) || [],
    r = i[0] || e.target,
    f = 0,
    l = e.__root;
  if (l) {
    var _ = i.indexOf(l);
    if (_ !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var v = i.indexOf(t);
    if (v === -1) return;
    _ <= v && (f = _);
  }
  if (((r = i[f] || e.target), r !== t)) {
    F(e, 'currentTarget', {
      configurable: !0,
      get() {
        return r || a;
      },
    });
    var k = P,
      c = D;
    (m(null), T(null));
    try {
      for (var o, s = []; r !== null; ) {
        var d = r.assignedSlot || r.parentNode || r.host || null;
        try {
          var p = r['__' + n];
          if (p != null && (!r.disabled || e.target === r))
            if ($(p)) {
              var [j, ...B] = p;
              j.apply(r, [e, ...B]);
            } else p.call(r, e);
        } catch (b) {
          o ? s.push(b) : (o = b);
        }
        if (e.cancelBubble || d === t || d === null) break;
        r = d;
      }
      if (o) {
        for (let b of s)
          queueMicrotask(() => {
            throw b;
          });
        throw o;
      }
    } finally {
      ((e.__root = t), delete e.currentTarget, m(k), T(c));
    }
  }
}
let u;
function fe() {
  u = void 0;
}
function Te(e) {
  let t = null,
    a = E;
  var n;
  if (E) {
    for (
      t = h, u === void 0 && (u = W(document.head));
      u !== null && (u.nodeType !== 8 || u.data !== C);

    )
      u = A(u);
    u === null ? w(!1) : (u = L(A(u)));
  }
  E || (n = document.head.appendChild(M()));
  try {
    x(() => e(n), U);
  } finally {
    a && (w(!0), (u = h), L(t));
  }
}
function Le(e, t) {
  var n;
  var a = t == null ? '' : typeof t == 'object' ? t + '' : t;
  a !== ((n = e.__t) != null ? n : (e.__t = e.nodeValue)) &&
    ((e.__t = a), (e.nodeValue = a + ''));
}
function _e(e, t) {
  return Y(e, t);
}
function ke(e, t) {
  var f;
  (N(), (t.intro = (f = t.intro) != null ? f : !1));
  const a = t.target,
    n = E,
    i = h;
  try {
    for (var r = W(a); r && (r.nodeType !== 8 || r.data !== C); ) r = A(r);
    if (!r) throw S;
    (w(!0), L(r), z());
    const l = Y(e, { ...t, anchor: r });
    if (h === null || h.nodeType !== 8 || h.data !== G) throw (K(), S);
    return (w(!1), l);
  } catch (l) {
    if (l === S) return (t.recover === !1 && Q(), N(), X(a), w(!1), _e(e, t));
    throw l;
  } finally {
    (w(n), L(i), fe());
  }
}
const y = new Map();
function Y(
  e,
  { target: t, anchor: a, props: n = {}, events: i, context: r, intro: f = !0 },
) {
  N();
  var l = new Set(),
    _ = (c) => {
      for (var o = 0; o < c.length; o++) {
        var s = c[o];
        if (!l.has(s)) {
          l.add(s);
          var d = ue(s);
          t.addEventListener(s, g, { passive: d });
          var p = y.get(s);
          p === void 0
            ? (document.addEventListener(s, g, { passive: d }), y.set(s, 1))
            : y.set(s, p + 1);
        }
      }
    };
  (_(Z(H)), R.add(_));
  var v = void 0,
    k = J(() => {
      var c = a != null ? a : t.appendChild(M());
      return (
        ee(() => {
          if (r) {
            te({});
            var o = re;
            o.c = r;
          }
          (i && (n.$$events = i),
            E && ne(c, null),
            (v = e(c, n) || {}),
            E && (D.nodes_end = h),
            r && ae());
        }),
        () => {
          var d;
          for (var o of l) {
            t.removeEventListener(o, g);
            var s = y.get(o);
            --s === 0
              ? (document.removeEventListener(o, g), y.delete(o))
              : y.set(o, s);
          }
          (R.delete(_),
            c !== a && ((d = c.parentNode) == null || d.removeChild(c)));
        }
      );
    });
  return (I.set(v, k), v);
}
let I = new WeakMap();
function Se(e, t) {
  const a = I.get(e);
  return a ? (I.delete(e), a(t)) : Promise.resolve();
}
export {
  ve as a,
  ye as b,
  de as c,
  me as d,
  be as e,
  Te as f,
  ke as h,
  Ee as i,
  ge as l,
  _e as m,
  we as n,
  Le as s,
  Se as u,
  ce as w,
};
