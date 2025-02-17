import { SectionContainer } from "@/styles/globals.styles"
import { Link, NavLink } from "react-router-dom"
import FooterLogoImage from "@/assets/logo/icon_footer.png"
import { FaFacebookF, FaInstagram, FaXTwitter } from "@/assets"



const Footer = () => {
    return (
        <div className="flex flex-col w-full bg-green/90 min-h-[40svh] lg:min-h-[10svh] py-4">
            <SectionContainer className="grid grid-cols-1 lg:flex flex-row justify-between items-start gap-[3rem] lg:gap-4 my-8 lg:max-w-[80rem]">
                <div className="flex flex-col items-start justify-start">
                    <Link to={"/"} className="h-[4rem] w-fit inline-block">
                        <img loading="lazy" src={FooterLogoImage} className="h-full object-cover object-center" alt="Logo" />
                    </Link>
                </div>
                <div className="flex flex-col gap-4 items-start justify-start">
                    <h3 className="text-sm font-semibold text-light text-left">Liens rapides</h3>
                    <ul className="flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center lg:justify-center lg:gap-6 text-light/80">
                        <li><NavLink to={"/"} className={ ' hover:text-light'}>Accueil</NavLink></li>
                        <li><NavLink to={"/#activities"} className={`hover:text-light`}>Nos activites</NavLink></li>
                        <li><NavLink to={"/#contact"} className={'hover:text-light'}>Nous contacter</NavLink></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4 items-start justify-center">
                    <h3 className="text-sm font-semibold text-light text-left">Suivez-nous</h3>
                    <ul className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-3 text-light">

                    <li className="flex items-center justify-center">
                            <Link to={"https://facebook.com"} rel="noopener noreferrer" className="w-[3rem] aspect-square rounded-full bg-dark-variant flex items-center justify-center hover:text-green-variant !transition-all"><FaFacebookF className="text-xl" /></Link>
                        </li>
                        <li className="flex items-center justify-center">
                            <Link to={"https://instagram.com"} rel="noopener noreferrer" className="w-[3rem] aspect-square rounded-full bg-dark-variant flex items-center justify-center hover:text-green-variant !transition-all"><FaInstagram className="text-xl" /></Link>
                        </li>
                        <li className="flex items-center justify-center">
                            <Link to={"https://x.com"} rel="noopener noreferrer" className="w-[3rem] aspect-square rounded-full bg-dark-variant flex items-center justify-center hover:text-green-variant !transition-all"><FaXTwitter className="text-xl" /></Link>
                        </li>
                        
                    </ul>
                </div>
            </SectionContainer>
            <p className="text-sm text-light text-center w-full pt-8 border-t border-light">&copy; {new Date().getFullYear()} Plastycor, Tous droits réservés</p>
        </div>
    )
}

export default Footer