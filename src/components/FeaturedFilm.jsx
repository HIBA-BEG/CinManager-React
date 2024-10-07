import React from "react";


export default function FeaturedFilm() {
    
    return (
        <div className="featured-film" style={{ backgroundImage: "url('./images/monsters2.jpg')" }}>
            <div className="featured-content">
                <h2 className="featured-title">Monsters, INC.</h2>
                <p className="featured-description">Animated film that explores the world of Monstropolis, where monsters generate their city's power by scaring children at night.</p>
                <button className="btn btn-primary">Reserve</button>
                <button className="btn btn-secondary">Details</button>
            </div>
        </div>
    );
}