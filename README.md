# ToolTwin — Project Showcase Site

A Next.js (App Router, TypeScript) site that walks through the ToolTwin VR project: overview, system architecture, storyboard, demo video, user study, and team.

UI only — no backend, no database, no API calls.

## Run locally

You need **Node.js 18.17+** (or 20.x — recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
tooltwin-site/
├── app/
│   ├── globals.css      # Tailwind + custom styles, font imports
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Single tabbed page
├── components/
│   ├── ui.tsx           # Shared primitives (SectionHeader, FigureCard, Pill, ...)
│   └── tabs/
│       ├── OverviewTab.tsx
│       ├── SystemTab.tsx
│       ├── StoryboardTab.tsx
│       ├── DemoTab.tsx
│       ├── StudyTab.tsx
│       └── TeamTab.tsx
├── public/
│   └── images/          # Project assets (architecture, storyboard, charts, etc.)
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

## Replace the placeholder YouTube video

Open `components/tabs/DemoTab.tsx` and change the `YOUTUBE_ID` constant near the top to your real video ID:

```ts
const YOUTUBE_ID = "YOUR_VIDEO_ID_HERE";
```

(Example: for `https://www.youtube.com/watch?v=abc123XYZ`, the ID is `abc123XYZ`.)

## Replace project images

All images live in `public/images/`. Replace any of the files in place with your own version (same filename), and the site will pick them up — no code changes needed.

## Design notes

The site uses two fonts loaded from Google Fonts:

- **Fraunces** — display serif, used for titles and stat numbers
- **Geist** — sans-serif body
- **JetBrains Mono** — for eyebrow labels and code-y text

Color palette is defined as Tailwind tokens in `tailwind.config.js` (`ink`, `slate`, `muted`, `bone`, `cream`, plus four `accent.*` shades) — same palette as the report figures, for visual continuity.
