import React, { useState } from 'react'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LOGO_SRC, SHOW_NAME_NEXT_TO_LOGO, SITE_NAME, SITE_SHORT_NAME } from '@/data/siteConfig'

// "Talent on Fire" -> "Talent on " + "Fire" (last word in the accent colour)
const splitLastWord = (name) => {
    const at = name.lastIndexOf(' ')
    return at === -1 ? ['', name] : [name.slice(0, at + 1), name.slice(at + 1)]
}

// "TF" -> "T" + "F"
const splitLastChar = (name) => [name.slice(0, -1), name.slice(-1)]

const sizes = {
    md: { img: 'h-8 max-w-[140px]', icon: 'size-8', flame: 'size-4', text: 'text-2xl' },
    lg: { img: 'h-10 max-w-[180px]', icon: 'size-10', flame: 'size-5', text: 'text-2xl' },
}

// Brand logo + name used in the Navbar and Footer.
// Uses public/logo.png (see LOGO_SRC in data/siteConfig.js); falls back to a flame icon if it can't load.
// compactOnMobile: on phones (< 640px) show the short name "TF" instead of the full name.
const Logo = ({ size = 'md', compactOnMobile = false, className }) => {
    const [imageFailed, setImageFailed] = useState(false)
    const s = sizes[size] || sizes.md
    const accent = 'text-[#F83002] dark:text-[#ff6a3d]'

    const [fullStart, fullEnd] = splitLastWord(SITE_NAME)
    const [shortStart, shortEnd] = splitLastChar(SITE_SHORT_NAME)

    return (
        <span className={cn('inline-flex items-center gap-2', className)}>
            {
                imageFailed
                    ? (
                        <span className={cn('flex shrink-0 items-center justify-center rounded-full bg-[#6A38C2] text-white', s.icon)} aria-hidden='true'>
                            <Flame className={s.flame} />
                        </span>
                    )
                    : (
                        <img
                            src={LOGO_SRC}
                            alt={`${SITE_NAME} logo`}
                            onError={() => setImageFailed(true)}
                            className={cn('w-auto shrink-0 object-contain', s.img)}
                        />
                    )
            }

            {
                (SHOW_NAME_NEXT_TO_LOGO || imageFailed) && (
                    <span className={cn('font-bold whitespace-nowrap leading-none', s.text, compactOnMobile && 'max-sm:text-xl')}>
                        <span className={cn(compactOnMobile && 'max-sm:hidden')}>
                            {fullStart}<span className={accent}>{fullEnd}</span>
                        </span>
                        {
                            compactOnMobile && (
                                <span className='sm:hidden' title={SITE_NAME}>
                                    {shortStart}<span className={accent}>{shortEnd}</span>
                                </span>
                            )
                        }
                    </span>
                )
            }
        </span>
    )
}

export default Logo
