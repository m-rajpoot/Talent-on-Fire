import React from 'react'
import { promoOffer } from '@/data/services'

const PromoOffer = () => (
    <div className='mt-5'>
        <h4 className='flex items-start gap-0.5 font-semibold'>
            Promotional Offer
            <span className='mt-0.5 size-2 rounded-full bg-[#F83002]' aria-hidden='true' />
        </h4>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
            <span className='font-bold text-foreground'>{promoOffer.code}</span> {promoOffer.text}
        </p>
    </div>
)

export default PromoOffer
