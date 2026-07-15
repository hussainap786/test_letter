# A Special Delivery 💌

A nine-scene interactive love letter: night sky → postman → lilies →
envelope → typewriter letter → live "since we met" counter → playlist/TikTok
links → falling-petal ending. Built with plain HTML/CSS/JS — no build step,
no dependencies, works as a static GitHub Pages site.

All illustrations (postman, lilies, moon, petals, favicon) are hand-built
SVG so the whole thing loads instantly and never has a broken image.

## 1. Customize your content

Open **`script.js`** and edit the `CONFIG` object at the very top. That's
the only place you need to touch for content:

| Field | What it is |
|---|---|
| `speech` | What the postman says in the speech bubble |
| `letterGreeting` / `letterBody` / `letterSignoff` | Your actual letter. Use `\n\n` for a paragraph break |
| `metSince` | The exact date & time you met, format `"YYYY-MM-DDTHH:MM:SS"` — powers the live timer |
| `playlistUrl` | Your Spotify playlist link |
| `tiktokUrl` | Your TikTok link |
| `finalNote` | The short note revealed by the "Final Note" button |

## 2. Add music (optional)

Drop an MP3 file named exactly `music.mp3` in this folder, next to
`index.html`. If you skip this step the site still works fine — the music
button just won't play anything.

## 3. Preview it locally

Just open `index.html` in a browser — no server needed. On your phone,
you can also zip the folder, upload to Google Drive, and open the HTML
file from there for a quick check before publishing.

## 4. Publish on GitHub Pages (free hosting)

1. Create a new **public** repo on GitHub, e.g. `a-special-delivery`.
2. Upload every file in this folder, keeping the `assets/` folder structure intact.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. Wait a minute, then your site is live at:
   `https://<your-username>.github.io/a-special-delivery/`

Share that link — that's the site she'll open.

## Notes on the two "extra" features

- **Vibration**: `navigator.vibrate()` only works on Android Chrome —
  iPhones (Safari) don't support the Vibration API at all, so on iOS this
  silently does nothing rather than breaking anything.
- **Music autoplay**: mobile browsers block audio until the user taps
  something first. That's why the first screen has a tap-to-open button —
  it also unlocks audio for the music toggle that appears later.

## File map

```
A-Special-Delivery/
├── index.html      all 9 scenes (markup only, no inline styles/logic)
├── style.css        design tokens + every animation
├── script.js        CONFIG (edit this) + the scene engine
├── music.mp3         optional, you add this
└── assets/
    ├── postman.svg   (inlined in index.html so its limbs can be animated)
    ├── lilies.svg
    ├── moon.svg
    ├── petal.svg
    └── favicon.svg
```
