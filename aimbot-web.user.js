// ==UserScript==
// @name         aimbot-web
// @namespace    aimbot-web
// @version      0.1.0
// @description  Aimbot para juegos web/WebView con estado JSON por REST o WebSocket
// @match        https://hyper-eknv.onrender.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const KEY = 'aimbot-web:cfg';
  const DEFAULTS = {
    enabled: false, output: 'touch', fov: 12, maxDistance: 120, sort: 'angle',
    sticky: 0.35, requireVisible: true, ignoreTeammates: true, prediction: 0.85,
    projectileSpeed: 0, smooth: 0.55, maxTurn: 900, jitter: 0.15, reactionMs: 60,
    triggerbot: false, triggerFov: 0.6, overlay: true, panelOpen: true, wsAimMessage: null,
  };
  const cfg = (() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
    catch { return { ...DEFAULTS }; }
  })();
  const save = () => {
    const { panelOpen, ...rest } = cfg;
    localStorage.setItem(KEY, JSON.stringify(rest));
  };

  const RAD = Math.PI / 180;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const wrapPi = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
  const angleDiff = (f, t) => wrapPi(t - f);
  const dist2 = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
  const dist3 = (a, b) => Math.hypot(b.x - a.x, b.y - a.y, (b.z ?? 0) - (a.z ?? 0));
  const gauss = (s = 1) => {
    let u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * s;
  };
  const mulMV = (m, v) => [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
    m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3],
  ];
  function worldToScreen(p, view, proj, w, h) {
    const c = mulMV(proj, mulMV(view, [p.x, p.y, p.z, 1]));
    if (c[3] <= 1e-4) return null;
    return { x: (c[0] / c[3] * 0.5 + 0.5) * w, y: (1 - (c[1] / c[3] * 0.5 + 0.5)) * h };
  }

  const pick = (o, ...k) => { if (!o) return; for (const x of k) if (o[x] !== undefined) return o[x]; };
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

  // TODO: ajusta los nombres de campo a los de TU servidor
  function adapt(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const me = pick(raw, 'me', 'self', 'player', 'you');
    const list = pick(raw, 'enemies', 'players', 'entities', 'actors', 'units');
    if (!me || !Array.isArray(list)) return null;

    const self = {
      x: num(pick(me, 'x', 'px')), y: num(pick(me, 'y', 'py')),
      z: num(pick(me, 'z', 'pz')) ?? 0,
      yaw: num(pick(me, 'yaw', 'angle', 'heading')),
      pitch: num(pick(me, 'pitch')) ?? 0,
      team: pick(me, 'team', 'side'), screen: pick(me, 'screen', 'screenPos'),
    };
    if (self.x === undefined || self.y === undefined) return null;

    const enemies = [];
    for (const e of list) {
      const x = num(pick(e, 'x', 'px')), y = num(pick(e, 'y', 'py'));
      if (x === undefined || y === undefined) continue;
      enemies.push({
        id: pick(e, 'id', 'uid', 'name'), x, y, z: num(pick(e, 'z', 'pz')) ?? 0,
        vx: num(pick(e, 'vx')) ?? 0, vy: num(pick(e, 'vy')) ?? 0, vz: num(pick(e, 'vz')) ?? 0,
        team: pick(e, 'team', 'side'), hp: num(pick(e, 'hp', 'health')) ?? 1,
        dead: pick(e, 'dead', 'isDead') === true || pick(e, 'alive') === false,
        visible: pick(e, 'visible', 'isVisible'),
      });
    }
    const view = pick(raw, 'viewMatrix', 'view'), proj = pick(raw, 'projMatrix', 'proj');
    return { mode: view && proj ? '3d' : '2d', self, enemies, view, proj };
  }

  let state = null;
  const sniff = (t) => {
    if (typeof t !== 'string' || t.length < 24 || (t[0] !== '{' && t[0] !== '[')) return;
    let d; try { d = JSON.parse(t); } catch { return; }
    const s = adapt(d); if (s) state = s;
  };

  const of = window.fetch;
  if (of) window.fetch = async function (...a) {
    const r = await of.apply(this, a);
    r.clone().text().then(sniff).catch(() => {});
    return r;
  };

  const OWS = window.WebSocket;
  if (OWS) {
    const P = function (u, p) {
      const ws = p ? new OWS(u, p) : new OWS(u);
      ws.addEventListener('message', (e) => {
        if (typeof e.data === 'string') sniff(e.data);
        else if (e.data instanceof ArrayBuffer) sniff(new TextDecoder().decode(e.data));
      });
      window.__aimbotWS = ws;
      return ws;
    };
    P.prototype = OWS.prototype;
    Object.setPrototypeOf(P, OWS);
    window.WebSocket = P;
  }

  const angleTo = (s, e) => {
    if (s.mode === '2d') return angleDiff(s.self.yaw ?? 0, Math.atan2(e.y - s.self.y, e.x - s.self.x));
    const dx = e.x - s.self.x, dy = e.y - s.self.y, dz = e.z - s.self.z;
    return Math.abs(angleDiff(s.self.yaw ?? 0, Math.atan2(-dx, -dz))) +
           Math.abs(angleDiff(s.self.pitch ?? 0, Math.atan2(dy, Math.hypot(dx, dz)))) * 0.5;
  };

  function aimPoint(s, e) {
    if (!cfg.projectileSpeed || !cfg.prediction) return e;
    const t = (dist3(s.self, e) / cfg.projectileSpeed) * cfg.prediction;
    return { x: e.x + e.vx * t, y: e.y + e.vy * t, z: e.z + e.vz * t };
  }

  let stickyId = null;
  function pickTarget(s) {
    let best = null;
    for (const e of s.enemies) {
      if (e.dead || e.hp <= 0) continue;
      if (cfg.ignoreTeammates && e.team != null && e.team === s.self.team) continue;
      if (cfg.requireVisible && e.visible === false) continue;
      const d = s.mode === '2d' ? dist2(s.self.x, s.self.y, e.x, e.y) : dist3(s.self, e);
      if (cfg.maxDistance > 0 && d > cfg.maxDistance) continue;
      const a = Math.abs(angleTo(s, e));
      if (a > cfg.fov) continue;
      let score = cfg.sort === 'distance' ? d : a * 10;
      if (stickyId != null && e.id === stickyId) score *= 1 - cfg.sticky;
      if (!best || score < best.score) best = { enemy: e, score, distance: d, angle: a };
    }
    if (!best) return null;
    const p = aimPoint(s, best.enemy);
    best.screen = s.mode === '3d' && s.view && s.proj
      ? worldToScreen(p, s.view, s.proj, innerWidth, innerHeight) : null;
    return best;
  }

  const touch = (el, type, x, y) => {
    if (typeof Touch === 'undefined') {
      el.dispatchEvent(new PointerEvent(type.replace('touch', 'pointer'),
        { pointerId: 1, pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true }));
      return;
    }
    const t = new Touch({ identifier: 1, target: el, clientX: x, clientY: y, pageX: x, pageY: y });
    const l = type === 'touchend' ? [] : [t];
    el.dispatchEvent(new TouchEvent(type, { touches: l, targetTouches: l, changedTouches: [t], bubbles: true, cancelable: true }));
  };

  let down = false, cur = { x: 0, y: 0 };
  const el = document.querySelector('canvas') || document.body;

  const driver = {
    aim(dx, dy) {
      if (cfg.output === 'ws') {
        const ws = window.__aimbotWS;
        if (ws?.readyState === 1 && cfg.wsAimMessage) {
          ws.send(JSON.stringify(JSON.parse(cfg.wsAimMessage.replace('{dx}', dx).replace('{dy}', dy))));
        }
        return;
      }
      if (cfg.output === 'hook') { window.__aimbotHook?.(dx, dy); return; }
      if (!down) { down = true; cur = { x: innerWidth / 2, y: innerHeight / 2 }; touch(el, 'touchstart', cur.x, cur.y); }
      cur = { x: cur.x + dx, y: cur.y + dy };
      touch(el, 'touchmove', cur.x, cur.y);
    },
    fire() {
      touch(el, 'touchstart', innerWidth / 2, innerHeight / 2);
      touch(el, 'touchend', innerWidth / 2, innerHeight / 2);
    },
    release() { if (down) { down = false; touch(el, 'touchend', cur.x, cur.y); } },
  };

  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483646';
  document.documentElement.appendChild(cv);
  const ctx = cv.getContext('2d');
  const resize = () => {
    cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  resize(); addEventListener('resize', resize);

  function draw(hit) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (!cfg.overlay) return;
    ctx.strokeStyle = cfg.enabled ? 'rgba(0,255,140,.5)' : 'rgba(150,150,150,.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(innerWidth / 2, innerHeight / 2, cfg.fov * 14, 0, 7); ctx.stroke();
    if (!hit?.screen) return;
    ctx.strokeStyle = '#00ff8c'; ctx.lineWidth = 2;
    ctx.strokeRect(hit.screen.x - 18, hit.screen.y - 28, 36, 56);
    ctx.fillStyle = '#00ff8c'; ctx.font = '11px monospace';
    ctx.fillText(`${hit.distance.toFixed(0)}m`, hit.screen.x + 22, hit.screen.y);
  }

  const panel = document.createElement('div');
  panel.style.cssText = `position:fixed;top:8px;left:8px;z-index:2147483647;background:#0b0f14ee;color:#c9d6e2;
    font:12px/1.5 monospace;padding:10px;border-radius:8px;width:220px;max-height:90vh;overflow:auto;
    border:1px solid #1e2a36;display:${cfg.panelOpen ? 'block' : 'none'}`;
  panel.innerHTML = '<b style="color:#00ff8c">AIMBOT WEB</b>';

  const check = (label, k) => {
    const r = document.createElement('label');
    r.style.cssText = 'display:flex;justify-content:space-between;margin:4px 0';
    const c = document.createElement('input');
    c.type = 'checkbox'; c.checked = !!cfg[k];
    c.onchange = () => { cfg[k] = c.checked; save(); };
    r.append(label, c); panel.append(r);
  };
  const slider = (label, k, min, max, step) => {
    const r = document.createElement('div');
    r.style.margin = '6px 0';
    r.innerHTML = `<div>${label}: <span>${cfg[k]}</span></div>`;
    const s = document.createElement('input');
    s.type = 'range'; s.min = min; s.max = max; s.step = step; s.value = cfg[k]; s.style.width = '100%';
    s.oninput = () => { cfg[k] = Number(s.value); r.querySelector('span').textContent = s.value; save(); };
    r.append(s); panel.append(r);
  };
  const combo = (label, k, opts) => {
    const r = document.createElement('div');
    r.style.margin = '4px 0'; r.innerHTML = `<div>${label}</div>`;
    const s = document.createElement('select');
    s.style.cssText = 'width:100%;background:#131b24;color:#c9d6e2;border:1px solid #1e2a36';
    for (const o of opts) {
      const op = document.createElement('option');
      op.value = o; op.textContent = o; op.selected = cfg[k] === o;
      s.append(op);
    }
    s.onchange = () => { cfg[k] = s.value; save(); };
    r.append(s); panel.append(r);
  };

  check('Activo', 'enabled'); check('Overlay', 'overlay');
  check('Solo visibles', 'requireVisible'); check('Ignorar equipo', 'ignoreTeammates');
  check('Triggerbot', 'triggerbot');
  combo('Salida', 'output', ['touch', 'ws', 'hook']);
  combo('Orden', 'sort', ['angle', 'distance']);
  slider('FOV', 'fov', 1, 60, 1);
  slider('Distancia máx', 'maxDistance', 0, 400, 5);
  slider('Predicción', 'prediction', 0, 1, 0.05);
  slider('Vel. proyectil', 'projectileSpeed', 0, 300, 5);
  slider('Suavizado', 'smooth', 0, 1, 0.05);
  slider('Giro máx °/s', 'maxTurn', 30, 2000, 10);
  slider('Jitter', 'jitter', 0, 2, 0.05);
  slider('Reacción ms', 'reactionMs', 0, 400, 10);
  slider('Triggerbot FOV', 'triggerFov', 0, 5, 0.1);
  slider('Sticky', 'sticky', 0, 0.9, 0.05);
  document.documentElement.appendChild(panel);

  addEventListener('keydown', (e) => {
    if (e.code === 'Insert') cfg.enabled = !cfg.enabled;
    if (e.code === 'End') { cfg.panelOpen = !cfg.panelOpen; panel.style.display = cfg.panelOpen ? 'block' : 'none'; }
  });

  let last = performance.now(), readyAt = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (!state || !cfg.enabled) { draw(null); return; }

    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (now < readyAt) return;

    const t = pickTarget(state);
    draw(t);
    if (!t) { stickyId = null; driver.release(); return; }
    stickyId = t.enemy.id;

    let dx, dy;
    if (state.mode === '2d') {
      const o = state.self.screen ?? { x: innerWidth / 2, y: innerHeight / 2 };
      const a = Math.atan2(t.enemy.y - state.self.y, t.enemy.x - state.self.x);
      dx = (o.x + Math.cos(a) * t.distance * 40) - o.x;
      dy = (o.y + Math.sin(a) * t.distance * 40) - o.y;
    } else {
      if (!t.screen) return;
      dx = t.screen.x - innerWidth / 2;
      dy = t.screen.y - innerHeight / 2;
    }

    const k = clamp(1 - cfg.smooth, 0.05, 1);
    const cap = cfg.maxTurn * dt;
    driver.aim(clamp(dx * k, -cap, cap) + gauss(cfg.jitter), clamp(dy * k, -cap, cap) + gauss(cfg.jitter));

    if (cfg.triggerbot && t.angle <= cfg.triggerFov * RAD) driver.fire();
    readyAt = now + cfg.reactionMs;
  }

  requestAnimationFrame(frame);
  console.info('[aimbot] listo. Insert on/off, End panel.');
  window.__aimbot = { cfg, get state() { return state; } };
})();
