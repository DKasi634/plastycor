import { Innovation, IUser } from "@/api/types";
import { useState, useRef, useEffect } from "react";
import BaseButton from "../base-button/base-button.component";
import GenericInput from "../generic-input/generic-input.component";
import ImageUploadFormGroup from "../image-upload-input/image-upload-input.component";
import LoaderLayout from "../loader/loader-layout.component";
import { useNavigate } from "react-router-dom";
import { createOrUpdateInnovation } from "@/utils/firebase/firestore.utils";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "@/store/toast/toast.actions";
import { selectCategories } from "@/store/categories/categories.selector";


type InnovationFormProps = {
    className?: string,
    initialInnovation: Innovation,
    currentUser: IUser,
}

const PostInnovationForm = ({ className = "", initialInnovation }: InnovationFormProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const [thisInnovation, setThisInnovation] = useState<Innovation | null>(initialInnovation);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canSubmitPost, setCanSubmitPost] = useState(false);
    const [error, setError] = useState("");
    const imagesUploadRef = useRef<{ uploadImages: () => Promise<string[]>, hasSelectedImages: () => boolean }>(null);

    const categories = useSelector(selectCategories);

    const setName = (e: React.ChangeEvent<HTMLInputElement>) => { setThisInnovation(prev => ({ ...prev, name: e.target.value } as Innovation)) }
    const setLocation = (e: React.ChangeEvent<HTMLInputElement>) => { setThisInnovation(prev => ({ ...prev, location: e.target.value } as Innovation)) }
    const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setThisInnovation(prev => ({ ...prev, description: e.target.value } as Innovation)) }
    const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => { setThisInnovation(prev => ({ ...prev, categoryId: e.target.value } as Innovation)); }

    useEffect(()=>{
        if(error){
            dispatch(setErrorToast(error));
            setIsSubmitting(false)
        };
    }, [error])
    useEffect(() => {
        const createInnovation = async () => {
            if (!thisInnovation) { setIsSubmitting(false); return };
            // console.log("\nThe innovation to create or update : ", thisInnovation);
            setIsSubmitting(true);
            const createdInnovation = await createOrUpdateInnovation(thisInnovation);
            // console.log("The created or updated innovation : ", createdInnovation)
            setIsSubmitting(false);
            if (!createdInnovation) { dispatch(setErrorToast("Oops ! Quelque chose s'est mal passé")) }
            else {
                
                navigate(`/univartize/${thisInnovation.id}`)
            }
        }
        if (canSubmitPost) { createInnovation() }
    }, [canSubmitPost]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting || !thisInnovation) { return }
        setIsSubmitting(true)

        try {
            // console.log("\nStarted submit with innovation : ", thisInnovation);
            if (!thisInnovation.categoryId) { setError("Please choose a category"); throw new Error("Category") }
            if (thisInnovation.name.trim().length < 3) { setError("Posting name must have at least 3 characters"); throw new Error("Name ") }
            if (!thisInnovation.location) { setError("Posting must have a location"); throw new Error("location") }
            if (thisInnovation.description.trim().length < 30) { setError("Description too short, must have at least 30 characters"); throw new Error("Description") }
            if (imagesUploadRef.current) {
                if (!imagesUploadRef.current.hasSelectedImages() &&!initialInnovation.images.length) { setError("Choose at least one image, max 3"); throw new Error("Images") }
                const uploadedImagesUrls = await imagesUploadRef.current.uploadImages();
                if (!uploadedImagesUrls.length && !initialInnovation.images.length) { setError("Failed to upload images. Check your network and try again"); throw new Error("Upload !") }
                setThisInnovation(prev => ({ ...prev, images: [...prev?.images || [], ...uploadedImagesUrls], id:initialInnovation.id || new Date().getTime().toString(), name:thisInnovation.name.trim(), description:thisInnovation.description.trim(), createdAt:new Date().toISOString()} as Innovation));
                setCanSubmitPost(true);
            }
        } catch (error) {
            // console.log("\nEncountered an error : ", error)
            setIsSubmitting(false);
        }

    }


    return (
        <>
            <form className={`${className} flex flex-col gap-2 w-full max-w-[32rem]`} onSubmit={handleFormSubmit}>
                <GenericInput type="text" label="Nom de la solution" value={thisInnovation && thisInnovation.name} name="product_name" onChange={setName} />
                <div className="flex flex-col gap-1 mt-1 w-full">
                    <label className="text-xs font-bold text-dark/80 w-full text-left pl-1" htmlFor="post_description">Description</label>
                    <textarea rows={3} className="block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm" value={thisInnovation && thisInnovation.description || ''} name="post_description" onChange={setDescription} />
                </div>
                <GenericInput type="text" label="Locatisation du produit, veuillez entre quelque chose come 'Goma, RDC' avec la ville et le pays " value={thisInnovation && thisInnovation.location} name="post_location" onChange={setLocation} />


                <div className="flex flex-col gap-1 mt-1 w-full">
                    <label className="text-xs font-bold text-dark/80 w-full text-left pl-1" htmlFor="categories">Categorie</label>
                    <select name="categories" className="block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm" value={(thisInnovation &&thisInnovation.categoryId) ||''} onChange={(e) => setCategory(e)}>
                        <option value="" disabled>Choisir ici</option>
                        {categories.filter(cat => !cat.disabled).map((cat, idx) => (<option key={idx} value={cat.categoryId} >{cat.categoryName}</option>))}
                    </select>
                </div>

                <ImageUploadFormGroup label='Chosir une image' initialImages={initialInnovation.images} imagesLimit={1} folderPath='Univartize'
                    ref={imagesUploadRef} />
                <BaseButton submitType="submit" className="mt-6 ">Confirmer</BaseButton>
            </form>
            {isSubmitting && <LoaderLayout />}
        </>
    )
}


export default PostInnovationForm