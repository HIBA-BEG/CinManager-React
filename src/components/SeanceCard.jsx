import React from 'react';

const SeanceCard = ({ film, date, time, salle }) => {
    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg mb-4">

            <h3 className="text-xl font-bold text-center mb-2">{film ? film.titre : 'Untitled Movie'}</h3>
            <img
                src={film.affiche}
                alt={film.titre}
                className="rounded-lg h-96 shadow-md mb-4 md:mb-0"
            />
            <p className="text-lg">Date: <span className="font-semibold">{new Date(date).toLocaleDateString()}</span></p>
            <p className="text-lg">Time: <span className="font-semibold">{time}</span></p>
            <p className="text-lg">Salle: <span className="font-semibold">{salle ? salle.nom : 'Unknown Salle'}</span></p>

            <button>Reserve</button>
        </div>
    );
};


export default SeanceCard;