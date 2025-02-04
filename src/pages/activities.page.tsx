import { activities } from "@/constants/data"
import { SectionContainer } from "@/styles/globals.styles"


const ActivitiesPage = () => {
    return (
        <div className="flex flex-col">
            <SectionContainer className="py-8">
                <h3 className="text-4xl font-bold text-dark w-full text-center my-[3rem]">Nos activités</h3>
                <p className="text-lg text-dark w-full text-center my-[2rem]">Découvrez nos différentes initiatives pour un avenir plus durable</p>

                <div className="flex flex-col gap-8 w-full py-4">
                    {
                        activities.map((activity, index) => {

                            if (!(index % 2)) {
                                return (
                                    <div id={activity.id} key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-start">
                                        <div className="px-8 w-full aspect-square max-h-[60svh] overflow-hidden rounded-sm">
                                            <img loading="lazy" src={activity.image} className="w-full h-full object-cover object-center" alt={activity.title} />
                                        </div>
                                        <div className="flex flex-col gap-4 px-6 py-4">
                                            <h3 className="text-xl font-bold w-full text-left uppercase"> {activity.title} </h3>
                                            <p className="text-sm text-dark w-full text-left"> {activity.description} </p>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div id={activity.id} key={index} className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 items-start justify-start">
                                        <div className="flex flex-col gap-4 px-6 py-4">
                                            <h3 className="text-xl font-bold w-full text-left uppercase"> {activity.title} </h3>
                                            <p className="text-sm text-dark w-full text-left"> {activity.description} </p>
                                        </div>
                                        <div className="px-8 w-full aspect-square max-h-[60svh] overflow-hidden rounded-sm">
                                            <img loading="lazy" src={activity.image} className="w-full h-full object-cover object-center" alt={activity.title} />
                                        </div>
                                    </div>
                                )
                            }
                        }
                        )
                    }
                </div>
            </SectionContainer>
        </div>
    )

}

export default ActivitiesPage

