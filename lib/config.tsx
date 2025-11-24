import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore, collection, addDoc, serverTimestamp, DocumentData, CollectionReference } from 'firebase/firestore';
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX_f0Wj8Y5iaTz9qGIoInY0fdT_3AO2r0",
  authDomain: "canadian-math-league.firebaseapp.com",
  projectId: "canadian-math-league",
  storageBucket: "canadian-math-league.firebasestorage.app",
  messagingSenderId: "835994489642",
  appId: "1:835994489642:web:e3635b464dc2d603e84453",
  measurementId: "G-HBMM36S8BT"
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;
let db: Firestore | undefined;

// Initialize Firebase only on the client side
if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    // Only initialize analytics in browser environment
    isSupported().then(yes => {
      if (yes) {
        analytics = getAnalytics(app);
      }
    });
  } else {
    app = getApps()[0];
    db = getFirestore(app);
  }
}

// Type for form submission data
export interface FormSubmission {
  schoolName: string;
  province: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  teams: Array<{
    id: number;
    members: Array<{
      name: string;
      email: string;
    }>;
  }>;
  submittedAt: any; // Firestore server timestamp
}

// Function to submit form data to Firestore
const submitForm = async (formData: Omit<FormSubmission, 'submittedAt'>): Promise<string> => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  
  try {
    const docRef = await addDoc(collection(db, 'form_submissions') as CollectionReference<DocumentData>, {
      ...formData,
      submittedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export { db, collection, addDoc, serverTimestamp, submitForm };