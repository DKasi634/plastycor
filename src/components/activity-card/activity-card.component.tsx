// import { Article } from "@/constants/data"

import { Activity } from "@/types"
import BaseButton, { buttonType } from "../base-button/base-button.component"
import GenericImage from "../generic-image/generic-image.component"


type ArticleCardProps = {
    className?: string,
    activity: Activity
}

const ActivityCard = ({ className, activity: { image, title, description } }: ArticleCardProps) => {
    return (
        <div className={`${className} flex flex-col items-start justify-start p-[2px] rounded-lg border border-gray shadow-sm shadow-dark-transparent overflow-hidden pb-0` }>
            <div className="w-full h-[40%] mb-2 md:mb-4 rounded-lg overflow-hidden"> <GenericImage loading="lazy" src={image} alt="Activity" className="w-full h-full object-cover object-center" /> </div>

            <div className="flex flex-col items-center justify-start gap-3 px-4 py-2">
                <h3 className="text-lg font-semibold text-left w-full line-clamp-2 ">{title}</h3>
                <p className="text-sm font-normal text-left w-full line-clamp-3">{description}</p>
            </div>
            <div className="flex items-center justify-center w-full my-2 md:my-3"> <BaseButton type={buttonType.blue} className="!text-xs">En savoir plus... </BaseButton> </div>
        </div>
    )
}

export default ActivityCard