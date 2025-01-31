import { SectionContainer } from "@/styles/globals.styles"
import { Link, NavLink } from "react-router-dom"
import FooterLogoImage from "@/assets/logo/icon_footer.png"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"


const Footer = () => {
    return (
        <div className="flex flex-col w-full bg-slate-800 min-h-[40svh] py-4">
            <SectionContainer className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-row justify-between items-start gap-[3rem] md:gap-4 py-8">
                <div className="flex flex-col items-start justify-start">
                    <Link to={"/"} className="h-[4rem] w-fit inline-block">
                        <img src={FooterLogoImage} className="h-full object-cover object-center" alt="Logo" />
                    </Link>
                </div>
                <div className="flex flex-col gap-4 items-start justify-start">
                    <h3 className="text-sm font-semibold text-light text-left">Liens rapides</h3>
                    <ul className="flex flex-col items-start justify-start gap-2 text-light">
                        <li><NavLink to={"/"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Accueil</NavLink></li>
                        <li><NavLink to={"/activites"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Nos activites</NavLink></li>
                        <li><NavLink to={"/contact"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Contactez-nous</NavLink></li>
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
            <p className="text-sm text-light text-center w-full py-4 pt-8 border-t border-light">&copy; {new Date().getFullYear()} Plastycor, Tous droits réservés</p>
        </div>
    )
}

export default Footer