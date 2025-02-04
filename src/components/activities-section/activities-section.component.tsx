import { SectionContainer } from "@/styles/globals.styles"


import ActivitiesCarousel from "../cards-carousel/activities-card-carousel.component"
import { activities } from "@/constants/data"


const ActivitiesSection = () => {
    return (
        <section className="flex items-center justify-center gap-4 py-8" id="activities">
            <SectionContainer className="!overflow-hidden">
                <h3 className="text-3xl text-dark w-full text-center mt-[3rem] mb-2">Nos activités</h3>
                <ActivitiesCarousel activities={activities} />
            </SectionContainer>
        </section>
    )
}

export default ActivitiesSection