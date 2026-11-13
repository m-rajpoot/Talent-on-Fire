import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion as Motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Button } from '../ui/button'
import NotFound from './NotFound'
import { infoPages, sitemapLinks } from '@/data/infoPages'
import { SOCIAL_LINKS, SUPPORT_EMAIL } from '@/data/siteConfig'

const ContactBox = () => (
    <div className='mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5'>
        <h2 className='font-semibold'>Contact us</h2>
        {
            SUPPORT_EMAIL
                ? (
                    <a href={`mailto:${SUPPORT_EMAIL}`} className='mt-2 inline-flex items-center gap-2 text-[#6A38C2] hover:underline dark:text-[#a78bfa]'>
                        <Mail className='size-4' /> {SUPPORT_EMAIL}
                    </a>
                )
                : (
                    <p className='mt-2 text-gray-700 dark:text-gray-300'>
                        Message us on{' '}
                        <a href={SOCIAL_LINKS.linkedin} target='_blank' rel='noopener noreferrer' className='text-[#6A38C2] hover:underline dark:text-[#a78bfa]'>
                            LinkedIn
                        </a>{' '}
                        and we will get back to you.
                    </p>
                )
        }
    </div>
)

const EmployerCta = () => {
    const { user } = useSelector(store => store.auth)
    const isRecruiter = user?.role === 'recruiter'

    return (
        <div className='mt-8 flex flex-wrap gap-3'>
            {
                isRecruiter
                    ? (
                        <>
                            <Button asChild className='bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                                <Link to='/admin/jobs/create'>Post a job</Link>
                            </Button>
                            <Button asChild variant='outline'>
                                <Link to='/admin/companies'>Manage companies</Link>
                            </Button>
                        </>
                    )
                    : (
                        <>
                            <Button asChild className='bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                                <Link to='/signup'>Register as recruiter</Link>
                            </Button>
                            <Button asChild variant='outline'>
                                <Link to='/login'>Recruiter login</Link>
                            </Button>
                        </>
                    )
            }
        </div>
    )
}

const Sitemap = () => (
    <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {
            sitemapLinks.map((group) => (
                <div key={group.heading}>
                    <h2 className='mb-3 font-semibold'>{group.heading}</h2>
                    <ul className='flex flex-col gap-2'>
                        {
                            group.links.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className='text-gray-700 hover:text-[#6A38C2] hover:underline dark:text-gray-300 dark:hover:text-[#a78bfa]'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))
        }
    </div>
)

// renders every footer page: /page/about-us, /page/privacy-policy, ...
const InfoPage = () => {
    const { slug } = useParams()
    const page = infoPages[slug]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (!page) return <NotFound />

    return (
        <div>
            <Navbar />
            <Motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='px-[5%] lg:px-[10%] w-full my-12 max-w-6xl mx-auto'
            >
                <p className='text-sm text-muted-foreground'>
                    <Link to='/' className='hover:underline'>Home</Link>
                    <span className='mx-2'>/</span>
                    <span className='font-medium text-foreground'>{page.title}</span>
                </p>
                <h1 className='mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl'>{page.title}</h1>
                <p className='mt-3 max-w-3xl text-lg text-gray-700 dark:text-gray-300'>{page.intro}</p>

                {
                    page.sections.map((section) => (
                        <section key={section.heading} className='mt-8 max-w-3xl'>
                            <h2 className='text-xl font-semibold'>{section.heading}</h2>
                            {
                                section.body.map((text, index) => (
                                    <p key={index} className='mt-2 leading-relaxed text-gray-700 dark:text-gray-300'>{text}</p>
                                ))
                            }
                        </section>
                    ))
                }

                {page.sitemap && <Sitemap />}
                {page.employerCta && <EmployerCta />}
                {page.contact && <div className='max-w-3xl'><ContactBox /></div>}
            </Motion.div>
            <Footer />
        </div>
    )
}

export default InfoPage
