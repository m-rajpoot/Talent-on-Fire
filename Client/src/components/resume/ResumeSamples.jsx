import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { Download, ExternalLink, Eye, FileText, FolderOpen, Search } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { AvailableBadge } from '../services/ServiceList'
import { RESUME_DRIVE_FOLDER_URL, resumeSamples } from '@/data/resumeSamples'
import { getResumeLinks } from '@/utils/resumeLinks'
import { cn } from '@/lib/utils'

const ALL = 'All'

// phones/tablets usually can't show a PDF inside an iframe -> open it in a new tab instead
const isTouchDevice = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches

const ResumeThumbnail = ({ src, title }) => {
    const [failed, setFailed] = useState(false)

    if (!src || failed) {
        return (
            <div className='flex h-full w-full flex-col items-center justify-center gap-2 text-[#6A38C2] dark:text-[#a78bfa]'>
                <FileText className='size-12' />
                <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>PDF</span>
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={`${title} resume preview`}
            loading='lazy'
            onError={() => setFailed(true)}
            className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
        />
    )
}

const ResumeCard = ({ sample, onPreview }) => {
    const links = getResumeLinks(sample.url)
    const thumbnail = sample.thumbnail || links.thumbnailUrl

    return (
        <div className='group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-card dark:shadow-black/30 dark:hover:border-[#a78bfa]/40'>
            <button
                type='button'
                onClick={() => onPreview(sample)}
                className='relative h-56 w-full cursor-pointer overflow-hidden border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5'
                aria-label={`Preview ${sample.title}`}
            >
                <ResumeThumbnail src={thumbnail} title={sample.title} />
                <span className='absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100'>
                    <span className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900'>
                        <Eye className='size-4' /> Preview
                    </span>
                </span>
            </button>

            <div className='flex flex-1 flex-col p-5'>
                <div className='flex items-start justify-between gap-2'>
                    <h2 className='text-lg font-bold leading-snug'>{sample.title}</h2>
                </div>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                    {[sample.category, sample.experience].filter(Boolean).join(' · ')}
                </p>
                {sample.description && (
                    <p className='mt-3 text-sm text-gray-600 dark:text-gray-300'>{sample.description}</p>
                )}
                {sample.tags?.length > 0 && (
                    <div className='mt-3 flex flex-wrap gap-1.5'>
                        {sample.tags.map((tag) => (
                            <Badge key={tag} variant='secondary' className='font-medium'>{tag}</Badge>
                        ))}
                    </div>
                )}

                <div className='mt-auto flex items-center gap-2 pt-5'>
                    <Button variant='outline' className='flex-1 cursor-pointer' onClick={() => onPreview(sample)}>
                        <Eye /> Preview
                    </Button>
                    {links.downloadUrl ? (
                        <Button asChild className='flex-1 bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                            <a href={links.downloadUrl} download target='_blank' rel='noopener noreferrer'>
                                <Download /> Download
                            </a>
                        </Button>
                    ) : (
                        <Button asChild className='flex-1 bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                            <a href={links.openUrl} target='_blank' rel='noopener noreferrer'>
                                <ExternalLink /> Open
                            </a>
                        </Button>
                    )}
                </div>
                <p className='mt-3 text-xs text-muted-foreground'>Source: {links.source}</p>
            </div>
        </div>
    )
}

const ResumeSamples = () => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState(ALL)
    const [activeSample, setActiveSample] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const categories = useMemo(
        () => [ALL, ...new Set(resumeSamples.map((s) => s.category).filter(Boolean))],
        []
    )

    const filteredSamples = useMemo(() => {
        const q = query.trim().toLowerCase()
        return resumeSamples.filter((sample) => {
            const inCategory = category === ALL || sample.category === category
            if (!inCategory) return false
            if (!q) return true
            const haystack = [sample.title, sample.category, sample.experience, sample.description, ...(sample.tags || [])]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
            return haystack.includes(q)
        })
    }, [query, category])

    const openPreview = (sample) => {
        const links = getResumeLinks(sample.url)
        // Google Drive's viewer works everywhere; plain PDFs don't render in iframes on phones
        if (isTouchDevice() && links.source !== 'Google Drive') {
            window.open(links.openUrl, '_blank', 'noopener,noreferrer')
            return
        }
        setActiveSample(sample)
    }

    const activeLinks = activeSample ? getResumeLinks(activeSample.url) : null

    return (
        <div>
            <Navbar />

            <Motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='px-[5%] lg:px-[10%] w-full my-10'
            >
                {/* breadcrumb */}
                <p className='text-sm text-muted-foreground'>
                    <Link to='/services' className='hover:underline'>Services</Link>
                    <span className='mx-2'>/</span>
                    <span>Free resources</span>
                    <span className='mx-2'>/</span>
                    <span className='font-medium text-foreground'>Resume samples</span>
                </p>

                <div className='mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <div className='flex flex-wrap items-center gap-3'>
                            <h1 className='text-2xl font-bold sm:text-3xl lg:text-4xl'>
                                Resume <span className='text-[#6A38C2] dark:text-[#a78bfa]'>samples</span>
                            </h1>
                            <AvailableBadge className='text-xs' />
                        </div>
                        <p className='mt-2 max-w-2xl text-gray-700 dark:text-gray-300'>
                            Free, recruiter-friendly resume samples. Preview any resume online and download the PDF to use as a starting point.
                        </p>
                    </div>
                    {RESUME_DRIVE_FOLDER_URL && (
                        <Button asChild variant='outline' className='self-start md:self-auto'>
                            <a href={RESUME_DRIVE_FOLDER_URL} target='_blank' rel='noopener noreferrer'>
                                <FolderOpen /> View all on Google Drive
                            </a>
                        </Button>
                    )}
                </div>

                {/* search + category filter */}
                <div className='mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                    <div className='flex w-full items-center gap-2 rounded-full border border-gray-200 px-4 shadow-sm lg:max-w-md dark:border-white/10 dark:bg-card'>
                        <Search className='size-4 shrink-0 text-muted-foreground' />
                        <input
                            type='text'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search by role, skill or level'
                            className='h-10 w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500'
                        />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type='button'
                                onClick={() => setCategory(cat)}
                                className={cn(
                                    'cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                                    category === cat
                                        ? 'border-[#6A38C2] bg-[#6A38C2] text-white'
                                        : 'border-gray-200 hover:bg-gray-100 dark:border-white/15 dark:hover:bg-white/10'
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <p className='mt-6 text-sm text-muted-foreground'>
                    Showing {filteredSamples.length} of {resumeSamples.length} resume{resumeSamples.length === 1 ? '' : 's'}
                </p>

                {filteredSamples.length === 0 ? (
                    <div className='my-16 flex flex-col items-center gap-3 text-center'>
                        <FileText className='size-12 text-muted-foreground' />
                        <p className='text-lg font-medium'>
                            {resumeSamples.length === 0 ? 'Resume samples are being added. Check back soon!' : 'No resumes match your search.'}
                        </p>
                        {resumeSamples.length > 0 && (
                            <Button variant='outline' className='cursor-pointer' onClick={() => { setQuery(''); setCategory(ALL) }}>
                                Clear filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {filteredSamples.map((sample) => (
                            <ResumeCard key={sample.id} sample={sample} onPreview={openPreview} />
                        ))}
                    </div>
                )}
            </Motion.div>

            {/* preview window */}
            <Dialog open={Boolean(activeSample)} onOpenChange={(isOpen) => { if (!isOpen) setActiveSample(null) }}>
                {activeSample && activeLinks && (
                    <DialogContent className='flex h-[90vh] w-[96vw] max-w-[96vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl'>
                        <div className='flex flex-col gap-3 border-b border-border px-5 py-4 pr-12 sm:flex-row sm:items-center sm:justify-between'>
                            <div>
                                <DialogTitle>{activeSample.title}</DialogTitle>
                                <DialogDescription className='mt-1'>
                                    {[activeSample.category, activeSample.experience].filter(Boolean).join(' · ')}
                                </DialogDescription>
                            </div>
                            <div className='flex gap-2'>
                                <Button asChild variant='outline' size='sm'>
                                    <a href={activeLinks.openUrl} target='_blank' rel='noopener noreferrer'>
                                        <ExternalLink /> Open
                                    </a>
                                </Button>
                                {activeLinks.downloadUrl && (
                                    <Button asChild size='sm' className='bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                                        <a href={activeLinks.downloadUrl} download target='_blank' rel='noopener noreferrer'>
                                            <Download /> Download
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <iframe
                            key={activeLinks.previewUrl}
                            src={activeLinks.previewUrl}
                            title={`${activeSample.title} resume`}
                            className='w-full flex-1 bg-white'
                            allow='autoplay'
                        />
                        <p className='border-t border-border px-5 py-2 text-xs text-muted-foreground'>
                            Preview not loading? Use <span className='font-medium'>Open</span> to view it in a new tab.
                        </p>
                    </DialogContent>
                )}
            </Dialog>

            <Footer />
        </div>
    )
}

export default ResumeSamples
