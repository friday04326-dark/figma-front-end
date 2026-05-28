import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// REPLACE THESE VALUES WITH YOUR ACTUAL FIREBASE CONFIG KEYS
const firebaseConfig = {
  apiKey: "AIzaSyBKhX-HeDirFhURHOAf3k-QjZMTHZjcbNU",
  authDomain: "cctv-mvp.firebaseapp.com",
  projectId: "cctv-mvp",
  storageBucket: "cctv-mvp.firebasestorage.app",
  messagingSenderId: "1031785979718",
  appId: "1:1031785979718:web:1ad8e30ce1f6872a16cf47",
  measurementId: "G-9VF0Q6HEHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- SIMPLE FUNCTIONS TO USE LATER ---

// Login function
export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Register function
export const registerUser = async (email: string, password: string, name: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  // Save user info to database
  await addDoc(collection(db, 'users'), {
    uid: result.user.uid,
    name: name,
    email: email,
    role: 'vendor',
    createdAt: serverTimestamp()
  });
  return result;
};

// Logout function
export const logout = async () => {
  await signOut(auth);
};

// Add Customer to Database
export const addCustomerToDB = async (userId: string, name: string, phone: string, address: string) => {
  await addDoc(collection(db, 'customers'), {
    userId: userId,
    name: name,
    phone: phone,
    address: address,
    createdAt: serverTimestamp()
  });
};

// Get Customers from Database
export const getCustomersFromDB = async (userId: string) => {
  const q = query(collection(db, 'customers'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
