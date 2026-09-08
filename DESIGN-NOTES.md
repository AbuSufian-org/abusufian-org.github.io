# Design notes (internal — not part of the deployed site)

## Concept
"Performance report, not portfolio template." Abu Sufian's work is fundamentally
about turning ad spend into measurable numbers — ROAS, CPA, conversions. The site
should feel like a well-designed performance report or analyst's dashboard that a
CMO would actually trust, not a generic freelancer template.

## Color
- --paper:      #F1F2EC  cool, warm-grey paper (not cream, not pure white)
- --ink:        #14171A  primary text, near-black with a touch of blue
- --ink-soft:   #4E545B  secondary text
- --ink-faint:  #8B9096  tertiary / meta text
- --line:       #D8DAD2  hairline borders
- --surface:    #FFFFFF  raised panels
- --navy:       #16293A  structural dark band (nav, metrics strip, footer)
- --navy-line:  #2A4356  hairline on dark
- --signal:     #C1450F  single accent — rust/amber, used only for CTAs, links,
                          and the number that matters most in a stat block
- --signal-tint:#F4E3D3  light tint of signal, used sparingly for chip backgrounds

Two "temperatures" (paper/navy) instead of one flat background, with exactly one
accent color, kept out of decoration and reserved for action + emphasis.

## Type
- Display: "Fraunces" (serif with real personality, works at large sizes for
  headlines and big stat numbers) — optical size + weight varied, not italic
  gimmicks.
- Body/UI: "Inter" — neutral, legible, does the actual work.
- Data: "IBM Plex Mono" — used only for figures (ROAS, CPA, $, %) so numbers
  read like a report/ticker rather than blending into prose. This is the one
  deliberate "unusual" typographic choice, tied directly to the subject matter
  (marketing analytics), not decorative.

## Layout
- No rounded-corner SaaS card grid with drop shadows. Flat surfaces, 2px hairline
  borders, sharp corners (2px radius max on interactive controls only).
- Hero: asymmetric two-column split — serif headline + positioning statement on
  the left (60%), a single "read-out" panel on the right styled like a terminal
  stat card (40%) — ties the very first thing a visitor sees to the analytical
  identity without leading with a giant vanity number.
- Metrics strip: dark navy band, hairline-divided stat blocks, mono figures.
- Services: Performance Marketing gets a full-width lead block; Analytics &
  Growth/CRO are viusally smaller, second row — enforces the primary/secondary
  hierarchy the brief requires.
- Case studies: accordion rows (click to expand Challenge → Approach → Impact)
  rather than a card grid + modal — avoids the generic "View Case Study" modal
  cliché while still satisfying the interaction requirement.
- Experience: single-rule vertical timeline, mono dates.
- No numbered 01/02/03 badges except the timeline (which is genuinely
  chronological) and the consultation "how it works" steps (genuinely
  sequential).
- No ALL-CAPS eyebrows, no middot-joined meta strings, no arrows appended to
  CTA text.

## Motion
One orchestrated entrance on the hero read-out panel (values count up once on
load). Everything else: instant, functional transitions only (accordion open/
close, mobile nav, focus states). Respects prefers-reduced-motion.
