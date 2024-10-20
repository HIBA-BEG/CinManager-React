import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../services/ReservationServices';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const MyReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getUserReservations();
                setReservations(data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-red-500 p-4">{error}</p>;
    }

    return (
        console.log(reservations),
        <div>
            <Header />
                <h1 className="text-3xl text-center text-white font-bold mb-6">My Reservations</h1>
                <div className="mx-auto flex items-center justify-center px-8 py-8">

                {reservations.length === 0 ? (
                    <p className='text-center text-2xl text-red-600 font-bold'>You have no reservations. <br /> Stop thinking about it and book a movie now!!! </p>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-6xl">
                        {reservations.map((reservation) => (
                            <div key={reservation._id} className="flex flex-col w-full bg-white rounded shadow-lg">
                                <div className="w-full h-64 bg-center bg-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_MINIO_PATH}${reservation.seance.film.affiche})` }}></div>
                                <div className="flex flex-col w-full md:flex-row">
                                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                                        <div className="md:text-3xl">{new Date(reservation.seance.date).toLocaleString('default', { month: 'short' })}</div>
                                        <div className="md:text-6xl">{new Date(reservation.seance.date).getDate()}</div>
                                        <div className="md:text-xl">From {reservation.seance.heure_debut} - to {reservation.seance.heure_fin}</div>
                                    </div>
                                    <div className="p-4 font-normal text-gray-800 md:w-3/4">
                                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{reservation.seance.film.titre}</h1>
                                        <div className="mt-4 text-gray-700">
                                            Status: {reservation.statut}d
                                        </div>
                                        <div className="flex flex-row items-center mt-4 text-gray-700">
                                            <div className="w-1/2">
                                                Room: {reservation.seance.salle.nom}
                                            </div>
                                            <div className="w-1/2 flex justify-end">
                                                Seats: {reservation.sieges.map(seat => seat.numero).join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
        </div>
    );
};

export default MyReservationsPage;

