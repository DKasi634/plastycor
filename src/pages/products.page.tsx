

import { SectionContainer } from "@/styles/globals.styles";
import { productsTestimonials } from "@/constants/data";
import TestimonialsSection from "@/components/testimonials-section/testimonials-section.component";
import ProductsContainer from "@/components/products-container/products-container.component";




const ProductsPage = () => {

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
                <ProductsContainer/>
            </SectionContainer> 
            <TestimonialsSection sectionLabel="Ce que disent nos clients" testimonials={productsTestimonials} />       
        </div>
    );
};

export default ProductsPage;