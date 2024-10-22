import React from 'react';

const FilmCard = ({ titre, producer, dateSortie, genre, duree, affiche }) => {
    const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${affiche}`;
    return (
        <div className="bg-gray-800 rounded-lg p-4 w-full max-w-xs flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
                <img
                    src={afficheUrl}
                    alt={`${titre} poster`}
                    className=" h-96 object-cover rounded-lg"
                />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl text-center font-semibold text-white">{titre}</h3>
                <p>Producer: {producer}</p>
                <p>Release Date: {new Date(dateSortie).toLocaleDateString()}</p>
                <p className="text-xl font-semibold">Genre:
                    <span className="font-normal text-lg">
                        {Array.isArray(genre)
                            ? genre.map(g => g.nom).join(', ')
                            : 'No genres available'}
                    </span>
                </p>
                <p>Duration: {duree}</p>
            </div>
        </div>
    );
};

export default FilmCard;
