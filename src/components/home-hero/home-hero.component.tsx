import  { useState, useEffect, useCallback, TouchEvent } from 'react';
import image1 from "@/assets/hero/hero-bins-street.jpg"
import image2 from "@/assets/hero/hero-bottles.jpg"
import image3 from "@/assets/hero/hero-red-covered-bottles.jpg"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import BaseButton, { buttonType } from '../base-button/base-button.component';
import { GoArrowUpRight } from 'react-icons/go';
import { LandingHeroSection } from '@/styles/globals.styles';


// Define image URLs (replace with your own)
const IMAGES = [
    image1,image2, image3
];

const HomeHero = () =>{
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto-cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
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
        setCurrentImageIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
      } else {
        // Swipe left: next image
        setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
      }
    }
    setTouchStartX(null);
  };

  // Manual navigation
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  return (
    <LandingHeroSection 
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Gradient Overlay (optional) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center text-center text-white">
        <div className="max-w-2xl px-4">
          <h1 className="mb-6 text-5xl font-bold">Plastique Recyclé : Créer, Innover, Préserver</h1>
          <p className="mb-8 text-xl">Chaque bouteille, sac ou emballage devient une opportunité de créer l'extraordinaire. Découvrez comment nous valorisons le plastique autrement</p>
          <div className="flex justify-center gap-4">
          <BaseButton className='!py-3 !font-semibold !text-[1rem]' rounded={false} type={buttonType.green}> Découvrir Nos Créations </BaseButton>
          <BaseButton className='!py-3 !font-semibold !text-[1rem]' rounded={false} type={buttonType.light}> Nous contacter <GoArrowUpRight /> </BaseButton>
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