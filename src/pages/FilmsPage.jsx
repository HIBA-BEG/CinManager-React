import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFilms } from '../services/FilmServices';
import FilmCard from '../components/Film/FilmCard';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const FilmsPage = () => {
    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const filmData = await getAllFilms();
                if (Array.isArray(filmData)) {
                    const sortedFilms = filmData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setFilms(sortedFilms);
                    setFilteredFilms(sortedFilms);
                } else {
                    throw new Error('Unexpected data format');
                }

            } catch (error) {
                setError('Error fetching films.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilms();
    }, []);

    useEffect(() => {
        const filtered = films.filter(film => 
            film.titre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFilms(filtered);
    }, [searchTerm, films]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Header />
            <div className="films-page">
                <h3 className='text-4xl font-bold text-center my-8'>All Films</h3>
                <div className="search-container flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search films..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-2 w-64 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="film-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {filteredFilms.map(film => (
                        <Link to={`/films/One/${film._id}`} key={film._id} className="film-card block transition transform hover:scale-105">
                            <FilmCard
                                titre={film.titre}
                                affiche={film.affiche}
                            />
                        </Link>
                    ))}
                </div>
                {filteredFilms.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No films found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default FilmsPage;
