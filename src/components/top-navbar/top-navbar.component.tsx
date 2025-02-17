
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll';
import NavMenu from "../nav-menu/nav-menu.component";
import NavBtn from "../nav-btn/nav-btn.component";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { LandingPageRoutes } from "@/constants/data";
import { NavLinksWrapper } from "@/styles/globals.styles";

import LogoImage from "@/assets/logo/icon_header.png"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import { CgMenuRightAlt, FiLogIn } from "@/assets";
import GenericImage from "../generic-image/generic-image.component";


const TopNavbar = () => {

  const location = useLocation();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const currentUser = useSelector(selectCurrentUser)


  const hideDrawer = () => {
    setDrawerVisible(false)
  }
  const showDrawer = () => {
    setDrawerVisible(true)
  }

  useEffect(() => {
    if (drawerVisible) {
      disablePageScroll()
    } else {
      enablePageScroll();
    }
  }, [drawerVisible])

  return (
    <nav className="h-[5rem] px-8 py-2 flex items-center justify-between fixed top-0 left-0 w-full bg-light-variant backdrop-blur-3xl z-50 border-b border-gray-transparent" >
      <div className="flex justify-between gap-4 items-center w-full">
        <Link to={"/"} className="h-[4rem] w-fit inline-block">
          <GenericImage loading="lazy" src={LogoImage} className="h-full object-cover object-center" alt="Logo" />
        </Link>
        <div className="flex items-center justify-start">
          <div className="hidden lg:flex items-center justify-center gap-8">
            <NavLinksWrapper className="flex items-center justify-center gap-5 xl:gap-6">
              {
                LandingPageRoutes.map((route, index) => (
                  <li key={index}> <NavLink to={route.path} className={({ isActive }) => `${isActive && route.path === location.pathname ? "active" : ""
                    }`} >{route.label}</NavLink> </li>

                ))
              }
            </NavLinksWrapper>
            {!currentUser ?
              <div className="flex items-center justify-center gap-4 px-4">
                <BaseButton type={buttonType.clear} href="/signin" className="!px-3"> <FiLogIn /> <span className="hidden xl:inline-block"> Se connecter </span></BaseButton>
              </div> :
              <Link to={"/me/profile"} className="w-[2rem] h-[2rem] rounded-full overflow-hidden" > <GenericImage
                src={currentUser.profilePicture} alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="w-full h-full object-cover object-center"
              /> </Link>
            }

          </div>
          {!drawerVisible &&
            <NavBtn className="inline-block lg:hidden ml-auto" onClick={showDrawer} icon={<CgMenuRightAlt />} />
          }

        </div>
        <NavMenu hideCallback={hideDrawer} visible={drawerVisible} />
      </div>
    </nav>
  )
}

export default TopNavbar;