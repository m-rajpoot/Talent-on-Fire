import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, BuildingIcon, FileText, Home, HomeIcon, LayoutGrid, LogOut, Menu, MenuIcon, SearchCheck, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"
import ThemeToggle from './ThemeToggle'
import ServicesMenu from '../services/ServicesMenu'
import Logo from './Logo'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth);

    // the navbar stays fixed at the top while scrolling; add a shadow once the page has scrolled
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }


    const resetQuery = () => {
        dispatch(setSearchedQuery(''))
    }


    return (
        <header className={`sticky top-0 z-40 border-b transition-shadow duration-300 bg-white/90 backdrop-blur-md dark:bg-background/80 dark:border-white/10 ${scrolled ? 'border-gray-200 shadow-sm dark:shadow-black/40' : 'border-transparent'}`}>
            <div className='flex items-center justify-between mx-auto h-16 max-sm:px-3 sm:px-[5%] lg:px-[10%]'>
                <div onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className='cursor-pointer' role='link' aria-label='Go to home page'>
                    <Logo compactOnMobile />
                </div>
                <div className='flex items-center gap-12 max-sm:gap-5'>
                    <ul className='flex font-medium items-center gap-5 max-sm:hidden'>
                        {
                            user && user.role === "recruiter"
                                ?
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                                : (
                                    <>
                                        <motion.li onClick={resetQuery}><Link to="/">Home</Link></motion.li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li onClick={resetQuery}><Link to="/browse">Browse</Link></li>
                                        <li><ServicesMenu /></li>
                                    </>
                                )
                        }
                    </ul>


                    <div className='flex items-center gap-3 max-sm:gap-2'>
                    {
                        !user
                            ?
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button className="cursor-pointer max-sm:h-8 max-sm:px-3" variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white cursor-pointer max-sm:h-8 max-sm:px-3">Signup</Button>
                                </Link>
                            </div>
                            :
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            {
                                                user?.profile?.profilePhoto
                                                    ?
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                                    :
                                                    <AvatarImage src="https://i.pinimg.com/736x/0c/0a/72/0c0a720c76ebb1c89278fb5cb4190835.jpg" alt="profile" />
                                            }
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div>
                                            <div className='flex gap-4 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    {
                                                        user?.profile?.profilePhoto
                                                            ?
                                                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                                            :
                                                            <AvatarImage src="https://i.pinimg.com/736x/0c/0a/72/0c0a720c76ebb1c89278fb5cb4190835.jpg" alt="profile" />
                                                    }
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>
                                                        {user?.profile?.bio}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                                                {
                                                    user && user?.role === "student" &&
                                                    (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button className="cursor-pointer" variant="link"><Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} className="cursor-pointer" variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div >
                    }

                    {/* light <-> dark theme switch */}
                    <ThemeToggle />
                    </div>

                    <div className='sm:hidden'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    {
                                        <MenuIcon className='mt-1' />
                                    }
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    {
                                        user && user.role === "recruiter"
                                            ?
                                            <div className='flex flex-col gap-3'>
                                                <div onClick={() => navigate("/admin/companies")} className='flex items-center gap-3'>
                                                    <BuildingIcon className='size-5' />
                                                    <p className='text-lg font-medium cursor-pointer'>Companies</p>
                                                </div>

                                                <div onClick={() => navigate("/admin/jobs")} className='flex items-center gap-3 cursor-pointer'>
                                                    <BriefcaseBusiness />
                                                    <p className='text-lg font-medium' to="/admin/jobs">Jobs</p>
                                                </div>
                                            </div>
                                            : (
                                                <>
                                                    <div className='flex flex-col gap-3'>
                                                        <div
                                                            onClick={() => {
                                                                navigate("/")
                                                                dispatch(setSearchedQuery(""))
                                                            }}
                                                            className='flex items-center gap-3 cursor-pointer'>
                                                            <HomeIcon className='size-5' />
                                                            <p className='text-lg font-medium'>Home</p>
                                                        </div>

                                                        <div onClick={() => navigate("/jobs")} className='flex items-center gap-3 cursor-pointer'>
                                                            <BriefcaseBusiness />
                                                            <p className='text-lg font-medium' to="/admin/jobs">Jobs</p>
                                                        </div>

                                                        <div
                                                            onClick={() => {
                                                                navigate("/browse")
                                                                dispatch(setSearchedQuery(""))
                                                            }}
                                                            className='flex items-center gap-3 cursor-pointer'>
                                                            <SearchCheck />
                                                            <p className='text-lg font-medium' to="/admin/jobs">Browse</p>
                                                        </div>

                                                        <div onClick={() => navigate("/services")} className='flex items-center gap-3 cursor-pointer'>
                                                            <LayoutGrid />
                                                            <p className='text-lg font-medium'>Services</p>
                                                        </div>

                                                        <div onClick={() => navigate("/resume-samples")} className='flex items-center gap-3 cursor-pointer'>
                                                            <FileText />
                                                            <p className='text-lg font-bold'>Resume samples</p>
                                                            <span className='rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-400/10 dark:text-green-300'>Available</span>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                    }
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>


                </div >
            </div >
        </header>

    )
}

export default Navbar


