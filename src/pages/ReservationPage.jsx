import React, { useEffect, useState } from 'react';
import { getAvailableSeats, confirmReservation } from '../services/ReservationServices';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ReservePage = () => {
    const { seanceId } = useParams();
    const navigate = useNavigate();
    const [availableSeats, setAvailableSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                if (seanceId) {
                    const data = await getAvailableSeats(seanceId, token);
                    setAvailableSeats(data.availableSeats);
                } else {
                    console.error("Seance ID is missing");
                }
            } catch (error) {
                console.error("Error fetching available seats:", error);
            }
        };
        fetchSeats();
    }, [seanceId]);

    const toggleSeatSelection = (seatNumber) => {
        setSelectedSeats((prevSelected) =>
            prevSelected.includes(seatNumber)
                ? prevSelected.filter((seat) => seat !== seatNumber)
                : [...prevSelected, seatNumber]
        );
    };

    const handleConfirmReservation = async () => {
        try {
            await confirmReservation(seanceId, selectedSeats);
            // alert("Reservation confirmed!");
            navigate('/reservations');
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };

    return (
        <div>
<Header/>
            <div className="p-4">
                <h2 className="text-4xl font-bold text-center my-8">Select Your Seats</h2>
                <div className="grid grid-cols-6 gap-4 mb-8">
                    {availableSeats.map((seatNumber) => (
                        <div
                            key={seatNumber}
                            className={`p-4 borderz text-center text-red-800 font-semibold cursor-pointer rounded-lg 
                        ${selectedSeats.includes(seatNumber) ? 'bg-red-800 text-gray-300 ' : 'bg-gray-200'}`}
                            onClick={() => toggleSeatSelection(seatNumber)}>
                            {seatNumber}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleConfirmReservation}
                    className="btn btn-primary"
                    disabled={selectedSeats.length === 0}>
                    Confirm Reservation
                </button>
            </div>
        </div>

    );
};

export default ReservePage;
