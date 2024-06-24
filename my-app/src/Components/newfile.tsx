const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser?.user_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};


import React, { useState } from 'react';
import { useAuth } from '../authcontext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Watchlist from "./Components/homepage/Watchlist";
import ProceedPayment from "./Components/homepage/ProceedPayment";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser?.user_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

const CheckUser: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  return (currentUser?.user_id) ? <Navigate to="/cart" /> : <Component />;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<CheckUser component={Login} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<ProtectedRoute component={ProceedPayment} />} />
            <Route path="/wishlist" element={<Watchlist />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate/:actcode" element={<Activate />} />
            <Route path="/password" element={<Password />} />
            <Route path="/forget" element={<ForgetPass />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Wrong />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;


