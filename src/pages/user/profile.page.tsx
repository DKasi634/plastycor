import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectAuthLoading, selectCurrentUser } from "@/store/auth/auth.selector";
import { useNavigate } from "react-router-dom";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { GridContainerSm } from "@/styles/globals.styles";
import ProductCard from "@/components/product-card/product-card.component";
import { products } from "@/constants/data";
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import { BiPlus } from "react-icons/bi";


const ProfilePage = () => {

  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const authLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate("/signin")
    }
  }, [authLoading, currentUser])


  return (
    <div className="min-h-screen bg-gray-100">
      {(!authLoading && currentUser) ?
        <main className="w-full max-w-full ml-0 pb-[5rem] lg:py-8">
          {
            <>
              <div className="flex items-center justify-start px-8 w-full gap-8">
                <div className="w-[8rem] h-[8rem] bg-light-transparent backdrop-blur-lg rounded-3xl p-1">
                  <img
                    src={currentUser.profilePicture} alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="w-full h-full object-cover object-center rounded-3xl"
                  />
                </div>
                <div className="flex-flex-col pb-4 w-fit">
                  <div className="flex items-center justify-start gap-4">
                    <h3 className="text-3xl font-bold w-fit pr-4">{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
                    {/* { currentUser.adminStatus && */}
                    <span className="px-3 py-1 rounded-[0.3rem] text-xs bg-green-secondary text-light w-fit">{currentUser.adminStatus || "Admin"}</span>
                    {/* } */}
                  </div>
                  <div className="flex items-center justify-start gap-4 ">
                    <CiMail className="text-lg" /> <p className="text-dark/80 text-sm w-fit font-bold">{currentUser.email}</p>
                  </div>
                  <div className="flex items-center justify-start gap-4 mb-3">
                    <MdOutlinePhone className="text-lg" /> <p className="text-dark/80 text-sm w-fit font-bold">{currentUser.phoneNumber}</p>
                  </div>
                  <div className="flex items-center justify-start gap-4">
                    <div className="flex flex-col items-start w-fit">
                      <span className="text-xs text-dark/70 font-semibold">Produits</span>
                      <span className="text-xl font-bold text-dark/80">235</span>
                    </div>
                    <div className="flex flex-col items-start w-fit">
                      <span className="text-xs text-dark/70 font-semibold">Innovations</span>
                      <span className="text-xl font-bold text-dark/80">13</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-2 px-4">
                <h2 className="font-bold text-dark text-2xl md:text-3xl my-4 ">My Products</h2>
                <GridContainerSm>
                  {products.map((product) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      ownerView
                      onAddToCart={() => { }}
                    />
                  ))}
                </GridContainerSm>
              </div>
              <BaseButton href="/me/post" type={buttonType.green} className="fixed right-[2rem] bottom-[5rem] z-40 shadow-lg lg:bottom-[2rem] font-semibold !text-sm">Post <BiPlus/></BaseButton>
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