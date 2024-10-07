import React, { useEffect, useState } from 'react';
import { getAllSeances } from '../services/SeanceServices';
import SeanceCard from './SeanceCard';
import LoadingSpinner from './LoadingSpinner';

const SeanceList = () => {
    const [seances, setSeances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const seanceData = await getAllSeances();
                // console.log(seanceData);
                setSeances(seanceData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching seances.');
                setLoading(false);
            }
        };
        fetchSeances();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="film-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {seances.length > 0 ? (
                seances.map((seance) => (
                    // console.log(seance._id),
                    <SeanceCard
                        key={seance._id}
                        film={seance.film}        
                        date={seance.date}        
                        time={seance.heure_debut} 
                        salle={seance.salle}      
                    />
                ))
            ) : (
                <p className='text-3xl font-semibold text-center my-8'>No seances available at the moment.</p>
            )}
        </div>
    );
};

export default SeanceList;
