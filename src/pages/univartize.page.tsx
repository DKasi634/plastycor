import UnivartizeCard from '@/components/univartize-card/univartize-card.component'
import { products } from '@/constants/data'
import { GridContainerMd, SectionContainer } from '@/styles/globals.styles'

const UnivartizePage = () => {
    return (
        <div className="flex flex-col py-12">
            <h3 className="text-4xl font-bold text-dark w-full text-center mt-[2rem]">Univartize</h3>
            <p className="text-lg text-dark w-full text-center my-[2rem]">Découvrez et partagez des techniques innovantes de recyclage créatif</p>

            <SectionContainer>
                <GridContainerMd>
                    {
                        products.map((product) => (<UnivartizeCard product={product} key={product.id} />))
                    }
                </GridContainerMd>
            </SectionContainer>
        </div>
    )
}

export default UnivartizePage