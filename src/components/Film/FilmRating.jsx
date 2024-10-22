import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { getAverageRatingForFilm, createRating, updateRating, getUserRatingForFilm } from '../../services/RatingServices';
import { isAuthenticated, getUser } from '../../services/AuthServices';

const FilmRating = ({ filmId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);
  const authenticated = isAuthenticated();
  const user = authenticated ? getUser() : null;

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avgRating = await getAverageRatingForFilm(filmId);
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    const fetchUserRating = async () => {
      if (!authenticated || !user) return;
      try {
        const ratingData = await getUserRatingForFilm(filmId);
        setUserRating(ratingData.score);
      } catch (error) {
        console.error('Error fetching user rating:', error);
        setUserRating(0);
      }
    };

    fetchAverageRating();
    fetchUserRating();
  }, [filmId, authenticated, user]);

  const handleRating = async (ratingValue) => {
    if (!authenticated || !user) return;
    try {
      if (userRating === 0) {
        await createRating({ filmId: filmId, score: ratingValue });
      } else {
        await updateRating(filmId, { score: ratingValue });
      }
      setUserRating(ratingValue);
      const newAvgRating = await getAverageRatingForFilm(filmId);
      setAverageRating(newAvgRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-32 justify-center items-center my-4">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              {authenticated ? (
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => handleRating(ratingValue)}
                />
              ) : null}
              <FaStar
                className={`text-2xl ${authenticated ? 'cursor-pointer' : ''}`}
                color={
                  authenticated && hover
                    ? ratingValue <= hover
                      ? "#ffc107"
                      : "#e4e5e9"
                    : ratingValue <= (authenticated ? userRating : averageRating)
                      ? "#B91C1C"
                      : "#e4e5e9"
                } onMouseEnter={() => authenticated && setHover(ratingValue)}
                onMouseLeave={() => authenticated && setHover(null)}
              />
            </label>
          );
        })}
        <span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default FilmRating;
