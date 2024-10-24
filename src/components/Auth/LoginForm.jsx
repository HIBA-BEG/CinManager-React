import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/AuthServices';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);
        const credentials = { email, password };

        
        try {
            const { user } = await loginUser(credentials);

            if (user.archived_user) {
                setError('Your account has been deleted. Please contact the administrator.');
                return;
            }

            if (user.type === 'Administrateur') {
                navigate('/admin');  
            } else if (user.type === 'Client') {
                navigate('/MyReservations'); 
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
                <h1 className="text-red-700 text-4xl font-bold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-center mb-4 font-bold text-xl">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-semibold text-red-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 w-full text-black border rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 font-semibold text-red-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 w-full border rounded text-black focus:outline-none focus:ring-2 focus:ring-red-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-800 text-white p-2 rounded hover:bg-black transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-black text-center">
                    Don't have an account? <Link to="/register" className="text-red-800 font-semibold hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;