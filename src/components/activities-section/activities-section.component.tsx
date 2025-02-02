import { SectionContainer } from "@/styles/globals.styles"


import ActivitImage1 from "@/assets/activities/activity-1.jpg"
import ActivitImage2 from "@/assets/activities/activity-2.jpg"
import ActivitImage3 from "@/assets/activities/activity-3.jpg"


const ActivitiesSection = () => {
    return (
        <section className="flex items-center justify-center gap-4 py-8" id="activities">
            <SectionContainer>
                <h3 className="text-3xl text-dark w-full text-center my-[3rem]">Nos activités</h3>

                <div className="flex flex-col gap-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-start">
                        <div className="px-8 w-full aspect-square max-h-[60svh] overflow-hidden rounded-sm">
                            <img loading="lazy" src={ActivitImage1} className="w-full h-full object-cover object-center" alt="" />
                        </div>
                        <div className="flex flex-col gap-4 px-6 py-4">
                            <h3 className="text-xl font-bold w-full text-left uppercase">Recyclage des déchets plastiques</h3>
                            <p className="text-sm text-dark w-full text-left">
                            Nous transformons les bouteilles plastiques en objets utiles et esthétiques, donnant une seconde vie aux déchets tout en créant de la valeur.</p>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 items-start justify-start">
                        <div className="flex flex-col gap-4 px-6 py-4">
                            <h3 className="text-xl font-bold w-full text-left uppercase">Formation en techniques durables de recyclage</h3>
                            <p className="text-sm text-dark w-full text-left">Nous formons les jeunes et les femmes aux techniques durables de recyclage, créant ainsi des opportunités d'emploi tout en protégeant l'environnement.</p>
                        </div>
                        <div className="px-8 w-full aspect-square max-h-[60svh] overflow-hidden rounded-sm">
                            <img loading="lazy" src={ActivitImage2} className="w-full h-full object-cover object-center" alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-start">
                        <div className="px-8 w-full aspect-square max-h-[60svh] overflow-hidden rounded-sm">
                            <img loading="lazy" src={ActivitImage3} className="w-full h-full object-cover object-center" alt="" />
                        </div>
                        <div className="flex flex-col gap-4 px-6 py-4">
                            <h3 className="text-xl font-bold w-full text-left uppercase">Évacuation des déchets ménagers et urbains</h3>
                            <p className="text-sm text-dark w-full text-left">Notre service d'évacuation utilise un système digital innovant pour le monitoring et la gestion efficace du circuit des déchets.</p>
                        </div>
                    </div>
                </div>
                {/* <GridContainerSm className="pb-4">
                    {
                        images.map((image, index) =>( 
                            <ActivityImageWrapper className="flex opacity-90" key={index}>
                                <img loading="lazy" src={image} className="" alt="" />
                            </ActivityImageWrapper>
                         ))
                    }
                </GridContainerSm> */}

            </SectionContainer>
        </section>
    )
}

export default ActivitiesSection