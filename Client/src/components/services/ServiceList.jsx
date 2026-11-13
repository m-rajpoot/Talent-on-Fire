import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// green "Available" pill shown next to live services (e.g. Resume samples)
export const AvailableBadge = ({ className }) => (
    <span className={cn(
        'inline-flex items-center gap-1 rounded-full border border-green-600/30 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700',
        'dark:border-green-400/30 dark:bg-green-400/10 dark:text-green-300',
        className
    )}>
        <CheckCircle2 className='size-3.5' />
        Available
    </span>
)

const ServiceTag = ({ tag, tone }) => (
    <span className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4',
        tone === 'green'
            ? 'border-green-500/60 text-green-700 dark:border-green-400/50 dark:text-green-300'
            : 'border-gray-300 text-gray-600 dark:border-white/20 dark:text-gray-300'
    )}>
        {tag}
    </span>
)

const comingSoon = (label) => {
    toast.info(`${label} is coming soon`, {
        description: 'We are working on it. Meanwhile, try the free Resume samples.',
    })
}

// one service row. `showDetails` adds the description + "Coming soon" hint (used on cards)
const ServiceItem = ({ item, onNavigate, showDetails }) => {
    const label = (
        <span className='flex flex-wrap items-center gap-2'>
            <span className={cn(
                item.available
                    ? 'font-bold text-foreground'
                    : 'text-gray-700 dark:text-gray-300'
            )}>
                {item.label}
            </span>
            {item.tag && <ServiceTag tag={item.tag} tone={item.tagTone} />}
            {item.available && <AvailableBadge />}
            {!item.available && showDetails && (
                <span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>Coming soon</span>
            )}
        </span>
    )

    const details = showDetails && item.description
        ? <span className='mt-0.5 block text-sm text-muted-foreground'>{item.description}</span>
        : null

    const rowClass = cn(
        'block w-full rounded-md px-2 py-1.5 -mx-2 text-left transition-colors cursor-pointer',
        item.available
            ? 'hover:bg-green-50 dark:hover:bg-green-400/10'
            : 'hover:bg-accent'
    )

    if (item.available && item.to) {
        return (
            <li>
                <Link
                    to={item.to}
                    onClick={() => {
                        onNavigate?.()
                        window.scrollTo(0, 0)
                    }}
                    className={rowClass}
                >
                    {label}
                    {details}
                </Link>
            </li>
        )
    }

    return (
        <li>
            <button type='button' onClick={() => comingSoon(item.label)} className={rowClass}>
                {label}
                {details}
            </button>
        </li>
    )
}

const ServiceList = ({ items, onNavigate, showDetails = false, className }) => (
    <ul className={cn('flex flex-col gap-0.5', showDetails && 'gap-2', className)}>
        {
            items.map((item) => (
                <ServiceItem key={item.label} item={item} onNavigate={onNavigate} showDetails={showDetails} />
            ))
        }
    </ul>
)

export default ServiceList
