import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">
                    <span  className="text-indigo-500 text-4xl">W</span>izard's 
                    <span  className="text-indigo-500 text-4xl">W</span>and</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/films">Films</Link></li>
                        {/* <li><Link to="/series">My reservations</Link></li>*/}
                    </ul>
                </nav>
            </div>
            <div className="header-icons">
                <span className="icon search-icon">🔍</span>
                <span className="icon bell-icon">🔔</span>
                <span className="icon user-icon">👤</span>
            </div>
        </header>
    )
}