import { CiLocationOn, FaRegHeart, IoEyeOutline } from "@/assets";

import GenericImage from "../generic-image/generic-image.component";
import { Category, Innovation, IUser } from "@/api/types";
import { disableFirestoreInnovation, enableFirestoreInnovation, getFirestoreUserByEmail } from "@/utils/firebase/firestore.utils";
import { selectCategories } from "@/store/categories/categories.selector";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import LoaderItem from "../loader/loader.component";


type InnovationCardProps = {
    innovation: Innovation,
    ownerView?: boolean,
    adminView?: boolean,
    className?: string
}

const InnovationCard = ({ innovation, className = '', ownerView = false, adminView = false }: InnovationCardProps) => {

    const [innovationOwner, setInnovationOwner] = useState<IUser | null>(null);
    const [thisInnovation, setThisInnovation] = useState<Innovation>(innovation);
    const [innovationCategory, setInnovationCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    const categories = useSelector(selectCategories);

    const navigate = useNavigate();

    const handleEnableInnovation = async () => {
        if (!thisInnovation.disabled) { return }
        setLoading(true);
        try {
            const enabledInnovation = await enableFirestoreInnovation({ ...thisInnovation, disabled: false } as Innovation);
            if (enabledInnovation) { setThisInnovation(enabledInnovation) }
        } catch (error) {

        } finally { setLoading(false) }
    }
    const handleDisableInnovation = async () => {
        if (thisInnovation.disabled) { return }
        setLoading(true)
        try {
            const disabledInnovation = await disableFirestoreInnovation({ ...thisInnovation, disabled: true } as Innovation);
            if (disabledInnovation) { setThisInnovation(disabledInnovation) }
        } catch (error) {

        } finally { setLoading(false) }
    }

    useEffect(() => {
        if (thisInnovation) {
            const category = categories.find(cat => cat.categoryId === thisInnovation.categoryId);
            if (category) { setInnovationCategory(category) };

            const getInnovationOwner = async () => {
                const owner: IUser | null = await getFirestoreUserByEmail(thisInnovation.ownerEmail);
                if (owner) { setInnovationOwner(owner) }
            };

            getInnovationOwner();
        }
    }, [thisInnovation])


    const handleClick = () => {
        if (!thisInnovation) { return }
        navigate(`/univartize/${thisInnovation.id}`)
    }


    return (
        <div className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-dark-transparent p-[2px] min-h-full  ${className}`}
            onClick={() => { if (!ownerView && !adminView) { handleClick() } }}>
            <div className="aspect-square bg-gray-transparent rounded-t-lg overflow-hidden border-gray-transparent border-[1px]">
                <GenericImage loading="lazy"
                    src={thisInnovation.images[0]}
                    alt={thisInnovation.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col justify-start gap-1">
                <span className="text-xs font-semibold text-green px-3 py-1 rounded-xl w-fit bg-green-transparent">{innovationCategory?.categoryName}</span>
                <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{thisInnovation.name}</h3>
                <p className="text-sm font-normal text-slate-900 mb-2 line-clamp-3 min-h-[4rem]">{thisInnovation.description}</p>
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
                        <div className="flex items-center justify-start gap-1"> <FaRegHeart /> <span>{thisInnovation.likes}</span> </div>
                        <div className="flex items-center justify-start gap-1"> <IoEyeOutline /> <span>{thisInnovation.views}</span> </div>

                    </div>
                    <div className="flex items-center justify-start text-xs font-bold text-dark gap-1">
                        <span><CiLocationOn /></span> <span>{thisInnovation.location}</span>
                    </div>
                </div>
                {(ownerView && !adminView) && <div className="flex items-center justify-between px-4 w-full">
                    <BaseButton className="!px-3 !py-[0.3rem] !text-xs" clickHandler={handleClick}> Voir </BaseButton>
                    <BaseButton className="!px-3 !py-[0.3rem] !text-xs" href={`/univartize/edit/${thisInnovation.id}`}> Modifier </BaseButton>
                </div>}

                {(adminView) && <div className="flex items-center justify-between px-4 w-full">
                    <BaseButton className="!px-3 !py-[0.3rem] !text-xs" clickHandler={handleClick}> Voir </BaseButton>
                    {thisInnovation.disabled ?
                        <BaseButton type={buttonType.clear} className="!px-3 !py-[0.3rem] !text-xs !text-green !border-green hover:!border-green" clickHandler={handleEnableInnovation} > Activer </BaseButton>
                        :
                        <BaseButton type={buttonType.clear} clickHandler={handleDisableInnovation} className="!px-3 !py-[0.3rem] !text-xs !text-red-500 !border-red-500 hover:!border-red-500 " > Désactiver </BaseButton>
                    }
                </div>}
            </div>
            {
                loading ? <div className="absolute inset-0 flex items-center justify-center z-10 bg-light/60"><LoaderItem className="!w-[2rem] !h-[2rem]" /></div> : <></>
            }
        </div>
    );
}

export default InnovationCard