/* ===================================================
   ALEX MORGAN PORTFOLIO — script.js
   =================================================== */

/* ── PARTICLE CANVAS ───────────────────────────────── */
const cv = document.getElementById('particleCanvas');
const cx = cv.getContext('2d');
let W, H, pts = [];

function rsz() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
rsz();
window.addEventListener('resize', rsz);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.vx   = (Math.random() - .5) * .35;
    this.vy   = (Math.random() - .5) * .35;
    this.r    = Math.random() * 1.5 + .4;
    this.life = Math.random() * 200 + 100;
    this.age  = 0;
    const c   = [[0,245,255],[255,45,120],[0,255,136],[245,230,66]];
    this.col  = c[~~(Math.random() * c.length)];
  }
  update() {
    this.age++;
    if (this.age > this.life) this.reset();
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
    const a = Math.sin(this.age / this.life * Math.PI) * .8;
    cx.beginPath();
    cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(${this.col[0]},${this.col[1]},${this.col[2]},${a})`;
    cx.fill();
  }
}

for (let i = 0; i < 130; i++) pts.push(new Particle());

function drawLines() {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 90) {
        cx.beginPath();
        cx.moveTo(pts[i].x, pts[i].y);
        cx.lineTo(pts[j].x, pts[j].y);
        cx.strokeStyle = `rgba(0,245,255,${.055 * (1 - d / 90)})`;
        cx.lineWidth   = .5;
        cx.stroke();
      }
    }
  }
}

(function animLoop() {
  cx.clearRect(0, 0, W, H);
  drawLines();
  pts.forEach(p => p.update());
  requestAnimationFrame(animLoop);
})();

/* ── CURSOR GLOW EFFECT ────────────────────────────── */
const cur  = document.getElementById('cur');
const curT = document.getElementById('curT');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});

(function trailLoop() {
  tx += (mx - tx) * .12;
  ty += (my - ty) * .12;
  curT.style.left = tx + 'px'; curT.style.top = ty + 'px';
  requestAnimationFrame(trailLoop);
})();

document.querySelectorAll('a, button, .pj-card, .sk-card, .c-item, .sb').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ── STICKY HEADER ─────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('hdr').classList.toggle('sc', scrollY > 40);
});

/* ── MOBILE HAMBURGER MENU ─────────────────────────── */
const ham = document.getElementById('ham');
const nav = document.getElementById('nav');

ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ANIMATION ───────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: .1 });

document.querySelectorAll('.rv, .rl, .rr').forEach(el => revealObs.observe(el));

/* ── ANIMATED SKILL BARS ───────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target.querySelector('.sk-b');
      if (bar && !bar.done) {
        bar.style.width = bar.dataset.p + '%';
        bar.done = true;
      }
    }
  });
}, { threshold: .3 });

document.querySelectorAll('.sk-card').forEach(c => barObs.observe(c));

/* ── 3D CARD TILT ──────────────────────────────────── */
document.querySelectorAll('.pj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `translateY(-12px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── TYPEWRITER HERO TAG ───────────────────────────── */
const messages = [
  "Available for new projects",
  "Open to collaborations",
  "Building something epic?",
  "Let's create the future"
];
let msgIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeIt() {
  const msg = messages[msgIndex];
  if (!isDeleting) {
    if (charIndex <= msg.length) {
      typedEl.textContent = msg.slice(0, charIndex);
      charIndex++;
      setTimeout(typeIt, 80);
    } else {
      isDeleting = true;
      setTimeout(typeIt, 2200);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      typedEl.textContent = msg.slice(0, charIndex);
      setTimeout(typeIt, 40);
    } else {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      setTimeout(typeIt, 400);
    }
  }
}
setTimeout(typeIt, 1000);

/* ── LOCAL STORAGE HELPERS ─────────────────────────── */
function loadFeedbacks() {
  try { return JSON.parse(localStorage.getItem('pflio_v2')) || []; }
  catch { return []; }
}
function saveFeedbacks(arr) {
  localStorage.setItem('pflio_v2', JSON.stringify(arr));
}
function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ── RENDER STORED FEEDBACK ────────────────────────── */
function renderFeedbacks() {
  const data = loadFeedbacks();
  const el   = document.getElementById('fb-sec');
  if (!data.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <h3>// Messages (${data.length})</h3>
    <div class="fb-cards">
      ${data.map(f => `
        <div class="fb-c">
          <div class="fb-h">
            <span class="fb-nm">${escapeHTML(f.name)}</span>
            <span class="fb-dt">${f.date}</span>
          </div>
          <div class="fb-em">${escapeHTML(f.email)}</div>
          <div class="fb-ms">${escapeHTML(f.msg)}</div>
        </div>`).join('')}
    </div>`;
}

/* ── FORM VALIDATION & SUBMISSION ──────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function setFieldError(inputEl, errId, show) {
  inputEl.classList.toggle('err', show);
  document.getElementById(errId).classList.toggle('on', show);
}

document.getElementById('cForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nameEl = document.getElementById('fn');
  const mailEl = document.getElementById('fe');
  const msgEl  = document.getElementById('fm');
  let valid = true;

  // Validate name
  if (!nameEl.value.trim()) {
    setFieldError(nameEl, 'ne', true); valid = false;
  } else {
    setFieldError(nameEl, 'ne', false);
  }

  // Validate email
  if (!isValidEmail(mailEl.value.trim())) {
    setFieldError(mailEl, 'ee', true); valid = false;
  } else {
    setFieldError(mailEl, 'ee', false);
  }

  // Validate message
  if (!msgEl.value.trim()) {
    setFieldError(msgEl, 'me', true); valid = false;
  } else {
    setFieldError(msgEl, 'me', false);
  }

  if (!valid) return;

  // Save to localStorage
  const feedbacks = loadFeedbacks();
  feedbacks.unshift({
    name:  nameEl.value.trim(),
    email: mailEl.value.trim(),
    msg:   msgEl.value.trim(),
    date:  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  saveFeedbacks(feedbacks);

  // Show success message
  const banner = document.getElementById('succ');
  banner.classList.add('on');
  this.reset();
  renderFeedbacks();
  setTimeout(() => banner.classList.remove('on'), 5000);
});

// Clear errors on input
['fn', 'fe', 'fm'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    this.classList.remove('err');
    const map = { fn: 'ne', fe: 'ee', fm: 'me' };
    if (map[id]) document.getElementById(map[id]).classList.remove('on');
  });
});

/* ── INIT ──────────────────────────────────────────── */
renderFeedbacks();
