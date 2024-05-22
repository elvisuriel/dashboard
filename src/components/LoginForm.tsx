import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Agrega useEffect para verificar si ya hay un usuario autenticado al cargar la página
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
            }
        });

        return () => unsubscribe();
    }, []); // Asegúrate de que useEffect solo se ejecute una vez al cargar el componente


    return (
        <div className="max-w-sm mx-auto p-6 bg-white text-gray-900 rounded shadow-md">
            <form onSubmit={handleLogin}>
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
                    type="submit"
                >
                    Iniciar Sesión
                </button>
            </form>
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
