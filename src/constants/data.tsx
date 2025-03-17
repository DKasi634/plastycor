import { ReactElement } from "react";
import image1 from "@/assets/hero-min/image-fundraising.jpg"
import image3 from "@/assets/hero-min/image-communication.jpg"
import image4 from "@/assets/hero-min/image-network.jpg"
import image5 from "@/assets/hero-min/hero-bins-street.jpg"
import { Activity, Creator, DashBoardRoute, MenuItem, Testimonial } from "@/types";
import { ActivityImage1, ActivityImage2, ActivityImage3, ActivityImage4, ActivityImage5, AiOutlineInbox, AiOutlineUnorderedList, AiOutlineUser, BsPeopleFill, FaRecycle, FaTrash, FiBarChart, FiUser, GiSwapBag, HiOutlineLightBulb, PiCityBold, ProductImage1, ProductImage2, ProductImage3, ProductImage4, ProductImage5, RxTimer, SiTarget, TbBulb, TeamMember0, TeamMember1, TeamMember2, TeamMember3, TeamMember4 } from "@/assets";

export type HeroBloc = {
    department:string, description:string, slogan:string, image:string
}

export const HeroBlocs:HeroBloc[] = [
    {
    department:"Gestion, Collecte des Fonds et partenariats",
    description:"Gérer efficacement les opérations, mobiliser des ressources financières stratégiques et établir des collaborations solides afin de maximiser l'impact et la durabilité des initiatives environnementales et sociales.",
    slogan:"Innovation, Croissance et Impact pour un avenir durable",
    image:image1
},
    {
    department:"Collecte, Surcyclage et Sensibilisation",
    description:"Rassembler efficacement les déchets, à les transformer en produits à forte valeur ajoutée et à sensibiliser les communautés à l'importance de la gestion durable des ressources pour un avenir plus respectueux de l’environnement",
    slogan:"Chaque déchet a une seconde chance",
        image:image5
},
    {
    department:"Place de marché, marketing et communication",
    description:"La promotion des produits et services issus de la valorisation des déchets, la création d'une plateforme de vente dynamique et le renforcement de la visibilité à travers des stratégies de communication innovantes.",
    slogan:"Réinventons le marché ensemble pour un avenir durable",
    image:image3
},
    {
    department:"Académie et réseau",
    description:"Former les communautés (femmes et jeunes) aux pratiques durables tout en renforçant un réseau d'acteurs engagés pour multiplier l'impact positif sur l'environnement et la société",
    slogan:"Apprendre, Innover, Valoriser, Partager",
    image:image4
},
]

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

export type Achievement = {
    number: number;
    label: string;
    icon: JSX.Element;
};


export type routeType = {
    path: string,
    label: string,
    id: string
}

export type Product = {
    id: string,
    name: string;
    image: string;
    category: string,
    owner: Creator,
    description: string;
    price: number;
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
        content: "Notre mission est de transformer la gestion des déchets en République Démocratique du Congo (RDC) et dans les villes africaines, en promeuvant des systèmes durables qui intègrent la technologie numérique et l'engagement communautaire. Nous visons à stimuler le développement économique des jeunes et des femmes par le biais de l'économie circulaire, tout en créant un environnement plus propre et plus sain pour tous.",
        icon: <SiTarget />
    },
    {
        title: "Vision",
        content: "Notre vision est de devenir le leader en gestion durable des déchets en Afrique, où chaque ville bénéficie de solutions innovantes et inclusives. Nous imaginons un avenir où les communautés sont autonomes, les jeunes et les femmes sont économiquement prospères grâce à l'économie circulaire, et où la protection de l'environnement est au cœur des préoccupations de chacun.",
        icon: <TbBulb />
    },
    // {
    //     title: "Valeurs",
    //     content: "Innovation, durabilité, collaboration et engagement communautaire.",
    //     icon: <PiHandshake />
    // }
];




export const achievements: Achievement[] = [
    {
        number: 510000,
        label: "Déchets plastiques valorisées (bouteilles, sachets, sacs, babouches)",
        icon: <FaTrash />,
    },
    {
        number: 1000,
        label: "Personnes formées",
        icon: <BsPeopleFill />,
    },
    {
        number: 450,
        label: "Tonnes des déchets urbains collectés",
        icon: <FaRecycle />,
    },
    {
        number: 9,
        label: "Ans d'engagement dans la protection de l'environnement",
        icon: <RxTimer />,
    },
    {
        number: 5,
        label: "Villes congolaises avec agents et collaborateurs en action",
        icon: <PiCityBold />,
    },
    {
        number: 30000,
        label: "Kg des déchets plastiques collectés",
        icon: <GiSwapBag />,
    },
];







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
        label: "Notre Réseau",
        id: 'reseau'
    },
    {
        path: "/shop",
        label: "Boutique",
        id: 'boutique'
    },
    {
        path: "/blogs",
        label: "Blog",
        id: 'blog'
    },
    {
        path: "/contact",
        label: "Nous contacter",
        id: 'contact'
    },

]




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
        description:
            "Nous transformons les bouteilles plastiques en objets utiles et esthétiques, donnant une seconde vie aux déchets tout en créant de la valeur. Grâce à nos processus innovants, nous contribuons à réduire significativement l'empreinte écologique des plastiques et encourageons une économie circulaire durable.",
        image: ActivityImage1,
    },
    {
        id: "2",
        title: "Formation en techniques durables de recyclage",
        description:
            "Nous formons les jeunes et les femmes aux techniques durables de recyclage, leur offrant des compétences pratiques et professionnelles pour réussir dans le domaine de l'économie verte. En créant des opportunités d'emploi tout en protégeant l'environnement, nous aidons nos communautés à prospérer tout en respectant notre planète.",
        image: ActivityImage4,
    },
    {
        id: "3",
        title: "Sensibilisation sur la gestion des déchets",
        description:
            "Nous organisons des campagnes éducatives pour sensibiliser les individus et les entreprises à l'importance de la bonne gestion des déchets. En enseignant des pratiques responsables telles que le tri sélectif, le compostage et le recyclage, nous encourageons une prise de conscience collective pour un avenir plus propre et plus sain.",
        image: ActivityImage2,
    },
    {
        id: "4",
        title: "Évacuation des déchets ménagers et lutte contre l'insalubrité",
        description:
            "Notre service d'évacuation des déchets ménagers utilise un système digital innovant pour optimiser le monitoring et la gestion du circuit des déchets. En garantissant une collecte et un traitement efficaces, nous contribuons à améliorer la salubrité publique et à préserver la qualité de vie dans nos communautés.",
        image: ActivityImage3,
    },
    {
        id: "5",
        title: "Accompagnement des startup écologiques",
        description:
            "Nous soutenons les startups écologiques en leur fournissant un accompagnement stratégique, des ressources techniques et un réseau de partenaires dédiés. En aidant ces entreprises innovantes à grandir, nous renforçons l'écosystème de l'économie circulaire et favorisons des solutions durables pour un futur plus vert.",
        image: ActivityImage5,
    },
];


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


export const productsTestimonials: Testimonial[] = [
    {
        name: "Nathalie KAYEMBE",
        content:
            "Les paniers fabriqués à partir de bouteilles plastiques recyclées sont non seulement beaux, mais aussi incroyablement durables. Merci pour votre engagement envers l'environnement !",
    },
    {
        name: "Jordan KIBASU",
        content:
            "Les décorations murales que j'ai achetées sont magnifiques et ajoutent une touche unique à ma maison. Je suis fier de soutenir une entreprise qui lutte contre la pollution plastique.",
    },
    {
        name: "Jeanne MUNYERENKANA",
        content:
            "Construire avec des bouteilles plastiques recyclées est une idée géniale ! Votre entreprise montre qu'il est possible de créer des structures solides tout en protégeant notre planète.",
    },
    {
        name: "Alice BASEME",
        content:
            "J'adore les produits que vous proposez. Ils sont non seulement écologiques, mais aussi très esthétiques. Continuez votre excellent travail !",
    },
    {
        name: "Modeste IMANI",
        content:
            "Acheter vos produits me donne l'impression de contribuer, à ma manière, à la lutte contre la pollution plastique. Merci pour votre dévouement et votre créativité.",
    },
];

export const trainingTestimonials: Testimonial[] = [
    {
        name: "Jackson KABAMBA",
        content:
            "Grâce à la formation, j'ai appris des techniques précieuses de recyclage des déchets plastiques. Je suis maintenant capable de créer des objets utiles tout en aidant à réduire la pollution.",
    },
    {
        name: "Yvan BAKOLO",
        content:
            "Votre formation m'a ouvert les yeux sur l'importance du recyclage. Je suis reconnaissant pour les compétences que j'ai acquises et je suis déterminé à faire ma part pour un monde meilleur.",
    },
    {
        name: "Daniel KIRUSHA",
        content:
            "Participer à votre programme de formation a été une expérience transformative. J'ai non seulement appris à recycler, mais aussi à sensibiliser ma communauté à l'importance de cette cause.",
    },
    {
        name: "Anasthasie MUSAVYO",
        content:
            "En tant que femme, j'ai trouvé votre formation incroyablement inspirante. Vous m'avez donné les outils nécessaires pour contribuer activement à la lutte contre la pollution plastique.",
    },
    {
        name: "Colette TSHEGERA",
        content:
            "Je suis tellement reconnaissante pour la formation que j'ai reçue. Elle m'a permis de développer de nouvelles compétences et de participer à un mouvement important pour la protection de notre environnement.",
    },
];





export enum ADMIN_ROUTE_PATHS {
    MANAGE_USERS='/me/manage-users',
    MANAGE_CATEGORIES="/me/manage-categories",
    MANAGE_PRODUCTS="/me/manage-products",
    MANAGE_INNOVATIONS="/me/manage-innovations",
}

export const userMenuItems:MenuItem[] = [
    { label: "Profil", icon: <FiUser />, path:"profile", restricted:false},
    { label: "Innovations", icon: <HiOutlineLightBulb />, path:"innovations", restricted:false },
    { label: "Admin", icon: <FiBarChart />, path:"admin", restricted:true },
];

export const adminDashboardRoutes: DashBoardRoute[] = [
    { label: "Gérer les utilisateurs", path: ADMIN_ROUTE_PATHS.MANAGE_USERS, icon: <AiOutlineUser />, description: "Gérez les profils et les permissions des utilisateurs sans effort." },
    { label: "Gérer les catégories", path: ADMIN_ROUTE_PATHS.MANAGE_CATEGORIES, icon: <AiOutlineUnorderedList />, description: "Mettez à jour les catégories de produits d'un simple clic." },
    { label: "Gérer les produits", path: ADMIN_ROUTE_PATHS.MANAGE_PRODUCTS, icon: <AiOutlineInbox />, description: "Gérez les produits en temps réel." },
    { label: "Gérer les innovations", path: ADMIN_ROUTE_PATHS.MANAGE_INNOVATIONS, icon: <HiOutlineLightBulb />, description: "Gérez les innovations ici." }
];

