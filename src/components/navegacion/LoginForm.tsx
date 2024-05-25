import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import FormCard from './FormCard';


interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Verificar si ya hay un usuario autenticado al cargar la página
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
            }
        });

        return () => unsubscribe();
    }, [navigate]); // Asegúrate de que useEffect solo se ejecute una vez al cargar el componente

    const handleRegisterClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <FormCard
            title="Iniciar Sesión"
            onSubmit={handleSubmit(handleLogin)}
            submitButtonText="Iniciar Sesión"
            Steps={[(
                <>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            type="email"
                            placeholder="Correo Electrónico"
                            {...register('email', { required: 'El correo electrónico es requerido' })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            type="password"
                            placeholder="Contraseña"
                            {...register('password', { required: 'La contraseña es requerida' })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                </>
            )]}
            StepsCount={0}
            setStepsCount={() => { }} // Placeholder, no necesario para este formulario
            stepOrderValidation={() => Promise.resolve(true)} // Placeholder, no necesario para este formulario
            footer={(
                <p className="text-center">
                    ¿No tienes una cuenta?{' '}
                    <button
                        className="text-blue-500 underline"
                        onClick={handleRegisterClick}
                    >
                        Regístrate
                    </button>
                </p>
            )}
        />
    );
};

export default LoginForm;
