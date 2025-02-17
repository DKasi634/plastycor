import { ApiProduct, IUser } from "@/api/types";
import BaseButton from "@/components/base-button/base-button.component";
import GenericImage from "@/components/generic-image/generic-image.component";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import { setErrorToast } from "@/store/toast/toast.actions";
import { getFirestoreUserByEmail, getProductById } from "@/utils/firebase/firestore.utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


// Define the Props type for the component
interface ProductPageProps {
    className?: string
}

const SingleProductPage: React.FC<ProductPageProps> = ({ className = "" }) => {
    const { productId } = useParams<{ productId: string }>(); // Extract productId from URL params
    const [product, setProduct] = useState<ApiProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [productOwner, setProductOwner] = useState<IUser | null>(null);
    const [productFound, setProductFound] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const userLoading = useSelector(selectAuthLoading);

    const setErrorMessage = (error: string) => dispatch(setErrorToast(error));

    // Call to fetch product data
    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const product: ApiProduct | null = await getProductById(id);
            if (!product) { throw new Error("Failed to load the product") }
            setProduct(product);
            const owner = await getFirestoreUserByEmail(product?.ownerEmail);
            setProductOwner(owner)
        } catch (err) {
            setErrorMessage("Failed to load product details.");
            setProductFound(false)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);


    return (
        <>
            {product &&
                <div className={`${className} min-h-screen flex justify-center bg-gray-100 py-8`}>
                    <div className="bg-white p-6 max-w-3xl w-full px-12">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <GenericImage
                            src={product.images[0]}
                            alt={product.name}
                            className="w-64 h-64 object-cover mb-4 shadow-md rounded-lg border border-gray"
                        />
                        <div  className="flex items-center justify-start gap-2 ">
                           <span className="text-sm font-semibold">Prix : </span> <span className="text-lg font-bold">$ {product.price.toFixed(2)}</span> 
                        </div>
                        <p className="text-dark/80 text-xs font-semibold text-left py-2">{product.description}</p>

                        <div className="flex items-center justify-start gap-4 mb-4 mt-2">
                            <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                                <GenericImage loading="lazy" src={productOwner?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                            </div>
                            <span className="text-xs font-bold text-gray text-left">{productOwner?.firstName} {productOwner?.lastName}</span>
                        </div>
                        {(currentUser && productOwner) &&
                            <BaseButton href={`tel:${productOwner.phoneNumber}`} > Contact Owner</BaseButton>
                        }
                    </div>
                </div>
            }
            { (!productFound && !loading) &&
            <></>
            }
            {
                (loading || userLoading) && <LoaderLayout />
            }
        </>
    );
};

export default SingleProductPage;