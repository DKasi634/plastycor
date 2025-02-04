import { ContactSection } from "@/components/contacts-section/contacts-section.component"
import { SectionContainer } from "@/styles/globals.styles"


const ContactPage = () => {
  return (
    <div className="flex flex-col">
      <SectionContainer>
        <ContactSection />
      </SectionContainer>
    </div>
  )
}

export default ContactPage