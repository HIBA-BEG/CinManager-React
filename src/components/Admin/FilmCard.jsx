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
            <div className="space-y-2 font-semibold text-gray-400">
                <h3 className="text-3xl text-center font-semibold text-white">{titre}</h3>
                <p>Producer: <span className="font-normal text-white">{producer}</span></p>
                <p>Release Date: <span className="font-normal text-white">{new Date(dateSortie).toLocaleDateString()}</span></p>
                <p className="text-xl font-semibold">Genre:
                    <span className="font-normal text-lg text-white">
                        {Array.isArray(genre)
                            ? genre.map(g => g.nom).join(', ')
                            : 'No genres selected'}
                    </span>
                </p>
                <p>Duration: <span className="font-normal text-white">{duree}</span></p>
            </div>
        </div>
    );
};

export default FilmCard;
