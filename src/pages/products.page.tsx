

import { SectionContainer } from "@/styles/globals.styles";
import { productsTestimonials } from "@/constants/data";
import TestimonialsSection from "@/components/testimonials-section/testimonials-section.component";
import ProductsContainer from "@/components/products-container/products-container.component";
import { BiPlus } from "@/assets";
import BaseButton from "@/components/base-button/base-button.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import { ADMIN_STATUS } from "@/api/types";




const ProductsPage = () => {

    const currentUser = useSelector(selectCurrentUser);
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
            {(currentUser && (currentUser.adminStatus === ADMIN_STATUS.CO_ADMIN || currentUser.adminStatus === ADMIN_STATUS.MAIN_ADMIN)) &&
             <BaseButton href="/me/post" className="fixed right-[2rem] bottom-[5rem] z-40 shadow-lg lg:bottom-[2rem] font-semibold !text-sm">Post <BiPlus /></BaseButton>      }
        </div>
    );
};

export default ProductsPage;