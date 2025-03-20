import { useEffect, useState } from 'react';
import { ContactSectionWrapper, SectionContainer } from "@/styles/globals.styles";

import BaseButton from "../base-button/base-button.component";
import axios from "axios";
import LoaderLayout from '../loader/loader-layout.component';
import { clearToast, setErrorToast, setSuccessToast, ToastMessage } from '@/store/toast/toast.actions';
import { useDispatch } from 'react-redux';
import { HiOutlineMail, IoLocationOutline, MdOutlinePhoneEnabled } from '@/assets';
import GenericInput from '../generic-input/generic-input.component';

export const ContactSection = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const [toastMessage, setToastMessage] = useState<ToastMessage|null>(null);
    const initialFormData = {
        name: '',
        email: '',
        message: ''
    }

    const [formData, setFormData] = useState(initialFormData);
    useEffect(() => {
        if (toastMessage) {
            dispatch(toastMessage.type === "error"? setErrorToast(toastMessage.message):setSuccessToast(toastMessage.message))
            const timer = setTimeout(() => {
                setToastMessage(null)
                dispatch(clearToast())
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!formData.name || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        if (isSubmitting) { return }
        setIsSubmitting(true)

        try {
            await axios.post("/.netlify/functions/send-contact-email", formData);
            setToastMessage({message:"Message envoyé avec succès!", type:"success"});
            setFormData(initialFormData); // Reset form
        } catch (error) {
            // console.error("Error : ", error);
            setToastMessage({message:"Erreur lors de l'envoi du message", type:"error"});
        }
        finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className="py-16 px-4 bg-gray-50" id='contact'>
            <SectionContainer>
                <h3 className="text-4xl font-bold text-center my-[2rem]">Nous Contacter</h3>
                <p className="text-lg w-full text-center mb-[1rem]">Une question ? N'hésitez pas à nous contacter</p>

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

                        <div className="flex flex-col items-start justify-start gap-2 ">
                            <div className="flex items-center justify-start gap-4"><HiOutlineMail className="text-xl text-blue-secondary" /> <h3 className="text-lg font-semibold">Email</h3></div>
                            <p className="text-dark-variant text-xs font-semibold">
                            info@plastycor.org &nbsp; &nbsp;
                            </p>
                        </div>
                    </aside>
                    <aside className="bg-white px-8 py-4 rounded-xl shadow-sm xl:w-full xl:max-w-[40rem]">
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div>
                                
                                <GenericInput
                                label='Nom Complet'
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jordan Kibasu"
                                />
                            </div>

                            <div>
                                <GenericInput
                                    type="email"
                                    label='Adresse Email'
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
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
                                    className="w-full px-4 py-3 bg-gray-transparent rounded-lg text-sm"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>

                            <BaseButton submitType="submit" className={`!mt-4 ${isSubmitting && '!cursor-not-allowed !bg-blue-secondary'}`}>
                                Envoyer le Message
                            </BaseButton>
                        </form>
                        <div className="w-full mt-8">
                            <iframe  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2252.2177311758155!2d28.858240031269876!3d-2.501837160913621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1snderere%20Bukavu%20Drc!5e0!3m2!1sfr!2sug!4v1738707734403!5m2!1sfr!2sug" width="600" height="400" className='border-none w-full' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </aside>
                </ContactSectionWrapper>

            </SectionContainer>
            {isSubmitting && <LoaderLayout />}
        </section>
    );
};