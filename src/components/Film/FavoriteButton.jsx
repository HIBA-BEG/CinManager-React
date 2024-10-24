import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { addFavoris, deleteFavoris, checkFavorite } from '../../services/FavorisService';

const FavoriteButton = ({ filmId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const result = await checkFavorite(filmId);
                console.log("isFavorite?", result);
                setIsFavorite(result);
            } catch (error) {
                console.error('Error checking favorite status:', error);
            }
        };
        checkIfFavorite();
    }, [filmId]);


    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await deleteFavoris(filmId);
                setIsFavorite(false);
            } else {
                await addFavoris(filmId);
                setIsFavorite(true);
            }
            console.log("isFavorite?", isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
        >
            <FaHeart className={`text-4xl }`}
            color={isFavorite ? "#B91C1C" : 'gray'} />
        </button>
    );
};

export default FavoriteButton;
