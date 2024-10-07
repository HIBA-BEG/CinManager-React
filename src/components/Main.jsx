import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import LatestFilms from "../pages/LatestFilms";
import FeaturedFilm from "./FeaturedFilm";

export default function Main() {
    return (
        <div>
            <Header />
            <FeaturedFilm/>
            <LatestFilms />
            <Outlet />
        </div>
    );
}