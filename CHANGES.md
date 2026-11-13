# Fixes applied

Only the lines listed here were changed; all other code is untouched. Exact before/after is in `FIXES.diff`.

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

## Not changed (do these yourself)

- **Rotate secrets** in `Server/.env`: MongoDB password, Cloudinary API secret, `SECRET_KEY`.
- **Cloudinary resume PDFs**: enable *Settings → Security → Allow delivery of PDF and ZIP files*.
- `node_modules` are **not included** (the old ones were Windows builds). Run `npm install` in `Client/` and `Server/`.
- After deploying, set `FRONTEND_URL` (server) and `VITE_BACKEND_URL` (client) to the deployed URLs.
- Location filter value `"Bengluru"` in `FilterCard.jsx` is a typo; it only matches jobs whose location is spelled the same way.

---

# New features (dark theme, footer, services, resume samples)

No backend changes. No new npm packages. Nothing from the previous code was removed;
existing light-mode classes are unchanged and only `dark:` variants were added next to them.

## 1. Dark theme (default) + light/dark toggle
| File | Change |
|---|---|
| `src/context/themeContext.js`, `src/context/ThemeProvider.jsx`, `src/hooks/useTheme.js` (new) | Theme state, saved in localStorage (`hire-the-fire-theme`). Default = **dark** |
| `src/components/shared/ThemeToggle.jsx` (new) | Sun/Moon button, top-right of the navbar (desktop + mobile) |
| `index.html` | Title "Hire The Fire" + tiny script that applies the saved theme before React loads (no white flash) |
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

## Adding your resumes
1. Google Drive: Share -> "Anyone with the link" -> copy link -> paste as `url` in `src/data/resumeSamples.js`.
2. Cloudinary: paste the PDF `secure_url` (enable *Allow delivery of PDF and ZIP files* in Cloudinary settings).
3. A whole Drive folder: set `RESUME_DRIVE_FOLDER_URL` in the same file.
