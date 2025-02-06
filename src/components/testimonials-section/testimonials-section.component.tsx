
import { SectionContainer } from "@/styles/globals.styles"
import { Testimonial } from "@/types"
import { useState, useEffect, useRef } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri"
import { Card } from "../cards-carousel/cards-carousel.styles"


type TestimonialsProps = {
    className?: string,
    testimonials: Testimonial[],
    sectionLabel: string
}

const TestimonialsSection = ({ className = "", testimonials, sectionLabel = "" }: TestimonialsProps) => {

    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!testimonials.length) { return }
        const intervalId = setInterval(() => {
            setCurrentTestimonialIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [testimonials, currentTestimonialIndex]);

    const handleNext = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to move to the previous activity
    const handlePrev = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={`${className} flex flex-col`}>
            <SectionContainer className="mt-10 mb-4 px-4">
                <h3 className="text-4xl text-dark font-bold w-full text-center my-[2rem]">
                    {sectionLabel}
                </h3>
                <Card className="!relative !max-w-lg !w-full !mx-auto !p-8 border border-gray-transparent rounded-lg shadow-md  text-center">
                    <div className="text-lg text-gray-800 leading-relaxed flex items-start justfify-center mb-4 gap-2">
                        <span className="text-green"><RiDoubleQuotesL /></span> <span className="text-xs"> {testimonials[currentTestimonialIndex].content}</span>
                        <span className="text-green"><RiDoubleQuotesR /></span>
                    </div>
                    {/* Testimonial Author */}
                    <p className="text-sm italic text-dark font-bold">
                        — {testimonials[currentTestimonialIndex].name}
                    </p>
                    <button onClick={handlePrev}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-[5] border-[1px] border-dark-transparent shadow-md shadow-dark-transparent">
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light z-[5] border-[1px] border-dark-transparent shadow-md shadow-dark-transparent">
                        <FaAngleRight />
                    </button>
                </Card>

            </SectionContainer>
        </div>
    )
}

export default TestimonialsSection