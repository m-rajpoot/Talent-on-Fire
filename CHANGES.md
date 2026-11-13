# Changelog — Talent on Fire (TF)

Newest update first. Exact line-by-line changes for the latest update are in `TF_UPDATE.diff`;
the first round of fixes is in `FIXES.diff`.

---

# Update 3 — Rebrand to Talent on Fire + UI fixes (Nov 2026)

No backend changes. No new npm packages. Everything from Update 1 and 2 still works.

## Summary

| # | Request | What changed |
|---|---|---|
| 1 | Top bar hides when scrolling down | Navbar is now **sticky**: it stays at the top of every page while you scroll, with a blurred background and a soft shadow once the page scrolls |
| 2 | Change services, remove Promotional Offer | "Promotional Offer / PROSALE" block removed from the **Services menu** and from the **Services section** (Home + `/services`). Brand-named services renamed: "Fire AI job agent" → **TF AI job agent**, "Fire Pro" → **TF Pro** |
| 3 | Rename "Hire the Fire" → "Talent on Fire" (TF) | New name everywhere: navbar, footer, browser tab title, all footer pages, resume samples, theme storage key, READMEs, project folder. Phones show the short name **TF** in the navbar |
| 4 | Category pills overlapping | Each pill is now as wide as its text, so pills never overlap. Edges fade when more pills are hidden; arrows still scroll |
| 5 | "All" option in filters | Every filter group (Location, Salary, Industry) has an **All** option, selected by default. Groups now **combine** (e.g. Bengaluru + 7-10 LPA). "Clear all" link + "Clear filters" button when nothing matches |
| 6 | Use my PNG logo | Logo is read from `Client/public/logo.png` and used in the navbar, footer and browser tab. A placeholder "TF" logo is included — just replace the file (steps below) |

## 1. Sticky top bar
| File | Change |
|---|---|
| `Client/src/components/shared/Navbar.jsx` | Root element is now `<header class="sticky top-0 z-40 ...">` with a semi-transparent blurred background (light: white, dark: theme background). A scroll listener adds a border + shadow after the page scrolls. Removed `overflow-hidden` |
| `Client/src/index.css` | `scroll-padding-top: 5rem` on `html`, so jumps like `#services` don't land under the navbar |
| `Client/src/components/Jobs.jsx` | Job list height changed from `95vh` to `calc(100vh - 5rem)` so the list fits under the sticky navbar |

Works on every page (Home, Jobs, Browse, job details, profile, login/signup, services, resume samples, footer pages, recruiter pages, 404) in light and dark mode, desktop and mobile. Menus, dialogs and toasts still open above the navbar.

## 2. Services — Promotional Offer removed
| File | Change |
|---|---|
| `Client/src/components/services/ServicesMenu.jsx` | Removed `<PromoOffer />` from the "Free resources" column of the navbar mega-menu |
| `Client/src/components/services/ServicesSection.jsx` | Removed `<PromoOffer />` from the "Free resources" card (Home page + `/services`) |
| `Client/src/components/services/PromoOffer.jsx` | **Deleted** |
| `Client/src/data/services.js` | Removed `promoOffer` data. Renamed `Fire AI job agent` → `TF AI job agent`, `Fire Pro` → `TF Pro` |

## 3. Rename to Talent on Fire (TF)
| File | Change |
|---|---|
| `Client/src/data/siteConfig.js` | `SITE_NAME = 'Talent on Fire'`, new `SITE_SHORT_NAME = 'TF'`, new `LOGO_SRC`, new `SHOW_NAME_NEXT_TO_LOGO`. **The name now lives in this one file** |
| `Client/src/components/shared/Logo.jsx` (new) | Brand logo + name ("Talent on **Fire**"), used by Navbar and Footer. Shows "TF" on phones |
| `Client/src/components/shared/Navbar.jsx`, `Footer.jsx` | Use `<Logo />` instead of the hard-coded "Hire The Fire" text |
| `Client/src/data/infoPages.js` | All 10 mentions now use `SITE_NAME` (About us, Employer home, Sitemap, Credits, Summons/Notices, Privacy, Terms, Fraud alert, Trust & safety) |
| `Client/src/utils/resumeLinks.js` | Source label of local resume PDFs uses `SITE_NAME` |
| `Client/index.html` | Title **Talent on Fire**, meta description, theme colour, logo favicon; theme key updated |
| `Client/src/context/themeContext.js` | localStorage key `talent-on-fire-theme` (matches `index.html`). Visitors who had picked light mode see the default dark mode once, then their choice is saved again |
| `README.md`, `CHANGES.md`, project folder | Renamed to Talent on Fire / `Talent_on_Fire` |

## 4. Category carousel overlap fixed
| File | Change |
|---|---|
| `Client/src/components/CategoryCarousel.jsx` | Slides use `basis-auto` (width = text) instead of fixed widths (`basis-1/4` etc.) that were narrower than "Frontend Developer". Pills use `whitespace-nowrap`; carousel is wider on desktop; `"Cyber Security "` trailing space removed (it broke the search for that category); unused `useState` import removed |
| `Client/src/components/ui/carousel.jsx` | `CarouselContent` accepts an optional `fade` prop: fades the edge that has more pills behind it. Default off, so other carousels are unchanged |

## 5. Filter "All" option
| File | Change |
|---|---|
| `Client/src/utils/jobFilters.js` (new) | Filter options + matching logic. Each group starts on `All`. Location understands common spellings (Bengaluru = Bangalore; Delhi NCR = Delhi, Noida, Gurugram, Gurgaon, Ghaziabad, Faridabad; Mumbai = Bombay, Navi Mumbai, Thane). Salary uses the LPA ranges. Industry matches job title/description |
| `Client/src/components/FilterCard.jsx` | One radio group per filter with **All** first; "Clear all" link when any filter is set; unique ids per card (fixes labels on the mobile filter panel not selecting anything because desktop and mobile cards shared ids); typo "Bengluru" → **Bengaluru**; no longer triggers an extra jobs request |
| `Client/src/components/Jobs.jsx` | Holds the selected filters (so desktop sidebar and mobile panel always match), applies all filters together, shows "Clear filters" when no job matches. Opening the Jobs page always starts from all jobs, as before |

## 6. Logo PNG
| File | Change |
|---|---|
| `Client/public/logo.png` (new) | Placeholder "TF" logo (512×512). **Replace it with your logo, same file name** |
| `Client/src/components/shared/Logo.jsx` (new) | Shows `logo.png`; if the file is missing or broken, shows the old flame icon so nothing breaks |
| `Client/index.html` | Browser-tab icon + Apple touch icon = `/logo.png` |
| `Client/public/vite.svg` | **Deleted** (old Vite favicon, no longer used) |

### How to add your logo
1. Rename your file to **`logo.png`** (lowercase, exactly).
2. Put it in **`Client/public/`** and replace the placeholder that's already there: `Client/public/logo.png`.
3. Restart `npm run dev` (or redeploy), then hard-refresh the browser (**Ctrl + Shift + R**). Browsers cache tab icons, so the favicon can take one more refresh.
4. Optional, in `Client/src/data/siteConfig.js`:
   - Your logo already contains the words "Talent on Fire"? Set `SHOW_NAME_NEXT_TO_LOGO = false` so the name isn't shown twice.
   - Want a different file name or type (e.g. `tf-logo.svg`)? Change `LOGO_SRC` and the two `href="/logo.png"` lines in `Client/index.html`.

Best results: a square PNG with a transparent background, at least 256×256 px. Wide logos also work: the height is fixed (32 px in the navbar, 40 px in the footer) and the width adjusts.

## Checked
- `npm run build` (Client) succeeds; `npm run lint` shows no new problems (29 → 26, all remaining are older ones).
- Every route was opened in a real browser (desktop 1366 px and phone 375 px, dark and light): navbar stays at the top, no page errors, "Hire the Fire" appears nowhere.
- Filters: All by default; Bengaluru → 3 of 10 test jobs (incl. "Bangalore"); Bengaluru + 7-10 LPA → 1; Clear all → 10; mobile filter panel works.
- Carousel: no two pills overlap; arrows scroll; fade only on the side with more pills.
- Services menu and section: no Promotional Offer.
- Logo: placeholder shows; with `logo.png` deleted the flame fallback shows.
- Server: all files pass `node --check`; server starts and answers `GET /`.

---

# Update 2 — Dark theme, footer, services, resume samples

No backend changes. No new npm packages. Nothing from the previous code was removed;
existing light-mode classes are unchanged and only `dark:` variants were added next to them.

## 1. Dark theme (default) + light/dark toggle
| File | Change |
|---|---|
| `src/context/themeContext.js`, `src/context/ThemeProvider.jsx`, `src/hooks/useTheme.js` (new) | Theme state, saved in localStorage (`talent-on-fire-theme`). Default = **dark** |
| `src/components/shared/ThemeToggle.jsx` (new) | Sun/Moon button, top-right of the navbar (desktop + mobile) |
| `index.html` | Page title + tiny script that applies the saved theme before React loads (no white flash) |
| `src/index.css` | New "Midnight Violet" dark palette, soft glow background, dark scrollbars. Light palette untouched |
| `src/main.jsx` | App + Toaster wrapped in `ThemeProvider` |
| `src/components/ui/sonner.jsx` | Toasts follow the selected theme |
| 15 components (Navbar, Hero, job cards, Job, JobDescription, Browse, FilterCard, Profile, Login, Signup, admin pages) | Added `dark:` variants next to every hard-coded white/gray/brand colour |

## 2. Naukri-style footer + working pages
| File | Change |
|---|---|
| `src/components/shared/Footer.jsx` | Logo, tagline, "Connect with us" (Facebook, Instagram, X, LinkedIn) and 4 link columns |
| `src/components/pages/InfoPage.jsx` (new) | `/page/:slug` for About us, Careers, Employer home, Sitemap, Credits, Help center, Summons/Notices, Grievances, Report issue, Privacy policy, Terms & conditions, Fraud alert, Trust & safety |
| `src/components/pages/NotFound.jsx` (new) | 404 page for unknown URLs |
| `src/data/infoPages.js` (new) | Text of all footer pages + footer columns (edit freely) |
| `src/data/siteConfig.js` (new) | **Edit before deploy:** social links, optional support email |

## 3. Services + Resume samples
| File | Change |
|---|---|
| `src/components/services/*` (new) | "Services" mega-menu in navbar, Services section on Home, `/services` page. Unavailable items show a "coming soon" toast |
| `src/components/resume/ResumeSamples.jsx` (new) | `/resume-samples`: search, category filter, thumbnails, preview window, download |
| `src/utils/resumeLinks.js` (new) | Accepts Google Drive file/folder links, Cloudinary URLs or local `/resumes/*.pdf` |
| `src/data/resumeSamples.js` (new) | **Add your resumes here** (instructions inside the file) |
| `src/data/services.js` (new) | Service list; set `available: true` + `to` to turn a service on |
| `public/resumes/` (new) | 4 demo resume PDFs (fictional people) + thumbnails so the page works immediately |
| `src/App.jsx` | Routes: `/services`, `/resume-samples`, `/page/:slug`, `*` |
| `src/components/Home.jsx` | Services section added above the footer |

---

# Update 1 — Bug fixes

Only the lines listed here were changed. Exact before/after is in `FIXES.diff`.

## Backend (Server/)

| # | File | Change |
|---|---|---|
| 1 | `index.js` | Added `export default app;` so the server runs on Vercel |
| 2 | `middlewares/authUser.js` | Invalid/expired token now returns **401** instead of hanging |
| 2 | all 4 `controllers/*.js` | Every `catch` now returns a **500** JSON response instead of hanging |
| 5 | `controllers/user.controllers.js` | Logout clears the cookie with the same `httpOnly / sameSite:'none' / secure` options as login |
| 6 | `controllers/company.controllers.js` | Updating a company without a new logo keeps the old logo |
| 7 | `controllers/job.controllers.js` | Search also matches **location** and **salary ranges** ("6-10 LPA", "100+"); keyword escaped everywhere (e.g. "C++" no longer breaks) |
| 8 | `middlewares/isRecruiter.js` (new) + `routes/*.js` | Company, post-job, recruiter-jobs, applicants and status routes are recruiter-only |
| 9 | company / job / application controllers | Recruiters can only view/update **their own** companies, post jobs for their own companies, and see/update applicants of their own jobs |
| 9 | `controllers/application.controllers.js` | Status must be `pending`, `accepted` or `rejected` |
| 10 | `controllers/application.controllers.js` | Applicant data sent to recruiters no longer includes the password hash |
| 17 | `controllers/user.controllers.js` | Changing profile email to one already registered returns "Email already in use" |

## Frontend (Client/src/)

| # | File | Change |
|---|---|---|
| 3 | `main.jsx` | If the server returns 401 (expired/invalid login), the saved user is cleared so the UI logs out |
| 4 | `components/shared/Navbar.jsx` | Logout passes `withCredentials` correctly, so the cookie is actually cleared |
| 7 | `components/Jobs.jsx` | Salary filter works on the Jobs page |
| 12 | `components/JobDescription.jsx` | Shows `experienceLevel` (was showing "undefined yrs") |
| 13 | `components/admin/PostJob.jsx` | Loads the company list itself (dropdown no longer empty) |
| 14 | 9 components | `error.response?.data?.message`, so the error toast doesn't crash when the server is unreachable |

## Still to do yourself
- **Rotate secrets** in `Server/.env`: MongoDB password, Cloudinary API secret, `SECRET_KEY`.
- **Cloudinary resume PDFs**: enable *Settings → Security → Allow delivery of PDF and ZIP files*.
- `node_modules` are **not included**. Run `npm install` in `Client/` and `Server/`.
- After deploying, set `FRONTEND_URL` (server) and `VITE_BACKEND_URL` (client) to the deployed URLs.
- `SOCIAL_LINKS` in `Client/src/data/siteConfig.js` still point to the previous author's Instagram/LinkedIn. Replace them with your own.
- ~~Location filter value `"Bengluru"` typo~~ — fixed in Update 3.
