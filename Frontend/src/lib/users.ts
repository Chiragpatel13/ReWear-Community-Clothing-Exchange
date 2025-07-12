import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  points?: number;
}

export interface CreateUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Create a new user profile in Firestore
export const createUserProfile = async (userData: CreateUserData): Promise<void> => {
  try {
    const userProfile: UserProfile = {
      uid: userData.uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: `${userData.firstName} ${userData.lastName}`,
      points: 100, // Starting points for new users
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Use the user's UID as the document ID
    await setDoc(doc(db, 'users', userData.uid), userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};
