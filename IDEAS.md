# Portfolio detail backlog

Small, delightful details to add one at a time. The site's signature is the
reactive tile-grid wall (`#wall` canvas) — the best ideas make *the grid itself*
do something, rather than bolting widgets on top of it.

Inspiration: https://krishnagupta.web.app/ (playful microcopy, "press r",
sound + haptics toggle, "hey, you there?" call, "human." tab, draggable toolkit,
"you reached the end").

**Rules for every item**
- Respect `prefers-reduced-motion` (there is already a `syncMotionPreference` hook).
- No new dependencies or asset files unless unavoidable — synthesize (WebAudio, canvas).
- Must work on touch. Must not break routing (`/`, `/work/kpoint`, `/projects/*`).
- After editing `index.html`, re-run `node scripts/generate-route-pages.mjs`.

Status: `[ ]` todo · `[~]` in progress · `[x]` shipped · `[-]` dropped

---

## Tier 1 — Quick wins (≤ 1 hr each)

- [ ] **1. "Go on, wake it up" hint** — tiny muted line under the name inviting
  people to touch the grid. Fades out forever after the first pointer move
  (remember in `localStorage`).
- [ ] **2. Tab-away title** — when the tab is hidden, title becomes
  `"the tiles miss you"`; restore on return. Hook into the existing
  `visibilitychange` handler.
- [ ] **3. Devtools console greeting** — styled `console.log` with an ASCII
  monogram + "looking under the hood? → github.com/THEROHAN01". Expose
  `hire()` that prints email and CV link.
- [ ] **4. Local clock + status line** — "it's 2:14 am in India · probably
  shipping something". Copy changes with the hour (sleeping / coffee / shipping).
- [ ] **5. "Now" line** — one line on the about pane: *currently building Bodh
  with Sarvam AI*. Cheap, always-fresh signal.
- [ ] **6. Pane counter** — small `01 / 03 · about` label on each pane header,
  borrowing the reference's numbering.
- [x] **7. Copy-email with a tile burst** — click email → copied to clipboard,
  grid fires a splash from the cursor (reuse `mouseSpark`/`stampWake`), toast
  says "copied. talk soon."

## Tier 2 — Signature moments (the "wait, what?" stuff)

- [x] **8. Grid writes your name on load** — the wall lights tiles to spell
  `ROHAN` (5×7 pixel font) for ~1.5s, then dissolves into the normal noise.
- [ ] **9. Project pixel-icons** — hovering a project link makes the wall draw
  a tiny pixel glyph: a turtle for turtleauth, a helmet for jarvis, a crowd
  wave for crowd-vibe, a brain for brainly, a lock for lockedin.
- [ ] **10. Idle mode: Game of Life** — after 30s without input the grid
  quietly starts running Conway's Game of Life on its own tiles. Any input
  "wakes" it back. Nerdy, on-brand, zero assets.
- [ ] **11. Sound + haptics toggle** — soft WebAudio clicks/plinks when tiles
  get hit (pitch follows x-position, so dragging plays a scale);
  `navigator.vibrate(5)` on mobile taps. Off by default, toggle in a corner.
- [ ] **12. Keyboard shortcuts** — `r` = ripple from centre, `?` = shortcut
  sheet, `1/2/3` = jump to about / kpoint / projects, `g` then `h` = GitHub.
  Extend the existing `keydown` handler.
- [~] **25. Living character ("buddy")** — inspired by the reference's
  self-portrait: eyes follow the cursor, blinks, idle glances, dozes off after
  20s ("z z Z"), poke reactions (annoyed → "429: too many pokes" → ignores
  you), remembers visits, comments on pane changes. Lives in Rohan's own
  drawn portrait in the about pane (an earlier tile-sprite body was dropped).
- [ ] **13. Time-of-day palette** — teal by day, deeper ocean blue at night,
  warm amber around sunrise. Interpolate the existing LUT (`fillLUT`).

## Tier 3 — Easter eggs

- [ ] **14. Konami code → Snake** — ↑↑↓↓←→←→BA turns the wall into a playable
  Snake game on the tiles. Esc to exit. High score in `localStorage`.
- [ ] **15. "Hey, you there?" call** — a contact CTA styled as an incoming call:
  "ringing… connected" → reveals email / socials. Replaces a boring contact link.
- [ ] **16. Type-to-trigger words** — typing `hello`, `hire`, or `coffee`
  anywhere triggers a matching grid animation and a one-liner.
- [ ] **17. "You reached the end"** — at the far right of the strip, a small
  sign-off: "you reached the end. now see where we are :p" + link to the human pane.

## Tier 4 — New content panes

- [ ] **18. "human." pane** — the non-code side: what you're reading, listening
  to, @thesaltycoder, a couple of photos. Makes you a person, not a CV.
- [ ] **19. Toolkit pane** — tech chips (React, Node, Postgres, pgvector,
  LiveKit, AWS ECS…) you can drag and throw with simple physics;
  microcopy: "drag it, throw it, tidy up".
- [ ] **20. Shipping log** — a mini changelog of the site itself, generated at
  build time: "last shipped 3 days ago · 054d99c".

## Tier 5 — Polish & infra

- [ ] **21. Real OG image** — render the tile grid + name to a 1200×630 PNG
  (there's a TODO in `<head>` for `/og.jpg`).
- [ ] **22. Print stylesheet** — `Ctrl+P` on the site produces a clean one-page
  résumé instead of a dark screenshot.
- [ ] **23. 404 as a toy** — tiles spell `404` and scatter on hover; "this
  page wandered off. here's the way home."
- [ ] **24. Time-on-site wink** — after 3 minutes, a tiny line appears:
  "still here? that's kind of you."

---

## Log

| # | Item | Shipped | Notes |
|---|------|---------|-------|
| 8 | Name on load | 2026-10-07 · 7c21f9d | Skipped on phones (field off-screen) and with reduced motion. Tunables in `INTRO` const. |
| 7 | Copy-email burst | 2026-10-07 | Email link copies instead of mailto (fallback kept). Tiles fly out of the wall edge level with the link; inline "copied. talk soon." toast; portrait says "i'll write back. promise." Address from CV. |
| 25 | Living character | review | Portrait = Rohan's own ink drawing split into layers (`me/rohan.webp` base without pupils/brows/mouth + two brow layers); live pupils hang from fitted eyelid curves (`ART_EYES`), SVG mouths + blush overlay, zoomed to the face in a 112px cream card. Handwritten bubbles via self-hosted Architects Daughter. Lines in `BUDDY_LINES`. |
