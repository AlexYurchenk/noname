import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/userSlice';
import tripsReducer from '../features/trips/tripsSlice';
export const store = configureStore({
    reducer: {
        users: usersReducer,
        trips: tripsReducer,
    },
});
