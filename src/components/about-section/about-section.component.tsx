import { corePrinciples } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"
import PrincipleCard from "../principle-card/principle-card.component"


const AboutSection = () => {
  return (
    <section className="flex flex-col py-8">
      <SectionContainer >
        <h3 className="text-3xl text-center font-semibold my-4">Qui sommes-nous ?</h3>
        <p className="text-sm text-center my-4">Favoriser le changement positif grâce à la créativité, la collaboration et la durabilité.</p>
        <GridContainerMd>
          {
            corePrinciples.map((principle, index) => (<PrincipleCard key={index} data={principle} />))
          }
        </GridContainerMd>

      </SectionContainer>
    </section>
  )
}

export default AboutSection;