<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>A Special Delivery</title>
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<!-- persistent background layers, live behind every scene -->
<div class="sky">
  <div class="stars"></div>
  <div class="stars stars--far"></div>
  <img class="moon" src="assets/moon.svg" alt="" aria-hidden="true">
</div>

<!-- falling petals layer, activated once the bouquet is delivered -->
<div class="petals" id="petals" aria-hidden="true"></div>

<!-- the lily bouquet stays pinned on screen once she's received it -->
<div class="kept-lilies" id="kept-lilies" aria-hidden="true">
  <img src="assets/lilies.svg" alt="">
</div>

<!-- background music: plays once, starting when the envelope opens -->
<audio id="bg-music" src="music.mp3" preload="none"></audio>
<button id="music-toggle" class="music-toggle" aria-label="Mute music" hidden>
  <span class="music-toggle__icon">♪</span>
</button>

<main id="stage">

  <!-- SCENE 0 — start gate (needed so audio/vibration are allowed to play) -->
  <section class="scene scene--active" id="scene-0" data-scene="0">
    <div class="scene__inner">
      <p class="eyebrow">for you</p>
      <h1 class="script-heading">A Special Delivery</h1>
      <button class="btn btn--primary" data-next>Open</button>
    </div>
  </section>

  <!-- SCENE 1 — welcome -->
  <section class="scene" id="scene-1" data-scene="1">
    <div class="scene__inner">
      <p class="welcome-line">A Special Delivery is on its way&hellip;</p>
    </div>
  </section>

  <!-- SCENE 2 — postman: walks in, gives lilies, gives envelope, waves, leaves -->
  <section class="scene" id="scene-2" data-scene="2">
    <div class="scene__inner scene__inner--ground">
      <div class="speech-bubble" id="speech-bubble">
        <p id="speech-text"></p>
      </div>
      <button class="postman-hit" id="postman-hit" aria-label="Tap the postman">
        <div class="postman-wrap" id="postman-wrap">
          <img id="postman-lilies" class="postman-lilies" src="assets/lilies.svg" alt="" aria-hidden="true">
          <svg id="postman" class="postman" viewBox="0 0 200 260" role="img" aria-label="A postman carrying a letter and lilies">
            <g id="leg-back" class="limb"><rect x="78" y="158" width="20" height="70" rx="9" fill="#5b6b8c"/><rect x="76" y="222" width="26" height="12" rx="5" fill="#2f2b52"/></g>
            <g id="arm-back" class="limb"><rect x="60" y="96" width="16" height="58" rx="8" fill="#6e4b3a"/><circle cx="68" cy="154" r="9" fill="#e8c9a8"/></g>
            <g id="bag"><path d="M40,150 L58,90" stroke="#8a5a3c" stroke-width="6" stroke-linecap="round"/><rect x="30" y="150" width="56" height="62" rx="10" fill="#8a5a3c"/><rect x="30" y="150" width="56" height="16" rx="8" fill="#a06c48"/><rect x="46" y="168" width="24" height="18" rx="3" fill="#f3e6cf"/></g>
            <path id="body" d="M70,70 Q100,52 130,70 L142,160 Q100,176 58,160 Z" fill="#6e4b3a"/>
            <path d="M70,70 Q100,52 130,70 L127,86 Q100,72 73,86 Z" fill="#8a5a3c"/>
            <circle cx="100" cy="98" r="3" fill="#f0dfa8"/><circle cx="100" cy="114" r="3" fill="#f0dfa8"/><circle cx="100" cy="130" r="3" fill="#f0dfa8"/>
            <circle id="head" cx="100" cy="44" r="24" fill="#e8c9a8"/>
            <path id="smile" d="M89,50 Q100,59 111,50" fill="none" stroke="#8a5a3c" stroke-width="2.4" stroke-linecap="round"/>
            <circle cx="90" cy="40" r="2.2" fill="#5b4636"/><circle cx="110" cy="40" r="2.2" fill="#5b4636"/>
            <g id="hat"><path d="M74,36 Q100,10 126,36 L126,40 L74,40 Z" fill="#2f2b52"/><rect x="70" y="36" width="60" height="8" rx="4" fill="#3b3768"/><ellipse cx="118" cy="40" rx="14" ry="5" fill="#1b1f3b"/><circle cx="100" cy="18" r="4" fill="#d9b872"/></g>
            <g id="leg-front" class="limb"><rect x="102" y="158" width="20" height="70" rx="9" fill="#4a5a7a"/><rect x="100" y="222" width="26" height="12" rx="5" fill="#20233f"/></g>
            <g id="arm-front" class="limb"><rect x="122" y="96" width="16" height="52" rx="8" fill="#8a5a3c"/><circle cx="130" cy="146" r="9" fill="#e8c9a8"/></g>
            <g id="hand-envelope" transform="translate(118,132)"><rect x="0" y="0" width="30" height="20" rx="2" fill="#faf3e4" stroke="#d9b872" stroke-width="1"/><path d="M0,0 L15,12 L30,0" fill="none" stroke="#d9b872" stroke-width="1.2"/></g>
          </svg>
        </div>
      </button>
      <p class="caption caption--tap" id="postman-prompt">Tap the postman</p>
    </div>
  </section>

  <!-- SCENE 3 — envelope alone, tap to open -->
  <section class="scene" id="scene-3" data-scene="3">
    <div class="scene__inner">
      <button class="envelope-hit" id="envelope-hit" aria-label="Pick up the envelope">
        <div class="envelope" id="envelope">
          <div class="envelope__back"></div>
          <div class="envelope__letter-peek"></div>
          <div class="envelope__front"></div>
          <div class="envelope__flap" id="envelope-flap"></div>
          <div class="envelope__seal" id="envelope-seal"></div>
        </div>
      </button>
      <p class="caption caption--tap">Tap the envelope to open it</p>
    </div>
  </section>

  <!-- SCENE 4 — letter, typewriter -->
  <section class="scene" id="scene-4" data-scene="4">
    <div class="scene__inner scene__inner--letter">
      <div class="letter-paper" id="letter-paper">
        <p class="letter-greeting" id="letter-greeting"></p>
        <p class="letter-body" id="letter-body"></p>
        <p class="letter-signoff" id="letter-signoff"></p>
      </div>
      <button class="btn btn--ghost" data-next id="after-letter-btn" hidden>Continue</button>
    </div>
  </section>

  <!-- SCENE 5 — since our paths crossed -->
  <section class="scene" id="scene-5" data-scene="5">
    <div class="scene__inner">
      <p class="eyebrow">since our paths crossed</p>
      <div class="timer" id="timer">
        <div class="timer__unit"><span class="timer__value" id="t-years">0</span><span class="timer__label">years</span></div>
        <div class="timer__unit"><span class="timer__value" id="t-months">0</span><span class="timer__label">months</span></div>
        <div class="timer__unit"><span class="timer__value" id="t-days">0</span><span class="timer__label">days</span></div>
        <div class="timer__unit"><span class="timer__value" id="t-hours">0</span><span class="timer__label">hours</span></div>
        <div class="timer__unit"><span class="timer__value" id="t-minutes">0</span><span class="timer__label">minutes</span></div>
        <div class="timer__unit"><span class="timer__value" id="t-seconds">0</span><span class="timer__label">seconds</span></div>
      </div>
      <button class="btn btn--ghost" data-next>Continue</button>
    </div>
  </section>

  <!-- SCENE 6 — one more thing -->
  <section class="scene" id="scene-6" data-scene="6">
    <div class="scene__inner">
      <p class="eyebrow">one more thing&hellip;</p>
      <div class="link-row">
        <a class="btn btn--link" id="playlist-link" href="#" target="_blank" rel="noopener">Our Playlist</a>
        <button class="btn btn--link" id="final-note-btn">Final Note</button>
        <a class="btn btn--link" id="tiktok-link" href="#" target="_blank" rel="noopener">TikTok</a>
      </div>
      <button class="btn btn--ghost" data-next>Continue</button>
    </div>

    <!-- final note modal -->
    <div class="modal" id="final-note-modal" hidden>
      <div class="modal__card">
        <p class="modal__text" id="final-note-text"></p>
        <button class="btn btn--ghost" id="final-note-close">Close</button>
      </div>
    </div>
  </section>

  <!-- SCENE 7 — ending -->
  <section class="scene" id="scene-7" data-scene="7">
    <div class="scene__inner">
      <p class="closing-line">This letter may end here&hellip;</p>
      <p class="closing-line closing-line--emph">But my feelings don&rsquo;t.</p>
      <button class="btn btn--ghost btn--restart" id="restart-btn">Read it again</button>
    </div>
  </section>

</main>

<script src="script.js"></script>
</body>
</html>
