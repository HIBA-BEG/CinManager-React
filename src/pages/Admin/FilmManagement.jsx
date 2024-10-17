import React, { useState, useEffect } from 'react';
import { getAllFilms } from '../../services/FilmServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import FilmCard from '../../components/Admin/FilmCard';
import AddFilmModal from '../../components/Admin/AddFilmModal';

const FilmManagement = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const filmData = await getAllFilms();
      if (Array.isArray(filmData)) {
        setFilms(filmData);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching film details:', error);
      setError('Error fetching film details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFilm = (newFilm) => {
    setFilms([...films, newFilm]);
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  // console.log(films);
  return (
    <div className='flex-1 p-8'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Film Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          Add New Film
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {films.map((film) => (
          <FilmCard
            key={film._id}
            {...film}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <AddFilmModal
          onClose={() => setIsAddModalOpen(false)}
          onAddFilm={handleAddFilm}
        />
      )}
    </div>
  );
};

export default FilmManagement;
