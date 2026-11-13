// ------------------------------------------------------------------
// Services shown in the navbar "Services" menu, the Home page section
// and the /services page.
//
// To make a service live: set `available: true` and give it a `to` route.
// Items without `available: true` show a "Coming soon" message on click.
// ------------------------------------------------------------------

export const serviceGroups = [
    {
        title: 'AI career tools',
        items: [
            { label: 'TF AI job agent', description: 'An AI agent that finds and shortlists jobs for you.' },
            { label: 'Resume score checker', description: 'Get an instant score and fixes for your resume.' },
            { label: 'AI resume maker', description: 'Build an ATS-friendly resume in minutes.' },
            { label: 'Interview Q&A', description: 'Common questions with model answers by role.' },
            { label: 'AI mock interview', description: 'Practice interviews and get feedback.' },
            { label: 'Live AI interview', description: 'Real-time interview simulation with an AI panel.' },
        ],
    },
    {
        title: 'Premium services',
        items: [
            { label: 'TF Pro', tag: 'Most popular', tagTone: 'green', description: 'Priority visibility to recruiters and more.' },
            { label: 'Expert resume writing', description: 'Get your resume written by experts.' },
            { label: 'Expert power profile', description: 'A profile crafted to stand out to recruiters.' },
            { label: 'AI Bootcamps', tag: 'New', tagTone: 'neutral', description: 'Short, hands-on AI courses for job seekers.' },
        ],
    },
    {
        title: 'Free resources',
        items: [
            {
                label: 'Resume samples',
                available: true,
                to: '/resume-samples',
                description: 'Free, ready-to-use resume samples. Preview and download as PDF.',
            },
            { label: 'Job letter samples', description: 'Offer, resignation and cover letter templates.' },
        ],
    },
]
