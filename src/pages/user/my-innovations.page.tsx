
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import InnovationsContainer from "@/components/innovations-container/innovations-container.component";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";


const MyInnovationsPage = () => {

    const currentUser = useSelector(selectCurrentUser);

    return (
        <>

            {currentUser ?
                <>
                    <div className="flex flex-col py-2">
                        <h2 className="font-bold text-dark text-2xl md:text-3xl my-6 ">Mes Innovations</h2>
                        <InnovationsContainer OwnerEmail={currentUser.email} />
                    </div>
                    <BaseButton href="/univartize/create" type={buttonType.green} className="fixed right-[2rem] bottom-[5rem] z-40 shadow-lg lg:bottom-[2rem] font-semibold !text-sm">Post <BiPlus /></BaseButton>
                </> : <></>
            }
        </>
    )
}

export default MyInnovationsPage