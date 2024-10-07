import React from "react";

export default function FilmCard({titre , id ,genre , duree , description, affiche}) {
    // console.log(affiche);
    return (
        <>
        <div key={id} className="film-card">
            {/* <p>Genre: {genre}</p>
            <p>Duration: {duree}</p>
            <p>Description: {description}</p> */}
                        
            {affiche ? (
                <img src={affiche} alt={titre} className="film-poster" />
            ) : (
                <p>No image available</p>
            )}
            <p className="film-title">{titre}</p>

        </div>
        </>
       
    );
}