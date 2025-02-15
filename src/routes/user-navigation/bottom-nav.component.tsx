
import { userMenuItems } from "@/constants/data";

import { NavLink } from "react-router-dom";

interface BottomNavItemProps {
  className?:string
}


const BottomNav = ({className=""}:BottomNavItemProps) => {
  return (
    <nav className={`${className}flex lg:hidden justify-around fixed bottom-0 left-0 w-full bg-white border-t border-gray-transparent  py-2 shadow-md gap-2`}>
      {userMenuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={ ({isActive}) => `${isActive && 'bg-gray-transparent !text-blue'} flex flex-col items-center py-2 space-y-1 text-gray hover:text-blue transition duration-200 hover:bg-gray-transparent w-full rounded-xl`}
        >
          <span>{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
