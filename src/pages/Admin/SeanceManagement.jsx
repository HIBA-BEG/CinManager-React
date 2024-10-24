import React, { useState, useEffect } from 'react';
import { getAllSeances, deleteSeance } from '../../services/SeanceServices';
import { getFilmById } from '../../services/FilmServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import SeanceCard from '../../components/Admin/SeanceCard';
import AddSeanceModal from '../../components/Admin/AddSeanceModal';
import { PlusIcon } from 'lucide-react';

const SeanceManagement = () => {
  const [seances, setSeances] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchSeances();
  }, []);

  const fetchSeances = async () => {
    try {
      const seanceData = await getAllSeances();
      console.log('Fetched seance data:', seanceData); 

      const seancesWithFilmDetails = await Promise.all(
        seanceData.map(async (seance) => {
          try {
            if (typeof seance.film === 'object' && seance.film.titre) {
              return { ...seance, filmTitle: seance.film.titre };
            }

            // If it's an ID, fetch the film details
            const filmId = typeof seance.film === 'object' ? seance.film._id : seance.film;
            console.log('Fetching film details for ID:', filmId); // Log the film ID
            const filmDetails = await getFilmById(filmId);
            return { ...seance, filmTitle: filmDetails.titre };
          } catch (error) {
            console.error('Error fetching film details:', error);
            return { ...seance, filmTitle: 'Unknown Film' };
          }
        })
      );

      setSeances(seancesWithFilmDetails);
    } catch (error) {
      console.error('Error fetching seance details:', error);
      setError('Error fetching seance details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSeance = (newSeance) => {
    setSeances([...seances, newSeance]);
    setIsAddModalOpen(false);
  };

  const handleDeleteSeance = async (id) => {
    try {
      await deleteSeance(id);
      setSeances(seances.filter(seance => seance._id !== id));
    } catch (error) {
      console.error('Error deleting seance:', error);
      setError('Error deleting seance.');
    }
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
        <h1 className="text-4xl font-bold">Seance Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="border-4 border-red-700 rounded-full p-2"
        >
          <PlusIcon className="m-2 text-red-700 font-bold text-7xl " />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {seances.map((seance) => (
          <SeanceCard
            key={seance._id}
            {...seance}
            onDelete={handleDeleteSeance}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <AddSeanceModal
          onClose={() => setIsAddModalOpen(false)}
          onAddSeance={handleAddSeance}
        />
      )}
    </div>
  );
};

export default SeanceManagement;
