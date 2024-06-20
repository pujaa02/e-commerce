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


import axios from "axios";

export const getUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.token) {
    throw new Error('No user logged in');
  }
  const response = await axios.get(`http://localhost:3036/user`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const result = await axios.get(`http://localhost:3036/checkuser/${email}/${password}`, { withCredentials: true });
  if (result.data.token) {
    localStorage.setItem("user", JSON.stringify(result.data));
  }
  return result.data;
};
export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || '{}');
};


import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
// import axios from "axios";
import { LoginData } from "../interfacefile";
import { Validatelogin } from "../interfacefile";
import { login } from "../authcontext/authService";
import { useAuth } from "../authcontext/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();
  const [validaterr, setValidateerr] = useState<Validatelogin>({
    mail: "",
    pass: ""
  })
  const [LoginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateform = (data: LoginData) => {
    const validaterr: Validatelogin = {
      pass: "",
      mail: ""
    };
    if (!data.password) {
      validaterr.pass = 'Password is required';
    }
    if (!data.email) {
      validaterr.mail = 'Email is required';
    }
    return validaterr;
  }
  const handleSubmit = async () => {
    const newerrors: Validatelogin = validateform(LoginData);
    setValidateerr(newerrors);
    if (newerrors.mail.length === 0 && newerrors.pass.length === 0) {
      const result = await login(LoginData.email, LoginData.password);
      console.log(result.user_id, "result");
      if (result.msg === "Success") {
        setCurrentUser(result);
        navigate("/cart");
      } else if (result.msg === "wrong Data") {
        setError("wrong Data!!")
      } else {
        setError("No data found!!")
      }
    } else {
      console.log("validation error!!");
    }
  };
  const frgtpass = () => {
    navigate('/forget')
  }
  return (
    <div className="container">
      <form className="form">
        <h2>Login</h2>
        <div className="form-div">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={LoginData.email}
            onChange={handleChange}
            className="form-control"
          />
          {validaterr.mail && <span className="error-message">{validaterr.mail}</span>}
        </div>
        <div className="form-div">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={LoginData.password}
            onChange={handleChange}
            className="form-control"
          />
          {validaterr.pass && <span className="error-message">{validaterr.pass}</span>}
        </div>
        <div className="flex">
          <p id="frgtpass" onClick={frgtpass}>Forgot Password</p>
          <p id="loginbtn" onClick={handleSubmit}>
            Login
          </p>
        </div>
        <div className="flex">
          <p>Don&apos;t have an Acoount? <Link to="/">Register</Link></p>
        </div>
        <p id="error">{error}</p>
      </form>
    </div>
  );
};

export default Login;

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
