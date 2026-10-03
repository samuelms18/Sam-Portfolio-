/* Sam — Portfolio interactions. No dependencies. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── Theme ─────────────────────────────────────────────── */
  const currentTheme = () => root.dataset.theme || 'dark';
  $$('.theme-toggle').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      document.dispatchEvent(new CustomEvent('themechange'));
    })
  );

  /* ── Nav: scrolled state, hide on scroll down, progress ── */
  const nav = $('.nav');
  const progress = $('.progress');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    if (!document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > lastY && y > 400);
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────────── */
  const menuBtn = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn?.addEventListener('click', () => setMenu(menu.hidden));
  menu?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', (e) => e.key === 'Escape' && menu && !menu.hidden && setMenu(false));

  /* ── Reveal on scroll ──────────────────────────────────── */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }),
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );
  $$('.reveal').forEach((el) => io.observe(el));

  /* ── Custom cursor ─────────────────────────────────────── */
  const cursor = $('.cursor');
  if (cursor && finePointer && !reduced) {
    document.body.classList.add('has-cursor');
    const dot = $('.cursor-dot', cursor);
    const ring = $('.cursor-ring', cursor);
    const label = $('span', ring);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    }, { passive: true });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => (cursor.style.opacity = 0));
    document.addEventListener('mouseenter', () => (cursor.style.opacity = 1));
    document.addEventListener('pointerover', (e) => {
      const labelled = e.target.closest('[data-cursor]');
      const zoom = e.target.closest('[data-zoom]');
      const hover = e.target.closest('a, button, input, textarea, label');
      cursor.classList.toggle('is-label', !!(labelled || zoom));
      cursor.classList.toggle('is-hover', !!hover && !labelled);
      label.textContent = labelled ? labelled.dataset.cursor : zoom ? 'Zoom' : '';
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ── Magnetic buttons & 3D tilt ────────────────────────── */
  if (finePointer && !reduced) {
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
    $$('.tilt').forEach((el) => {
      const host = el.closest('a') || el;
      host.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add('is-tilting');
        el.style.transform = `perspective(1100px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
      });
      host.addEventListener('pointerleave', () => { el.classList.remove('is-tilting'); el.style.transform = ''; });
    });
  }

  /* ── Hero: complexity → clarity particle field ─────────── */
  const canvas = $('.hero-canvas');
  if (canvas) heroField(canvas, $('.hero-readout'));

  function heroField(canvas, readout) {
    const ctx = canvas.getContext('2d');
    const small = innerWidth < 860;
    const N = small ? 520 : 1100;
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      // Ordered target: evenly distributed Fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      // Chaotic start: clumpy random cloud
      const u = Math.random(), v = Math.random(), w = Math.cbrt(Math.random()) * 1.7;
      const a = 2 * Math.PI * u, b = Math.acos(2 * v - 1);
      pts.push({
        ox: Math.cos(th) * r, oy: y, oz: Math.sin(th) * r,
        cx: w * Math.sin(b) * Math.cos(a) * 1.25, cy: w * Math.cos(b) * 0.8, cz: w * Math.sin(b) * Math.sin(a),
        ph: Math.random() * Math.PI * 2,
        acc: Math.random() < 0.14,
      });
    }

    let W = 0, H = 0, dpr = 1, colors = {};
    const readColors = () => {
      const cs = getComputedStyle(root);
      colors = { text: cs.getPropertyValue('--text').trim(), accent: cs.getPropertyValue('--accent').trim() };
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    readColors(); resize();
    new ResizeObserver(resize).observe(canvas);
    document.addEventListener('themechange', () => { readColors(); if (reduced) draw(1, 0); });

    let mx = 0, my = 0, energy = 0, lastMx = null, lastMy = null;
    addEventListener('pointermove', (e) => {
      mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
      if (lastMx !== null) energy = Math.min(1, energy + Math.hypot(e.clientX - lastMx, e.clientY - lastMy) / 2600);
      lastMx = e.clientX; lastMy = e.clientY;
    }, { passive: true });

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let rotY = 0, tiltX = 0, visible = true, start = performance.now();

    function draw(order, time) {
      ctx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * (small ? 0.36 : 0.3);
      const cx = W * 0.55, cy = H * 0.46;
      const k = ease(order);
      const sy = Math.sin(rotY), cyR = Math.cos(rotY), sx = Math.sin(tiltX), cxR = Math.cos(tiltX);
      const jitter = (1 - k) * 0.06;
      const projected = [];
      for (const p of pts) {
        let x = p.cx + (p.ox - p.cx) * k + Math.sin(time * 0.0009 + p.ph) * jitter;
        let y = p.cy + (p.oy - p.cy) * k + Math.cos(time * 0.0011 + p.ph) * jitter;
        let z = p.cz + (p.oz - p.cz) * k;
        const x1 = x * cyR - z * sy, z1 = x * sy + z * cyR;
        const y1 = y * cxR - z1 * sx, z2 = y * sx + z1 * cxR;
        const persp = 2.8 / (2.8 + z2);
        projected.push([cx + x1 * R * persp, cy + y1 * R * persp, z2, persp, p.acc]);
      }
      projected.sort((a, b) => b[2] - a[2]);
      for (const [px, py, z, s, acc] of projected) {
        const depth = (1.6 - z) / 3.2; // 0 back … 1 front
        ctx.globalAlpha = Math.max(0.08, Math.min(1, 0.15 + depth * 0.85)) * (acc ? 1 : 0.75);
        ctx.fillStyle = acc ? colors.accent : colors.text;
        const size = (acc ? 2.1 : 1.35) * s;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (readout) readout.style.setProperty('--order', k.toFixed(3));
    }

    if (reduced) { draw(1, 0); return; }

    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(frame); }).observe(canvas);

    function frame(now) {
      if (!visible) return;
      const intro = Math.min(1, Math.max(0, (now - start - 400) / 3200));
      energy *= 0.965;
      const order = intro * (1 - Math.min(energy, 0.7));
      rotY += 0.0022 + energy * 0.01;
      tiltX += ((my * 0.6) - tiltX) * 0.04;
      rotY += (mx * 0.02);
      draw(order, now);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── Work filters ──────────────────────────────────────── */
  const filters = $$('.filter');
  filters.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
      $$('.card').forEach((c) => {
        const show = f === 'All' || c.dataset.cat.split('|').includes(f);
        c.classList.toggle('is-out', !show);
        if (show) c.classList.add('is-in');
      });
    })
  );

  /* ── Case study: active TOC item ───────────────────────── */
  const tocLinks = $$('.cs-toc a');
  if (tocLinks.length) {
    const map = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
    const tocIO = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { tocLinks.forEach((a) => a.classList.remove('is-active')); map.get(en.target.id)?.classList.add('is-active'); }
      }),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    $$('.cs-sec').forEach((s) => tocIO.observe(s));
  }

  /* ── Lightbox for figures ──────────────────────────────── */
  const lb = $('.lightbox');
  if (lb) {
    const stage = $('.lightbox-stage', lb);
    let opener = null;
    const close = () => { lb.hidden = true; stage.innerHTML = ''; document.body.style.overflow = ''; opener?.focus(); };
    $$('[data-zoom]').forEach((fig) => {
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', 'Open image full screen');
      const open = () => {
        opener = fig;
        const clone = (fig.querySelector('img, .mock') || fig).cloneNode(true);
        clone.style.transform = '';
        stage.replaceChildren(clone);
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        $('.lightbox-close', lb).focus();
      };
      fig.addEventListener('click', open);
      fig.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open()));
    });
    lb.addEventListener('click', (e) => (e.target === lb || e.target.closest('.lightbox-close')) && close());
    addEventListener('keydown', (e) => e.key === 'Escape' && !lb.hidden && close());
  }

  /* ── Contact form ──────────────────────────────────────── */
  const form = $('.contact-form');
  if (form) {
    const status = $('.form-status', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = true;
      $$('input, textarea', form).forEach((f) => {
        const valid = f.value.trim() && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
        f.setAttribute('aria-invalid', String(!valid));
        if (!valid) ok = false;
      });
      if (!ok) { status.className = 'form-status err'; status.textContent = 'Please fill in your name, a valid email and a message.'; return; }

      const data = Object.fromEntries(new FormData(form));
      const { endpoint, email } = form.dataset;
      if (endpoint) {
        status.className = 'form-status'; status.textContent = 'Sending…';
        try {
          const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.className = 'form-status ok'; status.textContent = 'Thanks — your message is on its way. I\'ll reply soon.';
        } catch {
          status.className = 'form-status err'; status.textContent = 'Something went wrong. Please try again in a moment.';
        }
      } else if (email) {
        const body = `${data.message}\n\n— ${data.name} (${data.email})`;
        location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
        status.className = 'form-status ok'; status.textContent = 'Opening your email app…';
      } else {
        status.className = 'form-status err'; status.textContent = 'The contact form isn\'t connected yet — please check back soon.';
      }
    });
  }

  /* ── Misc ──────────────────────────────────────────────── */
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
  $$('.to-top').forEach((b) => b.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })));
})();
