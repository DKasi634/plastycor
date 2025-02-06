import { NavDrawerWrapper } from "@/styles/globals.styles";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5"
import { NavLink, useLocation } from "react-router-dom"
import NavBtn from "../nav-btn/nav-btn.component";
import { LandingPageRoutes } from "@/constants/data";
import BaseButton, { buttonType } from "../base-button/base-button.component";
import { FiLogIn } from "react-icons/fi";


type NavMenuProps = {
  className?: string,
  visible: boolean,
  hideCallback: () => void;
}

const NavMenu = ({ className = "", visible, hideCallback }: NavMenuProps) => {
  const location = useLocation();

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
                      // Ensure smooth scrolling
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
              <BaseButton type={buttonType.clear}> <FiLogIn/> &nbsp; Se connecter</BaseButton>
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

