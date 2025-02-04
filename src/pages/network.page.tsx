import CreatorCard from '@/components/creator-card/creator-card.component'
import { creators } from '@/constants/data'
import { GridContainerMd, SectionContainer } from '@/styles/globals.styles'


const NetworkPage = () => {
    return (
        <div className="flex flex-col py-12">
            <h3 className="text-4xl font-bold text-dark w-full text-center mt-[2rem]">Notre Réseau</h3>
            <p className="text-lg text-dark w-full text-center my-[2rem]">Connectez-vous avec des créateurs et innovateurs en recyclage créatif</p>

            <SectionContainer>
                <GridContainerMd>
                    {
                        creators.map((creator, index) => (<CreatorCard key={index} creator={creator} />))
                    }
                </GridContainerMd>
            </SectionContainer>
        </div>
    )
}

export default NetworkPage