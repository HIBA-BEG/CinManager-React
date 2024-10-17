import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../services/FilmServices';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const WatchMovie = () => {
    const { id } = useParams();
    console.log(id)

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
            <div className="max-w-4xl mx-auto p-4 items-center"> 
                <video
                    src={videoUrl}
                    alt={film.titre}
                    controls  height={600}
                />
            </div>

        </>
    );
};

export default WatchMovie;
