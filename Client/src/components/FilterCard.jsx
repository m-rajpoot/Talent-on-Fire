import React, { useId } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ALL, DEFAULT_FILTERS, filterGroups, hasActiveFilters } from '@/utils/jobFilters'

// Filters for the Jobs page: location, salary, industry.
// Every group has an "All" option (selected by default). The selected values live in Jobs.jsx,
// so the desktop sidebar and the mobile "Filter" panel always show the same selection.
const FilterCard = ({ filters = DEFAULT_FILTERS, onChange, onClear }) => {
    // unique ids per FilterCard instance (Jobs renders one for desktop and one for mobile)
    const idPrefix = useId()

    return (
        <div className='w-full bg-white dark:bg-transparent py-3 rounded-md'>
            <div className='flex items-center justify-between gap-2'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                {
                    hasActiveFilters(filters) && (
                        <button
                            type='button'
                            onClick={onClear}
                            className='text-sm font-medium text-[#6A38C2] hover:underline dark:text-[#a78bfa] cursor-pointer'
                        >
                            Clear all
                        </button>
                    )
                }
            </div>
            <hr className='mt-3' />

            {
                filterGroups.map((group) => (
                    <div key={group.key} className='mt-3'>
                        <h1 className='font-bold text-lg'>{group.title}</h1>
                        <RadioGroup
                            value={filters[group.key] ?? ALL}
                            onValueChange={(value) => onChange?.(group.key, value)}
                            aria-label={group.title}
                            className='gap-0'
                        >
                            {
                                [ALL, ...group.options].map((option, idx) => {
                                    const itemId = `${idPrefix}-${group.key}-${idx}`
                                    return (
                                        <div className='flex items-center gap-1 my-2' key={option}>
                                            <RadioGroupItem value={option} id={itemId} />
                                            <Label className='text-base/5 cursor-pointer' htmlFor={itemId}>{option}</Label>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard
