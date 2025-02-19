import { ApiProduct, Category, IUser } from "@/api/types";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import GenericImage from "../generic-image/generic-image.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { disableFirestoreProduct, enableFirestoreProduct, getFirestoreUserByEmail } from "@/utils/firebase/firestore.utils";
import { selectCategories } from "@/store/categories/categories.selector";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import LoaderItem from "../loader/loader.component";

type AdminProductCardProps = {
    className?: string;
    product: ApiProduct;
}


const AdminProductCard = ({ className = "", product }: AdminProductCardProps) => {

    const navigate = useNavigate();
    const [productOwner, setProductOwner] = useState<IUser | null>(null);
    const [productCategory, setProductCategory] = useState<Category | null>(null);
    const [thisProduct, setThisProduct] = useState<ApiProduct>(product);
    const [loading, setLoading] = useState(false);
    const categories = useSelector(selectCategories);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (product) {
            const category = categories.find(cat => cat.categoryId === thisProduct.categoryId);
            if (category) { setProductCategory(category) }
        }
    }, [product])

    useEffect(() => {
        if (product) {
            const getProductOwner = async () => {
                const owner: IUser | null = await getFirestoreUserByEmail(thisProduct.ownerEmail);
                if (owner) { setProductOwner(owner) }
            };

            getProductOwner();
        }
    }, [product])
    const handleClick = () => {
        if (!product) { return }
        navigate(`/product/${thisProduct.id}`)
    }

    const handleDisable = async () =>{
        if(!product){ return };
        setLoading(true);
        const disabledProduct = await disableFirestoreProduct(product);
        if(disabledProduct){setThisProduct(disabledProduct);}   
        setLoading(false);
    }

    const handleEnable = async () =>{
        if(!product){ return };
        setLoading(true)
        const enabledProduct = await enableFirestoreProduct(product);
        if(enabledProduct){setThisProduct(enabledProduct);}  
        setLoading(false) 
    }
    return (
        <div className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-dark-transparent min-h-full border-gray-transparent border-[1px]  ${className}`}>
            <>
                <div className="w-full max-h-[10rem] bg-gray-transparent rounded-t-lg overflow-hidden border-gray-transparent border-b-[1px]">
                <GenericImage loading="lazy"
                    src={thisProduct.images[0]}
                    alt={thisProduct.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col justify-start gap-1">
                <span className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent">{productCategory?.categoryName}</span>
                <h3 className="text-lg font-bold text-dark mb-2 line-clamp-1">{thisProduct.name}</h3>
                <p className="text-xs font-normal text-slate-900 mb-2 line-clamp-3 min-h-[4rem]">{thisProduct.description}</p>

                <div className="flex items-center justify-start gap-4 mb-4">
                    <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                        <GenericImage loading="lazy" src={productOwner?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                    </div>
                    <span className="text-sm font-bold text-gray text-left">{productOwner?.firstName} {productOwner?.lastName}</span>
                </div>


                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-dark">
                        ${thisProduct.price.toFixed(2)}
                    </span>

                </div>
                <div className="flex items-center gap-4 w-full justify-between">
                    <BaseButton clickHandler={handleClick} className="!px-3 !py-[0.2rem] !text-xs" rounded={false} type={buttonType.blue}>Voir</BaseButton>
                    {thisProduct.disabled ?
                        <BaseButton clickHandler={handleEnable} className="!px-3 !py-[0.2rem] !text-xs" rounded={false} type={buttonType.green}>Enable</BaseButton> :
                        <BaseButton clickHandler={handleDisable} className="!px-3 !py-[0.2rem] !text-xs" rounded={false} type={buttonType.clear}>Disable</BaseButton>
                    }</div>
            </div>
            </>
            {(!currentUser || loading) && <div className="absolute inset-0 bg-light/80 flex items-center justify-center"><LoaderItem className="!w-[2.5rem] !h-[2.5rem]"/></div>
            }
            
        </div>
    )
}

export default AdminProductCard