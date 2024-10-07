// src/components/FilmsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFilms } from '../services/FilmServices';
import FilmCard from './FilmCard';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

const FilmsPage = () => {
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const filmData = await getAllFilms();
                if (Array.isArray(filmData)) {
                    setFilms(filmData);
                    setLoading(false); 
                } else {
                    throw new Error('Unexpected data format');
                }

            } catch (error) {
                setError('Error fetching films.');
                console.error(error);
            }
        };
        fetchFilms();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Header />
            <div className="films-page">
                <h3 className='text-2xl font-bold text-center mb-8'>All Films</h3>
                <div className="film-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {films.map(film => (
                        <Link to={`/films/One/${film._id}`} key={film._id} className="film-card block transition transform hover:scale-105">
                            <FilmCard
                                titre={film.titre}
                                affiche={film.affiche}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilmsPage;
