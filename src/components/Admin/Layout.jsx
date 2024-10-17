import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="bgcolorCss flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;