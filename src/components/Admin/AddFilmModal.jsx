import React, { useEffect, useState } from 'react';
import { addFilm, getAllGenres } from '../../services/FilmServices';
import LoadingSpinner from '../LoadingSpinner';

const AddFilmModal = ({ onClose, onAddFilm }) => {
    const [filmData, setFilmData] = useState({
        titre: '',
        genre: [],
        affiche: '',
        duree: '',
        description: '',
        dateSortie: '',
        producer: '',
        status: 'Private',
        video: '',
        isStreamed: '',
        releaseStreamDate: '',
    });
        
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const fetchedGenres = await getAllGenres();
                console.log(fetchedGenres);
                setGenres(fetchedGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleInputChange = (e) => {
        setFilmData({ ...filmData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFilmData({ ...filmData, [e.target.name]: e.target.checked });
    };

    const handleFileChange = (e) => {
        setFilmData({ ...filmData, [e.target.name]: e.target.files?.[0].name });
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
        setFilmData(filmData => ({ ...filmData, genre: selectedGenres }));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <p className="text-red-500 text-center mb-4">{error}</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newFilm = await addFilm(filmData);
            onAddFilm(newFilm);
            onClose();
        } catch (error) {
            console.error('Error adding new film:', error);
            setError(error.message || 'An error occurred while adding the film');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-red-700 text-4xl font-bold text-center mb-6">Add New Film</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {/* <div className='flex flex-col'> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>


                            <label htmlFor="titre" className="block mb-1 font-semibold text-red-700 capitalize">Title</label>
                            <input
                                type="text"
                                name="titre"
                                placeholder="Title"
                                value={filmData.titre}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                                required
                            />

                        </div>
                        <div>
                            <label htmlFor="genre" className="block mb-1 font-semibold text-red-700 capitalize">Genre</label>
                            <select
                                name="genre"
                                multiple
                                value={filmData.genre}
                                onChange={handleGenreChange}
                                required
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            >
                                {genres.map(genre => (
                                    <option key={genre._id} value={genre._id}>{genre.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="affiche" className="block mb-1 font-semibold text-red-700 capitalize">Affiche</label>
                            <input
                                type="file"
                                name="affiche"
                                onChange={handleFileChange}
                                accept="image/*"
                                required
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="duree" className="block mb-1 font-semibold text-red-700 capitalize">Duration</label>
                            <input
                                type="text"
                                name="duree"
                                placeholder="Duration"
                                value={filmData.duree}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-1 font-semibold text-red-700 capitalize">Description</label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={filmData.description}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateSortie" className="block mb-1 font-semibold text-red-700 capitalize">Release Date</label>
                            <input
                                type="date"
                                name="dateSortie"
                                value={filmData.dateSortie}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="producer" className="block mb-1 font-semibold text-red-700 capitalize">Producer</label>
                            <input
                                type="text"
                                name="producer"
                                placeholder="Producer"
                                value={filmData.producer}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block mb-1 font-semibold text-red-700 capitalize">Status</label>
                            <select
                                name="status"
                                value={filmData.status}
                                onChange={handleInputChange}
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                                required
                            >
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="video" className="block mb-1 font-semibold text-red-700 capitalize">Video URL (optional)</label>
                            <input
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                accept="video/*"
                                className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="isStreamed" className="block mb-1 font-semibold text-red-700 capitalize">Is Streamed</label>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="isStreamed"
                                    checked={filmData.isStreamed}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label htmlFor="isStreamed">Is Streamed</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="releaseStreamDate" className="block mb-1 font-semibold text-red-700 capitalize">Release Stream Date</label>
                            {filmData.isStreamed && (
                                <input
                                    type="datetime-local"
                                    name="releaseStreamDate"
                                    value={filmData.releaseStreamDate}
                                    onChange={handleInputChange}
                                    className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Add Film
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFilmModal;
