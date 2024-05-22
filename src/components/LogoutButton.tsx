import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 px-4 rounded">
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
