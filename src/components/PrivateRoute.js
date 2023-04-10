import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../features/users/userSlice';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
