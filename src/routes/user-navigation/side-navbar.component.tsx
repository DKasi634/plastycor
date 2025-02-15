

import { NavLink } from "react-router-dom";
import { userMenuItems } from "@/constants/data";



type SideBarNavProps = {
  className?: string
}

const SidebarNav = ({ className = "" }: SideBarNavProps) => {
  return (
    <nav className={`${className}hidden lg:flex flex-col justify-between fixed left-0 top-[5rem] max-h-screen h-[calc(100svh-5rem)] w-64 bg-white border-r border-gray/80 py-6 shadow-md max-w-[16rem]`}>
      <div>
        {userMenuItems.map((item, index) => (

          <NavLink
            key={index}  to={item.path}
            className={({isActive}) => ` ${isActive && 'bg-gray-transparent'} flex items-center space-x-4 px-6 py-3 hover:bg-gray-transparent transition duration-200 w-full rounded-sm`}
          >
            <span>{item.icon}</span>
            <span className="text-gray-700">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="px-6 pb-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Plastycor
      </div>
    </nav>
  );
};

export default SidebarNav;

// Example usage
