# 🔥 Talent on Fire (TF)

**Talent on Fire** is a full-stack job portal built on the **MERN** stack (MongoDB, Express, React, Node.js).
Job seekers search, filter and apply for jobs and track their applications. Recruiters register companies,
post jobs and review applicants. The site also has career services, free resume samples, a dark/light theme
and a full set of footer pages.

> Short name: **TF**. Shown in the navbar on small phones.

---

## Contents

1. [Features](#-features)
2. [Tech stack](#-tech-stack)
3. [Project structure](#-project-structure)
4. [Getting started](#-getting-started)
5. [Environment variables](#-environment-variables)
6. [Adding your logo](#-adding-your-logo)
7. [Customising the site](#-customising-the-site)
8. [How the job filters work](#-how-the-job-filters-work)
9. [API reference](#-api-reference)
10. [Authentication flow](#-authentication-flow)
11. [Deployment (Vercel)](#-deployment-vercel)
12. [Scripts](#-scripts)
13. [Troubleshooting](#-troubleshooting)
14. [Security checklist](#-security-checklist)
15. [Changelog](#-changelog)
16. [Author & credits](#-author--credits)

---

## ✨ Features

### General
- 🔐 **Authentication** — register / login with email + password, JWT stored in an `httpOnly` cookie (1 day).
- 👥 **Two roles** — *Student* (job seeker) and *Recruiter*, each with its own pages and permissions.
- 📌 **Sticky navbar** — stays at the top of every page while scrolling, with a blurred background.
- 🌗 **Dark (default) and light theme** — toggle in the navbar; choice is saved in the browser.
- 📱 **Responsive** — desktop, tablet and phone layouts (phone menu, mobile filter panel, "TF" short name).
- 🧭 **Footer pages** — About us, Careers, Employer home, Sitemap, Credits, Help center, Summons/Notices,
  Grievances, Report issue, Privacy policy, Terms & conditions, Fraud alert, Trust & safety, plus a 404 page.

### For students / job seekers
- Search jobs from the home page or pick a **category pill** (Frontend Developer, Data Science, …).
- **Jobs page filters**: Location, Salary and Industry, each with an **All** option. Filters combine,
  e.g. *Bengaluru + 7-10 LPA*. "Clear all" resets them.
- Job details page and **one-click apply**.
- Profile page with bio, skills, resume upload and a table of applied jobs with status
  (pending / accepted / rejected).
- **Resume samples** (`/resume-samples`): search, category filter, preview window and PDF download.

### For recruiters
- Register and edit companies (name, description, website, location, logo).
- Post jobs (title, description, requirements, salary in LPA, experience, job type, positions, location).
- See all their own jobs, view applicants per job, accept or reject applications.
- Recruiters can only see and change **their own** companies, jobs and applicants.

### Career services
- **Services** mega-menu in the navbar, a Services section on the home page and a `/services` page.
- Groups: *AI career tools* (TF AI job agent, Resume score checker, AI resume maker, Interview Q&A,
  AI mock interview, Live AI interview), *Premium services* (TF Pro, Expert resume writing,
  Expert power profile, AI Bootcamps) and *Free resources* (Resume samples — **live**, Job letter samples).
- Services that aren't built yet show a "coming soon" message.

---

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, React Router 7 |
| Styling / UI | Tailwind CSS 4, shadcn/ui (Radix UI primitives), lucide-react icons |
| State | Redux Toolkit + redux-persist (user and job data survive a page refresh) |
| Animation | Framer Motion, Embla Carousel |
| HTTP / toasts | Axios, Sonner |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose 8 |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` password hashing, `cookie-parser` |
| Uploads | Multer (memory) + `datauri` → Cloudinary (profile photos, company logos, resumes) |
| Hosting | Vercel (client and server as two projects) |

---

## 📁 Project structure

```
Talent_on_Fire/
├── Client/                         # React + Vite frontend
│   ├── index.html                  # page title, favicon (logo.png), theme pre-load script
│   ├── public/
│   │   ├── logo.png                # ← YOUR LOGO goes here (placeholder "TF" included)
│   │   └── resumes/                # demo resume PDFs + thumbnails
│   └── src/
│       ├── App.jsx                 # all routes
│       ├── main.jsx                # Redux, theme, toasts, 401 auto-logout
│       ├── index.css               # Tailwind + light / dark colour palettes
│       ├── components/
│       │   ├── shared/             # Navbar (sticky), Footer, Logo, ThemeToggle
│       │   ├── services/           # Services menu, section, page, list
│       │   ├── resume/             # Resume samples page
│       │   ├── pages/              # Footer info pages + 404
│       │   ├── auth/               # Login, Signup
│       │   ├── admin/              # Recruiter pages (companies, jobs, applicants)
│       │   ├── ui/                 # shadcn/ui components
│       │   ├── Home.jsx, HeroSection.jsx, CategoryCarousel.jsx, LatestJobs.jsx
│       │   ├── Jobs.jsx, FilterCard.jsx, Job.jsx, JobDescription.jsx, Browse.jsx
│       │   └── Profile.jsx, AppliedJobTable.jsx, UpdateProfileDialog.jsx
│       ├── data/
│       │   ├── siteConfig.js       # ← site name, short name, logo, social links, support email
│       │   ├── services.js         # services list (make a service live here)
│       │   ├── resumeSamples.js    # resume samples (add yours here)
│       │   └── infoPages.js        # text of the footer pages
│       ├── utils/
│       │   ├── constant.js         # API base URLs (from VITE_BACKEND_URL)
│       │   ├── jobFilters.js       # Jobs-page filter options + matching rules
│       │   └── resumeLinks.js      # Google Drive / Cloudinary / local PDF link handling
│       ├── hooks/                  # data-fetching hooks + useTheme
│       ├── redux/                  # store + auth, job, company, application slices
│       └── context/                # theme context / provider
│
├── Server/                         # Express API
│   ├── index.js                    # app, CORS, routes, listen
│   ├── routes/                     # user, company, job, application
│   ├── controllers/                # request handlers
│   ├── models/                     # User, Company, Job, Application (Mongoose)
│   ├── middlewares/                # authUser (JWT), isRecruiter, multer upload
│   └── utils/                      # db connection, Cloudinary, data URI
│
├── README.md                       # this file
├── CHANGES.md                      # changelog (all updates)
├── TF_UPDATE.diff                  # exact line changes of the latest update
└── FIXES.diff                      # exact line changes of the first bug-fix round
```

---

## ⚙️ Getting started

### Prerequisites
- **Node.js 20 or newer** (Node 18 works with Vite 6, 20+ recommended) and npm.
- A **MongoDB** database (free MongoDB Atlas cluster or local MongoDB).
- A **Cloudinary** account (free) for image and resume uploads.

### 1. Get the code
```bash
git clone https://github.com/lecrupus/<repo-name>.git
cd <repo-name>
```
(or unzip the project and open the `Talent_on_Fire` folder)

### 2. Create the environment files
See [Environment variables](#-environment-variables) below for `Server/.env` and `Client/.env`.

### 3. Install dependencies
```bash
cd Server
npm install

cd ../Client
npm install
```
`node_modules` folders are not shipped. If you copied the project from another computer
(e.g. Windows → Mac/Linux), delete both `node_modules` folders and run `npm install` again.

### 4. Run in development (two terminals)
```bash
# Terminal 1 — backend (auto-restarts with nodemon)
cd Server
npm run dev

# Terminal 2 — frontend
cd Client
npm run dev
```

| | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 (or the `PORT` you set) |

You should see `Server running at port 3000` and `MongoDB Connected...` in the backend terminal.

### 5. Try it
1. Sign up as a **Recruiter** → register a company → post a job.
2. Log out, sign up as a **Student** → the job appears on Home, Jobs and Browse → apply.
3. Log back in as the recruiter → *Jobs* → *Applicants* → accept or reject.

---

## 🔑 Environment variables

### `Server/.env`
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db-name>
PORT=3000
SECRET_KEY=<long-random-string>          # signs the login JWT
FRONTEND_URL=http://localhost:5173       # allowed CORS origin (your deployed client URL in production)

CLOUDINARY_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_SECRET_KEY=<api-secret>
```

### `Client/.env`
```bash
VITE_BACKEND_URL=http://localhost:3000   # no trailing slash; your deployed server URL in production
```
Vite reads `.env` only at start-up: restart `npm run dev` after changing it.

---

## 🖼️ Adding your logo

The logo is read from **`Client/public/logo.png`** and used in three places: the **navbar**, the **footer**
and the **browser tab icon**. A placeholder "TF" logo is already there, so the site looks complete before
you add yours.

1. **Rename** your file to `logo.png` (all lowercase).
2. **Copy** it into `Client/public/` and **replace** the existing `logo.png`.
   ```
   Client/
   └── public/
       └── logo.png   ← your file
   ```
3. **Restart** the dev server (`Ctrl + C`, then `npm run dev`) and **hard-refresh** the browser
   (`Ctrl + Shift + R`, or `Cmd + Shift + R` on Mac). Browsers cache the tab icon, so it may need one extra refresh.
4. **Commit and push** — Vercel serves everything in `public/` automatically, so no other step is needed for deploys.

**Options** (in `Client/src/data/siteConfig.js`):

| Setting | Use it when |
|---|---|
| `SHOW_NAME_NEXT_TO_LOGO = false` | your logo image already contains the words "Talent on Fire" |
| `LOGO_SRC = '/my-logo.svg'` | you want a different file name or type. Also change the two `href="/logo.png"` lines in `Client/index.html` |

**Tips**
- Best: square PNG, transparent background, at least 256 × 256 px. Wide logos work too: the height is fixed
  (32 px navbar, 40 px footer) and the width follows.
- If the file is missing or misspelled, a purple flame icon is shown instead, so nothing breaks. If you see
  the flame, check the file name and folder.

---

## 🎨 Customising the site

| What | Where |
|---|---|
| Site name, short name ("TF"), logo path | `Client/src/data/siteConfig.js` → `SITE_NAME`, `SITE_SHORT_NAME`, `LOGO_SRC` |
| Browser tab title / description | `Client/index.html` → `<title>` and `<meta name="description">` |
| Footer social links, support email | `Client/src/data/siteConfig.js` → `SOCIAL_LINKS`, `SUPPORT_EMAIL` (an empty string hides an icon) |
| Footer pages text | `Client/src/data/infoPages.js` |
| Services list / make a service live | `Client/src/data/services.js` → set `available: true` and `to: '/route'` |
| Resume samples | `Client/src/data/resumeSamples.js` (Google Drive, Cloudinary or local PDFs — steps inside the file) |
| Jobs-page filter options | `Client/src/utils/jobFilters.js` → add a string to a group's `options` |
| Home category pills | `Client/src/components/CategoryCarousel.jsx` → `category` array |
| Colours (light / dark) | `Client/src/index.css` → `:root` (light) and `.dark` (dark) variables |
| Default theme | `Client/src/context/themeContext.js` → `DEFAULT_THEME` (`'dark'` or `'light'`) |

Changing `SITE_NAME` updates the navbar, footer, all footer pages and the resume samples page at once.

---

## 🔎 How the job filters work

The Jobs page (`/jobs`) has three filter groups. Each starts on **All** (= no filter for that group).
Pick one option per group; the groups are combined with **AND**.

| Group | Options | A job matches when |
|---|---|---|
| Location | All, Delhi NCR, Bengaluru, Mumbai, Hyderabad, Ranchi, Siwan | its location contains the city or a common spelling: Bengaluru = Bangalore; Delhi NCR = Delhi / Noida / Gurugram / Gurgaon / Ghaziabad / Faridabad; Mumbai = Bombay / Navi Mumbai / Thane |
| Salary (LPA) | All, 2-6, 7-10, 11-40, 41-100, 100+ | its salary is inside the range (both ends included) |
| Industry | All + 20 roles (Frontend Developer … AI Researcher) | its title or description contains the role name |

Example: *Location = Bengaluru*, *Salary = 7-10 LPA*, *Industry = All* → only Bengaluru/Bangalore jobs
paying 7-10 LPA. **Clear all** (top of the filter) or **Clear filters** (shown when nothing matches) resets every group to All.
On phones the same filters open from the **Filter** button and stay in sync with the desktop sidebar.

The search box on the home page and the category pills use the server-side search on the **Browse** page
(title, description, location and salary ranges).

---

## 📡 API reference

Base URL: `<VITE_BACKEND_URL>/api/v1`. 🔒 = login required (cookie), 🏢 = recruiter only.

### User — `/user`
| Method | Path | Description |
|---|---|---|
| POST | `/register` | Sign up (multipart: fullname, email, phoneNumber, password, role, optional photo) |
| POST | `/login` | Log in (email, password, role) → sets `token` cookie |
| POST | `/logout` | Clears the cookie |
| POST | `/profile/update` 🔒 | Update name, email, phone, bio, skills, resume file |

### Company — `/company` 🔒🏢
| Method | Path | Description |
|---|---|---|
| POST | `/register` | Create a company (`companyName`) |
| GET | `/get` | Companies of the logged-in recruiter |
| GET | `/get/:id` | One of the recruiter's companies |
| POST | `/update/:id` | Update details + logo (multipart) |

### Job — `/job`
| Method | Path | Description |
|---|---|---|
| GET | `/get?keyword=` | All jobs, optional search (title, description, location, salary range like `7-10 LPA` or `100+`) |
| GET | `/get/:id` | One job with its applications |
| POST | `/post` 🔒🏢 | Post a job for one of your companies |
| GET | `/get-recruiter-job` 🔒🏢 | Jobs posted by the logged-in recruiter |

### Application — `/application` 🔒
| Method | Path | Description |
|---|---|---|
| POST | `/apply/:id` | Apply to job `:id` |
| GET | `/get` | Jobs the logged-in student applied to |
| GET | `/:id/applicants` 🏢 | Applicants of your job `:id` |
| POST | `/status/:id/update` 🏢 | Set status: `pending`, `accepted` or `rejected` |

Errors return JSON `{ success: false, message }` with 400 / 401 / 403 / 404 / 500.

---

## 🔒 Authentication flow

1. **Register** with name, email, phone, password and role (`student` or `recruiter`). Passwords are hashed with bcrypt.
2. **Login** checks email, password **and** role, then sets a signed JWT in an `httpOnly`, `secure`,
   `sameSite: 'none'` cookie valid for **1 day**.
3. Protected routes read the cookie in `authUser`; recruiter routes also pass `isRecruiter`.
4. If the token is missing or expired the server answers **401**, and the client clears the saved user
   automatically (logged-out UI).
5. Recruiter pages in the client are wrapped in `ProtectedRoute`; students are redirected away.

---

## 🚀 Deployment (Vercel)

Deploy **Server** and **Client** as two Vercel projects (both folders already contain a `vercel.json`).

**Server**
1. New Vercel project → root directory `Server`.
2. Add every variable from `Server/.env`; set `FRONTEND_URL` to the client URL (e.g. `https://talent-on-fire.vercel.app`).
3. Deploy and copy the server URL.

**Client**
1. New Vercel project → root directory `Client` (framework: Vite).
2. Add `VITE_BACKEND_URL` = server URL (no trailing slash).
3. Deploy. `vercel.json` rewrites every path to `index.html`, so refreshing `/jobs` etc. works.

**MongoDB Atlas**: allow Vercel to connect (*Network Access → 0.0.0.0/0*, or Vercel's IPs).
**Cloudinary**: for resume PDFs enable *Settings → Security → Allow delivery of PDF and ZIP files*.

> Renaming: if you rename the GitHub repo (*Settings → General → Repository name*) or the Vercel projects
> to "talent-on-fire", update `FRONTEND_URL` and `VITE_BACKEND_URL` if the URLs change.

---

## 📜 Scripts

| Folder | Command | What it does |
|---|---|---|
| `Client` | `npm run dev` | Start Vite dev server on http://localhost:5173 |
| `Client` | `npm run build` | Production build into `Client/dist` |
| `Client` | `npm run preview` | Serve the production build locally |
| `Client` | `npm run lint` | ESLint |
| `Server` | `npm run dev` | Start the API with nodemon (auto-restart) |
| `Server` | `node index.js` | Start the API without nodemon |

---

## 🧰 Troubleshooting

| Problem | Fix |
|---|---|
| `vite: Permission denied` / `'vite' is not recognized` | Delete `Client/node_modules` (keep `package-lock.json`) and run `npm install` again |
| CORS error in the browser console | `FRONTEND_URL` in `Server/.env` must exactly match the client URL (no trailing slash); restart the server |
| Login works but you're logged out straight away | Cookie is `secure` + `sameSite: none`: use `https` in production; on localhost use `http://localhost` (not `127.0.0.1`) |
| Jobs never load, server shows no "MongoDB Connected" | Check `MONGODB_URI` and Atlas network access |
| Uploads fail | Check the three Cloudinary variables |
| Logo shows a flame icon | `Client/public/logo.png` is missing or misspelled (must be lowercase `logo.png`) |
| Old tab icon still shows | Hard-refresh (`Ctrl + Shift + R`) or open the site in a private window |
| Changed `.env` but nothing changed | Restart the dev server — Vite and Node read `.env` only at start-up |

---

## 🛡️ Security checklist

- Never commit real `.env` files. `Server/.gitignore` ignores `.env`; add `.env` to `Client/.gitignore` too if you
  ever put secrets there (the client should only hold `VITE_BACKEND_URL`, which is public anyway).
- If the database password, Cloudinary secret or `SECRET_KEY` were ever pushed to GitHub, **rotate them**.
- Use a long random `SECRET_KEY` (e.g. `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`).
- Replace the placeholder `SOCIAL_LINKS` in `siteConfig.js` with your own pages.

---

## 📝 Changelog

All changes are listed in **[CHANGES.md](./CHANGES.md)**. Latest update (Nov 2026):

- Rebranded **Hire the Fire → Talent on Fire (TF)** everywhere.
- **Sticky navbar** that no longer scrolls away.
- **Promotional Offer removed** from the Services menu and section.
- **Category pills no longer overlap**.
- **"All" option** in every Jobs filter group; filters can be combined.
- **PNG logo support** (`Client/public/logo.png`) in navbar, footer and browser tab.

---

## 👨‍💻 Author & credits

- **Mohit Kumar Singh** — GitHub [@m-rajpoot](https://github.com/m-rajpoot)
- Original job-portal base by Mohit ([LinkedIn](https://www.linkedin.com/in/m-rajput/)).
- Built with open-source tools listed on the in-app **Credits** page (`/page/credits`).

## 📄 License
Open-source under the **MIT License**.

## 🙌 Contributions
Fork the repo, open an issue or send a pull request — suggestions are welcome.
