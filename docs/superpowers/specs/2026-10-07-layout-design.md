# Layout: laptop panes + mobile scroll column

Date: 2026-10-07 · Status: approved in conversation

## Goal

Rearrange the page so its components sit the way krishnagupta.web.app places
them (portrait-led header, meta list, link pills, dotted rules, labelled
sections), while keeping this site's own concept: the live tile-grid wall, the
sideways pane strip on laptops, matte black, and the living portrait.

Two experiences:

- **Laptop** (wider than 760px): the existing full-screen grid and sideways
  panes stay. Only the inside of the panes is rearranged.
- **Mobile** (760px wide or less, or a coarse pointer with a viewport under
  500px tall, so phones in landscape stay mobile): a vertical scroll column over
  the grid.

## Content (no new sections)

Existing content only, plus header details that need no new writing:

- role line: "full-stack engineer"
- meta list (monospace, line icons): `ai engineer intern @ kpoint`, live India
  clock (`10:42 pm · tuesday`, updates each minute), `india`, email (click
  copies; existing copy toast and tile burst kept)
- link pills: GitHub, LinkedIn, X, Instagram, `cv ↗` (opens `/CV.pdf`)

Out of scope: right now / toolkit / education sections, theme toggle, sound.

## Laptop

About pane, top to bottom:

1. Header: portrait (88px card) with name + role beside it; the speech bubble
   pops from the portrait's top-right corner.
2. Meta list, then link pills.
3. Dotted rule, small lowercase label `about`, the bio.
4. Dotted rule, nav rows: `work` → KPoint Technologies, `projects` → Projects.
   These open the existing panes exactly as today.

KPoint, Projects and project-detail panes get the same small labels and dotted
rules. Grid, ROHAN intro, pane animations and routes are unchanged.

## Mobile

- The grid canvas stays a fixed full-screen backdrop running in a "no pane"
  mode (light field spans the full width; no camera panning).
- A scrolling `#column` sits over it:
  - transparent hero (~42% of the viewport) showing the live grid; taps there
    ripple it,
  - the portrait card overlaps the hero's bottom edge,
  - solid sections: header (name, role, meta, pills), about, work (KPoint
    content in full), projects (each project expands in place),
  - thin transparent "grid windows" between sections so the grid peeks through.
- The same article nodes are moved into the column (no duplicated content).
- Routes: `/work/kpoint` scrolls to work; `/projects` scrolls to projects;
  `/projects/<name>` scrolls to and expands that project. In-page links update
  the URL the same way.
- The ROHAN intro is skipped on phones (the word does not fit).
- Crossing the breakpoint (e.g. dragging a desktop window narrow) reloads the
  page into the other layout rather than reflowing live.

## Shared

- The portrait keeps all behaviour (gaze, blink, sleep, pokes, bubbles).
- Reduced-motion handling unchanged.
- After editing `index.html`, regenerate route pages.

## Testing

Playwright screenshots at 1440×900, 1280×720, 768×1024, 390×844 and 844×390;
deep links `/`, `/work/kpoint`, `/projects`, `/projects/jarvis` in both layouts;
portrait states; copy-email; no console errors.
