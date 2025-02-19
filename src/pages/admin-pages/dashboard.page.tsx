
import DashboardCard from '@/components/admin-components/dashboard-card.component';
import { adminDashboardRoutes } from '@/constants/data';
import React from 'react';


const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen  p-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-800 w-full">
        Admin Dashboard
      </h1>
      <div className="grid gap-8 md:grid-cols-3">
        {
          adminDashboardRoutes.map((route, index) =>(
            <DashboardCard key={index} cardRoute={route} />
          ))
        }
      </div>
    </div>
  );
};

export default DashboardPage;
