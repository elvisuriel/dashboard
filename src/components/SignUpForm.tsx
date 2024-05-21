import React, { useState } from 'react';
import { database, createUserWithEmailAndPassword } from '../config/firebaseConfig';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            // Crea un nuevo usuario en Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);

            // Agrega información adicional del usuario a la base de datos
            await database.ref('users').push({
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
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Registrarse</button>
        </div>
    );
};

export default SignUpForm;
