import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import ServiceList from './ServiceList'
import PromoOffer from './PromoOffer'
import { serviceGroups } from '@/data/services'
import { cn } from '@/lib/utils'

// Naukri-style "Services" mega menu for the desktop navbar
const ServicesMenu = () => {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button type='button' className='flex items-center gap-1 font-medium cursor-pointer outline-none'>
                    Services
                    <ChevronDown className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} />
                </button>
            </PopoverTrigger>
            <PopoverContent align='center' sideOffset={14} className='w-[min(94vw,880px)] p-0 rounded-xl overflow-hidden shadow-xl dark:shadow-black/50'>
                <div className='grid grid-cols-3'>
                    {
                        serviceGroups.map((group, index) => (
                            <div key={group.title} className={cn('p-6', index > 0 && 'border-l border-border')}>
                                <h3 className='mb-3 text-base font-semibold'>{group.title}</h3>
                                <ServiceList items={group.items} onNavigate={close} />
                                {index === serviceGroups.length - 1 && <PromoOffer />}
                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-end border-t border-border bg-muted/40 px-6 py-2.5'>
                    <Link
                        to='/services'
                        onClick={() => {
                            close()
                            window.scrollTo(0, 0)
                        }}
                        className='flex items-center gap-1 text-sm font-medium text-[#6A38C2] hover:underline dark:text-[#a78bfa]'
                    >
                        View all services <ArrowRight className='size-4' />
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ServicesMenu
