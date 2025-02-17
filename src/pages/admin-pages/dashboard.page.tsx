import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaListAlt, FaBoxOpen } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen  p-10">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Users Card */}
        <Link
          to="#"
          className="bg-gray/20 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 p-8 flex flex-col items-center"
        >
          <FaUsers className="text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2 w-full">Manage Users</h2>
          <p className="text-center text-dark/60 text-xs">
            Oversee user profiles and permissions effortlessly.
          </p>
        </Link>

        {/* Categories Card */}
        <Link
          to="/me/manage-categories"
          className="bg-gray/20 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 p-8 flex flex-col items-center"
        >
          <FaListAlt className="text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2 w-full">Manage Categories</h2>
          <p className="text-center text-dark/60 text-xs">
            Organize and update product categories with a click.
          </p>
        </Link>

        {/* Products Card */}
        <Link
          to="#"
          className="bg-gray/20 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 p-8 flex flex-col items-center"
        >
          <FaBoxOpen className="text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2 w-full">Manage Products</h2>
          <p className="text-center text-dark/60 text-xs">
            Add, edit, or remove products seamlessly in real-time.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
