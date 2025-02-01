import { TeamMember } from "@/constants/data"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { SlSocialLinkedin } from "react-icons/sl"
import { Link } from "react-router-dom"

interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
    member: TeamMember
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ className = "", member, ...rest }) => {
    return (
        <div className={`${className} flex flex-col items-start justify-center border border-dark-transparent rounded-md px-6 py-4 rounded-tl-none rounded-br-none gap-1 shadow-sm shadow-dark-transparent hover:shadow-md hover: cursor-pointer`} {...rest} >
            <div className="w-full rounded-md rounded-tl-none rounded-br-none overflow-hidden aspect-square p-4">
                <img src={member.picture} className="w-full h-full object-top object-cover" alt="" />
            </div>
            <h3 className="text-xl text-center font-semibold text-dark w-full">{member.name}</h3>
            <p className="text-sm text-center font-semibold text-dark w-full">{member.position}</p>
            <ul className="flex items-center justify-center gap-3 w-full my-2">
                <li className="p-3 rounded-full bg-dark-transparent text-dark cursor-pointer hover:text-green"><Link to={member.socials.whatsapp} className="text-xl"><FaWhatsapp /></Link></li>
                <li className="p-3 rounded-full bg-dark-transparent text-dark cursor-pointer hover:text-green"><Link to={member.socials.instagram} className="text-xl"><FaInstagram /></Link></li>
                <li className="p-3 rounded-full bg-dark-transparent text-dark cursor-pointer hover:text-green"><Link to={member.socials.linkedin} className="text-xl"><SlSocialLinkedin /></Link></li>
            </ul>
        </div>
    )
}

export default TeamMemberCard