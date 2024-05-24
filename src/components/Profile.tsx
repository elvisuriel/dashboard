import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebaseConfig';
import Swal from 'sweetalert2';
import Loader from './Loader';

const Profile: React.FC = () => {
    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editing, setEditing] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        if (currentUser) {
            const userRef = ref(database, 'users/' + currentUser.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setName(userData.name);
                    setPhone(userData.phone);
                    setAddress(userData.address);
                    setImageUrl(userData.imageUrl);
                }
                setLoading(false); // Oculta el loader una vez que los datos se han cargado
            }).catch((error) => {
                console.error(error);
                setLoading(false); // Oculta el loader si hay un error
            });
        }
    }, [currentUser]);

    const handleSave = async () => {
        if (currentUser) {
            const userRef = ref(database, 'users/' + currentUser.uid);
            try {
                await set(userRef, {
                    name,
                    phone,
                    address,
                    imageUrl,
                    email: currentUser.email
                });
                Swal.fire({
                    title: '¡Datos actualizados!',
                    text: 'Los datos se han agregado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                setSuccess('Profile updated successfully!');
                setError('');
                setEditing(false);
            } catch (error: any) {
                setError(error.message);
                setSuccess('');
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full ring-2 ring-gray-300"
                />
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    {editing ? (
                        <button className="bg-blue-500 text-white px-8 py-2 my-2 rounded-md" onClick={handleSave}>Guardar</button>
                    ) : (
                        <button className="bg-blue-500 text-white px-8 py-2 my-2 rounded-md" onClick={() => setEditing(true)}>Editar</button>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                ) : (
                    <span className="block">{name}</span>
                )}
                <label className="block text-sm font-medium text-gray-700">Phone:</label>
                {editing ? (
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                ) : (
                    <span className="block">{phone}</span>
                )}
                <label className="block text-sm font-medium text-gray-700">Address:</label>
                {editing ? (
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                ) : (
                    <span className="block">{address}</span>
                )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Profile;
