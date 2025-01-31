import { achievements } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"


const AchievementsSection = () => {
  return (
    <section className="flex items-center justify-center gap-4 pb-8 pt-4 ">
        <SectionContainer>
            <h3 className="text-3xl text-dark w-full text-center my-4">Nos réalisations</h3>
            <GridContainerMd>
                {
                    achievements.map((achievement, index) =>( 
                        <div className="flex flex-col items-center justify-center gap-3" key={index}>
                            <span className="w-[5rem] h-[5rem] aspect-square bg-blue-transparent text-blue rounded-full text-2xl flex items-center justify-center">{achievement.icon}</span>
                            <h3 className="text-3xl w-full text-center text-blue font-bold my-4">{achievement.number}+</h3>
                            <p className="text-lg w-full text-center text-blue">{achievement.label}+</p>
                        </div>
                     ))
                }

            </GridContainerMd>
        </SectionContainer>
    </section>
  )
}

export default AchievementsSection

