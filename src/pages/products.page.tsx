import ProductCard from "@/components/product-card/product-card.component";
import { Product, products } from "@/constants/data";
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles";
import { productsTestimonials } from "@/constants/data";
import TestimonialsSection from "@/components/testimonials-section/testimonials-section.component";




const ProductsPage = () => {
    const handleAddToCart = (product: Product) => {
        // Implement your add to cart logic here
        console.log("Added to cart:", product);
    };


    return (
        <div className="flex flex-col py-5">
            {/* Product Section */}
            <SectionContainer>
                <h3 className="text-4xl text-dark font-bold w-full text-center my-[2rem]">
                    Boutique
                </h3>
                <p className="text-lg w-full text-center mb-[1rem]">
                    Découvrez notre collection d'objets recyclés uniques
                </p>
                <GridContainerMd>
                    {products.map((product) => (
                        <ProductCard
                            key={product.name}
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                        />
                    ))}
                </GridContainerMd>
            </SectionContainer> 
            <TestimonialsSection sectionLabel="Ce que disent nos clients" testimonials={productsTestimonials} />       
        </div>
    );
};

export default ProductsPage;