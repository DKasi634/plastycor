import { Link, NavLink } from "react-router-dom";
import LogoImage from "@/assets/logo/icon_header.png"
import { NavLinksWrapper } from "@/styles/globals.styles";
import { CgMenuRightAlt } from "react-icons/cg";
import { useState } from "react";
import NavMenu from "../nav-menu/nav-menu.component";
import NavBtn from "../nav-btn/nav-btn.component";



const TopNavbar = () => {

  const [drawerVisible, setDrawerVisible] = useState(false);

  const hideDrawer = () => {
    setDrawerVisible(false)
  }
  const showDrawer = () =>{
    setDrawerVisible(true)
  }

  return (
    <nav className="h-[5rem] px-8 py-2 flex items-center justify-between fixed top-0 left-0 w-full bg-light-variant backdrop-blur-3xl z-10 border-b border-gray-transparent" >
      <div className="grid grid-cols-2 items-center  w-full">
      <Link to={"/"} className="h-[4rem] w-fit inline-block">
        <img src={LogoImage} className="h-full object-cover object-center" alt="Logo" />
      </Link>
      <div className="flex items-center justify-center">
      <NavLinksWrapper className="hidden lg:flex items-center justify-center gap-4">
        <li> <NavLink to={"/"} className={({isActive}) => `${isActive ? 'active':''}`} >Accueil</NavLink> </li>
        <li> <NavLink to={"/activites"} className={({isActive}) => `${isActive ? 'active':''}`} >Nos activites</NavLink> </li>
        <li> <NavLink to={"/contact"} className={({isActive}) => `${isActive ? 'active':''}`}>Contactez-nous</NavLink> </li>
      </NavLinksWrapper>
      { !drawerVisible &&
      <NavBtn className="inline-block lg:hidden ml-auto" onClick={showDrawer} icon={<CgMenuRightAlt />}/>
      }
      
      </div>
      <NavMenu hideCallback={hideDrawer} visible={drawerVisible} />
      </div>
    </nav>
  )
}

export default TopNavbar;