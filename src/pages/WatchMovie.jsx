import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilmById } from '../services/FilmServices';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const WatchMovie = () => {
    const { id } = useParams();
    console.log(id);
    
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmData = await getFilmById(id);
                if (filmData) {
                    setFilm(filmData);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                setError('Error fetching film details.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchFilm();
        }
    }, [id]);

    const isAuthenticated = () => {
        // Replace this with your actual authentication check
        return localStorage.getItem('token') !== null;
    };
    // console.log("isAuthenticated", isAuthenticated());

    const handleLoginClick = () => {
        navigate('/login');
    };
    
    const isSubscribed = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.abonnement === 'Subscribed';
    };
    // console.log("isSubscribed", isSubscribed());


    const handleSubscribeClick = () => {
        navigate('/subscribe');
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!film) {
        return <p>Loading...</p>;
    }
    const videoUrl = `${process.env.REACT_APP_MINIO_PATH}${film.video}`;

    return (
        console.log(videoUrl),
        <>
            <Header />
            <h2 className="text-3xl font-bold text-center mb-6">{film.titre}</h2>
            <div className="max-w-4xl mx-auto p-4 items-center relative"> 
                <video
                    src={videoUrl}
                    alt={film.titre}
                    controls
                    height={600}
                    className="w-full"
                />
                
                {!isAuthenticated() && (
                    <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold mb-4 text-red-800">Login Required</h3>
                            <p className="mb-4 text-xl text-red-800">You need to be logged in to watch this movie.</p>
                            <button
                                onClick={handleLoginClick}
                                className="btn btn-primary"
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                )}

                {isAuthenticated() && !isSubscribed() && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold mb-4 text-red-800">Subscription Required</h3>
                            <p className="mb-4 text-xl text-red-800">You need to be subscribed to watch this movie.</p>
                            <button
                                onClick={handleSubscribeClick}
                                className="btn btn-primary"
                            >
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WatchMovie;
