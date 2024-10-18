import React from 'react';

const SeanceCard = ({ _id, film, salle, date, heure_debut, heure_fin, tarif, placesDisponibles, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this seance?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
      <h3 className="text-lg font-semibold text-white">Film ID: {film.titre}</h3>
      <p className="text-gray-400">Salle: {salle.nom}</p>
      <p className="text-gray-400">Date: {new Date(date).toLocaleDateString()}</p>
      <p className="text-gray-400">Time: {heure_debut} - {heure_fin}</p>
      <p className="text-gray-400">Tarif: {tarif}</p>
      <p className="text-gray-400">Places disponibles: {placesDisponibles}</p>
      <button
        onClick={handleDelete}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default SeanceCard;

