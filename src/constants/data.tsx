import { ReactElement } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaRecycle, FaTree } from "react-icons/fa";
import { PiHandshake } from "react-icons/pi";
import { SiTarget } from "react-icons/si";
import { TbBulb } from "react-icons/tb";
import ActivityImage1 from "@/assets/products/product-1.jpg"
import ActivityImage2 from "@/assets/products/product-2.jpg"
import ActivityImage3 from "@/assets/products/product-3.jpg"
import ActivityImage4 from "@/assets/products/product-4.jpg"
import ActivityImage5 from "@/assets/products/product-5.jpg"



import TeamMember1 from "@/assets/team/team--woman-1.jpg"
import TeamMember2 from "@/assets/team/team--woman-2.jpg"
import TeamMember3 from "@/assets/team/team--woman--3.jpg"
import TeamMember4 from "@/assets/team/team--man-4.jpg"



export type PrincipleData = {
    title: string,
    content: string,
    icon: ReactElement
}

type TeamMemberSocials = {
    linkedin: string,
}

export type TeamMember = {
    name: string,
    position: string,
    picture: string,
    socials: TeamMemberSocials
}

export const teamMembers: TeamMember[] = [
    {
        name: "Neuville KAHIMBA",
        position: "Responsable Artistique et Technique(Kinshasa)",
        picture: TeamMember4,
        socials: {
            linkedin: "https://linkedin.com/in/elise-kengo-recyclage",
        }
    },
    {
        name: "Médiatrice NSOKANO",
        position: "Responsable des opérations et partenariats(Bukavu)",
        picture: TeamMember1,
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
        }
    },
    {
        name: "Marie Baluku",
        position: "Responsable des opérations et partenariats (Lubumbashi)",
        picture: TeamMember2,
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
        }
    },
    {
        name: "Abonda ENKOTENA",
        position: "Responsable des opérations et partenariats(Bukavu)",
        picture: TeamMember3,
        socials: {
            linkedin: "https://linkedin.com/in/elise-dubois-recyclage",
        }
    },
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

export const achievements: Achievement[] = [
    {
        number: 5000,
        label: "Arbres plantés",
        icon: <FaTree />,
    },
    {
        number: 150,
        label: "Communautés impactées",
        icon: <BsPeopleFill />,
    },
    {
        number: 100,
        label: "Tonnes de déchets recyclés",
        icon: <FaRecycle />,
    },
];


export type Article = {
    image: string;
    title: string;
    description: string;
    published: Date;
    views: number;
};

export const articles: Article[] = [
    {
        image: ActivityImage1,
        title: "Le Voyage des Plastiques Recyclés",
        description: "Découvrez comment les déchets plastiques se transforment en matériaux réutilisables grâce à des processus de recyclage innovants.",
        published: new Date("2025-01-15"),
        views: 1320,
    },
    {
        image: ActivityImage2,
        title: "Créer un Vase à partir de Déchets Plastiques",
        description: "Apprenez à transformer des déchets plastiques en un magnifique vase ou une poterie durable, combinant artisanat et recyclage.",
        published: new Date("2025-01-20"),
        views: 1870,
    },
    {
        image: ActivityImage3,
        title: "Statistiques du Recyclage du Plastique : 2025",
        description: "Tendances et chiffres clés mettant en lumière les progrès du recyclage du plastique dans le monde.",
        published: new Date("2025-01-25"),
        views: 980,
    },
    {
        image: ActivityImage4,
        title: "Produits Innovants en Plastique Recyclé",
        description: "Explorez des produits uniques et durables créés à partir de matériaux plastiques recyclés.",
        published: new Date("2025-01-28"),
        views: 720,
    },
    {
        image: ActivityImage5,
        title: "Astuces pour le Recyclage à Domicile",
        description: "Des moyens simples mais efficaces de contribuer aux efforts de recyclage des plastiques depuis votre foyer.",
        published: new Date("2025-01-30"),
        views: 1450,
    },
];


export type routeType = {
    path:string,
    label:string,
    id:string
}

export const LandingPageRoutes:routeType[] =  [
    {
        path:"/",
        label:"Accueil",
        id:'home'
    },
    {
        path:"/#products",
        label:"Nos produits",
        id:'products'
    },
    {
        path:"/blog",
        label:"Blog",
        id:'blog'
    },
    {
        path:"/#contact",
        label:"Contactez-nous",
        id:'contact'
    },
    
]

type ProductOwner = {
    name:string,
    image:string
}

export type Product = {
    name: string;
    image: string;
    category:string,
    owner:ProductOwner,
    description: string;
    price: number;
}

export const products: Product[] = [
    {
      name: "Recycled Plastic Chair",
      image: ActivityImage1,
      category:"Mobilier",
      owner:{ name:"John Tshibangu", image:TeamMember1 },
      description: "Ergonomic outdoor chair made from 100% recycled plastic bottles. Weather-resistant and durable.",
      price: 89.99
    },
    {
      name: "Upcycled Art Sculpture",
      image: ActivityImage2,
      category:"Mobilier",
      owner:{ name:"John Tshibangu", image:TeamMember2 },
      description: "Unique wall art crafted from reclaimed plastic waste. Each piece is one-of-a-kind.",
      price: 149.99
    },
    {
      name: "Eco-Friendly Side Table",
      image: ActivityImage3,
      category:"Mobilier",
      owner:{ name:"John Tshibangu", image:TeamMember3 },
      description: "Modern side table made from recycled HDPE plastic. Lightweight yet sturdy.",
      price: 129.99
    },
    {
      name: "Recycled Plastic Lumber",
      image: ActivityImage4,
      category:"Mobilier",
      owner:{ name:"John Tshibangu", image:TeamMember4 },
      description: "Durable building material made from post-consumer plastic. Perfect for outdoor projects.",
      price: 24.99
    },
    {
      name: "Ocean Plastic Bird Feeder",
      image: ActivityImage5,
      category:"Mobilier",
      owner:{ name:"John Tshibangu", image:TeamMember3 },
      description: "Eco-friendly bird feeder made from collected ocean plastics. Helps support marine cleanup.",
      price: 39.99
    },
  ];



