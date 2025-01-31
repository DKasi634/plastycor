import { useEffect, useState } from 'react';
import { ContactSectionWrapper, SectionContainer } from "@/styles/globals.styles";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import BaseButton from "../base-button/base-button.component";
import axios from "axios";
import LoaderLayout from '../loader/loader-layout.component';

export const ContactSection = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const initialFormData = {
        name: '',
        email: '',
        message: ''
    }

    useEffect(()=>{
        if(toastMessage){
            alert(toastMessage);
            const timer = setTimeout(()=>{
                setToastMessage("")
            }, 3000)
            return ()=> clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(()=>{
            console.log("Is submitting : ", isSubmitting)
        
    }, [isSubmitting])

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        if(isSubmitting){return}
        setIsSubmitting(true)

        try {
            await axios.post("/.netlify/functions/send-email", formData);
            setToastMessage("Message envoyé avec succès!");
            setFormData(initialFormData); // Reset form
        } catch (error) {
            // console.error("Error : ", error);
            setToastMessage("Erreur lors de l'envoi du message");
        }
        finally{
            setIsSubmitting(false)
        }
    };

    return (
        <section className="py-16 px-4 bg-gray-50" id='contact'>
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
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-semibold">
                                    Nom Complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
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
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>

                            <BaseButton submitType="submit" className={`!mt-4 ${isSubmitting && '!cursor-not-allowed !bg-blue-secondary'}`}>
                                Envoyer le Message
                            </BaseButton>
                        </form>
                    </aside>
                </ContactSectionWrapper>
            </SectionContainer>
            {isSubmitting && <LoaderLayout /> }
        </section>
    );
};