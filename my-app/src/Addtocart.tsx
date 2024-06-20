import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Activate from "./Components/Password/Activate";
import Password from "./Components/Password/Password";
import Wrong from "./Components/wrongurl/Wrong";
import ForgetPass from "./Components/forgetpassword/ForgetPass";
import Home from "./Components/homepage/Home";
import Cart from "./Components/homepage/Cart";
import { AuthProvider, useAuth } from './Components/authcontext/AuthContext';
import { ProtectedRouteProps } from "./Components/interfacefile";



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { currentUser } = useAuth();
    console.log(currentUser?.user_id, "curentuserrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    return (currentUser?.user_id) ? <Component /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/activate/:actcode" element={<Activate />}></Route>
                    <Route path="/password" element={<Password />}></Route>
                    <Route path="/forget" element={<ForgetPass />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="*" element={<Wrong />}></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
};

export default App;


import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { getCurrentUser } from './authService';

interface AuthContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

interface User {
    token: string;
    user_id: number;
    msg: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const user = getCurrentUser();
        console.log(user, "user");
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    console.log(currentUser, "curuserofauthcontextpage");

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    console.log(context, "context");

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


