import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const SalleCard = ({ _id, nom, capacite, type, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this salle?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-gray-800 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white">{nom}</h3>
        <p className="text-gray-400">Capacité: {capacite}</p>
        <p className="text-gray-400">Type: {type}</p>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={() => onEdit(_id)}
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

export default SalleCard;
