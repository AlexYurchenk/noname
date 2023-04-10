import React from 'react';
import SignUp from './features/users/SignupForm';
import Login from './features/users/LoginForm';
import { Route, Routes } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import CreateTripFrom from './features/trips/CreateTripFrom';
import Layout from './features/trips/Layout';
import UsersRoute from './features/users/UsersRoute';
function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <RestrictedRoute
                        redirectTo='/auth/trips'
                        component={<SignUp />}
                    />
                }
            />
            <Route
                path='/login'
                element={
                    <RestrictedRoute
                        redirectTo='/auth/trips'
                        component={<Login />}
                    />
                }
            />
            <Route
                path='/auth'
                element={
                    <PrivateRoute redirectTo='/login' component={<Layout />} />
                }
            >
                <Route path='trips' element={<CreateTripFrom />} />
                <Route path='users' element={<UsersRoute />} />
            </Route>
        </Routes>
    );
}

export default App;
