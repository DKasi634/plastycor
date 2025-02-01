import { Link, NavLink, useLocation } from "react-router-dom";
import LogoImage from "@/assets/logo/icon_header.png"
import { NavLinksWrapper } from "@/styles/globals.styles";
import { CgMenuRightAlt } from "react-icons/cg";
import { useState } from "react";
import NavMenu from "../nav-menu/nav-menu.component";
import NavBtn from "../nav-btn/nav-btn.component";
import { LandingPageRoutes } from "@/constants/data";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { FiLogIn } from "react-icons/fi";



const TopNavbar = () => {

  const location = useLocation();
  

  const [drawerVisible, setDrawerVisible] = useState(false);

  const hideDrawer = () => {
    setDrawerVisible(false)
  }
  const showDrawer = () => {
    setDrawerVisible(true)
  }

  return (
    <nav className="h-[5rem] px-8 py-2 flex items-center justify-between fixed top-0 left-0 w-full bg-light-variant backdrop-blur-3xl z-10 border-b border-gray-transparent" >
      <div className="flex justify-between gap-4 items-center w-full">
        <Link to={"/"} className="h-[4rem] w-fit inline-block">
          <img src={LogoImage} className="h-full object-cover object-center" alt="Logo" />
        </Link>
        <div className="flex items-center justify-start">
          <div className="hidden lg:flex items-center justify-center gap-8">
            <NavLinksWrapper className="flex items-center justify-center gap-4">
              {
                LandingPageRoutes.map((route, index) => (
                  <li key={index}> <NavLink to={route.path} className={({isActive}) => `${isActive && route.path === location.pathname ? "active" : ""
                    }`} >{route.label}</NavLink> </li>

                ))
              }
            </NavLinksWrapper>
            <div className="flex items-center justify-center gap-4 px-4">
              <BaseButton>Univartize</BaseButton>
              <BaseButton type={buttonType.clear}> <FiLogIn/> &nbsp; Se connecter</BaseButton>
            </div>
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