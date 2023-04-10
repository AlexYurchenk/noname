import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCROId02AwqVaoZgqUoDNWuGzImBI8bI3w',
    authDomain: 'noname-digital-d5eb1.firebaseapp.com',
    databaseURL: 'https://noname-digital-d5eb1-default-rtdb.firebaseio.com',
    projectId: 'noname-digital-d5eb1',
    storageBucket: 'noname-digital-d5eb1.appspot.com',
    messagingSenderId: '958959329003',
    appId: '1:958959329003:web:87e09fa976edbdacdfe8ae',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
