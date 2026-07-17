# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js on localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured.

## Architecture

Single-page marketing site for "Craftverse" — a Squid Game-themed hackathon. One route (`/`), all content in `src/app/page.tsx`.

**Loading gate pattern**: `page.tsx` preloads 192 video frames + 1 hero image before revealing any content. `imagesLoaded` and `preloadedImages` state flow down to child components via props. Every animated component accepts `isReady: boolean` and gates its `animate` prop on it — nothing animates until the loading screen exits.

**Video scrub**: `VideoScrubSection` receives the preloaded `HTMLImageElement[]` array and draws frames to a `<canvas>` pinned `fixed` behind all content (`z-[-1]`). Frame index interpolates smoothly against `window.scrollY` using `requestAnimationFrame`. This canvas is the page background.

**Component layout** (render order in `page.tsx`):
- `LoadingScreen` — fullscreen black overlay with Framer Motion `AnimatePresence` exit; removed from DOM once `imagesLoaded` is true
- `Navbar` — `absolute` positioned over Hero; collapses to hamburger on mobile with a fullscreen overlay
- `Hero` — viewport-height section with large outline text (`CRAFT` / `VERSE`), guard character image, floating info cards
- `StatsBar` — horizontal stat grid, scroll-triggered via Framer Motion `whileInView`
- `VideoScrubSection` — renders only the fixed canvas (no scroll-height contribution)
- `CoreContent` — main content sections (`#about`, `#rules`, `#games`) with parallax shapes and an animated counter
- `Footer` — bottom of page

**Styling**: Tailwind CSS v4 (`@import "tailwindcss"` syntax, no config file). Custom design tokens defined in `globals.css` under `@theme inline`:
- `--color-cv-pink: #F62A54` (primary accent)
- `--color-cv-teal: #037A76` (secondary accent)
- `--font-sans` → Inter, `--font-display` → Outfit

**Animation stack**: Framer Motion for entrance/exit animations; GSAP (`@gsap/react`) is installed but not yet used. Custom keyframes (`glitch`, `shine`, `glow-pink`, `glow-white`) defined in `globals.css`.

**Public assets**: Video frames live at `/public/frames/frame_0001.jpg` through `frame_0192.jpg`. Hero character is `/public/squid_guard_final.png`.
