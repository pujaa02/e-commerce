import React from 'react';
import { logout } from '../authcontext/authService';
import { useAuth } from '../authcontext/AuthContext';

const Logout: React.FC = () => {
    const { setCurrentUser } = useAuth();

    const handleLogout = () => {
        logout();
        setCurrentUser(null);
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
