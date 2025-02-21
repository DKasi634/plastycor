import { CiLocationOn, FaRegHeart, IoEyeOutline } from "@/assets";

import GenericImage from "../generic-image/generic-image.component";
import { Category, Innovation, IUser } from "@/api/types";
import { getFirestoreUserByEmail } from "@/utils/firebase/firestore.utils";
import { selectCategories } from "@/store/categories/categories.selector";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseButton from "../base-button/base-button.component";


type UnivartizeCardProps = {
    innovation: Innovation,
    ownerView?:boolean,
    className?: string
}

const UnivartizeCard = ({ innovation, className = '', ownerView=false}: UnivartizeCardProps) => {

    const [innovationOwner, setInnovationOwner] = useState<IUser|null>(null);
    const [innovationCategory, setInnovationCategory] = useState<Category|null>(null);
    const categories = useSelector(selectCategories);

    const navigate = useNavigate();

    useEffect(()=>{
        if(innovation){
            const category = categories.find(cat => cat.categoryId === innovation.categoryId);
            if(category){ setInnovationCategory(category)}
        }
    }, [innovation])

    useEffect(()=>{
        if(innovation){
            const getInnovationOwner = async () =>{
                const owner:IUser|null = await getFirestoreUserByEmail(innovation.ownerEmail);
                if(owner){ setInnovationOwner(owner) }
            };

            getInnovationOwner();
        }
    }, [innovation])

    const handleClick = () =>{
        if(!innovation){ return }
        navigate(`/univartize/${innovation.id}`)
    }
    

    return (
        <div className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-dark-transparent p-[2px] min-h-full  ${className}`}
        onClick={()=>{ if(!ownerView){ handleClick()} }}>
            <div className="aspect-square bg-gray-transparent rounded-t-lg overflow-hidden border-gray-transparent border-[1px]">
                <GenericImage loading="lazy"
                    src={innovation.images[0]}
                    alt={innovation.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col justify-start gap-1">
                <span className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent">{innovationCategory?.categoryName}</span>
                <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{innovation.name}</h3>
                <p className="text-sm font-normal text-slate-900 mb-2 line-clamp-3 min-h-[4rem]">{innovation.description}</p>
                <div className="flex items-center justify-start gap-4 mb-4">
                    <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                        <GenericImage loading="lazy" src={innovationOwner?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <span className="text-xs font-bold text-dark text-left">{innovationOwner?.firstName} {innovationOwner?.lastName}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-start gap-3 text-xs font-bold text-dark ">
                        <div className="flex items-center justify-start gap-1"> <FaRegHeart /> <span>{innovation.likes}</span> </div>
                        <div className="flex items-center justify-start gap-1"> <IoEyeOutline /> <span>{innovation.views}</span> </div>
                        
                    </div>
                    <div className="flex items-center justify-start text-xs font-bold text-dark gap-1">
                        <span><CiLocationOn /></span> <span>{innovation.location}</span> 
                    </div>
                </div>
                {ownerView && <div className="flex items-center justify-between p-4 w-full"> 
                    <BaseButton className="!px-3 !py-[0.3rem] !text-xs" clickHandler={handleClick}> Voir </BaseButton>
                    <BaseButton  className="!px-3 !py-[0.3rem] !text-xs" href={`univartize/edit/${innovation.id}`}> Modifier </BaseButton>
                </div>}
            </div>
        </div>
    );
}

export default UnivartizeCard