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
import Watchlist from "./Components/homepage/Watchlist";
// import ProceedPayment from "./Components/homepage/ProceedPayment";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  return (currentUser?.user_id) ? <Component /> : <Navigate to="/login" />;
};

const CheckUser: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  return (currentUser?.user_id) ? <Navigate to="/cart" /> : <Component />;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<CheckUser component={Login} />} />
          <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
          <Route path="/wishlist" element={<Watchlist />}></Route>
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
