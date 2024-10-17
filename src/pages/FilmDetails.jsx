import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../services/FilmServices';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';


const FilmDetailsPage = () => {
  const { id } = useParams();
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
 
  const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${film.affiche}`;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row items-center md:items-start mb-6">

        <img
          src={afficheUrl}
          alt={film.titre}
          className="h-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0"
        />

        <div className="md:ml-6 text-left flex-1">
          <h2 className="text-3xl font-bold text-center mb-6">{film.titre}</h2>
          <p className="text-xl font-semibold">Genre: <span className="font-normal text-lg">{film.genre}</span></p>
          <p className="text-xl font-semibold">Duration: <span className="font-normal text-lg">{film.duree}</span></p>

          <h3 className="text-xl font-semibold mb-2">Description:</h3>
          <p className="text-white">{film.description}</p>
          <Link to={`/films/One/watch/${film._id}`} key={film._id}>
            <button className=" bg-red-800 text-white p-2 rounded-xl hover:bg-black transition duration-200 items-center">
              Watch Now
            </button>
          </Link>

        </div>

      </div>

    </>
  );
};

export default FilmDetailsPage;
