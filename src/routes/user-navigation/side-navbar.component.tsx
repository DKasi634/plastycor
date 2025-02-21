

import { NavLink } from "react-router-dom";
import { userMenuItems } from "@/constants/data";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import { ADMIN_STATUS } from "@/api/types";



type SideBarNavProps = {
  className?: string
}

const SidebarNav = ({ className = "" }: SideBarNavProps) => {

  const currentUser = useSelector(selectCurrentUser)
  return (
    <nav className={`${className}hidden lg:flex flex-col justify-between fixed left-0 top-[5rem] max-h-screen min-h-[calc(100svh-5rem)] w-64 border-r border-gray/80 py-6 shadow-md max-w-[16rem]`}>
      <div>
        {userMenuItems.map((item, index) => {
          if (item.restricted && currentUser?.adminStatus !== ADMIN_STATUS.MAIN_ADMIN) {
            return null;
          }
          return (
            <NavLink
              key={index} to={item.path}
              className={({ isActive }) => ` ${isActive && 'bg-gray-transparent'} flex items-center space-x-4 px-6 py-3 hover:bg-gray-transparent transition duration-200 w-full rounded-sm`}
            >
              <span>{item.icon}</span>
              <span className="text-dark/80">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
      <div className="px-6 text-xs text-dark/70 font-bold w-full text-left">
        &copy; {new Date().getFullYear()} Plastycor
      </div>
    </nav>
  );
};

export default SidebarNav;

// Example usage
