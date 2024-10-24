import React, { useState, useEffect } from 'react';
import { addGenre, updateGenre } from '../../services/GenreServices';

const AddGenreModal = ({ onClose, onAddGenre, currentGenre, onUpdateGenre }) => {
  const [genreData, setGenreData] = useState({
    nom: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentGenre) {
      setGenreData(currentGenre);
    }
  }, [currentGenre]);

  const handleInputChange = (e) => {
    setGenreData({ ...genreData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (currentGenre) {
        const updatedGenre = await updateGenre(currentGenre._id, genreData);
        onUpdateGenre(updatedGenre);
      } else {
        const newGenre = await addGenre(genreData);
        onAddGenre(newGenre);
      }
      onClose();
    } catch (error) {
      console.error('Error saving genre:', error);
      setError(error.response?.data?.message || 'An error occurred while saving the genre');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md m-4">
        <h2 className="text-red-700 text-4xl font-bold text-center mb-6">
          {currentGenre ? 'Edit Genre' : 'Add New Genre'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom" className="block mb-1 font-semibold text-red-700 capitalize">Nom</label>
            <input
              type="text"
              name="nom"
              value={genreData.nom}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold text-red-700 capitalize">Description</label>
            <input
              type="text"
              name="description"
              value={genreData.description}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {currentGenre ? 'Update Genre' : 'Add Genre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGenreModal;
