import { ActivityImageWrapper, GridContainerSm, SectionContainer } from "@/styles/globals.styles"

import ProductImage1 from "@/assets/products/product-1.jpg"
import ProductImage2 from "@/assets/products/product-2.jpg"
import ProductImage3 from "@/assets/products/product-3.jpg"
import ProductImage4 from "@/assets/products/product-4.jpg"
import ProductImage5 from "@/assets/products/product-5.jpg"
import ProductImage6 from "@/assets/products/product-6.jpg"

const images = [ProductImage1, ProductImage2, ProductImage3, ProductImage4, ProductImage5, ProductImage6]


const ActivitiesSection = () => {
  return (
    <section className="flex items-center justify-center gap-4 py-8" id="activities">
            <SectionContainer>
                <h3 className="text-3xl text-dark w-full text-center my-[3rem]">Nos activités</h3>
                <GridContainerSm className="pb-4">
                    {
                        images.map((image, index) =>( 
                            <ActivityImageWrapper className="flex opacity-90" key={index}>
                                <img src={image} className="" alt="" />
                            </ActivityImageWrapper>
                         ))
                    }
                </GridContainerSm>

            </SectionContainer>
        </section>
  )
}

export default ActivitiesSection