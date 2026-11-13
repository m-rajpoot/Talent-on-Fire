import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarImage } from './ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { applyJobFilters, DEFAULT_FILTERS, hasActiveFilters, matchesSalary } from '@/utils/jobFilters'



// const jobs = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ]


function Jobs() {

    const dispatch = useDispatch();

    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(state => state.job);

    const { user } = useSelector(store => store.auth);

    const [filterJobs, setFilterJobs] = useState([]);

    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    // selected filters: { location, salary, industry } - each one is "All" by default
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const changeFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
    const clearFilters = () => setFilters(DEFAULT_FILTERS);




    useEffect(() => {

        let jobs = allJobs;

        if (searchedQuery) {
            const query = searchedQuery.toLowerCase();
            jobs = jobs.filter((job) => {
                return job?.title?.toLowerCase().includes(query) ||
                    job?.description?.toLowerCase().includes(query) ||
                    job?.location?.toLowerCase().includes(query) ||
                    matchesSalary(job?.salary, searchedQuery)
                // job?.company.toLowerCase().includes(searchedQuery.toLowerCase())
            })
        }

        // location + salary + industry filters ("All" = no filter for that group)
        setFilterJobs(applyJobFilters(jobs, filters))

    }, [allJobs, searchedQuery, filters])


    // open the Jobs page with every job listed (a search typed elsewhere shouldn't hide jobs here)
    useEffect(() => {
        dispatch(setSearchedQuery(""));
    }, [dispatch])


    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
            console.log("trr");

        }
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className='sm:px-[5%] max-sm:px-5 lg:px-[8%] mt-5'>
                <div className=' sm:flex gap-5 mx-0 px-0 '>
                    <div className='sm:min-w-[169px] max-sm:hidden'>
                        <FilterCard filters={filters} onChange={changeFilter} onClear={clearFilters} />

                    </div>


                    <div className='sm:hidden'>
                        <div className='text-right my-4' onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}>
                            <Button className=''>Filter</Button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0.2, y: 100 }}
                            transition={{ duration: 1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{}}
                            className='mb-5'>
                            {
                                isFilterBoxOpen &&
                                <>
                                    <FilterCard filters={filters} onChange={changeFilter} onClear={clearFilters} />
                                    <hr />
                                </>

                            }
                        </motion.div>
                    </div>




                    <div className="w-full">
                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex flex-col items-start gap-2 sm:m-4'>
                                    <span>No Jobs Found</span>
                                    {
                                        hasActiveFilters(filters) &&
                                        <Button variant='outline' size='sm' className='cursor-pointer' onClick={clearFilters}>Clear filters</Button>
                                    }
                                </div>
                            ) :
                                <div className='h-[calc(100vh-5rem)] overflow-y-auto pb-5'>
                                    <div className='max-sm: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:m-4'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>

                        }
                    </div>

                </div>



            </div>



            <Footer />
        </>
    )
}

export default Jobs