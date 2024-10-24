import React, { useState, useEffect } from 'react';
import { getAllGenres, deleteGenre } from '../../services/GenreServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import GenreCard from '../../components/Admin/GenreCard';
import AddGenreModal from '../../components/Admin/AddGenreModal';
import { PlusIcon } from 'lucide-react';

const GenreManagement = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const genreData = await getAllGenres();
      setGenres(genreData);
    } catch (error) {
      console.error('Error fetching genre details:', error);
      setError('Error fetching genre details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGenre = (newGenre) => {
    setGenres([...genres, newGenre]);
    setIsAddModalOpen(false);
  };

  const handleUpdateGenre = (updatedGenre) => {
    setGenres(genres.map(genre => 
      genre._id === updatedGenre._id ? updatedGenre : genre
    ));
    setIsAddModalOpen(false);
  };

  const handleDeleteGenre = async (id) => {
    try {
      await deleteGenre(id);
      setGenres(genres.filter(genre => genre._id !== id));
    } catch (error) {
      console.error('Error deleting genre:', error);
      setError('Error deleting genre.');
    }
  };

  const handleEditGenre = (id) => {
    const genreToEdit = genres.find(genre => genre._id === id);
    setCurrentGenre(genreToEdit);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setCurrentGenre(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className='flex-1 p-8'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Genre Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="border-4 border-red-700 rounded-full p-2"
        >
          <PlusIcon className="m-2 text-red-700 font-bold text-7xl " />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {genres.map((genre) => (
          <GenreCard
            key={genre._id}
            {...genre}
            onDelete={handleDeleteGenre}
            onEdit={handleEditGenre}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <AddGenreModal
          onClose={handleModalClose}
          onAddGenre={handleAddGenre}
          onUpdateGenre={handleUpdateGenre}
          currentGenre={currentGenre}
        />
      )}
    </div>
  );
};

export default GenreManagement;
