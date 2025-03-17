import { useState, useEffect, useCallback, TouchEvent } from 'react';
// import image1 from "@/assets/hero-min/hero-bins-street.jpg"
// import image2 from "@/assets/hero-min/hero-bottles.jpg"
// import image3 from "@/assets/hero-min/hero-red-covered-bottles.jpg"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import BaseButton, { buttonType } from '../base-button/base-button.component';
import { GoArrowUpRight } from 'react-icons/go';
import { LandingHeroSection } from '@/styles/globals.styles';
import { HeroBlocs } from '@/constants/data';


// Define image URLs (replace with your own)
// const HeroBlocs = [
//     image1,image2, image3
// ];

const HomeHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto-cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HeroBlocs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle swipe gestures
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
      if (deltaX > 0) {
        // Swipe right: previous image
        setCurrentImageIndex((prev) => (prev - 1 + HeroBlocs.length) % HeroBlocs.length);
      } else {
        // Swipe left: next image
        setCurrentImageIndex((prev) => (prev + 1) % HeroBlocs.length);
      }
    }
    setTouchStartX(null);
  };

  // Manual navigation
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HeroBlocs.length) % HeroBlocs.length);
  };

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % HeroBlocs.length);
  }, []);

  return (
    <LandingHeroSection
      className="relative h-screen w-full overflow-hidden" id='home'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {HeroBlocs.map((bloc, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100  backdrop-contrast-200' : 'opacity-0'
              }`}
            style={{ backgroundImage: `url(${bloc.image})` }}
          />
        ))}
      </div>

      {/* Gradient Overlay (optional) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center text-center text-white">
        <div className="max-w-5xl px-4">
          
              <>
                <h1 className={`mb-12 text-5xl font-bold backdrop-opacity-95 ${currentImageIndex === 1?"text-sky-500": currentImageIndex === 2?"text-red-500":currentImageIndex === 3?"text-amber-400":"text-white" }`}>{HeroBlocs[currentImageIndex].department}</h1>
                <p className="mb-8 text-xl">{HeroBlocs[currentImageIndex].description}</p>
                <p className={`mb-8 text-xl px-4 py-2 rounded-xl ${ currentImageIndex === 0 ? "bg-dark-transparent":"bg-light"} w-fit mx-auto font-bold opacity-90 ${currentImageIndex === 1?"text-sky-500": currentImageIndex === 2?"text-red-500":currentImageIndex === 3?"text-amber-400":"text-white " } `}>{HeroBlocs[currentImageIndex].slogan}</p>
              </>
          <div className="flex justify-center gap-4">
            <BaseButton href='/shop' className='!py-3 !font-semibold !text-[1rem]' rounded={false} type={buttonType.green}> Découvrir Nos Créations </BaseButton>
            <BaseButton href='/contact' className='!py-3 !font-semibold !text-[1rem]' rounded={false} type={buttonType.light}> Nous contacter <GoArrowUpRight /> </BaseButton>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (optional) */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-light/80 p-3 hover:bg-light"
      >
        <FaAngleRight />
      </button>
    </LandingHeroSection>
  );
}
export default HomeHero