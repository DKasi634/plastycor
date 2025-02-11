
import { FiUser, FiPackage, FiBarChart } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

interface SidebarNavItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SidebarNav = ({ items }: { items: SidebarNavItem[] }) => {
  return (
    <nav className="fixed left-0 top-[5rem] max-h-screen h-[calc(100svh-5rem)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 shadow-md">
      <div>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center space-x-4 px-6 py-3 hover:bg-gray-100 transition duration-200"
          >
            <span>{item.icon}</span>
            <span className="text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="px-6 pb-6 text-sm text-gray-500">
        © 2023 Your Company
      </div>
    </nav>
  );
};

export default SidebarNav;

// Example usage
export const sidebarItems = [
  { label: "Profile", icon: <FiUser />, onClick: () => console.log("Profile") },
  { label: "Products", icon: <FiPackage />, onClick: () => console.log("Products") },
  { label: "Innovations", icon: <HiOutlineLightBulb />, onClick: () => console.log("Innovations") },
  { label: "Dashboard", icon: <FiBarChart />, onClick: () => console.log("Dashboard") },
];