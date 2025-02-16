import { ApiProduct } from "@/api/types"
import LoaderLayout from "@/components/loader/loader-layout.component";
import PostProductForm from "@/components/post-product-form/post-product-form.component";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import { getProductById } from "@/utils/firebase/firestore.utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const EditProductPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const authLoading = useSelector(selectAuthLoading);

    const { productId } = useParams<{ productId: string }>(); // Extract productId from URL params
    const [product, setProduct] = useState<ApiProduct | null>(null);
    const [loading, setLoading] = useState(false);
    

    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const product: ApiProduct | null = await getProductById(id);
            if (!product) { throw new Error("Failed to load the product") }
            setProduct(product);
            
        } catch (err) { navigate("/not-found")
        } finally { setLoading(false);}
    };
    useEffect(() => {
        if(productId){
            fetchProduct(productId)
        }
    }, [productId])

    useEffect(() => {
        if (!authLoading && !currentUser) {
            navigate("/signin")
        }
    }, [authLoading, currentUser])


    return (
        <div className="flex flex-col pb-[5rem]">
            <h3 className="text-3xl text-dark my-4">Modifier un produit</h3>
            {
                (currentUser && product) && <PostProductForm currentUser={currentUser} initialProduct={product} />
            }
            {loading && <LoaderLayout />}
        </div>
    )
}

export default EditProductPage