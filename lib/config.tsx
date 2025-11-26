import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore, collection, addDoc, serverTimestamp, DocumentData, CollectionReference, getDoc, doc } from 'firebase/firestore';
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

// Add this helper function at the top of the file, before createTeamsFromSubmission
const generateRandomPassword = (length = 5): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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

// Add this interface at the top of the file with other interfaces
export interface TeamMember {
  id: string;
  name: string;
  email: string;
}

export interface Team {
  id: string;
  members: TeamMember[];
}

export interface TeamDocument {
  createdAt: Date;
  formSubmissionId: string;
  teacherEmail: string;
  teacherPassword: string;
  teacherPhone: string;
  schoolName: string;
  schoolAddress: string;
  province: string;
  teams: Team[];
}

// Add this function at the bottom of the file, before the last export
export const createTeamsFromSubmission = async (submissionId: string): Promise<string> => {
  if (!db) throw new Error('Database not initialized');
  
  // Get the form submission
  const submissionDoc = await getDoc(doc(db, 'form_submissions', submissionId));
  if (!submissionDoc.exists()) {
    throw new Error('Form submission not found');
  }
  const submissionData = submissionDoc.data() as FormSubmission;

  // Create team document
  // Generate a random 5-letter password
  const teacherPassword = generateRandomPassword(9);
  const teamDoc: Omit<TeamDocument, 'id'> = {
    createdAt: new Date(),
    formSubmissionId: submissionId,
    teacherEmail: submissionData.teacherEmail,
    teacherPhone: submissionData.teacherPhone,
    schoolName: submissionData.schoolName,
    teacherPassword,
    schoolAddress: '', // Empty as per requirements
    province: submissionData.province,
    teams: submissionData.teams.map(team => ({
      id: `team-${Math.random().toString(36).substr(2, 9)}`, // Generate unique team ID
      members: team.members.map(member => ({
        id: `member-${Math.random().toString(36).substr(2, 9)}`, // Generate unique member ID
        name: member.name,
        email: member.email,
      }))
    }))
  };

  // Add to teams collection
  const docRef = await addDoc(collection(db, 'teams'), teamDoc);
  return docRef.id;
};

export { db, collection, addDoc, serverTimestamp, submitForm };