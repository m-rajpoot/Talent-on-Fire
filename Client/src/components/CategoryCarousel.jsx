import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security",
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }


    return (
        <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        >
            {/* each pill is as wide as its text (basis-auto), so long names never overlap the next pill */}
            <Carousel
                opts={{ align: "start" }}
                className="w-full max-sm:max-w-[calc(100%-7rem)] sm:max-w-xl md:max-w-2xl mx-auto my-10"
            >
                <CarouselContent fade className="py-1">
                    {
                        category.map((cat) => (
                            <CarouselItem key={cat} className="basis-auto">
                                <Button onClick={() => searchJobHandler(cat.trim())} variant="outline" className="rounded-full whitespace-nowrap cursor-pointer hover:scale-105 duration-300 transition-all">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </motion.div>
    )
}

export default CategoryCarousel