import React, { useState, useEffect } from 'react';
import { getAllSalles, deleteSalle } from '../../services/SalleServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import SalleCard from '../../components/Admin/SalleCard';
import AddSalleModal from '../../components/Admin/AddSalleModal';

const SalleManagement = () => {
  const [salles, setSalles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchSalles();
  }, []);

  const fetchSalles = async () => {
    try {
      const salleData = await getAllSalles();
      setSalles(salleData);
    } catch (error) {
      console.error('Error fetching salle details:', error);
      setError('Error fetching salle details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalle = (newSalle) => {
    setSalles([...salles, newSalle]);
    setIsAddModalOpen(false);
  };

  const handleDeleteSalle = async (id) => {
    try {
      await deleteSalle(id);
      setSalles(salles.filter(salle => salle._id !== id));
    } catch (error) {
      console.error('Error deleting salle:', error);
      setError('Error deleting salle.');
    }
  };

  const handleEditSalle = (id) => {
    // Implement edit functionality
    console.log('Edit salle with id:', id);
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
        <h1 className="text-4xl font-bold">Salle Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Salle
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {salles.map((salle) => (
          <SalleCard
            key={salle._id}
            {...salle}
            onDelete={handleDeleteSalle}
            onEdit={handleEditSalle}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <AddSalleModal
          onClose={() => setIsAddModalOpen(false)}
          onAddSalle={handleAddSalle}
        />
      )}
    </div>
  );
};

export default SalleManagement;
