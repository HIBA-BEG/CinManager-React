import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const SeanceCard = ({ _id, film, salle, date, heure_debut, heure_fin, tarif, placesDisponibles, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this seance?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-gray-800 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
      <div className="flex flex-col text-gray-400 font-semibold justify-between">
        <h3>Film: <span className="font-normal text-white">{film.titre}</span></h3>
        <p>Salle: <span className="font-normal text-white">{salle.nom}</span> </p>
        <p>Date: <span className="font-normal text-white">{new Date(date).toLocaleDateString()}</span></p>
        <p>Time: <span className="font-normal text-white">{heure_debut} - {heure_fin}</span></p>
        <p>Tarif: <span className="font-normal text-white">{tarif}</span></p>
        <p>Places disponibles: <span className="font-normal text-white">{placesDisponibles}</span></p>
      </div>
      <div className="flex flex-col justify-between">
        <button
          // onClick={}
          className="text-2xl ml-1 hover:text-green-500 text-green-700"
        >
          <FaRegEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-3xl hover:text-red-400 text-red-700"
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default SeanceCard;

