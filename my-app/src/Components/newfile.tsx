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
import { AuthProvider } from './Components/authcontext/AuthContext';
import { CartProvider } from './Components/cartcontext/CartContext'; // Assuming you have a CartContext
import Watchlist from "./Components/homepage/Watchlist";
import ProceedPayment from "./Components/homepage/ProceedPayment";
import ProtectedRoute from './Components/ProtectedRoute';
import CheckCart from './Components/CheckCart';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider> {/* Provide Cart Context */}
          <Router>
            <Routes>
              <Route path="/login" element={<CheckCart component={Login} />} />
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
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authcontext/AuthContext';
import { useCart } from '../cartcontext/CartContext'; // Assuming you have a CartContext to manage cart state

const CheckCart: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  const { cart } = useCart(); // Get cart information from context

  if (currentUser && cart.items.length === 0) {
    return <Navigate to="/cart" />;
  } else if (currentUser && cart.items.length > 0) {
    return <Navigate to="/payment" />;
  }

  return <Component />;
};

export default CheckCart;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authcontext/AuthContext';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser?.user_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default ProtectedRoute;
