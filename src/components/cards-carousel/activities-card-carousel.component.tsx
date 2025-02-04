

import { Activity } from "@/types";
import React, { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { Card, CarouselContainer, CarouselContent, PaginationDot, PaginationDotsContainer } from "./cards-carousel.styles";


interface ActivitiesCarouselCardProps {
    activities: Activity[];
    autoScrollInterval?: number; // Optional prop for customizing the interval (default is 5 seconds)
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselCardProps> = ({ activities, autoScrollInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Function to move to the next activity
    const handleNext = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setCurrentIndex((prevIndex) =>
            prevIndex === activities.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to move to the previous activity
    const handlePrev = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? activities.length - 1 : prevIndex - 1
        );
    };

    // Scroll the container to the current index
    useEffect(() => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.offsetWidth;
            containerRef.current.scrollLeft = currentIndex * cardWidth;
        }

        // Set up the automatic scrolling timer
        timeoutRef.current = setTimeout(handleNext, autoScrollInterval);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, autoScrollInterval]);

    return (
        <CarouselContainer className="relative min-w-[100%] max-w-full w-fit overflow-hidden flex flex-col">
            {/* Left arrow */}
            <button onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-10 border-[1px] border-dark-transparent shadow-md shadow-dark-transparent"
            >
                <FaAngleLeft />
            </button>

            {/* Carousel content */}
            <CarouselContent
                ref={containerRef}
                className="flex transition-transform ease-linear duration-300 gap-4 py-4 overflow-x-auto scroll-smooth min-w-[100%] !max-w-full w-fit"
            >
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-center w-full min-w-[100%] px-4" >
                        <Card className="!w-full !max-w-[28rem]">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full object-cover object-center rounded-lg"
                            />
                            <h3 className="my-3 text-xl font-bold line-clamp-1 w-full text-center">{activity.title}</h3>
                            <p className="text-xs line-clamp-2 w-full text-center">{activity.description}</p>
                            <div className="flex items-center justify-center w-full my-2 md:my-3"> <BaseButton href={`/activities/#${activity.id}`} type={buttonType.green} className="!text-xs">En savoir plus... </BaseButton> </div>
                        </Card>
                    </div>

                ))}
            </CarouselContent>
            <PaginationDotsContainer className="my-2">
                 {activities.map((_, index) => (
                    <PaginationDot key={index} $active={index === currentIndex} />
                ))
                }
            </PaginationDotsContainer>

            {/* Right arrow */}
            <button onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-10 border-[1px] border-dark-transparent shadow-md shadow-dark-transparent"
            >
                <FaAngleRight />
            </button>
        </CarouselContainer>
    );
};



export default ActivitiesCarousel;


