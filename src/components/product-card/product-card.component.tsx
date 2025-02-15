import { Product } from "@/constants/data";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { LuShoppingCart } from "react-icons/lu";


type ProductCardProps = {
    className?: string;
    ownerView?: boolean
    product: Product;
    onAddToCart?: () => void;
}

const ProductCard = ({ product, className = '', ownerView = false, onAddToCart }: ProductCardProps) => {
    return (
        <div className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-dark-transparent p-[2px] min-h-full  ${className}`}>
            <div className="aspect-square bg-gray-transparent rounded-t-lg overflow-hidden border-gray-transparent border-[1px]">
                <img loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col justify-start gap-1">
                <span className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent">{product.category}</span>
                <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm font-normal text-slate-900 mb-2 line-clamp-3 min-h-[4rem]">{product.description}</p>
                {!ownerView &&
                    <div className="flex items-center justify-start gap-4 mb-4">
                        <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                            <img loading="lazy" src={product.owner.image} className="object-cover object-center w-full h-full" alt="" />
                        </div>
                        <span className="text-sm font-bold text-gray text-left">{product.owner.name}</span>
                    </div>
                }

                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-dark">
                        ${product.price.toFixed(2)}
                    </span>
                    {!ownerView &&
                        <BaseButton clickHandler={onAddToCart} rounded={false} type={buttonType.green} className="!px-3 !py-[0.4rem] !text-xs flex items-end justify-start gap-2">
                            <LuShoppingCart className="!text-xl" /> <span>Ajouter</span>
                        </BaseButton>
                    }
                </div>
            </div>
        </div>
    );
}


export default ProductCard;