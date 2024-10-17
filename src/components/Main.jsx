import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import LatestFilms from "../pages/LatestFilms";
import FeaturedFilm from "./Film/FeaturedFilm";

export default function Main() {
    console.log('API URL:', process.env.REACT_APP_API_URL);
    return (
        <div>
            <Header />
            <FeaturedFilm/>
            <LatestFilms />
            <Outlet />
        </div>
    );
}