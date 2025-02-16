import { NavDrawerWrapper } from "@/styles/globals.styles";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5"
import { Link, NavLink, useLocation } from "react-router-dom"
import NavBtn from "../nav-btn/nav-btn.component";
import { LandingPageRoutes } from "@/constants/data";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/auth/auth.selector";


type NavMenuProps = {
  className?: string,
  visible: boolean,
  hideCallback: () => void;
}

const NavMenu = ({ className = "", visible, hideCallback }: NavMenuProps) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  const drawerModal = useRef<HTMLDivElement | null>(null);
  const drawerContent = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (drawerModal.current && event.target === drawerModal.current) {
      hideCallback();
    }
  };

  return (
    <>
      {visible && (
        <NavDrawerWrapper
          className={`${className} flex lg:hidden fixed inset-0 bg-dark-variant w-screen h-screen z-50`}
          onMouseDown={handleModalClick}
          ref={drawerModal}
        >
          <div
            className="absolute right-0 inset-y-0 w-screen max-w-[100vw] sm:max-w-[30rem] bg-slate-50 flex flex-col items-start justify-start"
            ref={drawerContent}
          >
            <ul className="flex flex-col items-start justify-start gap-3 p-4">
              {LandingPageRoutes.map((route, index) => (
                <li key={index}>
                  <NavLink
                    to={route.path}
                    className={() =>
                      `${location.pathname === route.path ? "text-green" : "hover:text-green"}`
                    }
                    onClick={() => {
                      const section = document.getElementById(route.id);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                      hideCallback();
                    }}
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start justify-start gap-4 px-4">
              {!currentUser ?
                <BaseButton clickHandler={hideCallback} type={buttonType.clear} href="/signin"> <FiLogIn /> &nbsp; Se connecter</BaseButton>
                :
                <Link to={"/me/profile"} className="w-[2rem] h-[2rem] rounded-full overflow-hidden" > <img
                  src={currentUser.profilePicture} alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-full h-full object-cover object-center"
                /> </Link>
              }
            </div>
            <NavBtn
              className="fixed top-3 right-6"
              onClick={hideCallback}
              icon={<IoClose />}
            />
          </div>
        </NavDrawerWrapper>
      )}
    </>
  );
};

export default NavMenu;

