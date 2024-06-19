import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { getCurrentUser } from '../services/authService';

interface AuthContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

interface User {
    token: string;
    // Add other user properties here if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
