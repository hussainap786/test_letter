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
hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh teststtstststssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
Forever yours.`;

const START_DATE = new Date('2023-04-19T00:00:00');
const SPOTIFY_URL = 'https://open.spotify.com/playlist/0PJtdbtRpToQ7r6ka4PYQO?si=udOmEo_xRLiPKkVyaMK9ow&utm_source=copy-link&pt=3af1d42a8dd8920f21532e30581e5bd6';
const TIKTOK_URL = 'https://www.tiktok.com/@hap.05.5?_r=1&_t=ZS-983Xlv5F40A';

/* ---------------------------------------------------------------- */

const scenes = ['intro', 'loading', 'postman', 'envelope', 'timer', 'links', 'ending'];
let currentSceneIndex = 0;

function showScene(name) {
  const next = document.getElementById('scene-' + name);
  if (!next) return;
  const current = document.querySelector('.scene.active');
  if (current === next) return;
  currentSceneIndex = scenes.indexOf(name);

  const corner = document.getElementById('cornerBouquet');
  if (corner) corner.classList.toggle('show', name === 'envelope');

  if (current) {
    current.classList.remove('active');
    current.classList.add('leaving');
    setTimeout(() => { current.classList.remove('leaving'); }, 1050);
  }

  next.classList.add('entering');
  void next.offsetWidth;
  next.classList.remove('entering');
  next.classList.add('active');
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
    const env = document.getElementById('envelope');
    const envHint = document.getElementById('envHint');
    envHint.style.opacity = '0';
    env.classList.remove('arrive');
    void env.offsetWidth; // restart the animation
    env.classList.add('arrive');
    setTimeout(() => { envHint.style.opacity = '1'; }, 1500);
    armEnvelopeTap();
  }, 4000);
}

/* ---------- Scene 5: envelope opening ---------- */
function armEnvelopeTap() {
  const envelope = document.getElementById('envelope');
  const paper = document.getElementById('envLetterPaper');
  const hint = document.getElementById('envHint');
  envelope.onclick = () => {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    hint.style.opacity = '0';
    burstSparkles();
    playMusicOnce();

    // start the grow-into-full-letter morph only once the rise-out-of-envelope
    // transition has actually finished — starting it on a guessed timer instead
    // of this event is what caused the old jump/pop partway through
    paper.addEventListener('transitionend', function onRiseDone(e) {
      if (e.propertyName !== 'transform') return;
      paper.removeEventListener('transitionend', onRiseDone);
      expandLetter();
    });
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
  try { audio.currentTime = 0; } catch (e) { /* not loaded enough yet — fine, play() still starts from 0 */ }
  const playPromise = audio.play();
  if (playPromise && playPromise.catch) {
    playPromise.catch(() => { /* browser blocked autoplay until first user gesture — the envelope tap counts as one */ });
  }
}

/* ---------- Scene 6: the paper grows into the full letter ---------- */
function expandLetter() {
  const paper = document.getElementById('envLetterPaper');
  const envelope = document.getElementById('envelope');
  const hint = document.getElementById('envHint');

  envelope.classList.add('hide-shell');
  hint.style.opacity = '0';

  // switch to the fixed, centered full-letter layout (defined entirely in CSS —
  // no live measurement math, so it can't land off-center or get a bad transform)
  paper.classList.add('expanded');
  void paper.offsetWidth; // paint one frame at opacity:0/scale:0.86 before animating in
  paper.classList.add('show');

  let settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    document.getElementById('letterPlaceholder').style.display = 'none';
    document.getElementById('letterHeartIcon').style.display = 'none';
    document.getElementById('letterContent').classList.add('show');
    runTypewriter();
  }
  paper.addEventListener('transitionend', function onDone(e) {
    if (e.propertyName !== 'opacity') return;
    paper.removeEventListener('transitionend', onDone);
    settle();
  });
  // safety net: some mobile browsers can miss a transitionend under load —
  // never leave the letter stuck unreadable if that happens
  setTimeout(settle, 1400);
}

/* ---------- typewriter ---------- */
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
  fadeOutMusic();
});

function fadeOutMusic() {
  const audio = document.getElementById('bgAudio');
  if (audio.paused) return;
  const fade = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      audio.volume = 1;
      clearInterval(fade);
    }
  }, 80);
}

/* ---------- Scene 8: live timer ---------- */
let timerHandle = null;
function startTimer() {
  if (timerHandle) return;
  function update() {
    const now = new Date();
    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();
    let hours = now.getHours() - START_DATE.getHours();
    let mins = now.getMinutes() - START_DATE.getMinutes();
    let secs = now.getSeconds() - START_DATE.getSeconds();

    if (secs < 0) { secs += 60; mins--; }
    if (mins < 0) { mins += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) { months += 12; years--; }
    years = Math.max(0, years); months = Math.max(0, months); days = Math.max(0, days);
    hours = Math.max(0, hours); mins = Math.max(0, mins); secs = Math.max(0, secs);

    document.getElementById('tYears').textContent = String(years).padStart(1, '0');
    document.getElementById('tMonths').textContent = String(months).padStart(1, '0');
    document.getElementById('tDays').textContent = String(days).padStart(1, '0');
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
  fadeOutMusic();
});

/* ---------- music toggle ---------- */
function initMusicToggle() {
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgAudio');
  btn.addEventListener('click', () => {
    if (audio.paused) {
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      audio.pause();
    }
  });
  audio.addEventListener('play', () => btn.classList.add('playing'));
  audio.addEventListener('pause', () => btn.classList.remove('playing'));
  audio.addEventListener('ended', () => btn.classList.remove('playing'));
}

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded', () => {
  buildStars();
  scheduleShootingStars();
  initMusicToggle();
  showScene('intro');
  document.getElementById('openBtn').addEventListener('click', runLoading);
});
