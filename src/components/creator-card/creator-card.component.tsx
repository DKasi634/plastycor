
import { Card } from "../cards-carousel/cards-carousel.styles"
import BaseButton, { buttonType } from "../base-button/base-button.component"
import { Creator } from "@/types"
import { CiLocationOn } from "@/assets"
import GenericImage from "../generic-image/generic-image.component"




type CreatorCardProps = {
    className?: string,
    creator: Creator
}

const CreatorCard = ({ className = "", creator }: CreatorCardProps) => {
    return (
        <Card className={`${className} flex flex-col !p-0 overflow-hidden cursor-pointer hover:scale-[1.01]`}>

            <div className="relative w-full bg-gradient-to-r from-green via-green-secondary to-green/40 min-h-[8rem] mb-10">
                <div className="absolute bottom-4 translate-y-1/2 translate-x-6 !w-fit !h-[6rem] aspect-square overflow-hidden rounded-full border-[0.2rem] border-light bg-red-400">
                    <GenericImage src={creator.image} alt={creator.name} className="h-full aspect-square object-cover object-center" />
                </div>
            </div>

            <div className="flex flex-col gap-1 p-4 h-full ">
                <h3 className="text-xl font-bold w-full text-left text-dark">{creator.name}</h3>
                <p className="text-sm font-normal w-full text-left">{creator.organisation}</p>
                <div className="text-xs flex items-center gap-2 justify-start font-semibold text-dark/80 w-full text-left "> <span><CiLocationOn /></span> {creator.location.city}, {creator.location.country}</div>
                <p className="text-sm font-normal w-full text-left "> {creator.bio}</p>
                <div className="flex items-center justify-start py-6 gap-x-4 gap-y-2 flex-wrap">
                    {creator.skills.map((skill, index) =>
                        (<span key={index} className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent min-w-fit">{skill}</span>)
                    )
                    }
                </div>
                <div className="flex items-center justify-start mt-auto ">
                    <BaseButton href={`tel:+${creator.phoneNumber}`} type={buttonType.clear} className="hover:bg-amber-400 hover:!border-amber-400" rounded={false}>Contacter</BaseButton>
                </div>
            </div>

        </Card>
    )
}

export default CreatorCard