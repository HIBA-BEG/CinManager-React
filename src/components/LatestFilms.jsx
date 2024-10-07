import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 

import FilmCard from './FilmCard';
import { getAllFilms } from '../services/FilmServices';
import LoadingSpinner from './LoadingSpinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




const LatestFilms = () => {
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchFilms = async () => {

            try {
                const filmData = await getAllFilms();
                console.log(filmData);
                if (Array.isArray(filmData)) {
                    setFilms(filmData);
                    setLoading(false); 
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                setError('There has been a problem fetching films.');
                setLoading(false);
                console.error(error);
            }
        };
        fetchFilms();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }
    
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="trending-films">
            <h3 className="section-title">Latest Films</h3>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {films.map((film, index) => (
                    <SwiperSlide key={index}>
                        <FilmCard
                            titre={film.titre}
                            // genre={film.genre}
                            // duree={film.duree}
                            // description={film.description}
                            affiche={film.affiche}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default LatestFilms;
