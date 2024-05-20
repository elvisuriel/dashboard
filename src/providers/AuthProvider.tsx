// src/providers/AuthProvider.tsx
import React, { useEffect, useState } from 'react';
import { auth } from '../config/FirebaseConfig';
import AuthContext from '../contexts/AuthContext';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const login = async (email: string, password: string) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
