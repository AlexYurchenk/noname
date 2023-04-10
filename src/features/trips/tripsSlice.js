import { createSlice } from '@reduxjs/toolkit';
import {
    createTrip,
    getTrip,
    deleteTrip,
    updateTrip,
    getAllTrip,
    bookTrip,
} from './tripsOperations';
const initialState = {
    trips: [],
    status: 'idle',
    error: null,
    isTripCreated: false,
};

export const tripsSlice = createSlice({
    name: 'trips',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isTripCreated = false;
            })
            .addCase(createTrip.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'idle';
                state.isTripCreated = true;
                state.error = null;
                state.trips = [action.payload, ...state.trips];
            })
            .addCase(createTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.isTripCreated = false;
            })
            .addCase(getTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTrip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                state.trips = [...action.payload];
            })
            .addCase(getTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(deleteTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                state.trips = state.trips.filter(
                    (e) => e.id !== action.payload
                );
            })
            .addCase(deleteTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(updateTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateTrip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                state.trips = state.trips.map((t) =>
                    t.id === action.payload.id ? action.payload : t
                );
            })
            .addCase(updateTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(getAllTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllTrip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                state.trips = [...action.payload];
            })
            .addCase(getAllTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(bookTrip.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(bookTrip.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = null;
                state.trips = state.trips.map((t) =>
                    t.id === action.payload.id
                        ? {
                              ...t,
                              availablePlacesCount:
                                  action.payload.availablePlacesCount
                                      .availablePlacesCount,
                          }
                        : t
                );
            })
            .addCase(bookTrip.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
});
export const selectTrips = (state) => state.trips.trips;
export const selectError = (state) => state.trips.error;
export const selectIsTripCreated = (state) => state.trips.isTripCreated;
export default tripsSlice.reducer;
