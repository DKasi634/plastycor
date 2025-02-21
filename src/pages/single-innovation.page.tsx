import { Innovation, IUser } from "@/api/types"
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import GenericImage from "@/components/generic-image/generic-image.component";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import { getFirestoreUserByEmail, getInnovationById } from "@/utils/firebase/firestore.utils";
import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFoundPage from "./errors/not-found.page";
import { CiEdit } from "react-icons/ci";
import { getFullDateFromIsostring } from "@/utils/index.utils";


const SingleInnovationPage = () => {


    const { innovationId } = useParams<{ innovationId: string }>(); // Extract innovationId from URL params
    const [thisInnovation, setThisInnovation] = useState<Innovation | null>(null);
    const [loading, setLoading] = useState(true);
    const [innovationPublisher, setInnovationPublisher] = useState<IUser | null>(null);
    const [innovationFound, setInnovationFound] = useState(true);


    const currentUser = useSelector(selectCurrentUser);
    const userLoading = useSelector(selectAuthLoading);


    // Call to fetch thisInnovation data
    const fetchInnovation = async (id: string) => {
        setLoading(true);
        try {
            const fetchedInnovation: Innovation | null = await getInnovationById(id);
            if (!fetchedInnovation) { throw new Error("Failed to load the content") }

            setThisInnovation(fetchedInnovation);
            const owner = await getFirestoreUserByEmail(fetchedInnovation.ownerEmail);
            setInnovationPublisher(owner);
        } catch (err) {
            setInnovationFound(false)
        } finally {
            setLoading(false);
        }
    };


    // useEffect(()=>{
    //     if(thisInnovation && !readBlogsIds.some(id => id === thisInnovation.id)){
    //         dispatch(readBlogStart(thisInnovation))
    //     }
    // }, [thisInnovation])

    useEffect(() => {
        if (innovationId) {
            fetchInnovation(innovationId);
        }
    }, [innovationId]);

    if (!innovationFound && !loading) {
        return <NotFoundPage />
    }

    return (
        <>
            {thisInnovation &&
                <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8`}>
                    <div className="bg-white p-6 max-w-3xl w-full px-12 mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 my-8 w-full text-center">{thisInnovation.name}</h1>
                        <div className="w-full h-64 shadow-md rounded-lg border border-gray overflow-hidden mb-8">

                            <GenericImage
                                src={thisInnovation.images[0]}
                                alt={thisInnovation.name}
                                className="object-cover object-center w-full h-full"
                            />
                        </div>

                        <p className="text-dark/80 text-sm font-semibold py-3 w-full text-center leading-7">{thisInnovation.description}</p>

                        <div className="flex items-center justify-start gap-4 mb-4 mt-2 w-full">
                            <div className="flex items-center justify-start gap-1 w-fit">
                                <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                                    <GenericImage loading="lazy" src={innovationPublisher?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                                </div>
                                <span className="text-xs font-semibold text-dark text-left">{innovationPublisher?.firstName} {innovationPublisher?.lastName}</span>
                            </div>
                            <span className="text-xs font-bold text-dark/80 text-left">{getFullDateFromIsostring(thisInnovation.createdAt)}</span>
                        </div>
                        {(currentUser && currentUser.email === innovationPublisher?.email ) &&
                            <BaseButton type={buttonType.light} className="!fixed !bottom-[4rem] !right-[3rem] !font-bold shadow-lg shadow-dark-transparent !border-gray" href={`/univartize/edit/${thisInnovation.id}`} > Edit <CiEdit className="text-xl ml-2" /></BaseButton>
                        }
                    </div>
                </div>
            }
            {
                (loading || userLoading) && <LoaderLayout />
            }
        </>
    );
}

export default SingleInnovationPage