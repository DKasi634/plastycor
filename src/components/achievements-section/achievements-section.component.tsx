import { achievements } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"


const AchievementsSection = () => {
    return (
        <section className="flex flex-col py-4 ">
            <h3 className="text-3xl text-dark w-full text-center my-4 mb-[3rem]">Nos réalisations</h3>
            <div className="bg-green w-full py-[4rem]">
                <SectionContainer>
                    <GridContainerMd >
                        {
                            achievements.map((achievement, index) => (
                                <div className="flex flex-col items-center justify-center gap-3" key={index}>
                                    <span className="w-[5rem] h-[5rem] aspect-square bg-gray-transparent text-light rounded-full text-2xl flex items-center justify-center">{achievement.icon}</span>
                                    <h3 className="text-4xl w-full text-center text-light font-bold my-4">{achievement.number}+</h3>
                                    <p className="text-lg w-full text-center text-light">{achievement.label}</p>
                                </div>
                            ))
                        }

                    </GridContainerMd>
                </SectionContainer>
            </div>
        </section>
    )
}

export default AchievementsSection

