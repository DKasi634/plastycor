
import { Card } from "../cards-carousel/cards-carousel.styles"
import BaseButton, { buttonType } from "../base-button/base-button.component"
import { CiLocationOn } from "@/assets"
import GenericImage from "../generic-image/generic-image.component"
import { IUser } from "@/api/types"




type NetworkCardProps = {
    className?: string,
    member: IUser
}

const NetworkCard = ({ className = "", member }: NetworkCardProps) => {
    return (
        <Card className={`${className} flex flex-col !p-0 overflow-hidden cursor-pointer hover:scale-[1.01]`}>

            <div className="relative w-full bg-gradient-to-r from-green via-green-secondary to-green/40 min-h-[8rem] mb-10">
                <div className="absolute bottom-4 translate-y-1/2 translate-x-6 !w-fit !h-[6rem] aspect-square overflow-hidden rounded-full border-[0.2rem] border-light bg-red-400">
                    <GenericImage src={member.profilePicture} alt={member.firstName} className="h-full aspect-square object-cover object-center" />
                </div>
            </div>

            <div className="flex flex-col gap-1 p-4 h-full ">
                <h3 className="text-xl font-bold w-full text-left text-dark">{member.firstName} {member.lastName}</h3>
                <p className="text-xs font-extrabold text-dark/60 w-full text-left">{member.organisation}</p>
                <div className="text-xs flex items-end gap-1 justify-start font-bold text-dark/80 w-full text-left "> <span><CiLocationOn className="text-lg text-dark" /></span> {member.location?.city}, {member.location?.country}</div>
                <p className="text-sm font-normal w-full text-left "> {member.bio}</p>
                <div className="flex items-center justify-start py-6 gap-x-4 gap-y-2 flex-wrap">
                    {member.tags && member.tags.map((tag, index) =>
                        (<span key={index} className="text-xs font-bold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent min-w-fit">{tag}</span>)
                    )
                    }
                </div>
                <div className="flex items-center justify-start mt-auto ">
                    <BaseButton href={`tel:+${member.phoneNumber.replace('+', '')}`} type={buttonType.clear} className="hover:bg-amber-400 hover:!border-amber-400" rounded={false}>Contacter</BaseButton>
                </div>
            </div>

        </Card>
    )
}

export default NetworkCard