/* =====================================================================
   A Special Delivery — script.js
   EDIT THESE before publishing:
   - LETTER_TEXT      : your letter, plain text, \n\n for paragraph breaks
   - START_DATE        : already set to 19 Apr 2023, 12:00 AM
   - SPOTIFY_URL / TIKTOK_URL
   - assets/music.mp3  : your song file (plays once, when the letter opens)
   - assets/photo.jpg  : referenced by .glass-card__photo in style.css
   ===================================================================== */

const LETTER_TEXT = `My dearest,

[ Paste your letter here. Keep paragraph breaks by leaving a blank line
between paragraphs — the typewriter will honor them. ]

Forever yours.`;

const START_DATE = new Date('2023-04-19T00:00:00');
const SPOTIFY_URL = '#'; // paste your playlist link
const TIKTOK_URL = '#';  // paste your TikTok link

/* ---------------------------------------------------------------- */

const scenes = ['loading', 'postman', 'envelope', 'letter', 'timer', 'links', 'ending'];
let currentSceneIndex = 0;

function showScene(name) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('scene-' + name);
  if (el) el.classList.add('active');
  currentSceneIndex = scenes.indexOf(name);
}

function goNext() {
  const next = scenes[currentSceneIndex + 1];
  if (next) showScene(next);
}

/* ---------- night sky: stars + shooting stars ---------- */
function buildStars() {
  const field = document.getElementById('stars');
  const count = window.innerWidth < 500 ? 55 : 100;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star' + (Math.random() < 0.15 ? ' big' : '');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 65 + '%';
    s.style.animationDelay = (Math.random() * 4) + 's';
    s.style.animationDuration = (3 + Math.random() * 3) + 's';
    field.appendChild(s);
  }
}

function shootStar() {
  const sky = document.getElementById('sky');
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.top = (Math.random() * 30 + 5) + '%';
  s.style.left = (Math.random() * 40 + 45) + '%';
  sky.appendChild(s);
  setTimeout(() => s.remove(), 1500);
}
function scheduleShootingStars() {
  setInterval(() => { if (Math.random() < 0.6) shootStar(); }, 4500);
}

/* ---------- falling lily petals ---------- */
function spawnPetal() {
  const field = document.getElementById('petalField');
  const p = document.createElement('div');
  p.className = 'petal';
  const left = Math.random() * 100;
  const duration = 7 + Math.random() * 6;
  const drift = (Math.random() - 0.5) * 160;
  p.style.left = left + '%';
  p.style.setProperty('--drift', drift + 'px');
  p.style.animationDuration = duration + 's';
  p.style.width = p.style.height = (8 + Math.random() * 8) + 'px';
  field.appendChild(p);
  setTimeout(() => p.remove(), duration * 1000 + 200);
}
let petalInterval = null;
function startPetals(rate = 600) {
  if (petalInterval) return;
  petalInterval = setInterval(spawnPetal, rate);
}

/* ---------- Scene 1: loading ---------- */
function runLoading() {
  showScene('loading');
  const fill = document.getElementById('loadingFill');
  const sub = document.getElementById('loadingSub');
  requestAnimationFrame(() => { fill.style.width = '100%'; });
  setTimeout(() => { sub.textContent = 'a special delivery is on its way\u2026'; }, 2200);
  setTimeout(() => {
    showScene('postman');
    runPostmanArrival();
  }, 4200);
}

/* ---------- Scene 2-4: postman sequence ---------- */
function runPostmanArrival() {
  const postman = document.getElementById('postman');
  const bubble = document.getElementById('speechBubble');
  postman.classList.add('walking');

  setTimeout(() => {
    postman.classList.remove('walking');
    postman.classList.add('arrived');
    bubble.classList.add('show');
    document.getElementById('tapHint').style.opacity = '1';
    armPostmanTap();
  }, 3500);
}

let postmanStage = 0; // 0 = arrived (tap for lilies), 1 = lilies given (tap for letter), 2 = done
function armPostmanTap() {
  const postman = document.getElementById('postman');
  postman.onclick = () => {
    postman.classList.add('bounce-tap');
    setTimeout(() => postman.classList.remove('bounce-tap'), 400);

    if (postmanStage === 0) {
      handOverLilies();
    } else if (postmanStage === 1) {
      handOverEnvelope();
    }
  };
}

function handOverLilies() {
  postmanStage = 1;
  const bubble = document.getElementById('speechBubble');
  const speechText = document.getElementById('speechText');
  const lilies = document.getElementById('handoffLilies');
  const hint = document.getElementById('tapHint');

  bubble.classList.remove('show');
  hint.style.opacity = '0';
  startPetals(500);

  setTimeout(() => {
    lilies.classList.add('show');
    speechText.textContent = 'These lilies are for you.';
    setTimeout(() => {
      bubble.classList.add('show');
      setTimeout(() => {
        bubble.classList.remove('show');
        setTimeout(() => {
          speechText.textContent = "And this letter comes straight from someone's heart.";
          bubble.classList.add('show');
          hint.textContent = 'tap the postman';
          hint.style.opacity = '1';
        }, 500);
      }, 2200);
    }, 400);
  }, 300);
}

function handOverEnvelope() {
  postmanStage = 2;
  const bubble = document.getElementById('speechBubble');
  const hint = document.getElementById('tapHint');
  const postman = document.getElementById('postman');
  const envelope = document.getElementById('handoffEnvelope');

  bubble.classList.remove('show');
  hint.style.opacity = '0';
  envelope.classList.add('show');
  postman.classList.add('waving');

  setTimeout(() => {
    postman.style.transition = 'left 2.2s ease-in, opacity 1.8s ease-in';
    postman.style.left = '-240px';
    postman.style.opacity = '0';
  }, 1200);

  setTimeout(() => {
    showScene('envelope');
    armEnvelopeTap();
  }, 3600);
}

/* ---------- Scene 5: envelope opening ---------- */
function armEnvelopeTap() {
  const envelope = document.getElementById('envelope');
  const hint = document.getElementById('envHint');
  envelope.onclick = () => {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    hint.style.opacity = '0';
    burstSparkles();
    playMusicOnce();
    setTimeout(() => {
      showScene('letter');
      runTypewriter();
    }, 2200);
  };
}

function burstSparkles() {
  const burst = document.getElementById('sparkleBurst');
  for (let i = 0; i < 22; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    sp.style.left = '50%';
    sp.style.top = '40%';
    sp.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    sp.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    sp.style.animationDelay = (Math.random() * 0.3) + 's';
    burst.appendChild(sp);
    setTimeout(() => sp.remove(), 1400);
  }
}

function playMusicOnce() {
  const audio = document.getElementById('bgAudio');
  audio.currentTime = 0;
  audio.play().catch(() => { /* browser blocked autoplay until first user gesture — the envelope tap counts as one */ });
}

/* ---------- Scene 6: typewriter ---------- */
function runTypewriter() {
  const body = document.getElementById('letterBody');
  const caret = document.getElementById('letterCaret');
  const nextBtn = document.getElementById('nextThingBtn');
  body.textContent = '';
  nextBtn.classList.remove('show');

  const text = LETTER_TEXT;
  let i = 0;
  const speed = 32;

  function tick() {
    if (i < text.length) {
      body.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    } else {
      caret.style.display = 'none';
      setTimeout(() => nextBtn.classList.add('show'), 500);
    }
  }
  tick();
}

document.getElementById('nextThingBtn').addEventListener('click', () => {
  showScene('timer');
  startTimer();
});

/* ---------- Scene 8: live timer ---------- */
let timerHandle = null;
function startTimer() {
  if (timerHandle) return;
  function update() {
    const now = new Date();
    let diff = Math.max(0, now - START_DATE) / 1000; // seconds

    const years = Math.floor(diff / (365.25 * 24 * 3600));
    diff -= years * 365.25 * 24 * 3600;
    const days = Math.floor(diff / (24 * 3600));
    diff -= days * 24 * 3600;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const mins = Math.floor(diff / 60);
    diff -= mins * 60;
    const secs = Math.floor(diff);

    document.getElementById('tYears').textContent = String(years).padStart(2, '0');
    document.getElementById('tDays').textContent = String(days).padStart(3, '0');
    document.getElementById('tHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('tMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('tSecs').textContent = String(secs).padStart(2, '0');
  }
  update();
  timerHandle = setInterval(update, 1000);
}

document.getElementById('toLinksBtn').addEventListener('click', () => {
  showScene('links');
});

/* ---------- Scene 9: links ---------- */
document.getElementById('spotifyBtn').setAttribute('href', SPOTIFY_URL);
document.getElementById('tiktokBtn').setAttribute('href', TIKTOK_URL);
document.getElementById('finalNoteBtn').addEventListener('click', () => {
  showScene('ending');
  const audio = document.getElementById('bgAudio');
  const fade = setInterval(() => {
    if (audio.volume > 0.05) { audio.volume -= 0.05; }
    else { audio.pause(); clearInterval(fade); }
  }, 200);
});

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded', () => {
  buildStars();
  scheduleShootingStars();
  runLoading();
});
