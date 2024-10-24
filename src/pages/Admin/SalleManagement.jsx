import React, { useState, useEffect } from 'react';
import { getAllSalles, deleteSalle } from '../../services/SalleServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import SalleCard from '../../components/Admin/SalleCard';
import AddSalleModal from '../../components/Admin/AddSalleModal';
import { PlusIcon } from 'lucide-react';

const SalleManagement = () => {
  const [salles, setSalles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentSalle, setCurrentSalle] = useState(null);

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

  const handleUpdateSalle = (updatedSalle) => {
    setSalles(salles.map(salle => 
      salle._id === updatedSalle._id ? updatedSalle : salle
    ));
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
    const salleToEdit = salles.find(salle => salle._id === id);
    setCurrentSalle(salleToEdit);
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setCurrentSalle(null);
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
          className="border-4 border-red-700 rounded-full p-2"
        >
          <PlusIcon className="m-2 text-red-700 font-bold text-7xl " />
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
          onClose={handleModalClose}
          onAddSalle={handleAddSalle}
          onUpdateSalle={handleUpdateSalle}
          currentSalle={currentSalle}
        />
      )}
    </div>
  );
};

export default SalleManagement;
