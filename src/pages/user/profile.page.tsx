import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import { Link, useNavigate } from "react-router-dom";
import LoaderLayout from "@/components/loader/loader-layout.component";


import BaseButton, { buttonType } from "@/components/base-button/base-button.component";

import ProductsContainer from "@/components/products-container/products-container.component";

import { logoutStart } from "@/store/auth/auth.actions";
import { BiPlus, CiEdit, CiLocationOn, CiMail, FiLogOut, MdOutlinePhone } from "@/assets";
import GenericImage from "@/components/generic-image/generic-image.component";
import { ADMIN_STATUS } from "@/api/types";
import { fetchUserInnovationsCount, fetchUserProductsCount } from "@/utils/firebase/firestore.utils";



const ProfilePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);
  const [userProductsCount, setUserProductsCount] = useState(0);
  const [userInnovationsCount, setUserInnovationsCount] = useState(0);
  const [updateProfileFlag, setUpdateProfileFlag] = useState(false);


  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate("/signin")
    }
  }, [authLoading, currentUser])

  const fetchCounts = async (email: string) => {
    try {
      const productsCount = await fetchUserProductsCount(email);
      const innovationsCount = await fetchUserInnovationsCount(email);
      setUserProductsCount(productsCount); setUserInnovationsCount(innovationsCount);

    } catch (error) {

    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchCounts(currentUser.email);
    }
  }, [currentUser])

  const logout = () => { dispatch(logoutStart()) }

  const toggleUpdateFlag = () => {
    setUpdateProfileFlag(!updateProfileFlag)
  }


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
                  <div className=" flex items-center justify-start gap-4">
                    <h2 className="text-lg md:text-3xl font-bold">{`${currentUser.firstName} ${currentUser.lastName}`}</h2>
                    {currentUser.adminStatus &&
                      <span className="px-3 py-[0.15rem] md:py-[0.2rem] rounded-[0.3rem] text-xs bg-green-secondary text-light w-fit">{currentUser.adminStatus === ADMIN_STATUS.MAIN_ADMIN ? 'Admin':'Co-Admin'}</span>
                    }
                    <Link to={"/me/profile/edit"} className="text-2xl cursor-pointer px-4 w-fit" onClick={toggleUpdateFlag}><CiEdit /></Link>
                  </div>
                  <div className=" flex items-center justify-start gap-4 ">
                    <CiMail className="text-sm md:text-lg" /> <p className="text-dark/80 text-xs md:text-sm w-fit font-bold">{currentUser.email}</p>
                  </div>
                  {currentUser.phoneNumber &&
                    <div className="flex items-center justify-start gap-4 md:mb-3">
                      <MdOutlinePhone className="text-sm md:text-lg" /> <p className="text-dark/80 text-xs md:text-sm w-fit font-bold">{currentUser.phoneNumber}</p>
                    </div>
                  }
                  <div className="flex flex-col w-full py-1 gap-1">
                    {
                      currentUser.bio && <span className="text-xs lg:text-sm text-dark font-semibold line-clamp-2 w-full">{currentUser.bio}</span>
                    }
                    {
                      currentUser.location &&
                      <span className="text-xs lg:text-sm text-dark/80 font-bold flex items-center justify-start gap-2"><CiLocationOn className="text-xl" /> {currentUser.location?.city}, {currentUser.location.country}</span>
                    }
                  </div>

                </div>
              </div>
              <div className="flex items-center justify-start gap-4 pt-2 lg:px-8">
                <div className="flex flex-col items-start w-fit">
                  <span className="text-lg md:text-2xl font-bold text-dark/80 w-full text-center">{userProductsCount}</span>
                  <span className="text-xs text-dark/70 font-semibold">Produits</span>
                </div>
                <div className="flex flex-col items-start w-fit">
                  <span className="text-lg md:text-2xl font-bold text-dark/80 w-full text-center">{userInnovationsCount}</span>
                  <span className="text-xs text-dark/70 font-semibold">Innovations</span>
                </div>
              </div>

              {(currentUser && (currentUser.adminStatus === ADMIN_STATUS.CO_ADMIN || currentUser.adminStatus === ADMIN_STATUS.MAIN_ADMIN)) &&
                <>
                  <div className="flex flex-col py-2">
                    <h2 className="font-bold text-dark text-2xl md:text-3xl my-4 ">Mes Produits</h2>
                    <ProductsContainer OwnerView />
                  </div>
                  <BaseButton href="/me/post" type={buttonType.green} className="fixed right-[2rem] bottom-[5rem] z-40 shadow-lg lg:bottom-[2rem] font-semibold !text-sm">Post <BiPlus /></BaseButton>
                </>
              }
              <BaseButton type={buttonType.clear} clickHandler={logout} className="!bg-light fixed right-[2rem] bottom-[8rem] z-40 shadow-lg lg:bottom-[5rem] flex items-center gap-2 !px-11 lg:!px-4"><span className="hidden lg:inline-block">Deconnexion</span> <FiLogOut className="text-lg lg:hidden" /> </BaseButton>

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