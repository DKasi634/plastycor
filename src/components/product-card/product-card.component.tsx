import { categories } from "@/constants/data";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { LuShoppingCart } from "react-icons/lu";
import { ApiProduct, Category, IUser } from "@/api/types";
import { useEffect, useState } from "react";
import { getFirestoreUserByEmail } from "@/utils/firebase/firestore.utils";
import { useNavigate } from "react-router-dom";
 

type ProductCardProps = {
    className?: string;
    ownerView?: boolean
    product: ApiProduct;
}

const ProductCard = ({ product, className = '', ownerView = false }: ProductCardProps) => {

    const [productOwner, setProductOwner] = useState<IUser|null>(null);
    const [productCategory, setProductCategory] = useState<Category|null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(product){
            const category = categories.find(cat => cat.categoryId === product.categoryId);
            if(category){ setProductCategory(category)}
        }
    }, [product])

    useEffect(()=>{
        if(product){
            const getProductOwner = async () =>{
                const owner:IUser|null = await getFirestoreUserByEmail(product.ownerEmail);
                if(owner){ setProductOwner(owner) }
            };

            getProductOwner();
        }
    }, [product])

    const handleClick = () =>{
        if(!product){ return }
        navigate(`/product/${product.id}`)
    }
    

    return (
        <div className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-dark-transparent min-h-full border-gray-transparent border-[1px]  ${className}`}>
            <div className="aspect-square bg-gray-transparent rounded-t-lg overflow-hidden border-gray-transparent border-b-[1px]">
                <img loading="lazy"
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col justify-start gap-1">
                <span className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent">{productCategory?.categoryName}</span>
                <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm font-normal text-slate-900 mb-2 line-clamp-3 min-h-[4rem]">{product.description}</p>
                {!ownerView &&
                    <div className="flex items-center justify-start gap-4 mb-4">
                        <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                            <img loading="lazy" src={productOwner?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                        </div>
                        <span className="text-sm font-bold text-gray text-left">{productOwner?.firstName} {productOwner?.lastName}</span>
                    </div>
                }

                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-dark">
                        ${product.price.toFixed(2)}
                    </span>
                    {!ownerView &&
                        <BaseButton clickHandler={handleClick} rounded={false} type={buttonType.green} className="!px-3 !py-[0.4rem] !text-xs flex items-end justify-start gap-2">
                            <LuShoppingCart className="!text-xl" /> <span>Ajouter</span>
                        </BaseButton>
                    }
                </div>
                { ownerView && <div className="flex items-center gap-4 w-full justify-between">
                    <BaseButton clickHandler={handleClick} className="!px-3 !py-[0.2rem] !text-xs" rounded={false} type={buttonType.blue}>Voir</BaseButton>  
                
                <BaseButton href={`/me/edit-product/${product.id}`} className="!px-3 !py-[0.2rem] !text-xs" rounded={false} type={buttonType.green}>Modifier</BaseButton> </div> }
            </div>
        </div>
    );
}


export default ProductCard;