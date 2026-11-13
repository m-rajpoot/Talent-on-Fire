import React from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ArrowRight, Crown, FileText, Gift, Sparkles } from 'lucide-react'
import ServiceList, { AvailableBadge } from './ServiceList'
import { serviceGroups } from '@/data/services'

const groupIcons = [Sparkles, Crown, Gift]

// "Services" section used on the Home page and on the /services page
const ServicesSection = () => {
    return (
        <Motion.section
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id='services'
            className='px-[5%] lg:px-[10%] w-full my-20'
        >
            <div className='mb-10 text-center'>
                <span className='mx-auto inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-[#F83002] dark:bg-white/5 dark:text-[#ff6a3d] dark:ring-1 dark:ring-white/10'>
                    Career services
                </span>
                <h1 className='mt-4 text-xl font-bold sm:text-3xl lg:text-4xl'>
                    Services to <span className='text-[#6A38C2] dark:text-[#a78bfa]'>boost your career</span>
                </h1>
                <p className='mx-auto mt-3 max-w-2xl px-3 text-gray-700 dark:text-gray-300'>
                    AI career tools, premium help and free resources, all in one place.
                </p>
            </div>

            {/* highlight: the feature that is live right now */}
            <Link
                to='/resume-samples'
                onClick={() => window.scrollTo(0, 0)}
                className='group mb-6 flex flex-col gap-4 rounded-2xl border border-[#6A38C2]/20 bg-gradient-to-r from-[#6A38C2]/10 via-[#7209b7]/5 to-[#F83002]/10 p-5 transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-[#a78bfa]/25 dark:from-[#6A38C2]/25 dark:via-[#7209b7]/10 dark:to-[#F83002]/15 dark:hover:shadow-black/40'
            >
                <div className='flex items-start gap-4'>
                    <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#6A38C2] text-white shadow-md'>
                        <FileText className='size-6' />
                    </div>
                    <div>
                        <div className='flex flex-wrap items-center gap-2'>
                            <h2 className='text-lg font-bold sm:text-xl'>Resume samples</h2>
                            <AvailableBadge />
                        </div>
                        <p className='mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-300'>
                            Free, ready-to-use resume samples. Preview them online and download as PDF.
                        </p>
                    </div>
                </div>
                <span className='inline-flex items-center gap-2 self-start rounded-md bg-[#6A38C2] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[#5b30a6] sm:self-center'>
                    Explore samples
                    <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
                </span>
            </Link>

            <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                {
                    serviceGroups.map((group, index) => {
                        const Icon = groupIcons[index % groupIcons.length]
                        return (
                            <div
                                key={group.title}
                                className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-card dark:shadow-black/30'
                            >
                                <div className='mb-4 flex items-center gap-3'>
                                    <div className='flex size-9 items-center justify-center rounded-lg bg-[#6A38C2]/10 text-[#6A38C2] dark:bg-[#a78bfa]/15 dark:text-[#a78bfa]'>
                                        <Icon className='size-5' />
                                    </div>
                                    <h2 className='text-lg font-semibold'>{group.title}</h2>
                                </div>
                                <ServiceList items={group.items} showDetails />
                            </div>
                        )
                    })
                }
            </div>
        </Motion.section>
    )
}

export default ServicesSection
