import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    GithubAuthProvider,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
} from 'firebase/firestore';

import { auth } from '../../firebase';
import { db } from '../../firebase';
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password, role }, thunkAPI) => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const usersWithSameEmail = await getDocs(q);
            let data = null;
            usersWithSameEmail.forEach((u) => {
                data = {
                    id: u.id,
                    ...u.data(),
                };
            });

            if (data) {
                throw new Error('User is already exist');
            }
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = res.user;

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                authProvider: 'local',
                email,
                password,
                role,
            });

            return {
                uid: user.uid,
                authProvider: 'local',
                email,
                password,
                role,
            };
        } catch (error) {
            console.log(error, 'error');
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const login = createAsyncThunk(
    'auth/login',
    async ({ email }, thunkAPI) => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const userData = await getDocs(q);

            let data = null;
            if (userData.docs.length < 1) {
                throw new Error('User was not foundeds');
            }
            userData.forEach((u) => {
                data = {
                    id: u.id,
                    ...u.data(),
                };
            });

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, thunkAPI) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const email = res.user.email;

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const userData = await getDocs(q);
            let data = null;
            userData.forEach((u) => {
                data = {
                    id: u.id,
                    ...u.data(),
                };
            });
            console.log(data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        signOut(auth);
        return;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async (_, thunkAPI) => {
        try {
            const usersRef = collection(db, 'users');
            const userData = await getDocs(usersRef);
            let data = [];
            userData.forEach((u) => {
                data.push({
                    id: u.id,
                    ...u.data(),
                });
            });
            console.log(data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (credential, thunkAPI) => {
        try {
            const docRef = doc(db, 'users', credential.id);
            await updateDoc(docRef, { role: credential.role });
            return credential;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const loginWithGithub = createAsyncThunk(
    'auth/loginWithGithub',
    async (_, thunkAPI) => {
        try {
            const res = await signInWithPopup(auth, githubProvider);
            const email = res.user.email;

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const userData = await getDocs(q);
            let data = null;
            userData.forEach((u) => {
                data = {
                    id: u.id,
                    ...u.data(),
                };
            });
            console.log(data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
