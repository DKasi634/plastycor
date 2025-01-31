


import { ContactSectionWrapper, SectionContainer } from "@/styles/globals.styles";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import BaseButton from "../base-button/base-button.component";

export const ContactSection = () => {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <SectionContainer>
                <h2 className="text-3xl font-bold text-center mb-12">Contactez-Nous</h2>

                <ContactSectionWrapper className="grid grid-cols-1 lg:grid-cols-[30%_60%] xl:flex items-start justify-start gap-4 lg:gap-8">
                    <aside className="py-4 px-8 md:px-4 xl:w-full xl:max-w-[30rem] flex flex-col items-start justify-start gap-4">

                        <div className="flex flex-col items-start justify-start gap-2">
                            <div className="flex items-center justify-start gap-4"><IoLocationOutline className="text-xl text-blue-secondary" /> <h3 className="text-lg font-semibold">Notre Adresse</h3></div>
                            <p className="text-dark-variant text-xs">
                            20, avenue Mbaki, quartier Ndendere, Ville de Bukavu, Sud-Kivu, RDC
                            </p>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-2">
                            <div className="flex items-center justify-start gap-4"><MdOutlinePhoneEnabled className="text-xl text-blue-secondary" /> <h3 className="text-lg font-semibold">Téléphone</h3></div>
                            <p className="text-dark-variant text-xs">
                                +243850518034 &nbsp; &nbsp; 
                            </p>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-2">
                            <div className="flex items-center justify-start gap-4"><HiOutlineMail className="text-xl text-blue-secondary" /> <h3 className="text-lg font-semibold">Email</h3></div>
                            <p className="text-dark-variant text-xs font-semibold">
                             plastycor.rdc@gmail.com &nbsp; &nbsp; 
                            </p>
                        </div>

                    </aside>

                    <aside className="bg-white px-8 py-4 rounded-xl shadow-sm xl:w-full xl:max-w-[40rem]">
                        <form className="space-y-2">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-semibold">
                                    Nom Complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jean Dupont"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-semibold">
                                    Adresse Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-gray-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="jean@exemple.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2 text-sm font-semibold">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>

                            <BaseButton submitType="submit" className="!mt-4">  Envoyer le Message </BaseButton>
                        </form>
                    </aside>
                </ContactSectionWrapper>
            </SectionContainer>
        </section>
    );
};