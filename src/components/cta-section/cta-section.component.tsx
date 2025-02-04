
import CtaImage from "@/assets/cta/cta.jpg";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { GoArrowUpRight } from "react-icons/go";

export const CTASection = ()=>{
    return (
      <section className="relative isolate min-h-[20svh] max-h-[80svh] sm:max-h-[60svh] py-4 overflow-hidden">
        {/* Fond flouté */}
        <div 
          className={`absolute inset-0 -z-10 bg-cover bg-center backdrop-blur-xl`}
          aria-hidden="true"
          style={{ backgroundImage: `url(${CtaImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
  
        {/* Contenu */}
        <div className="mx-auto max-w-2xl p-6 text-center sm:py-8 lg:px-8">
          <div className="relative rounded-xl bg-white/10 px-6 py-4 backdrop-blur-lg flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-light sm:text-xl">
              Prêt à Changer le Monde Avec Nous ?
            </h2>
            <p className="mx-auto my-4 max-w-xl text-sm text-gray-100 text-light">
              Chaque geste compte. Rejoignez notre communauté engagée ou découvrez comment nous transformons le plastique.
            </p>
            
            {/* Boutons CTA */}
            <div className=" flex flex-col items-center justify-center gap-6 sm:flex-row">
              
              <BaseButton type={buttonType.blue} href="#">Se connecter <GoArrowUpRight /> </BaseButton>
              <BaseButton type={buttonType.green} href="#">Voir nos produits <GoArrowUpRight /> </BaseButton>
            </div>
          </div>
        </div>
      </section>
    );
  }