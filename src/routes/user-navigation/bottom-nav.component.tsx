import React from 'react';
import { ADMIN_STATUS } from '@/api/types';
import { userMenuItems } from '@/constants/data';
import { selectCurrentUser } from '@/store/auth/auth.selector';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface BottomNavItemProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavItemProps> = ({ className = '' }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav
      className={`${className} flex lg:hidden justify-around fixed bottom-0 left-0 w-full bg-white border-t border-gray-transparent py-2 shadow-md gap-2`}
    >
      {userMenuItems.map((item, index) => {
        // Render the item only if it's not restricted or the currentUser is a MAIN_ADMIN.
        if (item.restricted && currentUser?.adminStatus !== ADMIN_STATUS.MAIN_ADMIN) {
          return null;
        }
        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `${isActive ? 'bg-gray-transparent !text-blue' : 'text-gray'} 
              flex flex-col items-center py-2 space-y-1 
              hover:text-blue transition duration-200 
              hover:bg-gray-transparent w-full max-w-[10rem] rounded-xl`
            }
          >
            <span>{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
