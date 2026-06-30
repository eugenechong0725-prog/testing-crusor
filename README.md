# ProWeb Studio — Lead Collection Landing Page

A landing page for a digital agency that collects client inquiries and sends them directly to email. Built with plain HTML, CSS, and JavaScript.

> **Privacy:** Customers only see the thank-you message after submitting. Leads are sent privately to **eugenechong0725@gmail.com** — not shown on the website.

## Email setup (one-time)

Leads are sent via [FormSubmit.co](https://formsubmit.co) to `eugenechong0725@gmail.com`.

**First time only:** Submit a test lead on the live site. FormSubmit will send an **activation email** to `eugenechong0725@gmail.com`. Click the link in that email to confirm — after that, every new lead arrives in your inbox automatically.

To change the recipient email, edit `LEAD_EMAIL` in `app.js`.

## Features

- Hero section with services overview and **Get Free Quote** CTA
- **Why Your Business Needs This** section
- Inquiry form: name, phone, service, budget, notes
- Form validation (required fields, phone must have at least 8 digits)
- Direct email delivery with success and error messages
- Success message after submit (no page redirect)
- Responsive layout for mobile and desktop

## Services offered on the page

- Website
- AI Chatbot
- Landing Page
- WhatsApp Automation

## Files

| File | Description |
|------|-------------|
| `index.html` | Page structure, hero, and form |
| `styles.css` | Layout and styling |
| `app.js` | Validation and email submission |

## Run locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Live site

- GitHub Pages: https://eugenechong0725-prog.github.io/testing-crusor/
- Vercel: import this repo at [vercel.com/new](https://vercel.com/new) → select `testing-crusor` → Deploy (no build settings needed)
