// ─── CONFIG ───────────────────────────────────────────────
const WA_NUMBER = "573136401801";
const WA_DEFAULT_MSG = encodeURIComponent("Hola Bella Caramella! Me interesa conocer más sobre sus productos 🌸");

// ─── WA LINK BUILDER ──────────────────────────────────────
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${msg || WA_DEFAULT_MSG}`;
}

// Inject href into static [data-wa] elements (non-product buttons)
document.querySelectorAll('[data-wa]').forEach(el => {
  const msg = el.dataset.wa
    ? encodeURIComponent(el.dataset.wa)
    : WA_DEFAULT_MSG;
  el.href = waLink(msg);
  if (el.tagName === 'A') el.target = '_blank';
});

// ─── SIZE PILL SELECTION ──────────────────────────────────
document.querySelectorAll('.product-sizes').forEach(sizesEl => {
  sizesEl.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const wasActive = pill.classList.contains('active');
      sizesEl.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      if (!wasActive) pill.classList.add('active');
    });
  });
});

// ─── QUANTITY CONTROLS ────────────────────────────────────
document.querySelectorAll('.product-qty').forEach(qtyEl => {
  const minus = qtyEl.querySelector('.qty-minus');
  const plus  = qtyEl.querySelector('.qty-plus');
  const val   = qtyEl.querySelector('.qty-value');
  minus.addEventListener('click', () => {
    const n = parseInt(val.textContent, 10);
    if (n > 1) val.textContent = n - 1;
  });
  plus.addEventListener('click', () => {
    val.textContent = parseInt(val.textContent, 10) + 1;
  });
});

// ─── PRODUCT WA BUTTONS (dynamic size + qty) ─────────────
document.querySelectorAll('[data-product-wa]').forEach(btn => {
  btn.target = '_blank';
  btn.addEventListener('click', e => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent.trim();
    const activePill = card.querySelector('.size-pill.active');
    const size = activePill ? activePill.textContent.trim() : null;
    const qty  = card.querySelector('.qty-value')
                  ? parseInt(card.querySelector('.qty-value').textContent, 10)
                  : 1;
    let msg = `Hola Bella Caramella! Me interesa ${name}`;
    if (size) msg += `, talla ${size}`;
    msg += `, cantidad: ${qty}`;
    msg += `. ¿Tienen disponibilidad? 🌸`;
    window.open(waLink(encodeURIComponent(msg)), '_blank');
  });
});

// ─── NAV SCROLL ───────────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ─── MOBILE NAV ───────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const overlay = document.querySelector('.nav-overlay');
const overlayClose = document.querySelector('.nav-overlay-close');
if (toggle && overlay) {
  toggle.addEventListener('click', () => overlay.classList.add('open'));
  overlayClose?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ─── CURSOR SPARKLES ─────────────────────────────────────
(function() {
  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;width:100%;height:100%';
  document.body.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  const COLORS = ['#e9828f','#f5c6cb','#f7d06e','#ffffff'];
  let sparks = [];
  let last = 0;

  function resize() { cvs.width = innerWidth; cvs.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function drawStar(x, y, r, rot, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const len = i % 2 === 0 ? r : r * 0.38;
      i === 0 ? ctx.moveTo(Math.cos(a)*len, Math.sin(a)*len)
              : ctx.lineTo(Math.cos(a)*len, Math.sin(a)*len);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function spawn(x, y) {
    sparks.push({
      x, y,
      vx: (Math.random()-0.5)*1.2,
      vy: -(Math.random()*1.8+0.8),
      r: Math.random()*5+3,
      rot: Math.random()*Math.PI*2,
      drot: (Math.random()-0.5)*0.15,
      alpha: 1,
      color: COLORS[Math.floor(Math.random()*COLORS.length)]
    });
  }

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;
    spawn(e.clientX, e.clientY);
  }, { passive: true });

  (function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    sparks = sparks.filter(s => s.alpha > 0.03);
    for (const s of sparks) {
      s.x += s.vx; s.y += s.vy; s.rot += s.drot; s.alpha -= 0.028;
      drawStar(s.x, s.y, s.r, s.rot, s.color, Math.max(0, s.alpha));
    }
    requestAnimationFrame(loop);
  })();
})();

// ─── FLOATING WA BUTTON ──────────────────────────────────
const waFloat = document.querySelector('.wa-float');
if (waFloat) {
  setTimeout(() => {
    waFloat.classList.add('visible');
    setTimeout(() => waFloat.classList.add('pulsing'), 600);
  }, 1500);
}

// ─── HERO LOGO FLOAT ─────────────────────────────────────
const heroLogo = document.querySelector('.hero-logo');
if (heroLogo) {
  setTimeout(() => heroLogo.classList.add('hero-logo-floating'), 600);
}

// ─── HERO 3D TILT (mouse parallax) ───────────────────────
(function() {
  const heroInner = document.querySelector('.hero-inner');
  if (!heroInner) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;
  const MAX_DEG = 8;
  const LERP = 0.07;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    currentX = lerp(currentX, targetX, LERP);
    currentY = lerp(currentY, targetY, LERP);
    heroInner.style.transform =
      `perspective(1200px) rotateX(${currentY.toFixed(3)}deg) rotateY(${currentX.toFixed(3)}deg)`;
    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2; // -1 → +1
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2; // -1 → +1
    targetX =  nx * MAX_DEG;
    targetY = -ny * MAX_DEG;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });
})();

