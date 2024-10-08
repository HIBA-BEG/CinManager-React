import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/AuthServices';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (Object.values(formData).some(field => field === '')) {
            setError('Please fill in all fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);
        const userData = { ...formData, numero_telephone: formData.phone, adresse: formData.address };

        try {
            await registerUser(userData);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-red-700 text-4xl font-bold text-center mb-6">Register</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {['nom', 'prenom', 'email', 'password', 'phone', 'address'].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block mb-1 font-semibold text-red-700 capitalize">
                            {field === 'phone' ? 'Phone Number' : field}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                            placeholder={`Enter your ${field === 'phone' ? 'phone number' : field}`}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-red-800 text-white p-2 rounded hover:bg-black transition duration-200"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-black text-center">
                Already have an account? <Link to="/login" className="text-red-800 font-semibold hover:underline">Login here</Link>
            </p>
        </div>
        </div>
    );
};

export default RegisterForm;