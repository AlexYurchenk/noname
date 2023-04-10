import { createSlice } from '@reduxjs/toolkit';
import {
    register,
    login,
    loginWithGoogle,
    logout,
    getAllUsers,
    updateUser,
    loginWithGithub,
} from './userOperations';
const initialState = {
    user: null,
    status: 'idle',
    error: null,
    isUserCreated: false,
    isLoggedIn: false,
    allUsers: [],
};

export const userSlice = createSlice({
    name: 'users',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isUserCreated = false;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = 'idle';
                state.isUserCreated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.user = null;
                state.isUserCreated = false;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'idle';
                state.user = action.payload;
                state.error = null;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
                state.error = null;
                state.isLoggedIn = true;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.user = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.user = null;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allUsers = [...action.payload];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allUsers = state.allUsers.map((u) =>
                    u.id === action.payload.id
                        ? { ...u, role: action.payload.role }
                        : u
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(loginWithGithub.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(loginWithGithub.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
                state.error = null;
                state.isLoggedIn = true;
            })
            .addCase(loginWithGithub.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                state.user = null;
                state.isLoggedIn = false;
            });
    },
});

export const selectUser = (state) => state.users.user;
export const selectError = (state) => state.users.error;
export const selectIsUserCreated = (state) => state.users.isUserCreated;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectAllUsers = (state) => state.users.allUsers;

export default userSlice.reducer;
