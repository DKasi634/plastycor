import { ApiProduct, IUser } from "@/api/types";
import { useState, useRef, useEffect } from "react";
import BaseButton from "../base-button/base-button.component";
import GenericInput from "../generic-input/generic-input.component";
import ImageUploadFormGroup from "../image-upload-input/image-upload-input.component";
import LoaderLayout from "../loader/loader-layout.component";
import { useNavigate } from "react-router-dom";
import { createOrUpdateProduct } from "@/utils/firebase/firestore.utils";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "@/store/toast/toast.actions";
import { getSingleProductPath } from "@/utils/index.utils";
import { selectCategories } from "@/store/categories/categories.selector";


type PostFormProps = {
    className?: string,
    initialProduct: ApiProduct,
    currentUser: IUser,
}

const PostProductForm = ({ className = "", initialProduct }: PostFormProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const [thisProduct, setThisProduct] = useState<ApiProduct | null>(initialProduct);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canSubmitPost, setCanSubmitPost] = useState(false);
    const [error, setError] = useState("");
    const imagesUploadRef = useRef<{ uploadImages: () => Promise<string[]>, hasSelectedImages: () => boolean }>(null);

    const categories = useSelector(selectCategories);

    const setName = (e: React.ChangeEvent<HTMLInputElement>) => { setThisProduct(prev => ({ ...prev, name: e.target.value } as ApiProduct)) }
    const setPrice = (e: React.ChangeEvent<HTMLInputElement>) => { setThisProduct(prev => ({ ...prev, price: e.target.value as unknown as number } as ApiProduct)) }
    const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setThisProduct(prev => ({ ...prev, description: e.target.value } as ApiProduct)) }
    const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => { setThisProduct(prev => ({ ...prev, categoryId: e.target.value } as ApiProduct)); }

    useEffect(()=>{
        if(error){
            dispatch(setErrorToast(error));
            setIsSubmitting(false)
        };
    }, [error])
    useEffect(() => {
        const createProduct = async () => {
            if (!thisProduct) { return };
            // console.log("\nThe product to create or update : ", thisProduct);
            setIsSubmitting(false);
            const createdProduct = await createOrUpdateProduct(thisProduct);
            // console.log("The created or updated product : ", createdProduct)
            setIsSubmitting(false);
            if (!createdProduct) { dispatch(setErrorToast("Failed to create product")) }
            else {
                const createdProductPath = getSingleProductPath(createdProduct.id);
                navigate(createdProductPath)
            }
        }
        if (canSubmitPost) { createProduct() }
    }, [canSubmitPost]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting || !thisProduct) { return }
        setIsSubmitting(true)
        try {
            if (!thisProduct.categoryId) { setError("Please choose a category"); return }
            if (thisProduct.name.trim().length < 3) { setError("Posting name must have at least 3 characters"); return }
            if (!Number(thisProduct.price)) { setError("Posting must have a price"); return }
            if (thisProduct.description.trim().length < 30) { setError("Description too short, must have at least 30 characters") }
            if (imagesUploadRef.current) {
                if (!imagesUploadRef.current.hasSelectedImages() &&!initialProduct.images.length) { setError("Choose at least one image, max 3"); return }
                const uploadedImagesUrls = await imagesUploadRef.current.uploadImages();
                if (!uploadedImagesUrls.length && !initialProduct.images.length) { setError("Failed to upload images. Check your network and try again"); return }
                setThisProduct(prev => ({ ...prev, images: [...prev?.images || [], ...uploadedImagesUrls], id:initialProduct.id || new Date().getTime().toString(), price:Number(thisProduct.price) } as ApiProduct));
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
                <GenericInput type="text" label="Nom du produit" value={thisProduct && thisProduct.name} name="product_name" onChange={setName} />
                <GenericInput type="number" label="Prix unitaire" value={thisProduct && thisProduct.price} name="product_price" onChange={setPrice} />

                <div className="flex flex-col gap-1 mt-1 w-full">
                    <label className="text-xs font-bold text-dark/80 w-full text-left pl-1" htmlFor="product_description">Description</label>
                    <textarea rows={3} className="block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm" value={thisProduct && thisProduct.description || ''} name="product_description" onChange={setDescription} />
                </div>

                <div className="flex flex-col gap-1 mt-1 w-full">
                    <label className="text-xs font-bold text-dark/80 w-full text-left pl-1" htmlFor="categories">Categorie</label>
                    <select name="categories" className="block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm" value={initialProduct.categoryId} onChange={(e) => setCategory(e)} >
                        {categories.filter(cat => !cat.disabled).map((cat, idx) => (<option key={idx} value={cat.categoryId} >{cat.categoryName}</option>))}
                    </select>
                </div>

                <ImageUploadFormGroup label='Chosir une image' initialImages={initialProduct.images} imagesLimit={1} folderPath='Product'
                    ref={imagesUploadRef} />
                <BaseButton submitType="submit" className="mt-6 ">Confirmer</BaseButton>
            </form>
            {isSubmitting && <LoaderLayout />}
        </>
    )
}


export default PostProductForm