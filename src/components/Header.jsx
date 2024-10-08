import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUser } from '../services/AuthServices';

export default function Header() {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const user = authenticated ? getUser() : null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">
                    <span className="text-red-700 text-4xl">W</span>izard's
                    <span className="text-red-700 text-4xl">W</span>and</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/films">Films</Link></li>
                        <li><Link to="/seances">Seances</Link></li>
                        {/* <li><Link to="/series">My reservations</Link></li>*/}
                        {authenticated && (
                            <li><Link to="/reservations" className="hover:text-indigo-500">My Reservations</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="header-icons">
                <span className="icon search-icon mr-8">🔍</span>
                {authenticated ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">Hello, {user.nom} {user.prenom}</span>
                        <button onClick={handleLogout}
                            className="bg-red-700 text-white px-3 py-1 rounded hover:bg-white transition duration-200"
                        >
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