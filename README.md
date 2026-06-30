# ProWeb Studio — Lead Collection Landing Page

A landing page for a digital agency that collects client inquiries and sends them directly to email. Built with plain HTML, CSS, and JavaScript.

> **Privacy:** Customers only see the thank-you message after submitting. Leads are sent privately to **eugenechong0725@gmail.com** — not shown on the website.

## Email setup (required, one-time)

Leads are sent via [Web3Forms](https://web3forms.com) to `eugenechong0725@gmail.com`.

**Why Web3Forms?** FormSubmit requires separate activation for each domain (GitHub Pages vs Vercel). Web3Forms works on all domains with one access key.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter `eugenechong0725@gmail.com` and create a free access key
3. Copy the access key from your email
4. Paste it into `app.js` at `WEB3FORMS_ACCESS_KEY`

After that, the form works on GitHub Pages, Vercel, and any custom domain.

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
