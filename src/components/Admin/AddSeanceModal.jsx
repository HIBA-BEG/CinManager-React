import React, { useState, useEffect } from 'react';
import { addSeance } from '../../services/SeanceServices';
import { getAllFilms } from '../../services/FilmServices';
import { getAllSalles } from '../../services/SalleServices';

const AddSeanceModal = ({ onClose, onAddSeance }) => {
  const [seanceData, setSeanceData] = useState({
    film: '',
    salle: '',
    date: '',
    heure_debut: '',
    heure_fin: '',
    tarif: '',
    placesDisponibles: '',
  });
  const [films, setFilms] = useState([]);
  const [salles, setSalles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFilms();
    fetchSalles();
  }, []);

  const fetchFilms = async () => {
    try {
      const fetchedFilms = await getAllFilms();
      setFilms(fetchedFilms);
    } catch (error) {
      console.error('Error fetching films:', error);
      setError('Failed to fetch films. Please try again.');
    }
  };

  const fetchSalles = async () => {
    try {
      const fetchedSalles = await getAllSalles();
      setSalles(fetchedSalles);
    } catch (error) {
      console.error('Error fetching salles:', error);
      setError('Failed to fetch salles. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setSeanceData({ ...seanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const newSeance = await addSeance(seanceData);
      onAddSeance(newSeance);
      onClose();
    } catch (error) {
      console.error('Error adding new seance:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the seance');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md m-4">
        <h2 className="text-red-700 text-4xl font-bold text-center mb-6">Add New Seance</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="film" className="block mb-1 font-semibold text-red-700 capitalize">Film</label>
            <select
              name="film"
              value={seanceData.film}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option value="">Select a film</option>
              {films.map(film => (
                <option key={film._id} value={film._id}>{film.titre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="salle" className="block mb-1 font-semibold text-red-700 capitalize">Salle</label>
            <select
              name="salle"
              value={seanceData.salle}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option value="">Select a salle</option>
              {salles.map(salle => (
                <option key={salle._id} value={salle._id}>{salle.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block mb-1 font-semibold text-red-700 capitalize">Date</label>
            <input
              type="date"
              name="date"
              value={seanceData.date}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="heure_debut" className="block mb-1 font-semibold text-red-700 capitalize">Heure de début</label>
            <input
              type="time"
              name="heure_debut"
              value={seanceData.heure_debut}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="heure_fin" className="block mb-1 font-semibold text-red-700 capitalize">Heure de fin</label>
            <input
              type="time"
              name="heure_fin"
              value={seanceData.heure_fin}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div>
            <label htmlFor="tarif" className="block mb-1 font-semibold text-red-700 capitalize">Tarif</label>
            <input
              type="number"
              name="tarif"
              value={seanceData.tarif}
              onChange={handleInputChange}
              required
              className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn  btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Seance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeanceModal;
