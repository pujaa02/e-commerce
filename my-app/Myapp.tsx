import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard'; // Assuming you have a Dashboard component

// Define the props for ProtectedRoute
interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={props =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    {/* Add other routes */}
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
