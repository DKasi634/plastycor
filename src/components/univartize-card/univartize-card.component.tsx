import { Product } from "@/constants/data";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

type UnivartizeCardProps = {
    product: Product,
    className?: string
}

const UnivartizeCard = ({ product, className = '' }: UnivartizeCardProps) => {
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
                <div className="flex items-center justify-start gap-4 mb-4">
                    <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                        <img loading="lazy" src={product.owner.image} className="object-cover object-center w-full h-full" alt="" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <span className="text-xs font-bold text-dark text-left">{product.owner.name}</span>
                        <span className="text-xs font-bold text-dark/80 text-left">{product.owner.organisation}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-start gap-3 text-xs font-bold text-dark ">
                        <div className="flex items-center justify-start gap-1"> <FaRegHeart /> <span>135</span> </div>
                        <div className="flex items-center justify-start gap-1"> <IoEyeOutline /> <span>135</span> </div>
                        
                    </div>
                    <div className="flex items-center justify-start text-xs font-bold text-dark gap-1">
                        <span><CiLocationOn /></span> <span>{product.owner.location.city}, {product.owner.location.country}</span> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnivartizeCard