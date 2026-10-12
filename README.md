# ÉLORA Dermatologia — PontoWeb demo

A cinematic, editorial landing page for a **fictional** premium dermatology clinic, built by PontoWeb as a sales demonstration. Every brand detail, the professional, the address, the phone, the e-mail and the social handle are invented. The page says so in the footer, in the privacy notice and in the image captions.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run lint       # oxlint
```

## Stack

- React 19, TypeScript and Vite.
- **Motion** (`motion/react`) for scroll-linked and in-view animation. It's the only animation library.
- Plain CSS with design tokens (`src/styles/global.css`) and one stylesheet per component. No CSS framework.
- Lucide icons, plus two inline brand glyphs (`src/components/Icons.tsx`).
- Self-hosted fonts via Fontsource: Cormorant Garamond (Latin subset) and Manrope Variable.

## Adapting for a real client

1. **`src/config/site.ts`**: name, doctor, address, phone, WhatsApp number and message, e-mail, Instagram, hours. Every component reads from here.
2. **`src/content/index.ts`**: treatments, care steps, gallery and FAQ copy.
3. **`index.html`**: title and meta. Remove `noindex` and `public/robots.txt`'s `Disallow` once the business is real. The static hero shell in `#root` duplicates the hero copy, so keep it in sync with `Hero.tsx`.
4. Replace the stock-derived media in `public/media/` with the clinic's own photos and video.
5. Add the doctor's real credentials (CRM/RQE are required in Brazilian medical advertising) in `DoctorProfile.tsx`.
6. Rewrite the privacy notice (`PrivacyDialog.tsx`) for LGPD with the real data controller.
7. Optionally connect the form to a booking system or form service (see below).

## Interactions

| Feature | State |
| --- | --- |
| Navigation, mobile menu (focus trap, Esc), all anchors | Working |
| WhatsApp links (header menu, CTA, contact, floating button) | Working — `wa.me/5527999994821` with a pre-filled message. **The number is fictional demo data.** |
| Appointment form | **Front-end only.** Validates the fields, then prepares a WhatsApp message the visitor sends themselves. It says plainly that nothing was sent to a server. |
| Treatment “Agendar avaliação” links | Pre-select the form's interest field |
| FAQ accordion | WAI-ARIA pattern: Enter/Space, ↑/↓, Home/End |
| Privacy notice | Native `<dialog>` (Esc and backdrop close it) |

## Motion system

- `ScrollReveal`: fade and lift on entering the viewport.
- `LineReveal`: masked line-by-line headline reveal. It observes the heading, not the clipped lines.
- `ImageReveal`: clip-mask image reveal with inner parallax.
- `Parallax`: depth offsets (halved on phones).
- `ScrollWords`: words brighten as the brand statement scrolls through.
- **Treatments**: pinned horizontal track driven by native vertical scroll on desktop. Touch and reduced-motion devices get a swipeable scroll-snap row.
- **Editorial story**: the background deepens from cream to charcoal; the film is clip-revealed with parallax.
- **Care approach**: sticky image frame that cross-fades as the steps scroll past.
- **Hero**: a CSS intro that starts at first paint from a static shell in `index.html`. React resumes it on mount without restarting it.
- Scroll is never hijacked. With `prefers-reduced-motion`, transforms and parallax are off, videos don't load, and the treatments use the static layout.

## Media

All stills and loops are cut, colour-graded and compressed from the five source clips supplied with the brief (`Hero.mp4`, `video 2–5.mp4`) by `scripts/build-media.sh` (ffmpeg). The original stock sources of those clips weren't documented, so confirm their licences before any commercial use.

| File(s) | Source clip | Use |
| --- | --- | --- |
| `hero-1080.mp4`, `hero-720.mp4`, `hero-poster*.webp`, `aesthetic`, `skin-texture`, `og-image.jpg` | Hero.mp4 | Hero film, aesthetic card, texture details |
| `skin.mp4`, `skin-poster`, `skin-quality` | video 2.mp4 | Editorial film, skin-quality card |
| `clinical` | video 3.mp4 | Clinical dermatology card |
| `technology`, `doctor`, `room-wide`, `equipment` | video 4.mp4 | Technology card, illustrative portrait, gallery |
| `botanical.mp4`, `botanical*`, `planning` | video 5.mp4 | CTA film, statement, planning card, gallery |

The “doctor” image is an anonymous, masked practitioner, captioned as illustrative and explicitly *not* the fictional Dra. Helena Vasconcelos.
