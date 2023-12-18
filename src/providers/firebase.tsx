import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNANtXn8ZiB5CKYKlxVsbml6WyAlSDbDk",
    authDomain: "usersandcompanies.firebaseapp.com",
    projectId: "usersandcompanies",
    storageBucket: "usersandcompanies.appspot.com",
    messagingSenderId: "191255573442",
    appId: "1:191255573442:web:234486a8d6de3bc6d31c5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection, serverTimestamp, getDocs, getDoc, doc, updateDoc };