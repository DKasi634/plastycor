import { corePrinciples } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"
import PrincipleCard from "../principle-card/principle-card.component"


const AboutSection = () => {
  return (
    <section className="flex flex-col py-8">
      <SectionContainer >
        <h3 className="text-3xl text-center font-semibold my-4">Qui sommes-nous ?</h3>
        <p className="text-sm text-center my-8">
          Plastycor est une entreprise sociale œuvrant pour la protection de l'environnement à travers la gestion des déchets, spécialement les déchets plastiques. Nous intervenons dans la sensibilisation, la formation, l'upcycling (surecyclage) et la collecte des déchets urbains. 
          <b>Nicole Menemene</b>, Ashoka Fellow RDC, est la fondatrice de Plastycor.
          <br /><br/>
          À ce jour, Plastycor a réalisé plusieurs créations et s'est lancé dans une campagne intensive de sensibilisation et de formation des jeunes et des femmes sur l'étendue de la RDC et partout en Afrique, virtuellement ou en presentiel où cela est demandé.
        </p>
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