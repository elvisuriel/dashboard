import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Aquí puedes redirigir al usuario al dashboard o realizar otras acciones
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white text-gray-900 rounded shadow-md">
            <input
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>
            <p className="text-center">
                ¿No tienes una cuenta?{' '}
                <button
                    className="text-blue-500 underline"
                    onClick={() => navigate('/signup')}
                >
                    Regístrate
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
