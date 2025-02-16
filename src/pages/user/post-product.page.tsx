import { ApiProduct } from "@/api/types"
// import BaseButton from "@/components/base-button/base-button.component";
// import GenericInput from "@/components/generic-input/generic-input.component"
// import ImageUploadFormGroup from "@/components/image-upload-input/image-upload-input.component";
import PostProductForm from "@/components/post-product-form/post-product-form.component";
// import { categories } from "@/constants/data";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PostProductPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const authLoading = useSelector(selectAuthLoading);

    useEffect(() => {
        if (!authLoading && !currentUser) {
            navigate("/signin")
        }
    }, [authLoading, currentUser])

    const productInitialValues: ApiProduct = { name: "", id: (new Date().getTime().toString()), categoryId: "", ownerEmail: currentUser?.email || '', createdAt: "", images: [], description: "", price: 0, disabled: false };

    return (
        <div className="flex flex-col pb-[5rem]">
            <h3 className="text-3xl text-dark my-4">Poster un produit</h3>
            {
                currentUser && <PostProductForm currentUser={currentUser} initialProduct={productInitialValues}  />
            }

        </div>
    )
}

export default PostProductPage