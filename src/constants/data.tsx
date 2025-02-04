import { ReactElement } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaRecycle, FaTree } from "react-icons/fa";
import { PiHandshake } from "react-icons/pi";
import { SiTarget } from "react-icons/si";
import { TbBulb } from "react-icons/tb";
import { Activity, Creator } from "@/types";

import ProductImage1 from "@/assets/products-min/product-1.jpg"
import ProductImage2 from "@/assets/products-min/product-2.jpg"
import ProductImage3 from "@/assets/products-min/product-3.jpg"
import ProductImage4 from "@/assets/products-min/product-4.jpg"
import ProductImage5 from "@/assets/products-min/product-5.jpg"

import ActivityImage1 from "@/assets/activities/activity-1.jpg"
import ActivityImage2 from "@/assets/activities/activity-2.jpg"
import ActivityImage3 from "@/assets/activities/activity-3.jpg"



import TeamMember0 from "@/assets/team/team-ceo-resized.jpg"
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
        name: "Nicole MENEMENE",
        position: "CEO (Ashoka Fellow)",
        picture: TeamMember0,
        socials: {
            linkedin: "https://www.linkedin.com/in/nicole-menemene-80046612a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        }
    },
    {
        name: "Neuville KAHIMBA",
        position: "Responsable Artistique et Technique(Kinshasa)",
        picture: TeamMember4,
        socials: {
            linkedin: "",
        }
    },
    {
        name: "Médiatrice NSOKANO",
        position: "Responsable des opérations et partenariats(Bukavu)",
        picture: TeamMember1,
        socials: {
            linkedin: "",
        }
    },
    {
        name: "Marie Baluku",
        position: "Responsable des opérations et partenariats (Lubumbashi)",
        picture: TeamMember2,
        socials: {
            linkedin: "",
        }
    },
    {
        name: "Abonda ENKOTENA",
        position: "Responsable des opérations et partenariats(Bukavu)",
        picture: TeamMember3,
        socials: {
            linkedin: "",
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
        image: ProductImage1,
        title: "Le Voyage des Plastiques Recyclés",
        description: "Découvrez comment les déchets plastiques se transforment en matériaux réutilisables grâce à des processus de recyclage innovants.",
        published: new Date("2025-01-15"),
        views: 1320,
    },
    {
        image: ProductImage2,
        title: "Créer un Vase à partir de Déchets Plastiques",
        description: "Apprenez à transformer des déchets plastiques en un magnifique vase ou une poterie durable, combinant artisanat et recyclage.",
        published: new Date("2025-01-20"),
        views: 1870,
    },
    {
        image: ProductImage3,
        title: "Statistiques du Recyclage du Plastique : 2025",
        description: "Tendances et chiffres clés mettant en lumière les progrès du recyclage du plastique dans le monde.",
        published: new Date("2025-01-25"),
        views: 980,
    },
    {
        image: ProductImage4,
        title: "Produits Innovants en Plastique Recyclé",
        description: "Explorez des produits uniques et durables créés à partir de matériaux plastiques recyclés.",
        published: new Date("2025-01-28"),
        views: 720,
    },
    {
        image: ProductImage5,
        title: "Astuces pour le Recyclage à Domicile",
        description: "Des moyens simples mais efficaces de contribuer aux efforts de recyclage des plastiques depuis votre foyer.",
        published: new Date("2025-01-30"),
        views: 1450,
    },
];


export type routeType = {
    path: string,
    label: string,
    id: string
}

export const LandingPageRoutes: routeType[] = [
    {
        path: "/",
        label: "Accueil",
        id: 'home'
    },
    {
        path: "/activities",
        label: "Nos activités",
        id: 'activities'
    },
    {
        path: "/univartize",
        label: "Univartize",
        id: 'univartize'
    },
    {
        path: "/network",
        label: "Notre Reseau",
        id: 'reseau'
    },
    {
        path: "/shop",
        label: "Boutique",
        id: 'boutique'
    },
    {
        path: "/blog",
        label: "Blog",
        id: 'blog'
    },
    {
        path: "/contact",
        label: "Nous contacter",
        id: 'contact'
    },

]


export type Product = {
    id: string,
    name: string;
    image: string;
    category: string,
    owner: Creator,
    description: string;
    price: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: "Recycled Plastic Chair",
        image: ProductImage1,
        category: "Mobilier",
        owner: {
            name: "John Doe",
            image: TeamMember1,
            organisation: "Eco Innovators",
            location: { city: "London", country: "UK" },
            bio: "Sustainability advocate and expert in environmental policy.",
            skills: ["Policy Development", "Public Speaking", "Research"],
            phoneNumber: "+44 123 456 789"
        },
        description: "Ergonomic outdoor chair made from 100% recycled plastic bottles. Weather-resistant and durable.",
        price: 89.99
    },
    {
        id: '2',
        name: "Upcycled Art Sculpture",
        image: ProductImage2,
        category: "Mobilier",
        owner: {
            name: "Aminata Diallo",
            image: TeamMember3,
            organisation: "Clean Earth",
            location: { city: "Dakar", country: "Senegal" },
            bio: "Environmental activist focused on waste recovery and ocean conservation.",
            skills: ["Ocean Cleanup", "Waste Recovery", "Advocacy"],
            phoneNumber: "+221 33 123 456"
        },
        description: "Unique wall art crafted from reclaimed plastic waste. Each piece is one-of-a-kind.",
        price: 149.99
    },
    {
        id: '3',
        name: "Eco-Friendly Side Table",
        image: ProductImage3,
        category: "Mobilier",
        owner: {
            name: "John Doe",
            image: TeamMember1,
            organisation: "Eco Innovators",
            location: { city: "London", country: "UK" },
            bio: "Sustainability advocate and expert in environmental policy.",
            skills: ["Policy Development", "Public Speaking", "Research"],
            phoneNumber: "+44 123 456 789"
        },
        description: "Modern side table made from recycled HDPE plastic. Lightweight yet sturdy.",
        price: 129.99
    },
    {
        id: '4',
        name: "Recycled Plastic Lumber",
        image: ProductImage4,
        category: "Mobilier",
        owner: {
            name: "Aminata Diallo",
            image: TeamMember3,
            organisation: "Clean Earth",
            location: { city: "Dakar", country: "Senegal" },
            bio: "Environmental activist focused on waste recovery and ocean conservation.",
            skills: ["Ocean Cleanup", "Waste Recovery", "Advocacy"],
            phoneNumber: "+221 33 123 456"
        },
        description: "Durable building material made from post-consumer plastic. Perfect for outdoor projects.",
        price: 24.99
    },
    {
        id: '5',
        name: "Ocean Plastic Bird Feeder",
        image: ProductImage5,
        category: "Mobilier",
        owner: {
            name: "John Doe",
            image: TeamMember1,
            organisation: "Eco Innovators",
            location: { city: "London", country: "UK" },
            bio: "Sustainability advocate and expert in environmental policy.",
            skills: ["Policy Development", "Public Speaking", "Research"],
            phoneNumber: "+44 123 456 789"
        },
        description: "Eco-friendly bird feeder made from collected ocean plastics. Helps support marine cleanup.",
        price: 39.99
    },
];

export const activities: Activity[] = [
    {
        id: "1",
        title: "Recyclage des déchets plastiques",
        description: "Nous transformons les bouteilles plastiques en objets utiles et esthétiques, donnant une seconde vie aux déchets tout en créant de la valeur",
        image: ActivityImage1
    },
    {
        id: "2",
        title: "Formation en techniques durables de recyclage",
        description: "Nous formons les jeunes et les femmes aux techniques durables de recyclage, créant ainsi des opportunités d'emploi tout en protégeant l'environnement",
        image: ActivityImage2
    },
    {
        id: "3",
        title: "Évacuation des déchets ménagers et urbains",
        description: "Notre service d'évacuation utilise un système digital innovant pour le monitoring et la gestion efficace du circuit des déchets",
        image: ActivityImage3
    },
]


export const creators: Creator[] = [
    {
        name: "Nicole Menemene",
        image: TeamMember0,
        organisation: "Plastycor",
        location: { city: "Goma", country: "Democratic Republic of Congo" },
        bio: "Founder of Plastycor, working on innovative solutions for plastic waste management.",
        skills: ["Recycling", "Upcycling", "Training"],
        phoneNumber: "+243 123 456 789"
    },
    {
        name: "John Doe",
        image: TeamMember1,
        organisation: "Eco Innovators",
        location: { city: "London", country: "UK" },
        bio: "Sustainability advocate and expert in environmental policy.",
        skills: ["Policy Development", "Public Speaking", "Research"],
        phoneNumber: "+44 123 456 789"
    },
    {
        name: "Jane Smith",
        image: TeamMember2,
        organisation: "Green Solutions",
        location: { city: "Berlin", country: "Germany" },
        bio: "Specialist in upcycling projects and community engagement.",
        skills: ["Project Management", "Awareness Campaigns", "Upcycling"],
        phoneNumber: "+49 987 654 321"
    },
    {
        name: "Aminata Diallo",
        image: TeamMember3,
        organisation: "Clean Earth",
        location: { city: "Dakar", country: "Senegal" },
        bio: "Environmental activist focused on waste recovery and ocean conservation.",
        skills: ["Ocean Cleanup", "Waste Recovery", "Advocacy"],
        phoneNumber: "+221 33 123 456"
    },
    {
        name: "Carlos Rivera",
        image: TeamMember4,
        organisation: "ReciclaMás",
        location: { city: "Mexico City", country: "Mexico" },
        bio: "Dedicated to educating communities about sustainable waste practices.",
        skills: ["Education", "Recycling Techniques", "Community Outreach"],
        phoneNumber: "+52 55 987 654 321"
    }
];



