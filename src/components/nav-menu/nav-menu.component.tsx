import { NavDrawerWrapper } from "@/styles/globals.styles";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import NavBtn from "../nav-btn/nav-btn.component";


type NavMenuProps = {
  className?: string,
  visible: boolean,
  hideCallback: () => void;
}

const NavMenu = ({ className = "", visible, hideCallback }: NavMenuProps) => {

  const drawerModal = useRef<HTMLDivElement|null>(null);
  const drawerContent = useRef<HTMLDivElement|null>(null);

  const handleModalClick = (event:React.SyntheticEvent<HTMLDivElement>) =>{
      if(drawerModal.current && event.target === drawerModal.current){
        hideCallback();
      }
  }

  return (
    <>
      {visible &&
        <NavDrawerWrapper className={`flex lg:hidden fixed inset-0 bg-dark-variant w-screen h-screen`} onMouseDown={handleModalClick} ref={drawerModal}>
          <div className="absolute right-0 inset-y-0 w-screen max-w-[100vw] sm:max-w-[30rem] bg-slate-50 flex flex-col items-start justify-start" ref={drawerContent}>
            <ul className="flex flex-col items-start justify-start gap-3 p-4">
              <li><NavLink to={"/"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Accueil</NavLink></li>
              <li><NavLink to={"/activites"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Nos activites</NavLink></li>
              <li><NavLink to={"/contact"} className={({ isActive }) => `${isActive ? 'text-green' : ' hover:text-green'}`}>Contactez-nous</NavLink></li>
            </ul>
            <NavBtn className=" fixed top-3 right-6" onClick={hideCallback} icon={<IoClose />}/>
          </div>
        </NavDrawerWrapper>
      }
    </>
  )
}

export default NavMenu