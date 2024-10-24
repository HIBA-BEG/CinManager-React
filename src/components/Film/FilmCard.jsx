import React from "react";

export default function FilmCard({titre , id ,genres , duree , description, affiche}) {
    // console.log(affiche);
    const afficheUrl = `${process.env.REACT_APP_MINIO_PATH}${affiche}`;
    return (
        <>
        <div key={id} className="film-card">
            {/* <p>Genre: {genre}</p>
            <p>Duration: {duree}</p>
            <p>Description: {description}</p> */}
                        
            {affiche ? (
                <img src={afficheUrl} alt={titre} className="film-poster" />
            ) : (
                <p>No image available</p>
            )}
            <p className="film-title">{titre}</p>
            {/* <p className="text-sm text-gray-600">{genres}</p> */}

        </div>
        </>
       
    );
}