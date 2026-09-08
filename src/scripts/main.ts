/**
 * main.ts — ワンページの振る舞い
 *
 * 1. scrollspy: 画面内のセクションに合わせて左ナビの表示（展開・拡大・ドット）を更新
 * 2. tabs: タブ切替。同じ name のタブ群（For Clients / For Recruiters）はページ内で同期
 * 3. mobile menu: 上部バーのボタンで全画面メニューを開閉
 * 4. contact form: Web3Forms へ送信
 * 5. email: 分割して埋め込んだメールアドレスをブラウザ側で結合して表示
 * 6. reveal: 説明図が画面に入ったら描き出す
 */

const body = document.body;

document.documentElement.classList.add('js');

/* ============================================================
   1. scrollspy
   ============================================================ */
function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  if (!sections.length) return;

  const navGroups = Array.from(document.querySelectorAll<HTMLElement>('.nav-group'));
  const navSubs = Array.from(document.querySelectorAll<HTMLElement>('.nav-sub'));
  const curGroupEl = document.querySelector<HTMLElement>('[data-current-group]');
  const curSubEl = document.querySelector<HTMLElement>('[data-current-sub]');
  let activeId = '';

  /** 画面の上から 40% の位置に掛かっているセクションを「現在」とみなす */
  function pickActive(): HTMLElement {
    const probe = window.innerHeight * 0.4;
    let active = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= probe) active = s;
      else break;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) active = sections[sections.length - 1];
    return active;
  }

  function apply(sec: HTMLElement) {
    if (sec.id === activeId) return;
    activeId = sec.id;
    const group = sec.dataset.group ?? '';
    const isHero = group === 'hero';
    body.classList.toggle('nav-on', !isHero);

    for (const g of navGroups) {
      const on = g.dataset.group === group;
      g.classList.toggle('is-active', on);
      const main = g.querySelector<HTMLElement>('.nav-main');
      if (!main) continue;
      // サブ項目を持たないグループは見出し自体にドットを付ける
      if (on && !g.classList.contains('has-subs')) main.setAttribute('aria-current', 'true');
      else main.removeAttribute('aria-current');
    }
    for (const s of navSubs) {
      if (s.dataset.target === sec.id) s.setAttribute('aria-current', 'true');
      else s.removeAttribute('aria-current');
    }

    // モバイル上部バーの表示
    const g = navGroups.find((x) => x.dataset.group === group);
    if (curGroupEl) curGroupEl.textContent = g?.querySelector('.nav-main')?.textContent?.trim() ?? '';
    if (curSubEl) curSubEl.textContent = g?.querySelector<HTMLElement>(`.nav-sub[data-target="${sec.id}"]`)?.textContent?.trim() ?? '';

    // URL のハッシュを追従させる（履歴は増やさない）
    const hash = isHero ? '' : `#${sec.id}`;
    if (location.hash !== hash) {
      history.replaceState(null, '', hash || location.pathname + location.search);
    }
  }

  let ticking = false;
  const update = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      apply(pickActive());
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // タブ切替などで高さが変わった時にも追従
  const ro = new ResizeObserver(update);
  ro.observe(document.documentElement);
  update();
}

/* ============================================================
   2. tabs
   ============================================================ */
function initTabs() {
  const containers = Array.from(document.querySelectorAll<HTMLElement>('[data-tabs]'));

  function select(c: HTMLElement, id: string, focus = false) {
    c.querySelectorAll<HTMLElement>('[role="tab"]').forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    c.querySelectorAll<HTMLElement>('[data-panel]').forEach((p) => {
      p.hidden = p.dataset.panel !== id;
    });
  }

  function selectAll(name: string | undefined, id: string) {
    containers.filter((c) => c.dataset.tabs === name).forEach((c) => select(c, id));
  }

  for (const c of containers) {
    const tabs = Array.from(c.querySelectorAll<HTMLElement>('[role="tab"]'));
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => selectAll(c.dataset.tabs, t.dataset.tab!));
      t.addEventListener('keydown', (e) => {
        let next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        selectAll(c.dataset.tabs, tabs[next].dataset.tab!);
        tabs[next].focus();
      });
    });
  }
}

/* ============================================================
   3. mobile menu
   ============================================================ */
function initMenu() {
  const btn = document.getElementById('topbar-btn');
  const nav = document.getElementById('sidenav');
  const icon = btn?.querySelector<HTMLElement>('.topbar-icon');
  if (!btn || !nav) return;

  const set = (open: boolean) => {
    body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (icon) icon.textContent = open ? icon.dataset.close ?? 'Close' : icon.dataset.open ?? 'Menu';
  };
  btn.addEventListener('click', () => set(!body.classList.contains('menu-open')));
  nav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') set(false);
  });
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', (e) => {
    if (e.matches) set(false);
  });
}

/* ============================================================
   4. contact form（Web3Forms）
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');
  if (!form || !status) return;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const key = form.dataset.key ?? '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!key) {
      status.dataset.state = 'error';
      status.textContent = form.dataset.error ?? '';
      return;
    }
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const contact = String(fd.get('contact') ?? '').trim();
    const source = String(fd.get('source') ?? '').trim();
    const dream = String(fd.get('dream') ?? '').trim();
    const botcheck = fd.get('botcheck') ? 'on' : '';

    const payload: Record<string, string> = {
      access_key: key,
      subject: `New DREAM from ${name || 'someone'} — bigdogdig.com`,
      from_name: 'bigdogdig.com',
      name,
      contact,
      source,
      message: dream,
      botcheck,
    };
    // 連絡先がメールアドレスなら、返信先としても渡す
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) payload.email = contact;

    status.dataset.state = 'sending';
    status.textContent = form.dataset.sending ?? '';
    if (button) button.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        status.dataset.state = 'done';
        status.textContent = form.dataset.done ?? '';
        form.reset();
      } else {
        throw new Error('send failed');
      }
    } catch {
      status.dataset.state = 'error';
      status.textContent = form.dataset.error ?? '';
    } finally {
      if (button) button.disabled = false;
    }
  });
}

/* ============================================================
   5. email
   ============================================================ */
function initEmail() {
  document.querySelectorAll<HTMLElement>('[data-email]').forEach((el) => {
    const addr = `${el.dataset.u}@${el.dataset.d}`;
    const a = document.createElement('a');
    a.href = `mailto:${addr}`;
    a.textContent = addr;
    el.replaceChildren(a);
  });
}

/* ============================================================
   6. reveal（説明図）
   ============================================================ */
function initReveal() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target); // 一度出したら戻さない
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );
  targets.forEach((t) => io.observe(t));
}

initScrollSpy();
initTabs();
initMenu();
initContactForm();
initEmail();
initReveal();
