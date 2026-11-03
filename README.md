# Tales from the Game

> **"Some Legends Are Never Forgotten. Others Never Got Their Due."**

*Tales from the Game* is an independent, production-oriented cricket storytelling publication exploring the human drama, tactical choices, overlooked careers, and historical context beyond the scorecard.

Combining the nostalgic reverence of a vintage cricket quarterly with the responsive typography and speed of a modern digital publication, *Tales from the Game* focuses on two core editorial pillars:
1. **Iconic Stories:** Well-known players, turning points, and championship finishes deconstructed through tactical and psychological analysis.
2. **Forgotten Legends & Overlooked Careers:** Players, franchises, and careers whose incandescent peaks or interruptions altered cricket history without receiving prolonged public celebration.

---

## 1. Technology Stack

- **Frontend Framework:** React 19 (TypeScript) on Vite
- **Styling & Design System:** Tailwind CSS v4 using **The Heritage Archive** aesthetic:
  - *Warm Ivory* (`#F5F1E8`): Primary background
  - *Ink Black* (`#191B19`): High-contrast editorial copy
  - *Forest Green* (`#244936`): Signature accent and branding
  - *Muted Gold* (`#B89558`): Secondary highlights, dates, and accents
  - *Deep Midnight* (`#080B12`): Dark cinematic hero contrast
  - *Warm Grey* (`#DCD7CC`): Archival borders and dividers
- **Typography:** Playfair Display (Serif headlines) & Inter (Legible body copy)
- **Icons:** Lucide React
- **Unit Testing:** Node.js built-in test runner (`node:test`, `node:assert/strict`) run via `npx --yes tsx --test`
- **Technical SEO:** Structured JSON-LD schemas (`Article`, `BreadcrumbList`, `WebSite`, `Organization`), XML Sitemap (`/sitemap.xml`), and `robots.txt`.

---

## 2. Implemented Routes

All 14 routes are functional both via in-app navigation and direct browser entrance:

| Route | Page / Content | Primary Keyword Theme |
|---|---|---|
| `/` | Homepage | Cricket stories and cricket legends |
| `/stories/` | Complete Stories Archive with live search & filters | Cricket stories & player histories |
| `/forgotten-legends/` | Dedicated Forgotten Legends Editorial Landing | Forgotten cricket legends |
| `/iconic-moments/` | Historic Matches & Turning Points Landing | Iconic cricket moments |
| `/teams-and-eras/` | Franchises, Dynasties & Eras Landing | Cricket team history |
| `/about/` | Publication Manifesto & Readership Philosophy | About Tales from the Game |
| `/contact/` | Editorial Correspondence & Correction Desk | Contact Tales from the Game |
| `/editorial-standards/` | Fact-Checking, Sourcing & Corrections Policy | Editorial standards and corrections |
| `/privacy-policy/` | Data Transparency, Cookies & Analytics Notice | Privacy Policy |
| `/stories/matthew-hayden-batting-style/` | Matthew Hayden: Test Batting Tempo (1,150+ words) | `Matthew Hayden batting style` |
| `/stories/rp-singh-bowling-style/` | RP Singh: Left-Arm Swing Rhythm (1,100+ words) | `RP Singh cricketer` |
| `/stories/mohammad-amir-career/` | Mohammad Amir: The Talent & What-If (1,250+ words) | `Mohammad Amir career` |
| `/stories/deccan-chargers-ipl-history/` | Deccan Chargers: 2009 Champions (1,200+ words) | `Deccan Chargers IPL history` |
| `/stories/ms-dhoni-2011-world-cup-final/` | MS Dhoni: 2011 World Cup Finish (1,100+ words) | `MS Dhoni 2011 World Cup final` |

---

## 3. Five Complete Launch Articles

Every launch article has been written with deep historical rigor, verified match scorecards, tactical breakdowns, key stats callouts, primary sources, and reader FAQs:

1. **Matthew Hayden:** Deconstructs how his front-foot commitment, broom-like sweep in the 2001 India tour (549 runs at 73.57), and record-breaking 380 at the WACA altered the psychological mandate of Test openers.
2. **RP Singh:** Examines his Faisalabad 2006 Test debut (Man of the Match on a docile highway), his 5/59 at Lord's in 2007, his 12 wickets in India's 2007 World T20 triumph, and his 2009 IPL Purple Cap (23 wickets) leading Deccan Chargers to the title.
3. **Mohammad Amir:** Explores his teenage emergence at seventeen, his five-year ban following the 2010 Lord's spot-fixing sting, his breathtaking 3/16 spell dismantling Rohit, Kohli, and Dhawan in the 2017 Champions Trophy final, and the tension between demonstrated peaks and hypothetical lost years.
4. **Deccan Chargers:** Reconstructs the 2008 last-place disaster, the 2009 turnaround in South Africa under Adam Gilchrist and Darren Lehmann, defending 143 in the final against RCB at Johannesburg, and their subsequent termination in 2012 leading to Sunrisers Hyderabad.
5. **MS Dhoni:** Analyzes the tactical calculation behind promoting himself ahead of in-form Yuvraj Singh in the 2011 final to counter Muralitharan and Randiv's off-spin, his 109-run partnership with Gautam Gambhir (97), his death-overs battle against Malinga's reverse swing, and the iconic 48.2 over six.

---

## 4. Technical SEO & Schema Implementation

- **Page-Specific Metadata:** Managed centrally via `src/utils/seo.ts`. Dynamically updates `document.title`, `<meta name="description">`, `<link rel="canonical">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), and Twitter Cards.
- **Canonical URLs:** Generated using `buildCanonicalUrl()`, enforcing clean, consistent trailing slashes and stripping ephemeral tracking parameters (like UTMs) to eliminate duplicate content penalties.
- **JSON-LD Structured Data:**
  - `Article` on all 5 story pages with headline, image, author, datePublished, dateModified, publisher, and word count.
  - `BreadcrumbList` on index and article pages.
  - `WebSite` with SearchAction potential action schema on the homepage.
- **XML Sitemap:** Accessible at `/sitemap.xml` containing absolute URLs for all 14 published routes with assigned priorities and change frequencies.
- **Robots.txt:** Accessible at `/robots.txt` allowing crawler indexation and declaring the sitemap URL.

---

## 5. Analytics, Growth Marketing & UTM Attribution

The publication includes a production-ready telemetry dispatcher (`src/utils/analytics.ts`):

### Supported Analytics Events
- `page_view`: Fired on route changes with pathname parameter.
- `view_story`: Fired when an article loads, passing `title`, `slug`, `category`, and `readingTime`.
- `newsletter_signup`: Dispatched on valid subscriber registration.
- `contact_form_submit`: Dispatched on valid feedback / suggestion submission.
- `internal_story_click`: Measures navigation between related articles.

### UTM Campaign Parameters
The site preserves campaign attribution parameters without breaking:
- `utm_source` (e.g., `facebook`, `instagram`, `x`, `newsletter`)
- `utm_medium` (e.g., `cpc`, `social`, `email`)
- `utm_campaign` (e.g., `amir_comeback_test`, `dhoni_2011_retrospective`)
- `utm_content` (e.g., `hero_card_a`, `quote_image_b`)

*Note:* Canonical tags always reference clean URLs so UTM parameters do not create duplicate canonical indices.

---

## 6. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# GEMINI_API_KEY (Optional for AI Studio workspace runtime)
GEMINI_API_KEY="your-key-here"

# Canonical Production URL (without trailing slash)
VITE_SITE_URL="https://talesfromthegame.com"

# Google Analytics 4 (Optional: if omitted, analytics safely sleeps)
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Meta Pixel ID (Optional: if omitted, pixel safely sleeps)
VITE_META_PIXEL_ID="000000000000000"
```

---

## 7. Development & Verification Commands

```bash
# Install dependencies
npm install

# Run unit tests (logic & word count verification)
npx --yes tsx --test src/utils/pureLogic.test.ts

# Type-check TypeScript codebase
npm run lint

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```

---

## 8. Deployment & Google Search Console Checklist

1. **Deploy Build:** Run `npm run build` and deploy the output directory `dist/` to your hosting provider (Cloud Run, Vercel, Netlify, or static CDN).
2. **Configure Custom Domain:** Point your DNS records and update `VITE_SITE_URL` to match your registered domain.
3. **Verify Robots & Sitemap:**
   - Confirm `https://your-domain.com/robots.txt` returns HTTP 200.
   - Confirm `https://your-domain.com/sitemap.xml` contains all 14 routes.
4. **Google Search Console Verification:**
   - Add property via Domain DNS TXT record or HTML file upload.
   - Submit `/sitemap.xml` under Sitemaps.
   - Inspect key URLs (`/`, `/stories/mohammad-amir-career/`, etc.) using the URL Inspection tool.
