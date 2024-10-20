import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout, getUser } from '../services/AuthServices';

export default function Header() {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const user = authenticated ? getUser() : null;
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path ? "text-red-700" : "";
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">
                    <span className="text-red-700 text-4xl">W</span>izard's
                    <span className="text-red-700 text-4xl">W</span>and</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive("/")}>Home</Link></li>
                        <li><Link to="/films" className={isActive("/films")}>Films</Link></li>
                        <li><Link to="/seances" className={isActive("/seances")}>Seances</Link></li>
                        {/* <li><Link to="/series">My reservations</Link></li>*/}
                        {authenticated && (
                            <li><Link to="/MyReservations" className={isActive("/MyReservations")}>My Reservations</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="header-icons gap-4">
                <div className='max-w-md mx-auto'>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.." />
                    </div>
                </div>
                {authenticated ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Hello, {user.nom} {user.prenom}</span>
                        <button onClick={handleLogout}
                            className="bg-red-700 text-white px-3 py-1 rounded hover:bg-white transition duration-200">
                            ❌
                        </button>
                    </div>
                ) : (
                    <span className="icon user-icon"><Link to="/login">👤</Link></span>
                )}
            </div>
        </header>
    )
}