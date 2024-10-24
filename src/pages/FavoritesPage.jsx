import React, { useState, useEffect } from 'react';
import { getFavorisByUser } from '../services/FavorisService';
import FilmCard from '../components/Film/FilmCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesData = await getFavorisByUser();
                console.log("favoritesData", favoritesData);
                setFavorites(favoritesData);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError('Failed to load favorites. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    console.log("favorites", favorites);
    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner />
            </div>
        );
    }
    // if (loading) return <div>Loading...</div>;
    if (error) {
        return <div className='flex justify-center items-center h-screen'>{error}</div>;
    }
    // const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${film.affiche}`;

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Favorite Films</h1>
                {favorites.length === 0 ? (
                    <p>You haven't added any favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((favorite) => (
                          
                            <Link to={`/films/One/${favorite.film._id}`} key={favorite.film._id}>
                                <FilmCard 
                                    key={favorite.film._id} 
                                id={favorite.film._id} 
                                titre={favorite.film.titre} 
                                    affiche={favorite.film.affiche} 
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default FavoritesPage;
