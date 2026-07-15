# A Special Delivery 🤍

A storybook love-letter site: night sky → illustrated postman walks in →
hands over lilies → hands over an envelope → envelope opens with sparkles
→ your music starts → typewriter letter → live "time together" counter →
Spotify/TikTok buttons → soft fade ending.

Everything is hand-built in SVG + CSS + vanilla JS — no external animation
files to fetch, so it loads instantly and works on GitHub Pages with zero
setup.

## Before you publish, edit these 5 things

1. **Your letter** — open `script.js`, edit the `LETTER_TEXT` constant near
   the top. Leave a blank line between paragraphs.
2. **Your song** — drop an mp3 into `assets/music.mp3` (exact filename).
   It plays once, automatically, the moment the envelope opens — no loop.
3. **Your photo for the timer card** — drop an image into `assets/photo.jpg`,
   then in `style.css` find `.glass-card__photo` and add:
   `background-image: url('assets/photo.jpg');`
4. **Spotify + TikTok links** — in `script.js`, set `SPOTIFY_URL` and
   `TIKTOK_URL`.
5. **The start date** is already set to 19 April 2023, 12:00 AM
   (`START_DATE` in `script.js`) — change it there if it's ever wrong.

## Publishing to GitHub Pages

1. Create a new repo, add these 4 files (`index.html`, `style.css`,
   `script.js`, plus your `assets/` folder).
2. Push, then in the repo's **Settings → Pages**, set the source to your
   main branch, root folder.
3. Your link will be `https://<username>.github.io/<repo-name>/`.

## How the interaction flows

Loading → tap the postman once (lilies appear) → tap him again (he hands
over the envelope and walks off) → tap the envelope (it opens, music
starts, sparkles) → letter types itself out → "One More Thing…" → live
timer → "Continue" → Spotify / TikTok / Final Note buttons → ending.

## About the postman animation

You mentioned wanting Lottie specifically for the postman's walk/wave. I
built him as a hand-drawn SVG with a CSS walk-cycle (legs, arms, and a
slight bob) instead — it's the same "storybook" feel but with zero risk of
a broken external file link on launch day. If you'd still like a true
Lottie postman, find one you like on lottiefiles.com, send me the `.json`
URL, and I'll wire it in with the `lottie-web` library in place of the SVG
— the click logic and scene timing won't need to change.
