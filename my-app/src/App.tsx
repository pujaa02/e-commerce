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
  console.log(currentUser?.user_id);
  return currentUser?.user_id ? <Component /> : <Navigate to="/login" />;
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
          {/* <Route path="/cart" element={<Cart />}></Route> */}
          <Route path="*" element={<Wrong />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
