import { Product, products } from "@/constants/data";
import { GridContainerSm, SectionContainer } from "@/styles/globals.styles";
import ProductCard from "../product-card/product-card.component";
import BaseButton from "../base-button/base-button.component";


const ProductsSection = () => {
    const handleAddToCart = (product: Product) => {
        // Implement your add to cart logic here
        console.log('Added to cart:', product);
      };
    
      return (
        <SectionContainer id="products" >
          <h2 className="text-3xl font-bold text-dark my-8 w-full text-center">Nos produits</h2>
          <GridContainerSm >
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </GridContainerSm>
          <div className="w-full flex items-center justify-center py-2"> <BaseButton> Voir plus ... </BaseButton> </div>
        </SectionContainer>
      );
}

export default ProductsSection