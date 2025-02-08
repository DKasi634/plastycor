import { products } from "@/constants/data";
import {  SectionContainer } from "@/styles/globals.styles";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import ProductsCarousel from "../cards-carousel/products-card-carousel.component";


const ProductsSection = () => {
  
      return (
        <div className="flex flex-col py-4">
        <SectionContainer id="products" >
          <h2 className="text-3xl font-bold text-dark my-8 w-full text-center">Notre Boutique</h2>
          <ProductsCarousel products={products} />
          <div className="w-full flex items-center justify-center py-4 "> <BaseButton href="/shop" type={buttonType.green}> Voir plus ... </BaseButton> </div>
        </SectionContainer>
        </div>
      );
}

export default ProductsSection