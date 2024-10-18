import React from 'react';

const SalleCard = ({ _id, nom, capacite, type, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this salle?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
      <h3 className="text-lg font-semibold text-white">{nom}</h3>
      <p className="text-gray-400">Capacité: {capacite}</p>
      <p className="text-gray-400">Type: {type}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(_id)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SalleCard;
