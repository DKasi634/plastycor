import { corePrinciples } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"
import PrincipleCard from "../principle-card/principle-card.component"


const AboutSection = () => {
  return (
    <section className="flex flex-col py-8">
      <SectionContainer >
        <h3 className="text-3xl text-center font-semibold my-4">Qui sommes-nous ?</h3>
        <p className="text-sm text-center my-8">
          Plastycor est une entreprise sociale œuvrant pour la protection de l'environnement à travers la gestion des déchets plastiques. Nous intervenons dans la sensibilisation, la formation, l'upcycling (recyclage) et la collecte sélective des déchets plastiques. 
          Nicole Menemene est la fondatrice de Plastycor.
          <br /><br/>
          À ce jour, Plastycor a réalisé plusieurs créations (à partir de bouteilles en plastique, sacs plastiques, tongs, sacs alimentaires, sacs de ciment) : des chaises, des murs avec ou sans maçonnerie, des poubelles et paniers polyvalents, des fleurs et pots de fleurs, des dessous de verre, etc.
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