# Abu Sufian — Performance Marketing & Growth

A static portfolio, personal brand, and consultation-booking site for Abu Sufian,
built with plain HTML, CSS and vanilla JavaScript. No build step, no backend,
no dependencies — deploys directly to GitHub Pages.

## File structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── Abu-Sufian-Resume.pdf   ← add this file yourself (see below)
├── DESIGN-NOTES.md              ← design rationale, not required for deployment
└── README.md
```

## Deploying to GitHub Pages

1. Create (or reuse) the repository **`AbuSufian-org.github.io`** on GitHub.
2. Copy every file in this folder into the root of that repository, keeping the
   `css/`, `js/` and `assets/` folders exactly as they are.
3. Add your resume PDF at `assets/Abu-Sufian-Resume.pdf` — the "Download Resume"
   button in the contact section already links to this exact path.
4. Commit and push to the `main` branch.
5. In the repo, go to **Settings → Pages**, set the source to the `main` branch
   and the `/ (root)` folder, and save.
6. Your site will be live at `https://AbuSufian-org.github.io/` within a few
   minutes.

No further configuration is required — everything is relative paths and static
files.

## Editing the consultation pricing and booking

Open `js/script.js` and find `CONSULTATION_CONFIG` near the top of the file:

```js
const CONSULTATION_CONFIG = {
  audit: {
    price: 0,          // set a number, e.g. 75
    currency: "USD",
    duration: "45 minutes",
    paymentUrl: "",    // e.g. your Stripe Payment Link or PayPal.me URL
    bookingUrl: ""      // e.g. your Calendly or Cal.com scheduling link
  },
  growth: { ... },
  analytics: { ... }
};
```

- Leaving `price` at `0` shows "Contact for pricing" on the card instead of a
  dollar amount.
- Leaving `paymentUrl` and `bookingUrl` empty makes the **Book Now** button
  scroll to a placeholder note telling visitors booking is being configured,
  and shows your email as a fallback.
- Once you have a payment link and a scheduling link, paste them in and the
  **Book Now** button will open the booking link directly (or the payment link
  if no booking link is set yet). No other code changes are needed.

This site intentionally does not process payments itself — GitHub Pages can't
run a backend. `paymentUrl` and `bookingUrl` are the integration points for a
payment provider (Stripe Payment Links, PayPal) and a scheduler (Calendly,
Cal.com) respectively.

## Editing the contact form

The contact form has no backend, so it currently opens the visitor's email
client with a pre-filled message (see `initContactForm()` in `js/script.js`).
To send mail without a mail client instead, point the form's submit handler at
a form-endpoint service such as Formspree or Getform and POST the `FormData` —
the existing `name`/`email`/`message` fields can be used as-is.

## Content accuracy

All experience, metrics, projects, education and certifications on this site
are drawn directly from Abu Sufian's resume. If any figure or role changes,
update it in `index.html` (each section is clearly commented) — nothing else
needs to change.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No polyfills are
included; the JavaScript uses only widely supported ES6+ features.
