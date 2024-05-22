import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebaseConfig';


const Profile = () => {
    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editing, setEditing] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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
            }).catch((error) => {
                console.error(error);
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
                setSuccess('Profile updated successfully!');
                setError('');
                setEditing(false);
            } catch (error: any) {
                setError(error.message);
                setSuccess('');
            }
        }
    };

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
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setEditing(true)}>Edit</button>
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
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default Profile;
