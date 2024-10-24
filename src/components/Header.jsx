import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout, getUser } from '../services/AuthServices';
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import SideProfile from "./SideProfile";



export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const user = authenticated ? getUser() : null;
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path ? "text-red-700" : "";
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="logo text-2xl md:text-3xl">
                    <span className="text-red-700 md:text-4xl">W</span>izard's
                    <span className="text-red-700 md:text-4xl">W</span>and
                </h1>

                {!isMenuOpen && (
                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
                        <FaBars size={24} />
                    </button>
                )}

                <nav className="hidden md:block">
                    <ul className="flex gap-8 text-nowrap ">
                        <li><Link to="/" className={`hover:text-red-700 ${isActive("/")}`}>Home</Link></li>
                        <li><Link to="/films" className={`hover:text-red-700 ${isActive("/films")}`}>Films</Link></li>
                        <li><Link to="/seances" className={`hover:text-red-700 ${isActive("/seances")}`}>Seances</Link></li>
                        {authenticated && (
                            <li><Link to="/MyReservations" className={`hover:text-red-700 text-nowrap ${isActive("/MyReservations")}`}>My Reservations</Link></li>
                        )}
                        {authenticated && (
                            <li><Link to="/Myfavorites" className={`hover:text-red-700 ${isActive("/Myfavorites")}`}>My Favorites</Link></li>
                        )}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <FaSearch className=" text-gray-400" />
                    {authenticated ? (
                        <div className="flex items-center gap-2">
                            <span className="text-lg">Hello, {user.nom} {user.prenom}</span>
                            <button onClick={handleLogout} className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600">
                                <IoLogOut />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-white hover:text-red-700">Login</Link>
                    )}
                </div>

            </div>

            {authenticated && (
                <>
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="fixed md:top-36 top-32 right-0 z-50 bg-red-800 text-white p-4 rounded-l-full shadow-lg hover:bg-red-900"
                    >
                        <FaUser />
                    </button>
                    <SideProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                </>
            )}

            {isMenuOpen && (
                <nav className="relative bgcolorCss border-2 border-red-800 w-full  rounded-xl md:hidden mt-40 inset-0 z-50">

                    <div className="absolute top-4 left-4 md:hidden">
                        <button className="text-white" onClick={() => setIsMenuOpen(false)}>
                            <FaTimes size={24} />
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-2 items-center p-4 rounded-lg">
                        <li><Link to="/" className={`block hover:text-red-700 ${isActive("/")}`} onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/films" className={`block hover:text-red-700 ${isActive("/films")}`} onClick={toggleMenu}>Films</Link></li>
                        <li><Link to="/seances" className={`block hover:text-red-700 ${isActive("/seances")}`} onClick={toggleMenu}>Seances</Link></li>
                        {authenticated && (
                            <li><Link to="/MyReservations" className={`block hover:text-red-700 ${isActive("/MyReservations")}`} onClick={toggleMenu}>My Reservations</Link></li>
                        )}
                        {authenticated ? (
                            <li className="flex flex-col items-center justify-between gap-2">
                                <span>Hello, {user.nom} {user.prenom}</span>
                                <div className="flex flex-row items-center gap-8">
                                    <FaSearch className="text-xl text-gray-400" />
                                    <button onClick={handleLogout} className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600">
                                        <IoLogOut />
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li><Link to="/login" className="block hover:text-red-700" onClick={toggleMenu}>Login</Link></li>
                        )}
                    </ul>
                </nav>
            )}

        </header>
    );
}