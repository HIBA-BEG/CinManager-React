import React, { useState } from 'react';
import { addSalle } from '../../services/SalleServices';

const AddSalleModal = ({ onClose, onAddSalle }) => {
  const [salleData, setSalleData] = useState({
    nom: '',
    capacite: '',
    type: 'Standard',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSalleData({ ...salleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const newSalle = await addSalle(salleData);
      onAddSalle(newSalle);
      onClose();
    } catch (error) {
      console.error('Error adding new salle:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the salle');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md m-4">
        <h2 className="text-red-700 text-4xl font-bold text-center mb-6">Add New Salle</h2>
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
            <select
              name="type"
              value={salleData.type}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Salle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalleModal;
