// ------------------------------------------------------------------
// RESUME SAMPLES  (shown on /resume-samples)
//
// HOW TO ADD A RESUME — copy one object below and change the values.
// `url` can be ANY of these:
//
//  1) Google Drive file
//     Upload PDF -> Share -> General access: "Anyone with the link" (Viewer) -> Copy link
//     e.g. 'https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing'
//
//  2) Cloudinary
//     Upload PDF -> copy the "secure_url"
//     e.g. 'https://res.cloudinary.com/<cloud-name>/image/upload/v1700000000/resumes/sde.pdf'
//     (Cloudinary: Settings -> Security -> enable "Allow delivery of PDF and ZIP files")
//
//  3) Local file
//     Put the PDF in Client/public/resumes/ and use '/resumes/<file-name>.pdf'
//
// `thumbnail` is optional. Drive and Cloudinary links get a page-1 preview
// automatically; for other links you can set your own image URL.
//
// The 4 local samples below are demo resumes (fictional people) so the page
// works right away. Delete or replace them whenever you like.
// ------------------------------------------------------------------

// Optional: a public Google Drive FOLDER with all your samples.
// When set, a "View all on Google Drive" button appears on the page.
// e.g. 'https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOp?usp=sharing'
export const RESUME_DRIVE_FOLDER_URL = ''

export const resumeSamples = [
    {
        id: 'sde-fresher',
        title: 'Software Engineer — Fresher',
        category: 'Software Development',
        experience: 'Fresher',
        description: 'One-page resume for final-year CS students: projects, DSA profile and internships up front.',
        tags: ['C++', 'DSA', 'React', 'Node.js'],
        url: '/resumes/software-engineer-fresher.pdf',
        thumbnail: '/resumes/thumbs/software-engineer-fresher.png',
    },
    {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        category: 'Software Development',
        experience: '1-3 yrs',
        description: 'Highlights shipped UI work, performance wins and design-system experience.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        url: '/resumes/frontend-developer.pdf',
        thumbnail: '/resumes/thumbs/frontend-developer.png',
    },
    {
        id: 'data-analyst',
        title: 'Data Analyst',
        category: 'Data & AI',
        experience: 'Fresher',
        description: 'Shows dashboards, SQL skills and measurable business impact from projects.',
        tags: ['SQL', 'Python', 'Power BI'],
        url: '/resumes/data-analyst.pdf',
        thumbnail: '/resumes/thumbs/data-analyst.png',
    },
    {
        id: 'ml-engineer-intern',
        title: 'Machine Learning Intern',
        category: 'Data & AI',
        experience: 'Internship',
        description: 'Research-style projects, model metrics and tooling for ML internship applications.',
        tags: ['PyTorch', 'ML', 'Python'],
        url: '/resumes/machine-learning-intern.pdf',
        thumbnail: '/resumes/thumbs/machine-learning-intern.png',
    },

    // Example of a Google Drive entry (uncomment and paste your link):
    // {
    //     id: 'my-drive-resume',
    //     title: 'Backend Developer',
    //     category: 'Software Development',
    //     experience: '2+ yrs',
    //     description: 'Backend resume focused on APIs, databases and scale.',
    //     tags: ['Node.js', 'MongoDB'],
    //     url: 'https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing',
    // },
]
