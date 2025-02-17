import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import { useNavigate } from "react-router-dom";
import LoaderLayout from "@/components/loader/loader-layout.component";


import BaseButton, { buttonType } from "@/components/base-button/base-button.component";

import ProductsContainer from "@/components/products-container/products-container.component";

import { logoutStart } from "@/store/auth/auth.actions";
import { BiPlus, CiMail, FiLogOut, MdOutlinePhone } from "@/assets";
import GenericImage from "@/components/generic-image/generic-image.component";


const ProfilePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate("/signin")
    }
  }, [authLoading, currentUser])

  const logout = () => { dispatch(logoutStart()) }


  return (
    <div className="min-h-screen bg-gray-100">
      {(!authLoading && currentUser) ?
        <main className="w-full max-w-full ml-0 pb-[5rem] lg:py-8">
          {
            <>
              <div className="flex items-center justify-start lg:px-8 w-full gap-8">
                <div className="inline-block w-[4rem] h-[4rem] md:w-[8rem] md:h-[8rem] bg-light-transparent backdrop-blur-lg rounded-full md:rounded-[2.5rem] overflow-hidden">
                  <GenericImage
                    src={currentUser.profilePicture} alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col pb-4 w-fit items-start">
                  <div className="flex items-center justify-start gap-4">
                    <h2 className="text-lg md:text-3xl font-bold w-fit pr-4">{`${currentUser.firstName} ${currentUser.lastName}`}</h2>
                    {currentUser.adminStatus &&
                      <span className="px-3 py-[0.15rem] md:py-1 rounded-[0.3rem] text-xs bg-green-secondary text-light w-fit">{currentUser.adminStatus}</span>
                    }
                    <BaseButton type={buttonType.clear} clickHandler={logout} className="!bg-light fixed right-[2rem] bottom-[8rem] z-40 shadow-lg lg:bottom-[5rem] flex items-center gap-2 !px-11 md:!px-4"><span className="hidden md:inline-block">Logout</span> <FiLogOut className="text-lg" /> </BaseButton>
                  </div>
                  <div className="flex items-center justify-start gap-4 ">
                    <CiMail className="text-sm md:text-lg" /> <p className="text-dark/80 text-xs md:text-sm w-fit font-bold">{currentUser.email}</p>
                  </div>
                  {currentUser.phoneNumber &&
                    <div className="flex items-center justify-start gap-4 mb-2 md:mb-3">
                      <MdOutlinePhone className="text-sm md:text-lg" /> <p className="text-dark/80 text-xs md:text-sm w-fit font-bold">{currentUser.phoneNumber}</p>
                    </div>
                  }
                  <div className="flex items-center justify-start gap-4">
                    <div className="flex flex-col items-start w-fit">
                      <span className="text-xs text-dark/70 font-semibold">Produits</span>
                      <span className="text-lg md:text-xl font-bold text-dark/80">235</span>
                    </div>
                    <div className="flex flex-col items-start w-fit">
                      <span className="text-xs text-dark/70 font-semibold">Innovations</span>
                      <span className="text-lg md:text-xl font-bold text-dark/80">13</span>
                    </div>
                  </div>
                </div>
              </div>

              {(currentUser && currentUser.adminStatus) &&
                <>
                  <div className="flex flex-col py-2">
                    <h2 className="font-bold text-dark text-2xl md:text-3xl my-4 ">Mes Produits</h2>
                    <ProductsContainer OwnerView />
                  </div>
                  <BaseButton href="/me/post" type={buttonType.green} className="fixed right-[2rem] bottom-[5rem] z-40 shadow-lg lg:bottom-[2rem] font-semibold !text-sm">Post <BiPlus /></BaseButton>
                </>
              }
            </>
          }
        </main>
        :
        <LoaderLayout />
      }

    </div>
  );
};

export default ProfilePage;