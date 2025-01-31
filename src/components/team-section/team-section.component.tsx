import { teamMembers } from "@/constants/data"
import { GridContainerMd, SectionContainer } from "@/styles/globals.styles"
import TeamMemberCard from "../team-member-card/team-member-card.component"


const TeamSection = () => {
  return (
    <section className="pt-4 pb-12">
        <SectionContainer>
        <h3 className="text-3xl text-center font-semibold my-12">Notre équipe</h3>
            <GridContainerMd>
                {
                    teamMembers.map((member, index) => (<TeamMemberCard key={index} member={member} />))
                }
            </GridContainerMd>
        </SectionContainer>
    </section>
  )
}

export default TeamSection


