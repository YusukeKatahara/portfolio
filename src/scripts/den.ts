/**
 * den.ts — 影絵の犬（アイリッシュ・ウルフハウンド）の行動エンジン
 *
 * - マウスカーソル（骨）をx軸で追いかける。近づくと忍び足（stalk）、遠いと走る
 * - カーソルが止まっても決して止まらない: 尻尾・呼吸・耳・散歩・穴掘り・伸び・遠吠え・ボール遊び
 * - ナビクリック時: そのタイルの位置まで走って穴を掘り、掘り終えるとページが変わる
 * - transition:persist により犬とボールの状態はページ遷移後も継続する
 */
import { navigate } from 'astro:transitions/client';
import { WEB3FORMS_ACCESS_KEY } from '../site.config';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stage = document.getElementById('stage');
const svg = document.getElementById('stage-svg');

type Vec = { x: number; y: number };

if (stage && svg) initDen(stage, svg);
initContactForm();

/* ============================================================ */

function initDen(stage: HTMLElement, svg: Element) {
  const part = (name: string) => svg.querySelector<SVGGraphicsElement>(`[data-part="${name}"]`)!;
  const gDog = part('dog');
  const gInner = part('inner');
  const gNeck = part('neck');
  const gEar = part('ear');
  const gTail = part('tail');
  const legs = {
    lf: part('leg-lf'),
    rf: part('leg-rf'),
    lb: part('leg-lb'),
    rb: part('leg-rb'),
  };
  const elBall = part('ball');
  const gDirt = part('dirt');
  const gBones = part('bones');

  let W = stage.clientWidth || 800;
  let H = stage.clientHeight || 216;
  let scale = H / 260;

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const margin = () => 120 * scale + 12;

  /* ---------- state ---------- */
  const st = {
    t: 0,
    x: W * 0.3,
    v: 0,
    dir: 1,
    phase: 0,
    // カーソル（獲物）
    cursorX: null as number | null,
    cursorY: 0,
    cursorT: -1e9,
    cursorSpeed: 0,
    // 自発行動
    action: 'none' as 'none' | 'wander' | 'sniffwalk' | 'ballchase' | 'stretch' | 'howl',
    actionUntil: 0,
    wanderTarget: null as number | null,
    nextActionAt: 1.5,
    // 穴掘り
    dig: null as null | { x: number; digging: boolean; until: number; deadline: number; nav: boolean; onDone?: () => void },
    // 耳
    nextFlick: 3,
    flickUntil: 0,
    // 現在ポーズ（イージングで target へ寄せる）
    pose: { neck: 0, head: 0, tail: -6, body: 0, bodyY: 0, lf: 0, rf: 0, lb: 0, rb: 0 },
    ball: { x: W * 0.64, v: 0, y: 0, vy: 0 },
  };

  /* ---------- input ---------- */
  let lastMouse: { x: number; t: number } | null = null;
  document.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const now = performance.now() / 1000;
    if (lastMouse) {
      const dt = Math.max(0.008, now - lastMouse.t);
      st.cursorSpeed = st.cursorSpeed * 0.7 + (Math.abs(e.clientX - lastMouse.x) / dt) * 0.3;
    }
    lastMouse = { x: e.clientX, t: now };
    st.cursorX = e.clientX - r.left;
    st.cursorY = e.clientY - r.bottom; // 舞台の地面を基準にした高さ（上ほど負）
    st.cursorT = st.t;
  });
  stage.addEventListener('touchstart', (e) => {
    const r = stage.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    st.cursorX = touch.clientX - r.left;
    st.cursorY = touch.clientY - r.bottom;
    st.cursorT = st.t;
    st.cursorSpeed = 0;
  }, { passive: true });

  const onResize = () => {
    W = stage.clientWidth || W;
    H = stage.clientHeight || H;
    scale = H / 260;
    st.x = clamp(st.x, margin(), W - margin());
    st.ball.x = clamp(st.ball.x, 20, W - 20);
  };
  window.addEventListener('resize', onResize);
  onResize();

  /* ---------- 穴掘り ---------- */
  function startDig(x: number, opts: { nav?: boolean; onDone?: () => void } = {}) {
    st.dig = {
      x: clamp(x, margin(), W - margin()),
      digging: false,
      until: 0,
      deadline: st.t + (opts.nav ? 1.7 : 4),
      nav: !!opts.nav,
      onDone: opts.onDone,
    };
    st.action = 'none';
  }

  /* ---------- ナビクリック → 走って掘って遷移 ---------- */
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a[data-dig]');
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    const here = location.pathname.replace(/\/$/, '') || '/';
    const there = href.replace(/\/$/, '') || '/';
    const stageVisible = stage.getBoundingClientRect().bottom > 0;
    if (here === there) {
      // 同じページ: 記念に一掘りだけして何もしない
      if (!reduced && stageVisible && !st.dig) {
        const r = a.getBoundingClientRect();
        const s = stage.getBoundingClientRect();
        startDig(r.left + r.width / 2 - s.left);
      }
      return;
    }
    if (reduced || !stageVisible || st.dig?.nav) {
      // モーション低減設定・舞台が見えない・すでに掘りに向かっている → 即遷移
      navigate(href);
      return;
    }
    const r = a.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    startDig(r.left + r.width / 2 - s.left, { nav: true, onDone: () => navigate(href) });
  });

  /* ---------- 塵と骨 ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  type Dirt = { el: SVGRectElement; x: number; y: number; vx: number; vy: number; rot: number; vr: number; life: number };
  const dirts: Dirt[] = [];
  let dirtAcc = 0;

  function spawnDirt(dt: number) {
    dirtAcc += dt;
    while (dirtAcc > 0.05) {
      dirtAcc -= 0.05;
      if (dirts.length > 36) return;
      for (let i = 0; i < 2; i++) {
        const el = document.createElementNS(NS, 'rect');
        const size = rand(2.2, 4.6) * scale;
        el.setAttribute('width', String(size));
        el.setAttribute('height', String(size * rand(0.6, 1)));
        el.setAttribute('fill', '#171512');
        gDirt.appendChild(el);
        dirts.push({
          el,
          x: st.x + st.dir * 58 * scale,
          y: H - 8,
          vx: -st.dir * rand(30, 190) * scale,
          vy: -rand(130, 300) * scale,
          rot: rand(0, 360),
          vr: rand(-400, 400),
          life: rand(0.5, 0.85),
        });
      }
    }
  }

  function stepDirt(dt: number) {
    for (let i = dirts.length - 1; i >= 0; i--) {
      const d = dirts[i];
      d.life -= dt;
      d.vy += 700 * scale * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.rot += d.vr * dt;
      if (d.life <= 0 || d.y > H + 8) {
        d.el.remove();
        dirts.splice(i, 1);
      } else {
        d.el.setAttribute('transform', `translate(${d.x} ${d.y}) rotate(${d.rot})`);
      }
    }
  }

  type Bone = { el: SVGGElement; born: number };
  const bones: Bone[] = [];
  function spawnBone(x: number) {
    const g = document.createElementNS(NS, 'g');
    g.innerHTML =
      `<rect x="-8" y="-2.4" width="16" height="4.8" rx="2.4" fill="#171512"/>` +
      `<circle cx="-8" cy="-2.6" r="3.1" fill="#171512"/><circle cx="-8" cy="2.6" r="3.1" fill="#171512"/>` +
      `<circle cx="8" cy="-2.6" r="3.1" fill="#171512"/><circle cx="8" cy="2.6" r="3.1" fill="#171512"/>`;
    g.setAttribute('transform', `translate(${clamp(x, 20, W - 20)} ${H - 9}) rotate(${rand(-16, 16)}) scale(${scale})`);
    g.setAttribute('opacity', '0');
    gBones.appendChild(g);
    bones.push({ el: g, born: st.t });
  }
  function stepBones() {
    for (let i = bones.length - 1; i >= 0; i--) {
      const b = bones[i];
      const age = st.t - b.born;
      let op = 0;
      if (age < 0.4) op = age / 0.4;
      else if (age < 6) op = 1;
      else if (age < 7) op = 1 - (age - 6);
      else {
        b.el.remove();
        bones.splice(i, 1);
        continue;
      }
      b.el.setAttribute('opacity', op.toFixed(2));
    }
  }

  /* ---------- 行動決定 ---------- */
  function think(dt: number) {
    const cursorFresh = st.t - st.cursorT < 3.5;

    let target: number | null = null;
    let cap = 90; // px/s
    let stopDist = 26;
    let poseHint: 'stand' | 'stalk' | 'sniff' | 'stretch' | 'howl' | 'dig' = 'stand';

    if (st.dig) {
      const d = st.dig;
      target = d.x;
      cap = 300;
      stopDist = 20;
      if (!d.digging && Math.abs(st.x - d.x) < 24 * scale + 14) {
        d.digging = true;
        d.until = st.t + (d.nav ? 0.8 : 1.6);
      }
      if (d.digging) {
        poseHint = 'dig';
        target = null; // その場で掘る
        spawnDirt(dt);
        if (st.t >= d.until) {
          if (Math.random() < 0.28) spawnBone(st.x + st.dir * 52 * scale);
          const done = d.onDone;
          st.dig = null;
          st.nextActionAt = st.t + rand(2, 4);
          done?.();
        }
      } else if (st.t > d.deadline) {
        // 間に合わなくても遷移だけは必ず果たす
        const done = d.onDone;
        st.dig = null;
        done?.();
      }
    } else if (st.action === 'stretch') {
      poseHint = 'stretch';
      if (st.t > st.actionUntil) st.action = 'none';
    } else if (st.action === 'howl') {
      poseHint = 'howl';
      if (st.t > st.actionUntil) st.action = 'none';
    } else if (cursorFresh && st.cursorX !== null) {
      // 狩り: カーソル（骨）を追う
      st.action = 'none';
      target = clamp(st.cursorX, margin(), W - margin());
      const dist = Math.abs(target - st.x);
      stopDist = 66 * scale + 14;
      if (dist > 300) cap = 290;
      else if (st.cursorSpeed > 700) cap = 290;
      else if (dist > stopDist && st.cursorSpeed < 160) {
        cap = 55; // 忍び寄る
        poseHint = 'stalk';
      } else cap = 150;
    } else {
      // 退屈しのぎの自発行動
      if (st.action === 'ballchase') {
        target = clamp(st.ball.x, margin(), W - margin());
        cap = 240;
        stopDist = 30 * scale;
        if (Math.abs(st.ball.v) > 120 || st.t > st.actionUntil) st.action = 'none'; // 蹴れたら満足
      } else if (st.action === 'wander' || st.action === 'sniffwalk') {
        target = st.wanderTarget;
        cap = st.action === 'sniffwalk' ? 42 : 80;
        if (st.action === 'sniffwalk') poseHint = 'sniff';
        if (target === null || Math.abs(target - st.x) < 30 || st.t > st.actionUntil) st.action = 'none';
      }
      if (st.action === 'none' && st.t >= st.nextActionAt) {
        const roll = Math.random();
        if (roll < 0.34) {
          st.action = 'wander';
          st.wanderTarget = rand(margin(), W - margin());
          st.actionUntil = st.t + 6;
        } else if (roll < 0.48) {
          st.action = 'sniffwalk';
          st.wanderTarget = clamp(st.x + rand(-220, 220), margin(), W - margin());
          st.actionUntil = st.t + 7;
        } else if (roll < 0.64) {
          st.action = 'ballchase';
          st.actionUntil = st.t + 5;
        } else if (roll < 0.78) {
          startDig(clamp(st.x + rand(-160, 160), margin(), W - margin()));
        } else if (roll < 0.9) {
          st.action = 'stretch';
          st.actionUntil = st.t + 2.1;
        } else {
          st.action = 'howl';
          st.actionUntil = st.t + 1.9;
        }
        st.nextActionAt = st.t + rand(4, 8.5);
      }
    }

    return { target, cap, stopDist, poseHint };
  }

  /* ---------- 物理・ポーズ・描画 ---------- */
  function step(dt: number) {
    st.t += dt;
    const { target, cap, stopDist, poseHint } = think(dt);

    // 移動
    let desired = 0;
    if (target !== null) {
      const d = target - st.x;
      if (Math.abs(d) > stopDist) desired = clamp(d * 2.4, -cap, cap);
    }
    const accel = poseHint === 'stalk' ? 3 : 4.5;
    st.v += (desired - st.v) * Math.min(1, dt * accel);
    if (Math.abs(st.v) < 2 && desired === 0) st.v = 0;
    st.x = clamp(st.x + st.v * dt, margin(), W - margin());

    // 向き（少し遊びを持たせる）
    if (st.v > 14) st.dir = 1;
    else if (st.v < -14) st.dir = -1;
    else if (target === null && st.cursorX !== null && st.t - st.cursorT < 3.5) {
      const d = st.cursorX - st.x;
      if (Math.abs(d) > 40) st.dir = d > 0 ? 1 : -1;
    }

    // 歩様
    const speedRatio = clamp(Math.abs(st.v) / 260, 0, 1);
    st.phase += Math.abs(st.v) * dt * 0.062 + speedRatio * dt * 2;
    const swing = speedRatio * (16 + 22 * speedRatio);
    const p = st.phase * Math.PI * 2;

    // ポーズターゲット
    const tp = { neck: 0, head: 0, tail: -6, body: 0, bodyY: 0, lf: 0, rf: 0, lb: 0, rb: 0 };
    const excited = st.t - st.cursorT < 1.2;
    let wagAmp = 6 + speedRatio * 4 + (excited ? 8 : 0);
    let wagSpeed = 5 + speedRatio * 4 + (excited ? 8 : 0);

    if (swing > 0.5) {
      // 歩行〜走行
      const rearPhase = p + Math.PI * (1 - 0.35 * speedRatio); // 速いほどギャロップに
      tp.lf = Math.sin(p) * swing;
      tp.rb = Math.sin(rearPhase) * swing;
      tp.rf = Math.sin(p + Math.PI) * swing;
      tp.lb = Math.sin(rearPhase + Math.PI) * swing;
      tp.bodyY = -Math.abs(Math.sin(p)) * speedRatio * 5;
      tp.neck = 4 + speedRatio * 6;
    } else {
      // 立ち止まり: 呼吸
      tp.bodyY = Math.sin(st.t * 2.1) * 1.3;
      tp.lf = 2;
      tp.rf = -3;
      tp.lb = 1;
      tp.rb = -2;
    }

    switch (poseHint) {
      case 'stalk':
        tp.neck = 24;
        tp.head = 6;
        tp.bodyY += 7;
        wagAmp = 2;
        break;
      case 'sniff':
        tp.neck = 46;
        tp.head = 10 + Math.sin(st.t * 6) * 4;
        break;
      case 'dig': {
        const dp = st.t * 14;
        tp.neck = 50;
        tp.head = 12;
        tp.lf = -16 + Math.sin(dp) * 24;
        tp.rf = -16 + Math.sin(dp + Math.PI) * 24;
        tp.lb = 4;
        tp.rb = -4;
        tp.body = 6;
        tp.bodyY += 3;
        tp.tail = -34;
        wagAmp = 10;
        wagSpeed = 12;
        break;
      }
      case 'stretch':
        tp.body = 13;
        tp.neck = -16;
        tp.lf = 26;
        tp.rf = 22;
        tp.tail = -38;
        wagAmp = 9;
        wagSpeed = 9;
        break;
      case 'howl':
        tp.neck = -38;
        tp.head = -10;
        tp.tail = -14;
        wagAmp = 2;
        break;
      default:
        if (st.cursorX !== null && st.t - st.cursorT < 3.5 && swing <= 0.5) {
          // カーソルの高さを目で追う
          tp.neck += clamp(st.cursorY / 16, -14, 10);
          tp.head = clamp(st.cursorY / 30, -8, 6);
        }
    }

    // 耳
    if (st.t > st.nextFlick) {
      st.flickUntil = st.t + 0.16;
      st.nextFlick = st.t + rand(3, 9);
    }
    const ear = st.t < st.flickUntil ? -24 : Math.sin(st.t * 1.7) * 3;

    // 尻尾（常に振れている）
    const tail = tp.tail + Math.sin(st.t * wagSpeed) * wagAmp;

    // イージング
    const k = Math.min(1, dt * 9);
    const pose = st.pose;
    pose.neck += (tp.neck - pose.neck) * k;
    pose.head += (tp.head - pose.head) * k;
    pose.body += (tp.body - pose.body) * k;
    pose.bodyY += (tp.bodyY - pose.bodyY) * k;
    pose.lf += (tp.lf - pose.lf) * Math.min(1, dt * 14);
    pose.rf += (tp.rf - pose.rf) * Math.min(1, dt * 14);
    pose.lb += (tp.lb - pose.lb) * Math.min(1, dt * 14);
    pose.rb += (tp.rb - pose.rb) * Math.min(1, dt * 14);
    pose.tail = tail;

    // ボール物理
    const ball = st.ball;
    ball.v *= Math.pow(0.35, dt);
    ball.x += ball.v * dt;
    const br = 8;
    if (ball.x < br + 8) { ball.x = br + 8; ball.v = -ball.v * 0.7; }
    if (ball.x > W - br - 8) { ball.x = W - br - 8; ball.v = -ball.v * 0.7; }
    ball.vy += 900 * dt;
    ball.y += ball.vy * dt;
    if (ball.y > 0) { ball.y = 0; ball.vy = Math.abs(ball.vy) > 60 ? -ball.vy * 0.45 : 0; }
    // 犬に蹴られる
    const noseX = st.x + st.dir * 120 * scale;
    if (Math.abs(ball.y) < 6 && Math.abs(ball.x - noseX) < 16 + br && Math.abs(st.v) > 60) {
      ball.v = st.v * 1.5 + st.dir * rand(60, 140);
      if (Math.abs(ball.v) > 240) ball.vy = -rand(120, 260);
    }

    stepDirt(dt);
    stepBones();
    render();
  }

  function render() {
    const groundY = H - 5;
    gDog.setAttribute('transform', `translate(${st.x} ${groundY}) scale(${st.dir * scale} ${scale})`);
    const pose = st.pose;
    gInner.setAttribute('transform', `rotate(${pose.body} 40 0) translate(0 ${pose.bodyY})`);
    gNeck.setAttribute('transform', `rotate(${pose.neck} 46 -122)`);
    gEar.setAttribute('transform', `rotate(${st.t < st.flickUntil ? -24 : Math.sin(st.t * 1.7) * 3} 86 -184)`);
    gTail.setAttribute('transform', `rotate(${pose.tail} -80 -118)`);
    legs.lf.setAttribute('transform', `rotate(${pose.lf} 36 -108)`);
    legs.rf.setAttribute('transform', `translate(-15 0) rotate(${pose.rf} 36 -108)`);
    legs.lb.setAttribute('transform', `rotate(${pose.lb} -60 -108)`);
    legs.rb.setAttribute('transform', `translate(13 0) rotate(${pose.rb} -60 -108)`);
    elBall.setAttribute('cx', String(st.ball.x));
    elBall.setAttribute('cy', String(H - 13 + st.ball.y));
  }

  if (reduced) {
    // モーション低減: 静止画として一枚だけ描く
    st.pose.tail = -10;
    render();
    return;
  }

  let last = performance.now();
  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    step(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* ============================================================
   お問い合わせフォーム（Web3Forms）
   フォームはページ遷移で作り直されるため、documentへの委譲で一度だけ登録する
   ============================================================ */
function initContactForm() {
  document.addEventListener('submit', async (e) => {
    const form = e.target as HTMLFormElement;
    if (form?.id !== 'contact-form') return;
    e.preventDefault();
    const status = document.getElementById('form-status');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const setState = (state: string, msg: string) => {
      if (status) {
        status.dataset.state = state;
        status.textContent = msg;
      }
    };
    if (button) button.disabled = true;
    setState('sending', form.dataset.sendingMsg ?? '…');
    try {
      const data = new FormData(form);
      data.append('access_key', WEB3FORMS_ACCESS_KEY);
      data.append('from_name', 'bigdogdig.com contact form');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setState('done', form.dataset.doneMsg ?? 'OK');
      } else {
        setState('error', form.dataset.errorMsg ?? 'Error');
      }
    } catch {
      setState('error', form.dataset.errorMsg ?? 'Error');
    } finally {
      if (button) button.disabled = false;
    }
  });
}
