import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const createTrip = createAsyncThunk(
    'trips/create',
    async (credential, thunkAPI) => {
        try {
            const { id } = await addDoc(collection(db, 'trips'), credential);

            return { id, ...credential };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getTrip = createAsyncThunk(
    'trips/getTrip',
    async (credential, thunkAPI) => {
        try {
            const tripsRef = collection(db, 'trips');
            const q = query(tripsRef, where('owner', '==', credential));
            const tripsData = await getDocs(q);

            let data = [];
            tripsData.forEach((u) => {
                data.push({
                    id: u.id,
                    ...u.data(),
                });
            });

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteTrip = createAsyncThunk(
    'trips/deleteTrip',
    async (credential, thunkAPI) => {
        try {
            const docRef = doc(db, 'trips', credential);
            await deleteDoc(docRef);
            return credential;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateTrip = createAsyncThunk(
    'trips/updateTrip',
    async (credential, thunkAPI) => {
        try {
            const docRef = doc(db, 'trips', credential.id);
            await updateDoc(docRef, credential);
            return credential;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllTrip = createAsyncThunk(
    'trips/getAllTrip',
    async (_, thunkAPI) => {
        try {
            const tripsRef = collection(db, 'trips');
            const tripsData = await getDocs(tripsRef);

            let data = [];
            tripsData.forEach((u) => {
                data.push({
                    id: u.id,
                    ...u.data(),
                });
            });

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const bookTrip = createAsyncThunk(
    'trips/bookTrip',
    async (credential, thunkAPI) => {
        try {
            const docRef = doc(db, 'trips', credential.id);
            await updateDoc(docRef, credential.availablePlacesCount);

            return credential;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
