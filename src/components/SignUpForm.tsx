import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import { getDatabase, ref, push } from 'firebase/database';
import { auth, createUserWithEmailAndPassword } from '../config/firebaseConfig';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            // Crea un nuevo usuario en Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);

            // Obtiene una referencia a la base de datos
            const database = getDatabase();

            // Agrega información adicional del usuario a la base de datos
            await push(ref(database, 'users'), {
                email: email,
                // Otros datos del usuario, como nombre, dirección, etc.
            });

            // Restablece los campos de entrada después de registrar al usuario
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Regístrate</h2>
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
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleSignUp}
            >
                Registrarse
            </button>
            <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/" className="text-blue-500 underline">Iniciar Sesión</Link>
            </p>
        </div>
    );
};

export default SignUpForm;
