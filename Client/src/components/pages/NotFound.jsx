import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Button } from '../ui/button'

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className='my-24 flex flex-col items-center gap-4 px-5 text-center'>
                <p className='text-6xl font-bold text-[#6A38C2] dark:text-[#a78bfa]'>404</p>
                <h1 className='text-2xl font-bold'>Page not found</h1>
                <p className='max-w-md text-gray-600 dark:text-gray-400'>The page you are looking for doesn&apos;t exist or has been moved.</p>
                <Button asChild className='bg-[#6A38C2] text-white hover:bg-[#5b30a6]'>
                    <Link to='/'>Go to Home</Link>
                </Button>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound
