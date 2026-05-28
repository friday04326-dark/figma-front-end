import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

// ⚠️ REPLACE THESE WITH YOUR ACTUAL FIREBASE CONFIG VALUES ⚠️
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

// --- Authentication Functions ---
export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};

// --- Customer Functions ---
export interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export const addCustomer = async (data: CustomerData, userId: string) => {
  try {
    await addDoc(collection(db, 'customers'), {
      ...data,
      userId: userId,
      createdAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCustomers = async (userId: string) => {
  const q = query(collection(db, 'customers'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
