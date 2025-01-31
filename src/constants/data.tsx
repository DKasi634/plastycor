import { ReactElement } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaRecycle, FaTree } from "react-icons/fa";
import { PiHandshake } from "react-icons/pi";
import { SiTarget } from "react-icons/si";
import { TbBulb } from "react-icons/tb";


export type PrincipleData = {
    title: string,
    content: string,
    icon: ReactElement
}

type TeamMemberSocials = {
    linkedin: string,
    instagram: string,
    whatsapp: string,
}

export type TeamMember = {
    name: string,
    position: string,
    picture: string,
    socials: TeamMemberSocials
}

export const teamMembers: TeamMember[] = [
    {
        name: "Élisabeth Kengo",
        position: "Directrice Générale",
        picture: "https://placehold.co/400x400/004aad/FFF?text=É.Kengo",
        socials: {
            linkedin: "https://linkedin.com/in/elise-kengo-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/elisabeth_kengo",
        }
    },
    {
        name: "Marc Makusu",
        position: "Ingénieur Process Recyclage",
        picture: "https://placehold.co/400x400/004aad/FFF?text=M.Makusu",
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/amina_upcycle_art",
        }
    },
    {
        name: "Amina Mukendi",
        position: "Cheffe de Création",
        picture: "https://placehold.co/400x400/004aad/FFF?text=A.Mukendi",
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/amina_upcycle_art",
        }
    },
    {
        name: "Thomas Lukasu",
        position: "Responsable Collecte",
        picture: "https://placehold.co/400x400/004aad/FFF?text=T.Lukasu",
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/amina_upcycle_art",
        }
    },
    {
        name: "Léa Sitona",
        position: "Designer Produit",
        picture: "https://placehold.co/400x400/004aad/FFF?text=L.Sitona",
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/amina_upcycle_art",
        }
    },
    {
        name: "Christian Akonkwa",
        position: "Chargé Partenariats",
        picture: "https://placehold.co/400x400/004aad/FFF?text=C.Akonkwa",
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
            whatsapp: "https://wa.me/+33123456789",
            instagram: "https://instagram.com/amina_upcycle_art",
        }
    }
];

export const corePrinciples: PrincipleData[] = [
    {
        title: "Mission",
        content: "Promouvoir le recyclage créatif et le développement durable à travers des solutions innovantes.",
        icon: <SiTarget />
    },
    {
        title: "Vision",
        content: "Créer une RDC plus propre où chaque déchet devient une opportunité de création et d'innovation.",
        icon: <TbBulb />
    },
    {
        title: "Valeurs",
        content: "Innovation, durabilité, collaboration et engagement communautaire.",
        icon: <PiHandshake />
    }
];


export type Achievement = {
    number: number;
    label: string;
    icon: JSX.Element;
  };
  
export  const achievements: Achievement[] = [
    {
      number: 5000,
      label: "Arbres plantés",
      icon: <FaTree  />,
    },
    {
      number: 150,
      label: "Communautés impactées",
      icon: <BsPeopleFill />,
    },
    {
      number: 100,
      label: "Tonnes de déchets recyclés",
      icon: <FaRecycle  />,
    },
  ];
  
  
  

