import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import FilmCard from '../components/Film/FilmCard';
import { getAllFilms } from '../services/FilmServices';
import LoadingSpinner from '../components/LoadingSpinner';

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
                    const sortedFilms = filmData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setFilms(sortedFilms);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                setError('There has been a problem fetching films.');
                console.error(error);
            } finally {
                setLoading(false);
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
        <div className="trending-films items-center">
            <h3 className="section-title">Latest Films</h3>
            <div className="film-list">

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className="mySwiper flex flex-col justify-center items-center"
                >
                    {films.map((film, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/films/One/${film._id}`} key={film.id} className="flex justify-center items-center">
                                <FilmCard
                                    titre={film.titre}
                                    // genre={film.genre}
                                    // duree={film.duree}
                                    // description={film.description}
                                    affiche={film.affiche}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestFilms;
