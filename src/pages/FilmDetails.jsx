import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../services/FilmServices';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import AddComment from '../components/Film/AddComment';
import AllComments from '../components/Film/AllComments';
import FilmRating from '../components/Film/FilmRating';
import { getCommentairesByFilm } from '../services/CommentaireServices';
import { isAuthenticated } from '../services/AuthServices';
import FavoriteButton from '../components/Film/FavoriteButton';


const FilmDetailsPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const isLoggedIn = isAuthenticated();

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

    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentairesByFilm(id);
        // console.log('Fetched comments:', fetchedComments);
        setComments(fetchedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchFilm();
    fetchComments();
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!film) {
    return <p className='text-center text-2xl font-bold'>No film data available.</p>;
  }

  const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${film.affiche}`;

  return (
    // console.log(afficheUrl),
    <div className="relative min-h-screen flex flex-col">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat filter blur-md"
        style={{
          backgroundImage: `url(${afficheUrl})`,
          zIndex: -1
        }}
      ></div>

      <div className="fixed inset-0 bg-black opacity-50" style={{ zIndex: -1 }}></div>

      <Header />

      <main className="flex-grow z-10 max-w-5xl mx-auto px-4 py-8">
        <div className="bg-black max-w-fit bg-opacity-20 rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 rounded-l-lg">
              <img
                src={afficheUrl}
                alt={film.titre}
                className="h-full object-cover"
              />

            </div>
            <div className="p-6 md:w-1/2 ">
              <div className='relative'>
                <div className="absolute top-1 right-1">
                  <FavoriteButton filmId={film._id} />
                </div>

                <h2 className="text-4xl font-bold mb-4 text-white">{film.titre}</h2>
                <p className="text-xl mb-2 text-gray-300">
                  <span className="font-semibold">Genre: </span>
                  {Array.isArray(film.genre)
                    ? film.genre.map(g => g.nom).join(', ')
                    : 'No genres available'}
                </p>
                <p className="text-xl mb-4 text-gray-300">
                  <span className="font-semibold">Duration: </span>{film.duree}
                </p>
                <h3 className="text-xl font-semibold mb-2 text-white">Description:</h3>
                <p className="text-gray-300 mb-4">{film.description}</p>
                {film.video ? (
                  <Link to={`/films/One/watch/${film._id}`} className="inline-block">
                    <button className="btn btn-primary">
                      Watch Now
                    </button>
                  </Link>
                ) : (
                  <p className="border border-yellow-500 rounded-xl p-2 text-yellow-500 font-semibold inline-block">Streaming this movie soon ...</p>
                )}
              </div>
              
            </div>

          </div>
        </div>
        <div className="p-4">
          <FilmRating filmId={id} />
        </div>
      </main>

      <footer className="z-10">
        <div className="mx-auto px-4 py-6">
          {isLoggedIn && <AddComment filmId={id} onAddComment={handleAddComment} />}
          <AllComments comments={comments} setComments={setComments} />
        </div>
      </footer>
    </div>
  );
};

export default FilmDetailsPage;
