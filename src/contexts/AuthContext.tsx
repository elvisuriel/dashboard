// src/contexts/AuthContext.tsx
import { createContext, useContext } from 'react';

interface AuthContextProps {
    currentUser: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;