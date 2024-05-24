import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth, createUserWithEmailAndPassword } from '../../config/firebaseConfig';
import FormCard from './FormCard';

interface SignUpFormInputs {
    email: string;
    password: string;
}

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

    const handleSignUp: SubmitHandler<SignUpFormInputs> = async (data) => {
        try {
            // Crea un nuevo usuario en Firebase Authentication
            await createUserWithEmailAndPassword(auth, data.email, data.password);

            // Restablece los campos de entrada después de registrar al usuario
            resetForm();
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const resetForm = () => {
        // Puedes definir aquí el código para restablecer el estado del formulario si es necesario
    };

    return (
        <FormCard
            title="Regístrate"
            onSubmit={handleSubmit(handleSignUp)}
            submitButtonText="Registrarse"
            Steps={[(
                <>
                    <input
                        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        type="email"
                        placeholder="Correo Electrónico"
                        {...register('email', { required: 'El correo electrónico es requerido' })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}

                    <input
                        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                        type="password"
                        placeholder="Contraseña"
                        {...register('password', { required: 'La contraseña es requerida' })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </>
            )]}
            StepsCount={0}
            setStepsCount={() => { }} // Placeholder, no necesario para este formulario
            stepOrderValidation={() => Promise.resolve(true)} // Placeholder, no necesario para este formulario
            footer={(
                <p className="text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/" className="text-blue-500 underline">Iniciar Sesión</Link>
                </p>
            )}
        />
    );
};

export default SignUpForm;
