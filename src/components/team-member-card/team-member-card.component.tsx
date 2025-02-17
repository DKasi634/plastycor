import { SlSocialLinkedin } from "@/assets"
import { TeamMember } from "@/constants/data"
import { Link } from "react-router-dom"
import GenericImage from "../generic-image/generic-image.component"

interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
    member: TeamMember
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ className = "", member, ...rest }) => {
    return (
        <div className={`${className} flex flex-col items-start justify-center border border-dark-transparent rounded-md px-6 py-4 gap-1 rounded-tl-none rounded-br-none shadow-sm shadow-dark-transparent hover:shadow-md hover: cursor-pointer`} {...rest} >
            <div className="w-full rounded-md rounded-tl-none rounded-br-none overflow-hidden aspect-square p-4">
                <GenericImage loading="lazy" src={member.picture} className="w-full h-full object-center object-cover" alt="" />
            </div>
            <div className="relative flex flex-col justify-center items-center w-full">

                <h3 className="text-xl text-center font-bold text-dark w-full">{member.name}</h3>
                <p className="text-sm text-center font-semibold text-dark w-full">{member.position}</p>
                <a href="http://" target="" rel="noopener noreferrer"></a>
                <Link to={member.socials.linkedin} rel="noopener noreferrer" className={`text-lg p-2 rounded-full bg-light text-blue hover:text-green border border-gray absolute -top-10 ${member.socials.linkedin.trim() === "" ? "cursor-not-allowed":"cursor-pointer"} `}><SlSocialLinkedin /></Link>
            </div>
        </div>
    )
}

export default TeamMemberCard