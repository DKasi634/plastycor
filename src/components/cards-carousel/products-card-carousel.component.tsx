import React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
import {
  CardsCarouselWrapper,
  PaginationDotsContainer,
  PaginationDot,
} from '@/components/cards-carousel/cards-carousel.styles';
import ProductCard from '../product-card/product-card.component';
import { ApiProduct } from '@/api/types';
import {
  getFirestoreCollectionRef,
  FIRESTORE_COLLECTIONS,
} from '@/utils/firebase/firestore.utils';
import { orderBy, limit, query, getDocs } from 'firebase/firestore';
import { ShimerEffect } from '@/styles/globals.styles';

type ProductsCarouselProps = {
  className?: string;
};

// Memoize the component to prevent unnecessary re-renders
const ProductsCarousel = React.memo(({ className = '' }: ProductsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselProducts, setCarouselProducts] = useState<ApiProduct[]>([]);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const carouselProductsLimit = 5;

  // console.log("\nProductsCarousel rendered at ", new Date().toISOString());

  useEffect(() => {
    fetchCarouselProducts();
    // console.log("\nEffect running at : ", new Date().toISOString());
  }, []); // Empty dependency array ensures this runs only once

  const fetchCarouselProducts = async () => {
    // console.log("\nStarted Fetching products !");
    if (loading) return;
    setLoading(true);

    try {
      const q = query(
        getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION),
        orderBy('createdAt', 'desc'),
        orderBy('id', 'desc'),
        limit(carouselProductsLimit)
      );

      const docsSnapshot = await getDocs(q);

      if (docsSnapshot.docs.length) {
        const fetchedProducts = docsSnapshot.docs.map((doc) =>
          doc.data() as ApiProduct
        );

        const uniqueProducts = [...carouselProducts, ...fetchedProducts].filter(
          (product) => !carouselProducts.some((p) => p.id === product.id)
        );

        if (uniqueProducts.length > 0) {
            // console.log("Updating carouselProducts with", uniqueProducts.length, "new products");
            setCarouselProducts(uniqueProducts);
          }
      }
    } catch (error) {
      console.error('Error fetching carousel products :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!carouselWrapperRef.current) return;

    const leftOffset =
      carouselWrapperRef.current.scrollLeft || 0; // Handle potential null values
    const cardWidth =
      (carouselWrapperRef.current.querySelector('.card') as HTMLDivElement)
        ?.offsetWidth || 1; // Default to 1 to avoid division by zero
    const activeIndex = Math.floor(leftOffset / cardWidth);
    setActiveIndex(activeIndex);
  };

  // Memoize the list of product cards to prevent unnecessary re-renders
  const productCards = useMemo(() => {
    return carouselProducts.map((product) => (
      <ProductCard
        key={product.id}
        className="!min-w-[20rem] !md:min-w-[24rem] !w-full max-w-[24rem] card"
        product={product}
      />
    ));
  }, [carouselProducts]);

  return (
    <>
      <CardsCarouselWrapper
        ref={carouselWrapperRef}
        className={`${className} py-8`}
        onScroll={handleScroll}
      >
        {carouselProducts.length ? (
          productCards
        ) : (
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2 !min-w-[20rem] !md:min-w-[24rem] !w-fit !h-full max-h-[36rem] card"
              >
                <div className="h-[11rem]">
                  <ShimerEffect className="w-full h-full object-center object-cover rounded-sm" />
                </div>
                <div className="h-[2rem]">
                  <ShimerEffect className="w-full h-full object-center object-cover rounded-sm" />
                </div>
              </div>
            ))
        )}
      </CardsCarouselWrapper>

      {carouselProducts.length > 1 && (
        <PaginationDotsContainer>
          {Array(carouselProducts.length || 5)
            .fill(0)
            .map((_, index) => (
              <PaginationDot key={index} $active={index === activeIndex} />
            ))}
        </PaginationDotsContainer>
      )}
    </>
  );
});

export default ProductsCarousel;