// To achieve the functionality where, after logging in, the user is redirected to the page they were initially trying to access


import { useHistory, useLocation } from 'react-router-dom';


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  if (!currentUser?.user_id) {
    history.replace('/login', { from: location });
    return null;
  }

  return <Component />;
};


import React, { useState } from 'react';
import { useAuth } from '../authcontext/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
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
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
  const history = useHistory();
  const location = useLocation();

  if (!currentUser?.user_id) {
    history.replace('/login', { from: location });
    return null;
  }

  return <Component />;
};

const CheckUser: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { currentUser } = useAuth();
  return (currentUser?.user_id) ? <Redirect to="/cart" /> : <Component />;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={() => <CheckUser component={Login} />} />
            <Route path="/cart" component={Cart} />
            <Route path="/payment" component={() => <ProtectedRoute component={ProceedPayment} />} />
            <Route path="/wishlist" component={Watchlist} />
            <Route path="/register" component={Register} />
            <Route path="/activate/:actcode" component={Activate} />
            <Route path="/password" component={Password} />
            <Route path="/forget" component={ForgetPass} />
            <Route path="/" component={Home} />
            <Route path="*" component={Wrong} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
