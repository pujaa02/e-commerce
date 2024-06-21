import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { getCurrentUser } from './authService';

interface AuthContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

interface User {
    token: string;
    user_id: number;
    msg: string;
    name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const saveCurrentUser = (user: User | null) => {
        setCurrentUser(user);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser: saveCurrentUser }}>
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
