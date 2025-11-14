var Jt = (t) => {
  throw TypeError(t);
};
var Ve = (t, e, n) => e.has(t) || Jt('Cannot ' + n);
var A = (t, e, n) => (
    Ve(t, e, 'read from private field'),
    n ? n.call(t) : e.get(t)
  ),
  C = (t, e, n) =>
    e.has(t)
      ? Jt('Cannot add the same private member more than once')
      : e instanceof WeakSet
        ? e.add(t)
        : e.set(t, n);
import { V as O, j as N, z as j, W as Fe } from './DiiOs2mw.js';
import { w as Ot, o as Xt } from './BEyHwC8Q.js';
new URL('sveltekit-internal://');
function Be(t, e) {
  return t === '/' || e === 'ignore'
    ? t
    : e === 'never'
      ? t.endsWith('/')
        ? t.slice(0, -1)
        : t
      : e === 'always' && !t.endsWith('/')
        ? t + '/'
        : t;
}
function Me(t) {
  return t.split('%25').map(decodeURI).join('%25');
}
function qe(t) {
  for (const e in t) t[e] = decodeURIComponent(t[e]);
  return t;
}
function It({ href: t }) {
  return t.split('#')[0];
}
function Ge(t, e, n, r = !1) {
  const a = new URL(t);
  Object.defineProperty(a, 'searchParams', {
    value: new Proxy(a.searchParams, {
      get(i, o) {
        if (o === 'get' || o === 'getAll' || o === 'has')
          return (l) => (n(l), i[o](l));
        e();
        const c = Reflect.get(i, o);
        return typeof c == 'function' ? c.bind(i) : c;
      },
    }),
    enumerable: !0,
    configurable: !0,
  });
  const s = ['href', 'pathname', 'search', 'toString', 'toJSON'];
  r && s.push('hash');
  for (const i of s)
    Object.defineProperty(a, i, {
      get() {
        return (e(), t[i]);
      },
      enumerable: !0,
      configurable: !0,
    });
  return a;
}
function He(...t) {
  let e = 5381;
  for (const n of t)
    if (typeof n == 'string') {
      let r = n.length;
      for (; r; ) e = (e * 33) ^ n.charCodeAt(--r);
    } else if (ArrayBuffer.isView(n)) {
      const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
      let a = r.length;
      for (; a; ) e = (e * 33) ^ r[--a];
    } else throw new TypeError('value must be a string or TypedArray');
  return (e >>> 0).toString(36);
}
function Ke(t) {
  const e = atob(t),
    n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r);
  return n.buffer;
}
const We = window.fetch;
window.fetch = (t, e) => (
  (t instanceof Request
    ? t.method
    : (e == null ? void 0 : e.method) || 'GET') !== 'GET' && Y.delete(Nt(t)),
  We(t, e)
);
const Y = new Map();
function Ye(t, e) {
  const n = Nt(t, e),
    r = document.querySelector(n);
  if (r != null && r.textContent) {
    let { body: a, ...s } = JSON.parse(r.textContent);
    const i = r.getAttribute('data-ttl');
    return (
      i && Y.set(n, { body: a, init: s, ttl: 1e3 * Number(i) }),
      r.getAttribute('data-b64') !== null && (a = Ke(a)),
      Promise.resolve(new Response(a, s))
    );
  }
  return window.fetch(t, e);
}
function ze(t, e, n) {
  if (Y.size > 0) {
    const r = Nt(t, n),
      a = Y.get(r);
    if (a) {
      if (
        performance.now() < a.ttl &&
        ['default', 'force-cache', 'only-if-cached', void 0].includes(
          n == null ? void 0 : n.cache,
        )
      )
        return new Response(a.body, a.init);
      Y.delete(r);
    }
  }
  return window.fetch(e, n);
}
function Nt(t, e) {
  let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request ? t.url : t)}]`;
  if ((e != null && e.headers) || (e != null && e.body)) {
    const a = [];
    (e.headers && a.push([...new Headers(e.headers)].join(',')),
      e.body &&
        (typeof e.body == 'string' || ArrayBuffer.isView(e.body)) &&
        a.push(e.body),
      (r += `[data-hash="${He(...a)}"]`));
  }
  return r;
}
const Je = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Xe(t) {
  const e = [];
  return {
    pattern:
      t === '/'
        ? /^\/$/
        : new RegExp(
            `^${Qe(t)
              .map((r) => {
                const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
                if (a)
                  return (
                    e.push({
                      name: a[1],
                      matcher: a[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    '(?:/(.*))?'
                  );
                const s = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
                if (s)
                  return (
                    e.push({
                      name: s[1],
                      matcher: s[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    '(?:/([^/]+))?'
                  );
                if (!r) return;
                const i = r.split(/\[(.+?)\](?!\])/);
                return (
                  '/' +
                  i
                    .map((c, l) => {
                      if (l % 2) {
                        if (c.startsWith('x+'))
                          return Ut(
                            String.fromCharCode(parseInt(c.slice(2), 16)),
                          );
                        if (c.startsWith('u+'))
                          return Ut(
                            String.fromCharCode(
                              ...c
                                .slice(2)
                                .split('-')
                                .map((y) => parseInt(y, 16)),
                            ),
                          );
                        const u = Je.exec(c),
                          [, h, w, f, p] = u;
                        return (
                          e.push({
                            name: f,
                            matcher: p,
                            optional: !!h,
                            rest: !!w,
                            chained: w ? l === 1 && i[0] === '' : !1,
                          }),
                          w ? '(.*?)' : h ? '([^/]*)?' : '([^/]+?)'
                        );
                      }
                      return Ut(c);
                    })
                    .join('')
                );
              })
              .join('')}/?$`,
          ),
    params: e,
  };
}
function Ze(t) {
  return !/^\([^)]+\)$/.test(t);
}
function Qe(t) {
  return t.slice(1).split('/').filter(Ze);
}
function tn(t, e, n) {
  const r = {},
    a = t.slice(1),
    s = a.filter((o) => o !== void 0);
  let i = 0;
  for (let o = 0; o < e.length; o += 1) {
    const c = e[o];
    let l = a[o - i];
    if (
      (c.chained &&
        c.rest &&
        i &&
        ((l = a
          .slice(o - i, o + 1)
          .filter((u) => u)
          .join('/')),
        (i = 0)),
      l === void 0)
    ) {
      c.rest && (r[c.name] = '');
      continue;
    }
    if (!c.matcher || n[c.matcher](l)) {
      r[c.name] = l;
      const u = e[o + 1],
        h = a[o + 1];
      (u && !u.rest && u.optional && h && c.chained && (i = 0),
        !u && !h && Object.keys(r).length === s.length && (i = 0));
      continue;
    }
    if (c.optional && c.chained) {
      i++;
      continue;
    }
    return;
  }
  if (!i) return r;
}
function Ut(t) {
  return t
    .normalize()
    .replace(/[[\]]/g, '\\$&')
    .replace(/%/g, '%25')
    .replace(/\//g, '%2[Ff]')
    .replace(/\?/g, '%3[Ff]')
    .replace(/#/g, '%23')
    .replace(/[.*+?^${}()|\\]/g, '\\$&');
}
function en({ nodes: t, server_loads: e, dictionary: n, matchers: r }) {
  const a = new Set(e);
  return Object.entries(n).map(([o, [c, l, u]]) => {
    const { pattern: h, params: w } = Xe(o),
      f = {
        id: o,
        exec: (p) => {
          const y = h.exec(p);
          if (y) return tn(y, w, r);
        },
        errors: [1, ...(u || [])].map((p) => t[p]),
        layouts: [0, ...(l || [])].map(i),
        leaf: s(c),
      };
    return (
      (f.errors.length = f.layouts.length =
        Math.max(f.errors.length, f.layouts.length)),
      f
    );
  });
  function s(o) {
    const c = o < 0;
    return (c && (o = ~o), [c, t[o]]);
  }
  function i(o) {
    return o === void 0 ? o : [a.has(o), t[o]];
  }
}
function me(t, e = JSON.parse) {
  try {
    return e(sessionStorage[t]);
  } catch (n) {}
}
function Zt(t, e, n = JSON.stringify) {
  const r = n(e);
  try {
    sessionStorage[t] = r;
  } catch (a) {}
}
var ie, ce;
const P =
  (ce = (ie = globalThis.__sveltekit_84vsk3) == null ? void 0 : ie.base) != null
    ? ce
    : '';
var le, fe;
const nn =
    (fe = (le = globalThis.__sveltekit_84vsk3) == null ? void 0 : le.assets) !=
    null
      ? fe
      : P,
  rn = '1753824203559',
  we = 'sveltekit:snapshot',
  ye = 'sveltekit:scroll',
  _e = 'sveltekit:states',
  an = 'sveltekit:pageurl',
  G = 'sveltekit:history',
  X = 'sveltekit:navigation',
  F = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  ut = location.origin;
function ve(t) {
  if (t instanceof URL) return t;
  let e = document.baseURI;
  if (!e) {
    const n = document.getElementsByTagName('base');
    e = n.length ? n[0].href : document.URL;
  }
  return new URL(t, e);
}
function jt() {
  return { x: pageXOffset, y: pageYOffset };
}
function q(t, e) {
  return t.getAttribute(`data-sveltekit-${e}`);
}
const Qt = { ...F, '': F.hover };
function be(t) {
  var n;
  let e = (n = t.assignedSlot) != null ? n : t.parentNode;
  return ((e == null ? void 0 : e.nodeType) === 11 && (e = e.host), e);
}
function ke(t, e) {
  for (; t && t !== e; ) {
    if (t.nodeName.toUpperCase() === 'A' && t.hasAttribute('href')) return t;
    t = be(t);
  }
}
function xt(t, e, n) {
  let r;
  try {
    if (
      ((r = new URL(
        t instanceof SVGAElement ? t.href.baseVal : t.href,
        document.baseURI,
      )),
      n && r.hash.match(/^#[^/]/))
    ) {
      const o = location.hash.split('#')[1] || '/';
      r.hash = `#${o}${r.hash}`;
    }
  } catch (o) {}
  const a = t instanceof SVGAElement ? t.target.baseVal : t.target,
    s =
      !r ||
      !!a ||
      kt(r, e, n) ||
      (t.getAttribute('rel') || '').split(/\s+/).includes('external'),
    i = (r == null ? void 0 : r.origin) === ut && t.hasAttribute('download');
  return { url: r, external: s, target: a, download: i };
}
function pt(t) {
  let e = null,
    n = null,
    r = null,
    a = null,
    s = null,
    i = null,
    o = t;
  for (; o && o !== document.documentElement; )
    (r === null && (r = q(o, 'preload-code')),
      a === null && (a = q(o, 'preload-data')),
      e === null && (e = q(o, 'keepfocus')),
      n === null && (n = q(o, 'noscroll')),
      s === null && (s = q(o, 'reload')),
      i === null && (i = q(o, 'replacestate')),
      (o = be(o)));
  function c(l) {
    switch (l) {
      case '':
      case 'true':
        return !0;
      case 'off':
      case 'false':
        return !1;
      default:
        return;
    }
  }
  return {
    preload_code: Qt[r != null ? r : 'off'],
    preload_data: Qt[a != null ? a : 'off'],
    keepfocus: c(e),
    noscroll: c(n),
    reload: c(s),
    replace_state: c(i),
  };
}
function te(t) {
  const e = Ot(t);
  let n = !0;
  function r() {
    ((n = !0), e.update((i) => i));
  }
  function a(i) {
    ((n = !1), e.set(i));
  }
  function s(i) {
    let o;
    return e.subscribe((c) => {
      (o === void 0 || (n && c !== o)) && i((o = c));
    });
  }
  return { notify: r, set: a, subscribe: s };
}
const Ae = { v: () => {} };
function on() {
  const { set: t, subscribe: e } = Ot(!1);
  let n;
  async function r() {
    clearTimeout(n);
    try {
      const a = await fetch(`${nn}/_app/version.json`, {
        headers: { pragma: 'no-cache', 'cache-control': 'no-cache' },
      });
      if (!a.ok) return !1;
      const i = (await a.json()).version !== rn;
      return (i && (t(!0), Ae.v(), clearTimeout(n)), i);
    } catch (a) {
      return !1;
    }
  }
  return { subscribe: e, check: r };
}
function kt(t, e, n) {
  return t.origin !== ut || !t.pathname.startsWith(e)
    ? !0
    : n
      ? !(
          t.pathname === e + '/' ||
          t.pathname === e + '/index.html' ||
          (t.protocol === 'file:' &&
            t.pathname.replace(/\/[^/]+\.html?$/, '') === e)
        )
      : !1;
}
function Hn(t) {}
function ee(t) {
  const e = cn(t),
    n = new ArrayBuffer(e.length),
    r = new DataView(n);
  for (let a = 0; a < n.byteLength; a++) r.setUint8(a, e.charCodeAt(a));
  return n;
}
const sn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function cn(t) {
  t.length % 4 === 0 && (t = t.replace(/==?$/, ''));
  let e = '',
    n = 0,
    r = 0;
  for (let a = 0; a < t.length; a++)
    ((n <<= 6),
      (n |= sn.indexOf(t[a])),
      (r += 6),
      r === 24 &&
        ((e += String.fromCharCode((n & 16711680) >> 16)),
        (e += String.fromCharCode((n & 65280) >> 8)),
        (e += String.fromCharCode(n & 255)),
        (n = r = 0)));
  return (
    r === 12
      ? ((n >>= 4), (e += String.fromCharCode(n)))
      : r === 18 &&
        ((n >>= 2),
        (e += String.fromCharCode((n & 65280) >> 8)),
        (e += String.fromCharCode(n & 255))),
    e
  );
}
const ln = -1,
  fn = -2,
  un = -3,
  hn = -4,
  dn = -5,
  pn = -6;
function gn(t, e) {
  if (typeof t == 'number') return a(t, !0);
  if (!Array.isArray(t) || t.length === 0) throw new Error('Invalid input');
  const n = t,
    r = Array(n.length);
  function a(s, i = !1) {
    if (s === ln) return;
    if (s === un) return NaN;
    if (s === hn) return 1 / 0;
    if (s === dn) return -1 / 0;
    if (s === pn) return -0;
    if (i) throw new Error('Invalid input');
    if (s in r) return r[s];
    const o = n[s];
    if (!o || typeof o != 'object') r[s] = o;
    else if (Array.isArray(o))
      if (typeof o[0] == 'string') {
        const c = o[0],
          l = e == null ? void 0 : e[c];
        if (l) return (r[s] = l(a(o[1])));
        switch (c) {
          case 'Date':
            r[s] = new Date(o[1]);
            break;
          case 'Set':
            const u = new Set();
            r[s] = u;
            for (let f = 1; f < o.length; f += 1) u.add(a(o[f]));
            break;
          case 'Map':
            const h = new Map();
            r[s] = h;
            for (let f = 1; f < o.length; f += 2) h.set(a(o[f]), a(o[f + 1]));
            break;
          case 'RegExp':
            r[s] = new RegExp(o[1], o[2]);
            break;
          case 'Object':
            r[s] = Object(o[1]);
            break;
          case 'BigInt':
            r[s] = BigInt(o[1]);
            break;
          case 'null':
            const w = Object.create(null);
            r[s] = w;
            for (let f = 1; f < o.length; f += 2) w[o[f]] = a(o[f + 1]);
            break;
          case 'Int8Array':
          case 'Uint8Array':
          case 'Uint8ClampedArray':
          case 'Int16Array':
          case 'Uint16Array':
          case 'Int32Array':
          case 'Uint32Array':
          case 'Float32Array':
          case 'Float64Array':
          case 'BigInt64Array':
          case 'BigUint64Array': {
            const f = globalThis[c],
              p = o[1],
              y = ee(p),
              d = new f(y);
            r[s] = d;
            break;
          }
          case 'ArrayBuffer': {
            const f = o[1],
              p = ee(f);
            r[s] = p;
            break;
          }
          default:
            throw new Error(`Unknown type ${c}`);
        }
      } else {
        const c = new Array(o.length);
        r[s] = c;
        for (let l = 0; l < o.length; l += 1) {
          const u = o[l];
          u !== fn && (c[l] = a(u));
        }
      }
    else {
      const c = {};
      r[s] = c;
      for (const l in o) {
        const u = o[l];
        c[l] = a(u);
      }
    }
    return r[s];
  }
  return a(0);
}
const Se = new Set([
  'load',
  'prerender',
  'csr',
  'ssr',
  'trailingSlash',
  'config',
]);
[...Se];
const mn = new Set([...Se]);
[...mn];
function wn(t) {
  return t.filter((e) => e != null);
}
class At {
  constructor(e, n) {
    ((this.status = e),
      typeof n == 'string'
        ? (this.body = { message: n })
        : n
          ? (this.body = n)
          : (this.body = { message: `Error: ${e}` }));
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class $t {
  constructor(e, n) {
    ((this.status = e), (this.location = n));
  }
}
class Dt extends Error {
  constructor(e, n, r) {
    (super(r), (this.status = e), (this.text = n));
  }
}
const yn = 'x-sveltekit-invalidated',
  _n = 'x-sveltekit-trailing-slash';
function gt(t) {
  return t instanceof At || t instanceof Dt ? t.status : 500;
}
function vn(t) {
  return t instanceof Dt ? t.text : 'Internal Error';
}
let L, Z, Lt;
const bn =
  Xt.toString().includes('$$') || /function \w+\(\) \{\}/.test(Xt.toString());
var et, nt, rt, at, ot, st, it, ct, ue, lt, he, ft, de;
bn
  ? ((L = {
      data: {},
      form: null,
      error: null,
      params: {},
      route: { id: null },
      state: {},
      status: -1,
      url: new URL('https://example.com'),
    }),
    (Z = { current: null }),
    (Lt = { current: !1 }))
  : ((L = new ((ue = class {
      constructor() {
        C(this, et, O({}));
        C(this, nt, O(null));
        C(this, rt, O(null));
        C(this, at, O({}));
        C(this, ot, O({ id: null }));
        C(this, st, O({}));
        C(this, it, O(-1));
        C(this, ct, O(new URL('https://example.com')));
      }
      get data() {
        return N(A(this, et));
      }
      set data(e) {
        j(A(this, et), e);
      }
      get form() {
        return N(A(this, nt));
      }
      set form(e) {
        j(A(this, nt), e);
      }
      get error() {
        return N(A(this, rt));
      }
      set error(e) {
        j(A(this, rt), e);
      }
      get params() {
        return N(A(this, at));
      }
      set params(e) {
        j(A(this, at), e);
      }
      get route() {
        return N(A(this, ot));
      }
      set route(e) {
        j(A(this, ot), e);
      }
      get state() {
        return N(A(this, st));
      }
      set state(e) {
        j(A(this, st), e);
      }
      get status() {
        return N(A(this, it));
      }
      set status(e) {
        j(A(this, it), e);
      }
      get url() {
        return N(A(this, ct));
      }
      set url(e) {
        j(A(this, ct), e);
      }
    }),
    (et = new WeakMap()),
    (nt = new WeakMap()),
    (rt = new WeakMap()),
    (at = new WeakMap()),
    (ot = new WeakMap()),
    (st = new WeakMap()),
    (it = new WeakMap()),
    (ct = new WeakMap()),
    ue)()),
    (Z = new ((he = class {
      constructor() {
        C(this, lt, O(null));
      }
      get current() {
        return N(A(this, lt));
      }
      set current(e) {
        j(A(this, lt), e);
      }
    }),
    (lt = new WeakMap()),
    he)()),
    (Lt = new ((de = class {
      constructor() {
        C(this, ft, O(!1));
      }
      get current() {
        return N(A(this, ft));
      }
      set current(e) {
        j(A(this, ft), e);
      }
    }),
    (ft = new WeakMap()),
    de)()),
    (Ae.v = () => (Lt.current = !0)));
function kn(t) {
  Object.assign(L, t);
}
const An = '/__data.json',
  Sn = '.html__data.json';
function En(t) {
  return t.endsWith('.html')
    ? t.replace(/\.html$/, Sn)
    : t.replace(/\/$/, '') + An;
}
const Rn = new Set(['icon', 'shortcut icon', 'apple-touch-icon']);
var pe;
const M = (pe = me(ye)) != null ? pe : {};
var ge;
const Q = (ge = me(we)) != null ? ge : {},
  D = { url: te({}), page: te({}), navigating: Ot(null), updated: on() };
function Vt(t) {
  M[t] = jt();
}
function In(t, e) {
  let n = t + 1;
  for (; M[n]; ) (delete M[n], (n += 1));
  for (n = e + 1; Q[n]; ) (delete Q[n], (n += 1));
}
function K(t) {
  return ((location.href = t.href), new Promise(() => {}));
}
async function Ee() {
  if ('serviceWorker' in navigator) {
    const t = await navigator.serviceWorker.getRegistration(P || '/');
    t && (await t.update());
  }
}
function ne() {}
let Ft, Pt, mt, $, Ct, S;
const wt = [],
  yt = [];
let T = null;
const ht = new Map(),
  Re = new Set(),
  Un = new Set(),
  z = new Set();
let b = { branch: [], error: null, url: null },
  Bt = !1,
  _t = !1,
  re = !0,
  tt = !1,
  W = !1,
  Ie = !1,
  Mt = !1,
  Ue,
  I,
  x,
  B;
const J = new Set();
async function zn(t, e, n) {
  var a, s, i, o;
  (document.URL !== location.href && (location.href = location.href),
    (S = t),
    await ((s = (a = t.hooks).init) == null ? void 0 : s.call(a)),
    (Ft = en(t)),
    ($ = e),
    (Ct = e),
    (Pt = t.nodes[0]),
    (mt = t.nodes[1]),
    Pt(),
    mt(),
    (I = (i = history.state) == null ? void 0 : i[G]),
    (x = (o = history.state) == null ? void 0 : o[X]),
    I ||
      ((I = x = Date.now()),
      history.replaceState({ ...history.state, [G]: I, [X]: x }, '')));
  const r = M[I];
  (r && ((history.scrollRestoration = 'manual'), scrollTo(r.x, r.y)),
    n
      ? await Vn(Ct, n)
      : await jn(S.hash ? Bn(new URL(location.href)) : location.href, {
          replaceState: !0,
        }),
    Dn());
}
function Ln() {
  ((wt.length = 0), (Mt = !1));
}
function Le(t) {
  yt.some((e) => (e == null ? void 0 : e.snapshot)) &&
    (Q[t] = yt.map((e) => {
      var n;
      return (n = e == null ? void 0 : e.snapshot) == null
        ? void 0
        : n.capture();
    }));
}
function Te(t) {
  var e;
  (e = Q[t]) == null ||
    e.forEach((n, r) => {
      var a, s;
      (s = (a = yt[r]) == null ? void 0 : a.snapshot) == null || s.restore(n);
    });
}
function ae() {
  (Vt(I), Zt(ye, M), Le(x), Zt(we, Q));
}
async function qt(t, e, n, r) {
  return dt({
    type: 'goto',
    url: ve(t),
    keepfocus: e.keepFocus,
    noscroll: e.noScroll,
    replace_state: e.replaceState,
    state: e.state,
    redirect_count: n,
    nav_token: r,
    accept: () => {
      (e.invalidateAll && (Mt = !0), e.invalidate && e.invalidate.forEach($n));
    },
  });
}
async function Tn(t) {
  if (t.id !== (T == null ? void 0 : T.id)) {
    const e = {};
    (J.add(e),
      (T = {
        id: t.id,
        token: e,
        promise: Ce({ ...t, preload: e }).then(
          (n) => (
            J.delete(e),
            n.type === 'loaded' && n.state.error && (T = null),
            n
          ),
        ),
      }));
  }
  return T.promise;
}
async function Tt(t) {
  var n;
  const e = (n = await Kt(t, !1)) == null ? void 0 : n.route;
  e &&
    (await Promise.all(
      [...e.layouts, e.leaf].map((r) => (r == null ? void 0 : r[1]())),
    ));
}
function xe(t, e, n) {
  var s, i;
  b = t.state;
  const r = document.querySelector('style[data-sveltekit]');
  (r && r.remove(),
    Object.assign(L, t.props.page),
    (Ue = new S.root({
      target: e,
      props: { ...t.props, stores: D, components: yt },
      hydrate: n,
      sync: !1,
    })),
    Te(x));
  const a = {
    from: null,
    to: {
      params: b.params,
      route: {
        id: (i = (s = b.route) == null ? void 0 : s.id) != null ? i : null,
      },
      url: new URL(location.href),
    },
    willUnload: !1,
    type: 'enter',
    complete: Promise.resolve(),
  };
  (z.forEach((o) => o(a)), (_t = !0));
}
function vt({
  url: t,
  params: e,
  branch: n,
  status: r,
  error: a,
  route: s,
  form: i,
}) {
  var f;
  let o = 'never';
  if (P && (t.pathname === P || t.pathname === P + '/')) o = 'always';
  else
    for (const p of n)
      (p == null ? void 0 : p.slash) !== void 0 && (o = p.slash);
  ((t.pathname = Be(t.pathname, o)), (t.search = t.search));
  const c = {
    type: 'loaded',
    state: { url: t, params: e, branch: n, error: a, route: s },
    props: { constructors: wn(n).map((p) => p.node.component), page: Wt(L) },
  };
  i !== void 0 && (c.props.form = i);
  let l = {},
    u = !L,
    h = 0;
  for (let p = 0; p < Math.max(n.length, b.branch.length); p += 1) {
    const y = n[p],
      d = b.branch[p];
    ((y == null ? void 0 : y.data) !== (d == null ? void 0 : d.data) &&
      (u = !0),
      y &&
        ((l = { ...l, ...y.data }), u && (c.props[`data_${h}`] = l), (h += 1)));
  }
  return (
    (!b.url ||
      t.href !== b.url.href ||
      b.error !== a ||
      (i !== void 0 && i !== L.form) ||
      u) &&
      (c.props.page = {
        error: a,
        params: e,
        route: { id: (f = s == null ? void 0 : s.id) != null ? f : null },
        state: {},
        status: r,
        url: new URL(t),
        form: i != null ? i : null,
        data: u ? l : L.data,
      }),
    c
  );
}
async function Gt({
  loader: t,
  parent: e,
  url: n,
  params: r,
  route: a,
  server_data_node: s,
}) {
  var u, h, w, f, p, y, d;
  let i = null,
    o = !0;
  const c = {
      dependencies: new Set(),
      params: new Set(),
      parent: !1,
      route: !1,
      url: !1,
      search_params: new Set(),
    },
    l = await t();
  if ((u = l.universal) != null && u.load) {
    let v = function (...m) {
      for (const E of m) {
        const { href: g } = new URL(E, n);
        c.dependencies.add(g);
      }
    };
    const U = {
      route: new Proxy(a, { get: (m, E) => (o && (c.route = !0), m[E]) }),
      params: new Proxy(r, { get: (m, E) => (o && c.params.add(E), m[E]) }),
      data: (h = s == null ? void 0 : s.data) != null ? h : null,
      url: Ge(
        n,
        () => {
          o && (c.url = !0);
        },
        (m) => {
          o && c.search_params.add(m);
        },
        S.hash,
      ),
      async fetch(m, E) {
        m instanceof Request &&
          (E = {
            body:
              m.method === 'GET' || m.method === 'HEAD'
                ? void 0
                : await m.blob(),
            cache: m.cache,
            credentials: m.credentials,
            headers: [...m.headers].length ? m.headers : void 0,
            integrity: m.integrity,
            keepalive: m.keepalive,
            method: m.method,
            mode: m.mode,
            redirect: m.redirect,
            referrer: m.referrer,
            referrerPolicy: m.referrerPolicy,
            signal: m.signal,
            ...E,
          });
        const { resolved: g, promise: _ } = Pe(m, E, n);
        return (o && v(g.href), _);
      },
      setHeaders: () => {},
      depends: v,
      parent() {
        return (o && (c.parent = !0), e());
      },
      untrack(m) {
        o = !1;
        try {
          return m();
        } finally {
          o = !0;
        }
      },
    };
    i = (w = await l.universal.load.call(null, U)) != null ? w : null;
  }
  return {
    node: l,
    loader: t,
    server: s,
    universal:
      (f = l.universal) != null && f.load
        ? { type: 'data', data: i, uses: c }
        : null,
    data: (p = i != null ? i : s == null ? void 0 : s.data) != null ? p : null,
    slash:
      (d = (y = l.universal) == null ? void 0 : y.trailingSlash) != null
        ? d
        : s == null
          ? void 0
          : s.slash,
  };
}
function Pe(t, e, n) {
  let r = t instanceof Request ? t.url : t;
  const a = new URL(r, n);
  a.origin === n.origin && (r = a.href.slice(n.origin.length));
  const s = _t ? ze(r, a.href, e) : Ye(r, e);
  return { resolved: a, promise: s };
}
function oe(t, e, n, r, a, s) {
  if (Mt) return !0;
  if (!a) return !1;
  if ((a.parent && t) || (a.route && e) || (a.url && n)) return !0;
  for (const i of a.search_params) if (r.has(i)) return !0;
  for (const i of a.params) if (s[i] !== b.params[i]) return !0;
  for (const i of a.dependencies) if (wt.some((o) => o(new URL(i)))) return !0;
  return !1;
}
function Ht(t, e) {
  return (t == null ? void 0 : t.type) === 'data'
    ? t
    : (t == null ? void 0 : t.type) === 'skip' && e != null
      ? e
      : null;
}
function xn(t, e) {
  if (!t) return new Set(e.searchParams.keys());
  const n = new Set([...t.searchParams.keys(), ...e.searchParams.keys()]);
  for (const r of n) {
    const a = t.searchParams.getAll(r),
      s = e.searchParams.getAll(r);
    a.every((i) => s.includes(i)) &&
      s.every((i) => a.includes(i)) &&
      n.delete(r);
  }
  return n;
}
function se({ error: t, url: e, route: n, params: r }) {
  return {
    type: 'loaded',
    state: { error: t, url: e, route: n, params: r, branch: [] },
    props: { page: Wt(L), constructors: [] },
  };
}
async function Ce({
  id: t,
  invalidating: e,
  url: n,
  params: r,
  route: a,
  preload: s,
}) {
  var E;
  if ((T == null ? void 0 : T.id) === t) return (J.delete(T.token), T.promise);
  const { errors: i, layouts: o, leaf: c } = a,
    l = [...o, c];
  (i.forEach((g) => (g == null ? void 0 : g().catch(() => {}))),
    l.forEach((g) => (g == null ? void 0 : g[1]().catch(() => {}))));
  let u = null;
  const h = b.url ? t !== bt(b.url) : !1,
    w = b.route ? a.id !== b.route.id : !1,
    f = xn(b.url, n);
  let p = !1;
  const y = l.map((g, _) => {
    var V;
    const k = b.branch[_],
      R =
        !!(g != null && g[0]) &&
        ((k == null ? void 0 : k.loader) !== g[1] ||
          oe(p, w, h, f, (V = k.server) == null ? void 0 : V.uses, r));
    return (R && (p = !0), R);
  });
  if (y.some(Boolean)) {
    try {
      u = await je(n, y);
    } catch (g) {
      const _ = await H(g, { url: n, params: r, route: { id: t } });
      return J.has(s)
        ? se({ error: _, url: n, params: r, route: a })
        : St({ status: gt(g), error: _, url: n, route: a });
    }
    if (u.type === 'redirect') return u;
  }
  const d = u == null ? void 0 : u.nodes;
  let v = !1;
  const U = l.map(async (g, _) => {
    var Et;
    if (!g) return;
    const k = b.branch[_],
      R = d == null ? void 0 : d[_];
    if (
      (!R || R.type === 'skip') &&
      g[1] === (k == null ? void 0 : k.loader) &&
      !oe(v, w, h, f, (Et = k.universal) == null ? void 0 : Et.uses, r)
    )
      return k;
    if (((v = !0), (R == null ? void 0 : R.type) === 'error')) throw R;
    return Gt({
      loader: g[1],
      url: n,
      params: r,
      route: a,
      parent: async () => {
        var zt;
        const Yt = {};
        for (let Rt = 0; Rt < _; Rt += 1)
          Object.assign(Yt, (zt = await U[Rt]) == null ? void 0 : zt.data);
        return Yt;
      },
      server_data_node: Ht(
        R === void 0 && g[0] ? { type: 'skip' } : R != null ? R : null,
        g[0] ? (k == null ? void 0 : k.server) : void 0,
      ),
    });
  });
  for (const g of U) g.catch(() => {});
  const m = [];
  for (let g = 0; g < l.length; g += 1)
    if (l[g])
      try {
        m.push(await U[g]);
      } catch (_) {
        if (_ instanceof $t) return { type: 'redirect', location: _.location };
        if (J.has(s))
          return se({
            error: await H(_, { params: r, url: n, route: { id: a.id } }),
            url: n,
            params: r,
            route: a,
          });
        let k = gt(_),
          R;
        if (d != null && d.includes(_))
          ((k = (E = _.status) != null ? E : k), (R = _.error));
        else if (_ instanceof At) R = _.body;
        else {
          if (await D.updated.check()) return (await Ee(), await K(n));
          R = await H(_, { params: r, url: n, route: { id: a.id } });
        }
        const V = await Pn(g, m, i);
        return V
          ? vt({
              url: n,
              params: r,
              branch: m.slice(0, V.idx).concat(V.node),
              status: k,
              error: R,
              route: a,
            })
          : await Ne(n, { id: a.id }, R, k);
      }
    else m.push(void 0);
  return vt({
    url: n,
    params: r,
    branch: m,
    status: 200,
    error: null,
    route: a,
    form: e ? void 0 : null,
  });
}
async function Pn(t, e, n) {
  for (; t--; )
    if (n[t]) {
      let r = t;
      for (; !e[r]; ) r -= 1;
      try {
        return {
          idx: r + 1,
          node: {
            node: await n[t](),
            loader: n[t],
            data: {},
            server: null,
            universal: null,
          },
        };
      } catch (a) {
        continue;
      }
    }
}
async function St({ status: t, error: e, url: n, route: r }) {
  var o;
  const a = {};
  let s = null;
  if (S.server_loads[0] === 0)
    try {
      const c = await je(n, [!0]);
      if (c.type !== 'data' || (c.nodes[0] && c.nodes[0].type !== 'data'))
        throw 0;
      s = (o = c.nodes[0]) != null ? o : null;
    } catch (c) {
      (n.origin !== ut || n.pathname !== location.pathname || Bt) &&
        (await K(n));
    }
  try {
    const c = await Gt({
        loader: Pt,
        url: n,
        params: a,
        route: r,
        parent: () => Promise.resolve({}),
        server_data_node: Ht(s),
      }),
      l = {
        node: await mt(),
        loader: mt,
        universal: null,
        server: null,
        data: null,
      };
    return vt({
      url: n,
      params: a,
      branch: [c, l],
      status: t,
      error: e,
      route: null,
    });
  } catch (c) {
    if (c instanceof $t) return qt(new URL(c.location, location.href), {}, 0);
    throw c;
  }
}
async function Cn(t) {
  const e = t.href;
  if (ht.has(e)) return ht.get(e);
  let n;
  try {
    const r = (async () => {
      var s;
      let a =
        (s = await S.hooks.reroute({
          url: new URL(t),
          fetch: async (i, o) => Pe(i, o, t).promise,
        })) != null
          ? s
          : t;
      if (typeof a == 'string') {
        const i = new URL(t);
        (S.hash ? (i.hash = a) : (i.pathname = a), (a = i));
      }
      return a;
    })();
    (ht.set(e, r), (n = await r));
  } catch (r) {
    ht.delete(e);
    return;
  }
  return n;
}
async function Kt(t, e) {
  if (t && !kt(t, P, S.hash)) {
    const n = await Cn(t);
    if (!n) return;
    const r = On(n);
    for (const a of Ft) {
      const s = a.exec(r);
      if (s)
        return { id: bt(t), invalidating: e, route: a, params: qe(s), url: t };
    }
  }
}
function On(t) {
  return (
    Me(
      S.hash
        ? t.hash.replace(/^#/, '').replace(/[?#].+/, '')
        : t.pathname.slice(P.length),
    ) || '/'
  );
}
function bt(t) {
  return (S.hash ? t.hash.replace(/^#/, '') : t.pathname) + t.search;
}
function Oe({ url: t, type: e, intent: n, delta: r }) {
  let a = !1;
  const s = De(b, n, t, e);
  r !== void 0 && (s.navigation.delta = r);
  const i = {
    ...s.navigation,
    cancel: () => {
      ((a = !0), s.reject(new Error('navigation cancelled')));
    },
  };
  return (tt || Re.forEach((o) => o(i)), a ? null : s);
}
async function dt({
  type: t,
  url: e,
  popped: n,
  keepfocus: r,
  noscroll: a,
  replace_state: s,
  state: i = {},
  redirect_count: o = 0,
  nav_token: c = {},
  accept: l = ne,
  block: u = ne,
}) {
  var E;
  const h = B;
  B = c;
  const w = await Kt(e, !1),
    f = Oe({ url: e, type: t, delta: n == null ? void 0 : n.delta, intent: w });
  if (!f) {
    (u(), B === c && (B = h));
    return;
  }
  const p = I,
    y = x;
  (l(), (tt = !0), _t && D.navigating.set((Z.current = f.navigation)));
  let d = w && (await Ce(w));
  if (!d) {
    if (kt(e, P, S.hash)) return await K(e);
    d = await Ne(
      e,
      { id: null },
      await H(new Dt(404, 'Not Found', `Not found: ${e.pathname}`), {
        url: e,
        params: {},
        route: { id: null },
      }),
      404,
    );
  }
  if (((e = (w == null ? void 0 : w.url) || e), B !== c))
    return (f.reject(new Error('navigation aborted')), !1);
  if (d.type === 'redirect')
    if (o >= 20)
      d = await St({
        status: 500,
        error: await H(new Error('Redirect loop'), {
          url: e,
          params: {},
          route: { id: null },
        }),
        url: e,
        route: { id: null },
      });
    else return (await qt(new URL(d.location, e).href, {}, o + 1, c), !1);
  else
    d.props.page.status >= 400 &&
      (await D.updated.check()) &&
      (await Ee(), await K(e));
  if (
    (Ln(),
    Vt(p),
    Le(y),
    d.props.page.url.pathname !== e.pathname &&
      (e.pathname = d.props.page.url.pathname),
    (i = n ? n.state : i),
    !n)
  ) {
    const g = s ? 0 : 1,
      _ = { [G]: (I += g), [X]: (x += g), [_e]: i };
    ((s ? history.replaceState : history.pushState).call(history, _, '', e),
      s || In(I, x));
  }
  if (((T = null), (d.props.page.state = i), _t)) {
    ((b = d.state), d.props.page && (d.props.page.url = e));
    const g = (
      await Promise.all(Array.from(Un, (_) => _(f.navigation)))
    ).filter((_) => typeof _ == 'function');
    if (g.length > 0) {
      let _ = function () {
        g.forEach((k) => {
          z.delete(k);
        });
      };
      (g.push(_),
        g.forEach((k) => {
          z.add(k);
        }));
    }
    (Ue.$set(d.props), kn(d.props.page), (Ie = !0));
  } else xe(d, Ct, !1);
  const { activeElement: v } = document;
  await Fe();
  const U = n ? n.scroll : a ? jt() : null;
  if (re) {
    const g =
      e.hash &&
      document.getElementById(
        decodeURIComponent(
          S.hash
            ? (E = e.hash.split('#')[2]) != null
              ? E
              : ''
            : e.hash.slice(1),
        ),
      );
    U ? scrollTo(U.x, U.y) : g ? g.scrollIntoView() : scrollTo(0, 0);
  }
  const m =
    document.activeElement !== v && document.activeElement !== document.body;
  (!r && !m && Fn(),
    (re = !0),
    d.props.page && Object.assign(L, d.props.page),
    (tt = !1),
    t === 'popstate' && Te(x),
    f.fulfil(void 0),
    z.forEach((g) => g(f.navigation)),
    D.navigating.set((Z.current = null)));
}
async function Ne(t, e, n, r) {
  return t.origin === ut && t.pathname === location.pathname && !Bt
    ? await St({ status: r, error: n, url: t, route: e })
    : await K(t);
}
function Nn() {
  let t, e, n;
  $.addEventListener('mousemove', (o) => {
    const c = o.target;
    (clearTimeout(t),
      (t = setTimeout(() => {
        s(c, F.hover);
      }, 20)));
  });
  function r(o) {
    o.defaultPrevented || s(o.composedPath()[0], F.tap);
  }
  ($.addEventListener('mousedown', r),
    $.addEventListener('touchstart', r, { passive: !0 }));
  const a = new IntersectionObserver(
    (o) => {
      for (const c of o)
        c.isIntersecting && (Tt(new URL(c.target.href)), a.unobserve(c.target));
    },
    { threshold: 0 },
  );
  async function s(o, c) {
    const l = ke(o, $),
      u = l === e && c >= n;
    if (!l || u) return;
    const { url: h, external: w, download: f } = xt(l, P, S.hash);
    if (w || f) return;
    const p = pt(l),
      y = h && bt(b.url) === bt(h);
    if (!(p.reload || y))
      if (c <= p.preload_data) {
        ((e = l), (n = F.tap));
        const d = await Kt(h, !1);
        if (!d) return;
        Tn(d);
      } else c <= p.preload_code && ((e = l), (n = c), Tt(h));
  }
  function i() {
    a.disconnect();
    for (const o of $.querySelectorAll('a')) {
      const { url: c, external: l, download: u } = xt(o, P, S.hash);
      if (l || u) continue;
      const h = pt(o);
      h.reload ||
        (h.preload_code === F.viewport && a.observe(o),
        h.preload_code === F.eager && Tt(c));
    }
  }
  (z.add(i), i());
}
function H(t, e) {
  var a;
  if (t instanceof At) return t.body;
  const n = gt(t),
    r = vn(t);
  return (a = S.hooks.handleError({
    error: t,
    event: e,
    status: n,
    message: r,
  })) != null
    ? a
    : { message: r };
}
function jn(t, e = {}) {
  return (
    (t = new URL(ve(t))),
    t.origin !== ut
      ? Promise.reject(new Error('goto: invalid URL'))
      : qt(t, e, 0)
  );
}
function $n(t) {
  if (typeof t == 'function') wt.push(t);
  else {
    const { href: e } = new URL(t, location.href);
    wt.push((n) => n.href === e);
  }
}
function Dn() {
  var e;
  ((history.scrollRestoration = 'manual'),
    addEventListener('beforeunload', (n) => {
      let r = !1;
      if ((ae(), !tt)) {
        const a = De(b, void 0, null, 'leave'),
          s = {
            ...a.navigation,
            cancel: () => {
              ((r = !0), a.reject(new Error('navigation cancelled')));
            },
          };
        Re.forEach((i) => i(s));
      }
      r
        ? (n.preventDefault(), (n.returnValue = ''))
        : (history.scrollRestoration = 'auto');
    }),
    addEventListener('visibilitychange', () => {
      document.visibilityState === 'hidden' && ae();
    }),
    ((e = navigator.connection) != null && e.saveData) || Nn(),
    $.addEventListener('click', async (n) => {
      var f;
      if (
        n.button ||
        n.which !== 1 ||
        n.metaKey ||
        n.ctrlKey ||
        n.shiftKey ||
        n.altKey ||
        n.defaultPrevented
      )
        return;
      const r = ke(n.composedPath()[0], $);
      if (!r) return;
      const { url: a, external: s, target: i, download: o } = xt(r, P, S.hash);
      if (!a) return;
      if (i === '_parent' || i === '_top') {
        if (window.parent !== window) return;
      } else if (i && i !== '_self') return;
      const c = pt(r);
      if (
        (!(r instanceof SVGAElement) &&
          a.protocol !== location.protocol &&
          !(a.protocol === 'https:' || a.protocol === 'http:')) ||
        o
      )
        return;
      const [u, h] = (S.hash ? a.hash.replace(/^#/, '') : a.href).split('#'),
        w = u === It(location);
      if (s || (c.reload && (!w || !h))) {
        Oe({ url: a, type: 'link' }) ? (tt = !0) : n.preventDefault();
        return;
      }
      if (h !== void 0 && w) {
        const [, p] = b.url.href.split('#');
        if (p === h) {
          if (
            (n.preventDefault(),
            h === '' ||
              (h === 'top' && r.ownerDocument.getElementById('top') === null))
          )
            window.scrollTo({ top: 0 });
          else {
            const y = r.ownerDocument.getElementById(decodeURIComponent(h));
            y && (y.scrollIntoView(), y.focus());
          }
          return;
        }
        if (((W = !0), Vt(I), t(a), !c.replace_state)) return;
        W = !1;
      }
      (n.preventDefault(),
        await new Promise((p) => {
          (requestAnimationFrame(() => {
            setTimeout(p, 0);
          }),
            setTimeout(p, 100));
        }),
        await dt({
          type: 'link',
          url: a,
          keepfocus: c.keepfocus,
          noscroll: c.noscroll,
          replace_state:
            (f = c.replace_state) != null ? f : a.href === location.href,
        }));
    }),
    $.addEventListener('submit', (n) => {
      var w, f;
      if (n.defaultPrevented) return;
      const r = HTMLFormElement.prototype.cloneNode.call(n.target),
        a = n.submitter;
      if (
        ((a == null ? void 0 : a.formTarget) || r.target) === '_blank' ||
        ((a == null ? void 0 : a.formMethod) || r.method) !== 'get'
      )
        return;
      const o = new URL(
        ((a == null ? void 0 : a.hasAttribute('formaction')) &&
          (a == null ? void 0 : a.formAction)) ||
          r.action,
      );
      if (kt(o, P, !1)) return;
      const c = n.target,
        l = pt(c);
      if (l.reload) return;
      (n.preventDefault(), n.stopPropagation());
      const u = new FormData(c),
        h = a == null ? void 0 : a.getAttribute('name');
      (h &&
        u.append(
          h,
          (w = a == null ? void 0 : a.getAttribute('value')) != null ? w : '',
        ),
        (o.search = new URLSearchParams(u).toString()),
        dt({
          type: 'form',
          url: o,
          keepfocus: l.keepfocus,
          noscroll: l.noscroll,
          replace_state:
            (f = l.replace_state) != null ? f : o.href === location.href,
        }));
    }),
    addEventListener('popstate', async (n) => {
      var r, a, s;
      if ((r = n.state) != null && r[G]) {
        const i = n.state[G];
        if (((B = {}), i === I)) return;
        const o = M[i],
          c = (a = n.state[_e]) != null ? a : {},
          l = new URL((s = n.state[an]) != null ? s : location.href),
          u = n.state[X],
          h = b.url ? It(location) === It(b.url) : !1;
        if (u === x && (Ie || h)) {
          (c !== L.state && (L.state = c),
            t(l),
            (M[I] = jt()),
            o && scrollTo(o.x, o.y),
            (I = i));
          return;
        }
        const f = i - I;
        await dt({
          type: 'popstate',
          url: l,
          popped: { state: c, scroll: o, delta: f },
          accept: () => {
            ((I = i), (x = u));
          },
          block: () => {
            history.go(-f);
          },
          nav_token: B,
        });
      } else if (!W) {
        const i = new URL(location.href);
        (t(i), S.hash && location.reload());
      }
    }),
    addEventListener('hashchange', () => {
      W &&
        ((W = !1),
        history.replaceState(
          { ...history.state, [G]: ++I, [X]: x },
          '',
          location.href,
        ));
    }));
  for (const n of document.querySelectorAll('link'))
    Rn.has(n.rel) && (n.href = n.href);
  addEventListener('pageshow', (n) => {
    n.persisted && D.navigating.set((Z.current = null));
  });
  function t(n) {
    ((b.url = L.url = n), D.page.set(Wt(L)), D.page.notify());
  }
}
async function Vn(
  t,
  {
    status: e = 200,
    error: n,
    node_ids: r,
    params: a,
    route: s,
    server_route: i,
    data: o,
    form: c,
  },
) {
  Bt = !0;
  const l = new URL(location.href);
  let u;
  u = Ft.find(({ id: f }) => f === s.id);
  let h,
    w = !0;
  try {
    const f = r.map(async (y, d) => {
        const v = o[d];
        return (
          v != null && v.uses && (v.uses = $e(v.uses)),
          Gt({
            loader: S.nodes[y],
            url: l,
            params: a,
            route: s,
            parent: async () => {
              const U = {};
              for (let m = 0; m < d; m += 1)
                Object.assign(U, (await f[m]).data);
              return U;
            },
            server_data_node: Ht(v),
          })
        );
      }),
      p = await Promise.all(f);
    if (u) {
      const y = u.layouts;
      for (let d = 0; d < y.length; d++) y[d] || p.splice(d, 0, void 0);
    }
    h = vt({
      url: l,
      params: a,
      branch: p,
      status: e,
      error: n,
      form: c,
      route: u != null ? u : null,
    });
  } catch (f) {
    if (f instanceof $t) {
      await K(new URL(f.location, location.href));
      return;
    }
    ((h = await St({
      status: gt(f),
      error: await H(f, { url: l, params: a, route: s }),
      url: l,
      route: s,
    })),
      (t.textContent = ''),
      (w = !1));
  }
  (h.props.page && (h.props.page.state = {}), xe(h, t, w));
}
async function je(t, e) {
  var s;
  const n = new URL(t);
  ((n.pathname = En(t.pathname)),
    t.pathname.endsWith('/') && n.searchParams.append(_n, '1'),
    n.searchParams.append(yn, e.map((i) => (i ? '1' : '0')).join('')));
  const r = window.fetch,
    a = await r(n.href, {});
  if (!a.ok) {
    let i;
    throw (
      (s = a.headers.get('content-type')) != null &&
      s.includes('application/json')
        ? (i = await a.json())
        : a.status === 404
          ? (i = 'Not Found')
          : a.status === 500 && (i = 'Internal Error'),
      new At(a.status, i)
    );
  }
  return new Promise(async (i) => {
    var w;
    const o = new Map(),
      c = a.body.getReader(),
      l = new TextDecoder();
    function u(f) {
      return gn(f, {
        ...S.decoders,
        Promise: (p) =>
          new Promise((y, d) => {
            o.set(p, { fulfil: y, reject: d });
          }),
      });
    }
    let h = '';
    for (;;) {
      const { done: f, value: p } = await c.read();
      if (f && !h) break;
      for (
        h +=
          !p && h
            ? `
`
            : l.decode(p, { stream: !0 });
        ;

      ) {
        const y = h.indexOf(`
`);
        if (y === -1) break;
        const d = JSON.parse(h.slice(0, y));
        if (((h = h.slice(y + 1)), d.type === 'redirect')) return i(d);
        if (d.type === 'data')
          ((w = d.nodes) == null ||
            w.forEach((v) => {
              (v == null ? void 0 : v.type) === 'data' &&
                ((v.uses = $e(v.uses)), (v.data = u(v.data)));
            }),
            i(d));
        else if (d.type === 'chunk') {
          const { id: v, data: U, error: m } = d,
            E = o.get(v);
          (o.delete(v), m ? E.reject(u(m)) : E.fulfil(u(U)));
        }
      }
    }
  });
}
function $e(t) {
  var e, n, r;
  return {
    dependencies: new Set(
      (e = t == null ? void 0 : t.dependencies) != null ? e : [],
    ),
    params: new Set((n = t == null ? void 0 : t.params) != null ? n : []),
    parent: !!(t != null && t.parent),
    route: !!(t != null && t.route),
    url: !!(t != null && t.url),
    search_params: new Set(
      (r = t == null ? void 0 : t.search_params) != null ? r : [],
    ),
  };
}
function Fn() {
  const t = document.querySelector('[autofocus]');
  if (t) t.focus();
  else {
    const e = document.body,
      n = e.getAttribute('tabindex');
    ((e.tabIndex = -1),
      e.focus({ preventScroll: !0, focusVisible: !1 }),
      n !== null
        ? e.setAttribute('tabindex', n)
        : e.removeAttribute('tabindex'));
    const r = getSelection();
    if (r && r.type !== 'None') {
      const a = [];
      for (let s = 0; s < r.rangeCount; s += 1) a.push(r.getRangeAt(s));
      setTimeout(() => {
        if (r.rangeCount === a.length) {
          for (let s = 0; s < r.rangeCount; s += 1) {
            const i = a[s],
              o = r.getRangeAt(s);
            if (
              i.commonAncestorContainer !== o.commonAncestorContainer ||
              i.startContainer !== o.startContainer ||
              i.endContainer !== o.endContainer ||
              i.startOffset !== o.startOffset ||
              i.endOffset !== o.endOffset
            )
              return;
          }
          r.removeAllRanges();
        }
      });
    }
  }
}
function De(t, e, n, r) {
  var c, l, u, h, w;
  let a, s;
  const i = new Promise((f, p) => {
    ((a = f), (s = p));
  });
  return (
    i.catch(() => {}),
    {
      navigation: {
        from: {
          params: t.params,
          route: {
            id: (l = (c = t.route) == null ? void 0 : c.id) != null ? l : null,
          },
          url: t.url,
        },
        to: n && {
          params: (u = e == null ? void 0 : e.params) != null ? u : null,
          route: {
            id:
              (w =
                (h = e == null ? void 0 : e.route) == null ? void 0 : h.id) !=
              null
                ? w
                : null,
          },
          url: n,
        },
        willUnload: !e,
        type: r,
        complete: i,
      },
      fulfil: a,
      reject: s,
    }
  );
}
function Wt(t) {
  return {
    data: t.data,
    error: t.error,
    form: t.form,
    params: t.params,
    route: t.route,
    state: t.state,
    status: t.status,
    url: t.url,
  };
}
function Bn(t) {
  const e = new URL(t);
  return ((e.hash = decodeURIComponent(t.hash)), e);
}
export { zn as a, Hn as l, L as p, D as s };
