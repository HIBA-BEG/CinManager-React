import React, { useState, useEffect } from 'react';
import { addSalle, updateSalle } from '../../services/SalleServices';

const AddSalleModal = ({ onClose, onAddSalle, currentSalle, onUpdateSalle }) => {
  const [salleData, setSalleData] = useState({
    nom: '',
    capacite: '',
    type: 'Standard',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentSalle) {
      setSalleData(currentSalle);
    }
  }, [currentSalle]);

  const handleInputChange = (e) => {
    setSalleData({ ...salleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (currentSalle) {
        const updatedSalle = await updateSalle(currentSalle._id, salleData);
        onUpdateSalle(updatedSalle);
      } else {
        const newSalle = await addSalle(salleData);
        onAddSalle(newSalle);
      }
      onClose();
    } catch (error) {
      console.error('Error saving salle:', error);
      setError(error.response?.data?.message || 'An error occurred while saving the salle');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md m-4">
        <h2 className="text-red-700 text-4xl font-bold text-center mb-6">
          {currentSalle ? 'Edit Salle' : 'Add New Salle'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom" className="block mb-1 font-semibold text-red-700 capitalize">Nom</label>
            <input
              type="text"
              name="nom"
              value={salleData.nom}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="capacite" className="block mb-1 font-semibold text-red-700 capitalize">Capacité</label>
            <input
              type="number"
              name="capacite"
              value={salleData.capacite}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="type" className="block mb-1 font-semibold text-red-700 capitalize">Type</label>
            <input
              type="text"
              name="type"
              value={salleData.type}
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
              {currentSalle ? 'Update Salle' : 'Add Salle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalleModal;
