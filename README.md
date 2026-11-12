# PEG — Mumbai-First Nightlife Discovery & Planning

A production-grade, high-performance rebuild of the PEG concept landing page using **React 18**, **TypeScript** (strict mode), **Vite**, and **GSAP + Lenis** for cinematic, restrained motion.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run Vitest unit tests
npm test

# Lint with ESLint (zero errors/warnings)
npm run lint

# Format with Prettier
npm run format

# Production build (TypeScript check + Vite bundler)
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Architecture & File Structure

```
peg/
├── public/
│   ├── favicon.svg          # Crisp brand mark SVG favicon
│   ├── og.png               # High-res 1200x630 OpenGraph graphic
│   └── robots.txt           # SEO crawler rules
├── src/
│   ├── components/
│   │   ├── BackToTop/       # Floating button with smooth Lenis scroll to top
│   │   ├── Closing/         # Watermark parallax, Web Share API & demo form
│   │   ├── Faq/             # Native exclusive accordion (<details name="faq">)
│   │   ├── Footer/          # Semantic footer, working title & disclaimers
│   │   ├── Header/          # Sticky show/hide header, active indicator & mobile menu
│   │   ├── Hero/            # Hero intro, mask reveal, polaroid tilt & mouse parallax
│   │   ├── HowItWorks/      # Staggered step cards & chat conversation bubbles
│   │   ├── Mumbai/          # MMR exploratory area cloud & tag layout
│   │   ├── Planner/         # Stepper, budget choices, animated receipt & clipboard
│   │   ├── Prices/          # Filter chips, GSAP Flip grid & noun definition card
│   │   ├── ProgressBar/     # Top scrub indicator driven by ScrollTrigger
│   │   ├── Route/           # Interactive neighbourhood route tabs & stop details
│   │   ├── RunLine/         # Velocity-reactive infinite marquee band
│   │   ├── SkipLink/        # Accessible skip-to-content anchor
│   │   ├── Split/           # Equal vs fair-share animated progress bars
│   │   └── svg/
│   │       ├── HeroMap.tsx  # Hero route illustration with exposed animation refs
│   │       └── RouteMap.tsx # Route map with exposed scrub and draw refs
│   ├── data/
│   │   ├── budget.ts        # Budget plans, presets & scenario definitions
│   │   ├── faq.ts           # FAQ questions, answers & default-open states
│   │   ├── mumbai.ts        # Neighbourhood tags & future MMR expansion areas
│   │   ├── routes.ts        # Multi-stop itineraries by neighbourhood
│   │   ├── split.ts         # Sample bill participants & food/drinks breakdown
│   │   └── venues.ts        # Sample indicative venue prices & filter metadata
│   ├── hooks/
│   │   ├── useActiveSection.ts # Section tracking with IntersectionObserver
│   │   ├── useCountUp.ts       # Numeric count-up interpolation for budget changes
│   │   ├── useLenis.ts         # Smooth scroll lifecycle, ticker sync & fine-pointer gating
│   │   ├── useMagnetic.ts      # Subtle magnetic hover for primary CTA buttons
│   │   └── useReducedMotion.ts # Detects prefers-reduced-motion media query
│   ├── lib/
│   │   └── gsap.ts          # Registered plugins (ScrollTrigger, Flip) & custom eases
│   ├── styles/
│   │   ├── tokens.css       # Design tokens (colors, type scale, spacing, radii)
│   │   └── global.css       # Self-hosted Fontsource imports, reset & utility classes
│   ├── utils/
│   │   ├── calculations.ts  # Pure calculations for budget, split & clamping
│   │   ├── calculations.test.ts # Vitest suite covering edge cases
│   │   └── format.ts        # Indian Rupee currency formatter (₹ with en-IN grouping)
│   ├── App.tsx              # Main page orchestration & Lenis context provider
│   ├── main.tsx             # React DOM root & font load ScrollTrigger refresh
│   └── vite-env.d.ts        # Vite client types & CSS module declarations
├── eslint.config.js         # ESLint 9 flat configuration with browser/node globals
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite build configuration with relative base support
```

---

## 3. How to Edit Copy & Sample Data

All content is decoupled from components and lives in typed modules inside `src/data/`:

1. **Budget Plans & Scenarios** (`src/data/budget.ts`):
   - Modify `BUDGET_PLANS[1000]`, `BUDGET_PLANS[2000]`, `BUDGET_PLANS[3000]` to change line items or amounts.
   - Adjust `BUDGET_SCENARIOS` to add or edit preset scenarios (e.g. "Friday with friends").
2. **Venues & Prices** (`src/data/venues.ts`):
   - Update `SAMPLE_VENUES` to change prices, happy-hour windows, or neighbourhood tags.
   - Edit `VENUE_FILTERS` to add new tag chips.
3. **Route Stops** (`src/data/routes.ts`):
   - Update `AREA_ROUTES` to adjust stop titles, timings, cab estimates, or add new neighbourhoods.
4. **Split Bill** (`src/data/split.ts`):
   - Adjust `SPLIT_PEOPLE`, `SHARED_FOOD_TOTAL`, or `TOTAL_BILL`.
5. **FAQ Items** (`src/data/faq.ts`):
   - Add, reorder, or update questions and answers. Set `defaultOpen: true` for pre-expanded items.
6. **Mumbai Neighbourhoods** (`src/data/mumbai.ts`):
   - Add or remove tags. Set `isLater: true` for items styled with dashed borders.

---

## 4. Motion Design System

- **Smooth Scroll (Lenis)**:
  - Enabled on desktop and fine-pointer devices.
  - Automatically disabled on touch-first/mobile screens to preserve 100% native momentum.
  - Driven by `gsap.ticker` with `lagSmoothing(0)` and synced via `lenis.on('scroll', ScrollTrigger.update)`.
  - Paused automatically when the mobile navigation menu opens, and restored on close.
- **Cinematic Eases**:
  - `SIGNATURE_EASE` (`expo.out`): Crisp, confident deceleration with zero cartoonish overshoot.
  - `SECONDARY_EASE` (`power2.out`): Soft curve for fluid bar width and route redraw transitions.
- **Hero Intro**:
  - Masked headline reveal, polaroid settle, SVG route draw (`strokeDashoffset`), sequential stop marker pops, stamp rotation, and subtle mouse parallax for fine pointers.
- **RunLine Marquee**:
  - Tilted infinite marquee band whose speed dynamically responds to scroll velocity and direction, gently easing back to base speed. Pauses on mouse hover.
- **Planner & Receipt**:
  - Numeric count-up tweens on big budget numbers, total estimates, and per-person shares.
  - Staggered "receipt print" entrance when budget or scenario presets change.
- **Prices FLIP Grid**:
  - Powered by `Flip` from GSAP. Smoothly animates card reflows, entries, and exits when filters change.
- **Bill Split**:
  - Real-time animated bar widths and numbers when toggling Equal Split vs Fair Share.
- **Closing Watermark**:
  - Subtle vertical parallax on the oversized "PEG" background element.
- **Accessibility & Reduced Motion**:
  - Under `prefers-reduced-motion: reduce`, all animations, parallax, marquees, and Lenis smooth scrolling are completely disabled. Content renders immediately in its final state with instant zero-duration updates.

---

## 5. Deployment Guide

The app builds to a standalone static bundle in `dist/`.

### Sub-path Hosting (e.g. GitHub Pages)
`vite.config.ts` includes `base: './'`. This produces relative asset URLs so the site works on any sub-path (e.g. `https://username.github.io/peg/`) without manual path configuration.

### Vercel
```bash
npm i -g vercel
vercel
```
Or connect your GitHub repository in the Vercel dashboard:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
Or create a `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Cloudflare Pages
- Connect repository.
- Build command: `npm run build`
- Build output directory: `dist`

---

## 6. Testing & Quality Assurance

- **Strict TypeScript**: Verified with `tsc --noEmit` (zero errors, strict mode, no `any`, no `@ts-ignore`).
- **ESLint & Prettier**: Checked with `npm run lint` and formatted with `npm run format`.
- **Vitest**: Unit tests verify budget totals, per-person share math, bounding clamps, and split calculations.
- **Responsive Testing**: Verified across 1440px desktop, 768px tablet, and 390px mobile viewports.
- **Zero Console Errors**: Clean runtime logs in both development and production preview.
