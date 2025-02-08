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

    // Function to determine the number of visible items based on screen size
    const getVisibleItemsCount = () => {
        if (window.innerWidth >= 1024) return 2; // lg and xl screens
        return 1; // sm and md screens
    };

    // Function to move to the next activity
    const handleNext = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const visibleItems = getVisibleItemsCount();
        setCurrentIndex((prevIndex) =>
            prevIndex + visibleItems >= activities.length ? 0 : prevIndex + visibleItems
        );
    };

    // Function to move to the previous activity
    const handlePrev = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const visibleItems = getVisibleItemsCount();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? activities.length - visibleItems : prevIndex - visibleItems
        );
    };

    // Scroll the container to the current index
    useEffect(() => {
        if (containerRef.current) {
            const visibleItems = getVisibleItemsCount();
            const cardWidth = containerRef.current.offsetWidth / visibleItems; // Width of one visible item
            containerRef.current.scrollLeft = currentIndex * cardWidth;
        }

        // Set up the automatic scrolling timer
        timeoutRef.current = setTimeout(handleNext, autoScrollInterval);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, autoScrollInterval]);

    return (
        <CarouselContainer className="relative min-w-[100%] max-w-full lg:px-8 w-fit overflow-hidden flex flex-col">
            {/* Left arrow */}
            <button
                onClick={handlePrev}
                className="absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-20 border-[1px] border-dark-transparent shadow-md shadow-dark-transparent"
            >
                <FaAngleLeft />
            </button>

            {/* Carousel content */}
            <CarouselContent
                ref={containerRef}
                className="flex transition-transform ease-linear duration-300 gap-4 lg:px-8 py-4 mx-auto overflow-x-auto scroll-smooth min-w-[100%] !max-w-full w-fit"
            >
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-center justify-center w-full min-w-[100%] sm:min-w-[100%] lg:w-1/2 lg:min-w-[51%]" // Responsive width
                    >
                        <Card className="!w-full !max-w-[28rem]">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full object-cover object-center rounded-lg"
                            />
                            <h3 className="my-3 text-xl font-bold line-clamp-1 w-full text-center">
                                {activity.title}
                            </h3>
                            <p className="text-xs line-clamp-2 w-full text-center">
                                {activity.description}
                            </p>
                            <div className="flex items-center justify-center w-full my-2 md:my-3">
                                <BaseButton
                                    href={`/activities/#${activity.id}`}
                                    type={buttonType.green}
                                    className="!text-xs"
                                >
                                    En savoir plus...
                                </BaseButton>
                            </div>
                        </Card>
                    </div>
                ))}
            </CarouselContent>

            {/* Pagination dots */}
            <PaginationDotsContainer className="my-2">
                {Array.from({ length: Math.ceil(activities.length / getVisibleItemsCount()) }).map((_, index) => (
                    <PaginationDot
                        key={index}
                        $active={index === Math.floor(currentIndex / getVisibleItemsCount())}
                    />
                ))}
            </PaginationDotsContainer>

            {/* Right arrow */}
            <button
                onClick={handleNext}
                className="absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-20 border-[1px] border-dark-transparent shadow-md shadow-dark-transparent"
            >
                <FaAngleRight />
            </button>
        </CarouselContainer>
    );
};

export default ActivitiesCarousel;