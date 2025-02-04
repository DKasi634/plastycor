import { useRef, useState } from 'react'
import { CardsCarouselWrapper, PaginationDotsContainer, PaginationDot } from "@/components/cards-carousel/cards-carousel.styles"
import { Product } from '@/constants/data';
import ProductCard from '../product-card/product-card.component';


type ProductsCarouselProps = {
    className?:string;
    products:Product[]
}
const ProductsCarousel = ({className="", products}:ProductsCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselWrapperRef = useRef<HTMLDivElement|null>(null)

    const handleScroll = ()=>{
        if(!carouselWrapperRef.current){ return }
        const leftOffset = carouselWrapperRef.current.scrollLeft;
        const cardWidth = (carouselWrapperRef.current.querySelector(".card") as HTMLDivElement).offsetWidth;
        const activeIndex = Math.floor(leftOffset / cardWidth);
        setActiveIndex(activeIndex);
    }
    

  return (
    <>
        <CardsCarouselWrapper  ref={carouselWrapperRef} className={`${className} py-8`} onScroll={handleScroll}>
            {
                products.map((product) => (
                        <ProductCard className={`!min-w-[20rem] !md:min-w-[24rem] !w-fit !h-full card`} key={product.id} product={product} />
                    )
                )
            }
        </CardsCarouselWrapper>
        <PaginationDotsContainer>
            {
            products.map((product, index) =>(
                <PaginationDot key={product.id} $active={index === activeIndex} />
            ))
            
            }
        </PaginationDotsContainer>
    </>
  )
}

export default ProductsCarousel;