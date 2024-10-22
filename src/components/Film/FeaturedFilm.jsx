import React, { useState, useEffect } from "react";
import { getAllFilms } from '../../services/FilmServices';
import { Link } from 'react-router-dom';

export default function FeaturedFilm() {
    const [latestFilm, setLatestFilm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestFilm = async () => {
            try {
                const films = await getAllFilms();
                if (Array.isArray(films) && films.length > 0) {
                    const sortedFilms = films.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setLatestFilm(sortedFilms[0]);
                }
            } catch (error) {
                console.error('Error fetching latest film:', error);
                setError('Failed to load the latest film. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestFilm();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!latestFilm) {
        return <div>No films available.</div>;
    }

    const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${latestFilm.affiche}`;

    return (
        <div className="featured-film" style={{ backgroundImage: `url('${afficheUrl}')` }}>
            <div className="featured-content">
                <h2 className="featured-title text-2xl font-bold">{latestFilm.titre}</h2>
                <p className="featured-description text-lg italic">{latestFilm.description}</p>
                <Link to={`/films/One/${latestFilm._id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>
)}
