// ------------------------------------------------------------------
// Filters shown on the Jobs page (left sidebar / "Filter" button on mobile).
//
// Each group has its own "All" option, so you can combine filters,
// e.g. Location = Bengaluru + Salary = 7-10 LPA + Industry = All.
// To add an option, just add a string to the group's `options` array.
// ------------------------------------------------------------------

export const ALL = 'All'

export const filterGroups = [
    {
        key: 'location',
        title: 'Location',
        options: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Ranchi', 'Siwan'],
    },
    {
        key: 'salary',
        title: 'Salary',
        options: ['2-6 LPA', '7-10 LPA', '11-40 LPA', '41-100 LPA', '100+'],
    },
    {
        key: 'industry',
        title: 'Industry',
        options: [
            'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'Machine Learning',
            'DevOps Engineer', 'Mobile App Developer', 'UI/UX Designer', 'Product Manager', 'Quality Assurance Engineer',
            'Cybersecurity Analyst', 'Cloud Engineer', 'Business Analyst', 'Database Administrator', 'Network Engineer',
            'Game Developer', 'Embedded Systems Engineer', 'Robotics Engineer', 'Blockchain Developer', 'AI Researcher',
        ],
    },
]

// every group starts on "All"
export const DEFAULT_FILTERS = Object.fromEntries(filterGroups.map((group) => [group.key, ALL]))

export const hasActiveFilters = (filters) => Object.values(filters).some((value) => value !== ALL)

// other spellings recruiters use for the same city
const LOCATION_ALIASES = {
    'Delhi NCR': ['delhi', 'ncr', 'noida', 'gurugram', 'gurgaon', 'ghaziabad', 'faridabad'],
    'Bengaluru': ['bengaluru', 'bangalore', 'bengluru'],
    'Mumbai': ['mumbai', 'bombay', 'navi mumbai', 'thane'],
}

const lower = (value) => String(value ?? '').toLowerCase()

const matchesLocation = (job, option) => {
    const location = lower(job?.location)
    const names = LOCATION_ALIASES[option] || [lower(option)]
    return names.some((name) => location.includes(name))
}

// salary is stored in LPA. Filter values look like "6-10 LPA" or "100+"
export const matchesSalary = (salary, option) => {
    const value = Number(salary)
    if (Number.isNaN(value)) return false
    const range = option.match(/^(\d+)\s*-\s*(\d+)\s*LPA$/i)
    if (range) return value >= Number(range[1]) && value <= Number(range[2])
    const min = option.match(/^(\d+)\s*\+$/)
    if (min) return value >= Number(min[1])
    return false
}

const matchesIndustry = (job, option) => {
    const term = lower(option)
    return lower(job?.title).includes(term) || lower(job?.description).includes(term)
}

const matchers = {
    location: matchesLocation,
    salary: (job, option) => matchesSalary(job?.salary, option),
    industry: matchesIndustry,
}

// keep only the jobs that match every selected (non-"All") filter
export const applyJobFilters = (jobs = [], filters = DEFAULT_FILTERS) =>
    jobs.filter((job) =>
        Object.entries(filters).every(([key, value]) =>
            value === ALL || !matchers[key] || matchers[key](job, value)
        )
    )
