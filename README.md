# Alzhen Trucking Services — Client Website

Public website built with React, Vite, and Lucide icons. The admin system lives in the separate ALZHEN-TMS repository.

## Implemented pages and features

- **Home:** company introduction, coverage, fleet, services, and the latest published announcement from the content API.
- **About Us:** company background, journey, mission, vision, values, operational support, and animated company gallery.
- **Trucks & Services:** centered responsive truck cards, up to three photos per truck, load capacity, dimensions, volume, common cargo names/photos, and service information.
- **Announcements:** newest posts first, three posts per page, Previous/Next navigation, full-image proportions, and expandable longer updates.
- **Careers & Permits:** two hiring posts per page, job responsibilities and qualifications, an email application button, and expandable DTI, BIR, Mayor’s and Sanitary permit images. Applications go to alzhentruckingservices@gmail.com through the visitor’s email app.
- **Contact:** company details, map, client/partner inquiry forms, multiple truck types and quantities, validation, submission feedback, and automatic form reset after successful submission.
- **FAQ assistant:** fixed categorized answers and keyword matching, topic navigation, expand/minimize controls, and a Facebook contact link. No generative AI or live support agent is connected.
- **Shared UI:** responsive layouts, light/dark themes, page and background animations, keyboard focus states, and reduced-motion styling where implemented.

## Website content flow

```text
ALZHEN-TMS Client Website workspace
    → authenticated admin API
    → Supabase website_content table / website-media bucket
    → public content API
    → client website pages
```

The separate TMS workspace manages Trucks, Announcements, and Careers. It supports editing, publishing, archiving/restoring, and permanent deletion. Archived records are excluded from public API responses. Public visitors do not receive database credentials or admin access.

Set `VITE_CONTENT_API_BASE_URL` to the backend’s `/api/website` URL. The client reads `/trucks`, `/announcements`, and `/careers`. It refreshes on page entry, browser focus, and every 30 seconds while visible. Home uses the same announcement source as the Announcements page.

Without that variable, trucks use `src/data/trucks.json`, announcements use `src/data/announcements.json` (currently empty), and careers are empty. An API error shows an unavailable message rather than silently republishing fallback posts.

**Production requirement:** the backend must be deployed at a publicly accessible HTTPS address before online admin changes can appear on Vercel. A localhost API works only on the development computer. Deploying this repository does not deploy ALZHEN-TMS or run its SQL migrations.

## Inquiry flow

```text
Client or partner form → POST /api/inquiry → server validation
    → verified Mailjet sender → configured recipient inbox
    → success popup and form reset
```

The sender display name is **Alzhen Inquiry**. Subjects include the inquiry type and visitor name; replies address the visitor’s email. Gmail can still group matching subjects. A successful response means Mailjet accepted the message, not guaranteed inbox delivery. Errors leave entered details available to retry.

The endpoint validates fields and quantities, escapes HTML email content, checks allowed origins and sender verification, and applies a best-effort per-instance request limit. Inquiry submissions are sent by email; this website does not store them in a database.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Project scripts use the bundled Node 24 development dependency to avoid older system Node compatibility issues.

For the connected local setup:

| App | Address |
| --- | --- |
| Client website | http://localhost:3000 |
| TMS admin frontend | http://localhost:5173 |
| TMS backend | http://localhost:5001 |

Create an ignored `.env.local` in this repository:

```dotenv
VITE_CONTENT_API_BASE_URL=http://localhost:5001/api/website
MAILJET_API_KEY=your_api_key
MAILJET_SECRET_KEY=your_secret_key
MAILJET_FROM_EMAIL=your_verified_sender_email
INQUIRY_TO_EMAIL=your_recipient_email
INQUIRY_SITE_ORIGIN=http://localhost:3000
```

Restart the dev server after changing environment settings. Never commit `.env.local` or put Mailjet/Supabase secret keys in `VITE_` variables. `VITE_` settings are visible in the browser.

`MAILJET_FROM_EMAIL` must be verified in the Mailjet account associated with the API keys. `INQUIRY_TO_EMAIL` controls who receives inquiries; the recipient does not need Mailjet sender verification. Change it to the company inbox when ready.

## Where to edit

| Content | File or location |
| --- | --- |
| Page layouts | `src/pages/` |
| Reusable UI and FAQ panel | `src/components/` |
| FAQ questions, answers, matching rules | `src/data/faqs.js` |
| Company/contact content | `src/data/company.js`, `src/data/profile.js`, `src/data/site.js` |
| Public API reads and normalization | `src/services/websiteContent.js`, `src/services/contentRecords.js` |
| Content refresh behavior | `src/hooks/useWebsiteContent.js` |
| Inquiry validation and email formatting | `api/inquiry.js` |
| Styles | `src/styles/` |
| Company photos and permit scans | `public/images/` |
| Editable live posts | Client Website workspace in ALZHEN-TMS |

## GitHub and Vercel

The client repository is `Alexakyle/alzhen-website`. Vercel builds it using `npm run build` and serves `dist`; `/api/inquiry` runs server-side. Local Vite development provides the same inquiry handler through its middleware.

Configure the Mailjet and inquiry variables in Vercel separately from `.env.local`. Configure `VITE_CONTENT_API_BASE_URL` with the deployed HTTPS backend when available, then rebuild. Environment changes require a new deployment.

For a future custom domain, update `INQUIRY_SITE_ORIGIN` to the exact HTTPS origin and the TMS website-preview URL where needed. The content table schema does not need changing. Review any stored image URLs before retiring an old hosting address.

## Checks

```sh
npm test
npm run build
```

Tests cover content normalization, FAQ matching, truck types, inquiry validation, email content, and mocked mail-provider success/failure responses. They do not send real emails. Production sender verification, inbox delivery, and connectivity to the deployed TMS backend must also be checked in their actual environments.
