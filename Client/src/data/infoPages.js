import { SITE_NAME } from './siteConfig'

// ------------------------------------------------------------------
// Content for the footer pages (/page/<slug>).
// Edit the text freely. Each page = title + intro + sections.
// ------------------------------------------------------------------

export const infoPages = {
    'about-us': {
        title: 'About us',
        intro: `${SITE_NAME} is a job portal that connects job seekers with recruiters, quickly and simply.`,
        sections: [
            {
                heading: 'What we do',
                body: [
                    'Students and job seekers can search jobs, filter by location, salary and role, apply in one click and track every application from their profile.',
                    'Recruiters can register their companies, post openings and review applicants in one dashboard.',
                ],
            },
            {
                heading: 'Our mission',
                body: [
                    'Make the first step of every career easier: clear job information, fair processes and useful free resources such as resume samples.',
                ],
            },
        ],
    },
    careers: {
        title: 'Careers',
        intro: 'We are a small team building tools that help people find work.',
        sections: [
            {
                heading: 'Open roles',
                body: [
                    'There are no open positions right now. We still love hearing from people who care about hiring and careers.',
                    'Share your profile with us through the contact options on the Help center page and we will reach out when a matching role opens.',
                ],
            },
        ],
    },
    'employer-home': {
        title: 'Employer home',
        intro: `Hire faster with ${SITE_NAME}. Post jobs, manage your companies and review applicants in one place.`,
        sections: [
            {
                heading: 'How it works',
                body: [
                    '1. Sign up and choose the Recruiter role.',
                    '2. Register your company with its logo, website and location.',
                    '3. Post a job with salary, experience, job type and number of positions.',
                    '4. Review applicants and mark each application as accepted or rejected.',
                ],
            },
        ],
        employerCta: true,
    },
    sitemap: {
        title: 'Sitemap',
        intro: `All the main pages of ${SITE_NAME} in one place.`,
        sections: [],
        sitemap: true,
    },
    credits: {
        title: 'Credits',
        intro: `${SITE_NAME} is built with these open-source tools and services. Thank you to their authors.`,
        sections: [
            {
                heading: 'Frontend',
                body: ['React, React Router, Redux Toolkit, Tailwind CSS, shadcn/ui and Radix UI, Framer Motion, Lucide icons, Sonner.'],
            },
            {
                heading: 'Backend',
                body: ['Node.js, Express, MongoDB with Mongoose, JSON Web Tokens, Multer, Cloudinary.'],
            },
        ],
    },
    'help-center': {
        title: 'Help center',
        intro: 'Answers to the most common questions.',
        sections: [
            {
                heading: 'Account',
                body: [
                    'Create an account from Signup and choose Student or Recruiter. Log in with the same role you signed up with.',
                    'Update your name, bio, skills, phone number and resume from Profile -> edit (pencil) button.',
                ],
            },
            {
                heading: 'Applying to jobs',
                body: [
                    'Open any job and click Apply Now. You can track the status (pending, accepted or rejected) under Applied Jobs on your profile.',
                ],
            },
            {
                heading: 'Recruiters',
                body: [
                    'Create a company first, then post jobs for it. Applicants for each job are listed under Jobs -> Applicants.',
                ],
            },
        ],
        contact: true,
    },
    'summons-notices': {
        title: 'Summons / Notices',
        intro: `How to send legal notices, summons or other official communication to ${SITE_NAME}.`,
        sections: [
            {
                heading: 'Sending a notice',
                body: [
                    'Please send notices in writing with your full name, contact details, the subject of the notice and any supporting documents.',
                    'We acknowledge every notice we receive and respond within a reasonable time.',
                ],
            },
        ],
        contact: true,
    },
    grievances: {
        title: 'Grievances',
        intro: 'If you have a complaint about a job post, a recruiter, a user or our service, we want to hear about it.',
        sections: [
            {
                heading: 'How to raise a grievance',
                body: [
                    'Share your registered email, a short description of the issue and links or screenshots if you have them.',
                    'We aim to acknowledge grievances within 48 hours and resolve them as quickly as possible.',
                ],
            },
        ],
        contact: true,
    },
    'report-issue': {
        title: 'Report issue',
        intro: 'Found a bug, a broken page or a suspicious job post? Let us know.',
        sections: [
            {
                heading: 'What to include',
                body: [
                    'The page link, what you expected to happen, what actually happened and, if possible, a screenshot.',
                    'For suspicious job posts, include the job link and the company name.',
                ],
            },
        ],
        contact: true,
    },
    'privacy-policy': {
        title: 'Privacy policy',
        intro: `This page explains what information ${SITE_NAME} collects and how it is used.`,
        sections: [
            {
                heading: 'Information we collect',
                body: [
                    'Account details you provide: name, email, phone number, role, bio, skills, profile photo and resume.',
                    'Recruiters additionally provide company details and job posts.',
                ],
            },
            {
                heading: 'How we use it',
                body: [
                    'To run your account, show jobs, process applications and let recruiters see the profiles of people who applied to their jobs.',
                    'We do not sell your personal information.',
                ],
            },
            {
                heading: 'Your choices',
                body: [
                    'You can update your profile at any time. To delete your account, contact us through the Help center.',
                ],
            },
        ],
    },
    'terms-and-conditions': {
        title: 'Terms & conditions',
        intro: `By using ${SITE_NAME} you agree to these terms.`,
        sections: [
            {
                heading: 'Using the platform',
                body: [
                    'Provide accurate information, keep your password safe and use the platform only for genuine job search and hiring.',
                    'Recruiters must post only real openings for companies they are authorised to represent.',
                ],
            },
            {
                heading: 'Content',
                body: [
                    'You are responsible for the content you upload. We may remove content or accounts that are false, abusive or illegal.',
                ],
            },
            {
                heading: 'Liability',
                body: [
                    `${SITE_NAME} connects job seekers and recruiters but is not a party to any job offer or employment contract.`,
                ],
            },
        ],
    },
    'fraud-alert': {
        title: 'Fraud alert',
        intro: 'Stay safe from fake job offers.',
        sections: [
            {
                heading: 'We never ask for money',
                body: [
                    `${SITE_NAME} and genuine recruiters will never ask you to pay for a job, interview, training or "registration".`,
                    'Never share OTPs, passwords or bank details with anyone claiming to offer a job.',
                ],
            },
            {
                heading: 'Warning signs',
                body: [
                    'Offers without an interview, unusually high pay for simple work, pressure to decide immediately, or communication only from personal email or chat accounts.',
                    'If something feels wrong, stop and report it to us from the Report issue page.',
                ],
            },
        ],
    },
    'trust-and-safety': {
        title: 'Trust & safety',
        intro: `How we keep ${SITE_NAME} safe for job seekers and recruiters.`,
        sections: [
            {
                heading: 'What we do',
                body: [
                    'Passwords are stored hashed, logins use secure tokens, and recruiters can only see applicants for their own jobs.',
                    'Reported job posts and accounts are reviewed and removed if they break our terms.',
                ],
            },
            {
                heading: 'What you can do',
                body: [
                    'Use a strong password, log out on shared devices and read our Fraud alert page before sharing personal details.',
                ],
            },
        ],
    },
}

// Footer link columns (Naukri-style). `to` is an internal route.
export const footerColumns = [
    [
        { label: 'About us', to: '/page/about-us' },
        { label: 'Careers', to: '/page/careers' },
        { label: 'Employer home', to: '/page/employer-home' },
        { label: 'Sitemap', to: '/page/sitemap' },
        { label: 'Credits', to: '/page/credits' },
    ],
    [
        { label: 'Help center', to: '/page/help-center' },
        { label: 'Summons/Notices', to: '/page/summons-notices' },
        { label: 'Grievances', to: '/page/grievances' },
        { label: 'Report issue', to: '/page/report-issue' },
    ],
    [
        { label: 'Privacy policy', to: '/page/privacy-policy' },
        { label: 'Terms & conditions', to: '/page/terms-and-conditions' },
        { label: 'Fraud alert', to: '/page/fraud-alert' },
        { label: 'Trust & safety', to: '/page/trust-and-safety' },
    ],
    [
        { label: 'Browse jobs', to: '/jobs' },
        { label: 'Search jobs', to: '/browse' },
        { label: 'Services', to: '/services' },
        { label: 'Resume samples', to: '/resume-samples', available: true },
    ],
]

// Pages listed on /page/sitemap
export const sitemapLinks = [
    {
        heading: 'Job seekers',
        links: [
            { label: 'Home', to: '/' },
            { label: 'Jobs', to: '/jobs' },
            { label: 'Browse', to: '/browse' },
            { label: 'Profile', to: '/profile' },
            { label: 'Services', to: '/services' },
            { label: 'Resume samples', to: '/resume-samples' },
        ],
    },
    {
        heading: 'Account',
        links: [
            { label: 'Login', to: '/login' },
            { label: 'Signup', to: '/signup' },
        ],
    },
    {
        heading: 'Recruiters',
        links: [
            { label: 'Employer home', to: '/page/employer-home' },
            { label: 'Companies', to: '/admin/companies' },
            { label: 'Posted jobs', to: '/admin/jobs' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About us', to: '/page/about-us' },
            { label: 'Careers', to: '/page/careers' },
            { label: 'Credits', to: '/page/credits' },
            { label: 'Help center', to: '/page/help-center' },
            { label: 'Summons/Notices', to: '/page/summons-notices' },
            { label: 'Grievances', to: '/page/grievances' },
            { label: 'Report issue', to: '/page/report-issue' },
            { label: 'Privacy policy', to: '/page/privacy-policy' },
            { label: 'Terms & conditions', to: '/page/terms-and-conditions' },
            { label: 'Fraud alert', to: '/page/fraud-alert' },
            { label: 'Trust & safety', to: '/page/trust-and-safety' },
        ],
    },
]
