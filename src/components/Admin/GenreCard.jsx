import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const GenreCard = ({ _id, nom, description, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-gray-800 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
      <div className="flex flex-col justify-between text-gray-400 font-semibold">
        <h3>Genre: <span className="font-normal text-white">{nom}</span></h3>
        <p>Description: <span className="font-normal text-white">{description}</span></p>
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

export default GenreCard;
