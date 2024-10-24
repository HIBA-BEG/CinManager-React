import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthServices'

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/admin' },
    { name: 'Film Management', path: '/admin/filmManagement' },
    { name: 'User Management', path: '/admin/UserManagement' },
    { name: 'Seance Management', path: '/admin/SeancesManagement' },
    { name: 'Salle Management', path: '/admin/SalleManagement' },
    { name: 'All Reservations', path: '/admin/reservations' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded"
      >
        ☰
      </button>
      <div className={`bgcolorCss h-screen w-64 p-4 bg-gray-800 border-r-2 border-red-800 text-white fixed left-0 top-0 z-10 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <h1 className="logo mb-6">
          <span className="text-red-700 text-4xl">W</span>izard's
          <span className="text-red-700 text-4xl">W</span>and
        </h1>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <div className="p-4 flex justify-center">
          <button 
            onClick={handleLogout} 
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
