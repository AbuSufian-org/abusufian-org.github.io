/* =========================================================
   Abu Sufian — Performance Marketing & Growth
   Vanilla JS. No dependencies, no backend required.
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------
     CONSULTATION CONFIG
     Edit this object to set real pricing and connect a
     payment/booking provider. No other code needs to change.

     - price: number, in `currency`. Leave 0 to show "Contact
       for pricing" instead of a dollar amount.
     - duration: display string, e.g. "30 minutes".
     - paymentUrl: link to your payment page (Stripe Payment
       Link, PayPal.me, etc). Leave "" to show the placeholder
       state defined below.
     - bookingUrl: link to your scheduler (Calendly, Cal.com,
       etc). Leave "" to show the placeholder state.
  ----------------------------------------------------- */
  const CONSULTATION_CONFIG = {
    audit: {
      price: 0,
      currency: "USD",
      duration: "45 minutes",
      paymentUrl: "",
      bookingUrl: ""
    },
    growth: {
      price: 0,
      currency: "USD",
      duration: "60 minutes",
      paymentUrl: "",
      bookingUrl: ""
    },
    analytics: {
      price: 0,
      currency: "USD",
      duration: "45 minutes",
      paymentUrl: "",
      bookingUrl: ""
    }
  };

  const CONTACT_EMAIL = "abusufian.org@gmail.com";

  /* -----------------------------------------------------
     Mobile navigation
  ----------------------------------------------------- */
  function initNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------
     Case study accordion
  ----------------------------------------------------- */
  function initAccordion() {
    const accordion = document.getElementById("accordion");
    if (!accordion) return;

    accordion.querySelectorAll(".case__trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".case");
        const isOpen = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!isOpen));
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* -----------------------------------------------------
     Hero read-out: one count-up on load (skipped for
     users who prefer reduced motion).
  ----------------------------------------------------- */
  function initReadoutCountUp() {
    const figures = document.querySelectorAll(".readout__figure");
    if (!figures.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    figures.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const isDecimal = String(target).includes(".");

      if (prefersReducedMotion || isNaN(target)) {
        el.textContent = prefix + target + suffix;
        return;
      }

      const duration = 900;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        const display = isDecimal ? current.toFixed(2) : Math.round(current);
        el.textContent = prefix + display + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    });
  }

  /* -----------------------------------------------------
     Consultation cards: render price/duration from config,
     wire up Book Now buttons.
  ----------------------------------------------------- */
  function initConsultation() {
    const grid = document.getElementById("consultGrid");
    if (!grid) return;

    Object.keys(CONSULTATION_CONFIG).forEach((key) => {
      const config = CONSULTATION_CONFIG[key];

      const priceEl = grid.querySelector(`[data-price="${key}"]`);
      if (priceEl) {
        priceEl.textContent =
          config.price && config.price > 0
            ? `$${config.price} ${config.currency}`
            : "Contact for pricing";
      }

      const durationEl = grid.querySelector(`[data-duration="${key}"]`);
      if (durationEl) durationEl.textContent = config.duration;
    });

    grid.querySelectorAll("[data-book]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-book");
        const config = CONSULTATION_CONFIG[key];

        if (config && config.bookingUrl) {
          window.open(config.bookingUrl, "_blank", "noopener");
          return;
        }
        if (config && config.paymentUrl) {
          window.open(config.paymentUrl, "_blank", "noopener");
          return;
        }

        // Placeholder state: no booking/payment provider configured yet.
        const note = document.getElementById("consultPlaceholderNote");
        if (note) {
          note.scrollIntoView({ behavior: "smooth", block: "center" });
          note.classList.add("is-flagged");
        }
      });
    });
  }

  /* -----------------------------------------------------
     Contact form.
     No backend on GitHub Pages, so this opens a pre-filled
     mailto link. To send mail without opening the visitor's
     email client instead, point this form's submit handler
     at a form-endpoint service (e.g. Formspree, Getform) and
     POST the FormData to it — the markup already has the
     right name/id attributes to drop straight in.
  ----------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector("#cf-name").value.trim();
      const email = form.querySelector("#cf-email").value.trim();
      const message = form.querySelector("#cf-message").value.trim();

      const subject = encodeURIComponent(`Growth inquiry from ${name}`);
      const body = encodeURIComponent(
        `${message}\n\n—\n${name}\n${email}`
      );

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  /* -----------------------------------------------------
     Footer year
  ----------------------------------------------------- */
  function initFooterYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initAccordion();
    initReadoutCountUp();
    initConsultation();
    initContactForm();
    initFooterYear();
  });
})();
