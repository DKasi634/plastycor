
import { FiUser, FiPackage, FiBarChart } from "react-icons/fi";

import { HiOutlineLightBulb } from "react-icons/hi";

interface BottomNavItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const BottomNav = ({ items }: { items: BottomNavItem[] }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 shadow-md">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-500 transition duration-200"
        >
          <span>{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

// Example usage
export const bottomItems = [
  { label: "Profile", icon: <FiUser />, onClick: () => console.log("Profile") },
  { label: "Products", icon: <FiPackage />, onClick: () => console.log("Products") },
  { label: "Innovations", icon: <HiOutlineLightBulb />, onClick: () => console.log("Innovations") },
  { label: "Dashboard", icon: <FiBarChart />, onClick: () => console.log("Dashboard") },
];